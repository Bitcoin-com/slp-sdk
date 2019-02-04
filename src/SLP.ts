// require deps
const BITBOXSDK: any = require("bitbox-sdk/lib/bitbox-sdk").default

// import interfaces
import { IConfig } from "./interfaces/SLPInterfaces"

// import classes
import Address from "./Address"
import TokenType1 from "./TokenType1"
import Utils from "./Utils"

// SLP SDK is a superset of BITBOX SDK <3
class SLP extends BITBOXSDK {
  Address: any
  TokenType1: any
  Utils: any
  constructor(config: IConfig = {}) {
    super(config)
    let restURL: string
    if (config && config.restURL && config.restURL !== "")
      restURL = config.restURL
    else restURL = "https://rest.bitcoin.com/v2/"

    this.Address = new Address(restURL)
    this.TokenType1 = new TokenType1()
    this.Utils = new Utils(restURL)
  }
}

export default SLP
