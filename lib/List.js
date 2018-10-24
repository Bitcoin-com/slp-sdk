"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var List = function () {
  function List(restURL) {
    _classCallCheck(this, List);

    this.restURL = restURL;
  }

  _createClass(List, [{
    key: "list",
    value: async function list(id) {
      var path = void 0;
      if (!id) {
        path = this.restURL + "list";
      } else {
        path = this.restURL + "list/" + id;
      }
      try {
        var response = await _axios2.default.get(path);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }, {
    key: "list",
    value: async function list(id) {
      try {
        var response = await _axios2.default.get(this.restURL + "list/" + id);
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) throw error.response.data;
        throw error;
      }
    }
  }]);

  return List;
}();

exports.default = List;