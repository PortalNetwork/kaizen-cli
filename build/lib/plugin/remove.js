"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var path = require('path');

var cmd = require('node-cmd');

var fsHelper = require('../helper/fsHelper.js');

exports.description = 'remove a plugin from dapp';

exports.yargs = function (yargs) {
  yargs.demandOption(['plugin-name'], 'Please enter a plugin name').example('kaizen plugin remove <plugin name>');
};

exports.argv = function (argv) {
  var pluginName = argv.pluginName;
  var configPath = path.resolve('./', 'kaizen.json');

  if (fsHelper.existsSync(configPath) === false) {
    console.log('[ERROR]: please use kaizen new to create new project first.');
    return;
  }

  var kaizenConfig = fsHelper.readJSONSync(configPath);

  switch (pluginName) {
    case 'noia':
      removeNOIA(configPath, kaizenConfig, ['NOIA']);
      break;

    case 'bluzelle':
      removeBluzelle(configPath, kaizenConfig, ['pn-vue-bluzelle', 'pn-react-bluzelle', 'pn-vue-bluzelle']);
      break;

    default:
      console.log("there is no plugin named ".concat(pluginName, " in this project"));
      break;
  }
};

function removeNOIA(configPath, kaizenConfig, pluginKeywords) {
  var newKaizenConfig = _objectSpread({}, kaizenConfig, {
    plugins: kaizenConfig.plugins.filter(function (x) {
      return pluginKeywords.includes(x) === false;
    })
  });

  ['sdk', 'sdk-react'].map(function (x) {
    return path.resolve('./', x);
  }).forEach(function (x) {
    fsHelper.removeSync(x);
  });
  fsHelper.updateFileSync(configPath, JSON.stringify(newKaizenConfig));
  console.log('plugin removed');
}

function removeBluzelle(configPath, kaizenConfig, pluginKeywords) {
  var newKaizenConfig = _objectSpread({}, kaizenConfig, {
    plugins: kaizenConfig.plugins.filter(function (x) {
      return pluginKeywords.includes(x) === false;
    })
  });

  pluginKeywords.map(function (x) {
    return path.resolve('./', 'node_modules', x);
  }).forEach(function (x) {
    fsHelper.removeSync(x);
  });
  fsHelper.updateFileSync(configPath, JSON.stringify(newKaizenConfig));
  console.log('plugin removed');
}