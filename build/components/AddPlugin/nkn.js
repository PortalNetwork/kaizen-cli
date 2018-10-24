"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var fsx = require('fs-extra');

var ExecuteCommand = require('../../lib/ExecuteCommand');

module.exports =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var userConfig;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return ExecuteCommand('npm install nkn-client');

        case 2:
          // update user's kaizen config
          userConfig = fsx.readJsonSync(path.resolve('./', 'kaizen.json'));

          if (!userConfig.plugins) {
            userConfig.plugins = [];
          }

          if (userConfig.plugins.includes('nkn') === false) {
            userConfig.plugins.push('nkn');
          }

          fsx.outputJsonSync(path.resolve('./', 'kaizen.json'), userConfig);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));