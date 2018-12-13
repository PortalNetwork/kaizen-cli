const path = require('path');
const fsx = require('fs-extra');
const Table = require('cli-table');
const Log = require('../../../../lib/Log');
const Spinner = require('../../../../lib/Spinner');
const { apiKaizenInstanceList } = require('../../../../lib/apis');
require('colors');

function builder(yargs) {
  return yargs
    .example('kaizen nodes list');
}

async function handler(argv) {
  try {
    const config = fsx.readJsonSync(path.resolve(__dirname, '../../../../../.kaizenrc'));
    if (!config.idToken) {
      Log.ErrorLog('Please login first, use \'kaizen login\' to login into KAIZEN Platform');
      return;
    }

    Spinner.start();
    const nodes = await apiKaizenInstanceList(config.idToken);
    Spinner.stop();
    if (nodes.data.instanceList) {
      const instanceList = nodes.data.instanceList;
      Log.SuccessLog('Get instance list');
      if (instanceList.length > 0) {
        // TODO table display
        Log.NormalLog(`You have ${instanceList.length} nodes:\n`);
        const table = new Table({
          head: ['Node Id'.green, 'Name'.green, 'Type'.green, 'Protocol'.green, 'Network'.green, 'Running Node'.green]
        });
        instanceList.forEach((row) => {
          table.push([row.instanceId, row.name, row.type, row.protocol, row.network, row.node]);
        })
        console.log(table.toString());
        Log.NormalLog('\nNode management: '.underline.yellow);
        Log.NormalLog('Use ' + '\'kaizen nodes info --node <NODE_ID>\''.yellow + ' to get more information of the node');
      } else {
        Log.NormalLog('You don\'t have any node. \nUse \'kaizen nodes deploy\' to create node');
      }
    }
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  const command = 'list';
  const commandDescription = 'List all nodes';
  yargs.command(command, commandDescription, builder, handler);
}