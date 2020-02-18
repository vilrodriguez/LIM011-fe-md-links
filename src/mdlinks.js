const functions = require('../src/index.js');
const validate = require('../src/validate.js');

const mdlinks = (path, options) => new Promise((resolve) => {
  if (options.validate === true) {
    resolve(validate.verifyLinkStatus(path));
  } else {
    resolve(functions.returnLinks(path));
  }
});

module.exports = mdlinks;
mdlinks('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md', { validate: false }).then((res) => console.log(res));

// const mdlinks = (path, options) => {
//   new Promise((resolve) => {
//     if (options.validate === true) {
//       resolve(validate.verifyLinkStatus(path));
//     } else {
//       resolve(

//         returnLinks(arrayOfLinks, path),
//       );
//     }
//   });
// };
