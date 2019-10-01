"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Log = require('../../../lib/Log');

var ExecuteCommand = require('../../../lib/ExecuteCommand');

var Spinner = require('../../../lib/Spinner');

var path = require('path');

var fsx = require('fs-extra');

var URL = require('url');

var download = require('download');

require('colors');

function builder(yargs) {
  return yargs.option('url', {
    alias: 'u',
    type: 'string',
    describe: 'URL of the template contract'
  }).example('kaizen contracts deploy -u https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20').demandOption(['url'], '').epilogue('Please enter the url of the template contract\n\n' + 'Support contract template:\n\n'.underline.yellow + 'Chainlink'.underline.yellow + ' - Chainlink Oracle Service, ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/Chainlink'.underline.yellow + '\n' + 'ERC20'.underline.yellow + ' - ERC20 Token Standard, ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20'.underline.yellow + '\n' + 'ERC721'.underline.yellow + ' - ERC721 Token Standard, ' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC721'.underline.yellow + '\n' + 'NuCypher'.underline.yellow + ' - NuCypher Contracts' + 'https://github.com/PortalNetwork/kaizen-contracts/tree/master/NuCypher'.underline.yellow + '\n');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var repoUrl, kaizenrc, _kaizenrc, privateKey, provider, networkId, _getFilePath, owner, repo, branch, template, zipFilePath, processing, result;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            repoUrl = argv.url;
            kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'));
            _kaizenrc = _objectSpread({}, kaizenrc), privateKey = _kaizenrc.privateKey, provider = _kaizenrc.provider, networkId = _kaizenrc.networkId;

            if (!(!privateKey || !provider || !networkId)) {
              _context.next = 6;
              break;
            }

            throw 'Please make sure ' + '\'privateKey\''.yellow + ', ' + '\'provider\''.yellow + ' and ' + '\'networkId\''.yellow + ' is configured through ' + '\'kaizen config\''.yellow;

          case 6:
            console.log("Contract deploying, this may take a while...".yellow);
            Spinner.start();
            _getFilePath = getFilePath(repoUrl), owner = _getFilePath.owner, repo = _getFilePath.repo, branch = _getFilePath.branch, template = _getFilePath.template;
            zipFilePath = "https://github.com/".concat(owner, "/").concat(repo, "/raw/").concat(branch, "/").concat(template, ".zip");
            _context.next = 12;
            return download(zipFilePath, '.', {
              extract: true
            });

          case 12:
            Spinner.stop();
            Spinner.start();
            console.log("Setup environment variable...".yellow); // Setup environment variable

            process.env.privateKey = privateKey;
            process.env.provider = provider;
            process.env.networkId = networkId; // Install necessary modules of contract deployment

            Spinner.stop();
            Spinner.start();
            console.log("Installing modules...".yellow);
            _context.next = 23;
            return ExecuteCommand("cd ".concat(template, " && npm i"));

          case 23:
            processing = _context.sent;
            Spinner.stop();
            console.log(processing); // Build and deploy contracts

            console.log("Deploying contracts...".yellow);
            _context.next = 29;
            return ExecuteCommand("cd ".concat(template, " && ./node_modules/.bin/truffle deploy --network deployment"));

          case 29:
            result = _context.sent;
            console.log(result);
            fsx.removeSync("./".concat(template));
            Log.SuccessLog("\nDeploy Contract ".concat(template, " Successfully"));
            _context.next = 40;
            break;

          case 35:
            _context.prev = 35;
            _context.t0 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('\nUnable to deploy sontract');
            console.error(_context.t0);

          case 40:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 35]]);
  }));
  return _handler.apply(this, arguments);
}

function getFilePath(repoUrl) {
  var url = URL.parse(repoUrl);
  var path = url.pathname.split('/');
  var owner = path[path.length - 5];
  var repo = path[path.length - 4];
  var branch = path[path.length - 2];
  var template = path[path.length - 1];
  return {
    owner: owner,
    repo: repo,
    branch: branch,
    template: template
  };
}

module.exports = function (yargs) {
  var command = 'deploy';
  var commandDescription = 'Deploy smart contracts';
  yargs.command(command, commandDescription, builder, handler);
};