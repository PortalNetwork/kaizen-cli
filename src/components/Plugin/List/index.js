module.exports = function (yargs) {
  const command = 'plugin list';
  const commandDescription = 'Lists all available plugins';
  yargs.command(command, commandDescription);
}