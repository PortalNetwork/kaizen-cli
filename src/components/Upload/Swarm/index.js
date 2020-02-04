const path = require('path');
const fs = require('fs');
const Log = require('../../../lib/Log');
const Spinner = require('../../../lib/Spinner');
const axios = require('axios');

function builder(yargs) {
  return yargs
    .positional('file', {
      type: 'string',
      describe: 'the file which you want to upload to swarm',
      require: true
    })
    .option('provider', {
      type: 'string',
      describe: 'swarm endpoint',
      default: 'https://swarm-gateways.net/bzz:/',
      require: true
    })
    .example('kaizen upload swarm [file] => to upload the file')
    .demandOption(['file'], '');
}

async function handler(argv) {
  try {
    const { provider } = argv;
    Log.NormalLog('Start upload to swarm, please wait a second...');
    Spinner.start();
    const targetPath = path.resolve('./', argv.file);
    const response = await axios({
      method: 'POST',
      headers: { 'content-type': 'text/plain' },
      data: fs.readFileSync(targetPath).toString(),
      url: provider || 'https://swarm-gateways.net/bzz:/',
    });
    Spinner.stop();
    Log.SuccessLog('Upload success, swarm hash: ' + response.data);
    Log.SuccessLog('You can view on: ' + provider + response.data);
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'swarm [file]';
  const commandDescription = 'Upload file to swarm';
  yargs.command(command, commandDescription, builder, handler);
}