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

// returns the first link only
// const getLinksFromString = (linkText) => linkText.match(/(https?:\/\/[^ ]*)/)[1];

const getLinksFromString = (stringFromFile) => stringFromFile.match(/(\[[^\]]+\])([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gm);


// const returnLinks = (arrayOfLinks, filePath) => {
//   const linksArray = [];
//   arrayOfLinks.map((element) => linksArray.push({
//     link: element.match(/([\S]|^)(((https?:\/\/)|(www\.))(\S+))/gm)[0],
//     text: element.match(/(\[[^\]]+\])/gm)[0],
//     file: filePath,
//   }));
//   return linksArray;
// };
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
const text = getLinksFromString(readMdFile('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'));
console.log('texto from string', text);
console.log('asdasda', returnLinks(text, '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'));


// const fetchPromise = fetch('https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s');
// const verifyStatus = (arrayOfLinks) => {
//   // const link = cleanLink(arrayOfLinks);
//   // console.log(link);
//   arrayOfLinks.map((element) => {
//     let newobj = {};
//     fetch(element.link).then((response) => {
//       const { status } = response;
//       const { statusText } = response;
//       if (status >= 200 && status <= 399) {
//         newobj = {
//           ...element,
//           message: 'OK',
//           status,
//         };
//         console.log(newobj);
//       } else {
//         // const message = 'Fail';
//         newobj = {
//           ...element,
//           message: 'Fail',
//           status,
//         };
//         return newobj;
//       }
//       console.log(status, statusText);
//       return arrayOfLinks;
//     });

// .then((json) => );
//   console.log(result);
// });
//   });
// };

// verifyStatus(aaaa);
// fetchPromise.then((response) => {
//   console.log(response);
// });


// fetchPromise(validateURL(aaaa));
// const uniqueLinks = (returnedLinks) => {
//   console.log(returnedLinks[2].text);

//   console.log(returnedLinks.length);
//   const uniqueItems = [...new Set(returnedLinks)];
//   return uniqueItems.length;
// };
// uniqueLinks(returnLinks(getLinksFromString(text),
// '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'));


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

// const cleanLink = (array) => {
//   const linksArray = [];
//   array.map((ele) => {
//     const string = ele.link;
//     const result = string.substring(1, string.length - 1);
//     return linksArray.push(result);
//   });
//   return linksArray;
// };
