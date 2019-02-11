/*
  Create a new SLP token. Requires a wallet created with the create-wallet
  example. Also requires that wallet to have a small BCH balance.
*/
"use strict"

// Set NETWORK to either testnet or mainnet
const NETWORK = `mainnet`

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
    const u = await SLP.Address.utxo(cashAddress)
    const utxo = u[0]

    const fundingAddress = cashAddress // <-- must be bitcoincash format
    const fundingWif = SLP.HDNode.toWIF(change) // <-- compressed WIF format
    const tokenReceiverAddress = slpAddress // <-- must be simpleledger format
    const batonReceiverAddress = slpAddress // <-- must be simpleledger format
    const bchChangeReceiverAddress = cashAddress // <-- simpleledger or bitcoincash format

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
    //console.log(`createConfig: ${util.inspect(createConfig)}`)

    // Generate, sign, and broadcast a hex-encoded transaction for creating
    // the new token.
    const genesisTxId = await SLP.TokenType1.create(createConfig)

    console.log(`genesisTxHex: ${util.inspect(genesisTxId)}`)
    console.log(`View this transaction on the block explorer:`)
    console.log(`https://explorer.bitcoin.com/bch/tx/${genesisTxId}`)
  } catch (err) {
    console.error(`Error in createToken: `, err)
    console.log(`Error message: ${err.message}`)
    throw err
  }
}
createToken()
