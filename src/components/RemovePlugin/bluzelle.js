const fsx = require('fs-extra');
const path = require('path');
const ExecuteCommand = require('../../lib/ExecuteCommand');

module.exports = async function() {
  await ExecuteCommand('npm uninstall bluzelle');
  fsx.removeSync(path.resolve('./', 'node_modules', 'pn-bluzelle'));
}