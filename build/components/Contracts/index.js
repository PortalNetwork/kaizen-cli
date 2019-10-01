"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('colors');

function builder(yargs) {
  require('./Deploy')(yargs);

  require('./List')(yargs);

  return yargs.example('kaizen contracts deploy').example('kaizen contracts list').demandCommand(1, '').epilogue('KAIZEN support smart contracts:'.underline.yellow + 'You can develop, test, deploy smart contract though KAIZEN CLI\n\n' + 'Support contract template:\n\n'.underline.yellow + 'Chainlink'.underline.yellow + ' - Chainlink Oracle Service, ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/Chainlink'.underline.yellow + '\n' + 'ERC20'.underline.yellow + ' - ERC20 Token Standard, ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20'.underline.yellow + '\n' + 'ERC721'.underline.yellow + ' - ERC721 Token Standard, ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC721'.underline.yellow + '\n' + 'NuCypher'.underline.yellow + ' - NuCypher Contracts' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/NuCypher'.underline.yellow + '\n\n' + 'NOTE: ' + 'Please make sure use '.gray + '\'kaizen config set --key <KEY> --value <VALUE>\''.yellow + ' to setup the configuration before you deploy smart contracts.'.gray);
}

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
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'contracts';
  var commandDescription = 'Contract management for KAIZEN';
  yargs.command(command, commandDescription, builder, handler);
};