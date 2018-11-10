const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
const BITBOX = new BITBOXSDK()
const utils = require("slpjs").utils

class Utils {
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

  getPushDataOpcode(data: any): any {
    return utils.getPushDataOpcode(data)
  }

  int2FixedBuffer(amount: any): any {
    return utils.int2FixedBuffer(amount)
  }

  // This is for encoding Script in scriptPubKey OP_RETURN scripts, where BIP62.3 does not apply
  encodeScript(script: any): any {
    return utils.gencodeScript(script)
  }

  txidFromHex(hex: any): any {
    return utils.txidFromHex(hex)
  }

  // Method to get Script 32-bit integer (little-endian signed magnitude representation)
  readScriptInt32(buffer: any): any {
    return utils.readScriptInt32(buffer)
  }

  // Method to check whether or not a secret value is valid
  scriptInt32IsValid(buffer: any): any {
    return utils.scriptInt32IsValid(buffer)
  }

  generateRandomScriptInt32(): any {
    return utils.generateRandomScriptInt32()
  }
}

export default Utils
