const cmd = require('node-cmd');
const Spinner = require('../../lib/Spinner');
const Log = require('../../lib/Log');

function builder(yargs) {
  return yargs
    .option('url', {
      alias: 'u',
      type: 'string',
      describe: 'GitHub url of the project'
    })
    .example('kaizen install --url https://github.com/PortalNetwork/kaizen-boilerplate')
    .demandOption(['url'], 'Please enter your project GitHub path');
}

async function handler(argv) {
  try {
    Spinner.start();
    const { url } = argv;
    await cloneProjectFromGithub(url);
    Spinner.stop();
    Log.SuccessLog(`Install from ${url} Successfully`);
    Log.NormalLog('Now you can go to the project folder.');
    Log.NormalLog('After you get into the folder, you can install the node packages by using ' + '\'npm install\''.yellow);
    Log.NormalLog('Let\'s start BUIDL!'.green);
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

function cloneProjectFromGithub(repoURL) {
  return new Promise(function (resolve, reject) {
    cmd.get(`git clone ${repoURL}`, function (error) {
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
