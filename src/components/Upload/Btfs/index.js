const btfsClient = require('ipfs-http-client');
const path = require('path');
const fs = require('fs');
const prompt = require('prompt');
const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');

function builder(yargs) {
  return yargs
    .positional('file', {
      type: 'string',
      describe: 'the file or the folder which you want to upload to BTFS',
      require: true
    })
    .option('host', {
      type: 'string',
      describe: 'host of BTFS endpoint',
      default: 'api.btfs.trongrid.io',
      require: true
    })
    .option('port', {
      type: 'string',
      describe: 'port of BTFS endpoint',
      default: '443',
      require: true
    })
    .option('protocol', {
      type: 'string',
      describe: 'protocol of BTFS endpoint',
      default: 'https',
      require: true
    })
    .example('kaizen upload btfs . => to upload the current folder')
    .example('kaizen upload btfs ./build => to upload the build folder in the current folder')
    .demandOption(['file'], '');
}

async function handler(argv) {
  try {
    const { host, port, protocol } = argv;
    if (argv.file === undefined) {
      Log.NormalLog('Please specify a file path or a folder path');
      Log.NormalLog('Use ' + '\'kaizen upload btfs [file]\''.yellow + ' to upload single file');
      Log.NormalLog('Use ' + '\'kaizen upload btfs [folder]\''.yellow + ' to upload with folder');
      return;
    }
    const targetPath = path.resolve('./', argv.file);
    const result = await confirmUploadDialog(targetPath);
    if (/^yes|y$/i.test(result.confirm) === false) {
      Log.NormalLog(`Cancel Upload`);
      return;
    }

    Spinner.start();
    const btfs = btfsClient(host, port, { protocol });

    const filesReadyToBTFS = getFilesReadyToBTFS(targetPath);
    const hashes = await btfs.add(filesReadyToBTFS);
    fs.writeFileSync(path.resolve('./', 'btfs.json'), JSON.stringify(hashes));
    const hashObj = hashes.length === 0 ?  hashes[0] : hashes[hashes.length - 1];
    Spinner.stop();
    Log.SuccessLog(`Upload files to BTFS Successfully`);
    console.log(`\nFile/Folder hash: ${hashObj.hash}`);
    Log.NormalLog('You can access the file through:');
    Log.NormalLog(`https://gateway.btfssoter.io/btfs/${hashObj.hash}`.underline.yellow + '\n');
    //Log.NormalLog(`${protocol}://${host}/btfs/${hashObj.hash}`.underline.yellow + '\n');
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
        message: 'Please ensure you will upload ' + targetPath.yellow + ' to the BTFS (yes/no)',
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
        Log.NormalLog('Start uploading...');
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
        break;
    }
  });
  return files;
}

function getBTFSContentObject(filePath, targetPath) {
  console.log('Upload File: ' + filePath);
  return ({
    path: `public${filePath.replace(targetPath, '')}`,
    content: fs.readFileSync(filePath)
  });
}

function getFilesReadyToBTFS(targetPath) {
  if (fs.lstatSync(targetPath).isDirectory()) {
    const result = recursiveFetchFilePath(targetPath);
    return result.map(file => {getBTFSContentObject(file, targetPath)});
  } else {
    return fs.readFileSync(targetPath);
  }
}

module.exports = function (yargs) {
  const command = 'btfs [file]';
  const commandDescription = 'Upload file or folder to BTFS';
  yargs.command(command, commandDescription, builder, handler);
}