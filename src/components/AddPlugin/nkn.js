const path = require('path');
const fsx = require('fs-extra');
const ExecuteCommand = require('../../lib/ExecuteCommand');

module.exports = async function() {
  await ExecuteCommand('npm install nkn-client');

  // update user's kaizen config
  const userConfig = fsx.readJsonSync(path.resolve('./', 'kaizen.json')); 

  if(!userConfig.plugins) {
    userConfig.plugins = [];
  }

  if(userConfig.plugins.includes('nkn') === false) {
    userConfig.plugins.push('nkn');
  }

  fsx.outputJsonSync(path.resolve('./', 'kaizen.json'), userConfig);

}
