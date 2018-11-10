/*
  Check the BCH and SLP token balance for the wallet created with the
  create-wallet example app.
*/
"use strict"

// Set NETWORK to either testnet or mainnet
const NETWORK = `mainnet`

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
    const slpAddress = SLP.Utils.toSLPAddress(cashAddress)
    const u = await SLP.Address.utxo(cashAddress)
    const utxo = u[0]

    const fundingAddress = cashAddress // <-- must be bitcoincash format
    const fundingWif = SLP.HDNode.toWIF(change) // <-- compressed WIF format
    const tokenReceiverAddress = slpAddress // <-- must be simpleledger format
    const batonReceiverAddress = slpAddress // <-- must be simpleledger format
    const bchChangeReceiverAddress = cashAddress // <-- simpleledger or bitcoincash format

    const decimals = 9
    const initialQty = new SLP.BigNumber(1000).times(10 ** decimals)

    const genesisOpReturn = SLP.SlpTokenType1.buildGenesisOpReturn(
      "TRUST3",
      "Trustafari",
      "developer.bitcoin.com",
      null,
      decimals,
      2,
      initialQty
    )

    const genesisTxHex = SLP.SlpTokenType1.buildRawGenesisTx({
      slpGenesisOpReturn: genesisOpReturn,
      mintReceiverAddress: tokenReceiverAddress,
      mintReceiverSatoshis: 546,
      batonReceiverAddress: batonReceiverAddress,
      batonReceiverSatoshis: 546,
      bchChangeReceiverAddress: bchChangeReceiverAddress,
      input_utxos: [
        {
          txid: utxo.txid,
          vout: utxo.vout,
          satoshis: utxo.satoshis,
          wif: fundingWif
        }
      ]
    })

    const res = await SLP.RawTransactions.sendRawTransaction(genesisTxHex)
    console.log(res)
  } catch (err) {
    console.error(`Error in createToken: `, err)
    console.log(`Error message: ${err.message}`)
    throw err
  }
}
createToken()
