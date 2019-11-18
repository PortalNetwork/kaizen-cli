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
            Log.NormalLog('Available instance template:'.underline.yellow);
            Log.NormalLog('nym-loopix-mixnode'.underline.yellow + ' - Nym is a blockchain-based privacy platform.');
            Log.NormalLog('golem'.underline.yellow + ' - Golem is computing power share platform.');
            Log.NormalLog("\nTo start a instance run " + "'kaizen instances run <instance-name-here>'".yellow);
            Log.NormalLog("\nIt will be automatically start instance on AWS\n");

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'template';
  var commandDescription = 'Template lists of all available instance';
  yargs.command(command, commandDescription, builder, handler);
};