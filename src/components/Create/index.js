const cmd = require('node-cmd');
const fsx = require('fs-extra');
const Spinner = require('../../lib/Spinner');
const Log = require('../../lib/Log');

function builder(yargs) {
  return yargs
    .option('template', {
        alias: 't',
        type: 'string',
        describe: 'Build project with template',
        choices: ['vue', 'react'],
        default: 'react'
    })
    .option('name', {
      alias: 'n',
      type: 'string',
      describe: 'Name of the project'
    })
    .example('kaizen create --template react --name myproject')
    .demandOption(['name'], 'Please enter your project name');
}

async function handler(argv) {
  try {
    Spinner.start();
    const { name: projectName, template } = argv;
    Log.NormalLog(`Downloading project, please wait a second`);
    switch (template) {
      case 'vue':
        await cloneProjectFromGithub('https://github.com/PortalNetwork/vue-truffle.git', projectName);
        break;
      case 'react':
      default:
        await cloneProjectFromGithub('https://github.com/PortalNetwork/react-truffle.git', projectName);
        break;
    }
    fsx.removeSync(`./${projectName}/.git`);
    Spinner.stop();
    Log.SuccessLog(`\nCreate ${projectName} Successfully`);
    Log.NormalLog('Now you can use ' + `'cd ${projectName}'`.yellow + ' to the project folder.');
    Log.NormalLog('After you get into the folder, you can install the node packages by using ' + '\'npm install\''.yellow);
    Log.NormalLog('Let\'s start BUIDL!'.green);
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
  const command = 'create';
  const commandDescription = 'Create a kaizen project';
  yargs.command(command, commandDescription, builder, handler);
}
