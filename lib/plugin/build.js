const cmd = require('node-cmd');
const fs = require('fs');
const Log = require('./Log');
const ProgressBar = require('progress');
exports.build = function (yargs) {
    let kaizenfile = "kaizen.json"
    if(!fs.existsSync(kaizenfile)) return Log.ErrorLog("Kaizen.json this file does not exist");
    let fsFile = fs.readFileSync(kaizenfile, 'utf-8');
    let settingtype = JSON.parse(fsFile);
    if(settingtype.issued !== 'PortalNetwork') return Log.ErrorLog("Kaizen.json profile error");
    Log.SuccessLog('==== Please wait in the build ====');


    const green = '\u001b[42m \u001b[0m';
    const red = '\u001b[41m \u001b[0m';
    const total = 40;
    let isLoad = false;
    const bar = new ProgressBar('  [:bar]', {
        complete: green,
        incomplete: red,
        total: total,
    });

    let barLoad = setInterval(()=>{
        bar.tick();
        bar.curr += 1;
        if(bar.curr >= total){
            bar.curr = 0
        }
        if(isLoad){
            clearInterval(barLoad);
            Log.SuccessLog(`==== build carry out ====`);
        }
    }, 100);
    
    cmd.get(`npm run build`, err =>{
        bar.curr = total;
        isLoad = true;
        if (err) return Log.ErrorLog(`[ERROR] build: ${err}`);
    });

}

