"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Log = require('../../../lib/Log');

var Web3 = require('web3');

module.exports =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(network, address) {
    var provider, web3, balance;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            provider = '';

            if (network === '1') {
              provider = 'http://wanchain.portal.network';
            }

            if (!(provider === '')) {
              _context.next = 5;
              break;
            }

            Log.NormalLog('Network not support yet');
            return _context.abrupt("return");

          case 5:
            web3 = new Web3(new Web3.providers.HttpProvider(provider));
            _context.next = 8;
            return web3.eth.getBalance(address);

          case 8:
            balance = _context.sent;
            return _context.abrupt("return", web3.utils.fromWei(balance, 'ether'));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();