// require deps
const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
const slpjs = require("slpjs")
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

  // Retrieve token balances for a given address.
  async balancesForAddress(address: string): Promise<Object> {
    let path: string = `${this.restURL}slp/balancesForAddress/${address}`

    try {
      const response = await axios.get(path)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  // Retrieve a balance for a specific address and token ID
  async balance(address: string, tokenId: string): Promise<Object> {
    let path: string = `${this.restURL}slp/balance/${address}/${tokenId}`

    try {
      const response = await axios.get(path)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async validateTxid(txid: string | string[]): Promise<Object> {
    let path: string = `${this.restURL}slp/validateTxid`

    let txids: string[]
    if (typeof txid === "string") {
      txids = [txid]
    } else {
      txids = txid
    }

    try {
      const response = await axios.post(path, {
        txids: txids
      })
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }
}

export default Utils
