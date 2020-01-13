// imports
import axios from "axios"

import { BITBOX } from "bitbox-sdk"
const bitbox = new BITBOX()
const BITBOXUtil = require("bitbox-sdk").Util

// consts
const util = require("util")
util.inspect.defaultOptions = { depth: 1 }

const BigNumber = require("bignumber.js")

class Util extends BITBOXUtil {
  restURL: string
  constructor(restURL?: string) {
    super(restURL)
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

  // Retrieve token balances for a given address or array of addresses.
  async balancesForAddress(address: string | string[]): Promise<Object> {
    try {
      // Single address.
      if (typeof address === "string") {
        const path: string = `${this.restURL}slp/balancesForAddress/${address}`

        const response = await axios.get(path)
        return response.data

        // Array of addresses.
      } else if (Array.isArray(address)) {
        const path: string = `${this.restURL}slp/balancesForAddress`

        // Dev note: must use axios.post for unit test stubbing.
        const response: any = await axios.post(path, {
          addresses: address
        })

        return response.data
      }

      throw new Error(`Input address must be a string or array of strings.`)
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

  // Retrieves transactions data from a txid and decodes the SLP OP_RETURN data.
  // Returns an object with properties corresponding to the SLP spec:
  // https://github.com/simpleledger/slp-specifications/blob/master/slp-token-type-1.md
  async decodeOpReturn(txid: string) {
    try {
      if (!txid || txid === "" || typeof txid !== "string")
        throw new Error(`txid string must be included.`)

      const path: string = `${this.restURL}rawtransactions/getRawTransaction/${txid}?verbose=true`
      const lokadIdHex = "534c5000"

      // Create an empty output object that will be populated with metadata.
      const outObj: any = {}

      // Retrieve the transaction object from the full node.
      const response = await axios.get(path)
      const txDetails = response.data
      //console.log(`txDetails: ${JSON.stringify(txDetails,null,2)}`)

      // Retrieve the OP_RETURN data.
      const script = bitbox.Script.toASM(
        Buffer.from(txDetails.vout[0].scriptPubKey.hex, "hex")
      ).split(" ")

      if (script[0] !== "OP_RETURN") throw new Error("Not an OP_RETURN")

      if (script[1] !== lokadIdHex) throw new Error("Not a SLP OP_RETURN")

      // Validate token type.
      if (script[2] !== "OP_1" && script[2] !== "0001") {
        // NOTE: bitcoincashlib-js converts hex 01 to OP_1 due to BIP62.3 enforcement
        throw new Error("Unknown token type")
      }
      outObj.tokenType = 1

      const type = Buffer.from(script[3], "hex")
        .toString("ascii")
        .toLowerCase()
      script[3] = type
      //console.log(`type: ${type}`)

      // Decode a GENSIS SLP transaction.
      if (type === "genesis") {
        //console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)
        //console.log(`script: ${JSON.stringify(script, null, 2)}`)

        outObj.transactionType = "genesis"

        // Convert the next four entries into ascii.
        for (let i = 4; i < 8; i++)
          script[i] = Buffer.from(script[i], "hex").toString("ascii")
        //.toLowerCase()

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
        qty = qty / Math.pow(10, decimals)
        script[10] = qty
        outObj.initialQty = qty

        // Address initial tokens were sent to.
        outObj.tokensSentTo = txDetails.vout[1].scriptPubKey.addresses[0]

        // Mint baton address holder.
        if (!outObj.mintBatonVout) {
          outObj.batonHolder = "NEVER_CREATED"
        } else {
          outObj.batonHolder =
            txDetails.vout[outObj.mintBatonVout].scriptPubKey.addresses[0]
        }

        // Mint type transaction
      } else if (type === "mint") {
        //console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)

        outObj.transactionType = "mint"
        outObj.tokenId = script[4]

        // Locate the vout UTXO containing the minting baton.
        let mintBatonVout = 0
        // Dev note: Haven't seen this if-statement in the wild. Copied from
        // Badger Wallet code.
        if (typeof script[5] === "string" && script[5].startsWith("OP_"))
          mintBatonVout = parseInt(script[5].slice(3))
        // This is the common use case with slp-sdk examples.
        else mintBatonVout = parseInt(script[5])

        outObj.mintBatonVout = mintBatonVout

        // Check if baton was passed or destroyed.
        // Dev Note: There should be some more extensive checking here. The most
        // common way of 'burning' the minting baton is to set script[5] to a
        // value of 0, but it could also point to a non-existant vout.
        // TODO: Add checking if script[5] refers to a non-existant vout.
        outObj.batonStillExists = false // false by default.
        if (mintBatonVout > 1) outObj.batonStillExists = true

        // Parse the quantity generated in this minting operation.
        // Returns a string. But without the decimals information included,
        // I'm not sure how to properly represent the quantity.
        if (typeof script[6] === "string" && script[6].startsWith("OP_"))
          script[6] = parseInt(script[6].slice(3)).toString(16)

        outObj.quantity = new BigNumber(script[6], 16)

        // Report the reciever of the minted tokens.
        outObj.tokensSentTo = txDetails.vout[1].scriptPubKey.addresses[0]

        // Report the address that controls the mint baton.
        if (outObj.batonStillExists) {
          outObj.batonHolder =
            txDetails.vout[mintBatonVout].scriptPubKey.addresses[0]
        }

        // Send tokens.
      } else if (type === "send") {
        //console.log(`txDetails: ${JSON.stringify(txDetails, null, 2)}`)
        //console.log(`script: ${JSON.stringify(script,null,2)}`)

        if (script.length <= 4) throw new Error("Not a SLP txout")

        outObj.transactionType = "send"

        // Retrieve the token ID.
        outObj.tokenId = script[4]

        // Loop through each output.
        const spendData = []
        for (let i = 5; i < script.length; i++) {
          let thisScript = script[i]
          const spendObj: any = {}

          if (typeof thisScript === "string" && thisScript.startsWith("OP_"))
            thisScript = parseInt(thisScript.slice(3)).toString(16)

          // Compute the quantity of tokens.
          spendObj.quantity = new BigNumber(thisScript, 16)

          // Calculate which vouts are SLP UTXOs.
          const thisVout = i - 4
          spendObj.sentTo = txDetails.vout[thisVout].scriptPubKey.addresses[0]
          spendObj.vout = thisVout

          spendData.push(spendObj)
        }

        outObj.spendData = spendData
      }

      return outObj
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  // Expects an array of UTXO objects as input. Returns an array of Boolean
  // values indicating if a UTXO is associated with SLP tokens (true) or not
  // (false).
  // Note: There is no way to validate SLP UTXOs without inspecting the OP_RETURN.
  // If a UTXO returns false when its txid is passed to validateTxid(), then the
  // UTXO is not associated with SLP. This is a fast and quick check.
  // If a UTXO returns true though, the OP_RETURN has to be inspected to determine
  // for sure that it *is* associated with an SLP transaction not just change.
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
      //console.log(`validations: ${JSON.stringify(validations,null,2)}`)

      // Extract the boolean result
      validations = validations.map((x: any) => x.valid)

      // Loop through each element and compute final validation on any that
      // returned true.
      for (let i = 0; i < utxos.length; i++) {
        const thisUtxo = utxos[i]
        const thisValidation = validations[i]

        // Only need to worry about validations that are still true.
        if (thisValidation) {
          const slpData = await this.decodeOpReturn(thisUtxo.txid)
          //console.log(`slpData: ${JSON.stringify(slpData,null,2)}`)

          // Handle Genesis and Mint SLP transactions.
          if (
            slpData.transactionType === "genesis" ||
            slpData.transactionType === "mint"
          ) {
            if (
              thisUtxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
              thisUtxo.vout !== 1 // UTXO is not the reciever of the genesis or mint tokens.
            )
              // Can safely be marked as false.
              validations[i] = false
          } else if (slpData.transactionType === "send") {
            // Filter out any vouts that match.
            const voutMatch = slpData.spendData.filter(
              (x: any) => thisUtxo.vout === x.vout
            )
            //console.log(`voutMatch: ${JSON.stringify(voutMatch, null, 2)}`)

            // If there are no vout matches, the UTXO can safely be marked as false.
            if (voutMatch.length === 0) validations[i] = false
          }
        }

        // Below is deprecated, but kept for posterity:
        // Invalidate the utxo if it contains more than dust, since SLP token
        // UTXOs only contain dust values. <--- NOT TRUE
        // Note: This is not a very accurate way to make a determination.
        // See https://gist.github.com/christroutner/434ae0c710001b57e33a4fa8abb7d478
        //if (thisUtxo.satoshis > 546) validations[i] = false
      }

      return validations
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  // Hydrate a UTXO with SLP token metadata.
  //
  // Expects an array of UTXO objects as input. Returns an array of equal size.
  // If the UTXO does not belong to a SLP transaction, it will return false.
  // If the UTXO is part of an SLP transaction, it will return the UTXO object
  // with additional SLP information attached.
  async tokenUtxoDetails(utxos: any) {
    try {
      // Throw error if input is not an array.
      if (!Array.isArray(utxos)) throw new Error(`Input must be an array.`)

      // Loop through each element in the array and validate the input before
      // further processing.
      for (let i = 0; i < utxos.length; i++) {
        const thisUtxo = utxos[i]

        // Throw error if utxo does not have a satoshis property.
        if (!thisUtxo.satoshis)
          throw new Error(`utxo ${i} does not have a satoshis property.`)

        // Throw error if utxo does not have a txid property.
        if (!thisUtxo.txid)
          throw new Error(`utxo ${i} does not have a txid property.`)
      }

      // Output array
      const outAry = []

      // Loop through each utxo
      for (let i = 0; i < utxos.length; i++) {
        const utxo = utxos[i]
        // console.log(`utxo: ${JSON.stringify(utxo,null,2)}`)

        // Get raw transaction data from the full node and attempt to decode
        // the OP_RETURN data.
        // If there is no OP_RETURN, mark the UTXO as false.
        let slpData: any = false
        try {
          slpData = await this.decodeOpReturn(utxo.txid)
          // console.log(`slpData: ${JSON.stringify(slpData, null, 2)}`)
        } catch (err) {
          // console.log(`decodeOpReturn err: `, err)

          if (
            err.message === "Not an OP_RETURN" ||
            err.message === "Not a SLP OP_RETURN"
          ) {
            // An error will be thrown if the txid is not SLP.
            // Mark as false and continue the loop.
            outAry.push(false)

            continue
          } else {
            throw err
          }
        }

        // If there is an OP_RETURN, attempt to decode it.
        // Handle Genesis SLP transactions.
        if (slpData.transactionType === "genesis") {
          if (
            utxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
            utxo.vout !== 1 // UTXO is not the reciever of the genesis or mint tokens.
          ) {
            // Can safely be marked as false.
            outAry[i] = false
          }

          // If this is a valid SLP UTXO, then return the decoded OP_RETURN data.
          else {
            utxo.tokenType = "minting-baton"
            utxo.tokenId = utxo.txid
            utxo.tokenTicker = slpData.ticker
            utxo.tokenName = slpData.name
            utxo.tokenDocumentUrl = slpData.documentUrl
            utxo.tokenDocumentHash = slpData.documentHash
            utxo.decimals = slpData.decimals

            // something
            outAry[i] = utxo
          }
        }

        // Handle Mint SLP transactions.
        if (slpData.transactionType === "mint") {
          if (
            utxo.vout !== slpData.mintBatonVout && // UTXO is not a mint baton output.
            utxo.vout !== 1 // UTXO is not the reciever of the genesis or mint tokens.
          ) {
            // Can safely be marked as false.
            outAry[i] = false
          }

          // If UTXO passes validation, then return formatted token data.
          else {
            const genesisData = await this.decodeOpReturn(slpData.tokenId)

            // Hydrate the UTXO object with information about the SLP token.
            utxo.utxoType = "token"
            utxo.transactionType = "mint"
            utxo.tokenId = slpData.tokenId

            utxo.tokenTicker = genesisData.ticker
            utxo.tokenName = genesisData.name
            utxo.tokenDocumentUrl = genesisData.documentUrl
            utxo.tokenDocumentHash = genesisData.documentHash
            utxo.decimals = genesisData.decimals

            utxo.mintBatonVout = slpData.mintBatonVout
            utxo.batonStillExists = slpData.batonStillExists

            // Calculate the real token quantity.
            utxo.tokenQty = slpData.quantity / Math.pow(10, utxo.decimals)

            outAry[i] = utxo
          }
        }

        // Handle Send SLP transactions.
        if (slpData.transactionType === "send") {
          // Filter out any vouts that match.
          const voutMatch = slpData.spendData.filter(
            (x: any) => utxo.vout === x.vout
          )
          // console.log(`voutMatch: ${JSON.stringify(voutMatch, null, 2)}`)

          // If there are no vout matches, the UTXO can safely be marked as false.
          if (voutMatch.length === 0) {
            outAry[i] = false
          }

          // If UTXO passes validation, then return formatted token data.
          else {
            const genesisData = await this.decodeOpReturn(slpData.tokenId)
            // console.log(`genesisData: ${JSON.stringify(genesisData, null, 2)}`)

            // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

            // Hydrate the UTXO object with information about the SLP token.
            utxo.utxoType = "token"
            utxo.transactionType = "send"
            utxo.tokenId = slpData.tokenId
            utxo.tokenTicker = genesisData.ticker
            utxo.tokenName = genesisData.name
            utxo.tokenDocumentUrl = genesisData.documentUrl
            utxo.tokenDocumentHash = genesisData.documentHash
            utxo.decimals = genesisData.decimals

            // Calculate the real token quantity.
            utxo.tokenQty = voutMatch[0].quantity / Math.pow(10, utxo.decimals)

            // console.log(`utxo: ${JSON.stringify(utxo, null, 2)}`)

            outAry[i] = utxo
          }
        }

        // Finally, validate the SLP txid with SLPDB.
        if (outAry[i]) {
          const isValid: any = await this.validateTxid(utxo.txid)
          // console.log(`isValid: ${JSON.stringify(isValid, null, 2)}`)

          outAry[i].isValid = isValid[0].valid
        }
      }

      return outAry
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }
}

export default Util
