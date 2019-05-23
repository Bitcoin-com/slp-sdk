// imports
import axios from "axios"

// consts
const util = require("util")
util.inspect.defaultOptions = { depth: 1 }

class Utils {
  restURL: string
  constructor(restURL: string) {
    this.restURL = restURL
  }

  async list(id?: string | string[]): Promise<Object | Array<Object>> {
    let path: string
    let method: string
    if (!id) {
      method = "get"
      path = `${this.restURL}slp/list`
    } else if (typeof id === "string") {
      method = "get"
      path = `${this.restURL}slp/list/${id}`
    } else if (typeof id === "object") {
      method = "post"
      path = `${this.restURL}slp/list`
    }

    try {
      let response: any
      if (method === "get") {
        response = await axios.get(path)
      } else {
        response = await axios.post(path, {
          tokenIds: id
        })
      }
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  // Retrieve token balances for a given address.
  async balancesForAddress(address: string): Promise<Object> {
    const path: string = `${this.restURL}slp/balancesForAddress/${address}`

    try {
      const response = await axios.get(path)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  // Retrieve token balances for a given tokenId.
  async balancesForToken(tokenId: string): Promise<Object> {
    const path: string = `${this.restURL}slp/balancesForToken/${tokenId}`

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
    const path: string = `${this.restURL}slp/balance/${address}/${tokenId}`

    try {
      const response = await axios.get(path)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async validateTxid(txid: string | string[]): Promise<Object> {
    const path: string = `${this.restURL}slp/validateTxid`

    let txids: string[]
    if (typeof txid === "string") txids = [txid]
    else txids = txid

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

  async tokenStats(tokenId: string): Promise<Object> {
    const path: string = `${this.restURL}slp/tokenStats/${tokenId}`

    try {
      const response = await axios.get(path)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  // Retrieve token transactions for a given tokenId and address.
  async transactions(tokenId: string, address: string): Promise<Object> {
    const path: string = `${this.restURL}slp/transactions/${tokenId}/${address}`

    try {
      const response = await axios.get(path)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }
}

export default Utils
