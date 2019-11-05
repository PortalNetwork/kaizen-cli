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
    .example('kaizen config unset --key provider')
    .demandOption(['key'], '');
}

async function handler(argv) {
  try {
    const { key } = argv;
    Spinner.start();
    const kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'));
    const configuration = {
      ...kaizenrc,
      [key]: ''
    }
    fsx.writeJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'), configuration);
    Spinner.stop();
    //Log.SuccessLog('Unset config successfully');
    Log.NormalLog('Unset ' + key.yellow + ' success');
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'unset';
  const commandDescription = 'Unset config variable';
  yargs.command(command, commandDescription, builder, handler);
}
