//  Syntax for including Path module in your app
const path = require('path');
const fs = require('fs');


// const isPathAbsolute = (filePath) => path.isAbsolute(filePath);
// const relativePathToAbsolute = (filePath) => path.resolve(filePath);
const isAbsolutePathaFile = (filePath) => fs.lstatSync(filePath).isFile();
const isAbsolutePathaFolder = (filePath) => fs.lstatSync(filePath).isDirectory();
const verifyPathExtIsMD = (filePath) => (path.extname(filePath) === '.md');
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

console.log(resolveExistingPathToAbsolute('README.md'));

const getFileFromPathOrFolder = (filePath) => {
  let arrayMdFiles = [];
  if (isAbsolutePathaFile(filePath)) {
    arrayMdFiles.push(filePath);
  }
  if (isAbsolutePathaFolder(filePath)) {
    getFilesInFolder(filePath).forEach((element) => {
      arrayMdFiles = arrayMdFiles.concat(getFileFromPathOrFolder(path.join(filePath, element)));
    });
  }
  return arrayMdFiles;
};

const readMdFile = (filePathMdFile) => {
  const string = fs.readFileSync(filePathMdFile);
  return string.toString();
};

const getLinksFromString = (stringFromFile) => stringFromFile.match(/(\[[^\]]+\])([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gm);


const returnLinks = (filePath) => {
  const contentFromFile= readMdFile(filePath);
  const linksArray = getLinksFromString(contentFromFile);
  const newlinksArray = [];
  linksArray.map((element) => {
    const url = element.match(/([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gm)[0];
    const cleanLink = url.substring(1, url.length - 1);
    return newlinksArray.push({
      link: cleanLink,
      text: element.match(/(\[[^\]]+\])/gm)[0],
      file: filePath,
    });
  });
  return newlinksArray;
};

console.log(returnLinks('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'));

// const returnLinks = (arrayOfLinks, filePath) => {
//   const linksArray = [];
//   arrayOfLinks.map((element) => {
//     const url = element.match(/([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gm)[0];
//     const cleanLink = url.substring(1, url.length - 1);
//     return linksArray.push({
//       link: cleanLink,
//       text: element.match(/(\[[^\]]+\])/gm)[0],
//       file: filePath,
//     });
//   });
//   return linksArray;
// };


// const text = getLinksFromString(readMdFile('/home/vilmango/Documents/LIM011-fe-md-links/prueba/prueba.md'));
// const arrayoflink = returnLinks(text, '/home/vilmango/Documents/LIM011-fe-md-links/prueba/prueba.md')';
// const text = getLinksFromString(readMdFile('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'));
// // const arrayoflink = returnLinks(text, '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md');
// // console.log(arrayoflink);
// // console.log('mew', arrayoflink);
// verifyLinkStatus(arrayoflink).then((result) => {
//   // console.log('aaaa', result);
//  ValidateStats(result);
// });
// console.log(stats(arrayoflink));
// console.log('ajajaja', verifyLinkStatus(arrayoflink));


const functions = {
  resolveExistingPathToAbsolute,
  isAbsolutePathaFile,
  isAbsolutePathaFolder,
  verifyPathExtIsMD,
  getFilesInFolder,
  getMDfilesFromArray,
  getFileFromPathOrFolder,
  readMdFile,
  getLinksFromString,
  returnLinks,
};

module.exports = functions;
