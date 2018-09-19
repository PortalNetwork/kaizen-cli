const fs = require('fs');
const path = require('path');
const cmd = require('node-cmd');
const ncp = require('ncp').ncp;

exports.description = 'attach an plugin to dapp';

exports.yargs = function (yargs) {
  return yargs
    .option('b', {
      alias: 'boilerplate',
      describe: 'dapp boilerplate of vue or react',
      choices: ['vue', 'react'],
      default: 'react'
    })
    .demandOption(['plugin-name'], 'Please enter a plugin name')
    .example('kaizen plugin add <plugin name>');
}

exports.argv = function (argv) {
  const { pluginName, boilerplate, } = argv;
  switch (pluginName) {
    case 'noia':
      handleNOIA();
      break;
    case 'bluzelle':
      handleBluzelle(boilerplate);
      break;
  }
}

function packageChecker(package) {
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
  if (!error.message) {
    console.error('[ERROR]: there is something error occur');
    return;
  }

  if (error.message.includes("no such file or directory, open './kaizen.json'")) {
    console.error('[ERROR]: please use kaizen new to create new project first');
    return;
  }
  console.error(`[ERROR]: ${error.message}`);
}

function reactMixBluzelle() {
  const sourceFolder = path.resolve(__dirname, '../../templates');
  const targetFolder = path.resolve('./', 'node_modules/pn-react-bluzelle');
  
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  const readStream = fs.createReadStream(path.resolve(sourceFolder, 'pn-react-bluzelle.js'));
  const writeStream = fs.createWriteStream(path.resolve(targetFolder, 'index.js'));
  readStream.pipe(writeStream);
}

function vueMixBluzelle() {
  const sourceFolder = path.resolve(__dirname, '../../templates');
  const targetFolder = path.resolve('./', 'node_modules/pn-vue-bluzelle');

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  const readStream = fs.createReadStream(path.resolve(sourceFolder, 'pn-vue-bluzelle.js'));
  const writeStream = fs.createWriteStream(path.resolve(targetFolder, 'index.js'));
  readStream.pipe(writeStream);
}

function handleNOIA() {
  try {
    const package = JSON.parse(fs.readFileSync('./kaizen.json', 'utf8'));
    const checkResult = packageChecker(package);
    if (checkResult.isValid === false) {
      console.error('[ERROR]: please use kaizen new to create new project first');
      return;
    }

    console.log('kaizen: installing noia sdk...');

    // clone noia sdk repo and copy out packages
    cmd.get('git clone https://github.com/noia-network/sdk.git temp-noia-sdk', function (error) {
      if (error) {
        handleError(error);
        return;
      }

      ncp('./temp-noia-sdk/packages', './', function (error) {
        cmd.run('rm -rf ./temp-noia-sdk');
      });
    });

  } catch (error) {
    handleError(error);
  }
}

function handleBluzelle(boilerplate) {
  try {
    const package = JSON.parse(fs.readFileSync('./kaizen.json', 'utf8'));
    const checkResult = packageChecker(package);
    if (checkResult.isValid === false) {
      console.error('[ERROR]: please use kaizen new to create new project first.');
      return;
    }

    console.log('kaizen: installing bluzelle sdk...');

    cmd.get('npm install bluzelle', function (error) {
      if (error) {
        handleError(error);
        return;
      }

      switch(boilerplate) {
        case 'react':
          reactMixBluzelle();
          break;
        case 'vue':
          vueMixBluzelle();
          break;
        default:
          handleError(new Error('please specify boilerplate'));
          break;
      }
    });
  } catch (error) {
    console.log('error', error);
    handleError(error);
  }
}

