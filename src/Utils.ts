const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
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

  async list(id: string): Promise<Object | Array<Object>> {
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
    let network: string = addy.detectAddressNetwork(address)
    let tmpBITBOX: any

    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
    }

    const slpValidator: any = new slpjs.LocalValidator(
      tmpBITBOX,
      tmpBITBOX.RawTransactions.getRawTransaction
    )

    const bitboxNetwork: any = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)
    let balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      addy.toSLPAddress(address)
    )
    return balances
  }

  async balance(address: string, tokenId: string): Promise<Object> {
    let network: string = addy.detectAddressNetwork(address)
    let tmpBITBOX: any

    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
    }

    const slpValidator: any = new slpjs.LocalValidator(
      tmpBITBOX,
      tmpBITBOX.RawTransactions.getRawTransaction
    )
    const bitboxNetwork: any = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)
    let balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      addy.toSLPAddress(address)
    )
    let keys: Array<string> = Object.keys(balances.slpTokenBalances)
    let val: any
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

  async validate(txid: string, network: string): Promise<Object> {
    let tmpBITBOX: any

    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
    }

    const slpValidator: any = new slpjs.LocalValidator(
      tmpBITBOX,
      tmpBITBOX.RawTransactions.getRawTransaction
    )

    let isValid: boolean = await slpValidator.isValidSlpTxid(txid)
    return isValid
  }
}

export default Utils
