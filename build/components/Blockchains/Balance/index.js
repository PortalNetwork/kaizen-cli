"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Log = require('../../../lib/Log');

var Spinner = require('../../../lib/Spinner');

var ethereumHandler = require('./ethereum.js');

var wanchainHandler = require('./wanchain.js');

function builder(yargs) {
  return yargs.option('blockchain', {
    alias: 'b',
    type: 'string',
    describe: 'Blockchain'
  }).option('network', {
    alias: 'n',
    type: 'string',
    describe: 'Network of the blockchain'
  }).option('address', {
    alias: 'a',
    type: 'string',
    describe: 'Address of the balance'
  }).example('kaizen blockchains balance --blockchain ethereum --network 1 --address 0x3cddcb8cf10c4facfbf960309806d8a3a3f19a40').demandOption(['blockchain', 'network', 'address'], 'Please enter the information to get the balance');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var blockchain, network, address, balance;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            blockchain = argv.blockchain, network = argv.network, address = argv.address;
            balance = '0';
            _context.t0 = blockchain;
            _context.next = _context.t0 === 'ethereum' ? 6 : _context.t0 === 'wanchain' ? 13 : 20;
            break;

          case 6:
            Spinner.start();
            _context.next = 9;
            return ethereumHandler(network, address);

          case 9:
            balance = _context.sent;
            Spinner.stop();
            Log.NormalLog("The address ".concat(address, " balance is ").concat(balance, " ETH"));
            return _context.abrupt("break", 21);

          case 13:
            Spinner.start();
            _context.next = 16;
            return wanchainHandler(network, address);

          case 16:
            balance = _context.sent;
            Spinner.stop();
            Log.NormalLog("The address ".concat(address, " balance is ").concat(balance, " WAN"));
            return _context.abrupt("break", 21);

          case 20:
            Log.NormalLog('blockchain not support yet');

          case 21:
            _context.next = 28;
            break;

          case 23:
            _context.prev = 23;
            _context.t1 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t1);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 23]]);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'balance';
  var commandDescription = 'Get address balance';
  yargs.command(command, commandDescription, builder, handler);
};