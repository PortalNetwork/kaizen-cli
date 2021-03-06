function builder(yargs) {
  require('./Install')(yargs);
  require('./Uninstall')(yargs);
  require('./List')(yargs);

  return yargs
  .example('kaizen plugins install')
  .example('kaizen plugins uninstall')
  .example('kaizen plugins list')
  .demandCommand(1, '')
  .epilogue(
		'Available plugins:\n\n'.underline.yellow + 
    'bluzelle'.underline.yellow + ' - Decentralized database\n' +
    'nkn'.underline.yellow + ' - Data transmisstion\n' + 
    'noia'.underline.yellow + ' - Decentralized CDN\n' + 
    'icon'.underline.yellow + ' - Blockchain\n' +
    'orbit'.underline.yellow + ' - Decentralized database\n' + 
    'arweave'.underline.yellow + ' - Decentralized file storage\n' +
    'band'.underline.yellow + ' - Data Oracle\n' +
    'fluence'.underline.yellow + ' - Decentralized database\n' +
    'sia'.underline.yellow + ' - Decentralized file storage\n' +
    'near'.underline.yellow + ' - Scalable decentralized application\n' +
    'tellor'.underline.yellow + ' - Decentralized oracle service\n' +
    'skale'.underline.yellow + ' - Elastic blockchain network\n' +
    'ren'.underline.yellow + ' - Inter-blockchain liquidity for all decentralized applications\n' +
    'nervos'.underline.yellow + ' - Multi-asset, store of value blockchain\n' +
    'kava'.underline.yellow + ' - Cross-chain CDP platform for leverage assets\n' +
    'zabo'.underline.yellow + ' - Zabo SDK provides convenient access to the Zabo API\n' +
    'loom'.underline.yellow + ' - Loom network provides multichain interop platform for serious dapp developers\n' +
    'witnet'.underline.yellow + ' - Witnet provides decentralized oracle network\n' + 
		'\nRun ' + '\'kaizen plugins <command>\''.yellow + 
		' to interact with plugins.\n'
	);
}

async function handler(argv) {
  
}

module.exports = function (yargs) {
  const command = 'plugins';
  const commandDescription = 'Plugin management for kaizen';
  yargs.command(command, commandDescription, builder, handler);
}
