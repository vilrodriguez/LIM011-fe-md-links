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

// console.log(isAbsolutePathaFolder('/home/vilmango/Documents/LIM011-fe-md-links/'));
// console.log(getFileFromPathOrFolder('/home/vilmango/Documents/LIM011-fe-md-links/'));

const readMdFile = (filePathMdFile) => {
  const string = fs.readFileSync(filePathMdFile);
  return string.toString();
};
console.log(readMdFile('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'));


const functions = {
  isPathAbsolute,
  relativePathToAbsolute,
  isAbsolutePathaFile,
  isAbsolutePathaFolder,
  verifyPathExtIsMD,
  getFilesInFolder,
  getMDfilesFromArray,
  getFileFromPathOrFolder,
  readMdFile,
};
module.exports = functions;

// Works in all other folders but gives error with node_modules folder files
// const getFileFromPathOrFolder = (filePath) => {
//   let arrayMdFiles = [];
//   if (isAbsolutePathaFile(filePath)) {
//     arrayMdFiles.push(filePath);
//   } else {
//     getFilesInFolder(filePath).forEach((element) => {
//       arrayMdFiles = arrayMdFiles.concat(getFileFromPathOrFolder(path.join(filePath, element)));
//     });
//   }
//   return arrayMdFiles;
// };
