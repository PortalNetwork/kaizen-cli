"use strict";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var AWS = require('aws-sdk');

var fs = require('fs');

var instance = require('ami.json');
/**
 * DOCS: https://docs.aws.amazon.com/zh_tw/AWSEC2/latest/UserGuide/user-data.html
 */


var AWSService =
/*#__PURE__*/
function () {
  function AWSService(accessKeyId, secretAccessKey, region) {
    _classCallCheck(this, AWSService);

    this.keyPem = 'kaizen-cli';
    this.instanceType = 't2.micro';
    AWS.config.update({
      region: region
    });
    var credentials = new AWS.Credentials(accessKeyId, secretAccessKey, null);
    AWS.config.credentials = credentials;
  }

  _createClass(AWSService, [{
    key: "createKeyPair",
    value: function () {
      var _createKeyPair = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var ec2, params, keyPair;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                ec2 = new AWS.EC2({
                  apiVersion: '2016-11-15'
                });
                params = {
                  KeyName: this.keyPem
                };
                _context.next = 5;
                return ec2.createKeyPair(params).promise();

              case 5:
                keyPair = _context.sent;
                console.log(JSON.stringify(keyPair));
                fs.writeFileSync(keyPair.KeyName + '.pem', keyPair.KeyMaterial, 'utf8');
                _context.next = 13;
                break;

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 10]]);
      }));

      return function createKeyPair() {
        return _createKeyPair.apply(this, arguments);
      };
    }()
  }, {
    key: "isKeyPairsExists",
    value: function () {
      var _isKeyPairsExists = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(keyName) {
        var ec2, keyPairs, exists;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                ec2 = new AWS.EC2({
                  apiVersion: '2016-11-15'
                });
                _context2.next = 4;
                return ec2.describeKeyPairs().promise();

              case 4:
                keyPairs = _context2.sent;
                exists = false;
                keyPairs.KeyPairs.forEach(function (element) {
                  if (element.KeyName === keyName) exists = true;
                });
                return _context2.abrupt("return", exists);

              case 10:
                _context2.prev = 10;
                _context2.t0 = _context2["catch"](0);
                console.log(_context2.t0);

              case 13:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[0, 10]]);
      }));

      return function isKeyPairsExists(_x) {
        return _isKeyPairsExists.apply(this, arguments);
      };
    }()
  }, {
    key: "runInstance",
    value: function () {
      var _runInstance = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee3(node) {
        var instanceParams, ec2, _instance, instanceId, instanceType, tagParams, tag;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                // TODO choose AMI_ID, generate Key
                instanceParams = _instance[node];
                instanceParams.KeyName = this.keyPem;
                instanceParams.instanceType = this.instanceType;
                ec2 = new AWS.EC2({
                  apiVersion: '2016-11-15'
                });
                _context3.next = 7;
                return ec2.runInstances(instanceParams).promise();

              case 7:
                _instance = _context3.sent;
                //console.log('instance', instance);
                instanceId = _instance.Instances[0].InstanceId;
                instanceType = _instance.Instances[0].InstanceType;
                tagParams = {
                  Resources: [instanceId],
                  Tags: [{
                    Key: 'Name',
                    Value: node
                  }]
                };
                _context3.next = 13;
                return ec2.createTags(tagParams).promise();

              case 13:
                tag = _context3.sent;
                return _context3.abrupt("return", {
                  instanceId: instanceId,
                  instanceType: instanceType,
                  name: node
                });

              case 17:
                _context3.prev = 17;
                _context3.t0 = _context3["catch"](0);
                console.log(_context3.t0);

              case 20:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[0, 17]]);
      }));

      return function runInstance(_x2) {
        return _runInstance.apply(this, arguments);
      };
    }()
  }, {
    key: "getInstance",
    value: function () {
      var _getInstance = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee4(instanceId) {
        var ec2, params, _instance2;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                ec2 = new AWS.EC2({
                  apiVersion: '2016-11-15'
                });
                params = {
                  InstanceIds: [instanceId //"i-086408aa27c5e5042"
                  ]
                };
                _context4.next = 5;
                return ec2.describeInstances(params).promise();

              case 5:
                _instance2 = _context4.sent;
                return _context4.abrupt("return", _instance2.Reservations[0].Instances);

              case 9:
                _context4.prev = 9;
                _context4.t0 = _context4["catch"](0);
                console.log(_context4.t0);

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[0, 9]]);
      }));

      return function getInstance(_x3) {
        return _getInstance.apply(this, arguments);
      };
    }()
  }]);

  return AWSService;
}();

module.exports = AWSService;