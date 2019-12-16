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
