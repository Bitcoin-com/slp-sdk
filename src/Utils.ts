// imports
import axios from "axios"

import { BITBOX } from "bitbox-sdk"
const bitbox = new BITBOX()

// consts
const util = require("util")
util.inspect.defaultOptions = { depth: 1 }

const BigNumber = require('bignumber.js')

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
  // Note: There is no way to validate SLP UTXOs without inspecting the OP_RETURN.
  async isTokenUtxo(utxos: Array<any>): Promise<Object> {
    try {
      // Throw error if input is not an array.
      if (!Array.isArray(utxos)) throw new Error(`Input must be an array.`)

      // Loop through each element in the array and spot check the required
      // properties.
      for (let i = 0; i < utxos.length; i++) {
        const thisUtxo = utxos[i]

        // Throw error if utxo does not have a satoshis property.
        if (!thisUtxo.satoshis)
          throw new Error(`utxo ${i} does not have a satoshis property.`)

        // Throw error if utxo does not have a txid property.
        if (!thisUtxo.txid)
          throw new Error(`utxo ${i} does not have a txid property.`)
      }

      // Create an array of txid strings to feed to validateTxid
      const txids = utxos.map(x => x.txid)

      // Validate the array of txids.
      let validations: any = await this.validateTxid(txids)

      // Extract the boolean result
      validations = validations.map((x: any) => x.valid)

      // Loop through each element and compute final validation.
      for (let i = 0; i < utxos.length; i++) {
        const thisUtxo = utxos[i]

        // Invalidate the utxo if it contains more than dust, since SLP token
        // UTXOs only contain dust values. <--- NOT TRUE
        // Note: This is not a very accurate way to make a determination.
        // See https://gist.github.com/christroutner/434ae0c710001b57e33a4fa8abb7d478
        if (thisUtxo.satoshis > 546) validations[i] = false
      }

      return validations
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  // Retrieves transactions data from a txid and decodes the SLP OP_RETURN data.
  // Returns an object with properties corresponding to the SLP spec:
  // https://github.com/simpleledger/slp-specifications/blob/master/slp-token-type-1.md
  async decodeOpReturn(txid: string) {
    try {
      const path: string = `${this.restURL}rawtransactions/getRawTransaction/${txid}?verbose=true`
      const lokadIdHex = "534c5000"

      // Create an empty output object that will be populated with metadata.
      const outObj: any = {}

      // Retrieve the transaction object from the full node.
      const response = await axios.get(path)
      const txDetails = response.data

      // Retrieve the OP_RETURN data.
      const script = bitbox.Script.toASM(
        Buffer.from(txDetails.vout[0].scriptPubKey.hex, "hex")
      ).split(" ")

      if (script[0] !== "OP_RETURN") throw new Error("Not an OP_RETURN")

      if (script[1] !== lokadIdHex) throw new Error("Not a SLP OP_RETURN")

      // Validate token type.
      if (script[2] !== "OP_1") {
        // NOTE: bitcoincashlib-js converts hex 01 to OP_1 due to BIP62.3 enforcement
        throw new Error("Unknown token type")
      }
      outObj.tokenType = 1

      const type = Buffer.from(script[3], "hex")
        .toString("ascii")
        .toLowerCase()
      script[3] = type

      if (type === "genesis") {
        outObj.transactionType = 'genesis'

        // Convert the next four entries into ascii.
        for (let i = 4; i < 8; i++) {
          script[i] = Buffer.from(script[i], "hex")
            .toString("ascii")
            //.toLowerCase()
        }

        outObj.ticker = script[4]
        outObj.name = script[5]
        outObj.documentUrl = script[6]
        outObj.documentHash = script[7]

        // decimal precision of the token.
        if (typeof script[8] === "string" && script[8].startsWith("OP_"))
          script[8] = parseInt(script[8].slice(3)).toString(16)

        const decimals = Number(script[8])
        outObj.decimals = decimals

        // Mint Baton vout.
        if (typeof script[9] === "string" && script[9].startsWith("OP_"))
          script[9] = parseInt(script[9].slice(3)).toString(16)
        outObj.mintBatonVout = Number(script[9])

        // Initial quantity of tokens created.
        let qty = new BigNumber(script[10], 16)
        qty = qty/(Math.pow(10,decimals))
        script[10] = qty
        outObj.initialQty = qty

      }

      return outObj
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }
}

export default Utils
