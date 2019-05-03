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

      const tmpBITBOX: any = this.returnBITBOXInstance(
        createConfig.fundingAddress
      )
      const bitboxNetwork: any = new slpjs.BitboxNetwork(tmpBITBOX)
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
      return genesisTxid
    } catch (error) {
      return error
    }
  }

  async mint(mintConfig: IMintConfig) {
    try {
      // validate address formats
      this.validateAddressFormat(mintConfig)

      const tmpBITBOX: any = this.returnBITBOXInstance(
        mintConfig.fundingAddress
      )
      const bitboxNetwork: any = new slpjs.BitboxNetwork(tmpBITBOX)
      const fundingAddress: string = addy.toSLPAddress(
        mintConfig.fundingAddress
      )
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
      const additionalTokenQty: number = mintConfig.additionalTokenQty
      const balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
        fundingAddress
      )
      if (!balances.slpBatonUtxos[tokenId])
        throw Error("You don't have the minting baton for this token")

      const tokenInfo: any = await bitboxNetwork.getTokenInformation(tokenId)
      const tokenDecimals: number = tokenInfo.decimals

      // 3) Multiply the specified token quantity by 10^(token decimal precision)
      const mintQty = new BigNumber(additionalTokenQty).times(
        10 ** tokenDecimals
      )

      // 4) Filter the list to choose ONLY the baton of interest
      // NOTE: (spending other batons for other tokens will result in losing ability to mint those tokens)
      let inputUtxos = balances.slpBatonUtxos[tokenId]

      // 5) Simply sweep our BCH (non-SLP) utxos to fuel the transaction
      inputUtxos = inputUtxos.concat(balances.nonSlpUtxos)

      // 6) Set the proper private key for each Utxo
      inputUtxos.forEach((txo: any) => (txo.wif = fundingWif))

      const mintTxid = await bitboxNetwork.simpleTokenMint(
        tokenId,
        mintQty,
        inputUtxos,
        tokenReceiverAddress,
        batonReceiverAddress,
        bchChangeReceiverAddress
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

      const tmpBITBOX: any = this.returnBITBOXInstance(
        sendConfig.fundingAddress
      )

      const bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX)

      const fundingAddress: string = addy.toSLPAddress(
        sendConfig.fundingAddress
      )
      const fundingWif: string = sendConfig.fundingWif
      const tokenReceiverAddress: string | string[] =
        sendConfig.tokenReceiverAddress

      const bchChangeReceiverAddress: string = addy.toSLPAddress(
        sendConfig.bchChangeReceiverAddress
      )
      const tokenId: string = sendConfig.tokenId
      let amount: any = sendConfig.amount

      const tokenInfo: any = await bitboxNetwork.getTokenInformation(tokenId)
      const tokenDecimals: number = tokenInfo.decimals

      const balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
        fundingAddress
      )

      // 3) Calculate send amount in "Token Satoshis".  In this example we want to just send 1 token unit to someone...
      if (!Array.isArray(amount)) {
        amount = new BigNumber(amount).times(10 ** tokenDecimals) // Don't forget to account for token precision
      } else {
        amount.forEach((amt: number, index: number) => {
          amount[index] = new BigNumber(amt).times(10 ** tokenDecimals) // Don't forget to account for token precision
        })
      }

      // 4) Get all of our token's UTXOs
      let inputUtxos = balances.slpTokenUtxos[tokenId]

      // 5) Simply sweep our BCH utxos to fuel the transaction
      inputUtxos = inputUtxos.concat(balances.nonSlpUtxos)

      // 6) Set the proper private key for each Utxo
      inputUtxos.forEach((txo: any) => (txo.wif = fundingWif))

      const sendTxid = await bitboxNetwork.simpleTokenSend(
        tokenId,
        amount,
        inputUtxos,
        tokenReceiverAddress,
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

      const tmpBITBOX: any = this.returnBITBOXInstance(
        burnConfig.fundingAddress
      )
      const bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX)
      const fundingAddress: string = addy.toSLPAddress(
        burnConfig.fundingAddress
      )
      const bchChangeReceiverAddress: string = addy.toSLPAddress(
        burnConfig.bchChangeReceiverAddress
      )
      const tokenInfo = await bitboxNetwork.getTokenInformation(
        burnConfig.tokenId
      )
      const tokenDecimals = tokenInfo.decimals
      const balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(
        fundingAddress
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

  returnBITBOXInstance(address: string): any {
    const network: string = this.returnNetwork(address)
    let tmpBITBOX: any

    if (network === "mainnet")
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    else tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })

    return tmpBITBOX
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
      !addy.isSLPAddress(config.bchChangeReceiverAddress) &&
      !addy.isCashAddress(config.bchChangeReceiverAddress)
    ) {
      throw Error(
        "BCH Change Receiver Address must be cashAddr or simpleledger format"
      )
    }

    // validate batonReceiverAddress format
    if (
      config.batonReceiverAddress &&
      !addy.isSLPAddress(config.batonReceiverAddress)
    )
      throw Error("Baton Receiver Address must be simpleledger format")
  }
}

export default TokenType1
