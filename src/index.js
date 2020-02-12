//  Syntax for including Path module in your app
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

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

const readMdFile = (filePathMdFile) => {
  const string = fs.readFileSync(filePathMdFile);
  return string.toString();
};

const getLinksFromString = (stringFromFile) => stringFromFile.match(/(\[[^\]]+\])([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gm);

// recorrer array, luego sacar
const returnLinks = (arrayOfLinks, filePath) => {
  const linksArray = [];
  arrayOfLinks.map((element) => {
    const url = element.match(/([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gm)[0];
    const cleanLink = url.substring(1, url.length - 1);
    return linksArray.push({
      link: cleanLink,
      text: element.match(/(\[[^\]]+\])/gm)[0],
      file: filePath,
    });
  });
  return linksArray;
};

const verifyLinkStatus = (array) => {
  let newObj = {};
  const newArray = [];
  array.forEach((element) => {
    newArray.push(fetch(element.link).then((response) => {
      const { status } = response;
      const { statusText } = response;
      if (status >= 200 && status <= 399) {
        newObj = { ...element, status, message: statusText };
      } else {
        newObj = { ...element, status, message: 'Fail' };
      }
      // console.log('New Objetc', newObj);
      return newObj;
    }));
    console.log('Returns of promise function', newArray);
  });
  return Promise.all(newArray);
};

const text = getLinksFromString(readMdFile('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'));
const arrayoflink = returnLinks(text, '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md');
// console.log(arrayoflink);

// return Promise.all(verifyLinkStatus(arrayoflink)).then((result) => console.log('rtrtrtrt', result));
// console.log('ajajaja', verifyLinkStatus(arrayoflink));


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
  getLinksFromString,
  returnLinks,
  verifyLinkStatus,
};

module.exports = functions;
