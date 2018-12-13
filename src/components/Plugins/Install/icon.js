const path = require('path');
const fsx = require('fs-extra');
const ExecuteCommand = require('../../../lib/ExecuteCommand');

module.exports = async function() {
  await ExecuteCommand('npm install icon-sdk-js');
  
  // update user's kaizen config
  const configPath = path.resolve('./', 'kaizen.json');
  const userConfig = fsx.existsSync(configPath) ? fsx.readJsonSync(configPath) : {}; 
  
  if(!userConfig.plugins) {
    userConfig.plugins = [];
  }

  if(userConfig.plugins.includes('icon') === false) {
    userConfig.plugins.push('icon');
  }

  fsx.outputJsonSync(path.resolve('./', 'kaizen.json'), userConfig);
}
