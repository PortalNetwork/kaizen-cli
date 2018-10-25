require("@babel/polyfill");

const yargs = require('yargs');
require('./AddPlugin')(yargs);
require('./RemovePlugin')(yargs);
require('./CreateProject')(yargs);
require('./BuildProject')(yargs);
require('./IPFSUpload')(yargs);
require('./TestContracts')(yargs);

module.exports = yargs;