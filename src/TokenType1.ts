const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
const BigNumber = require("bignumber.js")
const slpjs = require("slpjs").slpjs
import Address from "./Address"
let addy = new Address()
import { ICreateConfig } from "./interfaces/ICreateConfig"
import { IMintConfig } from "./interfaces/IMintConfig"
import { ISendConfig } from "./interfaces/ISendConfig"

class TokenType1 {
  async create(createConfig: ICreateConfig) {
    let network = addy.detectAddressNetwork(createConfig.fundingAddress)
    let tmpBITBOX
    let path
    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
      path = "https://validate.simpleledger.info"
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
      path = "https://testnet-validate.simpleledger.info"
    }
    const slpValidator = new slpjs.JsonRpcProxyValidator(tmpBITBOX, path)
    const bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)
    const fundingAddress: string = createConfig.fundingAddress
    const fundingWif: string = createConfig.fundingWif
    const tokenReceiverAddress: string = createConfig.tokenReceiverAddress
    const batonReceiverAddress: string = createConfig.batonReceiverAddress
    const bchChangeReceiverAddress: string =
      createConfig.bchChangeReceiverAddress
    const balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      fundingAddress
    )

    const decimals: number = createConfig.decimals
    const name: string = createConfig.name
    const ticker: string = createConfig.ticker
    const documentUri: string = createConfig.documentUri
    const documentHash: any = createConfig.documentHash

    let initialTokenQty: number = createConfig.initialTokenQty

    initialTokenQty = new BigNumber(initialTokenQty).times(10 ** decimals)
    balances.nonSlpUtxos.forEach((txo: any) => (txo.wif = fundingWif))
    const genesisTxid = await bitboxNetwork.simpleTokenGenesis(
      name,
      ticker,
      initialTokenQty,
      documentUri,
      documentHash,
      decimals,
      tokenReceiverAddress,
      batonReceiverAddress,
      bchChangeReceiverAddress,
      balances.nonSlpUtxos
    )
    return genesisTxid
  }

  async mint(mintConfig: IMintConfig) {
    let network = addy.detectAddressNetwork(mintConfig.fundingAddress)
    let tmpBITBOX
    let path
    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
      path = "https://validate.simpleledger.info"
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
      path = "https://testnet-validate.simpleledger.info"
    }
    const slpValidator = new slpjs.JsonRpcProxyValidator(tmpBITBOX, path)
    const bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)
    const fundingAddress = mintConfig.fundingAddress
    const fundingWif = mintConfig.fundingWif
    const tokenReceiverAddress = mintConfig.tokenReceiverAddress
    const batonReceiverAddress = mintConfig.batonReceiverAddress
    const bchChangeReceiverAddress = mintConfig.bchChangeReceiverAddress
    const tokenIdHexToMint = mintConfig.tokenIdHexToMint
    let additionalTokenQty = mintConfig.additionalTokenQty
    let balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)
    if (!balances.slpBatonUtxos[tokenIdHexToMint])
      throw Error("You don't have the minting baton for this token")

    const tokenInfo = await bitboxNetwork.getTokenInformation(tokenIdHexToMint)
    let tokenDecimals = tokenInfo.decimals

    // 3) Multiply the specified token quantity by 10^(token decimal precision)
    let mintQty = new BigNumber(additionalTokenQty).times(10 ** tokenDecimals)

    // 4) Filter the list to choose ONLY the baton of interest
    // NOTE: (spending other batons for other tokens will result in losing ability to mint those tokens)
    let inputUtxos = balances.slpBatonUtxos[tokenIdHexToMint]

    // 5) Simply sweep our BCH (non-SLP) utxos to fuel the transaction
    inputUtxos = inputUtxos.concat(balances.nonSlpUtxos)

    // 6) Set the proper private key for each Utxo
    inputUtxos.forEach((txo: any) => (txo.wif = fundingWif))

    let mintTxid = await bitboxNetwork.simpleTokenMint(
      tokenIdHexToMint,
      mintQty,
      inputUtxos,
      tokenReceiverAddress,
      batonReceiverAddress,
      bchChangeReceiverAddress
    )
    return mintTxid
  }

  async send(sendConfig: ISendConfig) {
    let network = addy.detectAddressNetwork(sendConfig.fundingAddress)
    let tmpBITBOX
    let path
    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
      path = "https://validate.simpleledger.info"
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
      path = "https://testnet-validate.simpleledger.info"
    }
    const slpValidator = new slpjs.JsonRpcProxyValidator(tmpBITBOX, path)
    const bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)

    const fundingAddress = sendConfig.fundingAddress
    const fundingWif = sendConfig.fundingWif
    const tokenReceiverAddress = sendConfig.tokenReceiverAddress
    const bchChangeReceiverAddress = sendConfig.bchChangeReceiverAddress
    let tokenId = sendConfig.tokenId
    let sendAmount = sendConfig.sendAmount

    const tokenInfo = await bitboxNetwork.getTokenInformation(tokenId)
    let tokenDecimals = tokenInfo.decimals

    let balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)

    // 3) Calculate send amount in "Token Satoshis".  In this example we want to just send 1 token unit to someone...
    sendAmount = new BigNumber(sendAmount).times(10 ** tokenDecimals) // Don't forget to account for token precision

    // 4) Get all of our token's UTXOs
    let inputUtxos = balances.slpTokenUtxos[tokenId]

    // 5) Simply sweep our BCH utxos to fuel the transaction
    inputUtxos = inputUtxos.concat(balances.nonSlpUtxos)

    // 6) Set the proper private key for each Utxo
    inputUtxos.forEach((txo: any) => (txo.wif = fundingWif))

    let sendTxid = await bitboxNetwork.simpleTokenSend(
      tokenId,
      sendAmount,
      inputUtxos,
      tokenReceiverAddress,
      bchChangeReceiverAddress
    )
    return sendTxid
  }

  // lokadIdHex(): string {
  //   return "534c5000"
  // }
  //
  // buildGenesisOpReturn(
  //   ticker: any,
  //   name: any,
  //   documentUrl: any,
  //   documentHash: any,
  //   decimals: any,
  //   batonVout: any,
  //   initialQuantity: any
  // ): any {
  //   return slptokentype1.buildGenesisOpReturn(
  //     ticker,
  //     name,
  //     documentUrl,
  //     documentHash,
  //     decimals,
  //     batonVout,
  //     initialQuantity
  //   )
  // }
  //
  // buildSendOpReturn(tokenIdHex: any, outputQtyArray: any): any {
  //   return slptokentype1.buildSendOpReturn(tokenIdHex, outputQtyArray)
  // }
  //
  // buildRawGenesisTx(config: any, type: any): any {
  //   return slp.buildRawGenesisTx(config, type)
  // }
  //
  // buildRawSendTx(config: any, type: any): any {
  //   return slptokentype1.buildRawSendTx(config, type)
  // }
  //
  // decodeTxOut(txOut: any): any {
  //   return slptokentype1.decodeTxOut(txOut)
  // }
  //
  // decodeMetadata(txDetails: any): any {
  //   return slptokentype1.decodeMetadata(txDetails)
  // }
  //
  // calculateGenesisCost(
  //   genesisOpReturnLength: any,
  //   inputUtxoSize: any,
  //   batonAddress: any = null,
  //   bchChangeAddress: any = null,
  //   feeRate: any = 1
  // ): any {
  //   return slptokentype1.calculateGenesisCost(
  //     genesisOpReturnLength,
  //     inputUtxoSize,
  //     batonAddress,
  //     bchChangeAddress,
  //     feeRate
  //   )
  // }
  //
  // calculateSendCost(
  //   sendOpReturnLength: any,
  //   inputUtxoSize: any,
  //   outputAddressArraySize: any,
  //   bchChangeAddress: any = null,
  //   feeRate: any = 1
  // ): any {
  //   return slptokentype1.calculateSendCost(
  //     sendOpReturnLength,
  //     inputUtxoSize,
  //     outputAddressArraySize,
  //     bchChangeAddress,
  //     feeRate
  //   )
  // }
}

export default TokenType1
