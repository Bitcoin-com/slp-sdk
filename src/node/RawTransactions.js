const axios = require("axios");

class RawTransactions {
  constructor(restURL, rawTransactions) {
    this.restURL = restURL;
    this.decodeRawTransaction = rawTransactions.decodeRawTransaction;
    this.decodeScript = rawTransactions.decodeScript;
    this.getRawTransaction = rawTransactions.getRawTransaction;
    this.sendRawTransaction = rawTransactions.sendRawTransaction;
  }

  async change(rawtx, prevTxs, destination, fee, position = undefined) {
    let path;
    if (position) {
      path = `${this.restURL}rawTransactions/change/${rawtx}/${JSON.stringify(
        prevTxs
      )}/${destination}/${fee}?position=${position}`;
    } else {
      path = `${this.restURL}rawTransactions/change/${rawtx}/${JSON.stringify(
        prevTxs
      )}/${destination}/${fee}`;
    }
    try {
      let response = await axios.post(path);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async input(rawtx, txid, n) {
    try {
      let response = await axios.post(
        `${this.restURL}rawTransactions/input/${rawtx}/${txid}/${n}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async opReturn(rawtx, payload) {
    try {
      let response = await axios.post(
        `${this.restURL}rawTransactions/opReturn/${rawtx}/${payload}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async reference(rawtx, destination, amount) {
    let path;
    if (amount) {
      path = `${
        this.restURL
      }rawTransactions/reference/${rawtx}/${destination}?amount=${amount}`;
    } else {
      path = `${this.restURL}rawTransactions/reference/${rawtx}/${destination}`;
    }
    try {
      let response = await axios.post(path);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async decodeTransaction(rawtx, prevTxs = undefined, height = undefined) {
    let path;
    if (prevTxs) {
      path = `${
        this.restURL
      }rawTransactions/decodeTransaction/${rawtx}?prevTxs=${JSON.stringify(
        prevTxs
      )}`;
    } else if (prevTxs && height) {
      path = `${
        this.restURL
      }rawTransactions/decodeTransaction/${rawtx}?prevTxs=${JSON.stringify(
        prevTxs
      )}&height=${height}`;
    } else if (height) {
      path = `${
        this.restURL
      }rawTransactions/decodeTransaction/${rawtx}?height=${height}`;
    } else {
      path = `${this.restURL}rawTransactions/decodeTransaction/${rawtx}`;
    }
    try {
      let response = await axios.get(path);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }

  async create(inputs, outputs = {}) {
    try {
      let response = await axios.post(
        `${this.restURL}rawTransactions/create/${JSON.stringify(
          inputs
        )}/${JSON.stringify(outputs)}`
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
}

//export default RawTransactions;
module.exports = RawTransactions;
