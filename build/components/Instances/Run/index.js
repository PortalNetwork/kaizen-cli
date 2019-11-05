"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Log = require('../../../lib/Log');

var Spinner = require('../../../lib/Spinner');

var nymLoopixMixnodeHandler = require('./nym-loopix-mixnode.js');

function builder(yargs) {
  return yargs.positional('instance', {
    alias: 'i',
    type: 'string',
    describe: 'instance name',
    require: true
  }).example('kaizen instances run nym-loopix-mixnode').demandOption(['instance'], '');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var instance;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            instance = argv.instance;

            if (instance) {
              _context.next = 5;
              break;
            }

            Log.NormalLog('Missing instance name.\nPlease using \'kaizen instances run [instance]\'');
            return _context.abrupt("return");

          case 5:
            _context.t0 = instance;
            _context.next = _context.t0 === 'nym-loopix-mixnode' ? 8 : 15;
            break;

          case 8:
            Log.NormalLog("Starting ".concat(instance, " instance, please wait a second..."));
            Spinner.start();
            _context.next = 12;
            return nymLoopixMixnodeHandler();

          case 12:
            Spinner.stop();
            Log.SuccessLog("Start instance ".concat(instance, " Successfully"));
            return _context.abrupt("break", 16);

          case 15:
            Log.NormalLog('Instance not support yet');

          case 16:
            _context.next = 23;
            break;

          case 18:
            _context.prev = 18;
            _context.t1 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t1);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 18]]);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'run [instance]';
  var commandDescription = 'Run an instance on AWS';
  yargs.command(command, commandDescription, builder, handler);
};