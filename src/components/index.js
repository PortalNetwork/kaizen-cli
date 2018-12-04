require("@babel/polyfill");

const yargs = require('yargs');
require('./Config')(yargs);
require('./Create')(yargs);
//require('./Deploy');
//require('./Info');
require('./Install')(yargs);

/** Plugin Management **/
require('./Plugin')(yargs);
require('./Plugin/Install')(yargs);
require('./Plugin/Uninstall')(yargs);
require('./Plugin/List')(yargs);

/** Contract Management **/
require('./Contract/Deploy')(yargs);

/** Platform Management **/
require('./Platform/Login')(yargs);
require('./Platform/Logout')(yargs);

//require('./AddPlugin')(yargs);
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