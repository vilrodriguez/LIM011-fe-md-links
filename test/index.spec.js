const functions = require('../src/index.js');
// path.isAbsolute(myPath)
// Test function Is the path absolute?
// Input path = string  - Output Is absolute, true/false = boolean

describe('pathIsAbsolute', () => {
  it('Should be a function', () => {
    expect(typeof functions.isPathAbsolute).toBe('function');
  });

  it('Should return true is the path is Absolute ', () => {
    expect(functions.isPathAbsolute('/home/vilmango/Documents/LIM011-fe-md-links/README.md')).toBe(true);
  });
  it('Should return false if the path is Relative', () => {
    expect(functions.isPathAbsolute('../README.md')).toBe(false);
  });
});
