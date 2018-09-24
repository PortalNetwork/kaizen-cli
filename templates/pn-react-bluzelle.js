'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

module.exports = function (ws, uuid, WrappedComponent) {
  var PNBluzelle = require('bluzelle');
  PNBluzelle.connect(ws, uuid);

  return function (_React$Component) {
    _inherits(_class2, _React$Component);

    function _class2() {
      var _ref;

      var _temp, _this, _ret;

      _classCallCheck(this, _class2);

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class2.__proto__ || Object.getPrototypeOf(_class2)).call.apply(_ref, [this].concat(args))), _this), _this.handleCreate = function (key, value) {
        return PNBluzelle.create(key, value);
      }, _this.handleRead = function (key) {
        return PNBluzelle.read(key);
      }, _this.handleUpdate = function (key, value) {
        return PNBluzelle.update(key, value);
      }, _this.handleDelete = function (key) {
        return PNBluzelle.remove(key);
      }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(_class2, [{
      key: 'render',
      value: function render() {
        return React.createElement(WrappedComponent, {
          read: this.handleRead,
          create: this.handleCreate,
          update: this.handleUpdate,
          'delete': this.handleDelete
        });
      }
    }]);

    return _class2;
  }(React.Component);
};