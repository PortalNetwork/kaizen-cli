module.exports = function (yargs) {
  const command = 'plugin uninstall';
  const commandDescription = 'Uninstall and remove a plugin to your project';
  yargs.command(command, commandDescription);
}