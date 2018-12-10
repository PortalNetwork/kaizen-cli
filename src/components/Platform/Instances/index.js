function builder(yargs) {
  require('./Deploy')(yargs);
  require('./List')(yargs);
  require('./Info')(yargs);
	return yargs
  .example('kaizen instances deploy')
  .example('kaizen instances info')
  .example('kaizen instances list')
  .demandCommand(1, '');
}

async function handler(argv) {
	
}

module.exports = function (yargs) {
	const command = 'instances';
	const commandDescription = 'Instance management of KAIZEN Platform';
	yargs.command(command, commandDescription, builder, handler);
}
