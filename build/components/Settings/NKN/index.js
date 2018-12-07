"use strict";

var Log = require('../../../lib/Log');

var Spinner = require('../../../lib/Spinner');

var WriteKaizen = require('../WriteKaizen.js');

function builder(yargs) {
  return yargs.option('identifier', {
    type: 'string',
    describe: 'identifier',
    require: true
  }).option('private-key', {
    type: 'string',
    describe: 'private key',
    require: true
  }).option('rpc-server', {
    type: 'string',
    describe: 'seed RPC server address',
    require: true
  }).example('kaizen set-nkn --identifier <identifier> --private-key <private key> --rpc-server <seed RPC server address>');
}

function handler(argv) {
  try {
    Spinner.start();
    var identifier = argv.identifier,
        privateKey = argv.privateKey,
        rpcServer = argv.rpcServer;
    var settings = {
      nkn: {
        identifier: identifier,
        privateKey: privateKey,
        rpcServer: rpcServer
      }
    };
    WriteKaizen(settings);
    Spinner.stop();
    Log.SuccessLog('==== NKN configuration setting successfully ====');
  } catch (error) {
    Spinner.stop();
    Log.ErrorLog('something went wrong!');
    console.error(error);
  }
}

module.exports = function (yargs) {
  var command = 'set-nkn';
  var commandDescription = 'To set the configuration of NKN locally';
  yargs.command(command, commandDescription, builder, handler);
};