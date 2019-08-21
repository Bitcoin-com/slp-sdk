// imports
import { BITBOX } from "bitbox-sdk"
import Address from "./Address"
import ECPair from "./ECPair"
import HDNode from "./HDNode"
import { IConfig } from "./interfaces/SLPInterfaces"
import { SLPDB } from "./SLPDB"
import { Socket } from "./Socket"
import TokenType1 from "./TokenType1"
import Util from "./Util"

// exports
const REST_URL = "https://rest.bitcoin.com/v2/"
const TREST_URL = "https://trest.bitcoin.com/v2/"
const SLPDB_URL = "https://slpdb.bitcoin.com/"
const TSLPDB_URL = "https://tslpdb.bitcoin.com/"

// consts
const slpjs = require("slpjs")
//const slpjs = require("/home/trout/work/bch/slpjs/lib/slp.js")
// SLP SDK is a superset of BITBOX SDK <3
class SLP extends BITBOX {
  slpdbURL: string
  Address: any
  HDNode: any
  SLPDB: SLPDB
  TokenType1: TokenType1
  Util: any
  Utils: any
  slpjs: any

  constructor(config: IConfig = {}) {
    super(config)

    let restURL: string
    if (config && config.restURL && config.restURL !== "")
      restURL = config.restURL
    else restURL = REST_URL

    if (config && config.slpdbURL && config.slpdbURL !== "")
      this.slpdbURL = config.slpdbURL
    else this.slpdbURL = SLPDB_URL

    this.Address = new Address(restURL)
    this.ECPair = new ECPair()
    this.HDNode = new HDNode(restURL)
    this.SLPDB = new SLPDB(this.slpdbURL)
    this.Socket = Socket
    this.TokenType1 = new TokenType1(restURL)
    this.Util = new Util(restURL)

    // Maintain backwards compatibility.
    this.Utils = this.Util

    // Expose slpjs
    this.slpjs = slpjs
  }
}

export = SLP
