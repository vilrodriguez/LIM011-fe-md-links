
const fetchMock = require('fetch-mock');
const functions = require('../src/index.js');

fetchMock.mock('*', 200);

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
- [Pill de recursión - repositorio](https://github.com/merunga/pildora-recursin)
- [Pill de recursión - repositorio](xxxxxxx)`;
  it('Should be a function', () => {
    expect(typeof functions.readMdFile).toBe('function');
  });
  it('Should read a .md file and return its content as a string', () => {
    expect(functions.readMdFile('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'))
      .toStrictEqual(text);
  });
});
describe('getLinksFromString', () => {
  const text = `Esto es un texto de prueba :3
- [Pill de recursión - video](https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s)
- [Pill de recursión - repositorio](https://github.com/merunga/pildora-recursion)`;
  const links = ['[Pill de recursión - video](https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s)',
    '[Pill de recursión - repositorio](https://github.com/merunga/pildora-recursion)',
  ];
  it('Should be a function', () => {
    expect(typeof functions.getLinksFromString).toBe('function');
  });
  it('Should return an array of links found in the md file', () => {
    expect(functions.getLinksFromString(text))
      .toEqual(links);
  });
});
describe('returnLinks', () => {
  const links = ['[Pill de recursión - video](https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s)',
    '[Pill de recursión - repositorio](https://github.com/merunga/pildora-recursion)'];
  const obj = [
    {
      text: '[Pill de recursión - video]',
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
    },
    {
      text: '[Pill de recursión - repositorio]',
      link: 'https://github.com/merunga/pildora-recursion',
      file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
    },
  ];
  it('Should be a function', () => {
    expect(typeof functions.returnLinks).toBe('function');
  });
  it('Should return an array of element with href/text/file', () => {
    expect(functions.returnLinks(links, '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'))
      .toEqual(obj);
  });
});

describe('getLinksFromString', () => {
  const text = `Esto es un texto de prueba :3
- [Pill de recursión - video](https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s)
- [Pill de recursión - repositorio](https://github.com/merunga/pildora-recursion)
- [Pill de recursión - repositorio](https://githuunga/pildora-recursion)`;
  const links = ['[Pill de recursión - video](https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s)',
    '[Pill de recursión - repositorio](https://github.com/merunga/pildora-recursion)', '[Pill de recursión - repositorio](https://githuunga/pildora-recursion)',
  ];
  it('Should be a function', () => {
    expect(typeof functions.getLinksFromString).toBe('function');
  });
  it('Should return an array of links found in the md file', () => {
    expect(functions.getLinksFromString(text))
      .toEqual(links);
  });
});

describe('verifyLinkStatus', () => {
  const dataToFetchFrom = [
    {
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      text: '[Pill de recursión - video]',
      file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
    },
    {
      link: 'https://github.com/merunga/pildora-recursin',
      text: '[Pill de recursión - repositorio]',
      file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
    },
    {
      link: 'xxxxxxx',
      text: '[Pill de recursión - repositorio]',
      file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
    },
  ];
  const returnedData = [
    {
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      text: '[Pill de recursión - video]',
      file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
      status: 200,
      message: 'OK',
    },
    {
      link: 'https://github.com/merunga/pildora-recursin',
      text: '[Pill de recursión - repositorio]',
      file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
      status: 404,
      message: 'Fail',
    },
    {
      link: 'xxxxxxx',
      text: '[Pill de recursión - repositorio]',
      file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
      message: 'Error: Invalid Link',
    },
    {
      link: 'xxxxxxx',
      text: '[Pill de recursión - repositorio]',
      file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
      message: 'Error: Invalid Link',
    },
  ];
  const returnedDataCatch = [{
    link: 'xxxxxxx',
    text: '[Pill de recursión - repositorio]',
    file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
    message: 'Error: Invalid Link',
  },
  ];

  it('Should be a function', () => {
    expect(typeof functions.verifyLinkStatus).toBe('function');
  });
  it('Should return an object ', (done) => functions.verifyLinkStatus(dataToFetchFrom).then((data) => {
    expect(data).toEqual(returnedData);
    done();
  }).catch((e) => {
    expect(e).toEqual(returnedDataCatch);
    done();
  }));
});

describe('stats', () => {
  const obj = [{
    link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
    text: '[Pill de recursión - video]',
    file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
  },
  {
    link: 'https://github.com/merunga/pildora-recursin',
    text: '[Pill de recursión - repositorio]',
    file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
  },
  {
    link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
    text: '[Pill de recursión - video]',
    file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
  }];
  const returnedStats = `Total Links in file: 3 
Unique Links: 2`;
  it('Should be a function', () => {
    expect(typeof functions.stats).toBe('function');
  });
  it('Should return Total links in file and how many are Unique links', () => {
    expect(functions.stats(obj)).toBe(returnedStats);
  });
});
