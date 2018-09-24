const fs = require('fs');
const path = require('path');
const cmd = require('node-cmd');
const ncp = require('ncp').ncp;

exports.description = 'attach a plugin to dapp';

exports.yargs = function (yargs) {
  yargs
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

  const configPath = path.resolve('./', 'kaizen.json');
  if(fs.existsSync(configPath) === false) {
    console.log('[ERROR]: please use kaizen new to create new project first.')
    return;
  }

  const kaizenConfig = JSON.parse(fs.readFileSync(configPath));
  switch (pluginName) {
    case 'noia':
      handleNOIA(kaizenConfig);
      break;
    case 'bluzelle':
      handleBluzelle(kaizenConfig, boilerplate);
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

function reactMixBluzelle(kaizenConfig) {
  const sourceFolder = path.resolve(__dirname, '../../templates');
  const targetFolder = path.resolve('./', 'node_modules/pn-react-bluzelle');

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  const readStream = fs.createReadStream(path.resolve(sourceFolder, 'pn-react-bluzelle.js'));
  const writeStream = fs.createWriteStream(path.resolve(targetFolder, 'index.js'));
  readStream.pipe(writeStream);
  updateConfig(kaizenConfig, 'pn-react-bluzelle');
}

function vueMixBluzelle(kaizenConfig) {
  const sourceFolder = path.resolve(__dirname, '../../templates');
  const targetFolder = path.resolve('./', 'node_modules/pn-vue-bluzelle');

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder);
  }

  const readStream = fs.createReadStream(path.resolve(sourceFolder, 'pn-vue-bluzelle.js'));
  const writeStream = fs.createWriteStream(path.resolve(targetFolder, 'index.js'));
  readStream.pipe(writeStream);
  updateConfig(kaizenConfig, 'pn-vue-bluzelle');
}

function updateConfig(kaizenConfig, plugin) {
  if(!kaizenConfig.plugins) {
    kaizenConfig.plugins = [];
  }

  if(kaizenConfig.plugins.includes(plugin)) {
    console.log('sfsfd')
    return;
  }

  kaizenConfig.plugins.push(plugin);
  fs.writeFileSync(path.resolve('./', 'kaizen.json'), JSON.stringify(kaizenConfig));
}

function handleNOIA(kaizenConfig) {
  try {
    const checkResult = packageChecker(kaizenConfig);
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
        if (error) {
          handleError(error);
          return;
        }
        cmd.run('rm -rf ./temp-noia-sdk');
        updateConfig(kaizenConfig, 'NOIA');
      });
    });

  } catch (error) {
    handleError(error);
  }
}

function handleBluzelle(kaizenConfig, boilerplate) {
  try {
    const checkResult = packageChecker(kaizenConfig);
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

      switch (boilerplate) {
        case 'react':
          reactMixBluzelle(kaizenConfig);
          break;
        case 'vue':
          vueMixBluzelle(kaizenConfig);
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

