const path = require('path');
const cmd = require('node-cmd');
const fsHelper = require('../helper/fsHelper.js');

exports.description = 'remove a plugin from dapp';

exports.yargs = function(yargs) {
  yargs
  .demandOption(['plugin-name'], 'Please enter a plugin name')
  .example('kaizen plugin remove <plugin name>');
}

exports.argv = function(argv) {
  const { pluginName, } = argv;
  
  const configPath = path.resolve('./', 'kaizen.json');
  if(fsHelper.existsSync(configPath) === false) {
    console.log('[ERROR]: please use kaizen new to create new project first.')
    return;
  }

  const kaizenConfig = fsHelper.readJSONSync(configPath);
  switch(pluginName) {
    case 'noia':
      removeNOIA(configPath, kaizenConfig, ['NOIA']);
      break;
    case 'bluzelle':
      removeBluzelle(configPath, kaizenConfig, ['pn-vue-bluzelle', 'pn-react-bluzelle', 'pn-vue-bluzelle']);
      break;
    default:
      console.log(`there is no plugin named ${pluginName} in this project`);
      break;
  }
}

function removeNOIA(configPath, kaizenConfig, pluginKeywords) {
  const newKaizenConfig = {
    ...kaizenConfig,
    plugins: kaizenConfig.plugins.filter(x => pluginKeywords.includes(x) === false),
  };

  ['sdk', 'sdk-react'].map(x => path.resolve('./', x)).forEach(x => {
    fsHelper.removeSync(x);
  });

  fsHelper.updateFileSync(configPath, JSON.stringify(newKaizenConfig));
  console.log('plugin removed');
}

function removeBluzelle(configPath, kaizenConfig, pluginKeywords) {
  const newKaizenConfig = {
    ...kaizenConfig,
    plugins: kaizenConfig.plugins.filter(x => pluginKeywords.includes(x) === false),
  };

  pluginKeywords.map(x => path.resolve('./', 'node_modules', x)).forEach(x => {
    fsHelper.removeSync(x);
  });

  fsHelper.updateFileSync(configPath, JSON.stringify(newKaizenConfig));
  console.log('plugin removed');
}