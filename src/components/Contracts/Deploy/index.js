const Log = require('../../../lib/Log');
const ExecuteCommand = require('../../../lib/ExecuteCommand');
const Spinner = require('../../../lib/Spinner');
const path = require('path');
const fsx = require('fs-extra');
const URL = require('url');
const download = require('download');

function builder(yargs) {
  return yargs
  .option('url', {
    alias: 'u',
    type: 'string',
    describe: 'URL of the template contract'
  })
  .example('kaizen contracts deploy -u https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20');
}

async function handler(argv) {
  try {
    Spinner.start();
    const { url: repoUrl} = argv;
    const {owner, repo, branch, template} = getFilePath(repoUrl);
    const zipFilePath = `https://github.com/${owner}/${repo}/raw/${branch}/${template}.zip`
    await download(zipFilePath, '.', {extract: true});
    const kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'));
    const {privateKey, provider, networkId} = {
      ...kaizenrc
    }
    // Setup environment variable
    process.env.privateKey = privateKey;
    process.env.provider = provider;
    process.env.networkId = networkId;
    const result = await ExecuteCommand(`cd ${template} ` +
                                        `&& npm i ` +
                                        `&& ./node_modules/.bin/truffle deploy --network deployment ` +
                                        `&& cd .. `);
    console.log(result);
    fsx.removeSync(`./${template}`);
    Spinner.stop();
    Log.SuccessLog(`\n==== Deploy Contract ${template} Successfully ====`);
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
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
