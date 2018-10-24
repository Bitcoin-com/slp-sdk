const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
import List from "./List";
import RawTransactions from "./RawTransactions";

class SLP extends BITBOXSDK {
  constructor(config) {
    super(config);
    if (config && config.restURL && config.restURL !== "") this.restURL = config.restURL;else this.restURL = "https://rest.bitcoin.com/v1/";

    this.List = new List(this.restURL);
    this.RawTransactions = new RawTransactions(this.restURL, this.RawTransactions);
  }
}

export default SLP;