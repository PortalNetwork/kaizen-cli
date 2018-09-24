const fs = require('fs');
const path = require('path');
const Log = require('../Log');
const KAIZEN_CONFIG_FILE = "kaizen.json";

exports.description = 'initialize kaizen environment';

exports.yargs = function(yargs) {
  yargs.example('kaizen init');
}

exports.argv = function (argv) {
  const targetPath = path.resolve('./', KAIZEN_CONFIG_FILE);

  if(fs.existsSync(targetPath) === false) {
    console.error('[ERROR]: please use kaizen new to create new project first.');
    return;
  }

  const sourcePath = path.resolve(__dirname, '../../config/', KAIZEN_CONFIG_FILE);
  const sourceConfig = JSON.parse(fs.readFileSync(sourcePath));
  const targetConfig = JSON.parse(fs.readFileSync(targetPath));
  const newConfig = Object.assign({}, targetConfig, sourceConfig);
  fs.writeFileSync(targetPath, JSON.stringify(newConfig));
  Log.SuccessLog("complete initialization");
}