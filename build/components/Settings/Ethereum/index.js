"use strict";

var Log = require('../../../lib/Log');

var Spinner = require('../../../lib/Spinner');

var WriteKaizen = require('../WriteKaizen.js');

function builder(yargs) {
  return yargs.option('network', {
    type: 'string',
    describe: 'network',
    require: true
  }).option('provider', {
    type: 'string',
    describe: 'provider',
    require: true
  }).option('port', {
    type: 'string',
    describe: 'port',
    require: true
  }).example('kaizen set-ethereum --network <net work id> --provider <provider> --port <port>');
}

function handler(argv) {
  try {
    Spinner.start();
    var network = argv.network,
        provider = argv.provider,
        port = argv.port;
    var settings = {
      ethereum: {
        network: network,
        provider: provider,
        port: port
      }
    };
    WriteKaizen(settings);
    Spinner.stop();
    Log.SuccessLog('==== Ethereum configuration setting successfully ====');
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  var command = 'set-ethereum';
  var commandDescription = 'To set the configuration of Ethereum locally';
  yargs.command(command, commandDescription, builder, handler);
};