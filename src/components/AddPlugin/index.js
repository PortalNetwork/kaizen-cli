const path = require('path');
const fs = require('fs');
const Log = require('../../lib/Log');
const Spinner = require('../../lib/Spinner');
const bluzelleHandler = require('./bluzelle.js');
const nknHandler = require('./nkn.js');

function builder(yargs) {
  return yargs
    .option('package', {
      alias: 'p',
      type: 'string',
      describe: 'plugin name',
      require: true,
    })
    .example('kaizen add --package bluzelle');
}

async function handler(argv) {
  try {
    const { package: packageName, } = argv;

    if(fs.existsSync(path.resolve('./', 'package.json')) === false) {
      Log.ErrorLog('should run "npm init" first');
      return;
    }

    Spinner.start();
    switch(packageName) {
      case 'bluzelle':
        await bluzelleHandler();
        break;
      case 'nkn':
        await nknHandler();
        break;
    }
    Spinner.stop();
    Log.SuccessLog(`==== Install package ${packageName} Successfully ====`);
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'add';
  const commandDescription = 'To install kaizen plugin in your project';
  yargs.command(command, commandDescription, builder, handler);
}