
const functions = require('./index.js');
const validate = require('./validate.js');

const mdlinks = (path, options) => new Promise((resolve, reject) => {
  if (options.validate === true) {
    resolve(validate.verifyLinkStatus(path));
  } else if (options.validate === false) {
    resolve(functions.returnLinks(path));
  } else {
    const error = ' Input a valid path';
    reject(error);
  }
});

module.exports = mdlinks;
