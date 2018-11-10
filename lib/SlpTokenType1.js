"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var slptokentype1 = require("slpjs/lib/slptokentype1");
var SlpTokenType1 = /** @class */ (function () {
    function SlpTokenType1() {
    }
    SlpTokenType1.prototype.lokadIdHex = function () {
        return "534c5000";
    };
    SlpTokenType1.prototype.buildGenesisOpReturn = function (ticker, name, documentUrl, documentHash, decimals, batonVout, initialQuantity) {
        return slptokentype1.buildGenesisOpReturn(ticker, name, documentUrl, documentHash, decimals, batonVout, initialQuantity);
    };
    SlpTokenType1.prototype.buildSendOpReturn = function (tokenIdHex, outputQtyArray) {
        return slptokentype1.buildSendOpReturn(tokenIdHex, outputQtyArray);
    };
    SlpTokenType1.prototype.buildRawGenesisTx = function (config, type) {
        return slptokentype1.buildSendOpReturn(config, (type = 0x01));
    };
    SlpTokenType1.prototype.buildRawSendTx = function (config, type) {
        return slptokentype1.buildRawSendTx(config, (type = 0x01));
    };
    SlpTokenType1.prototype.decodeTxOut = function (txOut) {
        return slptokentype1.decodeTxOut(txOut);
    };
    SlpTokenType1.prototype.decodeMetadata = function (txDetails) {
        return slptokentype1.decodeMetadata(txDetails);
    };
    SlpTokenType1.prototype.calculateGenesisCost = function (genesisOpReturnLength, inputUtxoSize, batonAddress, bchChangeAddress, feeRate) {
        if (batonAddress === void 0) { batonAddress = null; }
        if (bchChangeAddress === void 0) { bchChangeAddress = null; }
        if (feeRate === void 0) { feeRate = 1; }
        return slptokentype1.calculateGenesisCost(genesisOpReturnLength, inputUtxoSize, batonAddress, bchChangeAddress, feeRate);
    };
    SlpTokenType1.prototype.calculateSendCost = function (sendOpReturnLength, inputUtxoSize, outputAddressArraySize, bchChangeAddress, feeRate) {
        if (bchChangeAddress === void 0) { bchChangeAddress = null; }
        if (feeRate === void 0) { feeRate = 1; }
        return slptokentype1.calculateSendCost(sendOpReturnLength, inputUtxoSize, outputAddressArraySize, bchChangeAddress, feeRate);
    };
    return SlpTokenType1;
}());
exports.default = SlpTokenType1;
