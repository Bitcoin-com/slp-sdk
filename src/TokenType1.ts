// require deps
const BITBOXSDK: any = require("bitbox-sdk/lib/bitbox-sdk").default
const BigNumber: any = require("bignumber.js")
const slpjs: any = require("slpjs")

// import interfaces
import { ICreateConfig } from "./interfaces/SLPInterfaces"
import { IMintConfig } from "./interfaces/SLPInterfaces"
import { ISendConfig } from "./interfaces/SLPInterfaces"

// import classes
import Address from "./Address"
let addy: any = new Address()

class TokenType1 {
  async create(createConfig: ICreateConfig) {
    let network: string = addy.detectAddressNetwork(createConfig.fundingAddress)
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
    const fundingAddress: string = addy.toSLPAddress(
      createConfig.fundingAddress
    )
    const fundingWif: string = createConfig.fundingWif
    const tokenReceiverAddress: string = addy.toSLPAddress(
      createConfig.tokenReceiverAddress
    )
    let batonReceiverAddress: string
    if (
      createConfig.batonReceiverAddress !== undefined &&
      createConfig.batonReceiverAddress !== "" &&
      createConfig.batonReceiverAddress !== null
    ) {
      batonReceiverAddress = addy.toSLPAddress(
        createConfig.batonReceiverAddress
      )
    } else {
      batonReceiverAddress = null
    }

    const bchChangeReceiverAddress: string = addy.toSLPAddress(
      createConfig.bchChangeReceiverAddress
    )
    const balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      fundingAddress
    )

    const decimals: number = createConfig.decimals
    const name: string = createConfig.name
    const symbol: string = createConfig.symbol
    const documentUri: string = createConfig.documentUri
    const documentHash: any = createConfig.documentHash

    let initialTokenQty: number = createConfig.initialTokenQty

    initialTokenQty = new BigNumber(initialTokenQty).times(10 ** decimals)
    balances.nonSlpUtxos.forEach((txo: any) => (txo.wif = fundingWif))
    const genesisTxid = await bitboxNetwork.simpleTokenGenesis(
      name,
      symbol,
      initialTokenQty,
      documentUri,
      documentHash,
      decimals,
      tokenReceiverAddress,
      batonReceiverAddress,
      bchChangeReceiverAddress,
      balances.nonSlpUtxos
    )
    return genesisTxid[0]
  }

  async mint(mintConfig: IMintConfig) {
    let network: string = addy.detectAddressNetwork(mintConfig.fundingAddress)
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
    const fundingAddress: string = addy.toSLPAddress(mintConfig.fundingAddress)
    const fundingWif: string = mintConfig.fundingWif
    const tokenReceiverAddress: string = addy.toSLPAddress(
      mintConfig.tokenReceiverAddress
    )
    const batonReceiverAddress: string = addy.toSLPAddress(
      mintConfig.batonReceiverAddress
    )
    const bchChangeReceiverAddress: string = addy.toSLPAddress(
      mintConfig.bchChangeReceiverAddress
    )
    const tokenId: string = mintConfig.tokenId
    let additionalTokenQty: number = mintConfig.additionalTokenQty
    let balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      fundingAddress
    )
    if (!balances.slpBatonUtxos[tokenId])
      throw Error("You don't have the minting baton for this token")

    const tokenInfo: any = await bitboxNetwork.getTokenInformation(tokenId)
    let tokenDecimals: number = tokenInfo.decimals

    // 3) Multiply the specified token quantity by 10^(token decimal precision)
    let mintQty = new BigNumber(additionalTokenQty).times(10 ** tokenDecimals)

    // 4) Filter the list to choose ONLY the baton of interest
    // NOTE: (spending other batons for other tokens will result in losing ability to mint those tokens)
    let inputUtxos = balances.slpBatonUtxos[tokenId]

    // 5) Simply sweep our BCH (non-SLP) utxos to fuel the transaction
    inputUtxos = inputUtxos.concat(balances.nonSlpUtxos)

    // 6) Set the proper private key for each Utxo
    inputUtxos.forEach((txo: any) => (txo.wif = fundingWif))

    let mintTxid = await bitboxNetwork.simpleTokenMint(
      tokenId,
      mintQty,
      inputUtxos,
      tokenReceiverAddress,
      batonReceiverAddress,
      bchChangeReceiverAddress
    )
    return mintTxid[0]
  }

  async send(sendConfig: ISendConfig) {
    let network = addy.detectAddressNetwork(sendConfig.fundingAddress)
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
    const bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)

    const fundingAddress: string = addy.toSLPAddress(sendConfig.fundingAddress)
    const fundingWif: string = sendConfig.fundingWif
    const tokenReceiverAddress: string = addy.toSLPAddress(
      sendConfig.tokenReceiverAddress
    )
    const bchChangeReceiverAddress: string = addy.toSLPAddress(
      sendConfig.bchChangeReceiverAddress
    )
    let tokenId: string = sendConfig.tokenId
    let amount: number = sendConfig.amount

    const tokenInfo: any = await bitboxNetwork.getTokenInformation(tokenId)
    let tokenDecimals: number = tokenInfo.decimals

    let balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      fundingAddress
    )

    // 3) Calculate send amount in "Token Satoshis".  In this example we want to just send 1 token unit to someone...
    amount = new BigNumber(amount).times(10 ** tokenDecimals) // Don't forget to account for token precision

    // 4) Get all of our token's UTXOs
    let inputUtxos = balances.slpTokenUtxos[tokenId]

    // 5) Simply sweep our BCH utxos to fuel the transaction
    inputUtxos = inputUtxos.concat(balances.nonSlpUtxos)

    // 6) Set the proper private key for each Utxo
    inputUtxos.forEach((txo: any) => (txo.wif = fundingWif))

    let sendTxid = await bitboxNetwork.simpleTokenSend(
      tokenId,
      amount,
      inputUtxos,
      tokenReceiverAddress,
      bchChangeReceiverAddress
    )
    return sendTxid[0]
  }
}

export default TokenType1
