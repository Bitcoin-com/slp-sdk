"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
// require deps
var BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
var BigNumber = require("bignumber.js");
var slpjs = require("slpjs");
// import classes
var Address_1 = require("./Address");
var addy = new Address_1.default();
var TokenType1 = /** @class */ (function () {
    function TokenType1(restURL) {
        this.restURL = restURL;
    }
    TokenType1.prototype.create = function (createConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var tmpBITBOX, getRawTransactions, slpValidator, bitboxNetwork, fundingAddress, fundingWif, tokenReceiverAddress, batonReceiverAddress, bchChangeReceiverAddress, balances, decimals, name, symbol, documentUri, documentHash, initialTokenQty, genesisTxid;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tmpBITBOX = this.returnBITBOXInstance(createConfig.fundingAddress);
                        getRawTransactions = function (txids) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, tmpBITBOX.RawTransactions.getRawTransaction(txids)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); };
                        slpValidator = new slpjs.LocalValidator(tmpBITBOX, getRawTransactions);
                        bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator);
                        fundingAddress = addy.toSLPAddress(createConfig.fundingAddress);
                        fundingWif = createConfig.fundingWif;
                        tokenReceiverAddress = addy.toSLPAddress(createConfig.tokenReceiverAddress);
                        if (createConfig.batonReceiverAddress !== undefined &&
                            createConfig.batonReceiverAddress !== "" &&
                            createConfig.batonReceiverAddress !== null) {
                            batonReceiverAddress = addy.toSLPAddress(createConfig.batonReceiverAddress);
                        }
                        else {
                            batonReceiverAddress = null;
                        }
                        bchChangeReceiverAddress = addy.toSLPAddress(createConfig.bchChangeReceiverAddress);
                        return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)];
                    case 1:
                        balances = _a.sent();
                        decimals = createConfig.decimals;
                        name = createConfig.name;
                        symbol = createConfig.symbol;
                        documentUri = createConfig.documentUri;
                        documentHash = createConfig.documentHash;
                        initialTokenQty = createConfig.initialTokenQty;
                        initialTokenQty = new BigNumber(initialTokenQty).times(Math.pow(10, decimals));
                        balances.nonSlpUtxos.forEach(function (txo) { return (txo.wif = fundingWif); });
                        return [4 /*yield*/, bitboxNetwork.simpleTokenGenesis(name, symbol, initialTokenQty, documentUri, documentHash, decimals, tokenReceiverAddress, batonReceiverAddress, bchChangeReceiverAddress, balances.nonSlpUtxos)];
                    case 2:
                        genesisTxid = _a.sent();
                        return [2 /*return*/, genesisTxid[0]];
                }
            });
        });
    };
    TokenType1.prototype.mint = function (mintConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var tmpBITBOX, getRawTransactions, slpValidator, bitboxNetwork, fundingAddress, fundingWif, tokenReceiverAddress, batonReceiverAddress, bchChangeReceiverAddress, tokenId, additionalTokenQty, balances, tokenInfo, tokenDecimals, mintQty, inputUtxos, mintTxid;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tmpBITBOX = this.returnBITBOXInstance(mintConfig.fundingAddress);
                        getRawTransactions = function (txids) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, tmpBITBOX.RawTransactions.getRawTransaction(txids)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); };
                        slpValidator = new slpjs.LocalValidator(tmpBITBOX, getRawTransactions);
                        bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator);
                        fundingAddress = addy.toSLPAddress(mintConfig.fundingAddress);
                        fundingWif = mintConfig.fundingWif;
                        tokenReceiverAddress = addy.toSLPAddress(mintConfig.tokenReceiverAddress);
                        batonReceiverAddress = addy.toSLPAddress(mintConfig.batonReceiverAddress);
                        bchChangeReceiverAddress = addy.toSLPAddress(mintConfig.bchChangeReceiverAddress);
                        tokenId = mintConfig.tokenId;
                        additionalTokenQty = mintConfig.additionalTokenQty;
                        return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)];
                    case 1:
                        balances = _a.sent();
                        if (!balances.slpBatonUtxos[tokenId])
                            throw Error("You don't have the minting baton for this token");
                        return [4 /*yield*/, bitboxNetwork.getTokenInformation(tokenId)];
                    case 2:
                        tokenInfo = _a.sent();
                        tokenDecimals = tokenInfo.decimals;
                        mintQty = new BigNumber(additionalTokenQty).times(Math.pow(10, tokenDecimals));
                        inputUtxos = balances.slpBatonUtxos[tokenId];
                        // 5) Simply sweep our BCH (non-SLP) utxos to fuel the transaction
                        inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);
                        // 6) Set the proper private key for each Utxo
                        inputUtxos.forEach(function (txo) { return (txo.wif = fundingWif); });
                        return [4 /*yield*/, bitboxNetwork.simpleTokenMint(tokenId, mintQty, inputUtxos, tokenReceiverAddress, batonReceiverAddress, bchChangeReceiverAddress)];
                    case 3:
                        mintTxid = _a.sent();
                        return [2 /*return*/, mintTxid[0]];
                }
            });
        });
    };
    TokenType1.prototype.send = function (sendConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var tmpBITBOX, getRawTransactions, slpValidator, bitboxNetwork, fundingAddress, fundingWif, tokenReceiverAddress, bchChangeReceiverAddress, tokenId, amount, tokenInfo, tokenDecimals, balances, inputUtxos, sendTxid;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        tmpBITBOX = this.returnBITBOXInstance(sendConfig.fundingAddress);
                        getRawTransactions = function (txids) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, tmpBITBOX.RawTransactions.getRawTransaction(txids)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); };
                        slpValidator = new slpjs.LocalValidator(tmpBITBOX, getRawTransactions);
                        bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator);
                        fundingAddress = addy.toSLPAddress(sendConfig.fundingAddress);
                        fundingWif = sendConfig.fundingWif;
                        tokenReceiverAddress = addy.toSLPAddress(sendConfig.tokenReceiverAddress);
                        bchChangeReceiverAddress = addy.toSLPAddress(sendConfig.bchChangeReceiverAddress);
                        tokenId = sendConfig.tokenId;
                        amount = sendConfig.amount;
                        return [4 /*yield*/, bitboxNetwork.getTokenInformation(tokenId)];
                    case 1:
                        tokenInfo = _a.sent();
                        tokenDecimals = tokenInfo.decimals;
                        return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)
                            // 3) Calculate send amount in "Token Satoshis".  In this example we want to just send 1 token unit to someone...
                        ];
                    case 2:
                        balances = _a.sent();
                        // 3) Calculate send amount in "Token Satoshis".  In this example we want to just send 1 token unit to someone...
                        amount = new BigNumber(amount).times(Math.pow(10, tokenDecimals)); // Don't forget to account for token precision
                        inputUtxos = balances.slpTokenUtxos[tokenId];
                        // 5) Simply sweep our BCH utxos to fuel the transaction
                        inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);
                        // 6) Set the proper private key for each Utxo
                        inputUtxos.forEach(function (txo) { return (txo.wif = fundingWif); });
                        return [4 /*yield*/, bitboxNetwork.simpleTokenSend(tokenId, amount, inputUtxos, tokenReceiverAddress, bchChangeReceiverAddress)];
                    case 3:
                        sendTxid = _a.sent();
                        return [2 /*return*/, sendTxid[0]];
                }
            });
        });
    };
    TokenType1.prototype.burnAll = function (burnAllConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var tmpBITBOX_1, getRawTransactions, slpValidator, bitboxNetwork, tokenInfo, tokenDecimals, balances, inputUtxos, network, transactionBuilder_1, originalAmount_1, byteCount, sendAmount, keyPair_1, redeemScript_1, tx, hex, txid, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        tmpBITBOX_1 = this.returnBITBOXInstance(burnAllConfig.fundingAddress);
                        getRawTransactions = function (txids) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, tmpBITBOX_1.RawTransactions.getRawTransaction(txids)];
                                    case 1: return [2 /*return*/, _a.sent()];
                                }
                            });
                        }); };
                        slpValidator = new slpjs.LocalValidator(tmpBITBOX_1, getRawTransactions);
                        bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX_1, slpValidator);
                        return [4 /*yield*/, bitboxNetwork.getTokenInformation(burnAllConfig.tokenId)];
                    case 1:
                        tokenInfo = _a.sent();
                        tokenDecimals = tokenInfo.decimals;
                        return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(burnAllConfig.fundingAddress)];
                    case 2:
                        balances = _a.sent();
                        inputUtxos = balances.slpTokenUtxos[burnAllConfig.tokenId];
                        inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);
                        inputUtxos.forEach(function (txo) { return (txo.wif = burnAllConfig.fundingWif); });
                        network = this.returnNetwork(burnAllConfig.fundingAddress);
                        if (network === "mainnet") {
                            transactionBuilder_1 = new tmpBITBOX_1.TransactionBuilder("mainnet");
                        }
                        else {
                            transactionBuilder_1 = new tmpBITBOX_1.TransactionBuilder("testnet");
                        }
                        originalAmount_1 = 0;
                        inputUtxos.forEach(function (utxo) {
                            // index of vout
                            var vout = utxo.vout;
                            // txid of vout
                            var txid = utxo.txid;
                            // add input with txid and index of vout
                            transactionBuilder_1.addInput(txid, vout);
                            originalAmount_1 += utxo.satoshis;
                        });
                        byteCount = tmpBITBOX_1.BitcoinCash.getByteCount({ P2PKH: inputUtxos.length }, { P2PKH: 1 });
                        sendAmount = originalAmount_1 - byteCount;
                        transactionBuilder_1.addOutput(burnAllConfig.fundingAddress, sendAmount);
                        keyPair_1 = tmpBITBOX_1.ECPair.fromWIF(burnAllConfig.fundingWif);
                        inputUtxos.forEach(function (utxo, index) {
                            transactionBuilder_1.sign(index, keyPair_1, redeemScript_1, transactionBuilder_1.hashTypes.SIGHASH_ALL, utxo.satoshis);
                        });
                        tx = transactionBuilder_1.build();
                        hex = tx.toHex();
                        return [4 /*yield*/, tmpBITBOX_1.RawTransactions.sendRawTransaction(hex)];
                    case 3:
                        txid = _a.sent();
                        return [2 /*return*/, txid[0]];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, error_1];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    TokenType1.prototype.returnNetwork = function (address) {
        return addy.detectAddressNetwork(address);
    };
    TokenType1.prototype.returnBITBOXInstance = function (address) {
        var network = this.returnNetwork(address);
        var tmpBITBOX;
        if (network === "mainnet") {
            tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" });
        }
        else {
            tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" });
        }
        return tmpBITBOX;
    };
    return TokenType1;
}());
exports.default = TokenType1;
