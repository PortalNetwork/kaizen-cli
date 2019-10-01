const Log = require('../../../lib/Log');
const ExecuteCommand = require('../../../lib/ExecuteCommand');
const Spinner = require('../../../lib/Spinner');
const path = require('path');
const fsx = require('fs-extra');
const URL = require('url');
const download = require('download');
require('colors');

function builder(yargs) {
  return yargs
  .option('url', {
    alias: 'u',
    type: 'string',
    describe: 'URL of the template contract'
  })
  .example('kaizen contracts deploy -u https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20')
  .demandOption(['url'], '')
  .epilogue(
    'Please enter the url of the template contract\n\n' + 
    'Support contract template:\n\n'.underline.yellow + 
    'Chainlink'.underline.yellow + ' - Chainlink Oracle Service, ' +
    'https://github.com/PortalNetwork/kaizen-contracts/tree/master/Chainlink'.underline.yellow + '\n' +
		'ERC20'.underline.yellow + ' - ERC20 Token Standard, ' + 
		'https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20'.underline.yellow + '\n' +
		'ERC721'.underline.yellow + ' - ERC721 Token Standard, ' + 
    'https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC721'.underline.yellow + '\n' +
    'NuCypher'.underline.yellow + ' - NuCypher Contracts, ' + 
    'https://github.com/PortalNetwork/kaizen-contracts/tree/master/NuCypher'.underline.yellow + '\n'
  );
}

async function handler(argv) {
  try {
    
    const { url: repoUrl} = argv;

    const kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'));
    const {privateKey, provider, networkId} = {
      ...kaizenrc
    }
    if(!privateKey || !provider || !networkId){
      throw 'Please make sure ' + 
      '\'privateKey\''.yellow + ', ' + '\'provider\''.yellow + ' and ' + '\'networkId\''.yellow + 
      ' is configured through ' + '\'kaizen config\''.yellow;
    }
    console.log("Contract deploying, this may take a while...".yellow);
    Spinner.start();
    const {owner, repo, branch, template} = getFilePath(repoUrl);
    const zipFilePath = `https://github.com/${owner}/${repo}/raw/${branch}/${template}.zip`
    await download(zipFilePath, '.', {extract: true});
    Spinner.stop();
    Spinner.start();
    console.log("Setup environment variable...".yellow);
    // Setup environment variable
    process.env.privateKey = privateKey;
    process.env.provider = provider;
    process.env.networkId = networkId;
    // Install necessary modules of contract deployment
    Spinner.stop();
    Spinner.start();
    console.log("Installing modules...".yellow);
    const processing = await ExecuteCommand(`cd ${template} && npm i`);
    Spinner.stop();
    console.log(processing);
    // Build and deploy contracts
    console.log("Deploying contracts...".yellow);
    const result = await ExecuteCommand(`cd ${template} && ./node_modules/.bin/truffle deploy --network deployment`);
    console.log(result);
    fsx.removeSync(`./${template}`);
    Log.SuccessLog(`\nDeploy Contract ${template} Successfully`);
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('\nUnable to deploy sontract');
    console.error(error);
  }
}
function getFilePath(repoUrl){
  const url = URL.parse(repoUrl);
  const path = url.pathname.split('/');
  const owner = path[path.length - 5];
  const repo = path[path.length - 4];
  const branch = path[path.length - 2];
  const template = path[path.length - 1];
  return {
    owner,
    repo,
    branch,
    template
  };
}
module.exports = function (yargs) {
  const command = 'deploy';
  const commandDescription = 'Deploy smart contracts';
  yargs.command(command, commandDescription, builder, handler);
}
