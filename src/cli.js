#!/usr/bin/env node
// debugger
const cli = require('./mdlinksCli');

const path = process.argv[2];

const option1 = process.argv[3];

const option2 = process.argv[4];

// console.log('aqui', path);

cli(path, option1, option2).then((response) => console.log(response));
