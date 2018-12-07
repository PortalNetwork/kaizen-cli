"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var fsx = require('fs-extra');

var prompt = require('prompt');

var Log = require('../../../lib/Log');

var Spinner = require('../../../lib/Spinner');

var _require = require('../../../lib/apis'),
    apiLogin = _require.apiLogin;

function builder(yargs) {
  return yargs.example('kaizen login');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    var _ref, email, password, response, _response$data, accessToken, refreshToken, idToken, expiresIn, name;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return inputEmailAndPassword();

          case 3:
            _ref = _context.sent;
            email = _ref.email;
            password = _ref.password;
            Spinner.start();
            _context.prev = 7;
            _context.next = 10;
            return apiLogin(email, password);

          case 10:
            response = _context.sent;
            _response$data = response.data, accessToken = _response$data.accessToken, refreshToken = _response$data.refreshToken, idToken = _response$data.idToken, expiresIn = _response$data.expiresIn, name = _response$data.name;
            Spinner.stop();
            fsx.writeJsonSync(path.resolve(__dirname, '../../../../.kaizenrc'), {
              email: email,
              accessToken: accessToken,
              refreshToken: refreshToken,
              idToken: idToken,
              expiresIn: expiresIn,
              name: name,
              loginOn: new Date()
            });
            Log.SuccessLog("Login success! \nWelcome ".concat(name));
            _context.next = 22;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](7);
            Spinner.stop();
            console.error(_context.t0.response.data.message);
            return _context.abrupt("return");

          case 22:
            _context.next = 30;
            break;

          case 24:
            _context.prev = 24;
            _context.t1 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t1);
            return _context.abrupt("return");

          case 30:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 24], [7, 17]]);
  }));
  return _handler.apply(this, arguments);
}

function inputEmailAndPassword() {
  var promptSchema = {
    properties: {
      email: {
        description: 'Enter your email',
        pattern: /^[a-zA-Z0-9_]+@[a-zA-Z0-9_.]+$/,
        message: 'Email format error'
      },
      password: {
        description: 'Enter your password',
        hidden: true,
        replace: '*'
      }
    }
  };
  return new Promise(function (resolve, reject) {
    prompt.message = '';
    prompt.delimiter = ':';
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

module.exports = function (yargs) {
  var command = 'login';
  var commandDescription = 'To log in KAIZEN manager';
  yargs.command(command, commandDescription, builder, handler);
};