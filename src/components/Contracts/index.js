require('colors');

function builder(yargs) {
	require('./Deploy')(yargs);
	return yargs
	.example('kaizen contracts deploy')
	.demandCommand(1, '')
	.epilogue(
		'KAIZEN support smart contracts:'.underline.yellow + 
		'You can develop, test, deploy smart contract though KAIZEN CLI\n\n' +
		'Support contract template:\n\n'.underline.yellow + 
		'Chainlink'.underline.yellow + ' - Chainlink Oracle Service, ' +
    'https://github.com/PortalNetwork/kaizen-contracts/tree/master/Chainlink'.underline.yellow + '\n' +
		'ERC20'.underline.yellow + ' - ERC20 Token Standard, ' + 
		'https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20'.underline.yellow + '\n' +
		'ERC721'.underline.yellow + ' - ERC721 Token Standard, ' + 
		'https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC721'.underline.yellow + '\n\n' + 
		'NOTE: ' + 'Please make sure use '.gray + '\'kaizen config set --key <KEY> --value <VALUE>\''.yellow + 
		' to setup the configuration before you deploy smart contracts.'.gray
	);
}

async function handler(argv) {
	
}

module.exports = function (yargs) {
	const command = 'contracts';
	const commandDescription = 'Contract management for KAIZEN';
	yargs.command(command, commandDescription, builder, handler);
}
