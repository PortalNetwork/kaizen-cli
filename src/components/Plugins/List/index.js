const Log = require('../../../lib/Log');
require('colors');

function builder(yargs) {
  
}

async function handler(argv) {
  Log.NormalLog('Available plugin list:');
  Log.NormalLog('bluzelle'.underline.yellow + ' - Bluzelle information');
  Log.NormalLog('nkn'.underline.yellow + ' - NKN information');
  Log.NormalLog('noia'.underline.yellow + ' - NOIA information');
  Log.NormalLog('icon'.underline.yellow + ' - ICON information');
  Log.NormalLog('orbit'.underline.yellow + ' - Orbit information');
  Log.NormalLog('arweave'.underline.yellow + ' - Arweave information');
  Log.NormalLog('band'.underline.yellow + ' - Band Protocol information');
  Log.NormalLog('fluence'.underline.yellow + ' - Fluence information');
  Log.NormalLog('sia'.underline.yellow + ' - Sia information');
  Log.NormalLog('near'.underline.yellow + ' - Near information');
  Log.NormalLog('tellor'.underline.yellow + ' - Tellor information');
  Log.NormalLog('skale'.underline.yellow + ' - Skale information');
  Log.NormalLog('ren'.underline.yellow + ' - Ren information');
  Log.NormalLog('nervos'.underline.yellow + ' - Nervos information');

  Log.NormalLog("\nTo install a plugin run " + "'kaizen plugins install <plugin-name-here>'".yellow)

  Log.NormalLog("\nIt will be automatically downloaded and added to your " + "'package.json'".yellow + " and " + "'kaizen.json'".yellow + " file\n");
}

module.exports = function (yargs) {
  const command = 'list';
  const commandDescription = 'Lists all available plugins';
  yargs.command(command, commandDescription, builder, handler);
}