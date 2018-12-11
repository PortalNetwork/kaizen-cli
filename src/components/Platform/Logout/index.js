const path = require('path');
const fsx = require('fs-extra');
const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');
const { apiUserLogout } = require('../../../lib/apis');

function builder(yargs) {
  return yargs.example('kaizen logout');
}


async function handler(argv) {
  try {
    const config = fsx.readJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'));
    if (!config.idToken) {
      Log.NormalLog('You are not login');
      return;
    }

    Spinner.start();
    await apiUserLogout(config.idToken);    

    fsx.writeJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'), {
      accessToken: '',
      refreshToken: '',
      idToken: '',
      expiresIn: 0,
      name: ''
    });

    Spinner.stop();
    Log.SuccessLog('Logout success');
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'logout';
  const commandDescription = 'To log out KAIZEN manager';
  yargs.command(command, commandDescription, builder, handler);
}