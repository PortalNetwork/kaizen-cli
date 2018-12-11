"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('colors');

function builder(yargs) {
  require('./Set')(yargs);

  require('./Get')(yargs);

  require('./Unset')(yargs);

  return yargs.example('kaizen config set').example('kaizen config get').example('kaizen config unset').demandCommand(1, '').epilogue('Configuration management:\n\n'.underline.yellow + 'Use ' + '\'kaizen config <command>\''.yellow + ' allow you to ' + '\'get\''.yellow + ', ' + '\'set\''.yellow + ', ' + '\'unset\''.yellow + ' the configuration into KAIZEN environment.');
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
  var command = 'config';
  var commandDescription = 'Config management for KAIZEN';
  yargs.command(command, commandDescription, builder, handler);
};