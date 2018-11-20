const IPFS_API = require('ipfs-api');
const path = require('path');
const fs = require('fs');
const fsx = require('fs-extra');
const prompt = require('prompt');
const Log = require('../../lib/Log');
const Spinner = require('../../lib/Spinner');

function builder(yargs) {
  return yargs
    .positional('path', {
      type: 'string',
      describe: 'the path of the file or the folder which you want to upload to IPFS',
      default: '.'
    })
    .example('kaizen ipfs upload . => to upload the current folder')
    .example('kaizen ipfs upload ./build => to upload the build folder in the current folder')
}

async function handler(argv) {
  try {
    const targetPath = path.resolve('./', argv.path);
    const result = await confirmUploadDialog(targetPath);
    if (/^yes|y$/i.test(result.confirm) === false) {
      Log.SuccessLog(`==== Cancel Upload ====`);
      return;
    }

    Spinner.start();

    const configPath = path.resolve('./', 'kaizen.json');
    if (fsx.existsSync(configPath) === false) {
      Spinner.stop();
      Log.ErrorLog('Missing kaizen.json, you should use「kaizen set-ipfs」command to setting IPFS configuration');
      return;
    }


    const kaizenConfig = fsx.readJsonSync(configPath);
    if (!kaizenConfig.ipfs) {
      Spinner.stop();
      Log.ErrorLog('Missing kaizen.json, you should use「kaizen set-ipfs」command to setting IPFS configuration');
      return;
    }

    if(!fs.existsSync(targetPath)) {
      Spinner.stop();
      Log.ErrorLog('The path that you specify is not exist');
      return;
    }

    const {
      host,
      port,
      protocol
    } = kaizenConfig.ipfs;

    const ipfs = IPFS_API(host, port, { protocol });

    if (fs.lstatSync(targetPath).isDirectory()) {
      const files = recursiveFetchFilePath(targetPath).map(file => getIPFSContentObject(file, targetPath));
      const hashes = await ipfs.files.add(files);
      fs.writeFileSync(path.resolve('./', 'ipfs.json'), JSON.stringify(hashes));
    } else {
      const hashes = await ipfs.files.add(fs.readFileSync(targetPath));
      fs.writeFileSync(path.resolve('./', 'ipfs.json'), JSON.stringify(hashes));
    }

    Spinner.stop();
    Log.SuccessLog(`==== Upload your files to IPFS Successfully ====`);
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
        message: `Please ensure you will upload 「${targetPath}」 to the IPFS (yes/no)`,
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
  const command = 'ipfs upload [path]';
  const commandDescription = 'To upload file or folder to IPFS';
  yargs.command(command, commandDescription, builder, handler);
}