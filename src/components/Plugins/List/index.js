const Log = require('../../../lib/Log');
require('colors');

function builder(yargs) {
  
}

async function handler(argv) {
  Log.NormalLog('Available plugin list:');
  Log.NormalLog('bluzelle'.underline.yellow + ' - Bluzelle information');
  Log.NormalLog('nkn'.underline.yellow + ' - NKN information');
  Log.NormalLog('noia'.underline.yellow + ' - NOIA information');

  Log.NormalLog("\nTo install a plugin run 'kaizen plugins install <plugin-name-here>'")

  Log.NormalLog("\nIt will be automatically downloaded and added to your package.json and kaizen.json file\n");
}

module.exports = function (yargs) {
  const command = 'list';
  const commandDescription = 'Lists all available plugins';
  yargs.command(command, commandDescription, builder, handler);
}