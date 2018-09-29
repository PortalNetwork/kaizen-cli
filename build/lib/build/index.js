"use strict";

var cmd = require('node-cmd');

var path = require('path');

var fs = require('fs');

var Log = require('../Log');

var ProgressBar = require('progress');

var KAIZEN_CONFIG_FILE = "kaizen.json";
exports.description = 'build dapp package';

exports.yargs = function (yargs) {
  yargs.example('kaizen build');
};

exports.argv = function (argv) {
  var targetPath = path.resolve('./', KAIZEN_CONFIG_FILE);

  if (fs.existsSync(targetPath) === false) {
    Log.ErrorLog("Kaizen.json this file does not exist");
    return;
  }

  var targetConfig = JSON.parse(fs.readFileSync(targetPath, 'utf-8'));

  if (targetConfig.issued !== 'PortalNetwork') {
    Log.ErrorLog("Kaizen.json profile error");
    return;
  }

  Log.SuccessLog('==== Please wait in the build ====');
  var green = "\x1B[42m \x1B[0m";
  var red = "\x1B[41m \x1B[0m";
  var total = 40;
  var isLoad = false;
  var bar = new ProgressBar('  [:bar]', {
    complete: green,
    incomplete: red,
    total: total
  });
  var barLoad = setInterval(function () {
    bar.tick();
    bar.curr += 1;

    if (bar.curr >= total) {
      bar.curr = 0;
    }

    if (isLoad) {
      clearInterval(barLoad);
      Log.SuccessLog("==== build carry out ====");
    }
  }, 100);
  cmd.get("npm run build", function (err) {
    bar.curr = total;
    isLoad = true;
    if (err) return Log.ErrorLog("[ERROR] build: ".concat(err));
  });
};