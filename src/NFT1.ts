// require deps
// imports
import { GrpcClient } from "grpc-bchrpc-node"
import {
  BitboxNetwork,
  GetRawTransactionsAsync,
  LocalValidator,
  SlpAddressUtxoResult,
  SlpBalancesResult
} from "../index"
import Address from "./Address"
import {
  returnBITBOXInstance,
  returnNetwork,
  validateAddressFormat
} from "./common"
import { INFTConfig } from "./interfaces/SLPInterfaces"

// consts
const BigNumber: any = require("bignumber.js")
const slpjs: any = require("slpjs")
const addy: any = new Address()

class NFT1 {
  restURL: string
  constructor(restURL?: string) {
    this.restURL = restURL
  }

  async create(nftConfig: INFTConfig) {
    // validate address formats
    validateAddressFormat(nftConfig)

    // determine mainnet/testnet
    const network: string = returnNetwork(nftConfig.fundingAddress)

    // // network appropriate BITBOX instance
    const BITBOX: any = returnBITBOXInstance(network)

    // // slpjs BITBOX Network instance
    const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX)
    console.log("yy")
    // 1) Get all balances at the funding address.
    let balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      nftConfig.fundingAddress
    )
    console.log("'balances' variable is set.")
    console.log("BCH balance:", balances.satoshis_available_bch)

    // 2) Calculate the token quantity with decimal precision included
    let initialTokenQtyBN = new BigNumber(nftConfig.initialTokenQty)

    // 3) Set private keys
    balances!.nonSlpUtxos.forEach(
      (txo: any) => (txo.wif = nftConfig.fundingWif)
    )

    // 4) Use "simpleTokenGenesis()" helper method
    let genesisTxid = await bitboxNetwork.simpleNFT1ParentGenesis(
      nftConfig.name,
      nftConfig.symbol,
      initialTokenQtyBN,
      nftConfig.documentUri,
      nftConfig.documentHash,
      nftConfig.tokenReceiverAddress,
      nftConfig.batonReceiverAddress,
      nftConfig.bchChangeReceiverAddress,
      balances!.nonSlpUtxos
    )
    return genesisTxid
  }

  async mint(nftConfig: INFTConfig) {
    // validate address formats
    validateAddressFormat(nftConfig)

    // determine mainnet/testnet
    const network: string = returnNetwork(nftConfig.fundingAddress)

    // // network appropriate BITBOX instance
    const BITBOX: any = returnBITBOXInstance(network)

    // // slpjs BITBOX Network instance
    let grpc = new GrpcClient()
    const getRawTransactions: GetRawTransactionsAsync = async function(
      txids: string[]
    ) {
      let txid = txids[0]
      let res = await grpc.getRawTransaction({ hash: txid, reverseOrder: true })
      return [Buffer.from(res.getTransaction_asU8()).toString("hex")]
      //return <string[]>await BITBOX.RawTransactions.getRawTransaction(txids)  // <--- alternative to gRPC
    }
    const logger = console
    const slpValidator = new LocalValidator(BITBOX, getRawTransactions, logger)
    const bitboxNetwork = new BitboxNetwork(BITBOX, slpValidator)

    // Get all balances at the funding address.
    let balances = <SlpBalancesResult>(
      await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)
    )
    console.log("'balances' variable is set.")
    console.log("BCH balance:", balances.satoshis_available_bch)

    // Look at the NFT1 Parent token balance.  Make sure its greater than 0.
    if (
      !balances.slpTokenBalances[NFT1ParentGroupID] ||
      !balances.slpTokenBalances[NFT1ParentGroupID].isGreaterThan(0)
    ) {
      throw Error(
        "Insufficient balance of NFT1 tokens, first you need to create NFT1 parent at this address."
      )
    }

    // Try to find an NFT parent that has quantity equal to 1
    let utxo: SlpAddressUtxoResult | undefined
    balances.slpTokenUtxos[NFT1ParentGroupID].forEach(txo => {
      if (!utxo && txo.slpUtxoJudgementAmount.isEqualTo(1)) {
        utxo = txo
      }
    })

    // If there wasn't any NFT1 parent UTXO with quantity of 1, so we create a TXO w/ qty 1 to be burned.
    if (!utxo) {
      let inputs = [
        ...balances.nonSlpUtxos,
        ...balances.slpTokenUtxos[NFT1ParentGroupID]
      ]
      inputs.map(txo => (txo.wif = fundingWif))
      let sendTxid = await bitboxNetwork.simpleTokenSend(
        NFT1ParentGroupID,
        new BigNumber(1),
        inputs,
        tokenReceiverAddress,
        tokenReceiverAddress
      )

      // wait for transaction to hit the full node.
      console.log("Created new parent UTXO to burn:", sendTxid)
      console.log("Waiting for the Full Node to sync with transaction...")
      await sleep(3000)

      // update balances and set the newly created parent TXO.
      balances = <SlpBalancesResult>(
        await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)
      )
      balances.slpTokenUtxos[NFT1ParentGroupID].forEach(txo => {
        if (!utxo && txo.slpUtxoJudgementAmount.isEqualTo(1)) {
          utxo = txo
        }
      })
    }

    // 3) Set private keys
    let inputs = [utxo!, ...balances.nonSlpUtxos]
    inputs.map(txo => (txo.wif = fundingWif))

    // 4) Use "simpleTokenGenesis()" helper method
    let genesisTxid = await bitboxNetwork.simpleNFT1ChildGenesis(
      NFT1ParentGroupID,
      name,
      ticker,
      documentUri,
      documentHash,
      tokenReceiverAddress,
      bchChangeReceiverAddress,
      inputs
    )
    console.log("NFT1 Child GENESIS txn complete:", genesisTxid)
  }
}

export default NFT1
