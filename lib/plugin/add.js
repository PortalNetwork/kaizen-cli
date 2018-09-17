const fs = require('fs');
const path = require('path');
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
    case 'bluzelle':
      handleBluzelle();
      break;
  }
}

function packageChecker() {
  const package = JSON.parse(fs.readFileSync('./kaizen.json', 'utf8'));

  const kaizenProjectType = [
    'React',
    'vue',
  ];

  return ({
    package,
    isValid: kaizenProjectType.includes(package.type),
  });
}

function handleError(error) {
  if(!error.message) {
    console.error('[ERROR]: there is something error occur');
    return;
  }
  
  if(error.message.includes("no such file or directory, open './kaizen.json'")) {
    console.error('[ERROR]: please use kaizen new to create new project first');
    return;
  }
  console.error(`[ERROR]: ${error.message}`);
}

function handleNOIA () {
  try {
    const checkResult = packageChecker();
    if(checkResult.isValid === false) {
      console.error('[ERROR]: please use kaizen new to create new project first');
      return;
    }

    console.log('kaizen: installing noia sdk...');

    // clone noia sdk repo and copy out packages
    cmd.get('git clone https://github.com/noia-network/sdk.git temp-noia-sdk', function(err_one) {
      if(err_one) {
        handleError(err_one);
        return;
      }

      ncp('./temp-noia-sdk/packages', './', function(error) {
        cmd.run('rm -rf ./temp-noia-sdk');
      });
    });

  } catch(error) {
    handleError(error);
  }
}

function handleBluzelle() {
  try {
    const checkResult = packageChecker();
    if(checkResult.isValid === false) {
      console.error('[ERROR]: please use kaizen new to create new project first.');
      return;
    }

    if(checkResult.package.type !== 'React') {
      console.error('[ERROR]: this feature is only for react now.');
      return;
    } 

    console.log('kaizen: installing bluzelle sdk...');
    
    cmd.get('npm install bluzelle', function(err_one) {
      if(err_one) {
        handleError(err_one);
        return;
      }

      const sourceFolder = path.resolve(__dirname, '../../templates');
      const targetFolder = path.resolve('./', 'src/container/PNBluzelle');

      if (!fs.existsSync(targetFolder)){
        fs.mkdirSync(targetFolder);
      }

      const readStream = fs.createReadStream(path.resolve(sourceFolder, 'pn-bluzelle.js'));
      const writeStream = fs.createWriteStream(path.resolve(targetFolder, 'index.js'));
      readStream.pipe(writeStream);
    });
  } catch(error) {
    handleError(error);
  }
}

