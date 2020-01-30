
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
describe('fileExtension', () => {
  it('Should be a function', () => {
    expect(typeof functions.fileExtension).toBe('function');
  });
  it('Should return string with file ext .md', () => {
    expect(functions.fileExtension('/home/vilmango/Documents/LIM011-fe-md-links/README.md')).toBe('.md');
  });
});
describe('verifiesFileExtIsMD', () => {
  it('Should be a function', () => {
    expect(typeof functions.verifiesFileExtIsMD).toBe('function');
  });
  it('Should return true if file ext is .md', () => {
    expect(functions.verifiesFileExtIsMD('.md')).toBe(true);
  });
  it('Should return false if file ext is not .md', () => {
    expect(functions.verifiesFileExtIsMD('')).toBe(false);
  });
});



describe('getsFileExtMD', () => {
  it('Should be a function', () => {
    expect(typeof functions.getsFileExtMD).toBe('function');
  });
  /* it('Should return true if file ext is .md', () => {
    expect(functions.getsFileExtMD('.md')).toBe(true);
  });
   it('Should return false if file ext is not .md', () => {
    expect(functions.verifiesFileExtIsMD('')).toBe(false);
  }); */
});
