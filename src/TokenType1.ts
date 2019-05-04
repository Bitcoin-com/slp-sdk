// require deps
const BITBOXSDK: any = require("bitbox-sdk")
const BigNumber: any = require("bignumber.js")
const slpjs: any = require("slpjs")

// import interfaces
import {
  ICreateConfig,
  IMintConfig,
  ISendConfig,
  IBurnConfig
} from "./interfaces/SLPInterfaces"

// import classes
import Address from "./Address"
const addy: any = new Address()

class TokenType1 {
  restURL: string
  constructor(restURL?: string) {
    this.restURL = restURL
  }

  async create(createConfig: ICreateConfig) {
    try {
      // validate address formats
      this.validateAddressFormat(createConfig)

      // determine mainnet/testnet
      const network: string = this.returnNetwork(createConfig.fundingAddress)

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

      const balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
        createConfig.fundingAddress
      )

      let initialTokenQty: number = createConfig.initialTokenQty

      initialTokenQty = new BigNumber(initialTokenQty).times(
        10 ** createConfig.decimals
      )
      balances.nonSlpUtxos.forEach(
        (txo: any) => (txo.wif = createConfig.fundingWif)
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
        balances.nonSlpUtxos
      )
      return genesisTxid
    } catch (error) {
      return error
    }
  }

  async mint(mintConfig: IMintConfig) {
    try {
      // validate address formats
      this.validateAddressFormat(mintConfig)

      // determine mainnet/testnet
      const network: string = this.returnNetwork(mintConfig.fundingAddress)

      // network appropriate BITBOX instance
      const BITBOX: any = this.returnBITBOXInstance(network)

      // slpjs BITBOX Network instance
      const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX)

      const batonReceiverAddress: string = addy.toSLPAddress(
        mintConfig.batonReceiverAddress
      )

      const balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
        mintConfig.fundingAddress
      )
      if (!balances.slpBatonUtxos[mintConfig.tokenId])
        throw Error("You don't have the minting baton for this token")

      const tokenInfo: any = await bitboxNetwork.getTokenInformation(
        mintConfig.tokenId
      )

      const mintQty = new BigNumber(mintConfig.additionalTokenQty).times(
        10 ** tokenInfo.decimals
      )

      let inputUtxos = balances.slpBatonUtxos[mintConfig.tokenId]

      inputUtxos = inputUtxos.concat(balances.nonSlpUtxos)

      inputUtxos.forEach((txo: any) => (txo.wif = mintConfig.fundingWif))

      const mintTxid = await bitboxNetwork.simpleTokenMint(
        mintConfig.tokenId,
        mintQty,
        inputUtxos,
        mintConfig.tokenReceiverAddress,
        batonReceiverAddress,
        mintConfig.bchChangeReceiverAddress
      )
      return mintTxid
    } catch (error) {
      return error
    }
  }

  async send(sendConfig: ISendConfig) {
    try {
      // validate address formats
      this.validateAddressFormat(sendConfig)

      // determine mainnet/testnet
      const network: string = this.returnNetwork(sendConfig.fundingAddress)

      // network appropriate BITBOX instance
      const BITBOX: any = this.returnBITBOXInstance(network)

      // slpjs BITBOX Network instance
      const bitboxNetwork = new slpjs.BitboxNetwork(BITBOX)

      const tokenId: string = sendConfig.tokenId
      let amount: any = sendConfig.amount

      const tokenInfo: any = await bitboxNetwork.getTokenInformation(tokenId)
      const tokenDecimals: number = tokenInfo.decimals

      const balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
        sendConfig.fundingAddress
      )

      const bchChangeReceiverAddress: string = addy.toSLPAddress(
        sendConfig.bchChangeReceiverAddress
      )

      if (!Array.isArray(amount)) {
        amount = new BigNumber(amount).times(10 ** tokenDecimals) // Don't forget to account for token precision
      } else {
        amount.forEach((amt: number, index: number) => {
          amount[index] = new BigNumber(amt).times(10 ** tokenDecimals) // Don't forget to account for token precision
        })
      }

      let inputUtxos = balances.slpTokenUtxos[tokenId]

      inputUtxos = inputUtxos.concat(balances.nonSlpUtxos)

      inputUtxos.forEach((txo: any) => (txo.wif = sendConfig.fundingWif))

      const sendTxid = await bitboxNetwork.simpleTokenSend(
        tokenId,
        amount,
        inputUtxos,
        sendConfig.tokenReceiverAddress,
        bchChangeReceiverAddress
      )
      return sendTxid
    } catch (error) {
      return error
    }
  }

  async burn(burnConfig: IBurnConfig) {
    try {
      // validate address formats
      this.validateAddressFormat(burnConfig)

      // determine mainnet/testnet
      const network: string = this.returnNetwork(burnConfig.fundingAddress)

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
        burnConfig.fundingAddress
      )
      const amount = new BigNumber(burnConfig.amount).times(10 ** tokenDecimals)
      let inputUtxos = balances.slpTokenUtxos[burnConfig.tokenId]

      inputUtxos = inputUtxos.concat(balances.nonSlpUtxos)

      inputUtxos.forEach((txo: any) => (txo.wif = burnConfig.fundingWif))
      const burnTxid = await bitboxNetwork.simpleTokenBurn(
        burnConfig.tokenId,
        amount,
        inputUtxos,
        bchChangeReceiverAddress
      )
      return burnTxid
    } catch (error) {
      return error
    }
  }

  returnNetwork(address: string): string {
    return addy.detectAddressNetwork(address)
  }

  returnBITBOXInstance(network: string): any {
    let tmpBITBOX: any

    let restURL: string
    if (network === "mainnet") restURL = "https://rest.bitcoin.com/v2/"
    else restURL = "https://trest.bitcoin.com/v2/"

    return new BITBOXSDK({ restURL: restURL })
  }

  validateAddressFormat(config: any): string | void {
    // validate address formats
    // fundingAddress, tokenReceiverAddress and batonReceiverAddress must be simpleledger format
    // bchChangeReceiverAddress can be either simpleledger or cashAddr format
    // validate fundingAddress format
    if (!addy.isSLPAddress(config.fundingAddress))
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
