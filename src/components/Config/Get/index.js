const path = require('path');
const fsx = require('fs-extra');
const Spinner = require('../../../lib/Spinner');
const Log = require('../../../lib/Log');
require('colors');

function builder(yargs) {
  return yargs
    .option('key', {
      alias: 'k',
      type: 'string',
      describe: 'Configuration key',
      choices: ['privateKey', 'provider', 'networkId', 'accessKey', 'secretKey', 'region']
    })
    .example('kaizen config get --key provider')
    //.demandOption(['key'], '');
}

async function handler(argv) {
  try {
    const { key } = argv;
    Spinner.start();
    const kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'));
    Spinner.stop();
    if (kaizenrc[key]) {
      Log.NormalLog('Kaizen Configuration:\n'.underline.yellow + key + ': ' + kaizenrc[key].yellow);
    } else {
      //Log.NormalLog(`Can not find ${key}`);
      Log.NormalLog('Kaizen Configuration:'.underline.yellow);
      (kaizenrc['privateKey']) ? Log.NormalLog('privateKey' + ': ' + kaizenrc['privateKey'].yellow) : null;
      (kaizenrc['provider']) ? Log.NormalLog('provider' + ': ' + kaizenrc['provider'].yellow) : null;
      (kaizenrc['networkId']) ? Log.NormalLog('networkId' + ': ' + kaizenrc['networkId'].yellow) : null;
      (kaizenrc['accessKey']) ? Log.NormalLog('accessKey' + ': ' + kaizenrc['accessKey'].yellow) : null;
      (kaizenrc['secretKey']) ? Log.NormalLog('secretKey' + ': ' + kaizenrc['secretKey'].yellow) : null;
      (kaizenrc['region']) ? Log.NormalLog('region' + ': ' + kaizenrc['region'].yellow) : null;
    }
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'get';
  const commandDescription = 'Get config variable';
  yargs.command(command, commandDescription, builder, handler);
}
