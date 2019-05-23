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
var BITBOXHDNode = require("bitbox-sdk").HDNode;
var bitbox_sdk_1 = require("bitbox-sdk");
var bitbox = new bitbox_sdk_1.BITBOX();
var utils = require("slpjs").Utils;
var HDNode = /** @class */ (function (_super) {
    __extends(HDNode, _super);
    function HDNode(restURL) {
        var _this = _super.call(this, restURL) || this;
        _this.restURL = restURL;
        return _this;
    }
    HDNode.prototype.toLegacyAddress = function (hdNode) {
        return bitbox.HDNode.toLegacyAddress(hdNode);
    };
    HDNode.prototype.toCashAddress = function (hdNode, regtest) {
        if (regtest === void 0) { regtest = false; }
        return bitbox.HDNode.toCashAddress(hdNode, regtest);
    };
    HDNode.prototype.toSLPAddress = function (hdNode) {
        var cashAddr = bitbox.HDNode.toCashAddress(hdNode);
        return utils.toSlpAddress(cashAddr);
    };
    return HDNode;
}(BITBOXHDNode));
exports.default = HDNode;
