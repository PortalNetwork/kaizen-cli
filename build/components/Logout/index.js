"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var fsx = require('fs-extra');

var Log = require('../../lib/Log');

var Spinner = require('../../lib/Spinner');

var axios = require('axios');

var LOGOUT_API = 'https://api.portal.network/user/v1/signOut';

function builder(yargs) {
  return yargs.example('kaizen logout');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var config, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            config = fsx.readJsonSync(path.resolve(__dirname, '../../../.kaizenrc'));

            if (config.idToken) {
              _context.next = 5;
              break;
            }

            Log.ErrorLog('not yet login');
            return _context.abrupt("return");

          case 5:
            Spinner.start();
            _context.next = 8;
            return postLogout(config.idToken);

          case 8:
            response = _context.sent;
            fsx.writeJsonSync(path.resolve(__dirname, '../../../.kaizenrc'), {
              accessToken: '',
              refreshToken: '',
              idToken: '',
              expiresIn: 0,
              name: ''
            });
            Spinner.stop();
            Log.SuccessLog('Log out successfully');
            _context.next = 19;
            break;

          case 14:
            _context.prev = 14;
            _context.t0 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t0);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 14]]);
  }));
  return _handler.apply(this, arguments);
}

function postLogout(idToken) {
  return axios.post(LOGOUT_API, null, {
    headers: {
      Authorization: idToken
    }
  });
}

module.exports = function (yargs) {
  var command = 'logout';
  var commandDescription = 'To log out KAIZEN manager';
  yargs.command(command, commandDescription, builder, handler);
};