// require deps
const BITBOXECPair = require("bitbox-sdk/lib/ECPair").default
const BITBOXSDK = require("bitbox-sdk")
const BITBOX = new BITBOXSDK()
const utils = require("slpjs").Utils

class ECPair extends BITBOXECPair {
  static toSLPAddress(ecpair: any): string {
    try {
      const slpAddress: string = utils.toSlpAddress(
        BITBOX.ECPair.toCashAddress(ecpair)
      )
      return slpAddress
    } catch (err) {
      return err
    }
  }
}

export default ECPair
