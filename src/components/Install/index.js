const cmd = require('node-cmd');
const fsx = require('fs-extra');
const Spinner = require('../../lib/Spinner');
const Log = require('../../lib/Log');

function builder(yargs) {
  return yargs
    .option('url', {
      alias: 'u',
      type: 'string',
      describe: 'GitHub url of the project',
    })
    .demandOption(['url'], 'Please enter your project GitHub path');
}

async function handler(argv) {
  try {
    Spinner.start();
    const { url } = argv;
    // TODO check url format
    await cloneProjectFromGithub(url, projectName);
    fsx.removeSync(`./${projectName}/.git`);
    Spinner.stop();
    Log.SuccessLog(`==== Create ${projectName} Successfully ====`);
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

function cloneProjectFromGithub(repoURL, projectName) {
  return new Promise(function (resolve, reject) {
    cmd.get(`git clone ${repoURL} ${projectName}`, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = function (yargs) {
  const command = 'install';
  const commandDescription = 'Install a kaizen project from GitHub';
  yargs.command(command, commandDescription, builder, handler);
}