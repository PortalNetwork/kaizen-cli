"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var fsx = require('fs-extra');

var ExecuteCommand = require('../../lib/ExecuteCommand');

function installPNBluzelle() {
  var sourcePath = path.resolve(__dirname, '../../../templates', 'pn-bluzelle');
  var targetPath = path.resolve('./', 'node_modules', 'pn-bluzelle');
  return new Promise(function (resolve, reject) {
    fsx.copy(sourcePath, targetPath, function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}

module.exports =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var sourceConfig, userConfig;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return ExecuteCommand('npm install bluzelle');

        case 2:
          _context.next = 4;
          return installPNBluzelle();

        case 4:
          // update user's kaizen config
          sourceConfig = fsx.readJsonSync(path.resolve(__dirname, '../../../config', 'kaizen.json'));
          userConfig = fsx.readJsonSync(path.resolve('./', 'kaizen.json'));
          userConfig.bluzelle = sourceConfig.bluzelle;

          if (!userConfig.plugins) {
            userConfig.plugins = [];
          }

          if (userConfig.plugins.includes('bluzelle') === false) {
            userConfig.plugins.push('bluzelle');
          }

          fsx.outputJsonSync(path.resolve('./', 'kaizen.json'), userConfig);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));