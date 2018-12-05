function builder(yargs) {
  return yargs.command({
    command: '<command>',
    desc: 'Please specified a plugin command',
  })
  .example('kaizen plugins:install')
  .example('kaizen plugins:uninstall')
  .example('kaizen plugins:list')
  .demandCommand();
}

async function handler(argv) {
  
}

module.exports = function (yargs) {
  const command = 'plugins';
  const commandDescription = 'Plugin management for kaizen';
  yargs.command(command, commandDescription, builder, handler);
}
