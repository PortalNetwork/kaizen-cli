"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Log = require('../../../lib/Log');

var path = require('path');

var fsx = require('fs-extra');

require('colors');

function builder(yargs) {}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var kaizenrc, i, instance;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            Log.NormalLog('AWS Instance list:'.underline.yellow);
            kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'));

            if (kaizenrc['instances']) {
              for (i = 0; i < kaizenrc['instances'].length; i++) {
                instance = kaizenrc['instances'][i];
                Log.NormalLog('Template: '.yellow + instance.template + ', InstanceId: '.yellow + instance.instanceId); // TODO load instance status
              }
            } else {
              Log.NormalLog("There's no instance running on AWS");
            }

          case 3:
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
  var commandDescription = 'List instances of instance name';
  yargs.command(command, commandDescription, builder, handler);
};