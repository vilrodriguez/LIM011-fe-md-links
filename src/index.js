//  Syntax for including Path module in your app
const path = require('path');
const fs = require('fs');

const isPathAbsolute = (filePath) => path.isAbsolute(filePath);
const relativePathToAbsolute = (filePath) => path.resolve(filePath);
const isAbsolutePathaFile = (filePath) => fs.lstatSync(filePath).isFile();
const isAbsolutePathaFolder = (filePath) => fs.lstatSync(filePath).isDirectory();
console.log(isAbsolutePathaFolder('/home/vilmango/Documents/LIM011-fe-md-links/prueba'));

// 4 refactor, need to refactor to return an array
const verifyPathExtIsMD = (filePath) => (path.extname(filePath) === '.md');

// returns files in folder including more folders, need to find out if there are files with ext
const getFilesInFolder = (filePath) => fs.readdirSync(filePath);
console.log(getFilesInFolder('/home/vilmango/Documents/LIM011-fe-md-links/prueba'));

// 5 Received a path string and verify if there is  file or a folder, in case of folder
// verifies if there're .md files, returns array
const getMdFilesFromPath = (filePath) => {
  let arrayMdFiles = [];
  if (isAbsolutePathaFile(filePath)) {
    if (verifyPathExtIsMD(filePath)) {
      arrayMdFiles.push(filePath);
    }
  } else if (isAbsolutePathaFolder(filePath)) {
    getFilesInFolder(filePath).forEach((element) => {
      arrayMdFiles = arrayMdFiles.concat(getMdFilesFromPath(path.join(filePath, element)));
    });
  }
  return arrayMdFiles;
};
console.log(getMdFilesFromPath('/home/vilmango/Documents/LIM011-fe-md-links/prueba'));
const functions = {
  pathIsAbsolute: isPathAbsolute,
  resolvePathToAbsolute: relativePathToAbsolute,
  isPathaFile: isAbsolutePathaFile,
  isPathaFolder: isAbsolutePathaFolder,
  verifyFileIsMarkdown: verifyPathExtIsMD,
  gettingFilesInFolder: getFilesInFolder,
  getsMDFilesFromaPath: getMdFilesFromPath,
};
module.exports = functions;
