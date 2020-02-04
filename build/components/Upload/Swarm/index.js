"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var fs = require('fs');

var Log = require('../../../lib/Log');

var Spinner = require('../../../lib/Spinner');

var axios = require('axios');

function builder(yargs) {
  return yargs.positional('file', {
    type: 'string',
    describe: 'the file which you want to upload to swarm',
    require: true
  }).option('provider', {
    type: 'string',
    describe: 'swarm endpoint',
    default: 'https://swarm-gateways.net/bzz:/',
    require: true
  }).example('kaizen upload swarm [file] => to upload the file').demandOption(['file'], '');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var provider, targetPath, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            provider = argv.provider;
            Log.NormalLog('Start upload to swarm, please wait a second...');
            Spinner.start();
            targetPath = path.resolve('./', argv.file);
            _context.next = 7;
            return axios({
              method: 'POST',
              headers: {
                'content-type': 'text/plain'
              },
              data: fs.readFileSync(targetPath).toString(),
              url: provider || 'https://swarm-gateways.net/bzz:/'
            });

          case 7:
            response = _context.sent;
            Spinner.stop();
            Log.SuccessLog('Upload success, swarm hash: ' + response.data);
            Log.SuccessLog('You can view on: ' + provider + response.data);
            _context.next = 18;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t0);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 13]]);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'swarm [file]';
  var commandDescription = 'Upload file to swarm';
  yargs.command(command, commandDescription, builder, handler);
};