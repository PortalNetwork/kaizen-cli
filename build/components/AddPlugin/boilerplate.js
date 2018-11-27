"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var cmd = require('node-cmd');

var path = require('path');

var fsx = require('fs-extra');

module.exports =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(name, library) {
    var projectName, sourcePath, targetPath;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            projectName = name || 'new-boilerplate';
            sourcePath = path.resolve(__dirname, '../../../assets/boilerplate');
            targetPath = path.resolve('./', projectName);
            _context.t0 = library;
            _context.next = _context.t0 === 'vue' ? 6 : _context.t0 === 'react' ? 10 : 14;
            break;

          case 6:
            _context.next = 8;
            return cloneProjectFromGithub('https://github.com/PortalNetwork/vue-truffle.git', projectName);

          case 8:
            fsx.removeSync("./".concat(projectName, "/.git"));
            return _context.abrupt("break", 16);

          case 10:
            _context.next = 12;
            return cloneProjectFromGithub('https://github.com/PortalNetwork/react-truffle.git', projectName);

          case 12:
            fsx.removeSync("./".concat(projectName, "/.git"));
            return _context.abrupt("break", 16);

          case 14:
            fsx.copySync(sourcePath, targetPath);
            return _context.abrupt("break", 16);

          case 16:
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

function cloneProjectFromGithub(repoURL, projectName) {
  return new Promise(function (resolve, reject) {
    cmd.get("git clone ".concat(repoURL, " ").concat(projectName), function (error) {
      if (error) {
        reject(error);
      } else {
        resolve(true);
      }
    });
  });
}