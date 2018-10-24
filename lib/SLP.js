"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _List = require("./List");

var _List2 = _interopRequireDefault(_List);

var _RawTransactions = require("./RawTransactions");

var _RawTransactions2 = _interopRequireDefault(_RawTransactions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;

var SLP = function (_BITBOXSDK) {
  _inherits(SLP, _BITBOXSDK);

  function SLP(config) {
    _classCallCheck(this, SLP);

    var _this = _possibleConstructorReturn(this, (SLP.__proto__ || Object.getPrototypeOf(SLP)).call(this, config));

    if (config && config.restURL && config.restURL !== "") _this.restURL = config.restURL;else _this.restURL = "https://rest.bitcoin.com/v1/";

    _this.List = new _List2.default(_this.restURL);
    _this.RawTransactions = new _RawTransactions2.default(_this.restURL, _this.RawTransactions);
    return _this;
  }

  return SLP;
}(BITBOXSDK);

exports.default = SLP;