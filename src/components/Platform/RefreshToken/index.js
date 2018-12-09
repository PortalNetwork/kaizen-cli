const path = require('path');
const fsx = require('fs-extra');
const Log = require('../../../lib/Log');
const { apiUserRefresh } = require('../../../lib/apis');

function builder(yargs) {
  return yargs.example('kaizen refresh token')
}

async function handler(argv) {
  const kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'));
  if(!kaizenrc.email || !kaizenrc.refreshToken) {
    Log.ErrorLog(`You haven't logged in yet`);
    return;
  }

  const response = await apiUserRefresh(kaizenrc.refreshToken, kaizenrc.email);
  const {
    accessToken, 
    refreshToken,
    idToken,
    expiresIn
  } = response.data;

  const configuration = {
    ...kaizenrc,
    accessToken, 
    refreshToken,
    idToken,
    expiresIn,
    loginOn: new Date()
  };

  fsx.writeJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'), configuration);
  Log.SuccessLog('=== Refresh Successfully ===')
}

module.exports = function(yargs) {
  const command = 'refresh token';
  const commandDescription = 'To refresh token';
  yargs.command(command, commandDescription, builder, handler);
}
