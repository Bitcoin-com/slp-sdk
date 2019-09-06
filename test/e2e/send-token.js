/*
  This is an end-to-end test which verified the happy-path of sending an SLP
  token. It's really a test of the speed of SLPDB to process new token
  transactions.

  This program expects two wallets. Wallet 1 must have a small amount of BCH
  and an inventory of SLP test tokens. Wallet 2 is the reieving wallet.
*/

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 1
}
