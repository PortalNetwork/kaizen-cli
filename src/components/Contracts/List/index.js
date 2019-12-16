const Log = require('../../../lib/Log');
require('colors');

function builder(yargs) {
  
}

async function handler(argv) {
  Log.NormalLog('Available contract list:');
  Log.NormalLog('ChainLink'.underline.yellow + ' - Chainlink Oracle Service, link: ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/Chainlink'.underline.yellow);
  Log.NormalLog('ERC20'.underline.yellow + ' - ERC20 Token Standard, link: ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20'.underline.yellow);
  Log.NormalLog('ERC721'.underline.yellow + ' - ERC721 Token Standard, link: ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC721'.underline.yellow);
  Log.NormalLog('NuCypher'.underline.yellow + ' - NuCypher Contracts, link: ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/NuCypher'.underline.yellow)
  Log.NormalLog('Hopr'.underline.yellow + ' - Hopr Contracts, link: ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/Hopr'.underline.yellow)

  Log.NormalLog("\nTo install a plugin run " + "'kaizen contracts deploy <contract-link-here>'".yellow)
}

module.exports = function (yargs) {
  const command = 'list';
  const commandDescription = 'Lists all available contracts';
  yargs.command(command, commandDescription, builder, handler);
}