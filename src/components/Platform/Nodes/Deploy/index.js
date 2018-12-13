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
      describe: 'Protocol of the node',
      require: true,
      choices: ['ipfs-gateway', 'ipfs-api-server', 'ethereum', 'wanchain', 'icon']
    })
    .option('network', {
      alias: 'n',
      type: 'string',
      describe: 'Network of the node; mainnet: 1, testnet: 3',
      require: true
    })
    .example('kaizen nodes deploy --protocol ipfs-gateway --network 1')
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
    let net = '';
    if (network === '1') {
      net = 'mainnet';
    } else if (network === '3') {
      net = 'testnet';
    } else {
      Log.NormalLog('Unsupport network.');
    }
    const config = fsx.readJsonSync(path.resolve(__dirname, '../../../../../.kaizenrc'));
    if (!config.idToken) {
      Log.NormalLog('Please login first, you can use ' + '\'kaizen login\'' + ' to login into KAIZEN Platform');
      return;
    }

    Spinner.start();
    const instances = await apiKaizenCreateSharedInstance(config.idToken, protocol, net);
    Spinner.stop();
    if (instances.data.isSuccess) {
      Log.SuccessLog('Create shared node success');
      const table = new Table({
        head: ['Node Id'.green, 'Protocol'.green, 'Type'.green, 'Provider'.green, 'Public DNS'.green, 'Network'.green, 'Region'.green]
      });
      table.push([instances.data.instanceId, instances.data.name, 'SHARED', instances.data.provider, instances.data.publicDNS, net, instances.data.region]);
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
  const commandDescription = 'Deploy a node';
  yargs.command(command, commandDescription, builder, handler);
}