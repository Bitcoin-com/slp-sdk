/*
  Create a new SLP token. Requires a wallet created with the create-wallet
  example. Also requires that wallet to have a small BCH balance.
*/
"use strict"

// Set NETWORK to either testnet or mainnet
const NETWORK = `testnet`

const SLPSDK = require("../../lib/SLP").default

// Used for debugging and investigating JS objects.
const util = require("util")
util.inspect.defaultOptions = { depth: 1 }

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

async function createToken() {
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
    const slpAddress = SLP.Address.toSLPAddress(cashAddress)

    const fundingAddress = cashAddress
    const fundingWif = SLP.HDNode.toWIF(change) // <-- compressed WIF format
    const tokenReceiverAddress = slpAddress
    const batonReceiverAddress = slpAddress
    const bchChangeReceiverAddress = cashAddress

    // Create a config object defining the token to be created.
    const createConfig = {
      fundingAddress,
      fundingWif,
      tokenReceiverAddress,
      batonReceiverAddress,
      bchChangeReceiverAddress,
      decimals: 8,
      name: "SLP SDK example using BITBOX",
      symbol: "SLPSDK",
      documentUri: "developer.bitcoin.com",
      documentHash: null,
      initialTokenQty: 1234
    }

    // Generate, sign, and broadcast a hex-encoded transaction for creating
    // the new token.
    const genesisTxId = await SLP.TokenType1.create(createConfig)

    console.log(`genesisTxID: ${util.inspect(genesisTxId)}`)
    console.log(
      `The genesis TxID above is used to uniquely identify your new class of SLP token. Save it and keep it handy.`
    )
    console.log(` `)
    console.log(`View this transaction on the block explorer:`)
    if (NETWORK === `mainnet`)
      console.log(`https://explorer.bitcoin.com/bch/tx/${genesisTxId}`)
    else console.log(`https://explorer.bitcoin.com/tbch/tx/${genesisTxId}`)
  } catch (err) {
    console.error(`Error in createToken: `, err)
    console.log(`Error message: ${err.message}`)
    throw err
  }
}
createToken()
