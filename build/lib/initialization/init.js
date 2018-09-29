"use strict";

var fs = require('fs');

var path = require('path');

var Log = require('../Log');

var KAIZEN_CONFIG_FILE = "kaizen.json";
exports.description = 'initialize kaizen environment';

exports.yargs = function (yargs) {
  yargs.example('kaizen init');
};

exports.argv = function (argv) {
  var targetPath = path.resolve('./', KAIZEN_CONFIG_FILE);

  if (fs.existsSync(targetPath) === false) {
    console.error('[ERROR]: please use kaizen new to create new project first.');
    return;
  }

  var sourcePath = path.resolve(__dirname, '../../../config/', KAIZEN_CONFIG_FILE);
  var sourceConfig = JSON.parse(fs.readFileSync(sourcePath));
  var targetConfig = JSON.parse(fs.readFileSync(targetPath));
  var newConfig = Object.assign({}, targetConfig, sourceConfig);
  fs.writeFileSync(targetPath, JSON.stringify(newConfig));
  Log.SuccessLog("complete initialization");
};