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
// imports
var Address_1 = require("./Address");
var common_1 = require("./common");
// consts
var BigNumber = require("bignumber.js");
var slpjs = require("slpjs");
var addy = new Address_1.default();
var NFT1 = /** @class */ (function () {
    function NFT1(restURL) {
        this.restURL = restURL;
    }
    NFT1.prototype.create = function (nftConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var network, BITBOX, bitboxNetwork, balances, initialTokenQtyBN, genesisTxid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // validate address formats
                        common_1.validateAddressFormat(nftConfig);
                        network = common_1.returnNetwork(nftConfig.fundingAddress);
                        BITBOX = common_1.returnBITBOXInstance(network);
                        bitboxNetwork = new slpjs.BitboxNetwork(BITBOX);
                        console.log("yy");
                        return [4 /*yield*/, bitboxNetwork.getAllSlpBalancesAndUtxos(nftConfig.fundingAddress)];
                    case 1:
                        balances = _a.sent();
                        console.log("'balances' variable is set.");
                        console.log("BCH balance:", balances.satoshis_available_bch);
                        initialTokenQtyBN = new BigNumber(nftConfig.initialTokenQty);
                        // 3) Set private keys
                        balances.nonSlpUtxos.forEach(function (txo) { return (txo.wif = nftConfig.fundingWif); });
                        return [4 /*yield*/, bitboxNetwork.simpleNFT1ParentGenesis(nftConfig.name, nftConfig.symbol, initialTokenQtyBN, nftConfig.documentUri, nftConfig.documentHash, nftConfig.tokenReceiverAddress, nftConfig.batonReceiverAddress, nftConfig.bchChangeReceiverAddress, balances.nonSlpUtxos)];
                    case 2:
                        genesisTxid = _a.sent();
                        return [2 /*return*/, genesisTxid];
                }
            });
        });
    };
    return NFT1;
}());
exports.default = NFT1;
