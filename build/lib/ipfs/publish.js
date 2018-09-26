"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fs = require('fs');

var path = require('path');

var Log = require('../Log');

var ipfsAPI = require('ipfs-api');

var JSONFile = require('jsonfile');

var openBrowser = require('opn');

var BuildPath = 'build';
var kaizenfile = "kaizen.json";

function fsExistsSync() {
  try {
    fs.accessSync(BuildPath, fs.constants.R_OK | fs.constants.W_OK);
    return true;
  } catch (err) {
    return false;
  }
}

function loopFilesInFolder(path, files) {
  var readdirSyncs = fs.readdirSync(path);
  readdirSyncs.forEach(function (item) {
    if (item.includes('.DS_Store')) return;

    switch (fs.statSync("".concat(path, "/").concat(item)).isDirectory()) {
      case true:
        files = loopFilesInFolder("".concat(path, "/").concat(item), files);
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

exports.description = 'publish you app to the IPFS';

exports.yargs = function (yargs) {
  if (!fsExistsSync()) {
    Log.ErrorLog("Build This folder does not exist");
  }

  var targetPath = "".concat(path.resolve('./', BuildPath));

  try {
    (function () {
      var _ref = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee(yargs, targetPath) {
        var kaizenConfig, ipfs, files, hashes, hash, iphsUrl;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return JSONFile.readFile(kaizenfile);

              case 2:
                kaizenConfig = _context.sent;
                ipfs = ipfsAPI(kaizenConfig.provider);
                console.log('=== uploading to the IPFS ===');
                files = loopFilesInFolder(targetPath, []).map(function (item) {
                  return getIPFSContentObject(item, targetPath);
                });
                _context.next = 8;
                return ipfs.files.add(files, {
                  recursive: false
                });

              case 8:
                hashes = _context.sent;
                hash = hashes[hashes.length - 1].hash;
                iphsUrl = "https://ipfs.infura.io/ipfs/".concat(hash);
                openBrowser(iphsUrl);
                Log.SuccessLog("ipfs url => ".concat(iphsUrl));
                process.exit();

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      return function (_x, _x2) {
        return _ref.apply(this, arguments);
      };
    })()(yargs, targetPath);
  } catch (err) {
    Log.ErrorLog(err);
  }
};