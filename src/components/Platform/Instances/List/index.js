const path = require('path');
const fsx = require('fs-extra');
const Table = require('cli-table');
const Log = require('../../../../lib/Log');
const Spinner = require('../../../../lib/Spinner');
const { apiKaizenInstanceList } = require('../../../../lib/apis');
require('colors');

function builder(yargs) {
  return yargs
    .example('kaizen instances list');
}

async function handler(argv) {
  try {
    const config = fsx.readJsonSync(path.resolve(__dirname, '../../../../../.kaizenrc'));
    if (!config.idToken) {
      Log.ErrorLog('Please login first, use \'kaizen login\' to login into KAIZEN Platform');
      return;
    }

    Spinner.start();
    const instances = await apiKaizenInstanceList(config.idToken);
    Spinner.stop();
    if (instances.data.instanceList) {
      const instanceList = instances.data.instanceList;
      Log.SuccessLog('Get instance list');
      if (instanceList.length > 0) {
        // TODO table display
        Log.NormalLog(`You have ${instanceList.length} instances:\n`);
        const table = new Table({
          head: ['InstanceId'.green, 'Name'.green, 'Type'.green, 'Protocol'.green, 'Network'.green, 'Running Node'.green]
        });
        instanceList.forEach((row) => {
          table.push([row.instanceId, row.name, row.type, row.protocol, row.network, row.node]);
        })
        console.log(table.toString());
        Log.NormalLog('\nInstance management: '.underline.yellow);
        Log.NormalLog('Use ' + '\'kaizen instances info --instance <INSTANCE_ID>\''.yellow + ' to get more information of the instance');
      } else {
        Log.NormalLog('You don\'t have any instance. \nUse \'kaizen instances deploy\' to create instance');
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
  const commandDescription = 'Lists all instances';
  yargs.command(command, commandDescription, builder, handler);
}