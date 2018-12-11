const path = require('path');
const fsx = require('fs-extra');
const Table = require('cli-table');
const Log = require('../../../../lib/Log');
const Spinner = require('../../../../lib/Spinner');
const { apiKaizenCreateSharedInstance } = require('../../../../lib/apis');
require('colors');

function builder(yargs) {
  return yargs
    .option('protocol', {
      alias: 'p',
      type: 'string',
      describe: 'Protocol of the instance',
      require: true,
      choices: ['ipfs-gateway', 'ipfs-api-server', 'ethereum', 'wanchain', 'icon']
    })
    .option('network', {
      alias: 'n',
      type: 'string',
      describe: 'Network of the instance',
      require: true,
      choices: ['mainnet', 'testnet']
    })
    .example('kaizen instances deploy --protocol ipfs-gateway --network mainnet')
    .demandOption(['protocol', 'network'], '');
}

async function handler(argv) {
  try {
    const { protocol, network } = argv;
    if (!protocol) {
      Log.NormalLog('Missing protocol.');
      return;
    }
    if (!network) {
      Log.NormalLog('Missing network.');
      return;
    }
    const config = fsx.readJsonSync(path.resolve(__dirname, '../../../../../.kaizenrc'));
    if (!config.idToken) {
      Log.NormalLog('Please login first, you can use ' + '\'kaizen login\'' + ' to login into KAIZEN Platform');
      return;
    }

    Spinner.start();
    const instances = await apiKaizenCreateSharedInstance(config.idToken, protocol, network);
    Spinner.stop();
    if (instances.data.isSuccess) {
      Log.SuccessLog('Create shared instance success');
      const table = new Table({
        head: ['InstanceId'.green, 'Protocol'.green, 'Type'.green, 'Provider'.green, 'Public DNS'.green, 'Network'.green, 'Region'.green]
      });
      table.push([instances.data.instanceId, instances.data.name, 'SHARED', instances.data.provider, instances.data.publicDNS, network, instances.data.region]);
      console.log(table.toString());
    }
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('ERROR');
    if (error.response && error.response.status === 401) {
      Log.NormalLog('Access token expired, please login again');
    } else if (error.response && error.response.status === 400) {
      Log.NormalLog(error.response.data.message);
    } else {
      console.log(error);
    }
  }
}

module.exports = function (yargs) {
  const command = 'deploy';
  const commandDescription = 'Deploy an instance';
  yargs.command(command, commandDescription, builder, handler);
}