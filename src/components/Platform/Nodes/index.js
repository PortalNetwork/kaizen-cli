function builder(yargs) {
  require('./Deploy')(yargs);
  require('./List')(yargs);
  require('./Info')(yargs);
	return yargs
  .example('kaizen nodes deploy')
  .example('kaizen nodes info')
  .example('kaizen nodes list')
  .demandCommand(1, '');
}

async function handler(argv) {
	
}

module.exports = function (yargs) {
	const command = 'nodes';
	const commandDescription = 'Node management of KAIZEN Platform';
	yargs.command(command, commandDescription, builder, handler);
}
