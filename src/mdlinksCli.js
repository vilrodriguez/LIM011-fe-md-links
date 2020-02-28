// debugger
const mdlinks = require('./mdlinks.js');
const validate = require('./validate.js');

const cliFunction = (path, option1, option2) => {
  let finalResult;

  if ((option1 === '--validate' && option2 === '--stats') || (option1 === '--stats' && option2 === '--validate')) {
    finalResult = mdlinks(path, { validate: true })
      .then((res) => (validate.validateBrokenLinks(res))).catch(() => 'An Error happened.');
  } else if (option1 === '--validate') {
    finalResult = mdlinks(path, { validate: true }).then((res) => {
      let string = '';
      res.forEach((ele) => {
        string += `${ele.file} ${ele.link} ${ele.text} ${ele.message} ${ele.status}\n`;
      });
      return string;
    }).catch(() => 'An Error happened.');
  } else if (option1 === '--stats') {
    finalResult = mdlinks(path, { validate: true })
      .then((res) => (validate.stats(res)))
      .catch(() => 'An Error happened.');
  } else if (option1 === null || option1 === undefined) {
    finalResult = mdlinks(path, { validate: false }).then((res) => {
      let string = '';
      res.forEach((ele) => {
        string += `${ele.file} ${ele.link} ${ele.text}\n`;
      });
      return string;
    }).catch(() => 'An Error happened.');
  } else {
    return 'Use a proper option: --validate or --stats';
  }
  return finalResult;
};

module.exports = cliFunction;
