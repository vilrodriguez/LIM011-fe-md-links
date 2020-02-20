
const mdlinks = require('../src/mdlinks.js');
const validate = require('../src/validate.js');
// option1 can be --validate and --stats, but option2 only --stats
const cliFunction = (path, option1 /* option2 */) => {
  let finalResult;
  if (option1 === '--validate') {
    finalResult = mdlinks(path, { validate: true }).then((res) => console.log(res));
  } else if (option1 === '--stats') {
    finalResult = mdlinks(path, { validate: true }).then((res) => /* console.log(res)  */console.log(validate.stats(res)));
  } else if (option1 === null || option1 === undefined) {
    finalResult = mdlinks(path, { validate: false }).then((res) => console.log(res));
  }
  return finalResult;
};
console.log(cliFunction('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md','--validate'));
/*
mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }]
  })
  .catch(console.error);
  */
