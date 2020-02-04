"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// require deps
// imports
var bitbox_sdk_1 = require("bitbox-sdk");
var Address_1 = require("./Address");
// consts
var BigNumber = require("bignumber.js");
var slpjs = require("slpjs");
var addy = new Address_1.default();
var TokenType1 = /** @class */ (function () {
    function TokenType1(restURL) {
        this.restURL = restURL;
    }
    TokenType1.prototype.create = function (createConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var fundingAddresses, fundingWifs, network, BITBOX, bitboxNetwork, batonReceiverAddress, balances, initialTokenQty, nonSlpUtxos, genesisTxid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // validate address formats
                        this.validateAddressFormat(createConfig);
                        fundingAddresses = [].concat(createConfig.fundingAddress);
                        fundingWifs = [].concat(createConfig.fundingWif);
                        network = this.returnNetwork(fundingAddresses[0]);
                        BITBOX = this.returnBITBOXInstance(network);
                        bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);
                        if (createConfig.batonReceiverAddress !== undefined &&
                            createConfig.batonReceiverAddress !== "" &&
                            createConfig.batonReceiverAddress !== null)
                            batonReceiverAddress = createConfig.batonReceiverAddress;
                        else
                            batonReceiverAddress = null;
                        return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddresses)];
                    case 1:
                        balances = _a.sent();
                        initialTokenQty = createConfig.initialTokenQty;
                        initialTokenQty = new BigNumber(initialTokenQty).times(Math.pow(10, createConfig.decimals));
                        nonSlpUtxos = balances.reduce(function (previousNonSlpUtxos, currentBalance, index) { return __spreadArrays(previousNonSlpUtxos, currentBalance.result.nonSlpUtxos.map(function (utxo) { return (__assign(__assign({}, utxo), { wif: fundingWifs[index] })); })); }, []);
                        return [4 /*yield*/, bitboxNetwork.simpleTokenGenesis(createConfig.name, createConfig.symbol, initialTokenQty, createConfig.documentUri, createConfig.documentHash, createConfig.decimals, createConfig.tokenReceiverAddress, batonReceiverAddress, createConfig.bchChangeReceiverAddress, nonSlpUtxos)];
                    case 2:
                        genesisTxid = _a.sent();
                        return [2 /*return*/, genesisTxid];
                }
            });
        });
    };
    TokenType1.prototype.mint = function (mintConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var fundingAddresses, fundingWifs, network, BITBOX, bitboxNetwork, batonReceiverAddress, balances, balanceWithBaton, tokenInfo, mintQty, nonSlpUtxos, slpBatonUtxos, inputUtxos, mintTxid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // validate address formats
                        this.validateAddressFormat(mintConfig);
                        fundingAddresses = [].concat(mintConfig.fundingAddress);
                        fundingWifs = [].concat(mintConfig.fundingWif);
                        network = this.returnNetwork(fundingAddresses[0]);
                        BITBOX = this.returnBITBOXInstance(network);
                        bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);
                        batonReceiverAddress = addy.toSLPAddress(mintConfig.batonReceiverAddress);
                        return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddresses)];
                    case 1:
                        balances = _a.sent();
                        balanceWithBaton = balances
                            .find(function (balance) { return balance.result.slpBatonUtxos[mintConfig.tokenId]; });
                        if (!balanceWithBaton)
                            throw Error("You don't have the minting baton for this token");
                        return [4 /*yield*/, bitboxNetwork.getTokenInformation(mintConfig.tokenId)];
                    case 2:
                        tokenInfo = _a.sent();
                        mintQty = new BigNumber(mintConfig.additionalTokenQty).times(Math.pow(10, tokenInfo.decimals));
                        nonSlpUtxos = balances.reduce(function (previousNonSlpUtxos, currentBalance, index) { return __spreadArrays(previousNonSlpUtxos, currentBalance.result.nonSlpUtxos.map(function (utxo) { return (__assign(__assign({}, utxo), { wif: fundingWifs[index] })); })); }, []);
                        slpBatonUtxos = balanceWithBaton
                            .result
                            .slpBatonUtxos[mintConfig.tokenId]
                            .map(function (utxo) { return (__assign(__assign({}, utxo), { wif: fundingWifs[balances.indexOf(balanceWithBaton)] })); });
                        inputUtxos = __spreadArrays(nonSlpUtxos, slpBatonUtxos);
                        return [4 /*yield*/, bitboxNetwork.simpleTokenMint(mintConfig.tokenId, mintQty, inputUtxos, mintConfig.tokenReceiverAddress, batonReceiverAddress, mintConfig.bchChangeReceiverAddress)];
                    case 3:
                        mintTxid = _a.sent();
                        return [2 /*return*/, mintTxid];
                }
            });
        });
    };
    TokenType1.prototype.send = function (sendConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var fundingAddresses, fundingWifs, network, BITBOX, bitboxNetwork, tokenId, bchChangeReceiverAddress, tokenInfo, tokenDecimals, amount, balances, nonSlpUtxos, slpTokenUtxos, inputUtxos, sendTxid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // validate address formats
                        this.validateAddressFormat(sendConfig);
                        fundingAddresses = [].concat(sendConfig.fundingAddress);
                        fundingWifs = [].concat(sendConfig.fundingWif);
                        network = this.returnNetwork(fundingAddresses[0]);
                        BITBOX = this.returnBITBOXInstance(network);
                        bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);
                        tokenId = sendConfig.tokenId;
                        bchChangeReceiverAddress = addy.toSLPAddress(sendConfig.bchChangeReceiverAddress);
                        return [4 /*yield*/, bitboxNetwork.getTokenInformation(tokenId)];
                    case 1:
                        tokenInfo = _a.sent();
                        tokenDecimals = tokenInfo.decimals;
                        amount = sendConfig.amount;
                        return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddresses)];
                    case 2:
                        balances = _a.sent();
                        if (!Array.isArray(amount)) {
                            amount = new BigNumber(amount).times(Math.pow(10, tokenDecimals)); // Don't forget to account for token precision
                        }
                        else {
                            amount.forEach(function (amt, index) {
                                amount[index] = new BigNumber(amt).times(Math.pow(10, tokenDecimals)); // Don't forget to account for token precision
                            });
                        }
                        nonSlpUtxos = balances.reduce(function (previousNonSlpUtxos, currentBalance, index) { return __spreadArrays(previousNonSlpUtxos, currentBalance.result.nonSlpUtxos.map(function (utxo) { return (__assign(__assign({}, utxo), { wif: fundingWifs[index] })); })); }, []);
                        slpTokenUtxos = balances.reduce(function (previousSlpTokenUtxos, currentBalance, index) { return __spreadArrays(previousSlpTokenUtxos, (currentBalance.result.slpTokenUtxos[tokenId] || []).map(function (utxo) { return (__assign(__assign({}, utxo), { wif: fundingWifs[index] })); })); }, []);
                        if (slpTokenUtxos.length === 0)
                            throw new Error("Could not find any SLP token UTXOs");
                        inputUtxos = __spreadArrays(nonSlpUtxos, slpTokenUtxos);
                        return [4 /*yield*/, bitboxNetwork.simpleTokenSend(tokenId, amount, inputUtxos, sendConfig.tokenReceiverAddress, bchChangeReceiverAddress)];
                    case 3:
                        sendTxid = _a.sent();
                        return [2 /*return*/, sendTxid];
                }
            });
        });
    };
    TokenType1.prototype.burn = function (burnConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var fundingAddresses, fundingWifs, network, BITBOX, bitboxNetwork, bchChangeReceiverAddress, tokenInfo, tokenDecimals, balances, amount, nonSlpUtxos, slpTokenUtxos, inputUtxos, burnTxid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // validate address formats
                        this.validateAddressFormat(burnConfig);
                        fundingAddresses = [].concat(burnConfig.fundingAddress);
                        fundingWifs = [].concat(burnConfig.fundingWif);
                        network = this.returnNetwork(fundingAddresses[0]);
                        BITBOX = this.returnBITBOXInstance(network);
                        bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);
                        bchChangeReceiverAddress = addy.toSLPAddress(burnConfig.bchChangeReceiverAddress);
                        return [4 /*yield*/, bitboxNetwork.getTokenInformation(burnConfig.tokenId)];
                    case 1:
                        tokenInfo = _a.sent();
                        tokenDecimals = tokenInfo.decimals;
                        return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddresses)];
                    case 2:
                        balances = _a.sent();
                        amount = new BigNumber(burnConfig.amount).times(Math.pow(10, tokenDecimals));
                        nonSlpUtxos = balances.reduce(function (previousNonSlpUtxos, currentBalance, index) { return __spreadArrays(previousNonSlpUtxos, currentBalance.result.nonSlpUtxos.map(function (utxo) { return (__assign(__assign({}, utxo), { wif: fundingWifs[index] })); })); }, []);
                        slpTokenUtxos = balances.reduce(function (previousSlpTokenUtxos, currentBalance, index) { return __spreadArrays(previousSlpTokenUtxos, (currentBalance.result.slpTokenUtxos[burnConfig.tokenId] || []).map(function (utxo) { return (__assign(__assign({}, utxo), { wif: fundingWifs[index] })); })); }, []);
                        inputUtxos = __spreadArrays(nonSlpUtxos, slpTokenUtxos);
                        return [4 /*yield*/, bitboxNetwork.simpleTokenBurn(burnConfig.tokenId, amount, inputUtxos, bchChangeReceiverAddress)];
                    case 3:
                        burnTxid = _a.sent();
                        return [2 /*return*/, burnTxid];
                }
            });
        });
    };
    TokenType1.prototype.returnNetwork = function (address) {
        return addy.detectAddressNetwork(address);
    };
    TokenType1.prototype.returnBITBOXInstance = function (network) {
        var tmpBITBOX;
        var restURL;
        if (network === "mainnet")
            restURL = "https://rest.bitcoin.com/v2/";
        else
            restURL = "https://trest.bitcoin.com/v2/";
        return new bitbox_sdk_1.BITBOX({ restURL: restURL });
    };
    TokenType1.prototype.validateAddressFormat = function (config) {
        // validate address formats
        // fundingAddress, tokenReceiverAddress and batonReceiverAddress must be simpleledger format
        // bchChangeReceiverAddress can be either simpleledger or cashAddr format
        // validate fundingAddress format
        // bulk fundingAddress
        if (config.fundingAddress && Array.isArray(config.fundingAddress)) {
            config.fundingAddress.forEach(function (address) {
                if (!addy.isSLPAddress(address))
                    throw Error("Funding Address must be simpleledger format");
            });
        }
        else if (!config.fundingAddress || !addy.isSLPAddress(config.fundingAddress))
            throw Error("Funding Address must be simpleledger format");
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
    };
    return TokenType1;
}());
exports.default = TokenType1;
