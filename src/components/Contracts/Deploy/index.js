const Log = require('../../../lib/Log');
const ExecuteCommand = require('../../../lib/ExecuteCommand');
const Spinner = require('../../../lib/Spinner');

function builder(yargs) {
  return yargs.example('kaizen contract deploy');
}

async function handler(argv) {
  try {
    Spinner.start();
    const result = await ExecuteCommand('./node_modules/.bin/truffle deploy --network deployment');
    console.log(result);
    Spinner.stop();
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'deploy';
  const commandDescription = 'Deploy smart contracts';
  yargs.command(command, commandDescription, builder, handler);
}
