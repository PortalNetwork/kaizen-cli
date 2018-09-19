const fs = require('fs');
const Log = require('./Log');
const ipfsAPI = require('ipfs-api')
const json = require('jsonfile')
const openBrowser = require('opn');
const fileUrl = 'build';
const kaizenfile = "kaizen.json";
const fsExistsSync = () => {
    try {
        fs.accessSync(fileUrl, fs.constants.R_OK | fs.constants.W_OK);
        return true;
    } catch (err) {
        return false;
    }
}

const loopFilesInFolder = (path, files) => {
    const readdirSyncs = fs.readdirSync(path);

    readdirSyncs.forEach(item => {
        if (item.includes('.DS_Store'))  return;
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

const content = (name) => ({
    path: name,
    content: fs.readFileSync(name)
});

exports.ipfsPublish = async yargs => {
    if(!fsExistsSync()) return Log.ErrorLog("Build This folder does not exist");
    let kaizenConfig = null;
    try {
        kaizenConfig = await json.readFile(kaizenfile)
        const ipfs = ipfsAPI(kaizenConfig.provider);
        console.log('=== upload ipfs ===')
        const files = loopFilesInFolder(fileUrl, []).map(item => content(item));
        const hashes = await ipfs.files.add(files, { recursive: false });
        const { hash, } = hashes[hashes.length - 1];
        const iphsUrl = `https://ipfs.infura.io/ipfs/${hash}`;
        openBrowser(iphsUrl);
        Log.SuccessLog(`ipfs url => ${iphsUrl}`)
        process.exit();
    }catch (err) {
        Log.ErrorLog(err)
    }
}

