const Spinner = require('../../../lib/Spinner');
const Log = require('../../../lib/Log');
const axios = require('axios');

function builder(yargs) {
  return yargs
    .option('blockchain', {
      alias: 'b',
      type: 'string',
      describe: 'Name of the blockchain',
      choices: ['eth', 'etc', 'wan', 'icon', 'qtum', 'neo', 'qkc', 'bch', 'tomo']
    })
    .option('network', {
      alias: 'n',
      type: 'string',
      describe: 'Specify the network',
      choices: ['3']
    })
    .option('address', {
      alias: 'a',
      type: 'string',
      describe: 'Your wallet address'
    })
    .demandOption(['blockchain', 'network', 'address'], '')
    .example('kaizen blockchains faucet --blockchain eth --network 3 --address 0x2d2B3CD3E585fF4065B55668dCac22EBd9E3590D')
    .epilogue(
      'Support blockchain faucet:\n\n'.underline.yellow + 
      'ethereum'.underline.yellow + ' - Ethereum Ropsten testnet, network: ' + '3\n'.yellow +
      'wanchain'.underline.yellow + ' - Wanchain testnet, network: ' + '3\n'.yellow + 
      'icon'.underline.yellow + ' - ICON Yeouido testnet, network: ' + '3\n'.yellow + 
      'quarkchain'.underline.yellow + ' - QuarkChain testnet, network: ' + '3'.yellow
    );
}

async function handler(argv) {
  try {
    Spinner.start();
    const { blockchain, address } = argv;
    console.log(`blockchain:${blockchain}`);
    Log.NormalLog(`Claim tokens, please wait a second`);
    await claimToken(blockchain, address);
    Spinner.stop();
    Log.SuccessLog(`\n==== Claim ${blockchain} Token Successfully ====`);
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog(`\n==== Claim Token Failed ====`);
    console.error("Error message:");
    console.error(error);
    console.error("\nPlease contact support@portal.network for help");
  }
}

function resolveBlockchainName (name) {
  const fullBlockChainName = {
    "eth": "Ethereum-Ropsten",
    "etc": "Ethereum-Classic",
    "wan": "Wanchain",
    "icon": "ICON",
    "qtum": "QTUM",
    "neo": "NEO",
    "qkc": "Quarkchain",
    "bch": "Bitcoin-Cash",
    "tomo": "TomoChain"
  }
  return fullBlockChainName[name];
}

async function claimTokenHelper(url, body, header = null) {
  try {
    const response = await axios.post(url, body, header);
    return response;
  } catch (error){
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw error.response.data;
    } 
    throw error;
  }
}

function claimToken(name, address) {
  let url, body, header;
  if(name === "eth"){
    body = address;
    url = 'https://faucet.metamask.io/';
    header = {
      headers: {
        'Content-Type': 'application/rawdata'
      }
    };
  }else{
    body = {
      "chain": resolveBlockchainName(name),
      "address": address,
      "email": "support@portal.network"
    };
    url = 'https://faucet-server.herokuapp.com/faucet/claim';
  }
  return claimTokenHelper(url, body, header);
}

module.exports = function (yargs) {
  const command = 'faucet';
  const commandDescription = 'Get testnet token';
  yargs.command(command, commandDescription, builder, handler);
}