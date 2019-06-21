/*
  Get the token information based on the id.
*/

// EDIT THIS WITH THE TOKEN ID YOU WANT TO LOOK UP
const TOKENID =
  "9f2b1b91a6ab0686d48e46345669889357b48dbfe8a5d817b857607d89693adc"

// Set NETWORK to either testnet or mainnet
const NETWORK = `mainnet`

const SLPSDK = require("../../lib/SLP")

// Instantiate SLP based on the network.
let SLP
if (NETWORK === `mainnet`)
  SLP = new SLPSDK({ restURL: `https://rest.bitcoin.com/v2/` })
else SLP = new SLPSDK({ restURL: `https://trest.bitcoin.com/v2/` })

async function lookupToken() {
  try {
    const properties = await SLP.Utils.list(TOKENID)
    console.log(properties)
  } catch (err) {
    console.error(`Error in getTokenInfo: `, err)
    throw err
  }
}
lookupToken()
