
const mdlinks = require('../src/mdlinks.js');
const validate = require('../src/validate.js');

// option1 can be --validate and --stats, but option2 only --stats
const cliFunction = (path, option1, option2) => {
  let finalResult;
  if (option1 === '--validate' && option2 === '--stats') {
    finalResult = mdlinks(path, { validate: true }).then((res) => (validate.validateBrokenLinks(res)));
  } else if (option1 === '--validate') {
    finalResult = mdlinks(path, { validate: true }).then((res) => {
      let string = '';
      res.forEach((ele) => {
        string += `${ele.file} ${ele.link} ${ele.text} ${ele.message} ${ele.status} \n`;
      });
      return string;
    });
  } else if (option1 === '--stats') {
    finalResult = mdlinks(path, { validate: true }).then((res) => (validate.stats(res)));
  } else if (option1 === null || option1 === undefined) {
    finalResult = mdlinks(path, { validate: false }).then((res) => {
      let string = '';
      res.forEach((ele) => {
        string += `${ele.file} ${ele.link} ${ele.text}\n`;
      });
      return string;
    });
  }
  return finalResult;
};

console.log((cliFunction('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md', '--validate', '--stats')));
module.exports = cliFunction;
