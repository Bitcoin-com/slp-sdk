const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
const BITBOX = new BITBOXSDK()
const utils = require("slpjs").slpjs.Utils
const slpjs = require("slpjs").slpjs
import Address from "./Address"
let addy = new Address()

import axios from "axios"

class Utils {
  restURL: string
  constructor(restURL: string) {
    this.restURL = restURL
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

  async list(id: string): Promise<Object | Array<Object>> {
    console.log("REST", this.restURL)
    let path: string
    if (!id) path = `${this.restURL}slp/list`
    else path = `${this.restURL}slp/list/${id}`

    try {
      const response = await axios.get(path)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async balancesForAddress(address: string): Promise<Object> {
    let network = addy.detectAddressNetwork(address)
    let tmpBITBOX
    let path
    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
      path = "https://validate.simpleledger.info"
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
      path = "https://testnet-validate.simpleledger.info"
    }

    const slpValidator = new slpjs.JsonRpcProxyValidator(tmpBITBOX, path)
    const bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)
    let balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(address)
    return balances
  }

  async balance(address: string, tokenId: string): Promise<Object> {
    let network = addy.detectAddressNetwork(address)
    let tmpBITBOX
    let path
    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
      path = "https://validate.simpleledger.info"
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
      path = "https://testnet-validate.simpleledger.info"
    }

    const slpValidator = new slpjs.JsonRpcProxyValidator(tmpBITBOX, path)
    const bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)
    let balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(address)
    let keys = Object.keys(balances.slpTokenBalances)
    let val
    if (keys) {
      keys.forEach((key: string) => {
        if (key === tokenId) {
          val = balances.slpTokenBalances[tokenId]
        }
      })
    } else {
      val = "no balance"
    }
    return val
  }
}

export default Utils
