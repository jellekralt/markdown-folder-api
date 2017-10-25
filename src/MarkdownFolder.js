const { promisify } = require('util');
const { resolve, parse } = require('path');
const EventEmitter = require('events');
const fs = require('fs');
const recursive = require('recursive-readdir');
const fm = require('front-matter');
const marked = require('marked');

const readDir = promisify(recursive);
const readFile = promisify(fs.readFile);

const MemoryStore = require('./stores/MemoryStore');

class MarkdownFolder extends EventEmitter {

  constructor(options) {
    super();

    if (!options.path) {
      throw new Error('Path is required');
    }

    if (options.store) {
      this.store = options.store;
    } else {
      this.store = new MemoryStore();
    }

    this.loadFolder(options.path)
      .then(() => this.emit('load'))
      .catch(err => {
        console.error(err);
      });
  }

  loadFolder(path) {
    return this.getPosts(path)
      .then(posts => this.structurePosts(posts, path))
      .then(this.storePosts.bind(this));
  }

  getPosts (path) {
    return readDir(path)
      .then((files) => {
        return Promise.all(files.map(file => {
          let filePath = resolve(path, file);
          return readFile(filePath, 'utf8')
            .then(data => ({ data, filePath }));
        }));
      })
      .then(files => files.map(file => Object.assign(file, fm(file.data))))
      .then(files => files.map(file => {
        file.html = marked(file.body);
        return file;
      }));
  }

  structurePosts(posts, rootPath) {
    return posts.reduce((result, current, index) => {
      let parsedPath = parse(current.filePath);
      let base = parsedPath.dir.replace(rootPath, '').replace(/^\//, '');
      let ref = `${base}${base ? '/' : ''}${parsedPath.name}`;

      result[ref] = current;
      
      return result;
    }, {});
  }

  storePosts(files) {
    this.store.add(files);
  }

  get(ref) {
    return this.store.get(ref);
  }

  getAll() {
    return this.store.get();
  }
}

module.exports = MarkdownFolder;