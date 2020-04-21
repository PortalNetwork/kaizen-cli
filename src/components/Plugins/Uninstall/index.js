const path = require('path');
const fs = require('fs');
const fsx = require('fs-extra');
const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');
const bluzelleHandler = require('./bluzelle.js');
const nknHandler = require('./nkn.js');
const noiaHandler = require('./noia.js');
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

function builder(yargs) {
  return yargs
    .positional('plugin', {
      alias: 'p',
      type: 'string',
      describe: 'plugin name',
      require: true
    })
    .example('kaizen plugins uninstall bluzelle')
    .example('kaizen plugins uninstall nkn')
    .demandOption(['plugin'], '');
}

async function handler(argv) {
  try {
    const { plugin } = argv;
    const kaizenJson = await readKaizenJson();

    if (!plugin) {
      Log.NormalLog('Missing plugin statement.\nPlease using \'kaizen plugins uninstall [plugin]\'');
      return;
    }

    if (fs.existsSync(path.resolve('./', 'package.json')) === false) {
      Log.NormalLog("Missing " + "'package.json'".yellow + ", please make sure you are in the project folder.");
      return;
    }
    
    switch(plugin) {
      case 'bluzelle':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await bluzelleHandler();
        updateKaizenJson(kaizenJson, 'bluzelle');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'nkn':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await nknHandler();
        updateKaizenJson(kaizenJson, 'nkn');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'noia':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await noiaHandler();
        updateKaizenJson(kaizenJson, 'noia');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'icon':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await iconHandler();
        updateKaizenJson(kaizenJson, 'icon');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'orbit':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await orbitHandler();
        updateKaizenJson(kaizenJson, 'orbit');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'arweave':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await arweaveHandler();
        updateKaizenJson(kaizenJson, 'arweave');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'band':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await bandHandler();
        updateKaizenJson(kaizenJson, 'band');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'fluence':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await fluenceHandler();
        updateKaizenJson(kaizenJson, 'fluence');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'sia':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await siaHandler();
        updateKaizenJson(kaizenJson, 'sia');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'near':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await nearHandler();
        updateKaizenJson(kaizenJson, 'near');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'tellor':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await tellorHandler();
        updateKaizenJson(kaizenJson, 'tellor');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'skale':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await skaleHandler();
        updateKaizenJson(kaizenJson, 'skale');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'ren':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await renHandler();
        updateKaizenJson(kaizenJson, 'ren');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'nervos':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await nervosHandler();
        updateKaizenJson(kaizenJson, 'nervos');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'kava':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await kavaHandler();
        updateKaizenJson(kaizenJson, 'kava');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'zabo':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await zaboHandler();
        updateKaizenJson(kaizenJson, 'zabo');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
        break;
      case 'loom':
        Log.NormalLog('Uninstalling plugin, please wait a second...');
        Spinner.start();
        await loomHandler();
        updateKaizenJson(kaizenJson, 'loom');
        Spinner.stop();
        Log.SuccessLog(`Remove plugin ${plugin} Successfully`);
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

function readKaizenJson() {
  return new Promise(function(resolve, reject) {
    fsx.readJson(path.resolve('./', 'kaizen.json'), function(error, data) {
      if(error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function updateKaizenJson(kaizenConfig, plugin) {
  const newKaizenConfig = {
    ...kaizenConfig,
    plugins: kaizenConfig.plugins.filter(x => {x !== plugin})
  };

  fsx.writeJson(path.resolve('./', 'kaizen.json'), newKaizenConfig);
}

module.exports = function (yargs) {
  const command = 'uninstall [plugin]';
  const commandDescription = 'Uninstall and remove a plugin to your project';
  yargs.command(command, commandDescription, builder, handler);
}
