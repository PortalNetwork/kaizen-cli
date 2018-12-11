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
    var host, port, protocol, targetPath, result, ipfs, filesReadyToIPFS, hashes, hashObj;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            host = argv.host, port = argv.port, protocol = argv.protocol;

            if (!(argv.file === undefined)) {
              _context.next = 7;
              break;
            }

            Log.NormalLog('Please specify a file path or a folder path');
            Log.NormalLog('Use ' + '\'kaizen upload ipfs [file]\''.yellow + ' to upload single file');
            Log.NormalLog('Use ' + '\'kaizen upload ipfs [folder]\''.yellow + ' to upload with folder');
            return _context.abrupt("return");

          case 7:
            targetPath = path.resolve('./', argv.file);
            _context.next = 10;
            return confirmUploadDialog(targetPath);

          case 10:
            result = _context.sent;

            if (!(/^yes|y$/i.test(result.confirm) === false)) {
              _context.next = 14;
              break;
            }

            Log.NormalLog("Cancel Upload");
            return _context.abrupt("return");

          case 14:
            Spinner.start();
            ipfs = ipfsClient(host, port, {
              protocol: protocol
            });
            _context.next = 18;
            return getFilesReadyToIPFS(targetPath);

          case 18:
            filesReadyToIPFS = _context.sent;
            _context.next = 21;
            return ipfs.add(filesReadyToIPFS);

          case 21:
            hashes = _context.sent;
            fs.writeFileSync(path.resolve('./', 'ipfs.json'), JSON.stringify(hashes));
            hashObj = hashes.length === 0 ? hashes[0] : hashes[hashes.length - 1];
            Spinner.stop();
            Log.SuccessLog("Upload files to IPFS Successfully");
            console.log("\nFile/Folder hash: ".concat(hashObj.hash));
            Log.NormalLog('You can access the file through:');
            Log.NormalLog("".concat(protocol, "://").concat(host, "/ipfs/").concat(hashObj.hash).underline.yellow + '\n');
            _context.next = 36;
            break;

          case 31:
            _context.prev = 31;
            _context.t0 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t0);

          case 36:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 31]]);
  }));
  return _handler.apply(this, arguments);
}

function confirmUploadDialog(targetPath) {
  var promptSchema = {
    properties: {
      confirm: {
        message: 'Please ensure you will upload ' + targetPath.yellow + ' to the IPFS (yes/no)',
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
        Log.NormalLog('Start uploading...');
        resolve(result);
      }
    });
  });
}

function recursiveFetchFilePath(_x2) {
  return _recursiveFetchFilePath.apply(this, arguments);
}

function _recursiveFetchFilePath() {
  _recursiveFetchFilePath = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(path) {
    var files,
        readdirSyncs,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            files = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : [];
            readdirSyncs = fs.readdirSync(path);
            _context2.next = 4;
            return readdirSyncs.forEach(function (item) {
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

          case 4:
            return _context2.abrupt("return", files);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _recursiveFetchFilePath.apply(this, arguments);
}

function getIPFSContentObject(filePath, targetPath) {
  console.log('Upload File: ' + filePath);
  return {
    path: "public".concat(filePath.replace(targetPath, '')),
    content: fs.readFileSync(filePath)
  };
}

function getFilesReadyToIPFS(_x3) {
  return _getFilesReadyToIPFS.apply(this, arguments);
}

function _getFilesReadyToIPFS() {
  _getFilesReadyToIPFS = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee3(targetPath) {
    var result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!fs.lstatSync(targetPath).isDirectory()) {
              _context3.next = 7;
              break;
            }

            _context3.next = 3;
            return recursiveFetchFilePath(targetPath);

          case 3:
            result = _context3.sent;
            return _context3.abrupt("return", result.map(function (file) {
              return getIPFSContentObject(file, targetPath);
            }));

          case 7:
            return _context3.abrupt("return", fs.readFileSync(targetPath));

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _getFilesReadyToIPFS.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'ipfs [file]';
  var commandDescription = 'To upload file or folder to IPFS';
  yargs.command(command, commandDescription, builder, handler);
};