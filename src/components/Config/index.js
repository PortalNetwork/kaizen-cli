const path = require('path');
const fsx = require('fs-extra');
const Spinner = require('../../lib/Spinner');
const Log = require('../../lib/Log');

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
    .example('kaizen config --key <KEY> --value <VALUE>')
    .demandOption(['key'], 'Please enter your key')
    .demandOption(['value'], 'Please enter your value');
}

async function handler(argv) {
  try {
    const { key, value } = argv;
    const kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../.kaizenrc'));
    const configuration = {
      ...kaizenrc,
      [key]: value
    }
    fsx.writeJsonSync(path.resolve(__dirname, '../../../.kaizenrc'), configuration);
    Log.SuccessLog('=== Config setting successfully ===')
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'config';
  const commandDescription = 'Configure kaizen';
  yargs.command(command, commandDescription, builder, handler);
}
