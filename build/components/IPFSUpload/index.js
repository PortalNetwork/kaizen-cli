"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var IPFS_API = require('ipfs-api');

var path = require('path');

var fs = require('fs');

var prompt = require('prompt');

var Log = require('../../lib/Log');

var Spinner = require('../../lib/Spinner');

function builder(yargs) {
  return yargs.option('host', {
    type: 'string',
    describe: 'IPFS daemon API server host',
    default: 'ipfs.infura.io'
  }).option('port', {
    type: 'string',
    describe: 'IPFS daemon API server port',
    default: '5001'
  }).option('protocol', {
    type: 'string',
    describe: 'IPFS daemon API server protocol',
    default: 'https'
  });
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var result, protocol, host, port, ipfs, targetPath, files, hashes;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return confirmUploadDialog();

          case 3:
            result = _context.sent;

            if (!(/^yes|y$/i.test(result.confirm) === false)) {
              _context.next = 7;
              break;
            }

            Log.SuccessLog("==== Cancel Upload ====");
            return _context.abrupt("return");

          case 7:
            Spinner.start();
            protocol = argv.protocol, host = argv.host, port = argv.port;
            ipfs = IPFS_API(host, port, {
              protocol: protocol
            });
            targetPath = path.resolve('./');
            files = recursiveFetchFilePath(targetPath).map(function (file) {
              return getIPFSContentObject(file, targetPath);
            });
            _context.next = 14;
            return ipfs.files.add(files);

          case 14:
            hashes = _context.sent;
            fs.writeFileSync(path.resolve('./', 'ipfs.json'), JSON.stringify(hashes));
            Spinner.stop();
            Log.SuccessLog("==== Upload your files to IPFS Successfully ====");
            _context.next = 25;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t0);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 20]]);
  }));
  return _handler.apply(this, arguments);
}

function confirmUploadDialog() {
  var promptSchema = {
    properties: {
      confirm: {
        message: 'Please ensure you will upload files in current folder to the IPFS (yes/no)',
        required: true
      }
    }
  };
  return new Promise(function (resolve, reject) {
    prompt.start();
    prompt.get(promptSchema, function (error, result) {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function recursiveFetchFilePath(path) {
  var files = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var readdirSyncs = fs.readdirSync(path);
  readdirSyncs.forEach(function (item) {
    if (item.includes('.DS_Store')) return;

    switch (fs.statSync("".concat(path, "/").concat(item)).isDirectory()) {
      case true:
        files = recursiveFetchFilePath("".concat(path, "/").concat(item), files);
        break;

      case false:
        files.push("".concat(path, "/").concat(item));
        break;
    }
  });
  return files;
}

function getIPFSContentObject(filePath, targetPath) {
  return {
    path: "public".concat(filePath.replace(targetPath, '')),
    content: fs.readFileSync(filePath)
  };
}

module.exports = function (yargs) {
  var command = 'ipfs upload';
  var commandDescription = 'To upload files in folder where the terminal currently in to IPFS';
  yargs.command(command, commandDescription, builder, handler);
};