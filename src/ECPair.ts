// imports
import { BITBOX } from "bitbox-sdk"

// consts
const BITBOXECPair = require("bitbox-sdk").ECPair
const bitbox = new BITBOX()
const utils = require("slpjs").Utils

class ECPair extends BITBOXECPair {
  toSLPAddress(ecpair: any): string {
    try {
      const slpAddress: string = utils.toSlpAddress(
        bitbox.ECPair.toCashAddress(ecpair)
      )
      return slpAddress
    } catch (err) {
      return err
    }
  }
}

export default ECPair
