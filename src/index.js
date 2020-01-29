//  Syntax for including Path module in your app
const path = require('path');

// returns a boolean
const isPathAbsolute = (filePath) =>path.isAbsolute(filePath);
// resolves relative path to absolute
const relativePathToAbsolute = (filePath) => path.resolve(filePath);

// exports module functions to test spec
const functions ={
pathIsAbsolute : isPathAbsolute,
resolvePathToAbsolute: relativePathToAbsolute,

};

module.exports = functions;



