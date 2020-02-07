// require deps
// imports
import { BITBOX } from "bitbox-sdk"
import Address from "./Address"
import {
  IBurnConfig,
  ICreateConfig,
  IMintConfig,
  ISendConfig
} from "./interfaces/SLPInterfaces"

// consts
const BigNumber: any = require("bignumber.js")
const slpjs: any = require("slpjs")
const addy: any = new Address()

class TokenType1 {
  restURL: string
  constructor(restURL?: string) {
    this.restURL = restURL
  }

  async create(createConfig: ICreateConfig) {
    // validate address formats
    this.validateAddressFormat(createConfig)

    // normalize funding properties
    const fundingAddresses = [].concat(createConfig.fundingAddress);
    const fundingWifs = [].concat(createConfig.fundingWif);

    // determine mainnet/testnet
    const network: string = this.returnNetwork(fundingAddresses[0]);

    // network appropriate BITBOX instance
    const BITBOX: any = this.returnBITBOXInstance(network)

    // slpjs BITBOX Network instance
    const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX)

    let batonReceiverAddress: string
    if (
      createConfig.batonReceiverAddress !== undefined &&
      createConfig.batonReceiverAddress !== "" &&
      createConfig.batonReceiverAddress !== null
    )
      batonReceiverAddress = createConfig.batonReceiverAddress
    else batonReceiverAddress = null

