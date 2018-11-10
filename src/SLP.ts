const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
import Utils from "./Utils"
import SlpTokenType1 from "./SlpTokenType1"
let slp = require("slpjs").slp
let bitboxproxy = require("slpjs").bitbox
let bitdb = require("slpjs").bitdb
const BigNumber = require("bignumber.js")
import { IConfig } from "./interfaces/IConfig"

class SLP extends BITBOXSDK {
  constructor(config: IConfig) {
    super(config)
    let restURL
    if (config && config.restURL && config.restURL !== "")
      restURL = config.restURL
    else restURL = "https://rest.bitcoin.com/v1/"

    this.Utils = new Utils(restURL)
    this.SlpTokenType1 = SlpTokenType1
    this.bitbox = bitboxproxy
    this.slp = slp
    this.BigNumber = BigNumber
    this.biddb = bitdb
  }
}

export default SLP
