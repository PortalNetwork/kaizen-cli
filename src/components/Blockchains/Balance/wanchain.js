const Log = require('../../../lib/Log');
const Web3 = require('web3');

module.exports = async function(network, address) {
  let provider = '';
  if (network === '1') {
    provider = 'http://wanchain.portal.network';
  } else if (network === '3') {
    provider = '';
  }
  if (provider === '') {
    Log.NormalLog('Network not support yet');
    return;
  }
  let web3 = new Web3(new Web3.providers.HttpProvider(provider));
  const balance = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balance, 'ether');
}
  