Markdown Folder API
===================

Takes a folder path as an imput, and parses the markdown files inside. The parsed files are stored and can be retreived with an API.

## Install
```bash
# NPM
npm i markdown-folder-api 

# Yarn
yarn add markdown-folder-api
```

## Usage
```js
let mdFiles = new MarkdownFolder({
  path: '/folder/path'
});

mdFiles.on('load', () => {
  // Get all files
  let allFiles = mdFiles.getAll();
  // Get single file
  let someFile = mdFile.get('fileName');
  // Get single file in a subfolder
  let anotherFile = mdFile.get('folderName/fileName');
});

```

## Options
```js
new MarkdownFolder({
  // Absolute folder path (String)
  path: '/folder/path'
  // Switch to enable / disable slugifying the folder / filename (Boolean) 
  // Default: false
  slugify: true
});

```

## Disclaimer

***This software is currently BETA quality, use at your own risk***
