const path = require('path');
const fsx = require('fs-extra');
const ExecuteCommand = require('../../lib/ExecuteCommand');

function installPNBluzelle() {
  const sourcePath = path.resolve(__dirname, '../../../templates', 'pn-bluzelle');
  const targetPath = path.resolve('./', 'node_modules', 'pn-bluzelle');
  return new Promise(function(resolve, reject) {
    fsx.copy(sourcePath, targetPath, function(error) {
      if(error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = async function() {
  await ExecuteCommand('npm install bluzelle');
  await installPNBluzelle();

  // update user's kaizen config
  const sourceConfig = fsx.readJsonSync(path.resolve(__dirname, '../../../config', 'kaizen.json')); 
  const userConfig = fsx.readJsonSync(path.resolve('./', 'kaizen.json')); 
  
  userConfig.bluzelle = sourceConfig.bluzelle;

  if(!userConfig.plugins) {
    userConfig.plugins = [];
  }

  if(userConfig.plugins.includes('bluzelle') === false) {
    userConfig.plugins.push('bluzelle');
  }

  fsx.outputJsonSync(path.resolve('./', 'kaizen.json'), userConfig);
}