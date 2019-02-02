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
var BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
var BigNumber = require("bignumber.js");
var slpjs = require("slpjs").slpjs;
var Address_1 = require("./Address");
var addy = new Address_1.default();
var TokenType1 = /** @class */ (function () {
    function TokenType1() {
    }
    TokenType1.prototype.create = function (createConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var network, tmpBITBOX, path, slpValidator, bitboxNetwork, fundingAddress, fundingWif, tokenReceiverAddress, batonReceiverAddress, bchChangeReceiverAddress, balances, decimals, name, ticker, documentUri, documentHash, initialTokenQty, genesisTxid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        network = addy.detectAddressNetwork(createConfig.fundingAddress);
                        if (network === "mainnet") {
                            tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" });
                            path = "https://validate.simpleledger.info";
                        }
                        else {
                            tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" });
                            path = "https://testnet-validate.simpleledger.info";
                        }
                        slpValidator = new slpjs.JsonRpcProxyValidator(tmpBITBOX, path);
                        bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator);
                        fundingAddress = createConfig.fundingAddress;
                        fundingWif = createConfig.fundingWif;
                        tokenReceiverAddress = createConfig.tokenReceiverAddress;
                        batonReceiverAddress = createConfig.batonReceiverAddress;
                        bchChangeReceiverAddress = createConfig.bchChangeReceiverAddress;
                        return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)];
                    case 1:
                        balances = _a.sent();
                        decimals = createConfig.decimals;
                        name = createConfig.name;
                        ticker = createConfig.ticker;
                        documentUri = createConfig.documentUri;
                        documentHash = createConfig.documentHash;
                        initialTokenQty = createConfig.initialTokenQty;
                        initialTokenQty = new BigNumber(initialTokenQty).times(Math.pow(10, decimals));
                        balances.nonSlpUtxos.forEach(function (txo) { return (txo.wif = fundingWif); });
                        return [4 /*yield*/, bitboxNetwork.simpleTokenGenesis(name, ticker, initialTokenQty, documentUri, documentHash, decimals, tokenReceiverAddress, batonReceiverAddress, bchChangeReceiverAddress, balances.nonSlpUtxos)];
                    case 2:
                        genesisTxid = _a.sent();
                        return [2 /*return*/, genesisTxid];
                }
            });
        });
    };
    TokenType1.prototype.mint = function (mintConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var network, tmpBITBOX, path, slpValidator, bitboxNetwork, fundingAddress, fundingWif, tokenReceiverAddress, batonReceiverAddress, bchChangeReceiverAddress, tokenIdHexToMint, additionalTokenQty, balances, tokenInfo, tokenDecimals, mintQty, inputUtxos, mintTxid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        network = addy.detectAddressNetwork(mintConfig.fundingAddress);
                        if (network === "mainnet") {
                            tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" });
                            path = "https://validate.simpleledger.info";
                        }
                        else {
                            tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" });
                            path = "https://testnet-validate.simpleledger.info";
                        }
                        slpValidator = new slpjs.JsonRpcProxyValidator(tmpBITBOX, path);
                        bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator);
                        fundingAddress = mintConfig.fundingAddress;
                        fundingWif = mintConfig.fundingWif;
                        tokenReceiverAddress = mintConfig.tokenReceiverAddress;
                        batonReceiverAddress = mintConfig.batonReceiverAddress;
                        bchChangeReceiverAddress = mintConfig.bchChangeReceiverAddress;
                        tokenIdHexToMint = mintConfig.tokenIdHexToMint;
                        additionalTokenQty = mintConfig.additionalTokenQty;
                        return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)];
                    case 1:
                        balances = _a.sent();
                        if (!balances.slpBatonUtxos[tokenIdHexToMint])
                            throw Error("You don't have the minting baton for this token");
                        return [4 /*yield*/, bitboxNetwork.getTokenInformation(tokenIdHexToMint)];
                    case 2:
                        tokenInfo = _a.sent();
                        tokenDecimals = tokenInfo.decimals;
                        mintQty = new BigNumber(additionalTokenQty).times(Math.pow(10, tokenDecimals));
                        inputUtxos = balances.slpBatonUtxos[tokenIdHexToMint];
                        // 5) Simply sweep our BCH (non-SLP) utxos to fuel the transaction
                        inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);
                        // 6) Set the proper private key for each Utxo
                        inputUtxos.forEach(function (txo) { return (txo.wif = fundingWif); });
                        return [4 /*yield*/, bitboxNetwork.simpleTokenMint(tokenIdHexToMint, mintQty, inputUtxos, tokenReceiverAddress, batonReceiverAddress, bchChangeReceiverAddress)];
                    case 3:
                        mintTxid = _a.sent();
                        return [2 /*return*/, mintTxid];
                }
            });
        });
    };
    TokenType1.prototype.send = function (sendConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var network, tmpBITBOX, path, slpValidator, bitboxNetwork, fundingAddress, fundingWif, tokenReceiverAddress, bchChangeReceiverAddress, tokenId, sendAmount, tokenInfo, tokenDecimals, balances, inputUtxos, sendTxid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        network = addy.detectAddressNetwork(sendConfig.fundingAddress);
                        if (network === "mainnet") {
                            tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" });
                            path = "https://validate.simpleledger.info";
                        }
                        else {
                            tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" });
                            path = "https://testnet-validate.simpleledger.info";
                        }
                        slpValidator = new slpjs.JsonRpcProxyValidator(tmpBITBOX, path);
                        bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator);
                        fundingAddress = sendConfig.fundingAddress;
                        fundingWif = sendConfig.fundingWif;
                        tokenReceiverAddress = sendConfig.tokenReceiverAddress;
                        bchChangeReceiverAddress = sendConfig.bchChangeReceiverAddress;
                        tokenId = sendConfig.tokenId;
                        sendAmount = sendConfig.sendAmount;
                        return [4 /*yield*/, bitboxNetwork.getTokenInformation(tokenId)];
                    case 1:
                        tokenInfo = _a.sent();
                        tokenDecimals = tokenInfo.decimals;
                        console.log("Token precision: " + tokenDecimals.toString());
                        return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)];
                    case 2:
                        balances = _a.sent();
                        console.log("'balances' variable is set.");
                        console.log("Token balance:", balances.slpTokenBalances[tokenId].toNumber() / Math.pow(10, tokenDecimals));
                        // 3) Calculate send amount in "Token Satoshis".  In this example we want to just send 1 token unit to someone...
                        sendAmount = new BigNumber(sendAmount).times(Math.pow(10, tokenDecimals)); // Don't forget to account for token precision
                        inputUtxos = balances.slpTokenUtxos[tokenId];
                        // 5) Simply sweep our BCH utxos to fuel the transaction
                        inputUtxos = inputUtxos.concat(balances.nonSlpUtxos);
                        // 6) Set the proper private key for each Utxo
                        inputUtxos.forEach(function (txo) { return (txo.wif = fundingWif); });
                        return [4 /*yield*/, bitboxNetwork.simpleTokenSend(tokenId, sendAmount, inputUtxos, tokenReceiverAddress, bchChangeReceiverAddress)];
                    case 3:
                        sendTxid = _a.sent();
                        return [2 /*return*/, sendTxid];
                }
            });
        });
    };
    return TokenType1;
}());
exports.default = TokenType1;
