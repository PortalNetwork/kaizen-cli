const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');
const WriteKaizen = require('../WriteKaizen.js');

function builder(yargs) {
  return yargs
    .option('identifier', {
      type: 'string',
      describe: 'identifier',
      require: true
    })
    .option('private-key', {
      type: 'string',
      describe: 'private key',
      require: true
    })
    .option('rpc-server', {
      type: 'string',
      describe: 'seed RPC server address',
      require: true
    })
    .example('kaizen set-nkn --identifier <identifier> --private-key <private key> --rpc-server <seed RPC server address>');
}

function handler(argv) {
  try {
    Spinner.start();
    const {
      identifier,
      privateKey,
      rpcServer
    } = argv;

    const settings = {
      nkn: {
        identifier,
        privateKey,
        rpcServer
      }
    };

    WriteKaizen(settings);
    Spinner.stop();
    Log.SuccessLog('==== NKN configuration setting successfully ====')
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'set-nkn';
  const commandDescription = 'To set the configuration of NKN locally';
  yargs.command(command, commandDescription, builder, handler);
}