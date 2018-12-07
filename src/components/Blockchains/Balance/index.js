const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');
const ethereumHandler = require('./ethereum.js');
const wanchainHandler = require('./wanchain.js');

function builder(yargs) {
  return yargs
    .option('blockchain', {
      alias: 'b',
      type: 'string',
      describe: 'Blockchain'
    })
    .option('network', {
      alias: 'n',
      type: 'string',
      describe: 'Network of the blockchain'
    })
    .option('address', {
      alias: 'a',
      type: 'string',
      describe: 'Address of the balance'
    })
    .example('kaizen blockchains balance --blockchain ethereum --network 1 --address 0x3cddcb8cf10c4facfbf960309806d8a3a3f19a40')
    .demandOption(['blockchain', 'network', 'address'], 'Please enter the information to get the balance');
}

async function handler(argv) {
  try {
    const { blockchain, network, address } = argv;
    let balance = '0';
    
    switch (blockchain) {
      case 'ethereum':
        Spinner.start();
        balance = await ethereumHandler(network, address);
        Spinner.stop();
        Log.NormalLog(`The address ${address} balance is ${balance} ETH`);
        break;
      case 'wanchain':
        Spinner.start();
        balance = await wanchainHandler(network, address);
        Spinner.stop();
        Log.NormalLog(`The address ${address} balance is ${balance} WAN`);
        break;
      default:
        Log.NormalLog('blockchain not support yet');
    }
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'balance';
  const commandDescription = 'Get address balance';
  yargs.command(command, commandDescription, builder, handler);
}
