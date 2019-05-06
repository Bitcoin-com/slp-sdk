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
var BITBOXECPair = require("bitbox-sdk/lib/ECPair").default;
var BITBOXSDK = require("bitbox-sdk");
var BITBOX = new BITBOXSDK();
var utils = require("slpjs").Utils;
var ECPair = /** @class */ (function (_super) {
    __extends(ECPair, _super);
    function ECPair() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ECPair.toSLPAddress = function (ecpair) {
        try {
            var slpAddress = utils.toSlpAddress(BITBOX.ECPair.toCashAddress(ecpair));
            return slpAddress;
        }
        catch (err) {
            return err;
        }
    };
    return ECPair;
}(BITBOXECPair));
exports.default = ECPair;
