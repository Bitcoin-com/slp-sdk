"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _List = require("./List");

var _List2 = _interopRequireDefault(_List);

var _Conversion = require("./Conversion");

var _Conversion2 = _interopRequireDefault(_Conversion);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;

var slp = require("slpjs").slp;
var bitboxproxy = require("slpjs").bitbox;
var bitdb = require("slpjs").bitdb;

var SLP = function (_BITBOXSDK) {
  _inherits(SLP, _BITBOXSDK);

  function SLP(config) {
    _classCallCheck(this, SLP);

    var _this = _possibleConstructorReturn(this, (SLP.__proto__ || Object.getPrototypeOf(SLP)).call(this, config));

    if (config && config.restURL && config.restURL !== "") _this.restURL = config.restURL;else _this.restURL = "https://rest.bitcoin.com/v1/";

    _this.List = new _List2.default(_this.restURL);
    _this.Conversion = new _Conversion2.default();
    _this.bitbox = bitboxproxy;
    _this.slp = slp;
    _this.biddb = bitdb;
    return _this;
  }

  _createClass(SLP, [{
    key: "list",
    value: async function list(id) {
      var path = void 0;
      if (!id) {
        path = this.restURL + "slp/list";
      } else {
        path = this.restURL + "slp/list/" + id;
      }
      try {
        var response = await _axios2.default.get(path);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "balancesForAddress",
    value: async function balancesForAddress(address) {
      try {
        var response = await _axios2.default.get(this.restURL + "slp/balancesForAddress/" + address);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "balance",
    value: async function balance(address, id) {
      try {
        var response = await _axios2.default.get(this.restURL + "slp/balance/" + address + "/" + id);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "convert",
    value: async function convert(address) {
      try {
        var response = await _axios2.default.get(this.restURL + "slp/address/convert/" + address);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }]);

  return SLP;
}(BITBOXSDK);

exports.default = SLP;