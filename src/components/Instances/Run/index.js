const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');
const nymLoopixMixnodeHandler = require('./nym-loopix-mixnode.js');
const golemHandler = require('./golem.js');

function builder(yargs) {
  return yargs
    .positional('instance', {
      alias: 'i',
      type: 'string',
      describe: 'instance name',
      require: true
    })
    .option('type', {
      alias: 't',
      type: 'string',
      describe: 'instance type'
    })
    .example('kaizen instances run nym-loopix-mixnode')
    .example('kaizen instances run golem --type t2.xlarge')
    .demandOption(['instance'], '');
}

async function handler(argv) {
  try {
    const { instance, type } = argv;

    if (!instance) {
      Log.NormalLog('Missing instance name.\nPlease using \'kaizen instances run [instance]\'');
      return;
    }

    switch (instance) {
      case 'nym-loopix-mixnode':
        Log.NormalLog(`Starting ${instance} instance, please wait a second...`);
        Spinner.start();
        await nymLoopixMixnodeHandler(instance, type);
        Spinner.stop();
        Log.SuccessLog(`Start instance ${instance} Successfully`);
        break;
      case 'golem':
        Log.NormalLog(`Starting ${instance} instance, please wait a second...`);
        Spinner.start();
        await golemHandler(instance, type);
        Spinner.stop();
        Log.SuccessLog(`Start instance ${instance} Successfully`);
        break;
      default:
        Log.NormalLog('Instance not support yet');
    }

  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'run [instance]';
  const commandDescription = 'Run an instance on AWS';
  yargs.command(command, commandDescription, builder, handler);
}