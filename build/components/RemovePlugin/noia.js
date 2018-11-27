"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var ExecuteCommand = require('../../lib/ExecuteCommand');

module.exports =
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return ExecuteCommand("npm uninstall @noia-network/sdk@rc");

        case 2:
          _context.next = 4;
          return ExecuteCommand("npm uninstall @noia-network/sdk-react@rc");

        case 4:
          _context.next = 6;
          return ExecuteCommand("npm uninstall @noia-network/webrtc-direct-client");

        case 6:
          _context.next = 8;
          return ExecuteCommand("npm uninstall worker-loader");

        case 8:
          _context.next = 10;
          return ExecuteCommand("npm uninstall rusha");

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, _callee, this);
}));