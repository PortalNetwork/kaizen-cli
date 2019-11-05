const Log = require('../../../lib/Log');
const path = require('path');
const fsx = require('fs-extra');
require('colors');

function builder(yargs) {
  
}

async function handler(argv) {
  Log.NormalLog('AWS Instance list:'.underline.yellow);

  const kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'));

  if (kaizenrc['instances']) {
    for (let i=0;i < kaizenrc['instances'].length;i++) {
      const instance = kaizenrc['instances'][i];
      Log.NormalLog('Template: '.yellow + instance.template + ', InstanceId: '.yellow + instance.instanceId);
      // TODO load instance status
    }
  } else {
    Log.NormalLog("There's no instance running on AWS");
  }
  
}

module.exports = function (yargs) {
  const command = 'list';
  const commandDescription = 'List instances of instance name';
  yargs.command(command, commandDescription, builder, handler);
}