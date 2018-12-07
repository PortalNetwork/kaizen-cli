const Log = require('../../../lib/Log');
require('colors');

function builder(yargs) {
  
}

async function handler(argv) {
  Log.NormalLog('Support blockchain list:');
  Log.NormalLog('ethereum'.underline.yellow + ' - Etheruem information');
  Log.NormalLog('wanchain'.underline.yellow + ' - Wanchain information');

  Log.NormalLog("\nTo interact with blockchain run 'kaizen blockchains <command>'")
}

module.exports = function (yargs) {
  const command = 'list';
  const commandDescription = 'Lists all support blockchains';
  yargs.command(command, commandDescription, builder, handler);
}