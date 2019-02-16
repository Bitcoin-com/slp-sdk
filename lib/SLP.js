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
// require deps
var BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
// import classes
var Address_1 = require("./Address");
var TokenType1_1 = require("./TokenType1");
var Utils_1 = require("./Utils");
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
            restURL = "https://rest.bitcoin.com/v2/";
        _this.Address = new Address_1.default(restURL);
        _this.TokenType1 = new TokenType1_1.default(restURL);
        _this.Utils = new Utils_1.default(restURL);
        return _this;
    }
    return SLP;
}(BITBOXSDK));
exports.default = SLP;
