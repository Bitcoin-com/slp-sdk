"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var bitbox_sdk_1 = require("bitbox-sdk");
var Address_1 = require("./Address");
// consts
var addy = new Address_1.default();
function returnNetwork(address) {
    return addy.detectAddressNetwork(address);
}
exports.returnNetwork = returnNetwork;
function returnBITBOXInstance(network) {
    var tmpBITBOX;
    var restURL;
    if (network === "mainnet")
        restURL = "https://rest.bitcoin.com/v2/";
    else
        restURL = "https://trest.bitcoin.com/v2/";
    return new bitbox_sdk_1.BITBOX({ restURL: restURL });
}
exports.returnBITBOXInstance = returnBITBOXInstance;
function validateAddressFormat(config) {
    // validate address formats
    // fundingAddress, tokenReceiverAddress and batonReceiverAddress must be simpleledger format
    // bchChangeReceiverAddress can be either simpleledger or cashAddr format
    // validate fundingAddress format
    // single fundingAddress
    if (config.fundingAddress && !addy.isSLPAddress(config.fundingAddress))
        throw Error("Funding Address must be simpleledger format");
    // bulk fundingAddress
    if (config.fundingAddress && Array.isArray(config.fundingAddress)) {
        config.fundingAddress.forEach(function (address) {
            if (!addy.isSLPAddress(address))
                throw Error("Funding Address must be simpleledger format");
        });
    }
    // validate tokenReceiverAddress format
    // single tokenReceiverAddress
    if (config.tokenReceiverAddress &&
        !addy.isSLPAddress(config.tokenReceiverAddress))
        throw Error("Token Receiver Address must be simpleledger format");
    // bulk tokenReceiverAddress
    if (config.tokenReceiverAddress &&
        Array.isArray(config.tokenReceiverAddress)) {
        config.tokenReceiverAddress.forEach(function (address) {
            if (!addy.isSLPAddress(address))
                throw Error("Token Receiver Address must be simpleledger format");
        });
    }
    // validate bchChangeReceiverAddress format
    if (config.bchChangeReceiverAddress &&
        !addy.isCashAddress(config.bchChangeReceiverAddress))
        throw Error("BCH Change Receiver Address must be cash address format");
    // validate batonReceiverAddress format
    if (config.batonReceiverAddress &&
        !addy.isSLPAddress(config.batonReceiverAddress))
        throw Error("Baton Receiver Address must be simpleledger format");
}
exports.validateAddressFormat = validateAddressFormat;
