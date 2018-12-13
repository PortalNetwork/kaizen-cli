"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var fsx = require('fs-extra');

var Table = require('cli-table');

var Log = require('../../../../lib/Log');

var Spinner = require('../../../../lib/Spinner');

var _require = require('../../../../lib/apis'),
    apiKaizenCreateSharedInstance = _require.apiKaizenCreateSharedInstance;

require('colors');

function builder(yargs) {
  return yargs.option('protocol', {
    alias: 'p',
    type: 'string',
    describe: 'Protocol of the node',
    require: true,
    choices: ['ipfs-gateway', 'ipfs-api-server', 'ethereum', 'wanchain', 'icon']
  }).option('network', {
    alias: 'n',
    type: 'string',
    describe: 'Network of the node; mainnet: 1, testnet: 3',
    require: true
  }).example('kaizen nodes deploy --protocol ipfs-gateway --network 1').demandOption(['protocol', 'network'], '');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var protocol, network, net, config, instances, table;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            protocol = argv.protocol, network = argv.network;

            if (protocol) {
              _context.next = 5;
              break;
            }

            Log.NormalLog('Missing protocol.');
            return _context.abrupt("return");

          case 5:
            if (network) {
              _context.next = 8;
              break;
            }

            Log.NormalLog('Missing network.');
            return _context.abrupt("return");

          case 8:
            net = '';

            if (network === '1') {
              net = 'mainnet';
            } else if (network === '3') {
              net = 'testnet';
            } else {
              Log.NormalLog('Unsupport network.');
            }

            config = fsx.readJsonSync(path.resolve(__dirname, '../../../../../.kaizenrc'));

            if (config.idToken) {
              _context.next = 14;
              break;
            }

            Log.NormalLog('Please login first, you can use ' + '\'kaizen login\'' + ' to login into KAIZEN Platform');
            return _context.abrupt("return");

          case 14:
            Spinner.start();
            _context.next = 17;
            return apiKaizenCreateSharedInstance(config.idToken, protocol, net);

          case 17:
            instances = _context.sent;
            Spinner.stop();

            if (instances.data.isSuccess) {
              Log.SuccessLog('Create shared node success');
              table = new Table({
                head: ['Node Id'.green, 'Protocol'.green, 'Type'.green, 'Provider'.green, 'Public DNS'.green, 'Network'.green, 'Region'.green]
              });
              table.push([instances.data.instanceId, instances.data.name, 'SHARED', instances.data.provider, instances.data.publicDNS, net, instances.data.region]);
              console.log(table.toString());
            }

            _context.next = 27;
            break;

          case 22:
            _context.prev = 22;
            _context.t0 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('ERROR');

            if (_context.t0.response && _context.t0.response.status === 401) {
              Log.NormalLog('Access token expired, please login again');
            } else if (_context.t0.response && _context.t0.response.status === 400) {
              Log.NormalLog(_context.t0.response.data.message);
            } else {
              console.log(_context.t0);
            }

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
  var command = 'deploy';
  var commandDescription = 'Deploy a node';
  yargs.command(command, commandDescription, builder, handler);
};