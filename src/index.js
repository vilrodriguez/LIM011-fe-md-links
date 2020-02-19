//  Syntax for including Path module in your app
const path = require('path');
const fs = require('fs');

const isAbsolutePathaFile = (filePath) => fs.lstatSync(filePath).isFile();
const isAbsolutePathaFolder = (filePath) => fs.lstatSync(filePath).isDirectory();
const getFilesInFolder = (filePath) => fs.readdirSync(filePath);
const getMDfilesFromArray = (fileArray) => fileArray.filter((element) => path.extname(element) === '.md');

const resolveExistingPathToAbsolute = (route) => {
  let newPath;
  if (fs.existsSync(route)) {
    if (path.isAbsolute(route) === true) {
      return route;
    }
    newPath = path.resolve(route);
    return newPath;
  }
  return 'Path does not exist';
};

const getFileFromPathOrFolder = (filePath) => {
  const files = resolveExistingPathToAbsolute(filePath);
  let arrayFiles = [];
  if (isAbsolutePathaFile(files) && path.extname(files) === '.md') {
    arrayFiles.push(files);
  }
  if (isAbsolutePathaFolder(files)) {
    getFilesInFolder(files).forEach((element) => {
      if (path.extname(element) === '.md') {
        arrayFiles = arrayFiles.concat(getFileFromPathOrFolder(path.join(filePath, element)));
      }
    });
  }
  return arrayFiles;
};
const readMdFile = (filesPath) => {
  const string = fs.readFileSync(filesPath);
  return string.toString();
};
// const string = `Esto es un texto de prueba :3
// - [Pill de recursión - video](https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s)
// - [Pill de recursión - video](https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s)
// - [Pill de recursión - repositorio](https://github.com/merunga/pildora-recursin)
// - [Pill de recursión - repositorio](xxxxxxx)`;
const getLinksFromString = (stringFromFile) => stringFromFile.match(/\[(.+)\]\((.+)\)/gm);

// console.log(getLinksFromString(string));
const returnLinks = (filePath) => {
  const arrayOfFiles = getFileFromPathOrFolder(filePath);
  const content = arrayOfFiles.map((ele) => {
    const contentOfFile = readMdFile(ele);
    const stringArray = getLinksFromString(contentOfFile);
    return stringArray;
  });
  const newlinksArray = content.flat().map((element) => {
    const url = element.match(/\((.+)\)/gm)[0];
    const cleanLink = url.substring(1, url.length - 1);
    return {
      link: cleanLink,
      text: element.match(/(\[[^\]]+\])/gm)[0],
      file: filePath,
    };
  });
  return newlinksArray;
};
// console.log(returnLinks('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'));

// console.log('xxx', returnLinks('/home/vilmango/Documents/LIM011-fe-md-links/prueba'));
const functions = {
  resolveExistingPathToAbsolute,
  isAbsolutePathaFile,
  isAbsolutePathaFolder,
  getFilesInFolder,
  getMDfilesFromArray,
  getFileFromPathOrFolder,
  getLinksFromString,
  returnLinks,
  readMdFile,
};

module.exports = functions;
// const isPathAbsolute = (filePath) => path.isAbsolute(filePath);
// const relativePathToAbsolute = (filePath) => path.resolve(filePath);
// const verifyPathExtIsMD = (filePath) => (path.extname(filePath) === '.md');
// const getFileFromPathOrFolder = (filePath) => {
//   const files = resolveExistingPathToAbsolute(filePath);
//   let arrayFiles = [];
//   if (isAbsolutePathaFile(files)) {
//     arrayFiles.push(files);
//   }
//   if (isAbsolutePathaFolder(files)) {
//     getFilesInFolder(files).forEach((element) => {
//       arrayFiles = arrayFiles.concat(getFileFromPathOrFolder(path.join(filePath, element)));
//     });
//   }
//   return arrayFiles;
// };
