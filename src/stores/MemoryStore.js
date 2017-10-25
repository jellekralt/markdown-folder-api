class MemoryStore {

  constructor() {
    this._posts = {};
  }

  add(posts)  {
    this._posts = Object.assign({}, this._posts, posts);
  }

  set(ref, data) {
    this._posts[ref] = data
  }

  get(ref) {
    if (ref) {
      return this._posts[ref];
    } else {
      return this._posts;
    }
  }
}

module.exports = MemoryStore;