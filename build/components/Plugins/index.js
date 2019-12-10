"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function builder(yargs) {
  require('./Install')(yargs);

  require('./Uninstall')(yargs);

  require('./List')(yargs);

  return yargs.example('kaizen plugins install').example('kaizen plugins uninstall').example('kaizen plugins list').demandCommand(1, '').epilogue('Available plugins:\n\n'.underline.yellow + 'bluzelle'.underline.yellow + ' - Decentralized database\n' + 'nkn'.underline.yellow + ' - Data transmisstion\n' + 'noia'.underline.yellow + ' - Decentralized CDN\n' + 'icon'.underline.yellow + ' - Blockchain\n' + 'orbit'.underline.yellow + ' - Decentralized database\n' + 'arweave'.underline.yellow + ' - Decentralized file storage\n' + 'band'.underline.yellow + ' - Data Oracle\n' + 'fluence'.underline.yellow + ' - Decentralized database\n' + 'sia'.underline.yellow + ' - Decentralized file storage\n' + 'near'.underline.yellow + ' - Scalable decentralized application\n' + '\nRun ' + '\'kaizen plugins <command>\''.yellow + ' to interact with plugins.\n');
}

function handler(_x) {
  return _handler.apply(this, arguments);
}

function _handler() {
  _handler = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(argv) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _handler.apply(this, arguments);
}

module.exports = function (yargs) {
  var command = 'plugins';
  var commandDescription = 'Plugin management for kaizen';
  yargs.command(command, commandDescription, builder, handler);
};