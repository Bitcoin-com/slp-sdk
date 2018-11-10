/*
  Get the token information based on the primaryid value assigned to it.
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

async function listAllTokens() {
  try {
    const properties = await SLP.list()
    console.log(properties)
  } catch (err) {
    console.error(`Error in getTokenInfo: `, err)
    throw err
  }
}
listAllTokens()
