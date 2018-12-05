function builder(yargs) {
    require('./Deploy')(yargs);
    return yargs
    .example('kaizen contracts deploy')
    .demandCommand();
  }
  
  async function handler(argv) {
    
  }
  
  module.exports = function (yargs) {
    const command = 'contracts';
    const commandDescription = 'Contract management for KAIZEN';
    yargs.command(command, commandDescription, builder, handler);
  }
  