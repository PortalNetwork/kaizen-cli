"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Log = require('../../lib/Log');

var ExecuteCommand = require('../../lib/ExecuteCommand');

var Spinner = require('../../lib/Spinner');

function builder(yargs) {
  return yargs.example('kaizen deploy contracts');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            Spinner.start();
            _context.next = 4;
            return ExecuteCommand('./node_modules/.bin/truffle deploy --network deployment');

          case 4:
            result = _context.sent;
            console.log(result);
            Spinner.stop();
            _context.next = 14;
            break;

          case 9:
            _context.prev = 9;
            _context.t0 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t0);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 9]]);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'deploy contracts';
  var commandDescription = 'To execute truffle testing scripts';
  yargs.command(command, commandDescription, builder, handler);
};