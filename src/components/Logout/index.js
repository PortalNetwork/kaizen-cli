const path = require('path');
const fsx = require('fs-extra');
const Log = require('../../lib/Log');
const Spinner = require('../../lib/Spinner');
const axios = require('axios');
const LOGOUT_API = 'https://api.portal.network/user/v1/signOut';


function builder(yargs) {
  return yargs.example('kaizen logout');
}


async function handler(argv) {
  try {
    const config = fsx.readJsonSync(path.resolve(__dirname, '../../../.kaizenrc'));
    if (!config.idToken) {
      Log.ErrorLog('not yet login');
      return;
    }

    Spinner.start();
    const response = await postLogout(config.idToken);    

    fsx.writeJsonSync(path.resolve(__dirname, '../../../.kaizenrc'), {
      accessToken: '',
      refreshToken: '',
      idToken: '',
      expiresIn: 0,
      name: ''
    });


    Spinner.stop();
    Log.SuccessLog('Log out successfully');
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

function postLogout(idToken) {
  return axios.post(LOGOUT_API, null, {
    headers: { 
      Authorization: idToken
    }
  });
}


module.exports = function (yargs) {
  const command = 'logout';
  const commandDescription = 'To log out KAIZEN manager';
  yargs.command(command, commandDescription, builder, handler);
}