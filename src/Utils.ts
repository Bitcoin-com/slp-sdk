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

  async burnTotal(transactionId: string): Promise<Object> {
    const path: string = `${this.restURL}slp/burnTotal/${transactionId}`

    try {
      const response = await axios.get(path)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  // Expects an array of UTXO objects as input. Returns an array of Boolean
  // values indicating if a UTXO is associated with SLP tokens (true) or not
  // (false).
  async isTokenUtxo(utxos: Array<any>): Promise<Object> {
    try {
      // Throw error if input is not an array.
      if(!Array.isArray(utxos)) throw new Error(`Input must be an array.`)

      // Loop through each element in the array and spot check the required
      // properties.
      for(let i=0; i < utxos.length; i++) {
        const thisUtxo = utxos[i]

        // Throw error if utxo does not have a satoshis property.
        if(!thisUtxo.satoshis) throw new Error(`utxo ${i} does not have a satoshis property.`)

        // Throw error if utxo does not have a txid property.
        if(!thisUtxo.txid) throw new Error(`utxo ${i} does not have a txid property.`)
      }

      // Create an array of txid strings to feed to validateTxid
      const txids = utxos.map(x => x.txid)

      // Validate the array of txids.
      let validations: any = await this.validateTxid(txids)

      // Extract the boolean result
      validations = validations.map((x: any) => x.valid)

      // Loop through each element and compute final validation.
      for(let i=0; i < utxos.length; i++) {
        const thisUtxo = utxos[i]

        // Invalidate the utxo if it contains more than dust, since SLP token
        // UTXOs only contain dust values.
        if(thisUtxo.satoshis > 546) validations[i] = false
      }

      return validations

    } catch(error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }
}

export default Utils
