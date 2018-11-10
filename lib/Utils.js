"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
var BITBOX = new BITBOXSDK();
var utils = require("slpjs").utils;
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.toSLPAddress = function (address) {
        return utils.toSlpAddress(address);
    };
    Utils.prototype.toCashAddress = function (address) {
        return utils.toCashAddress(address);
    };
    Utils.prototype.toLegacyAddress = function (address) {
        var cashAddr = utils.toCashAddress(address);
        return BITBOX.Address.toLegacyAddress(cashAddr);
    };
    Utils.prototype.getPushDataOpcode = function (data) {
        return utils.getPushDataOpcode(data);
    };
    Utils.prototype.int2FixedBuffer = function (amount) {
        return utils.int2FixedBuffer(amount);
    };
    // This is for encoding Script in scriptPubKey OP_RETURN scripts, where BIP62.3 does not apply
    Utils.prototype.encodeScript = function (script) {
        return utils.gencodeScript(script);
    };
    Utils.prototype.txidFromHex = function (hex) {
        return utils.txidFromHex(hex);
    };
    // Method to get Script 32-bit integer (little-endian signed magnitude representation)
    Utils.prototype.readScriptInt32 = function (buffer) {
        return utils.readScriptInt32(buffer);
    };
    // Method to check whether or not a secret value is valid
    Utils.prototype.scriptInt32IsValid = function (buffer) {
        return utils.scriptInt32IsValid(buffer);
    };
    Utils.prototype.generateRandomScriptInt32 = function () {
        return utils.generateRandomScriptInt32();
    };
    return Utils;
}());
exports.default = Utils;
