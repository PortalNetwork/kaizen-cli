module.exports = function (yargs) {
  const command = 'plugin install';
  const commandDescription = 'Install and add a plugin to your project';
  yargs.command(command, commandDescription);
}