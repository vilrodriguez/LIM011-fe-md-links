
const fetchMock = require('fetch-mock');
const functions = require('../src/index.js');
const validate = require('../src/validate.js');
const mdlinks = require('../src/mdlinks.js');

fetchMock.mock('*', 200);

describe('resolveExistingPathToAbsolute', () => {
  const relativePath = 'README.md';
  const absolutePath = '/home/vilmango/Documents/LIM011-fe-md-links/README.md';
  const badPath = '/home/vilmango/Documents/LIM011-felinks/README.md';

  it('Should be a function', () => {
    expect(typeof functions.resolveExistingPathToAbsolute).toBe('function');
  });
  it('Should return the same absolute Path', () => {
    expect(functions.resolveExistingPathToAbsolute(absolutePath)).toBe(absolutePath);
  });
  it('Should resolve a relative Path to an Absolute Path', () => {
    expect(functions.resolveExistingPathToAbsolute(relativePath)).toBe(absolutePath);
  });
  it('Should return an "Path doesnt Exist" Message', () => {
    expect(functions.resolveExistingPathToAbsolute(badPath)).toBe('Path does not exist');
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

// // refactored function test
// describe('verifyPathExtIsMD', () => {
//   it('Should be a function', () => {
//     expect(typeof functions.verifyPathExtIsMD).toBe('function');
//   });
//   it('Should return true if file ext is .md', () => {
//     expect(functions.verifyPathExtIsMD('/home/vilmango/Documents/LIM011-fe-md-links/README.md')).toBe(true);
//   });
//   it('Should return false if file ext is not .md', () => {
//     expect(functions.verifyPathExtIsMD('/home/vilmango/Documents/LIM011-fe-md-links/')).toBe(false);
//   });
// });

describe('getFilesInFolder', () => {
  it('Should be a function', () => {
    expect(typeof functions.getFilesInFolder).toBe('function');
  });
  it('Should return an array with files in folder', () => {
    expect(functions.getFilesInFolder('/home/vilmango/Documents/LIM011-fe-md-links/prueba/'))
      .toEqual(['pato.html', 'prueba.md']);
  });
});

describe('getFileFromPathOrFolder', () => {
  const pathWithMDFile = '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md';
  const pathWithFolder = '/home/vilmango/Documents/LIM011-fe-md-links/prueba';
  const arrayWithMDfiles = [
    '/home/vilmango/Documents/LIM011-fe-md-links/prueba/prueba.md',
  ];
  it('Should be a function', () => {
    expect(typeof functions.getFileFromPathOrFolder).toBe('function');
  });
  it('Should return an array of 1 element ending in a file', () => {
    expect(functions.getFileFromPathOrFolder(pathWithMDFile))
      .toEqual([pathWithMDFile]);
  });
  it('Should return an array of paths ending in a file', () => {
    expect(functions.getFileFromPathOrFolder(pathWithFolder))
      .toEqual(arrayWithMDfiles);
  });
});
describe('getMDfilesFromArray', () => {
  const arrayOfPaths = ['/home/vilmango/Documents/LIM011-fe-md-links/prueba/pato.html', '/home/vilmango/Documents/LIM011-fe-md-links/prueba/prueba.md'];
  const returnedArray = ['/home/vilmango/Documents/LIM011-fe-md-links/prueba/prueba.md'];
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
  const obj = [
    {
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      text: '[Pill de recursión - video]',
      file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
    },
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
  ];
  it('Should be a function', () => {
    expect(typeof functions.returnLinks).toBe('function');
  });
  it('Should return an array of element with href/text/file', () => {
    expect(functions.returnLinks('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md'))
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
  // const dataToFetchFrom = [
  //   {
  //     link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
  //     text: '[Pill de recursión - video]',
  //     file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
  //   },
  //   {
  //     link: 'https://github.com/merunga/pildora-recursin',
  //     text: '[Pill de recursión - repositorio]',
  //     file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
  //   },
  //   {
  //     link: 'xxxxxxx',
  //     text: '[Pill de recursión - repositorio]',
  //     file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
  //   },
  // ];
  const returnedData = [
    {
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      text: '[Pill de recursión - video]',
      file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
      status: 200,
      message: 'OK',
    },
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
  ];
  // const returnedDataCatch = [{
  //   link: 'xxxxxxx',
  //   text: '[Pill de recursión - repositorio]',
  //   file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
  //   message: 'Error: Invalid Link',
  // },
  // ];

  it('Should be a function', () => {
    expect(typeof validate.verifyLinkStatus).toBe('function');
  });
  it('Should return an object indicating the status of the HTTP request if valid or invalid ', (done) => validate.verifyLinkStatus('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md').then((data) => {
    expect(data).toEqual(returnedData);
    done();
  }));
  // it('Should return an object indicating the status of the HTTP request if valid or invalid ', (done) => validate.verifyLinkStatus('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md').then((data) => {
  //   expect(data).toEqual(returnedData);
  //   done();
  // }));
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
    expect(typeof validate.stats).toBe('function');
  });
  it('Should return Total links in file and how many are Unique links', () => {
    expect(validate.stats(obj)).toBe(returnedStats);
  });
});

describe('validateBrokenLinks', () => {
  const obj = [
    {
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      text: '[Pill de recursión - video]',
      file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
      status: 200,
      message: 'OK',
    },
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
  ];
  const returnedStats = `Total Links in file: 3 
Unique Links: 2 
Broken: 1`;
  it('Should be a function', () => {
    expect(typeof validate.validateBrokenLinks).toBe('function');
  });
  it('Should return #of Links, # of Unique Links and # of Broken links', () => {
    expect(validate.validateBrokenLinks(obj)).toEqual(returnedStats);
  });
});

describe('mdlinks', () => {
  const returnedData2 = [
    {
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      text: '[Pill de recursión - video]',
      file: '/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md',
    },
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
  ];

  it('Should be a function ', () => {
    expect(typeof mdlinks).toBe('function');
  });

  it('Should return an array of links with text and path if Validate is False', () => expect(mdlinks('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md', { validate: false })).resolves.toEqual(returnedData2));
  it('Should return an array of links with OK status if Validate is True', () => expect(mdlinks('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md', { validate: true })).resolves.toEqual(returnedData));
  // it('Should return an array of links with OK status if Validate is True', (done) => mdlinks('/home/vilmango/Documents/LIM011-fe-md-links/TestRead.md', true).then((data) => {
  //   expect(data).toEqual(returnedData);
  //   done();
  // }));
});
