// require deps
const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
const utils = require("slpjs").slpjs.Utils
const slpjs = require("slpjs").slpjs
const BigNumber: any = require("bignumber.js")
import axios from "axios"

// import classes
import Address from "./Address"
let addy = new Address()

let slpValidator: any

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

    let keys: Array<string> = Object.keys(balances.slpTokenBalances)

    const axiosPromises = keys.map(async (key: any) => {
      let tokenMetadata: any = await bitboxNetwork.getTokenInformation(key)
      return balances.slpTokenBalances[key]
        .div(10 ** tokenMetadata.decimals)
        .toString()
    })

    // Wait for all parallel promises to return.
    const axiosResult: Array<any> = await axios.all(axiosPromises)
    let finalResult: any = {}
    keys.forEach(async (key: string, index: number) => {
      finalResult[key] = axiosResult[index]
    })
    return finalResult
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
    let val: any
    let tokenMetadata: any = await bitboxNetwork.getTokenInformation(tokenId)

    val = balances.slpTokenBalances[tokenId]
      .div(10 ** tokenMetadata.decimals)
      .toString()
    return val
  }

  async validateTxid(txid: string, network: string, getRawTransactions: any = null): Promise<Object> {
    let tmpBITBOX: any

    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
    }

    const slpValidator: any = new slpjs.LocalValidator(
      tmpBITBOX,
      getRawTransactions ? getRawTransactions : tmpBITBOX.RawTransactions.getRawTransaction.bind(this)
    )

    let isValid: boolean = await slpValidator.isValidSlpTxid(txid)
    return isValid
  }

  createValidator(network: string, getRawTransactions: any = null): Promise<Object> {
    let tmpBITBOX: any

    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
    }

    const slpValidator: any = new slpjs.LocalValidator(
      tmpBITBOX,
      getRawTransactions ? getRawTransactions : tmpBITBOX.RawTransactions.getRawTransaction.bind(this)
    )

    return slpValidator
  }
}

export default Utils
