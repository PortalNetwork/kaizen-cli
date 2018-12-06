"use strict";

require("@babel/polyfill");

var yargs = require('yargs');

require('./Config')(yargs);

require('./Create')(yargs); //require('./Deploy')(yargs);
//require('./Info')(yargs);


require('./Install')(yargs);
/** Plugin Management **/


require('./Plugins')(yargs);
/** Contract Management **/


require('./Contracts')(yargs);
/** Blockchain Management **/


require('./Blockchains')(yargs);
/** Platform Management **/


require('./Platform/Login')(yargs);

require('./Platform/Logout')(yargs); //require('./AddPlugin')(yargs);
//require('./RemovePlugin')(yargs);
//require('./CreateProject')(yargs);
//require('./BuildProject')(yargs);
//require('./IPFSUpload')(yargs);
//require('./TestContracts')(yargs);
//require('./CompileContracts')(yargs);
//require('./DeployContracts')(yargs);
//require('./Settings')(yargs);


yargs.demandCommand();
module.exports = yargs;