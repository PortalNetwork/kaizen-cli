require("@babel/polyfill");

const yargs = require('yargs');
require('./AddPlugin')(yargs);
require('./RemovePlugin')(yargs);
require('./CreateProject')(yargs);
require('./BuildProject')(yargs);
require('./IPFSUpload')(yargs);
require('./TestContracts')(yargs);
require('./CompileContracts')(yargs);
require('./DeployContracts')(yargs);
require('./Login')(yargs);
require('./Logout')(yargs);
require('./RefreshToken')(yargs);
require('./Settings')(yargs);

module.exports = yargs;