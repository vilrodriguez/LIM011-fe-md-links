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
      return (route);
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
    const folderFiles = getFilesInFolder(files);
    folderFiles.forEach((element) => {
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

const getLinksFromString = (stringFromFile) => stringFromFile.match(/\[(.+)\]\((.+)\)/gm);

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
    const finalPath = resolveExistingPathToAbsolute(filePath);
    return {
      link: cleanLink,
      text: element.match(/(\[[^\]]+\])/gm)[0],
      file: finalPath,
    };
  });
  return newlinksArray;
};



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
/* const returnLinks = (filePath) => {
  console.log('>51 returnLinks ', filePath);
  const arrayOfFiles = getFileFromPathOrFolder(filePath);
  console.log('>53 array', arrayOfFiles);
  const content = arrayOfFiles.map((ele) => {
    const contentOfFile = readMdFile(ele);
    const stringArray = getLinksFromString(contentOfFile);
    return stringArray;
  });
  console.log('aaa', content);
  const newlinksArray = content.flat().map((element) => {
    const url = element.match(/\((.+)\)/gm)[0];
    const cleanLink = url.substring(1, url.length - 1);
    const finalPath = resolveExistingPathToAbsolute(filePath);
    return {
      link: cleanLink,
      text: element.match(/(\[[^\]]+\])/gm)[0],
      file: finalPath,
    };
  });
  return newlinksArray;
}; */

/* const getFileFromPathOrFolder = (filePath) => {
  const files = resolveExistingPathToAbsolute(filePath);
  console.log('>44 ttt', files);
  let arrayFiles = [];
  if (isAbsolutePathaFile(files) && path.extname(files) === '.md') {
    arrayFiles.push(files);
    console.log('>29 files', files);
    console.log('1st return', arrayFiles);
  } else if (isAbsolutePathaFolder(files)) {
    getFilesInFolder(files).forEach((element) => {
      if (path.extname(element) === '.md') {
        console.log('>5 element', element);
        arrayFiles = arrayFiles.concat(getFileFromPathOrFolder(path.join(filePath, element)));
        return arrayFiles;
      }
    });
    console.log('xoxoxox', arrayFiles);
    return arrayFiles;
  }
  console.log('xoxoxox', arrayFiles);
  return arrayFiles;
}; */
