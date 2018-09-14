const fs = require('fs');
const cmd = require('node-cmd');
const ncp = require('ncp').ncp;

exports.description = 'attach an plugin to dapp';

exports.yargs = function (yargs) {
  return yargs
    .demandOption(['plugin-name'], 'Please enter a plugin name')
    .example('kaizen plugin add <plugin name>');
}

exports.argv = function (argv) {
  const { pluginName, } = argv;
  switch(pluginName) {
    case 'noia':
      handleNOIA();
      break;
  }
}

function handleNOIA () {
  console.log('kaizen: downloading noia sdk...');
  try {
    const package = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    if(package.name !== 'react-truffle-metamask') {
      console.error('[ERROR]: please use kaizen new to create new project first');
      return;
    }

    // clone noia sdk repo and copy out packages
    cmd.get('git clone https://github.com/noia-network/sdk.git temp-noia-sdk', function(err_one) {
      ncp('./temp-noia-sdk/packages', './', function(error) {
        cmd.run('rm -rf ./temp-noia-sdk');
      });
    });

  } catch(error) {
    if(!error.message) {
      console.error('[ERROR]: there is something error occur');
      return;
    }
    
    if(error.message.includes("no such file or directory, open './package.json'")) {
      console.error('[ERROR]: please use kaizen new to create new project first');
      return;
    }
    console.error(`[ERROR]: ${error.message}`);
  }
}