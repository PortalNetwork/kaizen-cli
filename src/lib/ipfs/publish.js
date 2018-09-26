const fs = require('fs');
const path = require('path');
const Log = require('../Log');
const ipfsAPI = require('ipfs-api');
const JSONFile = require('jsonfile');
const openBrowser = require('opn');
const BuildPath = 'build';
const kaizenfile = "kaizen.json";

function fsExistsSync() {
  try {
    fs.accessSync(BuildPath, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

function loopFilesInFolder(path, files) {
  const readdirSyncs = fs.readdirSync(path);
  readdirSyncs.forEach(item => {
    if (item.includes('.DS_Store')) return;
    switch (fs.statSync(`${path}/${item}`).isDirectory()) {
      case true:
        files = loopFilesInFolder(`${path}/${item}`, files);
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

exports.description = 'publish you app to the IPFS';

exports.yargs = function (yargs) {
  if (!fsExistsSync()) {
    Log.ErrorLog("Build This folder does not exist");
  }

  const targetPath = `${path.resolve('./', BuildPath)}`;

  try {
    (async function(yargs, targetPath) {
      const kaizenConfig = await JSONFile.readFile(kaizenfile)
      const ipfs = ipfsAPI(kaizenConfig.provider);
      console.log('=== uploading to the IPFS ===')
      const files = loopFilesInFolder(targetPath, []).map(item => getIPFSContentObject(item, targetPath));
      const hashes = await ipfs.files.add(files, { recursive: false });
      const { hash, } = hashes[hashes.length - 1];
      const ipfsUrl = `https://ipfs.infura.io/ipfs/${hash}`;
      openBrowser(ipfsUrl);
      Log.SuccessLog(`ipfs url => ${ipfsUrl}`)
      process.exit();
    })(yargs, targetPath);
  } catch (err) {
    Log.ErrorLog(err)
  }
}

