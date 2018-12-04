module.exports = function (yargs) {
  const command = 'plugin';
  const commandDescription = 'Plugin management for kaizen';
  yargs.command(command, commandDescription);
}