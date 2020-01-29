/* eslint-disable no-undef */
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
