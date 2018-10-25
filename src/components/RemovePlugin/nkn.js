const ExecuteCommand = require('../../lib/ExecuteCommand');

module.exports = async function() {
  await ExecuteCommand('npm uninstall nkn-client');
}