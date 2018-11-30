"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var path = require('path');

var fsx = require('fs-extra');

module.exports = function (settings) {
  var configPath = path.resolve('./', 'kaizen.json');
  var kaizenConfiguration = retrieveKaizenConfiguration(configPath);

  var newConfiguration = _objectSpread({}, kaizenConfiguration, settings);

  fsx.writeJsonSync(configPath, newConfiguration);
};

function retrieveKaizenConfiguration(configPath) {
  if (fsx.existsSync(configPath) === false) {
    return {};
  }

  return fsx.readJsonSync(configPath);
}