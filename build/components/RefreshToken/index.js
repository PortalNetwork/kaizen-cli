"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var fsx = require('fs-extra');

var Log = require('../../lib/Log');

var Spinner = require('../../lib/Spinner');

var _require = require('../../lib/apis'),
    apiRefreshToken = _require.apiRefreshToken;

function builder(yargs) {
  return yargs.example('kaizen refresh token');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var kaizenrc, response, _response$data, accessToken, refreshToken, idToken, expiresIn, configuration;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            kaizenrc = fsx.readJsonSync(path.resolve(__dirname, '../../../.kaizenrc'));

            if (!(!kaizenrc.email || !kaizenrc.refreshToken)) {
              _context.next = 4;
              break;
            }

            Log.ErrorLog("You haven't logged in yet");
            return _context.abrupt("return");

          case 4:
            _context.next = 6;
            return apiRefreshToken(kaizenrc.refreshToken, kaizenrc.email);

          case 6:
            response = _context.sent;
            _response$data = response.data, accessToken = _response$data.accessToken, refreshToken = _response$data.refreshToken, idToken = _response$data.idToken, expiresIn = _response$data.expiresIn;
            configuration = _objectSpread({}, kaizenrc, {
              accessToken: accessToken,
              refreshToken: refreshToken,
              idToken: idToken,
              expiresIn: expiresIn,
              loginOn: new Date()
            });
            fsx.writeJsonSync(path.resolve(__dirname, '../../../.kaizenrc'), configuration);
            Log.SuccessLog('=== Refresh Successfully ===');

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'refresh token';
  var commandDescription = 'To refresh token';
  yargs.command(command, commandDescription, builder, handler);
};