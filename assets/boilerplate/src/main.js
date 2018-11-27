const userInfo = {
  address: '',
  networkid: -1,
  hasNoMetaMask: false,
};
const guestPanel = document.querySelector('.guest');
const transactionPanel = document.querySelector('.transaction-panel');
const addressInput = document.querySelector('#address');
const ethInput = document.querySelector('#eth');

window.addEventListener('load', function() {
  const { 
    ethereum, 
    Web3: Web3Function, 
    web3: web3Instance, 
  } = window;

  if(!ethereum && !web3Instance) {
    userInfo.hasNoMetaMask = true;
    return;
  }

  if (ethereum) {
    window.web3 = new Web3Function(ethereum);
    userInfo.address = ethereum.selectedAddress || '';
  } else if (web3Instance) {
    window.web3 = new Web3Function(web3Instance.currentProvider);
  }

  refreshUI();
});

document.querySelector('#login').addEventListener('click', async function() {
  try {
    const accounts = await window.ethereum.enable();
    userInfo.address = accounts[0];
    refreshUI();
  } catch(error) {
    console.log(error);
  }
});

document.querySelector('#send').addEventListener('click', async function() {
  const address = addressInput.value;
  const eth = Number(ethInput.value);

  if(!address || !eth) {
    alert('address or eth should not be empty');
    return;
  }

  const tx = {
    from: userInfo.address,
    to: address,
    value: window.web3.toWei(eth),
  }

  const result = await sendTransaction(tx);
  alert(`your transaction hash ${result}`);
});

function refreshUI() {
  if(userInfo.address) {
    guestPanel.classList.add('hidden');
    transactionPanel.classList.remove('hidden');
  } else {
    guestPanel.classList.remove('hidden');
    transactionPanel.classList.add('hidden');
  }
}

function sendTransaction(tx) {
  return new Promise(function(resolve, reject) {
    window.web3.eth.sendTransaction(tx, function(error, result) {
      if(error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  })
}

