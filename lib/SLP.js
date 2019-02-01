"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
var Utils_1 = require("./Utils");
var SlpTokenType1_1 = require("./SlpTokenType1");
var slp = require("slpjs").slp;
var bitboxproxy = require("slpjs").bitbox;
var bitdb = require("slpjs").bitdb;
var BigNumber = require("bignumber.js");
var SLP = /** @class */ (function (_super) {
    __extends(SLP, _super);
    function SLP(config) {
        var _this = _super.call(this, config) || this;
        var restURL;
        if (config && config.restURL && config.restURL !== "")
            restURL = config.restURL;
        else
            restURL = "https://rest.bitcoin.com/v2/";
        _this.Utils = new Utils_1.default(restURL);
        _this.SlpTokenType1 = new SlpTokenType1_1.default();
        _this.bitbox = bitboxproxy;
        _this.slp = slp;
        _this.BigNumber = BigNumber;
        _this.biddb = bitdb;
        return _this;
    }
    return SLP;
}(BITBOXSDK));
exports.default = SLP;
