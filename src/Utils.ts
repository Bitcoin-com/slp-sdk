// require deps
const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
const utils = require("slpjs").Utils
const slpjs = require("slpjs")
//const slpjs = require("../../slpjs")
const BigNumber: any = require("bignumber.js")
import axios from "axios"

// Used for debugging and iterrogating JS objects.
const util = require("util")
util.inspect.defaultOptions = { depth: 1 }

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

  // Get raw SLP balances and utxos from the REST server.
  // This function was created to faciliate unit and integration tests.
  async slpBalancesUtxos(bitboxNetwork: any, addr: any) {
    let balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      addy.toSLPAddress(addr)
    )

    return balances
  }

  // Retrieve token metadata from the REST server using an input array of txids
  // This function was created to faciliate unit and integration tests.
  async getTokenMetadata(
    keys: Array<string>,
    bitboxNetwork: any,
    balances: any
  ) {
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

  // Retrieve token balances for a given address.
  async balancesForAddress(address: string): Promise<Object> {
    let network: string = addy.detectAddressNetwork(address)
    let tmpBITBOX: any

    // Determine network (mainnet or testnet)
    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
    }

    const getRawTransactions = async (txids: any) => {
      return await tmpBITBOX.RawTransactions.getRawTransaction(txids)
    }

    // Instantiate a local SLP TX validator
    const slpValidator: any = new slpjs.LocalValidator(
      tmpBITBOX,
      getRawTransactions
    )

    // Get raw SLP information for this address.
    const bitboxNetwork: any = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)
    let balances: any = await this.slpBalancesUtxos(bitboxNetwork, address)

    // Get the TXIDs for tokens associated with this address.
    let keys: Array<string> = Object.keys(balances.slpTokenBalances)

    // Retrieve the token metadata for the TXIDs.
    const tokenMeta = await this.getTokenMetadata(keys, bitboxNetwork, balances)

    return tokenMeta
  }

  // Retrieve a balance for a specific address and token ID
  async balance(address: string, tokenId: string): Promise<Object> {
    let network: string = addy.detectAddressNetwork(address)
    let tmpBITBOX: any

    // Determine network (mainnet or testnet)
    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
    }

    const getRawTransactions = async (txids: any) => {
      return await tmpBITBOX.RawTransactions.getRawTransaction(txids)
    }

    // Instantiate a local SLP TX validator
    const slpValidator: any = new slpjs.LocalValidator(
      tmpBITBOX,
      getRawTransactions
    )

    // Get raw SLP information for this address.
    const bitboxNetwork: any = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)
    let balances: any = await this.slpBalancesUtxos(bitboxNetwork, address)

    // Get the metadata for this single token.
    const tokenMeta = await this.getTokenMetadata(
      [tokenId],
      bitboxNetwork,
      balances
    )

    return tokenMeta[0]
  }

  async validateTxid(
    txid: string,
    network: string,
    getRawTransactions: any = null
  ): Promise<Object> {
    let tmpBITBOX: any

    if (network === "mainnet") {
      //tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
      tmpBITBOX = new BITBOXSDK({ restURL: "http://localhost:3000/v2/" })
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
