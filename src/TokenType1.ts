// require deps
// imports
import Address from "./Address"
import {
  returnBITBOXInstance,
  returnNetwork,
  validateAddressFormat
} from "./common"
import {
  IBurnConfig,
  ICreateConfig,
  IMintConfig,
  INFTConfig,
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
    validateAddressFormat(createConfig)

    // determine mainnet/testnet
    const network: string = returnNetwork(createConfig.fundingAddress)

    // network appropriate BITBOX instance
    const BITBOX: any = returnBITBOXInstance(network)

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

  async nft(nftConfig: INFTConfig) {
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
    console.log("NFT1 Parent GENESIS txn complete:", genesisTxid)

    // let batonReceiverAddress: string
    // if (
    //   nftConfig.batonReceiverAddress !== undefined &&
    //   nftConfig.batonReceiverAddress !== "" &&
    //   nftConfig.batonReceiverAddress !== null
    // )
    //   batonReceiverAddress = nftConfig.batonReceiverAddress
    // else batonReceiverAddress = null

    // const balances: any = await bitboxNetwork.getAllSlpBalancesAndUtxos(
    //   nftConfig.fundingAddress
    // )

    // let initialTokenQty: number = nftConfig.initialTokenQty

    // initialTokenQty = new BigNumber(initialTokenQty).times(
    //   10 ** nftConfig.decimals
    // )
    // balances.nonSlpUtxos.forEach((txo: any) => (txo.wif = nftConfig.fundingWif))
    // const genesisTxid = await bitboxNetwork.simpleTokenGenesis(
    //   nftConfig.name,
    //   nftConfig.symbol,
    //   initialTokenQty,
    //   nftConfig.documentUri,
    //   nftConfig.documentHash,
    //   nftConfig.decimals,
    //   nftConfig.tokenReceiverAddress,
    //   batonReceiverAddress,
    //   nftConfig.bchChangeReceiverAddress,
    //   balances.nonSlpUtxos
    // )
    // return genesisTxid
  }

  async mint(mintConfig: IMintConfig) {
    // validate address formats
    validateAddressFormat(mintConfig)

    // determine mainnet/testnet
    const network: string = returnNetwork(mintConfig.fundingAddress)

    // network appropriate BITBOX instance
    const BITBOX: any = returnBITBOXInstance(network)

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
    validateAddressFormat(sendConfig)

    // determine mainnet/testnet
    let network: string
    if (!Array.isArray(sendConfig.fundingAddress))
      network = returnNetwork(sendConfig.fundingAddress)
    else network = returnNetwork(sendConfig.fundingAddress[0])

    // network appropriate BITBOX instance
    const BITBOX: any = returnBITBOXInstance(network)

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
    validateAddressFormat(burnConfig)

    // determine mainnet/testnet
    const network: string = returnNetwork(burnConfig.fundingAddress)

    // network appropriate BITBOX instance
    const BITBOX: any = returnBITBOXInstance(network)

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
}

export default TokenType1
