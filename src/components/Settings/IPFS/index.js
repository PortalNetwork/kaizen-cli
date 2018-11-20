const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');
const WriteKaizen = require('../WriteKaizen.js');

function builder(yargs) {
  return yargs
    .option('host', {
      type: 'string',
      describe: 'host',
      require: true
    })
    .option('port', {
      type: 'string',
      describe: 'port',
      require: true
    })
    .option('protocol', {
      type: 'string',
      describe: 'protocol',
      require: true
    })
    .example('kaizen set-ipfs --host <host> --protocol <protocol> --port <port>');
}

function handler(argv) {
  try {
    Spinner.start();
    const {
      host,
      port,
      protocol
    } = argv;

    const settings = {
      ipfs : {
        host, 
        protocol,
        port
      }
    };

    WriteKaizen(settings);
    Spinner.stop();
    Log.SuccessLog('==== IPFS configuration setting successfully ====')
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'set-ipfs';
  const commandDescription = 'To set the configuration of IPFS locally';
  yargs.command(command, commandDescription, builder, handler);
}