"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var fsx = require('fs-extra');

var Log = require('../../../lib/Log');

var Spinner = require('../../../lib/Spinner');

var bluzelleHandler = require('./bluzelle.js');

var nknHandler = require('./nkn.js');

var noiaHandler = require('./noia.js');

function builder(yargs) {
  return yargs.positional('plugin', {
    alias: 'p',
    type: 'string',
    describe: 'plugin name',
    require: true
  }).example('kaizen plugins uninstall bluzelle').example('kaizen plugins uninstall nkn');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var plugin, kaizenJson;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            plugin = argv.plugin;
            _context.next = 4;
            return readKaizenJson();

          case 4:
            kaizenJson = _context.sent;

            if (plugin) {
              _context.next = 8;
              break;
            }

            Log.NormalLog('Missing plugin statement.\nPlease using \'kaizen plugins uninstall [plugin]\'');
            return _context.abrupt("return");

          case 8:
            _context.t0 = plugin;
            _context.next = _context.t0 === 'bluzelle' ? 11 : _context.t0 === 'nkn' ? 18 : _context.t0 === 'noia' ? 25 : 32;
            break;

          case 11:
            Spinner.start();
            _context.next = 14;
            return bluzelleHandler();

          case 14:
            updateKaizenJson(kaizenJson, 'bluzelle');
            Spinner.stop();
            Log.SuccessLog("==== Remove package ".concat(plugin, " Successfully ===="));
            return _context.abrupt("break", 33);

          case 18:
            Spinner.start();
            _context.next = 21;
            return nknHandler();

          case 21:
            updateKaizenJson(kaizenJson, 'nkn');
            Spinner.stop();
            Log.SuccessLog("==== Remove package ".concat(plugin, " Successfully ===="));
            return _context.abrupt("break", 33);

          case 25:
            Spinner.start();
            _context.next = 28;
            return noiaHandler();

          case 28:
            updateKaizenJson(kaizenJson, 'noia');
            Spinner.stop();
            Log.SuccessLog("==== Remove package ".concat(plugin, " Successfully ===="));
            return _context.abrupt("break", 33);

          case 32:
            Log.NormalLog('Plugin not support yet');

          case 33:
            _context.next = 40;
            break;

          case 35:
            _context.prev = 35;
            _context.t1 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t1);

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 35]]);
  }));
  return _handler.apply(this, arguments);
}

function readKaizenJson() {
  return new Promise(function (resolve, reject) {
    fsx.readJson(path.resolve('./', 'kaizen.json'), function (error, data) {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
}

function updateKaizenJson(kaizenConfig, plugin) {
  var newKaizenConfig = _objectSpread({}, kaizenConfig, {
    plugins: kaizenConfig.plugins.filter(function (x) {
      x !== plugin;
    })
  });

  fsx.writeJson(path.resolve('./', 'kaizen.json'), newKaizenConfig);
}

module.exports = function (yargs) {
  var command = 'uninstall [plugin]';
  var commandDescription = 'Uninstall and remove a plugin to your project';
  yargs.command(command, commandDescription, builder, handler);
};