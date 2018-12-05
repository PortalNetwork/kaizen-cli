const path = require('path');
const fs = require('fs');
const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');
const bluzelleHandler = require('./bluzelle.js');
const noiaHandler = require('./noia.js');
const nknHandler = require('./nkn.js');

function builder(yargs) {
  return yargs
    .positional('plugin', {
      alias: 'p',
      type: 'string',
      describe: 'plugin name',
      require: true
    })
    .example('kaizen plugins:install bluzelle')
    .example('kaizen plugins:install nkn');
}

async function handler(argv) {
  try {
    const { plugin } = argv;

    if (fs.existsSync(path.resolve('./', 'package.json')) === false) {
      Log.ErrorLog('should run "npm init" first');
      return;
    }

    Spinner.start();
    switch (plugin) {
      case 'bluzelle':
        await bluzelleHandler();
        break;
      case 'nkn':
        await nknHandler();
        break;
      case 'noia':
        await noiaHandler();
        break;
    }
    Spinner.stop();
    Log.SuccessLog(`==== Install package ${plugin} Successfully ====`);
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'plugins:install';
  const commandDescription = 'Install and add a plugin to your project';
  yargs.command(command, commandDescription, builder, handler);
}
