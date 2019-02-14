/*
  Create a Non Fungible Token.
*/
"use strict"

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

const SLPSDK = require("../../lib/SLP").default

// Instantiate SLP based on the network.
let SLP
if (NETWORK === `mainnet`)
  SLP = new SLPSDK({ restURL: `https://rest.bitcoin.com/v1/` })
else SLP = new SLPSDK({ restURL: `https://trest.bitcoin.com/v1/` })

// Open the wallet generated with create-wallet.
let walletInfo
try {
  walletInfo = require(`../create-wallet/wallet.json`)
} catch (err) {
  console.log(
    `Could not open wallet.json. Generate a wallet with create-wallet first.`
  )
  process.exit(0)
}

async function createNFT() {
  try {
    const mnemonic = walletInfo.mnemonic

    // root seed buffer
    const rootSeed = SLP.Mnemonic.toSeed(mnemonic)
    // master HDNode
    let masterHDNode
    if (NETWORK === `mainnet`) masterHDNode = SLP.HDNode.fromSeed(rootSeed)
    else masterHDNode = SLP.HDNode.fromSeed(rootSeed, "testnet") // Testnet

    // HDNode of BIP44 account
    const account = SLP.HDNode.derivePath(masterHDNode, "m/44'/145'/0'")

    const change = SLP.HDNode.derivePath(account, "8/0")

    // get the cash address
    const cashAddress = SLP.HDNode.toCashAddress(change)

    const fundingAddress = cashAddress
    const fundingWif = SLP.HDNode.toWIF(change)
    const tokenReceiverAddress = fundingAddress
    const batonReceiverAddress = fundingAddress
    const bchChangeReceiverAddress = fundingAddress

    const decimals = 0
    const initialQty = 1

    const token = await SLP.TokenType1.create({
      fundingAddress: fundingAddress,
      fundingWif: fundingWif,
      tokenReceiverAddress: tokenReceiverAddress,
      batonReceiverAddress: null,
      bchChangeReceiverAddress: bchChangeReceiverAddress,
      decimals: decimals,
      name: "My amazing token",
      symbol: "MAT",
      documentUri: "documentUri",
      documentHash:
        "1010101010101010101010101010101010101010101010101010101010101010",
      initialTokenQty: initialQty
    })
    console.log(token)
  } catch (err) {
    console.error(`Error in createNFT: `, err)
    console.log(`Error message: ${err.message}`)
    throw err
  }
}
createNFT()
