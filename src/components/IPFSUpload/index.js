const IPFS_API = require('ipfs-api');
const path = require('path');
const fs = require('fs');
const prompt = require('prompt');
const Log = require('../../lib/Log');
const Spinner = require('../../lib/Spinner');

function builder(yargs) {
  return yargs
    .option('host', {
      type: 'string',
      describe: 'IPFS daemon API server host',
      default: 'ipfs.infura.io',
    })
    .option('port', {
      type: 'string',
      describe: 'IPFS daemon API server port',
      default: '5001',
    })
    .option('protocol', {
      type: 'string',
      describe: 'IPFS daemon API server protocol',
      default: 'https',
    });
}

async function handler(argv) {
  try {
    const result = await confirmUploadDialog();
    if (/^yes|y$/i.test(result.confirm) === false) {
      Log.SuccessLog(`==== Cancel Upload ====`);
      return;
    }

    Spinner.start();
    const { protocol, host, port, } = argv;
    const ipfs = IPFS_API(host, port, { protocol, });
    const targetPath = path.resolve('./');
    const files = recursiveFetchFilePath(targetPath).map(file => getIPFSContentObject(file, targetPath));
    const hashes = await ipfs.files.add(files);
    fs.writeFileSync(path.resolve('./', 'ipfs.json'), JSON.stringify(hashes));
    Spinner.stop();
    Log.SuccessLog(`==== Upload your files to IPFS Successfully ====`);
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

function confirmUploadDialog() {
  const promptSchema = {
    properties: {
      confirm: {
        message: 'Please ensure you will upload files in current folder to the IPFS (yes/no)',
        required: true
      },
    }
  };
  return new Promise(function (resolve, reject) {
    prompt.start();
    prompt.get(promptSchema, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    })
  });

}

function recursiveFetchFilePath(path, files = []) {
  const readdirSyncs = fs.readdirSync(path);
  readdirSyncs.forEach(item => {
    if (item.includes('.DS_Store')) return;
    switch (fs.statSync(`${path}/${item}`).isDirectory()) {
      case true:
        files = recursiveFetchFilePath(`${path}/${item}`, files);
        break;
      case false:
        files.push(`${path}/${item}`);
        break
    }
  });
  return files;
}

function getIPFSContentObject(filePath, targetPath) {
  return ({
    path: `public${filePath.replace(targetPath, '')}`,
    content: fs.readFileSync(filePath)
  });
}


module.exports = function (yargs) {
  const command = 'ipfs upload';
  const commandDescription = 'To upload files in folder where the terminal currently in to IPFS';
  yargs.command(command, commandDescription, builder, handler);
}