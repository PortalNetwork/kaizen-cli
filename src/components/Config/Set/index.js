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
      choices: ['privateKey', 'provider', 'networkId']
    })
    .option('value', {
      alias: 'v',
      type: 'string',
      describe: 'Configuration value'
    })
    .example('kaizen config set --key provider --value https://mainnet.infura.io')
    .demandOption(['key', 'value'], '');
}

async function handler(argv) {
  try {
    const { key, value } = argv;
    Spinner.start();
    const kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'));
    Spinner.stop();
    const configuration = {
      ...kaizenrc,
      [key]: value
    }
    fsx.writeJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'), configuration);
    //Log.SuccessLog('Config setting successfully');
    console.log('Configuration:\n'.underline.yellow + key + ': ' + kaizenrc[key] + ' set success');
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'set';
  const commandDescription = 'Set config variable to kaizen';
  yargs.command(command, commandDescription, builder, handler);
}
