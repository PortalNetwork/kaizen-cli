"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var path = require('path');

var cmd = require('node-cmd');

var Log = require('../../lib/Log');

var Spinner = require('../../lib/Spinner');

var ExecuteCommand = require('../../lib/ExecuteCommand');

function builder(yargs) {
  return yargs.example('kaizen build');
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
            _context.prev = 0;
            Spinner.start();

            if (!(fs.existsSync(path.resolve('./', 'node_modules')) === false)) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return ExecuteCommand('npm install');

          case 5:
            _context.next = 7;
            return runProjectBuildScript();

          case 7:
            Spinner.stop();
            Log.SuccessLog("==== Build Project Successfully ====");
            _context.next = 16;
            break;

          case 11:
            _context.prev = 11;
            _context.t0 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t0);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 11]]);
  }));
  return _handler.apply(this, arguments);
}

function runProjectBuildScript() {
  return new Promise(function (resolve, reject) {
    cmd.get("npm run build", function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = function (yargs) {
  var command = 'build';
  var commandDescription = 'To build your kaizen project';
  yargs.command(command, commandDescription, builder, handler);
};