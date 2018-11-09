"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
var BITBOX = new BITBOXSDK();
var utils = require("slpjs").utils;
var Conversion = /** @class */ (function () {
    function Conversion() {
    }
    Conversion.prototype.toSLPAddress = function (address) {
        return utils.toSlpAddress(address);
    };
    Conversion.prototype.toCashAddress = function (address) {
        return utils.toCashAddress(address);
    };
    Conversion.prototype.toLegacyAddress = function (address) {
        var cashAddr = utils.toCashAddress(address);
        return BITBOX.Address.toLegacyAddress(cashAddr);
    };
    return Conversion;
}());
exports.default = Conversion;
