function builder(yargs) {
  require('./Deploy')(yargs);
  require('./List')(yargs);
	return yargs
  .example('kaizen instances deploy')
  .example('kaizen instances list')
  .demandCommand(1, '');
}

async function handler(argv) {
	
}

module.exports = function (yargs) {
	const command = 'instances';
	const commandDescription = 'Instance management for KAIZEN';
	yargs.command(command, commandDescription, builder, handler);
}
