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
    .example('kaizen config get --key provider')
    .demandOption(['key'], '');
}

async function handler(argv) {
  try {
    const { key } = argv;
    Spinner.start();
    const kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'));
    Spinner.stop();
    if (kaizenrc[key]) {
      Log.NormalLog('Configuration:\n'.underline.yellow + key + ': ' + kaizenrc[key].yellow);
    } else {
      Log.NormalLog(`Can not find ${key}`);
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
