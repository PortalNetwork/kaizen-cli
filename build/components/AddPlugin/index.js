"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var fs = require('fs');

var Log = require('../../lib/Log');

var Spinner = require('../../lib/Spinner');

var bluzelleHandler = require('./bluzelle.js');

var nknHandler = require('./nkn.js');

var boilerplateHandler = require('./boilerplate.js');

function builder(yargs) {
  return yargs.positional('package', {
    alias: 'p',
    type: 'string',
    describe: 'plugin name',
    require: true
  }).option('name', {
    alias: 'n',
    type: 'string',
    describe: 'your name of project'
  }).option('library', {
    type: 'string',
    describe: 'react or vue, or simple without any libraries'
  }).example('kaizen add bluzelle').example('kaizen add nkn');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var packageName, name, library;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            packageName = argv.package, name = argv.name, library = argv.library;

            if (!(fs.existsSync(path.resolve('./', 'package.json')) === false && packageName != 'boilerplate')) {
              _context.next = 5;
              break;
            }

            Log.ErrorLog('should run "npm init" first');
            return _context.abrupt("return");

          case 5:
            Spinner.start();
            _context.t0 = packageName;
            _context.next = _context.t0 === 'bluzelle' ? 9 : _context.t0 === 'nkn' ? 12 : _context.t0 === 'boilerplate' ? 15 : 18;
            break;

          case 9:
            _context.next = 11;
            return bluzelleHandler();

          case 11:
            return _context.abrupt("break", 18);

          case 12:
            _context.next = 14;
            return nknHandler();

          case 14:
            return _context.abrupt("break", 18);

          case 15:
            _context.next = 17;
            return boilerplateHandler(name, library);

          case 17:
            return _context.abrupt("break", 18);

          case 18:
            Spinner.stop();
            Log.SuccessLog("==== Install package ".concat(packageName, " Successfully ===="));
            _context.next = 27;
            break;

          case 22:
            _context.prev = 22;
            _context.t1 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t1);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 22]]);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'add <package>';
  var commandDescription = 'To install kaizen package in your project';
  yargs.command(command, commandDescription, builder, handler);
};