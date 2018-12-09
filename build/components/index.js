"use strict";

require("@babel/polyfill");

var yargs = require('yargs');

require('./Config')(yargs);

require('./Create')(yargs);

require('./Upload')(yargs); //require('./Info')(yargs);


require('./Install')(yargs);
/** Plugin Management **/


require('./Plugins')(yargs);
/** Contract Management **/


require('./Contracts')(yargs);
/** Blockchain Management **/


require('./Blockchains')(yargs);
/** Platform Management **/


require('./Platform/Login')(yargs);

require('./Platform/Logout')(yargs);

require('./Platform/Instances')(yargs);

yargs.demandCommand(1, 'You need at least one command before moving on');
module.exports = yargs;