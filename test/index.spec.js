
const functions = require('../src/index.js');
// path.isAbsolute(myPath)
// Test function Is the path absolute?
// Input path = string  - Output Is absolute, true/false = boolean

describe('pathIsAbsolute', () => {
  it('Should be a function', () => {
    expect(typeof functions.pathIsAbsolute).toBe('function');
  });

  it('Should return true is the path is Absolute ', () => {
    expect(functions.pathIsAbsolute('/home/vilmango/Documents/LIM011-fe-md-links/README.md')).toBe(true);
  });
  it('Should return false if the path is Relative', () => {
    expect(functions.pathIsAbsolute('../README.md')).toBe(false);
  });
});

describe('resolvePathToAbsolute', () => {
  it('Should be a function', () => {
    expect(typeof functions.resolvePathToAbsolute).toBe('function');
  });

  it('Should receive a relative path and return absolute', () => {
    expect(functions.resolvePathToAbsolute('./README.md')).toBe('/home/vilmango/Documents/LIM011-fe-md-links/README.md');
  });
});
describe('isPathaFile', () => {
  it('Should be a function', () => {
    expect(typeof functions.isPathaFile).toBe('function');
  });
  it('Should return true if the path is a File', () => {
    expect(functions.isPathaFile('/home/vilmango/Documents/LIM011-fe-md-links/package.json')).toEqual(true);
  });
  it('Should return false if the path is not a File', () => {
    expect(functions.isPathaFile('/home/vilmango/Documents/LIM011-fe-md-links')).toEqual(false);
  });
});

// refactored function test
describe('verifyFileIsMarkdown', () => {
  it('Should be a function', () => {
    expect(typeof functions.verifyFileIsMarkdown).toBe('function');
  });
  it('Should return true if file ext is .md', () => {
    expect(functions.verifyFileIsMarkdown('/home/vilmango/Documents/LIM011-fe-md-links/README.md')).toBe(true);
  });
  it('Should return false if file ext is not .md', () => {
    expect(functions.verifyFileIsMarkdown('/home/vilmango/Documents/LIM011-fe-md-links/')).toBe(false);
  });
});

describe('readFilesInFolder', () => {
  it('Should be a function', () => {
    expect(typeof functions.readFilesInFolder).toBe('function');
  });
  it('Should return an array with files in folder', () => {
    expect(functions.readFilesInFolder('/home/vilmango/Documents/LIM011-fe-md-links/src/'))
      .toEqual(['cli.js', 'index.js']);
  });
});
