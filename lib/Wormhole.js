"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DataRetrieval = require("./DataRetrieval");

var _DataRetrieval2 = _interopRequireDefault(_DataRetrieval);

var _PayloadCreation = require("./PayloadCreation");

var _PayloadCreation2 = _interopRequireDefault(_PayloadCreation);

var _RawTransactions = require("./RawTransactions");

var _RawTransactions2 = _interopRequireDefault(_RawTransactions);

var _ERC = require("./ERC20");

var _ERC2 = _interopRequireDefault(_ERC);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;

var Wormhole = function (_BITBOXSDK) {
  _inherits(Wormhole, _BITBOXSDK);

  function Wormhole(config) {
    _classCallCheck(this, Wormhole);

    var _this = _possibleConstructorReturn(this, (Wormhole.__proto__ || Object.getPrototypeOf(Wormhole)).call(this, config));

    if (config && config.restURL && config.restURL !== "") _this.restURL = config.restURL;else _this.restURL = "https://rest.bitcoin.com/v1/";

    _this.DataRetrieval = new _DataRetrieval2.default(_this.restURL);
    _this.PayloadCreation = new _PayloadCreation2.default(_this.restURL);
    _this.RawTransactions = new _RawTransactions2.default(_this.restURL, _this.RawTransactions);
    _this.ERC20 = new _ERC2.default(_this.restURL, _this.DataRetrieval, _this.PayloadCreation, _this.RawTransactions);
    return _this;
  }

  return Wormhole;
}(BITBOXSDK);

exports.default = Wormhole;