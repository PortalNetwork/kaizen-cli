const IPFS_Setting = require('./IPFS');
const Ethereum_Setting = require('./Ethereum');
const NKN_Setting = require('./NKN');

module.exports = function(yargs) {
  IPFS_Setting(yargs);
  Ethereum_Setting(yargs);
  NKN_Setting(yargs);
}
