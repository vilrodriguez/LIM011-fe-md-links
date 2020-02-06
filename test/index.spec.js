
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

describe('relativePathToAbsolute', () => {
  it('Should be a function', () => {
    expect(typeof functions.relativePathToAbsolute).toBe('function');
  });
  it('Should receive a relative path and return an absolute path', () => {
    expect(functions.relativePathToAbsolute('./README.md')).toBe('/home/vilmango/Documents/LIM011-fe-md-links/README.md');
  });
});
describe('isAbsolutePathaFile', () => {
  it('Should be a function', () => {
    expect(typeof functions.isAbsolutePathaFile).toBe('function');
  });
  it('Should return TRUE if the path is a File', () => {
    expect(functions.isAbsolutePathaFile('/home/vilmango/Documents/LIM011-fe-md-links/package.json')).toBe(true);
  });
  it('Should return FALSE if the path is not a File', () => {
    expect(functions.isAbsolutePathaFile('/home/vilmango/Documents/LIM011-fe-md-links')).toBe(false);
  });
});
describe('isAbsolutePathaFolder', () => {
  it('Should be a function', () => {
    expect(typeof functions.isAbsolutePathaFolder).toBe('function');
  });
  it('Should return FALSE if the path is a File', () => {
    expect(functions.isAbsolutePathaFolder('/home/vilmango/Documents/LIM011-fe-md-links/package.json')).toBe(false);
  });
  it('Should return TRUE if the path is a Folder', () => {
    expect(functions.isAbsolutePathaFolder('/home/vilmango/Documents/LIM011-fe-md-links')).toBe(true);
  });
});

// refactored function test
describe('verifyPathExtIsMD', () => {
  it('Should be a function', () => {
    expect(typeof functions.verifyPathExtIsMD).toBe('function');
  });
  it('Should return true if file ext is .md', () => {
    expect(functions.verifyPathExtIsMD('/home/vilmango/Documents/LIM011-fe-md-links/README.md')).toBe(true);
  });
  it('Should return false if file ext is not .md', () => {
    expect(functions.verifyPathExtIsMD('/home/vilmango/Documents/LIM011-fe-md-links/')).toBe(false);
  });
});

describe('getFilesInFolder', () => {
  it('Should be a function', () => {
    expect(typeof functions.getFilesInFolder).toBe('function');
  });
  it('Should return an array with files in folder', () => {
    expect(functions.getFilesInFolder('/home/vilmango/Documents/LIM011-fe-md-links/prueba/'))
      .toEqual(['aaskjdhajkssak.md', 'pato.html', 'prueba.md']);
  });
});

// '/home/vilmango/Documents/LIM011-fe-md-links/prueba'

describe('getFileFromPathOrFolder', () => {
  it('Should be a function', () => {
    expect(typeof functions.getFileFromPathOrFolder).toBe('function');
  });
  it('Should return an array of 1 element ending in a file', () => {
    expect(functions.getFileFromPathOrFolder('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'))
      .toEqual(['/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md']);
  });
  it('Should return an array of paths ending in a file', () => {
    expect(functions.getFileFromPathOrFolder('/home/vilmango/Documents/LIM011-fe-md-links/prueba'))
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

describe('readMdFile', () => {
  const text = `Esto es un texto de prueba :3
- [Pill de recursión - video](https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s)
- [Pill de recursión - repositorio](https://github.com/merunga/pildora-recursion)`;
  it('Should be a function', () => {
    expect(typeof functions.readMdFile).toBe('function');
  });
  it('Should read a .md file and return its content as a string', () => {
    expect(functions.readMdFile('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'))
      .toEqual(text);
  });
});
describe('getLinksFromString', () => {
  const text = `Esto es un texto de prueba :3
- [Pill de recursión - video](https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s)
- [Pill de recursión - repositorio](https://github.com/merunga/pildora-recursion)`;
  const links = ['(https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s)', '(https://github.com/merunga/pildora-recursion)'];
  it('Should be a function', () => {
    expect(typeof functions.getLinksFromString).toBe('function');
  });
  it('Should return an array of links found in the md file', () => {
    expect(functions.getLinksFromString(text))
      .toEqual(links);
  });
});
