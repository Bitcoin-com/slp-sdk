const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default;
let BITBOX = new BITBOXSDK();
let utils = require("slpjs").utils;

class Conversion {
  toSLPAddress(address) {
    return utils.toSlpAddress(address);
  }

  toCashAddress(address) {
    return utils.toCashAddress(address);
  }

  toLegacyAddress(address) {
    let cashAddr = utils.toCashAddress(address);
    return BITBOX.Address.toLegacyAddress(cashAddr);
  }
}

export default Conversion;
