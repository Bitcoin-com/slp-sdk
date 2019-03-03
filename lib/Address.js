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
var BITBOXAddress = require("bitbox-sdk/lib/Address").default;
var BITBOXSDK = require("bitbox-sdk");
var BITBOX = new BITBOXSDK();
var utils = require("slpjs").Utils;
var Address = /** @class */ (function (_super) {
    __extends(Address, _super);
    function Address(restURL) {
        var _this = _super.call(this, restURL) || this;
        _this.restURL = restURL;
        return _this;
    }
    Address.prototype.toSLPAddress = function (address, prefix, regtest) {
        if (prefix === void 0) { prefix = true; }
        if (regtest === void 0) { regtest = false; }
        try {
            this._ensureValidAddress(address);
            var slpAddress = utils.toSlpAddress(address);
            if (prefix)
                return slpAddress;
            return slpAddress.split(":")[1];
        }
        catch (err) {
            return err;
        }
    };
    Address.prototype.toCashAddress = function (address, prefix, regtest) {
        if (prefix === void 0) { prefix = true; }
        if (regtest === void 0) { regtest = false; }
        try {
            this._ensureValidAddress(address);
            var cashAddress = utils.toCashAddress(address);
            if (prefix)
                return cashAddress;
            return cashAddress.split(":")[1];
        }
        catch (err) {
            return err;
        }
    };
    Address.prototype.toLegacyAddress = function (address) {
        try {
            this._ensureValidAddress(address);
            var cashAddr = utils.toCashAddress(address);
            return BITBOX.Address.toLegacyAddress(cashAddr);
        }
        catch (err) {
            return err;
        }
    };
    Address.prototype.isLegacyAddress = function (address) {
        try {
            this._ensureValidAddress(address);
            return BITBOX.Address.isLegacyAddress(address);
        }
        catch (err) {
            return err;
        }
    };
    Address.prototype.isCashAddress = function (address) {
        try {
            this._ensureValidAddress(address);
            if (utils.isSlpAddress(address))
                return false;
            return BITBOX.Address.isCashAddress(address);
        }
        catch (err) {
            return err;
        }
    };
    Address.prototype.isSLPAddress = function (address) {
        try {
            this._ensureValidAddress(address);
            return utils.isSlpAddress(address);
        }
        catch (err) {
            return err;
        }
    };
    Address.prototype.isMainnetAddress = function (address) {
        try {
            this._ensureValidAddress(address);
            var cashaddr = utils.toCashAddress(address);
            return BITBOX.Address.isMainnetAddress(cashaddr);
        }
        catch (err) {
            return err;
        }
    };
    Address.prototype.isTestnetAddress = function (address) {
        try {
            this._ensureValidAddress(address);
            var cashAddr = utils.toCashAddress(address);
            return BITBOX.Address.isTestnetAddress(cashAddr);
        }
        catch (err) {
            return err;
        }
    };
    Address.prototype.isP2PKHAddress = function (address) {
        try {
            this._ensureValidAddress(address);
            var cashAddr = utils.toCashAddress(address);
            return BITBOX.Address.isP2PKHAddress(cashAddr);
        }
        catch (err) {
            return err;
        }
    };
    Address.prototype.isP2SHAddress = function (address) {
        try {
            this._ensureValidAddress(address);
            var cashAddr = utils.toCashAddress(address);
            return BITBOX.Address.isP2SHAddress(cashAddr);
        }
        catch (err) {
            return err;
        }
    };
    Address.prototype.detectAddressFormat = function (address) {
        try {
            this._ensureValidAddress(address);
            if (utils.isSlpAddress(address))
                return "slpaddr";
            return BITBOX.Address.detectAddressFormat(address);
        }
        catch (err) {
            return err;
        }
    };
    Address.prototype.detectAddressNetwork = function (address) {
        try {
            this._ensureValidAddress(address);
            var cashAddr = utils.toCashAddress(address);
            return BITBOX.Address.detectAddressNetwork(cashAddr);
        }
        catch (err) {
            return err;
        }
    };
    Address.prototype.detectAddressType = function (address) {
        try {
            this._ensureValidAddress(address);
            var cashAddr = utils.toCashAddress(address);
            return BITBOX.Address.detectAddressType(cashAddr);
        }
        catch (err) {
            return err;
        }
    };
    Address.prototype.details = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var tmpBITBOX, network, cashAddr;
            return __generator(this, function (_a) {
                if (typeof address === "string")
                    network = this.detectAddressNetwork(address);
                else
                    network = this.detectAddressNetwork(address[0]);
                if (network === "mainnet")
                    tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" });
                else
                    tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" });
                try {
                    if (typeof address === "string") {
                        cashAddr = utils.toCashAddress(address);
                        return [2 /*return*/, tmpBITBOX.Address.details(cashAddr)];
                    }
                    address = address.map(function (address) { return utils.toCashAddress(address); });
                    return [2 /*return*/, tmpBITBOX.Address.details(address)];
                }
                catch (error) {
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    Address.prototype.utxo = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var tmpBITBOX, network, cashAddr;
            return __generator(this, function (_a) {
                if (typeof address === "string")
                    network = this.detectAddressNetwork(address);
                else
                    network = this.detectAddressNetwork(address[0]);
                if (network === "mainnet")
                    tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" });
                else
                    tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" });
                try {
                    if (typeof address === "string") {
                        cashAddr = utils.toCashAddress(address);
                        return [2 /*return*/, tmpBITBOX.Address.utxo(cashAddr)];
                    }
                    address = address.map(function (address) { return utils.toCashAddress(address); });
                    return [2 /*return*/, tmpBITBOX.Address.utxo(address)];
                }
                catch (error) {
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    Address.prototype.unconfirmed = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var tmpBITBOX, network, cashAddr;
            return __generator(this, function (_a) {
                if (typeof address === "string")
                    network = this.detectAddressNetwork(address);
                else
                    network = this.detectAddressNetwork(address[0]);
                if (network === "mainnet")
                    tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" });
                else
                    tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" });
                try {
                    if (typeof address === "string") {
                        cashAddr = utils.toCashAddress(address);
                        return [2 /*return*/, tmpBITBOX.Address.unconfirmed(cashAddr)];
                    }
                    address = address.map(function (address) { return utils.toCashAddress(address); });
                    return [2 /*return*/, tmpBITBOX.Address.unconfirmed(address)];
                }
                catch (error) {
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    Address.prototype.transactions = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var tmpBITBOX, network, cashAddr;
            return __generator(this, function (_a) {
                if (typeof address === "string")
                    network = this.detectAddressNetwork(address);
                else
                    network = this.detectAddressNetwork(address[0]);
                if (network === "mainnet")
                    tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" });
                else
                    tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" });
                try {
                    if (typeof address === "string") {
                        cashAddr = utils.toCashAddress(address);
                        return [2 /*return*/, tmpBITBOX.Address.transactions(cashAddr)];
                    }
                    address = address.map(function (address) { return utils.toCashAddress(address); });
                    return [2 /*return*/, tmpBITBOX.Address.transactions(address)];
                }
                catch (error) {
                    throw error;
                }
                return [2 /*return*/];
            });
        });
    };
    Address.prototype._ensureValidAddress = function (address) {
        try {
            utils.toCashAddress(address);
        }
        catch (err) {
            throw new Error("Invalid BCH address. Double check your address is valid: " + address);
        }
    };
    return Address;
}(BITBOXAddress));
exports.default = Address;
