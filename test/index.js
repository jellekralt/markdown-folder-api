const MarkdownFolder = require('../src/MarkdownFolder');
const { resolve } = require('path');

let mdFiles = new MarkdownFolder({
  path: resolve(__dirname, 'mocks/md-files')
});

mdFiles.on('load', () => {
  console.log('loaded');
  
  console.log(': GET ALL -------------');  
  console.log(mdFiles.getAll());
  
  console.log(': GET bar -------------');  
  console.log(mdFiles.get('bar'));
});
