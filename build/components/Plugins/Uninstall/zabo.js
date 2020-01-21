"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require("path");

var fsx = require("fs-extra");

var ExecuteCommand = require('../../../lib/ExecuteCommand');

module.exports =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  var configPath, userConfig;
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return ExecuteCommand('npm uninstall zabo-sdk-js');

        case 2:
          // update user's kaizen config
          configPath = path.resolve('./', 'kaizen.json');
          userConfig = fsx.existsSync(configPath) ? fsx.readJsonSync(configPath) : {};

          if (!userConfig.plugins) {
            userConfig.plugins = [];
          }

          if (userConfig.plugins.includes('zabo') === false) {
            userConfig.plugins = userConfig.plugins.filter(function (element) {
              return element != 'zabo';
            });
          }

          fsx.outputJsonSync(path.resolve('./', 'kaizen.json'), userConfig);

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));