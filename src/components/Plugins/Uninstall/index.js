const path = require('path');
const fsx = require('fs-extra');
const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');
const bluzelleHandler = require('./bluzelle.js');
const nknHandler = require('./nkn.js');
const noiaHandler = require('./noia.js');

function builder(yargs) {
  return yargs
    .positional('plugin', {
      alias: 'p',
      type: 'string',
      describe: 'plugin name',
      require: true
    })
    .example('kaizen plugins uninstall bluzelle')
    .example('kaizen plugins uninstall nkn');
}

async function handler(argv) {
  try {
    const { plugin } = argv;
    const kaizenJson = await readKaizenJson();

    if (!plugin) {
      Log.NormalLog('Missing plugin statement.\nPlease using \'kaizen plugins uninstall [plugin]\'');
      return;
    }
    
    switch(plugin) {
      case 'bluzelle':
        Spinner.start();
        await bluzelleHandler();
        updateKaizenJson(kaizenJson, 'bluzelle');
        Spinner.stop();
        Log.SuccessLog(`==== Remove package ${plugin} Successfully ====`);
        break;
      case 'nkn':
        Spinner.start();
        await nknHandler();
        updateKaizenJson(kaizenJson, 'nkn');
        Spinner.stop();
        Log.SuccessLog(`==== Remove package ${plugin} Successfully ====`);
        break;
      case 'noia':
        Spinner.start();
        await noiaHandler();
        updateKaizenJson(kaizenJson, 'noia');
        Spinner.stop();
        Log.SuccessLog(`==== Remove package ${plugin} Successfully ====`);
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
