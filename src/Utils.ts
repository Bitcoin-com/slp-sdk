// require deps
const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
const utils = require("slpjs").Utils
const slpjs = require("slpjs")
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

    const getRawTransactions = async (txids: any) => {
      return await tmpBITBOX.RawTransactions.getRawTransaction(txids)
    }

    const slpValidator: any = new slpjs.LocalValidator(
      tmpBITBOX,
      getRawTransactions
    )

    const bitboxNetwork: any = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)
    let balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      addy.toSLPAddress(address)
    )

    let keys: Array<string> = Object.keys(balances.slpTokenBalances)

    const axiosPromises = keys.map(async (key: any) => {
      let tokenMetadata: any = await bitboxNetwork.getTokenInformation(key)
      return {
        tokenId: key,
        balance: balances.slpTokenBalances[key]
          .div(10 ** tokenMetadata.decimals)
          .toString(),
        decimalCount: tokenMetadata.decimals
      }
    })

    // Wait for all parallel promises to return.
    const axiosResult: Array<any> = await axios.all(axiosPromises)
    return axiosResult
  }

  async balance(address: string, tokenId: string): Promise<Object> {
    let network: string = addy.detectAddressNetwork(address)
    let tmpBITBOX: any

    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
    }

    const getRawTransactions = async (txids: any) => {
      return await tmpBITBOX.RawTransactions.getRawTransaction(txids)
    }

    const slpValidator: any = new slpjs.LocalValidator(
      tmpBITBOX,
      getRawTransactions
    )
    const bitboxNetwork: any = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)
    let balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      addy.toSLPAddress(address)
    )
    let formattedTokens: any[] = []
    if (balances.slpTokenBalances) {
      let keys = Object.keys(balances.slpTokenBalances)
      const axiosPromises = keys.map(async (key: any) => {
        let tokenMetadata: any = await bitboxNetwork.getTokenInformation(key)
        return {
          tokenId: key,
          balance: balances.slpTokenBalances[key]
            .div(10 ** tokenMetadata.decimals)
            .toString(),
          decimalCount: tokenMetadata.decimals
        }
      })

      // Wait for all parallel promises to return.
      let val: any = "No balance for this address and tokenId"
      const axiosResult: Array<any> = await axios.all(axiosPromises)
      axiosResult.forEach((result: any) => {
        if (result.tokenId === tokenId) {
          val = result
        }
      })
      return val
    } else {
      return "No balance for this address and tokenId"
    }
  }

  async validateTxid(
    txid: string,
    network: string,
    getRawTransactions: any = null
  ): Promise<Object> {
    let tmpBITBOX: any

    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
    }

    const slpValidator: any = new slpjs.LocalValidator(
      tmpBITBOX,
      getRawTransactions
        ? getRawTransactions
        : tmpBITBOX.RawTransactions.getRawTransaction.bind(this)
    )

    let isValid: boolean = await slpValidator.isValidSlpTxid(txid)
    return isValid
  }

  createValidator(
    network: string,
    getRawTransactions: any = null
  ): Promise<Object> {
    let tmpBITBOX: any

    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
    }

    const slpValidator: any = new slpjs.LocalValidator(
      tmpBITBOX,
      getRawTransactions
        ? getRawTransactions
        : tmpBITBOX.RawTransactions.getRawTransaction.bind(this)
    )

    return slpValidator
  }
}

export default Utils
