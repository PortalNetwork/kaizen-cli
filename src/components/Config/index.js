module.exports = function (yargs) {
  const command = 'config';
  const commandDescription = 'Configure kaizen';
  yargs.command(command, commandDescription);
}