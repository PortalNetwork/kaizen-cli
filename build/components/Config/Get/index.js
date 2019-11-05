"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var fsx = require('fs-extra');

var Spinner = require('../../../lib/Spinner');

var Log = require('../../../lib/Log');

require('colors');

function builder(yargs) {
  return yargs.option('key', {
    alias: 'k',
    type: 'string',
    describe: 'Configuration key',
    choices: ['privateKey', 'provider', 'networkId', 'accessKey', 'secretKey', 'region']
  }).example('kaizen config get --key provider'); //.demandOption(['key'], '');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var key, kaizenrc;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            try {
              key = argv.key;
              Spinner.start();
              kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'));
              Spinner.stop();

              if (kaizenrc[key]) {
                Log.NormalLog('Kaizen Configuration:\n'.underline.yellow + key + ': ' + kaizenrc[key].yellow);
              } else {
                //Log.NormalLog(`Can not find ${key}`);
                Log.NormalLog('Kaizen Configuration:'.underline.yellow);
                kaizenrc['privateKey'] ? Log.NormalLog('privateKey' + ': ' + kaizenrc['privateKey'].yellow) : null;
                kaizenrc['provider'] ? Log.NormalLog('provider' + ': ' + kaizenrc['provider'].yellow) : null;
                kaizenrc['networkId'] ? Log.NormalLog('networkId' + ': ' + kaizenrc['networkId'].yellow) : null;
                kaizenrc['accessKey'] ? Log.NormalLog('accessKey' + ': ' + kaizenrc['accessKey'].yellow) : null;
                kaizenrc['secretKey'] ? Log.NormalLog('secretKey' + ': ' + kaizenrc['secretKey'].yellow) : null;
                kaizenrc['region'] ? Log.NormalLog('region' + ': ' + kaizenrc['region'].yellow) : null;
              }
            } catch (error) {
              Spinner.stop();
              Log.ErrorLog('something went wrong!');
              console.error(error);
            }

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'get';
  var commandDescription = 'Get config variable';
  yargs.command(command, commandDescription, builder, handler);
};