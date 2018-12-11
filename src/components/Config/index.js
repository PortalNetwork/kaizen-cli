require('colors');

function builder(yargs) {
  require('./Set')(yargs);
  require('./Get')(yargs);
  require('./Unset')(yargs);
	return yargs
  .example('kaizen config set')
  .example('kaizen config get')
  .example('kaizen config unset')
  .demandCommand(1, '')
  .epilogue(
		'Configuration management:\n\n'.underline.yellow + 
    'Use ' + '\'kaizen config <command>\''.yellow + ' allow you to ' + 
    '\'get\''.yellow + ', ' + '\'set\''.yellow + ', ' + '\'unset\''.yellow + ' the configuration into KAIZEN environment.'
	);
}

async function handler(argv) {
	
}

module.exports = function (yargs) {
	const command = 'config';
	const commandDescription = 'Config management for KAIZEN';
	yargs.command(command, commandDescription, builder, handler);
}
