"use strict";

var IPFS_Setting = require('./IPFS');

var Ethereum_Setting = require('./Ethereum');

var NKN_Setting = require('./NKN');

module.exports = function (yargs) {
  IPFS_Setting(yargs);
  Ethereum_Setting(yargs);
  NKN_Setting(yargs);
};