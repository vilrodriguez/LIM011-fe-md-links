#!/usr/bin/env node
const cli = require('../src/mdlinksCli.js');

const path = process.argv[2];

const option1 = process.argv[3];

const option2 = process.argv[4];

cli(path, option1, option2).then((response) => console.log(response));

// console.log('aksdjalskjdklajdklas');