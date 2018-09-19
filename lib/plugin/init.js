const fs = require('fs');
const path = require('path');
const Log = require('./Log');
const kaizenfile = "kaizen.json";
const successLog = () => Log.SuccessLog("initialization");
exports.init = yargs => {
    const target = path.resolve('./', kaizenfile);
    const source = path.resolve(__dirname, '../../config/', 'kaizen.json');
    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(target);
    readStream.pipe(writeStream);
    successLog();
}