"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = require("slpjs").utils;
var BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
var BITBOX = new BITBOXSDK();

var Conversion = function () {
  function Conversion() {
    _classCallCheck(this, Conversion);
  }

  _createClass(Conversion, [{
    key: "toSLPAddress",
    value: function toSLPAddress(address) {
      return utils.toSlpAddress(address);
    }
  }, {
    key: "toCashAddress",
    value: function toCashAddress(address) {
      return utils.toCashAddress(address);
    }
  }, {
    key: "toLegacyAddress",
    value: function toLegacyAddress(address) {
      var cashAddr = utils.toCashAddress(address);
      return BITBOX.Address.toLegacyAddress(cashAddr);
    }
  }]);

  return Conversion;
}();

exports.default = Conversion;