"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cmd = require('node-cmd');

var fsx = require('fs-extra');

var Spinner = require('../../lib/Spinner');

var Log = require('../../lib/Log');

function builder(yargs) {
  return yargs.option('name', {
    alias: 'n',
    type: 'string',
    describe: 'your name of project'
  }).option('boilerplate', {
    alias: 'b',
    type: 'string',
    describe: 'your DApp will build on specific boilerplate',
    choices: ['vue', 'react'],
    default: 'react'
  }).demandOption(['name'], 'Please enter your project name');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var projectName, boilerplate;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            Spinner.start();
            projectName = argv.name, boilerplate = argv.boilerplate;
            _context.t0 = boilerplate;
            _context.next = _context.t0 === 'vue' ? 6 : _context.t0 === 'react' ? 9 : 9;
            break;

          case 6:
            _context.next = 8;
            return cloneProjectFromGithub('https://github.com/PortalNetwork/vue-truffle.git', projectName);

          case 8:
            return _context.abrupt("break", 12);

          case 9:
            _context.next = 11;
            return cloneProjectFromGithub('https://github.com/PortalNetwork/react-truffle.git', projectName);

          case 11:
            return _context.abrupt("break", 12);

          case 12:
            fsx.removeSync("./".concat(projectName, "/.git"));
            Spinner.stop();
            Log.SuccessLog("==== Create ".concat(projectName, " Successfully ===="));
            _context.next = 22;
            break;

          case 17:
            _context.prev = 17;
            _context.t1 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t1);

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 17]]);
  }));
  return _handler.apply(this, arguments);
}

function cloneProjectFromGithub(repoURL, projectName) {
  return new Promise(function (resolve, reject) {
    cmd.get("git clone ".concat(repoURL, " ").concat(projectName), function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports = function (yargs) {
  var command = 'new';
  var commandDescription = 'To create a DApp with boilerplate';
  yargs.command(command, commandDescription, builder, handler);
};