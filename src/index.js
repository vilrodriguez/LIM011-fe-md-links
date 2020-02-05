//  Syntax for including Path module in your app
const path = require('path');
const fs = require('fs');

const isPathAbsolute = (filePath) => path.isAbsolute(filePath);
const relativePathToAbsolute = (filePath) => path.resolve(filePath);
const isAbsolutePathaFile = (filePath) => fs.lstatSync(filePath).isFile();
const isAbsolutePathaFolder = (filePath) => fs.lstatSync(filePath).isDirectory();
const verifyPathExtIsMD = (filePath) => (path.extname(filePath) === '.md');
const getMDfilesFromArray = (fileArray) => fileArray.filter((element) => path.extname(element) === '.md');
const getFilesInFolder = (filePath) => fs.readdirSync(filePath);

const getFileFromPathOrFolder = (filePath) => {
  let arrayMdFiles = [];
  if (isAbsolutePathaFile(filePath)) {
    arrayMdFiles.push(filePath);
  } else if (isAbsolutePathaFolder(filePath)) {
    getFilesInFolder(filePath).forEach((element) => {
      arrayMdFiles = arrayMdFiles.concat(getFileFromPathOrFolder(path.join(filePath, element)));
    });
  }
  return arrayMdFiles;
};


// console.log(isAbsolutePathaFolder('/home/vilmango/Documents/LIM011-fe-md-links/prueba/pato.html'));

const functions = {
  isPathAbsolute,
  relativePathToAbsolute,
  isAbsolutePathaFile,
  isAbsolutePathaFolder,
  verifyPathExtIsMD,
  getFilesInFolder,
  getMDfilesFromArray,
  getFileFromPathOrFolder,
};
module.exports = functions;
