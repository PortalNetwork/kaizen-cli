const ipfsClient = require('ipfs-http-client');
const path = require('path');
const fs = require('fs');
const prompt = require('prompt');
const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');

function builder(yargs) {
  return yargs
    .positional('file', {
      type: 'string',
      describe: 'the file or the folder which you want to upload to IPFS',
      require: true
    })
    .option('host', {
      type: 'string',
      describe: 'host of IPFS endpoint',
      default: 'ipfs.infura.io',
      require: true
    })
    .option('port', {
      type: 'string',
      describe: 'port of IPFS endpoint',
      default: '5001',
      require: true
    })
    .option('protocol', {
      type: 'string',
      describe: 'protocol of IPFS endpoint',
      default: 'https',
      require: true
    })
    .example('kaizen upload ipfs . => to upload the current folder')
    .example('kaizen upload ipfs ./build => to upload the build folder in the current folder');
}

async function handler(argv) {
  try {
    const { host, port, protocol } = argv;
    const targetPath = path.resolve('./', argv.file);
    const result = await confirmUploadDialog(targetPath);
    if (/^yes|y$/i.test(result.confirm) === false) {
      Log.NormalLog(`Cancel Upload`);
      return;
    }

    Spinner.start();
    const ipfs = ipfsClient(host, port, { protocol });

    const filesReadyToIPFS = getFilesReadyToIPFS(targetPath);
    const hashes = await ipfs.add(filesReadyToIPFS);
    fs.writeFileSync(path.resolve('./', 'ipfs.json'), JSON.stringify(hashes));
    const hashObj = hashes.length === 0 ?  hashes[0] : hashes[hashes.length - 1];
    Spinner.stop();
    Log.SuccessLog(`Upload files to IPFS Successfully`);
    console.log(`\nFile/Folder hash: ${hashObj.hash}`);
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

function confirmUploadDialog(targetPath) {
  const promptSchema = {
    properties: {
      confirm: {
        message: 'Please ensure you will upload ' + '\'targetPath\''.yellow + ' to the IPFS (yes/no)',
        required: true
      }
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

function getFilesReadyToIPFS(targetPath) {
  if (fs.lstatSync(targetPath).isDirectory()) {
    return recursiveFetchFilePath(targetPath).map(file => {getIPFSContentObject(file, targetPath)});
  } else {
    return fs.readFileSync(targetPath);
  }
}

module.exports = function (yargs) {
  const command = 'ipfs [file]';
  const commandDescription = 'To upload file or folder to IPFS';
  yargs.command(command, commandDescription, builder, handler);
}