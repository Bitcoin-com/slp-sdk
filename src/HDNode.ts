const BITBOXHDNode = require("bitbox-sdk/lib/HDNode").default
const BITBOXSDK = require("bitbox-sdk")
const BITBOX = new BITBOXSDK()
const utils = require("slpjs").Utils

class HDNode extends BITBOXHDNode {
  restURL: string
  constructor(restURL?: string) {
    super(restURL)
    this.restURL = restURL
  }

  toLegacyAddress(hdNode: any): string {
    return BITBOX.HDNode.toLegacyAddress(hdNode)
  }

  toCashAddress(hdNode: any, regtest = false): string {
    return BITBOX.HDNode.toCashAddress(hdNode, regtest)
  }

  toSLPAddress(hdNode: any): string {
    const cashAddr = BITBOX.HDNode.toCashAddress(hdNode)
    return utils.toSlpAddress(cashAddr)
  }
}

export default HDNode
