const path = require('path');
const fs = require('fs');
const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');
const bluzelleHandler = require('./bluzelle.js');
const noiaHandler = require('./noia.js');
const nknHandler = require('./nkn.js');
const iconHandler = require('./icon.js');
const orbitHandler = require('./orbit.js');
const arweaveHandler = require('./arweave.js');
const bandHandler = require('./band.js');
const fluenceHandler = require('./fluence.js');
const siaHandler = require('./sia.js');
const nearHandler = require('./near.js');
const tellorHandler = require('./tellor.js');
const skaleHandler = require('./skale.js');
const renHandler = require('./ren.js');
const nervosHandler = require('./nervos.js');
const kavaHandler = require('./kava.js');
const zaboHandler = require('./zabo.js');
const loomHandler = require('./loom.js');
const witnetHandler = require('./witnet.js');

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
      case 'orbit':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await orbitHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'arweave':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await arweaveHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'band':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await bandHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'fluence':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await fluenceHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'sia':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await siaHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'near':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await nearHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'tellor':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await tellorHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'skale':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await skaleHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'ren':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await renHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'nervos':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await nervosHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'kava':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await kavaHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'zabo':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await zaboHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'loom':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await loomHandler();
        Spinner.stop();
        Log.SuccessLog(`Install plugin ${plugin} Successfully`);
        break;
      case 'witnet':
        Log.NormalLog('Installing plugin, please wait a second...');
        Spinner.start();
        await witnetHandler();
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
