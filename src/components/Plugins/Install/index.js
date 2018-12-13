const path = require('path');
const fs = require('fs');
const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');
const bluzelleHandler = require('./bluzelle.js');
const noiaHandler = require('./noia.js');
const nknHandler = require('./nkn.js');
const iconHandler = require('./icon.js');

function builder(yargs) {
  return yargs
    .positional('plugin', {
      alias: 'p',
      type: 'string',
      describe: 'plugin name',
      require: true
    })
    .example('kaizen plugins install bluzelle')
    .example('kaizen plugins install nkn')
    .demandOption(['plugin'], '');
}

async function handler(argv) {
  try {
    const { plugin } = argv;

    if (!plugin) {
      Log.NormalLog('Missing plugin statement.\nPlease using \'kaizen plugins uninstall [plugin]\'');
      return;
    }

    if (fs.existsSync(path.resolve('./', 'package.json')) === false) {
      Log.NormalLog("Missing " + "'package.json'".yellow + ", please make sure you are in the project folder.");
      return;
    }

    // TODO code tutorial
    switch (plugin) {
      case 'bluzelle':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await bluzelleHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'nkn':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await nknHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'noia':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await noiaHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'icon':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await iconHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      default:
        Log.NormalLog('Plugin not support yet');
    }
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'install [plugin]';
  const commandDescription = 'Install and add a plugin to your project';
  yargs.command(command, commandDescription, builder, handler);
}
