const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
const BITBOX = new BITBOXSDK()
const utils = require("slpjs").utils

class Conversion {
  toSLPAddress(address: string): string {
    return utils.toSlpAddress(address)
  }

  toCashAddress(address: string): string {
    return utils.toCashAddress(address)
  }

  toLegacyAddress(address: string): string {
    const cashAddr = utils.toCashAddress(address)
    return BITBOX.Address.toLegacyAddress(cashAddr)
  }
}

export default Conversion
