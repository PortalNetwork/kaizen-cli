const path = require('path');
const fsx = require('fs-extra');
const Table = require('cli-table');
const Log = require('../../../../lib/Log');
const Spinner = require('../../../../lib/Spinner');
const { apiKaizenInstanceInfo } = require('../../../../lib/apis');
require('colors');

function builder(yargs) {
  return yargs
    .option('node', {
      alias: 'i',
      type: 'string',
      describe: 'node id',
      require: true
    })
    .option('type', {
      alias: 't',
      type: 'string',
      describe: 'Type of the node',
      require: true,
      default: 'SHARED',
      choices: ['SHARED', 'PUBLIC', 'PRIVATE']
    })
    .example('kaizen nodes info --node 7 --type SHARED');
}

async function handler(argv) {
  try {
    let {node, type} = argv;
    const config = fsx.readJsonSync(path.resolve(__dirname, '../../../../../.kaizenrc'));
    if (!config.idToken) {
      Log.ErrorLog('Please login first, use \'kaizen login\' to login into KAIZEN Platform');
      return;
    }

    Spinner.start();
    const instanceInfo = await apiKaizenInstanceInfo(config.idToken, node, type);
    Spinner.stop();
    if (instanceInfo.data) {
      Log.SuccessLog('Get node information');
      // TODO table display
      let data = instanceInfo.data;
      const table = new Table({
        head: ['Node Id'.green, 'Name'.green, 'Protocol'.green, 'Network'.green, 'Provider'.green, 'Region'.green, 'Public DNS'.green]
      });
      table.push([data.instanceid, data.name, data.protocol, data.network, data.provider, data.region, data.publicdns]);
      console.log(table.toString());
      //Log.NormalLog(table.toString());
    } else {
      Log.NormalLog('Can not find node');
    }
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'info';
  const commandDescription = 'Show node information';
  yargs.command(command, commandDescription, builder, handler);
}