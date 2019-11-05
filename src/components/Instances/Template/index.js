const Log = require('../../../lib/Log');
require('colors');

function builder(yargs) {
  
}

async function handler(argv) {
  Log.NormalLog('Available instance template:'.underline.yellow);
  Log.NormalLog('nym-loopix-mixnode'.underline.yellow + ' - Nym is a blockchain-based privacy platform.');

  Log.NormalLog("\nTo start a instance run " + "'kaizen instances run <instance-name-here>'".yellow)

  Log.NormalLog("\nIt will be automatically start instance on AWS\n");
}

module.exports = function (yargs) {
  const command = 'template';
  const commandDescription = 'Template lists of all available instance';
  yargs.command(command, commandDescription, builder, handler);
}