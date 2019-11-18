function builder(yargs) {
  require('./Run')(yargs);
  require('./List')(yargs);
  require('./Template')(yargs);

  return yargs
  .example('kaizen instances run')
  .example('kaizen instances template')
  .example('kaizen instances list')
  .demandCommand(1, '')
  .epilogue(
		'Available instance templates:\n\n'.underline.yellow + 
    'nym-loopix-mixnode'.underline.yellow + ' - Nym is a blockchain-based privacy platform.\n' +
    'golem'.underline.yellow + ' - Golem is computing power share platform.\n' +
		'\nRun ' + '\'kaizen instances <command>\''.yellow + 
		' to deploy instances to AWS.\n'
	);
}

async function handler(argv) {
  
}

module.exports = function (yargs) {
  const command = 'instances';
  const commandDescription = 'AWS instances management power by kaizen';
  yargs.command(command, commandDescription, builder, handler);
}
