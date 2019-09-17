function builder(yargs) {
  require('./Ipfs')(yargs);
  require('./Btfs')(yargs);

  return yargs
  .example('kaizen upload ipfs')
  .example('kaizen upload btfs')
  .demandCommand(1, '');
}

async function handler(argv) {
  
}

module.exports = function (yargs) {
  const command = 'upload';
  const commandDescription = 'Upload project to server or decentralized storage';
  yargs.command(command, commandDescription, builder, handler);
}
