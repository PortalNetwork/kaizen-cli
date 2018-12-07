const cmd = require('node-cmd');
const fsx = require('fs-extra');
const Spinner = require('../../lib/Spinner');
const Log = require('../../lib/Log');

function builder(yargs) {
  return yargs
    .option('template', {
        alias: 't',
        type: 'string',
        describe: 'Build project with template', // TODO add template list
        choices: ['vue', 'react'],
        default: 'react'
    })
    .option('name', {
      alias: 'n',
      type: 'string',
      describe: 'your name of project',
    })
    .option('boilerplate', {
      alias: 'b',
      type: 'string',
      describe: 'your DApp will build on specific boilerplate',
      choices: ['vue', 'react', 'dchat'],
      default: 'react',
    })
    .example('kaizen create --template react --name myproject')
    .demandOption(['name'], 'Please enter your project name');
}

async function handler(argv) {
  try {
    Spinner.start();
    const { name: projectName, boilerplate, } = argv;
    switch (boilerplate) {
      case 'dchat':
        await cloneProjectFromGithub('https://github.com/web3infra/dchat.git', projectName);
        break;
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
    Log.SuccessLog(`\n==== Create ${projectName} Successfully ====`);
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
