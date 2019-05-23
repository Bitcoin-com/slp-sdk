const BITBOXHDNode = require("bitbox-sdk").HDNode
import { BITBOX } from "bitbox-sdk"
const bitbox = new BITBOX()
const utils = require("slpjs").Utils

class HDNode extends BITBOXHDNode {
  restURL: string
  constructor(restURL?: string) {
    super(restURL)
    this.restURL = restURL
  }

  toLegacyAddress(hdNode: any): string {
    return bitbox.HDNode.toLegacyAddress(hdNode)
  }

  toCashAddress(hdNode: any, regtest = false): string {
    return bitbox.HDNode.toCashAddress(hdNode, regtest)
  }

  toSLPAddress(hdNode: any): string {
    const cashAddr = bitbox.HDNode.toCashAddress(hdNode)
    return utils.toSlpAddress(cashAddr)
  }
}

export default HDNode
