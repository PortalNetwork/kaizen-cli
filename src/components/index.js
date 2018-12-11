require("@babel/polyfill");
require('colors');

const yargs = require('yargs');
require('./Config')(yargs);
require('./Create')(yargs);
require('./Upload')(yargs);
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
require('./Platform/Logout')(yargs);
require('./Platform/Instances')(yargs);

yargs
.demandCommand(1, '')
.epilogue(
  'Welcome to KAIZEN\n\n'.yellow + 
  'KAIZEN Framework\n'.underline.yellow +
  'Not sure how to use?\n'.gray + 
  'Use ' + '\'kaizen create -t react -n myproject\'' .yellow + ' to start a new project.\n' + 
  'Try ' + '\'kaizen install -u <GITHUB_URL>\''.yellow + ' to download example project.\n\n' + 
  'KAIZEN Platform (Alpha)\n'.underline.yellow +
  'Interact with KAIZEN Platform, please login first.\n'.grey +
  'Use ' + '\'kaizen login\''.yellow + ' to login KAIZEN Platform.\n\n' +
  'More information and documentation, please visit:\n' +
  'https://github.com/PortalNetwork/kaizen-cli'.yellow.underline + '\n'
);

module.exports = yargs;