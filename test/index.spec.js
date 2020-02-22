jest.mock('node-fetch');
const path = require('path');
const functions = require('../src/index.js');
const validate = require('../src/validate.js');
const mdlinks = require('../src/mdlinks.js');
const cliFunction = require('../src/mdlinksCli.js');


// path.join(process.cwd(), 'xx');
const relativePath = 'README.md';
const absolutePath = path.join(process.cwd(), 'README.md');
const badPath = path.join(process.cwd(), 'badPath', 'README.md');
const folderPath = path.join(process.cwd(), 'src');
describe('resolveExistingPathToAbsolute', () => {
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
    expect(functions.isAbsolutePathaFile(absolutePath)).toBe(true);
  });
  it('Should return FALSE if the path is not a File', () => {
    expect(functions.isAbsolutePathaFile(folderPath)).toBe(false);
  });
});
describe('isAbsolutePathaFolder', () => {
  it('Should be a function', () => {
    expect(typeof functions.isAbsolutePathaFolder).toBe('function');
  });
  it('Should return FALSE if the path is a File', () => {
    expect(functions.isAbsolutePathaFolder(absolutePath)).toBe(false);
  });
  it('Should return TRUE if the path is a Folder', () => {
    expect(functions.isAbsolutePathaFolder(folderPath)).toBe(true);
  });
});

describe('getFilesInFolder', () => {
  it('Should be a function', () => {
    expect(typeof functions.getFilesInFolder).toBe('function');
  });
  
  it('Should return an array with files in folder', () => {
    expect(functions.getFilesInFolder(path.join(process.cwd(), 'testFiles')))
      .toEqual(['TestRead.md', 'pato.html', 'prueba.md']);
  });
});

