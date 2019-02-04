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
    let network: string = addy.detectAddressNetwork(createConfig.fundingAddress)
    let tmpBITBOX: any
    let path: string
    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
      path = "https://validate.simpleledger.info"
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
      path = "https://testnet-validate.simpleledger.info"
    }
    const slpValidator: any = new slpjs.JsonRpcProxyValidator(tmpBITBOX, path)
    const bitboxNetwork: any = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)
    const fundingAddress: string = addy.toSLPAddress(
      createConfig.fundingAddress
    )
    const fundingWif: string = createConfig.fundingWif
    const tokenReceiverAddress: string = addy.toSLPAddress(
      createConfig.tokenReceiverAddress
    )
    const batonReceiverAddress: string = addy.toSLPAddress(
      createConfig.batonReceiverAddress
    )
    const bchChangeReceiverAddress: string = addy.toSLPAddress(
      createConfig.bchChangeReceiverAddress
    )
    const balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
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
    return genesisTxid[0]
  }

  async mint(mintConfig: IMintConfig) {
    let network: string = addy.detectAddressNetwork(mintConfig.fundingAddress)
    let tmpBITBOX: any
    let path: string
    if (network === "mainnet") {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
      path = "https://validate.simpleledger.info"
    } else {
      tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })
      path = "https://testnet-validate.simpleledger.info"
    }
    const slpValidator: any = new slpjs.JsonRpcProxyValidator(tmpBITBOX, path)
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
