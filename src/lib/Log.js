const chalk = require('chalk');
const Log = console.log;
module.exports = {
  NormalLog: (log) => {
    Log(log);
  },
  SuccessLog: (log) => {
    Log(chalk.green.bold(log));
  },
  ErrorLog: (log) => {
    Log(chalk.white.bgRed.bold(log));
  }
}