describe('getFileFromPathOrFolder', () => {
  const pathWithMDFile = path.join(process.cwd(), 'testFiles', 'TestRead.md');
  const pathWithFolder = path.join(process.cwd(), 'testFiles');
  const arrayWithMDfiles = [
    path.join(process.cwd(), 'testFiles', 'TestRead.md'),
    path.join(process.cwd(), 'testFiles', 'prueba.md'),
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
  const arrayOfPaths = [path.join(process.cwd(), 'testFiles', 'TestRead.md'), path.join(process.cwd(), 'testFiles', 'pato.html'), path.join(process.cwd(), 'testFiles', 'prueba.md')];
  const returnedArray = [path.join(process.cwd(), 'testFiles', 'TestRead.md'), path.join(process.cwd(), 'testFiles', 'prueba.md')];
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
    expect(functions.readMdFile(path.join(process.cwd(), 'testFiles', 'TestRead.md')))
      .toStrictEqual(text);
  });
});
const route = path.join(process.cwd(), 'testFiles', 'TestRead.md');
describe('returnLinks', () => {

  const obj = [
    {
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      text: '[Pill de recursión - video]',
      file: route,
    },
    {
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      text: '[Pill de recursión - video]',
      file: route,
    },
    {
      link: 'https://github.com/merunga/pildora-recursin',
      text: '[Pill de recursión - repositorio]',
      file: route,
    },
    {
      link: 'xxxxxxx',
      text: '[Pill de recursión - repositorio]',
      file: route,
    },
  ];
  it('Should be a function', () => {
    expect(typeof functions.returnLinks).toBe('function');
  });
  it('Should return an array of element with href/text/file', () => {
    expect(functions.returnLinks(route))
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
  const returnedData = [
    {
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      text: '[Pill de recursión - video]',
      file: route,
      status: 200,
      message: 'OK',
    },
    {
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      text: '[Pill de recursión - video]',
      file: route,
      status: 200,
      message: 'OK',
    },
    {
      link: 'https://github.com/merunga/pildora-recursin',
      text: '[Pill de recursión - repositorio]',
      file: route,
      status: 404,
      message: 'Fail',
    },
    {
      link: 'xxxxxxx',
      text: '[Pill de recursión - repositorio]',
      file: route,
      message: 'Error: Invalid Link',
      status: 'Invalid',
    },
  ];

  it('Should be a function', () => {
    expect(typeof validate.verifyLinkStatus).toBe('function');
  });
  it('Should return an object indicating the status of the HTTP request if valid or invalid ', (done) => validate.verifyLinkStatus(route).then((data) => {
    expect(data).toEqual(returnedData);
    done();
  }));
});
// const route = path.join(process.cwd(), 'testFiles', 'TestRead.md');
describe('stats', () => {
  const obj = [{
    link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
    text: '[Pill de recursión - video]',
    file: route,
  },
  {
    link: 'https://github.com/merunga/pildora-recursin',
    text: '[Pill de recursión - repositorio]',
    file: route,
  },
  {
    link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
    text: '[Pill de recursión - video]',
    file: route,
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
      file: route,
      status: 200,
      message: 'OK',
    },
    {
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      text: '[Pill de recursión - video]',
      file: route,
      status: 200,
      message: 'OK',
    },
    {
      link: 'https://github.com/merunga/pildora-recursin',
      text: '[Pill de recursión - repositorio]',
      file: route,
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
      file: route,
    },
    {
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      text: '[Pill de recursión - video]',
      file: route,
    },
    {
      link: 'https://github.com/merunga/pildora-recursin',
      text: '[Pill de recursión - repositorio]',
      file: route,
    },
    {
      link: 'xxxxxxx',
      text: '[Pill de recursión - repositorio]',
      file: route,
    },
  ];
  const returnedData = [
    {
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      text: '[Pill de recursión - video]',
      file: route,
      status: 200,
      message: 'OK',
    },
    {
      link: 'https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s',
      text: '[Pill de recursión - video]',
      file: route,
      status: 200,
      message: 'OK',
    },
    {
      link: 'https://github.com/merunga/pildora-recursin',
      text: '[Pill de recursión - repositorio]',
      file: route,
      status: 404,
      message: 'Fail',
    },
    {
      link: 'xxxxxxx',
      text: '[Pill de recursión - repositorio]',
      file: route,
      message: 'Error: Invalid Link',
      status: 'Invalid',
    },
  ];

  it('Should be a function ', () => {
    expect(typeof mdlinks).toBe('function');
  });
  it('Should return an array of links with text and path if Validate is False', () => expect(mdlinks(route, { validate: false })).resolves.toEqual(returnedData2));
  it('Should return an array of links with OK status if Validate is True', () => expect(mdlinks(route, { validate: true })).resolves.toEqual(returnedData));
});

describe('cliFunction', () => {
  it('Should be a function', () => {
    expect(typeof cliFunction).toBe('function');
  });
  const pathFile = route;
  const returnedData = `${route} https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s [Pill de recursión - video] OK 200
${route} https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s [Pill de recursión - video] OK 200
${route} https://github.com/merunga/pildora-recursin [Pill de recursión - repositorio] Fail 404
${route} xxxxxxx [Pill de recursión - repositorio] Error: Invalid Link Invalid
`;
  const stat = '--stats';
  const validatee = '--validate';
  it('Should return a string with validated links if option1 is --validate', (done) => {
    cliFunction(pathFile, validatee).then((data) => {
      expect(data).toEqual(returnedData);
      done();
    });
  });
  it('Should return a string with links# and Unique Links if option1 is --stats', (done) => {
    const returnedStats = `Total Links in file: 4 
Unique Links: 3`;
    cliFunction(pathFile, stat).then((data) => {
      expect(data).toEqual(returnedStats);
      done();
    });
  });
  it('Should return a string with links, text and path reference if option1 null or undefined', (done) => {
    const returned = `${route} https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s [Pill de recursión - video]
${route} https://www.youtube.com/watch?v=lPPgY3HLlhQ&t=916s [Pill de recursión - video]
${route} https://github.com/merunga/pildora-recursin [Pill de recursión - repositorio]
${route} xxxxxxx [Pill de recursión - repositorio]
`;
    cliFunction(pathFile, undefined).then((data) => {
      expect(data).toEqual(returned);
      done();
    });
  });
  it('Should return Link #, unique and broken links if options are --validate and --stats', (done) => {
    const returnedStatValidate = `Total Links in file: 4 
Unique Links: 3 
Broken: 2`;
    cliFunction(pathFile, stat, validatee).then((data) => {
      expect(data).toEqual(returnedStatValidate);
      done();
    });
  });
});
