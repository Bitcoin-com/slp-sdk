let BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
const DataRetrieval = require("./DataRetrieval");
const PayloadCreation = require("./PayloadCreation");
const RawTransactions = require("./RawTransactions");

class Wormhole extends BITBOXSDK {
  constructor(config) {
    super(config);
    if (config && config.restURL && config.restURL !== "") {
      this.restURL = config.restURL;
    } else {
      this.restURL = "https://wormholerest.bitcoin.com/v1/";
    }

    this.DataRetrieval = new DataRetrieval(this.restURL);
    this.PayloadCreation = new PayloadCreation(this.restURL);
    this.RawTransactions = new RawTransactions(
      this.restURL,
      this.RawTransactions
    );
  }
}

module.exports = Wormhole;
