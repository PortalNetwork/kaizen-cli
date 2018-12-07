const path = require('path');
const fsx = require('fs-extra');

module.exports = function(settings) {
  const configPath = path.resolve('./', 'kaizen.json');
  const kaizenConfiguration = retrieveKaizenConfiguration(configPath);

  const newConfiguration = {
    ...kaizenConfiguration,
    ...settings
  };

  fsx.writeJsonSync(configPath, newConfiguration);
}

function retrieveKaizenConfiguration(configPath) {
  if(fsx.existsSync(configPath) === false) {
    return {};
  }

  return fsx.readJsonSync(configPath); 
}

