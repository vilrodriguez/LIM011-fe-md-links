//  Syntax for including Path module in your app
const path = require('path');
const fs = require('fs');

// 1 returns a boolean
const isPathAbsolute = (filePath) => path.isAbsolute(filePath);

// 2 resolves relative path to absolute
const relativePathToAbsolute = (filePath) => path.resolve(filePath);

// 3 verifies if the absolute path reaches a file - boolean
const isAbsolutePathaFile = (filePath) => {
  const stat = fs.lstatSync(filePath);
  const file = stat.isFile();
  return file;
};
// 4 & 5 refactor
const getFileExt = (filePath) => {
  const ext = path.extname(filePath);
  if (ext === '.md') {
    return true;
  } return false;
};
// 4
const givesFileExt = (filePath) => path.extname(filePath);

// 5
const isFileExtMarkdown = (fileExt) => {
  if (fileExt === '.md') {
    return true;
  } return false;
};

// exports module functions to test spec
const functions = {
  pathIsAbsolute: isPathAbsolute,
  resolvePathToAbsolute: relativePathToAbsolute,
  isPathaFile: isAbsolutePathaFile,
  fileExtension: givesFileExt,
  verifiesFileExtIsMD: isFileExtMarkdown,
  getsFileExtMD: getFileExt,

};

module.exports = functions;
