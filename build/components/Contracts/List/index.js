"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Log = require('../../../lib/Log');

require('colors');

function builder(yargs) {}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            Log.NormalLog('Available contract list:');
            Log.NormalLog('ChainLink'.underline.yellow + ' - Chainlink Oracle Service, link: ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/Chainlink'.underline.yellow);
            Log.NormalLog('ERC20'.underline.yellow + ' - ERC20 Token Standard, link: ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20'.underline.yellow);
            Log.NormalLog('ERC721'.underline.yellow + ' - ERC721 Token Standard, link: ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC721'.underline.yellow);
            Log.NormalLog('NuCypher'.underline.yellow + ' - NuCypher Contracts, link: ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/NuCypher'.underline.yellow);
            Log.NormalLog("\nTo install a plugin run " + "'kaizen contracts deploy <contract-link-here>'".yellow);

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'list';
  var commandDescription = 'Lists all available contracts';
  yargs.command(command, commandDescription, builder, handler);
};