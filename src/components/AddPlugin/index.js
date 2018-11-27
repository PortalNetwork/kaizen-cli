const path = require('path');
const fs = require('fs');
const Log = require('../../lib/Log');
const Spinner = require('../../lib/Spinner');
const bluzelleHandler = require('./bluzelle.js');
const nknHandler = require('./nkn.js');
const boilerplateHandler = require('./boilerplate.js');

function builder(yargs) {
  return yargs
    .positional('package', {
      alias: 'p',
      type: 'string',
      describe: 'plugin name',
      require: true
    })
    .option('name', {
      alias: 'n',
      type: 'string',
      describe: 'your name of project'
    })
    .option('library', {
      type: 'string',
      describe: 'react or vue, or simple without any libraries'
    })
    .example('kaizen add bluzelle')
    .example('kaizen add nkn');
}

async function handler(argv) {
  try {
    const { package: packageName, name, library, } = argv;

    if (fs.existsSync(path.resolve('./', 'package.json')) === false && packageName != 'boilerplate') {
      Log.ErrorLog('should run "npm init" first');
      return;
    }

    Spinner.start();
    switch (packageName) {
      case 'bluzelle':
        await bluzelleHandler();
        break;
      case 'nkn':
        await nknHandler();
        break;
      case 'boilerplate':
        await boilerplateHandler(name, library);
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
  const command = 'add <package>';
  const commandDescription = 'To install kaizen package in your project';
  yargs.command(command, commandDescription, builder, handler);
}