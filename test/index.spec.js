
const functions = require('../src/index.js');
// path.isAbsolute(myPath)
// Test function Is the path absolute?
// Input path = string  - Output Is absolute, true/false = boolean

describe('isPathAbsolute', () => {
  it('Should be a function', () => {
    expect(typeof functions.isPathAbsolute).toBe('function');
  });
  it('Should return TRUE is the path is Absolute ', () => {
    expect(functions.isPathAbsolute('/home/vilmango/Documents/LIM011-fe-md-links/README.md')).toBe(true);
  });
  it('Should return FALSE if the path is Relative', () => {
    expect(functions.isPathAbsolute('../README.md')).toBe(false);
  });
});

describe('resolvePathToAbsolute', () => {
  it('Should be a function', () => {
    expect(typeof functions.resolvePathToAbsolute).toBe('function');
  });
  it('Should receive a relative path and return an absolute path', () => {
    expect(functions.resolvePathToAbsolute('./README.md')).toBe('/home/vilmango/Documents/LIM011-fe-md-links/README.md');
  });
});
describe('isPathaFile', () => {
  it('Should be a function', () => {
    expect(typeof functions.isPathaFile).toBe('function');
  });
  it('Should return TRUE if the path is a File', () => {
    expect(functions.isPathaFile('/home/vilmango/Documents/LIM011-fe-md-links/package.json')).toBe(true);
  });
  it('Should return FALSE if the path is not a File', () => {
    expect(functions.isPathaFile('/home/vilmango/Documents/LIM011-fe-md-links')).toBe(false);
  });
});
describe('isPathaFolder', () => {
  it('Should be a function', () => {
    expect(typeof functions.isPathaFolder).toBe('function');
  });
  it('Should return FALSE if the path is a File', () => {
    expect(functions.isPathaFolder('/home/vilmango/Documents/LIM011-fe-md-links/package.json')).toBe(false);
  });
  it('Should return TRUE if the path is not a File', () => {
    expect(functions.isPathaFolder('/home/vilmango/Documents/LIM011-fe-md-links')).toBe(true);
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

describe('gettingFilesInFolder', () => {
  it('Should be a function', () => {
    expect(typeof functions.gettingFilesInFolder).toBe('function');
  });
  it('Should return an array with files in folder', () => {
    expect(functions.gettingFilesInFolder('/home/vilmango/Documents/LIM011-fe-md-links/prueba/'))
      .toEqual(['aaskjdhajkssak.md', 'pato.html', 'prueba.md']);
  });
});

// '/home/vilmango/Documents/LIM011-fe-md-links/prueba'

describe('getsMDFilesFromaPath', () => {
  it('Should be a function', () => {
    expect(typeof functions.getsMDFilesFromaPath).toBe('function');
  });
  it('Should return an array of 1 element ending in a file', () => {
    expect(functions.getsMDFilesFromaPath('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'))
      .toEqual(['/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md']);
  });
  it('Should return an array of paths ending in a file', () => {
    expect(functions.getsMDFilesFromaPath('/home/vilmango/Documents/LIM011-fe-md-links/prueba'))
      .toEqual([
        '/home/vilmango/Documents/LIM011-fe-md-links/prueba/aaskjdhajkssak.md',
        '/home/vilmango/Documents/LIM011-fe-md-links/prueba/pato.html',
        '/home/vilmango/Documents/LIM011-fe-md-links/prueba/prueba.md',
      ]);
  });
});
describe('getMDfilesFromArray', () => {
  const arrayOfPaths = ['/home/vilmango/Documents/LIM011-fe-md-links/prueba/aaskjdhajkssak.md', '/home/vilmango/Documents/LIM011-fe-md-links/prueba/pato.html', '/home/vilmango/Documents/LIM011-fe-md-links/prueba/prueba.md'];
  const returnedArray = ['/home/vilmango/Documents/LIM011-fe-md-links/prueba/aaskjdhajkssak.md', '/home/vilmango/Documents/LIM011-fe-md-links/prueba/prueba.md'];
  it('Should be a function', () => {
    expect(typeof functions.getMDfilesFromArray).toBe('function');
  });
  it('Should return an array of paths that end on .md files', () => {
    expect(functions.getMDfilesFromArray(arrayOfPaths)).toEqual(returnedArray);
  });
});
