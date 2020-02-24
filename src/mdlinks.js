// debugger

const functions = require('./index.js');
const validate = require('./validate.js');

const mdlinks = (path, options) => new Promise((resolve) => {
  if (options.validate === true) {
    resolve(validate.verifyLinkStatus(path));
  } else {
    resolve(functions.returnLinks(path));
  }
});

module.exports = mdlinks;
