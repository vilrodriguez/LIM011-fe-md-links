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

// 4 refactor
const verifyPathExtIsMD = (filePath) => {
  if (path.extname(filePath) === '.md') {
    return true;
  } return false;
};
// returns files in folder
const filesInFolder = (filePath) => fs.readdirSync(filePath);


/* console.log(filesInFolder('/home/vilmango/Documents/LIM011-fe-md-links/src')); */
// exports module functions to test spec
const functions = {
  pathIsAbsolute: isPathAbsolute,
  resolvePathToAbsolute: relativePathToAbsolute,
  isPathaFile: isAbsolutePathaFile,
  verifyFileIsMarkdown: verifyPathExtIsMD,
  readFilesInFolder: filesInFolder,
};
module.exports = functions;
