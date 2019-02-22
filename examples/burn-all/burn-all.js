/*
  Burn all tokens for an address by tokenId
*/
"use strict"

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

// Set the token ID you want to burn.
const TOKEN_ID = ""

const SLPSDK = require("../../lib/SLP").default

// Instantiate SLP based on the network.
let SLP
if (NETWORK === `mainnet`)
  SLP = new SLPSDK({ restURL: `https://rest.bitcoin.com/v2/` })
else SLP = new SLPSDK({ restURL: `https://trest.bitcoin.com/v2/` })

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

async function burnAll() {
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

    const change = SLP.HDNode.derivePath(account, "0/0")

    // get the cash address
    const cashAddress = SLP.HDNode.toCashAddress(change)

    // get token balances
    try {
      const iBurnAllConfig = {
        fundingAddress: cashAddress,
        fundingWif: SLP.HDNode.toWIF(change),
        tokenId: TOKEN_ID,
        bchChangeReceiverAddress: cashAddress
      }
      const burnAll = await SLP.TokenType1.burnAll(iBurnAllConfig)
      console.log("TXID: ", burnAll)
    } catch (error) {
      console.log(error.message)
    }
  } catch (err) {
    console.error(`Error in burnAll: `, err)
    console.log(`Error message: ${err.message}`)
    throw err
  }
}
burnAll()
