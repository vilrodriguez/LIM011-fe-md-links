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
// console.log(readMdFile('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'));


// function createTextLinks(string) {
//   return (string || '').replace(/([^\S]|^)(((https?:\/\/)|(www\.))(\S+))/gi,
//     (match, space, url) => {
//       let hyperlink = url;

//       if (!hyperlink.match('^https?://')) {
//         hyperlink = `http://${hyperlink}`;
//       }
//       // return `${space}<a href="${hyperlink}">${url}</a>`;
//       console.log('ebebebebe', url);
//     });
// }

// returns the first link only
// const getLinksFromString = (linkText) => linkText.match(/(https?:\/\/[^ ]*)/)[1];

// const getLinksFromString = (stringFromFile) => stringFromFile
// .match(/([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gi);
const getLinksFromString = (stringFromFile) => stringFromFile.match(/\[([^\]]+)\](\([^)]+\)|\[[^\]]+\])/gm);


// const regEx = /([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gi;
const text = readMdFile('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md');

console.log('ahahahaha', getLinksFromString(text));


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
