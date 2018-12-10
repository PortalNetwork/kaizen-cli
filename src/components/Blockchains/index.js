function builder(yargs) {
	require('./Faucet')(yargs);
	require('./Tx')(yargs);
	require('./Balance')(yargs);
	return yargs
	.example('kaizen blockchains tx')
	.example('kaizen blockchains balance')
	.example('kaizen blockchains faucet')
	.demandCommand(1, '')
	.epilogue(
		'Support blockchains:\n\n'.underline.yellow + 
    'ethereum'.underline.yellow + ' - Etheruem blockchain\n' +
    'wanchain'.underline.yellow + ' - Wanchain blockchain\n' + 
		'\nRun ' + '\'kaizen blockchains <command>\''.yellow + 
		' to interact with blockchain.\n'
	);
}

async function handler(argv) {
	
}

module.exports = function (yargs) {
	const command = 'blockchains';
	const commandDescription = 'Blockchain management for KAIZEN';
	yargs.command(command, commandDescription, builder, handler);
}
