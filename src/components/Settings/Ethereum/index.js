const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');
const WriteKaizen = require('../WriteKaizen.js');

function builder(yargs) {
  return yargs
    .option('network', {
      type: 'string',
      describe: 'network',
      require: true
    })
    .option('provider', {
      type: 'string',
      describe: 'provider',
      require: true
    })
    .option('port', {
      type: 'string',
      describe: 'port',
      require: true
    })
    .example('kaizen set-ethereum --network <net work id> --provider <provider> --port <port>');
}

function handler(argv) {
  try {
    Spinner.start();
    const {
      network,
      provider,
      port
    } = argv;

    const settings = {
      ethereum: {
        network,
        provider,
        port
      }
    };

    WriteKaizen(settings);
    Spinner.stop();
    Log.SuccessLog('==== Ethereum configuration setting successfully ====')
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'set-ethereum';
  const commandDescription = 'To set the configuration of Ethereum locally';
  yargs.command(command, commandDescription, builder, handler);
}