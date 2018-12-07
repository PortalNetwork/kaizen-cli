"use strict";

var Log = require('../../../lib/Log');

var Spinner = require('../../../lib/Spinner');

var WriteKaizen = require('../WriteKaizen.js');

function builder(yargs) {
  return yargs.option('host', {
    type: 'string',
    describe: 'host',
    require: true
  }).option('port', {
    type: 'string',
    describe: 'port',
    require: true
  }).option('protocol', {
    type: 'string',
    describe: 'protocol',
    require: true
  }).example('kaizen set-ipfs --host <host> --protocol <protocol> --port <port>');
}

function handler(argv) {
  try {
    Spinner.start();
    var host = argv.host,
        port = argv.port,
        protocol = argv.protocol;
    var settings = {
      ipfs: {
        host: host,
        protocol: protocol,
        port: port
      }
    };
    WriteKaizen(settings);
    Spinner.stop();
    Log.SuccessLog('==== IPFS configuration setting successfully ====');
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  var command = 'set-ipfs';
  var commandDescription = 'To set the configuration of IPFS locally';
  yargs.command(command, commandDescription, builder, handler);
};