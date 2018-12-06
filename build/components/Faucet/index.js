"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cmd = require('node-cmd');

var fsx = require('fs-extra');

var Spinner = require('../../lib/Spinner');

var Log = require('../../lib/Log');

var axios = require('axios');

function builder(yargs) {
  return yargs.option('name', {
    alias: 'n',
    type: 'string',
    describe: 'Name of the blockchain',
    choices: ['eth', 'etc', 'wan', 'icon', 'qtum', 'neo', 'qkc', 'bch', 'tomo']
  }).option('networkId', {
    alias: 'id',
    type: 'string',
    describe: 'Specify the network is mainnet or testnet',
    choices: ['1', '3']
  }).option('address', {
    alias: 'addr',
    type: 'string',
    describe: 'Your wallet address'
  }).demandOption(['name'], 'Please enter blockchain name').demandOption(['networkId'], 'Please enter network ID').demandOption(['address'], 'Please enter your wallet address').example('kaizen faucet --name ethereum --networkId 3 --address 0x2d2B3CD3E585fF4065B55668dCac22EBd9E3590D');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var name, address;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            Spinner.start();
            name = argv.name, address = argv.address;
            console.log("name:".concat(name));
            Log.NormalLog("Claim tokens, please wait a second");
            _context.next = 7;
            return claimToken(name, address);

          case 7:
            Spinner.stop();
            Log.SuccessLog("\n==== Claim ".concat(name, " Token Successfully ===="));
            _context.next = 18;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog("\n==== Claim Token Failed ====");
            console.error("Error message:");
            console.error(_context.t0);
            console.error("\nPlease contact support@portal.network for help");

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 11]]);
  }));
  return _handler.apply(this, arguments);
}

function resolveBlockchainName(name) {
  var fullBlockChainName = {
    "eth": "Ethereum-Ropsten",
    "etc": "Ethereum-Classic",
    "wan": "Wanchain",
    "icon": "ICON",
    "qtum": "QTUM",
    "neo": "NEO",
    "qkc": "Quarkchain",
    "bch": "Bitcoin-Cash",
    "tomo": "TomoChain"
  };
  return fullBlockChainName[name];
}

function claimTokenHelper(_x2, _x3) {
  return _claimTokenHelper.apply(this, arguments);
}

function _claimTokenHelper() {
  _claimTokenHelper = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(url, body) {
    var header,
        response,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            header = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : null;
            _context2.prev = 1;
            _context2.next = 4;
            return axios.post(url, body, header);

          case 4:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](1);

            if (!_context2.t0.response) {
              _context2.next = 12;
              break;
            }

            throw _context2.t0.response.data;

          case 12:
            throw _context2.t0;

          case 13:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this, [[1, 8]]);
  }));
  return _claimTokenHelper.apply(this, arguments);
}

function claimToken(name, address) {
  var url, body, header;

  if (name === "eth") {
    body = address;
    url = 'https://faucet.metamask.io/';
    header = {
      headers: {
        'Content-Type': 'application/rawdata'
      }
    };
  } else {
    body = {
      "chain": resolveBlockchainName(name),
      "address": address,
      "email": "bill@portal.network"
    };
    url = 'https://faucet-server.herokuapp.com/faucet/claim';
  }

  return claimTokenHelper(url, body, header);
}

module.exports = function (yargs) {
  var command = 'faucet';
  var commandDescription = 'Claim token';
  yargs.command(command, commandDescription, builder, handler);
};