    let balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      fundingAddresses
    );

    let initialTokenQty: number = createConfig.initialTokenQty

    initialTokenQty = new BigNumber(initialTokenQty).times(
      10 ** createConfig.decimals
    )
    const nonSlpUtxos = balances.reduce(
      (previousNonSlpUtxos: any, currentBalance: any, index: number) => [
        ...previousNonSlpUtxos,
        ...currentBalance.result.nonSlpUtxos.map((utxo: any) => ({
          ...utxo,
          wif: fundingWifs[index]
        }))
      ],
      []
    )
    const genesisTxid = await bitboxNetwork.simpleTokenGenesis(
      createConfig.name,
      createConfig.symbol,
      initialTokenQty,
      createConfig.documentUri,
      createConfig.documentHash,
      createConfig.decimals,
      createConfig.tokenReceiverAddress,
      batonReceiverAddress,
      createConfig.bchChangeReceiverAddress,
      nonSlpUtxos
    )
    return genesisTxid
  }

  async mint(mintConfig: IMintConfig) {
    // validate address formats
    this.validateAddressFormat(mintConfig)

    // normalize funding properties
    const fundingAddresses = [].concat(mintConfig.fundingAddress);
    const fundingWifs = [].concat(mintConfig.fundingWif);

    // determine mainnet/testnet
    const network: string = this.returnNetwork(fundingAddresses[0]);

    // network appropriate BITBOX instance
    const BITBOX: any = this.returnBITBOXInstance(network)

    // slpjs BITBOX Network instance
    const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX)

    const batonReceiverAddress: string = addy.toSLPAddress(
      mintConfig.batonReceiverAddress
    )

    let balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      fundingAddresses
    )

    let balanceWithBaton = balances
      .find((balance: any) => balance.result.slpBatonUtxos[mintConfig.tokenId]);

    if (!balanceWithBaton)
      throw Error("You don't have the minting baton for this token")

    const tokenInfo: any = await bitboxNetwork.getTokenInformation(
      mintConfig.tokenId
    )

    const mintQty = new BigNumber(mintConfig.additionalTokenQty).times(
      10 ** tokenInfo.decimals
    )

    const nonSlpUtxos = balances.reduce(
      (previousNonSlpUtxos: any, currentBalance: any, index: number) => [
        ...previousNonSlpUtxos,
        ...currentBalance.result.nonSlpUtxos.map((utxo: any) => ({
          ...utxo,
          wif: fundingWifs[index]
        }))
      ],
      []
    )

    const slpBatonUtxos = balanceWithBaton
      .result
      .slpBatonUtxos[mintConfig.tokenId]
      .map((utxo: any) => ({ ...utxo, wif: fundingWifs[balances.indexOf(balanceWithBaton)] }))

    const inputUtxos = [...nonSlpUtxos, ...slpBatonUtxos];

    const mintTxid = await bitboxNetwork.simpleTokenMint(
      mintConfig.tokenId,
      mintQty,
      inputUtxos,
      mintConfig.tokenReceiverAddress,
      batonReceiverAddress,
      mintConfig.bchChangeReceiverAddress
    )
    return mintTxid
  }

  async send(sendConfig: ISendConfig) {
    // validate address formats
    this.validateAddressFormat(sendConfig)

    // normalize funding properties
    const fundingAddresses = [].concat(sendConfig.fundingAddress);
    const fundingWifs = [].concat(sendConfig.fundingWif);

    // determine mainnet/testnet
    const network: string = this.returnNetwork(fundingAddresses[0]);

    // network appropriate BITBOX instance
    const BITBOX: any = this.returnBITBOXInstance(network)

    // slpjs BITBOX Network instance
    const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX)

    const tokenId: string = sendConfig.tokenId

    const bchChangeReceiverAddress: string = addy.toSLPAddress(
      sendConfig.bchChangeReceiverAddress
    )

    const tokenInfo: any = await bitboxNetwork.getTokenInformation(tokenId)
    const tokenDecimals: number = tokenInfo.decimals

    let amount: any = sendConfig.amount

    const balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      fundingAddresses
    )

    if (!Array.isArray(amount)) {
      amount = new BigNumber(amount).times(10 ** tokenDecimals) // Don't forget to account for token precision
    } else {
      amount.forEach((amt: number, index: number) => {
        amount[index] = new BigNumber(amt).times(10 ** tokenDecimals) // Don't forget to account for token precision
      })
    }

    const nonSlpUtxos = balances.reduce(
      (previousNonSlpUtxos: any, currentBalance: any, index: number) => [
        ...previousNonSlpUtxos,
        ...currentBalance.result.nonSlpUtxos.map((utxo: any) => ({
          ...utxo,
          wif: fundingWifs[index]
        }))
      ],
      []
    )

    const slpTokenUtxos = balances.reduce(
      (previousSlpTokenUtxos: any, currentBalance: any, index: number) => [
        ...previousSlpTokenUtxos,
        ...(currentBalance.result.slpTokenUtxos[tokenId] || []).map((utxo: any) => ({
          ...utxo,
          wif: fundingWifs[index]
        }))
      ],
      []
    )

    if(slpTokenUtxos.length === 0) throw new Error(`Could not find any SLP token UTXOs`)

    const inputUtxos = [...nonSlpUtxos, ...slpTokenUtxos]

    const sendTxid = await bitboxNetwork.simpleTokenSend(
      tokenId,
      amount,
      inputUtxos,
      sendConfig.tokenReceiverAddress,
      bchChangeReceiverAddress
    )

    return sendTxid
  }

  async burn(burnConfig: IBurnConfig) {
    // validate address formats
    this.validateAddressFormat(burnConfig)

    // normalize funding properties
    const fundingAddresses = [].concat(burnConfig.fundingAddress);
    const fundingWifs = [].concat(burnConfig.fundingWif);

    // determine mainnet/testnet
    const network: string = this.returnNetwork(fundingAddresses[0]);

    // network appropriate BITBOX instance
    const BITBOX: any = this.returnBITBOXInstance(network)

    // slpjs BITBOX Network instance
    const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX)

    const bchChangeReceiverAddress: string = addy.toSLPAddress(
      burnConfig.bchChangeReceiverAddress
    )
    const tokenInfo = await bitboxNetwork.getTokenInformation(
      burnConfig.tokenId
    )
    const tokenDecimals = tokenInfo.decimals
    const balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      fundingAddresses
    )
    const amount = new BigNumber(burnConfig.amount).times(10 ** tokenDecimals)

    const nonSlpUtxos = balances.reduce(
      (previousNonSlpUtxos: any, currentBalance: any, index: number) => [
        ...previousNonSlpUtxos,
        ...currentBalance.result.nonSlpUtxos.map((utxo: any) => ({
          ...utxo,
          wif: fundingWifs[index]
        }))
      ],
      []
    )

    const slpTokenUtxos = balances.reduce(
      (previousSlpTokenUtxos: any, currentBalance: any, index: number) => [
        ...previousSlpTokenUtxos,
        ...(currentBalance.result.slpTokenUtxos[burnConfig.tokenId] || []).map((utxo: any) => ({
          ...utxo,
          wif: fundingWifs[index]
        }))
      ],
      []
    )

    const inputUtxos = [...nonSlpUtxos, ...slpTokenUtxos]

    const burnTxid = await bitboxNetwork.simpleTokenBurn(
      burnConfig.tokenId,
      amount,
      inputUtxos,
      bchChangeReceiverAddress
    )

    return burnTxid
  }

  returnNetwork(address: string): string {
    return addy.detectAddressNetwork(address)
  }

  returnBITBOXInstance(network: string): any {
    let tmpBITBOX: any

    let restURL: string
    if (network === "mainnet") restURL = "https://rest.bitcoin.com/v2/"
    else restURL = "https://trest.bitcoin.com/v2/"

    return new BITBOX({ restURL: restURL })
  }

  validateAddressFormat(config: any): string | void {
    // validate address formats
    // fundingAddress, tokenReceiverAddress and batonReceiverAddress must be simpleledger format
    // bchChangeReceiverAddress can be either simpleledger or cashAddr format
    // validate fundingAddress format

    // bulk fundingAddress
    if (config.fundingAddress && Array.isArray(config.fundingAddress)) {
      config.fundingAddress.forEach((address: string) => {
        if (!addy.isSLPAddress(address))
          throw Error("Funding Address must be simpleledger format")
      })
    } else if (!config.fundingAddress || !addy.isSLPAddress(config.fundingAddress))
      throw Error("Funding Address must be simpleledger format")

    // validate tokenReceiverAddress format
    // single tokenReceiverAddress
    if (
      config.tokenReceiverAddress &&
      !addy.isSLPAddress(config.tokenReceiverAddress)
    )
      throw Error("Token Receiver Address must be simpleledger format")

    // bulk tokenReceiverAddress
    if (
      config.tokenReceiverAddress &&
      Array.isArray(config.tokenReceiverAddress)
    ) {
      config.tokenReceiverAddress.forEach((address: string) => {
        if (!addy.isSLPAddress(address))
          throw Error("Token Receiver Address must be simpleledger format")
      })
    }

    // validate bchChangeReceiverAddress format
    if (
      config.bchChangeReceiverAddress &&
      !addy.isCashAddress(config.bchChangeReceiverAddress)
    )
      throw Error("BCH Change Receiver Address must be cash address format")

    // validate batonReceiverAddress format
    if (
      config.batonReceiverAddress &&
      !addy.isSLPAddress(config.batonReceiverAddress)
    )
      throw Error("Baton Receiver Address must be simpleledger format")
  }
}

export default TokenType1
