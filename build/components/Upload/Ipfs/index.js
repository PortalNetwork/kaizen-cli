"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ipfsClient = require('ipfs-http-client');

var path = require('path');

var fs = require('fs');

var prompt = require('prompt');

var Log = require('../../../lib/Log');

var Spinner = require('../../../lib/Spinner');

function builder(yargs) {
  return yargs.positional('file', {
    type: 'string',
    describe: 'the file or the folder which you want to upload to IPFS',
    require: true
  }).option('host', {
    type: 'string',
    describe: 'host of IPFS endpoint',
    default: 'ipfs.infura.io',
    require: true
  }).option('port', {
    type: 'string',
    describe: 'port of IPFS endpoint',
    default: '5001',
    require: true
  }).option('protocol', {
    type: 'string',
    describe: 'protocol of IPFS endpoint',
    default: 'https',
    require: true
  }).example('kaizen upload ipfs . => to upload the current folder').example('kaizen upload ipfs ./build => to upload the build folder in the current folder');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var file, host, port, protocol, targetPath, result, ipfs, filesReadyToIPFS, hashes, hashObj;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            file = argv.file, host = argv.host, port = argv.port, protocol = argv.protocol;
            console.log('data', file, host, port, protocol);
            targetPath = path.resolve('./', argv.file);
            _context.next = 6;
            return confirmUploadDialog(targetPath);

          case 6:
            result = _context.sent;

            if (!(/^yes|y$/i.test(result.confirm) === false)) {
              _context.next = 10;
              break;
            }

            Log.SuccessLog("==== Cancel Upload ====");
            return _context.abrupt("return");

          case 10:
            Spinner.start();
            ipfs = ipfsClient(host, port, {
              protocol: protocol
            });
            filesReadyToIPFS = getFilesReadyToIPFS(targetPath);
            _context.next = 15;
            return ipfs.add(filesReadyToIPFS);

          case 15:
            hashes = _context.sent;
            fs.writeFileSync(path.resolve('./', 'ipfs.json'), JSON.stringify(hashes));
            hashObj = hashes.length === 0 ? hashes[0] : hashes[hashes.length - 1];
            Spinner.stop();
            console.log("\nFile/Folder hash: ".concat(hashObj.hash));
            Log.SuccessLog("==== Upload your files to IPFS Successfully ====");
            _context.next = 28;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t0);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 23]]);
  }));
  return _handler.apply(this, arguments);
}

function confirmUploadDialog(targetPath) {
  var promptSchema = {
    properties: {
      confirm: {
        message: "Please ensure you will upload \u300C".concat(targetPath, "\u300D to the IPFS (yes/no)"),
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

function getFilesReadyToIPFS(targetPath) {
  if (fs.lstatSync(targetPath).isDirectory()) {
    return recursiveFetchFilePath(targetPath).map(function (file) {
      getIPFSContentObject(file, targetPath);
    });
  } else {
    return fs.readFileSync(targetPath);
  }
}

module.exports = function (yargs) {
  var command = 'ipfs [file]';
  var commandDescription = 'To upload file or folder to IPFS';
  yargs.command(command, commandDescription, builder, handler);
};