const path = require("path");
const fsx = require("fs-extra");
const ExecuteCommand = require('../../../lib/ExecuteCommand');

module.exports = async function() {
  await ExecuteCommand('npm uninstall arweave');

  // update user's kaizen config
  const configPath = path.resolve('./', 'kaizen.json');
  const userConfig = fsx.existsSync(configPath) ? fsx.readJsonSync(configPath) : {}; 

  if(!userConfig.plugins) {
    userConfig.plugins = [];
  }

  if(userConfig.plugins.includes('arweave') === false) {
    userConfig.plugins = userConfig.plugins.filter(function(element) {
      return element != 'arweave';
    });
  }

  fsx.outputJsonSync(path.resolve('./', 'kaizen.json'), userConfig);
}
