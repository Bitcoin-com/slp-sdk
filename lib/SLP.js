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
// imports
var bitbox_sdk_1 = require("bitbox-sdk");
var Address_1 = require("./Address");
var ECPair_1 = require("./ECPair");
var HDNode_1 = require("./HDNode");
var SLPDB_1 = require("./SLPDB");
var Socket_1 = require("./Socket");
var TokenType1_1 = require("./TokenType1");
var Util_1 = require("./Util");
// exports
var REST_URL = "https://rest.bitcoin.com/v2/";
var TREST_URL = "https://trest.bitcoin.com/v2/";
var SLPDB_URL = "https://slpdb.bitcoin.com/";
var TSLPDB_URL = "https://tslpdb.bitcoin.com/";
// consts
var slpjs = require("slpjs");
//const slpjs = require("/home/trout/work/bch/slpjs/lib/slp.js")
// SLP SDK is a superset of BITBOX SDK <3
var SLP = /** @class */ (function (_super) {
    __extends(SLP, _super);
    function SLP(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        var restURL;
        if (config && config.restURL && config.restURL !== "")
            restURL = config.restURL;
        else
            restURL = REST_URL;
        if (config && config.slpdbURL && config.slpdbURL !== "")
            _this.slpdbURL = config.slpdbURL;
        else
            _this.slpdbURL = SLPDB_URL;
        _this.Address = new Address_1.default(restURL);
        _this.ECPair = new ECPair_1.default();
        _this.HDNode = new HDNode_1.default(restURL);
        _this.SLPDB = new SLPDB_1.SLPDB(_this.slpdbURL);
        _this.Socket = Socket_1.Socket;
        _this.TokenType1 = new TokenType1_1.default(restURL);
        _this.Util = new Util_1.default(restURL);
        // Maintain backwards compatibility.
        _this.Utils = _this.Util;
        // Expose slpjs
        _this.slpjs = slpjs;
        return _this;
    }
    return SLP;
}(bitbox_sdk_1.BITBOX));
module.exports = SLP;
