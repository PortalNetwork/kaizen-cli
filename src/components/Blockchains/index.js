function builder(yargs) {
	require('./List')(yargs);
	require('./Faucet')(yargs);
	require('./TxResult')(yargs);
	require('./Balance')(yargs);
	return yargs
	.example('kaizen blockchains list')
	.example('kaizen blockchains txresult')
	.example('kaizen blockchains balance')
	.example('kaizen blockchains faucet')
	.demandCommand();
}

async function handler(argv) {
	
}

module.exports = function (yargs) {
	const command = 'blockchains';
	const commandDescription = 'Blockchain management for KAIZEN';
	yargs.command(command, commandDescription, builder, handler);
}
