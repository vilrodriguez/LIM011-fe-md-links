//  Syntax for including Path module in your app
const path = require('path');
const fs = require('fs');

// returns a boolean
const isPathAbsolute = (filePath) => path.isAbsolute(filePath);
// resolves relative path to absolute
const relativePathToAbsolute = (filePath) => path.resolve(filePath);
// verifies if the absolute path reaches a file - boolean
const isAbsolutePathaFile = (filePath) => {
  const stat = fs.lstatSync(filePath);
  const file = stat.isFile();
  return file;
};

// exports module functions to test spec
const functions = {
  pathIsAbsolute: isPathAbsolute,
  resolvePathToAbsolute: relativePathToAbsolute,
  isPathaFile: isAbsolutePathaFile,

};

module.exports = functions;
