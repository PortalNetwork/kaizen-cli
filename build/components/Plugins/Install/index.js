"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var fs = require('fs');

var Log = require('../../../lib/Log');

var Spinner = require('../../../lib/Spinner');

var bluzelleHandler = require('./bluzelle.js');

var noiaHandler = require('./noia.js');

var nknHandler = require('./nkn.js');

var iconHandler = require('./icon.js');

var orbitHandler = require('./orbit.js');

var arweaveHandler = require('./arweave.js');

var bandHandler = require('./band.js');

var fluenceHandler = require('./fluence.js');

var siaHandler = require('./sia.js');

var nearHandler = require('./near.js');

var tellorHandler = require('./tellor.js');

var skaleHandler = require('./skale.js');

var renHandler = require('./ren.js');

var nervosHandler = require('./nervos.js');

var kavaHandler = require('./kava.js');

var zaboHandler = require('./zabo.js');

function builder(yargs) {
  return yargs.positional('plugin', {
    alias: 'p',
    type: 'string',
    describe: 'plugin name',
    require: true
  }).example('kaizen plugins install bluzelle').example('kaizen plugins install nkn').demandOption(['plugin'], '');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var plugin;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            plugin = argv.plugin;

            if (plugin) {
              _context.next = 5;
              break;
            }

            Log.NormalLog('Missing plugin statement.\nPlease using \'kaizen plugins uninstall [plugin]\'');
            return _context.abrupt("return");

          case 5:
            if (!(fs.existsSync(path.resolve('./', 'package.json')) === false)) {
              _context.next = 8;
              break;
            }

            Log.NormalLog("Missing " + "'package.json'".yellow + ", please make sure you are in the project folder.");
            return _context.abrupt("return");

          case 8:
            _context.t0 = plugin;
            _context.next = _context.t0 === 'bluzelle' ? 11 : _context.t0 === 'nkn' ? 18 : _context.t0 === 'noia' ? 25 : _context.t0 === 'icon' ? 32 : _context.t0 === 'orbit' ? 39 : _context.t0 === 'arweave' ? 46 : _context.t0 === 'band' ? 53 : _context.t0 === 'fluence' ? 60 : _context.t0 === 'sia' ? 67 : _context.t0 === 'near' ? 74 : _context.t0 === 'tellor' ? 81 : _context.t0 === 'skale' ? 88 : _context.t0 === 'ren' ? 95 : _context.t0 === 'nervos' ? 102 : _context.t0 === 'kava' ? 109 : _context.t0 === 'zabo' ? 116 : 123;
            break;

          case 11:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 15;
            return bluzelleHandler();

          case 15:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 18:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 22;
            return nknHandler();

          case 22:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 25:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 29;
            return noiaHandler();

          case 29:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 32:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 36;
            return iconHandler();

          case 36:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 39:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 43;
            return orbitHandler();

          case 43:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 46:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 50;
            return arweaveHandler();

          case 50:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 53:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 57;
            return bandHandler();

          case 57:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 60:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 64;
            return fluenceHandler();

          case 64:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 67:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 71;
            return siaHandler();

          case 71:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 74:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 78;
            return nearHandler();

          case 78:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 81:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 85;
            return tellorHandler();

          case 85:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 88:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 92;
            return skaleHandler();

          case 92:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 95:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 99;
            return renHandler();

          case 99:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 102:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 106;
            return nervosHandler();

          case 106:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 109:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 113;
            return kavaHandler();

          case 113:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 116:
            Log.NormalLog('Installing plugin, please wait a second...');
            Spinner.start();
            _context.next = 120;
            return zaboHandler();

          case 120:
            Spinner.stop();
            Log.SuccessLog("Install plugin ".concat(plugin, " Successfully"));
            return _context.abrupt("break", 124);

          case 123:
            Log.NormalLog('Plugin not support yet');

          case 124:
            _context.next = 131;
            break;

          case 126:
            _context.prev = 126;
            _context.t1 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t1);

          case 131:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 126]]);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'install [plugin]';
  var commandDescription = 'Install and add a plugin to your project';
  yargs.command(command, commandDescription, builder, handler);
};