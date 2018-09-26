"use strict";

var chalk = require('chalk');

var Log = console.log;
module.exports = {
  SuccessLog: function SuccessLog(log) {
    Log(chalk.green.bold(log));
  },
  ErrorLog: function ErrorLog(log) {
    Log(chalk.white.bgRed.bold(log));
  }
};