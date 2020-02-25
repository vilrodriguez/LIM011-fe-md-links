// debugger
const fetch = require('node-fetch');
const functions = require('../src/index.js');

const verifyLinkStatus = (path) => {
  const linksArray = functions.returnLinks(path);
  let newObj = {};
  const newArray = [];
  linksArray.forEach((element) => {
    newArray.push(fetch(element.link).then((response) => {
      const { status } = response;
      const { statusText } = response;
      if (status >= 200 && status <= 399) {
        newObj = { ...element, status, message: statusText };
      } else {
        newObj = { ...element, status, message: 'Fail' };
      }
      return newObj;
    }).catch(() => {
      newObj = { ...element, message: 'Error: Invalid Link', status: 'Invalid' };
      return newObj;
    }));
  });
  return Promise.all(newArray);
};


const stats = (obj) => {
  const allLinks = obj.map((element) => element.link);
  const links = allLinks.length;
  const uniqueLinks = [...new Set(allLinks)].length;
  return `Total Links in file: ${links} \nUnique Links: ${uniqueLinks}`;
};
const validateBrokenLinks = (obj) => {
  const allLinks = obj.map((element) => element.link);
  const links = allLinks.length;
  const uniqueLinks = [...new Set(allLinks)].length;
  const invalidLinks = obj.filter((element) => element.message === 'Fail' || element.message === 'Error: Invalid Link');
  const broken = invalidLinks.length;
  return `Total Links in file: ${links} \nUnique Links: ${uniqueLinks} \nBroken: ${broken}`;
};

const validate = {
  verifyLinkStatus,
  validateBrokenLinks,
  stats,
};

module.exports = validate;
