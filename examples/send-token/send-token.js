/*
  Send tokens of type TOKENID to user with SLPADDR address.
*/

// CUSTOMIZE THESE VALUES FOR YOUR USE
const TOKENQTY = 3
const TOKENID =
  "023cd3e95a3947058b994fd15a9a4c47937a9d9b6e0c0b1b5898d2ce84f354e4"
const SLPADDR = "simpleledger:qzv7t2pzn2d0pklnetdjt65crh6fe8vnhuzhutr2dd"

// Set NETWORK to either testnet or mainnet
const NETWORK = `mainnet`

const SLPSDK = require("../../lib/SLP")

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

async function sendToken() {
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
    const slpAddress = SLP.HDNode.toSLPAddress(change)

    const fundingAddress = slpAddress
    const fundingWif = SLP.HDNode.toWIF(change) // <-- compressed WIF format
    const tokenReceiverAddress = SLPADDR
    const bchChangeReceiverAddress = cashAddress

    // Exit if user did not update the SLPADDR.
    if (!SLPADDR || SLPADDR === "") {
      console.log(
        `SLPADDR value is empty. Update the code with the SLPADDR of your token.`
      )
      return
    }

    // Exit if user did not update the TOKENID.
    if (!TOKENID || TOKENID === "") {
      console.log(
        `TOKENID value is empty. Update the code with the TOKENID of your token.`
      )
      return
    }

    // Create a config object for minting
    const sendConfig = {
      fundingAddress,
      fundingWif,
      tokenReceiverAddress,
      bchChangeReceiverAddress,
      tokenId: TOKENID,
      amount: TOKENQTY
    }

    //console.log(`createConfig: ${util.inspect(createConfig)}`)

    // Generate, sign, and broadcast a hex-encoded transaction for sending
    // the tokens.
    const sendTxId = await SLP.TokenType1.send(sendConfig)

    console.log(`sendTxId: ${util.inspect(sendTxId)}`)

    console.log(`\nView this transaction on the block explorer:`)
    if (NETWORK === `mainnet`)
      console.log(`https://explorer.bitcoin.com/bch/tx/${sendTxId}`)
    else console.log(`https://explorer.bitcoin.com/tbch/tx/${sendTxId}`)
  } catch (err) {
    console.error(`Error in sendToken: `, err)
    console.log(`Error message: ${err.message}`)
    throw err
  }
}
sendToken()
