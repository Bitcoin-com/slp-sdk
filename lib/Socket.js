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
Object.defineProperty(exports, "__esModule", { value: true });
var BITBOXSocket = require("bitbox-sdk").Socket;
var Socket = /** @class */ (function (_super) {
    __extends(Socket, _super);
    function Socket(config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this, config) || this;
        if (config.slpsocketURL) {
            _this.slpsocketURL = config.slpsocketURL;
        }
        else {
            _this.slpsocketURL = "https://slpsocket.bchdata.cash";
        }
        return _this;
    }
    Socket.prototype.listen = function (query, cb) {
        if (query === "blocks" || query === "transactions") {
            _super.prototype.listen.call(this, query, cb);
        }
        else {
            var EventSource_1 = require("eventsource");
            var b64 = Buffer.from(JSON.stringify(query)).toString("base64");
            this.socket = new EventSource_1(this.slpsocketURL + "/s/" + b64);
            this.socket.onmessage = function (msg) {
                cb(msg.data);
            };
        }
    };
    return Socket;
}(BITBOXSocket));
exports.Socket = Socket;
