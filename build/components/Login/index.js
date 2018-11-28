"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var path = require('path');

var fsx = require('fs-extra');

var prompt = require('prompt');

var Log = require('../../lib/Log');

var Spinner = require('../../lib/Spinner');

var axios = require('axios');

var LOGIN_API = 'https://api.portal.network/user/v1/signIn';

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
            return postLogin(email, password);

          case 10:
            response = _context.sent;
            _response$data = response.data, accessToken = _response$data.accessToken, refreshToken = _response$data.refreshToken, idToken = _response$data.idToken, expiresIn = _response$data.expiresIn, name = _response$data.name;
            Spinner.stop();
            fsx.writeJsonSync(path.resolve(__dirname, '../../../.kaizenrc'), {
              accessToken: accessToken,
              refreshToken: refreshToken,
              idToken: idToken,
              expiresIn: expiresIn,
              name: name,
              loginOn: new Date()
            });
            Log.SuccessLog("Welcome ".concat(name));
            _context.next = 20;
            break;

          case 17:
            _context.prev = 17;
            _context.t0 = _context["catch"](7);
            console.error(_context.t0.response.data.message);

          case 20:
            _context.next = 27;
            break;

          case 22:
            _context.prev = 22;
            _context.t1 = _context["catch"](0);
            Spinner.stop();
            Log.ErrorLog('something went wrong!');
            console.error(_context.t1);

          case 27:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 22], [7, 17]]);
  }));
  return _handler.apply(this, arguments);
}

function inputEmailAndPassword() {
  var promptSchema = {
    properties: {
      email: {
        pattern: /^[a-zA-Z0-9_]+@[a-zA-Z0-9_.]+$/
      },
      password: {
        hidden: true
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

function postLogin(email, password) {
  return axios.post(LOGIN_API, {
    email: email,
    password: password
  });
}

module.exports = function (yargs) {
  var command = 'login';
  var commandDescription = 'To log in KAIZEN manager';
  yargs.command(command, commandDescription, builder, handler);
};