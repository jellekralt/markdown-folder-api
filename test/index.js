const chai = require('chai');
const should = require('chai').should();
const MarkdownFolder = require('../src/MarkdownFolder');
const { resolve } = require('path');

chai.should();

describe('MarkdownFolder', function() {
  let mdFiles;

  beforeEach(function() {
    mdFiles = new MarkdownFolder({
      path: resolve(__dirname, 'mocks/md-files'),
      slugify: true
    });
  });

  describe('#create', function() {
    it('should load', function(done) {
      mdFiles.on('load', () => {
        done();
      });
    });
  });

  describe('#getAll', function() {
    it('should return all posts', function(done) {
      mdFiles.on('load', () => {
        Object.keys(mdFiles.getAll()).should.have.length(4);
        done();
      });
    });
  });

  describe('#get', function() {
    it('should return a single post', function(done) {
      mdFiles.on('load', () => {
        let post = mdFiles.get('bar');

        post.should.have.property('filePath');
        done();
      });
    });

    it('should return undefined when non found', function(done) {
      mdFiles.on('load', () => {
        let post = mdFiles.get('notfound');

        should.not.exist(post);
        done();
      });
    });

    it('should slugify the file and pathnames when the slugify option is set', function(done) {
      mdFiles = new MarkdownFolder({
        path: resolve(__dirname, 'mocks/md-files'),
        slugify: true
      });

      mdFiles.on('load', () => {
        let post = mdFiles.get('sub/another-sub/foo-bar_baz');

        should.exist(post);
        done();
      });
    });
  });
});



  



