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
Object.defineProperty(exports, "__esModule", { value: true });
// imports
var axios_1 = require("axios");
var bitbox_sdk_1 = require("bitbox-sdk");
var bitbox = new bitbox_sdk_1.BITBOX();
var BITBOXUtil = require("bitbox-sdk").Util;
// consts
var util = require("util");
util.inspect.defaultOptions = { depth: 1 };
var BigNumber = require("bignumber.js");
var Util = /** @class */ (function (_super) {
    __extends(Util, _super);
    function Util(restURL) {
        var _this = _super.call(this, restURL) || this;
        _this.restURL = restURL;
        return _this;
    }
    Util.prototype.list = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var path, method, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id) {
                            method = "get";
                            path = this.restURL + "slp/list";
                        }
                        else if (typeof id === "string") {
                            method = "get";
                            path = this.restURL + "slp/list/" + id;
                        }
                        else if (typeof id === "object") {
                            method = "post";
                            path = this.restURL + "slp/list";
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        response = void 0;
                        if (!(method === "get")) return [3 /*break*/, 3];
                        return [4 /*yield*/, axios_1.default.get(path)];
                    case 2:
                        response = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, axios_1.default.post(path, {
                            tokenIds: id
                        })];
                    case 4:
                        response = _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/, response.data];
                    case 6:
                        error_1 = _a.sent();
                        if (error_1.response && error_1.response.data)
                            throw error_1.response.data;
                        throw error_1;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // Retrieve token balances for a given address or array of addresses.
    Util.prototype.balancesForAddress = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var path, response, path, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!(typeof address === "string")) return [3 /*break*/, 2];
                        path = this.restURL + "slp/balancesForAddress/" + address;
                        return [4 /*yield*/, axios_1.default.get(path)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data
                            // Array of addresses.
                        ];
                    case 2:
                        if (!Array.isArray(address)) return [3 /*break*/, 4];
                        path = this.restURL + "slp/balancesForAddress";
                        return [4 /*yield*/, axios_1.default.post(path, {
                                addresses: address
                            })];
                    case 3:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 4: throw new Error("Input address must be a string or array of strings.");
                    case 5:
                        error_2 = _a.sent();
                        if (error_2.response && error_2.response.data)
                            throw error_2.response.data;
                        throw error_2;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    // Retrieve token balances for a given tokenId.
    Util.prototype.balancesForToken = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var path, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.restURL + "slp/balancesForToken/" + tokenId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(path)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_3 = _a.sent();
                        if (error_3.response && error_3.response.data)
                            throw error_3.response.data;
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Retrieve a balance for a specific address and token ID
    Util.prototype.balance = function (address, tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var path, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.restURL + "slp/balance/" + address + "/" + tokenId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(path)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_4 = _a.sent();
                        if (error_4.response && error_4.response.data)
                            throw error_4.response.data;
                        throw error_4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Util.prototype.validateTxid = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var path, txids, response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.restURL + "slp/validateTxid";
                        if (typeof txid === "string")
                            txids = [txid];
                        else
                            txids = txid;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.post(path, {
                                txids: txids
                            })];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_5 = _a.sent();
                        if (error_5.response && error_5.response.data)
                            throw error_5.response.data;
                        throw error_5;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Util.prototype.tokenStats = function (tokenId) {
        return __awaiter(this, void 0, void 0, function () {
            var path, response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.restURL + "slp/tokenStats/" + tokenId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(path)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_6 = _a.sent();
                        if (error_6.response && error_6.response.data)
                            throw error_6.response.data;
                        throw error_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Retrieve token transactions for a given tokenId and address.
    Util.prototype.transactions = function (tokenId, address) {
        return __awaiter(this, void 0, void 0, function () {
            var path, response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.restURL + "slp/transactions/" + tokenId + "/" + address;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(path)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_7 = _a.sent();
                        if (error_7.response && error_7.response.data)
                            throw error_7.response.data;
                        throw error_7;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Util.prototype.burnTotal = function (transactionId) {
        return __awaiter(this, void 0, void 0, function () {
            var path, response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.restURL + "slp/burnTotal/" + transactionId;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(path)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_8 = _a.sent();
                        if (error_8.response && error_8.response.data)
                            throw error_8.response.data;
                        throw error_8;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    // Retrieves transactions data from a txid and decodes the SLP OP_RETURN data.
    // Returns an object with properties corresponding to the SLP spec:
    // https://github.com/simpleledger/slp-specifications/blob/master/slp-token-type-1.md
    Util.prototype.decodeOpReturn = function (txid) {
        return __awaiter(this, void 0, void 0, function () {
            var path, lokadIdHex, outObj, response, txDetails, script, type, i, decimals, qty, mintBatonVout, spendData, i, thisScript, spendObj, thisVout, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        if (!txid || txid === "" || typeof txid !== "string")
                            throw new Error("txid string must be included.");
                        path = this.restURL + "rawtransactions/getRawTransaction/" + txid + "?verbose=true";
                        lokadIdHex = "534c5000";
                        outObj = {};
                        return [4 /*yield*/, axios_1.default.get(path)];
                    case 1:
                        response = _a.sent();
                        txDetails = response.data;
                        script = bitbox.Script.toASM(Buffer.from(txDetails.vout[0].scriptPubKey.hex, "hex")).split(" ");
                        if (script[0] !== "OP_RETURN")
                            throw new Error("Not an OP_RETURN");
                        if (script[1] !== lokadIdHex)
                            throw new Error("Not a SLP OP_RETURN");
                        // Validate token type.
                        if (script[2] !== "OP_1" && script[2] !== "0001") {
                            // NOTE: bitcoincashlib-js converts hex 01 to OP_1 due to BIP62.3 enforcement
                            throw new Error("Unknown token type");
                        }
                        outObj.tokenType = 1;
                        type = Buffer.from(script[3], "hex")
                            .toString("ascii")
                            .toLowerCase();
                        script[3] = type;
                        //console.log(`type: ${type}`)
                        // Decode a GENSIS SLP transaction.
                        if (type === "genesis") {
                            //console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)
                            //console.log(`script: ${JSON.stringify(script, null, 2)}`)
                            outObj.transactionType = "genesis";
                            // Convert the next four entries into ascii.
                            for (i = 4; i < 8; i++)
                                script[i] = Buffer.from(script[i], "hex").toString("ascii");
                            //.toLowerCase()
                            outObj.ticker = script[4];
                            outObj.name = script[5];
                            outObj.documentUrl = script[6];
                            outObj.documentHash = script[7];
                            // decimal precision of the token.
                            if (typeof script[8] === "string" && script[8].startsWith("OP_"))
                                script[8] = parseInt(script[8].slice(3)).toString(16);
                            decimals = Number(script[8]);
                            outObj.decimals = decimals;
                            // Mint Baton vout.
                            if (typeof script[9] === "string" && script[9].startsWith("OP_"))
                                script[9] = parseInt(script[9].slice(3)).toString(16);
                            outObj.mintBatonVout = Number(script[9]);
                            qty = new BigNumber(script[10], 16);
                            qty = qty / Math.pow(10, decimals);
                            script[10] = qty;
                            outObj.initialQty = qty;
                            // Address initial tokens were sent to.
                            outObj.tokensSentTo = txDetails.vout[1].scriptPubKey.addresses[0];
                            // Mint baton address holder.
                            if (!outObj.mintBatonVout) {
                                outObj.batonHolder = "NEVER_CREATED";
                            }
                            else {
                                outObj.batonHolder =
                                    txDetails.vout[outObj.mintBatonVout].scriptPubKey.addresses[0];
                            }
                            // Mint type transaction
                        }
                        else if (type === "mint") {
                            //console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)
                            outObj.transactionType = "mint";
                            outObj.tokenId = script[4];
                            mintBatonVout = 0;
                            // Dev note: Haven't seen this if-statement in the wild. Copied from
                            // Badger Wallet code.
                            if (typeof script[5] === "string" && script[5].startsWith("OP_"))
                                mintBatonVout = parseInt(script[5].slice(3));
                            // This is the common use case with slp-sdk examples.
                            else
                                mintBatonVout = parseInt(script[5]);
                            outObj.mintBatonVout = mintBatonVout;
                            // Check if baton was passed or destroyed.
                            // Dev Note: There should be some more extensive checking here. The most
                            // common way of 'burning' the minting baton is to set script[5] to a
                            // value of 0, but it could also point to a non-existant vout.
                            // TODO: Add checking if script[5] refers to a non-existant vout.
                            outObj.batonStillExists = false; // false by default.
                            if (mintBatonVout > 1)
                                outObj.batonStillExists = true;
                            // Parse the quantity generated in this minting operation.
                            // Returns a string. But without the decimals information included,
                            // I'm not sure how to properly represent the quantity.
                            if (typeof script[6] === "string" && script[6].startsWith("OP_"))
                                script[6] = parseInt(script[6].slice(3)).toString(16);
                            outObj.quantity = new BigNumber(script[6], 16);
                            // Report the reciever of the minted tokens.
                            outObj.tokensSentTo = txDetails.vout[1].scriptPubKey.addresses[0];
                            // Report the address that controls the mint baton.
                            if (outObj.batonStillExists) {
                                outObj.batonHolder =
                                    txDetails.vout[mintBatonVout].scriptPubKey.addresses[0];
                            }
                            // Send tokens.
                        }
                        else if (type === "send") {
                            //console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)
                            //console.log(`script: ${JSON.stringify(script,null,2)}`)
                            if (script.length <= 4)
                                throw new Error("Not a SLP txout");
                            outObj.transactionType = "send";
                            // Retrieve the token ID.
                            outObj.tokenId = script[4];
                            spendData = [];
                            for (i = 5; i < script.length; i++) {
                                thisScript = script[i];
                                spendObj = {};
                                if (typeof thisScript === "string" && thisScript.startsWith("OP_"))
                                    thisScript = parseInt(thisScript.slice(3)).toString(16);
                                // Compute the quantity of tokens.
                                spendObj.quantity = new BigNumber(thisScript, 16);
                                thisVout = i - 4;
                                spendObj.sentTo = txDetails.vout[thisVout].scriptPubKey.addresses[0];
                                spendObj.vout = thisVout;
                                spendData.push(spendObj);
                            }
                            outObj.spendData = spendData;
                        }
                        return [2 /*return*/, outObj];
                    case 2:
                        error_9 = _a.sent();
                        if (error_9.response && error_9.response.data)
                            throw error_9.response.data;
                        throw error_9;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    // Expects an array of UTXO objects as input. Returns an array of Boolean
    // values indicating if a UTXO is associated with SLP tokens (true) or not
    // (false).
    // Note: There is no way to validate SLP UTXOs without inspecting the OP_RETURN.
    // If a UTXO returns false when its txid is passed to validateTxid(), then the
    // UTXO is not associated with SLP. This is a fast and quick check.
    // If a UTXO returns true though, the OP_RETURN has to be inspected to determine
    // for sure that it *is* associated with an SLP transaction not just change.
    Util.prototype.isTokenUtxo = function (utxos) {
        return __awaiter(this, void 0, void 0, function () {
            var i, thisUtxo, txids, validations, _loop_1, this_1, i, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        // Throw error if input is not an array.
                        if (!Array.isArray(utxos))
                            throw new Error("Input must be an array.");
                        // Loop through each element in the array and spot check the required
                        // properties.
                        for (i = 0; i < utxos.length; i++) {
                            thisUtxo = utxos[i];
                            // Throw error if utxo does not have a satoshis property.
                            if (!thisUtxo.satoshis)
                                throw new Error("utxo " + i + " does not have a satoshis property.");
                            // Throw error if utxo does not have a txid property.
                            if (!thisUtxo.txid)
                                throw new Error("utxo " + i + " does not have a txid property.");
                        }
                        txids = utxos.map(function (x) { return x.txid; });
                        return [4 /*yield*/, this.validateTxid(txids)
                            //console.log(`validations: ${JSON.stringify(validations,null,2)}`)
                            // Extract the boolean result
                        ];
                    case 1:
                        validations = _a.sent();
                        //console.log(`validations: ${JSON.stringify(validations,null,2)}`)
                        // Extract the boolean result
                        validations = validations.map(function (x) {
                            if (x !== null)
                                return x.valid;
                            return false;
                        });
                        _loop_1 = function (i) {
                            var thisUtxo, thisValidation, slpData, voutMatch;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        thisUtxo = utxos[i];
                                        thisValidation = validations[i];
                                        if (!thisValidation) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this_1.decodeOpReturn(thisUtxo.txid)
                                            //console.log(`slpData: ${JSON.stringify(slpData,null,2)}`)
                                            // Handle Genesis and Mint SLP transactions.
                                        ];
                                    case 1:
                                        slpData = _a.sent();
                                        //console.log(`slpData: ${JSON.stringify(slpData,null,2)}`)
                                        // Handle Genesis and Mint SLP transactions.
                                        if (slpData.transactionType === "genesis" ||
                                            slpData.transactionType === "mint") {
                                            if (thisUtxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
                                                thisUtxo.vout !== 1 // UTXO is not the reciever of the genesis or mint tokens.
                                            )
                                                // Can safely be marked as false.
                                                validations[i] = false;
                                        }
                                        else if (slpData.transactionType === "send") {
                                            voutMatch = slpData.spendData.filter(function (x) { return thisUtxo.vout === x.vout; });
                                            //console.log(`voutMatch: ${JSON.stringify(voutMatch, null, 2)}`)
                                            // If there are no vout matches, the UTXO can safely be marked as false.
                                            if (voutMatch.length === 0)
                                                validations[i] = false;
                                        }
                                        _a.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < utxos.length)) return [3 /*break*/, 5];
                        return [5 /*yield**/, _loop_1(i)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, validations];
                    case 6:
                        error_10 = _a.sent();
                        if (error_10.response && error_10.response.data)
                            throw error_10.response.data;
                        throw error_10;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    // Hydrate a UTXO with SLP token metadata.
    //
    // Expects an array of UTXO objects as input. Returns an array of equal size.
    // If the UTXO does not belong to a SLP transaction, it will return false.
    // If the UTXO is part of an SLP transaction, it will return the UTXO object
    // with additional SLP information attached.
    Util.prototype.tokenUtxoDetails = function (utxos) {
        return __awaiter(this, void 0, void 0, function () {
            var i, thisUtxo, outAry, _loop_2, this_2, i, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        // Throw error if input is not an array.
                        if (!Array.isArray(utxos))
                            throw new Error("Input must be an array.");
                        // Loop through each element in the array and validate the input before
                        // further processing.
                        for (i = 0; i < utxos.length; i++) {
                            thisUtxo = utxos[i];
                            // Throw error if utxo does not have a satoshis property.
                            if (!thisUtxo.satoshis)
                                throw new Error("utxo " + i + " does not have a satoshis property.");
                            // Throw error if utxo does not have a txid property.
                            if (!thisUtxo.txid)
                                throw new Error("utxo " + i + " does not have a txid property.");
                        }
                        outAry = [];
                        _loop_2 = function (i) {
                            var utxo, slpData, err_1, genesisData, voutMatch, genesisData, isValid;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        utxo = utxos[i];
                                        slpData = false;
                                        _a.label = 1;
                                    case 1:
                                        _a.trys.push([1, 3, , 4]);
                                        return [4 /*yield*/, this_2.decodeOpReturn(utxo.txid)
                                            // console.log(`slpData: ${JSON.stringify(slpData, null, 2)}`)
                                        ];
                                    case 2:
                                        slpData = _a.sent();
                                        return [3 /*break*/, 4];
                                    case 3:
                                        err_1 = _a.sent();
                                        // console.log(`decodeOpReturn err: `, err)
                                        if (err_1.message === "Not an OP_RETURN" ||
                                            err_1.message === "Not a SLP OP_RETURN") {
                                            // An error will be thrown if the txid is not SLP.
                                            // Mark as false and continue the loop.
                                            outAry.push(false);
                                            return [2 /*return*/, "continue"];
                                        }
                                        else {
                                            throw err_1;
                                        }
                                        return [3 /*break*/, 4];
                                    case 4:
                                        // If there is an OP_RETURN, attempt to decode it.
                                        // Handle Genesis SLP transactions.
                                        if (slpData.transactionType === "genesis") {
                                            if (utxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
                                                utxo.vout !== 1 // UTXO is not the reciever of the genesis or mint tokens.
                                            ) {
                                                // Can safely be marked as false.
                                                outAry[i] = false;
                                            }
                                            // If this is a valid SLP UTXO, then return the decoded OP_RETURN data.
                                            else {
                                                utxo.tokenType = "minting-baton";
                                                utxo.tokenId = utxo.txid;
                                                utxo.tokenTicker = slpData.ticker;
                                                utxo.tokenName = slpData.name;
                                                utxo.tokenDocumentUrl = slpData.documentUrl;
                                                utxo.tokenDocumentHash = slpData.documentHash;
                                                utxo.decimals = slpData.decimals;
                                                // something
                                                outAry[i] = utxo;
                                            }
                                        }
                                        if (!(slpData.transactionType === "mint")) return [3 /*break*/, 7];
                                        if (!(utxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
                                            utxo.vout !== 1) // UTXO is not the reciever of the genesis or mint tokens.
                                        ) return [3 /*break*/, 5]; // UTXO is not the reciever of the genesis or mint tokens.
                                        // Can safely be marked as false.
                                        outAry[i] = false;
                                        return [3 /*break*/, 7];
                                    case 5: return [4 /*yield*/, this_2.decodeOpReturn(slpData.tokenId)
                                        // Hydrate the UTXO object with information about the SLP token.
                                    ];
                                    case 6:
                                        genesisData = _a.sent();
                                        // Hydrate the UTXO object with information about the SLP token.
                                        utxo.utxoType = "token";
                                        utxo.transactionType = "mint";
                                        utxo.tokenId = slpData.tokenId;
                                        utxo.tokenTicker = genesisData.ticker;
                                        utxo.tokenName = genesisData.name;
                                        utxo.tokenDocumentUrl = genesisData.documentUrl;
                                        utxo.tokenDocumentHash = genesisData.documentHash;
                                        utxo.decimals = genesisData.decimals;
                                        utxo.mintBatonVout = slpData.mintBatonVout;
                                        utxo.batonStillExists = slpData.batonStillExists;
                                        // Calculate the real token quantity.
                                        utxo.tokenQty = slpData.quantity / Math.pow(10, utxo.decimals);
                                        outAry[i] = utxo;
                                        _a.label = 7;
                                    case 7:
                                        if (!(slpData.transactionType === "send")) return [3 /*break*/, 10];
                                        voutMatch = slpData.spendData.filter(function (x) { return utxo.vout === x.vout; });
                                        if (!(voutMatch.length === 0)) return [3 /*break*/, 8];
                                        outAry[i] = false;
                                        return [3 /*break*/, 10];
                                    case 8: return [4 /*yield*/, this_2.decodeOpReturn(slpData.tokenId)
                                        // console.log(`genesisData: ${JSON.stringify(genesisData, null, 2)}`)
                                        // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)
                                        // Hydrate the UTXO object with information about the SLP token.
                                    ];
                                    case 9:
                                        genesisData = _a.sent();
                                        // console.log(`genesisData: ${JSON.stringify(genesisData, null, 2)}`)
                                        // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)
                                        // Hydrate the UTXO object with information about the SLP token.
                                        utxo.utxoType = "token";
                                        utxo.transactionType = "send";
                                        utxo.tokenId = slpData.tokenId;
                                        utxo.tokenTicker = genesisData.ticker;
                                        utxo.tokenName = genesisData.name;
                                        utxo.tokenDocumentUrl = genesisData.documentUrl;
                                        utxo.tokenDocumentHash = genesisData.documentHash;
                                        utxo.decimals = genesisData.decimals;
                                        // Calculate the real token quantity.
                                        utxo.tokenQty = voutMatch[0].quantity / Math.pow(10, utxo.decimals);
                                        // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)
                                        outAry[i] = utxo;
                                        _a.label = 10;
                                    case 10:
                                        if (!outAry[i]) return [3 /*break*/, 12];
                                        return [4 /*yield*/, this_2.validateTxid(utxo.txid)
                                            // console.log(`isValid: ${JSON.stringify(isValid, null, 2)}`)
                                        ];
                                    case 11:
                                        isValid = _a.sent();
                                        // console.log(`isValid: ${JSON.stringify(isValid, null, 2)}`)
                                        outAry[i].isValid = isValid[0].valid;
                                        _a.label = 12;
                                    case 12: return [2 /*return*/];
                                }
                            });
                        };
                        this_2 = this;
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < utxos.length)) return [3 /*break*/, 4];
                        return [5 /*yield**/, _loop_2(i)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, outAry];
                    case 5:
                        error_11 = _a.sent();
                        if (error_11.response && error_11.response.data)
                            throw error_11.response.data;
                        throw error_11;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return Util;
}(BITBOXUtil));
exports.default = Util;
