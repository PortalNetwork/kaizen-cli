const Log = require('../../../lib/Log');
const Web3 = require('web3');

module.exports = async function(network, txhash) {
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
  const txresult = await web3.eth.getTransaction(txhash);
  const txreceipt = await web3.eth.getTransactionReceipt(txhash);
  if (txreceipt.to === null) {
    txresult.to = txreceipt.contractAddress;
  }
  return txresult;
}
  