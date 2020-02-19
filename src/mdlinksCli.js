
const mdLinks = require('../src/mdlinks.js');
const validate = require('../src/validate.js');
// option1 can be --validate and --stats, but option2 only --stats
const cliMdLinks = ( path, option1, option2) =>{
    if 
}
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