const cmd = require('node-cmd');
const path = require('path');
const fs = require('fs');
const Log = require('../Log');
const ProgressBar = require('progress');
const KAIZEN_CONFIG_FILE = "kaizen.json";


exports.description = 'build dapp package';

exports.yargs = function (yargs) {
  yargs.example('kaizen build');
}

exports.argv = function(argv) {
  const targetPath = path.resolve('./', KAIZEN_CONFIG_FILE);
  if (fs.existsSync(targetPath) === false) {
    Log.ErrorLog("Kaizen.json this file does not exist");
    return;
  }

  const targetConfig = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));
  if (targetConfig.issued !== 'PortalNetwork') {
    Log.ErrorLog("Kaizen.json profile error");
    return;
  }

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

  let barLoad = setInterval(() => {
    bar.tick();
    bar.curr += 1;
    if (bar.curr >= total) {
      bar.curr = 0
    }
    if (isLoad) {
      clearInterval(barLoad);
      Log.SuccessLog(`==== build carry out ====`);
    }
  }, 100);

  cmd.get(`npm run build`, err => {
    bar.curr = total;
    isLoad = true;
    if (err) return Log.ErrorLog(`[ERROR] build: ${err}`);
  });

}

