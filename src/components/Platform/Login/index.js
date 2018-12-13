const path = require('path');
const fsx = require('fs-extra');
const prompt = require('prompt');
const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');
const { apiUserLogin } = require('../../../lib/apis');

function builder(yargs) {
  return yargs
    .example('kaizen login');
}

async function handler(argv) {
  try {
    const { email, password } = await inputEmailAndPassword();
    
    Spinner.start();

    try {
      const response = await apiUserLogin(email, password);
      const {
        accessToken,
        refreshToken,
        idToken,
        expiresIn,
        name
      } = response.data;
      
      Spinner.stop();
      fsx.writeJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'), {
        email,
        accessToken,
        refreshToken,
        idToken,
        expiresIn,
        name,
        loginOn: new Date()
      });
      Log.SuccessLog('Login success');
      Log.NormalLog(`Welcome ${name}!\n`);
      Log.NormalLog('KAIZEN Platform (Alpha)'.underline.yellow);
      Log.NormalLog('You can interact with KAIZEN Platform thorugh the following commands.'.gray);
      Log.NormalLog('Use ' + '\'kaizen instances list\''.yellow + ' to get the instance list.');
      Log.NormalLog('Use ' + '\'kaizen instances info\''.yellow + ' to get the instance information.');
      Log.NormalLog('Use ' + '\'kaizen instances deploy\''.yellow + ' to deploy a new instance.\n');
      Log.NormalLog('More information and documentation, please visit:');
      Log.NormalLog('https://github.com/PortalNetwork/kaizen-cli'.yellow.underline + '\n');
    } catch (loginError) {
      Spinner.stop();
      console.error(loginError.response.data.message);
      return;
    }

  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
    return;
  }
}

function inputEmailAndPassword() {
  const promptSchema = {
    properties: {
      email: {
        description: 'Enter your email',
        pattern: /^[a-zA-Z0-9_]+@[a-zA-Z0-9_.]+$/,
        message: 'Email format error'
      },
      password: {
        description: 'Enter your password',
        hidden: true,
        replace: '*'
      }
    }
  };

  return new Promise(function (resolve, reject) {
    prompt.message = '';
    prompt.delimiter = ':';
    prompt.start();
    prompt.get(promptSchema, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  });

}

module.exports = function (yargs) {
  const command = 'login';
  const commandDescription = 'Login KAIZEN Platform';
  yargs.command(command, commandDescription, builder, handler);
}
