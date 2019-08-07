// require deps
// imports
import { BITBOX } from "bitbox-sdk";
import Address from "./Address";
import { IBurnConfig, ICreateConfig, IMintConfig, ISendConfig, P2SHConfig } from "./interfaces/SLPInterfaces";

// consts
const BigNumber: any = require("bignumber.js")
const slpjs: any = require("slpjs")
const addy: any = new Address()

class TokenType1 {
  restURL: string
  constructor(restURL?: string) {
    this.restURL = restURL
  }

  async p2sh(p2shConfig: P2SHConfig): Promise<string> {
    const wif: string = p2shConfig.wif
    const tokenReceiverAddress: string[] = p2shConfig.tokenReceiverAddress
    const bchChangeReceiverAddress: string = p2shConfig.bchChangeReceiverAddress
    let tokenId: string = p2shConfig.tokenId
    let sendAmounts: number[] = p2shConfig.sendAmounts
    let redeemScript: Buffer = p2shConfig.redeemScript

    // determine mainnet/testnet
    const network: string = this.returnNetwork(bchChangeReceiverAddress)

    // network appropriate BITBOX instance
    const bitbox: BITBOX = this.returnBITBOXInstance(network)
    const slp: any = new slpjs.Slp(bitbox)
    const helpers: any = new slpjs.TransactionHelpers(slp)

    // Calculate the address for this script contract
    // We need to send some token and BCH to it before we can spend it!
    let fundingAddress: string = slpjs.Utils.slpAddressFromHash160(
      bitbox.Crypto.hash160(redeemScript),
      network,
      "p2sh"
    )
    const bitboxNetwork: any = new slpjs.BitboxNetwork(bitbox)

    // Fetch critical token information
    let tokenDecimals: number = 0
    const tokenInfo: any = await bitboxNetwork.getTokenInformation(tokenId)
    tokenDecimals = tokenInfo.decimals

    // Check that token balance is greater than our desired sendAmount
    let balances: any
    balances = await bitboxNetwork.getAllSlpBalancesAndUtxos(fundingAddress)
    if (balances.slpTokenBalances[tokenId] === undefined)
      console.log(
        "You need to fund the addresses provided in this example with tokens and BCH.  Change the tokenId as required."
      )
    console.log(
      "Token balance:",
      balances.slpTokenBalances[tokenId].toFixed() / 10 ** tokenDecimals
    )

    // Calculate send amount in "Token Satoshis".  In this example we want to just send 1 token unit to someone...
    sendAmounts = sendAmounts.map(a =>
      new BigNumber(a).times(10 ** tokenDecimals)
    ) // Don't forget to account for token precision

    // Get all of our token's UTXOs
    let inputUtxos: any = balances.slpTokenUtxos[tokenId]

    // Simply sweep our BCH utxos to fuel the transaction
    inputUtxos = inputUtxos.concat(balances.nonSlpUtxos)

    // Estimate the additional fee for our larger p2sh scriptSigs
    let extraFee: number = 8 * inputUtxos.length // for OP_CTLV and timelock data push // this many times since we swept inputs from p2sh address

    // Build an unsigned transaction
    let unsignedTxnHex: any = helpers.simpleTokenSend(
      tokenId,
      sendAmounts,
      inputUtxos,
      tokenReceiverAddress,
      bchChangeReceiverAddress,
      [],
      extraFee
    )
    unsignedTxnHex = helpers.enableInputsCLTV(unsignedTxnHex)
    unsignedTxnHex = helpers.setTxnLocktime(unsignedTxnHex, p2shConfig.locktime)

    // Build scriptSigs
    let scriptSigs: any = inputUtxos.map((txo: any, i: any) => {
      let sigObj: any = helpers.get_transaction_sig_p2sh(
        unsignedTxnHex,
        wif,
        i,
        txo.satoshis,
        redeemScript
      )
      return {
        index: i,
        lockingScriptBuf: redeemScript,
        unlockingScriptBufArray: [sigObj.signatureBuf]
      }
    })

    let signedTxn: any = helpers.addScriptSigs(unsignedTxnHex, scriptSigs)

    // 11) Send token
    return await bitboxNetwork.sendTx(signedTxn)
  }

  async create(createConfig: ICreateConfig) {
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
  }

  async mint(mintConfig: IMintConfig) {
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
  }

  async send(sendConfig: ISendConfig) {
    // validate address formats
    this.validateAddressFormat(sendConfig)

    // determine mainnet/testnet
    let network: string
    if (!Array.isArray(sendConfig.fundingAddress))
      network = this.returnNetwork(sendConfig.fundingAddress)
    else network = this.returnNetwork(sendConfig.fundingAddress[0])

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
    if (!Array.isArray(sendConfig.fundingAddress)) {
      let amount: any = sendConfig.amount

      const balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
        sendConfig.fundingAddress
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
    }

    const utxos: any[] = []
    const balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
      sendConfig.fundingAddress
    )

    // Sign and add input token UTXOs
    const tokenBalances = balances.filter((i: any) => {
      try {
        return i.result.slpTokenBalances[tokenId].isGreaterThan(0)
      } catch (_) {
        return false
      }
    })
    tokenBalances.map((i: any) =>
      i.result.slpTokenUtxos[tokenId].forEach(
        (j: any) => (j.wif = sendConfig.fundingWif[<any>i.address])
      )
    )
    tokenBalances.forEach((a: any) => {
      try {
        a.result.slpTokenUtxos[tokenId].forEach((txo: any) => utxos.push(txo))
      } catch (_) {}
    })

    // Sign and add input BCH (non-token) UTXOs
    const bchBalances = balances.filter(
      (i: any) => i.result.nonSlpUtxos.length > 0
    )
    bchBalances.map((i: any) =>
      i.result.nonSlpUtxos.forEach(
        (j: any) => (j.wif = sendConfig.fundingWif[<any>i.address])
      )
    )
    bchBalances.forEach((a: any) =>
      a.result.nonSlpUtxos.forEach((txo: any) => utxos.push(txo))
    )

    utxos.forEach((txo: any) => {
      if (Array.isArray(sendConfig.fundingAddress)) {
        sendConfig.fundingAddress.forEach((address: string, index: number) => {
          if (txo.cashAddress === addy.toCashAddress(address))
            txo.wif = sendConfig.fundingWif[index]
        })
      }
    })

    let amount: any = sendConfig.amount
    if (!Array.isArray(amount)) {
      amount = new BigNumber(amount).times(10 ** tokenDecimals) // Don't forget to account for token precision
    } else {
      amount.forEach((amt: number, index: number) => {
        amount[index] = new BigNumber(amt).times(10 ** tokenDecimals) // Don't forget to account for token precision
      })
    }
    return await bitboxNetwork.simpleTokenSend(
      tokenId,
      amount,
      utxos,
      sendConfig.tokenReceiverAddress,
      bchChangeReceiverAddress
    )
  }

  async burn(burnConfig: IBurnConfig) {
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
  }

  returnNetwork(address: string): string {
    return addy.detectAddressNetwork(address)
  }

  returnBITBOXInstance(network: string): BITBOX {
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
    // single fundingAddress
    if (config.fundingAddress && !addy.isSLPAddress(config.fundingAddress))
      throw Error("Funding Address must be simpleledger format")

    // bulk fundingAddress
    if (config.fundingAddress && Array.isArray(config.fundingAddress)) {
      config.fundingAddress.forEach((address: string) => {
        if (!addy.isSLPAddress(address))
          throw Error("Funding Address must be simpleledger format")
      })
    }

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
