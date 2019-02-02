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
var BITBOX = new BITBOXSDK();
var utils = require("slpjs").slpjs.Utils;
var axios_1 = require("axios");
var Utils = /** @class */ (function () {
    function Utils(restURL) {
        this.restURL = restURL;
    }
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
    Utils.prototype.list = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var path, response, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!id)
                            path = this.restURL + "slp/list";
                        else
                            path = this.restURL + "slp/list/" + id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, axios_1.default.get(path)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1.response && error_1.response.data)
                            throw error_1.response.data;
                        throw error_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.balancesForAddress = function (address) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "slp/balancesForAddress/" + address)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_2 = _a.sent();
                        if (error_2.response && error_2.response.data)
                            throw error_2.response.data;
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.balance = function (address, id) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, axios_1.default.get(this.restURL + "slp/balance/" + address + "/" + id)];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response.data];
                    case 2:
                        error_3 = _a.sent();
                        if (error_3.response && error_3.response.data)
                            throw error_3.response.data;
                        throw error_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return Utils;
}());
exports.default = Utils;
