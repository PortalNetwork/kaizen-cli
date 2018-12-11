"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Table = require('cli-table');

var Log = require('../../../lib/Log');

var Spinner = require('../../../lib/Spinner');

var ethereumHandler = require('./ethereum.js');

var wanchainHandler = require('./wanchain.js');

require('colors');

function builder(yargs) {
  return yargs.option('blockchain', {
    alias: 'b',
    type: 'string',
    describe: 'Blockchain'
  }).option('network', {
    alias: 'n',
    type: 'string',
    describe: 'Network of the blockchain'
  }).option('txhash', {
    alias: 't',
    type: 'string',
    describe: 'Address of the balance'
  }).example('kaizen blockchains tx --blockchain ethereum --network 1 --txhash 0x8457c253451ba31d1292d04083aa47d94b33017bd5ff75794d3381c708c23467').demandOption(['blockchain', 'network', 'txhash'], 'Please enter the information to get the tx result');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var blockchain, network, txhash, txresult, table, toAddress;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            blockchain = argv.blockchain, network = argv.network, txhash = argv.txhash;
            txresult = '';
            toAddress = '';
            _context.t0 = blockchain;
            _context.next = _context.t0 === 'ethereum' ? 7 : _context.t0 === 'wanchain' ? 17 : 27;
            break;

          case 7:
            Spinner.start();
            _context.next = 10;
            return ethereumHandler(network, txhash);

          case 10:
            txresult = _context.sent;
            Spinner.stop();
            Log.SuccessLog("The txhash ".concat(txhash, " information:"));
            table = new Table({
              head: ['Block Number'.green, 'From'.green, 'To'.green, 'Value'.green]
            });
            table.push([txresult.blockNumber, txresult.from, txresult.to, txresult.value]);
            console.log(table.toString());
            return _context.abrupt("break", 28);

          case 17:
            Spinner.start();
            _context.next = 20;
            return wanchainHandler(network, txhash);

          case 20:
            txresult = _context.sent;
            Spinner.stop();
            Log.SuccessLog("The txhash ".concat(txhash, " information:"));
            table = new Table({
              head: ['Block Number'.green, 'From'.green, 'To'.green, 'Value'.green]
            });
            table.push([txresult.blockNumber, txresult.from, txresult.to, txresult.value]);
            console.log(table.toString());
            return _context.abrupt("break", 28);

          case 27:
            Log.NormalLog('blockchain not support yet');

          case 28:
            _context.next = 35;
            break;

          case 30:
            _context.prev = 30;
            _context.t1 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t1);

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 30]]);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'tx';
  var commandDescription = 'Get transaction hash information';
  yargs.command(command, commandDescription, builder, handler);
};