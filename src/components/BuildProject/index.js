const fs = require('fs');
const path = require('path');
const cmd = require('node-cmd');
const Log = require('../../lib/Log');
const Spinner = require('../../lib/Spinner');
const ExecuteCommand = require('../../lib/ExecuteCommand');

function builder(yargs) {
  return yargs.example('kaizen build');
}

async function handler(argv) {
  try {
    Spinner.start();

    if(fs.existsSync(path.resolve('./', 'node_modules')) === false) {
      await ExecuteCommand('npm install');
    }

    await runProjectBuildScript();
    Spinner.stop();
    Log.SuccessLog(`==== Build Project Successfully ====`);
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

function runProjectBuildScript() {
  return new Promise(function(resolve, reject) {
    cmd.get(`npm run build`, function(error) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = function (yargs) {
  const command = 'build';
  const commandDescription = 'To build your kaizen project';
  yargs.command(command, commandDescription, builder, handler);
}