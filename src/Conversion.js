let SLPSDK = require("slp-sdk/lib/SLP").default;
let SLP = new SLPSDK();

let utils = SLP.slp.utils;
class Conversion {
  toSLPAddress(address) {
    return utils.toSlpAddress(address);
  }

  toCashAddress(address) {
    return utils.toCashAddress(address);
  }

  toLegacyAddress(address) {
    let cashAddr = utils.toCashAddress(address);
    return SLP.Address.toLegacyAddress(cashAddr);
  }
}

export default Conversion;
