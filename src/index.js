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

const readMdFile = (filePathMdFile) => {
  const string = fs.readFileSync(filePathMdFile);
  return string.toString();
};

// returns the first link only
// const getLinksFromString = (linkText) => linkText.match(/(https?:\/\/[^ ]*)/)[1];

// const getLinksFromString = (stringFromFile) => stringFromFile
// .match(/([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gi);
// const getLinksFromString = (stringFromFile) => stringFromFile
// .match(/\[([^\]]+)\](\([^)]+\)|\[[^\]]+\])/gm);
// .match(/(\[[^\]]+\])/gm);
// .match(/([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gm);

const getLinksFromString = (stringFromFile) => stringFromFile.match(/(\[[^\]]+\])([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gm);
// const getLinks = (stringFromFile) => stringFromFile.match(/(\[[^\]]+\])/gm);
// const getText = (stringFromFile) => stringFromFile
// .match(/([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gm);
const text = readMdFile('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md');

// console.log('gets links and text', getLinksFromString(text));
// console.log('only links', getLinks(text));
// console.log('only text', getText(text));

const returnLinks = (arrayOfLinks) => {
  const linksArray = [];
  arrayOfLinks.map((element) => {
    const hrefString = element.match(/(\[[^\]]+\])/gm);
    const linkString = element.match(/([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gm);
    // const code ='';
    // const status = '';
    linksArray.push({
      text: hrefString,
      link: linkString,
      file: '',
    });
  });
    return linksArray;
};
console.log(returnLinks(getLinksFromString(text)));

/*
const m = regEx.exec(text);
const links = [];
while ((m) !== null) {
  if (m.index === regEx.lastIndex) {
    regEx.lastIndex += 1;
  }
  console.log(m[0]); // The all substring
  console.log(m[1]); // The href subpart
  console.log(m[2]); // The anchor subpart

  links.push({
    match: m[0], // the entire match
    href: m[1], // the first parenthesis => (https?://.)
    anchor: m[2], // the second one => ([^<])
  });
}
*/
/* const hrefRegEx = (/(\[[^\]]+\])/gm);
const linkRegEx = (/([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gm);
const href = hrefRegEx.exec(element);
const link = linkRegEx.exec(element); */
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
