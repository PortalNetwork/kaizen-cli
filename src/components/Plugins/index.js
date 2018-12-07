function builder(yargs) {
  require('./Install')(yargs);
  require('./Uninstall')(yargs);
  require('./List')(yargs);

  return yargs
  .example('kaizen plugins install')
  .example('kaizen plugins uninstall')
  .example('kaizen plugins list')
  .demandCommand(1, '');
}

async function handler(argv) {
  
}

module.exports = function (yargs) {
  const command = 'plugins';
  const commandDescription = 'Plugin management for kaizen';
  yargs.command(command, commandDescription, builder, handler);
}
