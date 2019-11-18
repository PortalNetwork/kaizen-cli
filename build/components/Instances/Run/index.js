"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Log = require('../../../lib/Log');

var Spinner = require('../../../lib/Spinner');

var nymLoopixMixnodeHandler = require('./nym-loopix-mixnode.js');

var golemHandler = require('./golem.js');

function builder(yargs) {
  return yargs.positional('instance', {
    alias: 'i',
    type: 'string',
    describe: 'instance name',
    require: true
  }).option('type', {
    alias: 't',
    type: 'string',
    describe: 'instance type'
  }).example('kaizen instances run nym-loopix-mixnode').example('kaizen instances run golem --type t2.xlarge').demandOption(['instance'], '');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var instance, type;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            instance = argv.instance, type = argv.type;

            if (instance) {
              _context.next = 5;
              break;
            }

            Log.NormalLog('Missing instance name.\nPlease using \'kaizen instances run [instance]\'');
            return _context.abrupt("return");

          case 5:
            _context.t0 = instance;
            _context.next = _context.t0 === 'nym-loopix-mixnode' ? 8 : _context.t0 === 'golem' ? 15 : 22;
            break;

          case 8:
            Log.NormalLog("Starting ".concat(instance, " instance, please wait a second..."));
            Spinner.start();
            _context.next = 12;
            return nymLoopixMixnodeHandler(instance, type);

          case 12:
            Spinner.stop();
            Log.SuccessLog("Start instance ".concat(instance, " Successfully"));
            return _context.abrupt("break", 23);

          case 15:
            Log.NormalLog("Starting ".concat(instance, " instance, please wait a second..."));
            Spinner.start();
            _context.next = 19;
            return golemHandler(instance, type);

          case 19:
            Spinner.stop();
            Log.SuccessLog("Start instance ".concat(instance, " Successfully"));
            return _context.abrupt("break", 23);

          case 22:
            Log.NormalLog('Instance not support yet');

          case 23:
            _context.next = 30;
            break;

          case 25:
            _context.prev = 25;
            _context.t1 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t1);

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 25]]);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'run [instance]';
  var commandDescription = 'Run an instance on AWS';
  yargs.command(command, commandDescription, builder, handler);
};