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
            Log.NormalLog('Available plugin list:');
            Log.NormalLog('bluzelle'.underline.yellow + ' - Bluzelle information');
            Log.NormalLog('nkn'.underline.yellow + ' - NKN information');
            Log.NormalLog('noia'.underline.yellow + ' - NOIA information');
            Log.NormalLog('icon'.underline.yellow + ' - ICON information');
            Log.NormalLog('orbit'.underline.yellow + ' - Orbit information');
            Log.NormalLog('arweave'.underline.yellow + ' - Arweave information');
            Log.NormalLog("\nTo install a plugin run " + "'kaizen plugins install <plugin-name-here>'".yellow);
            Log.NormalLog("\nIt will be automatically downloaded and added to your " + "'package.json'".yellow + " and " + "'kaizen.json'".yellow + " file\n");

          case 9:
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
  var commandDescription = 'Lists all available plugins';
  yargs.command(command, commandDescription, builder, handler);
};