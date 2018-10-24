/*
  This is an end-to-end test which verified the happy-path of creating and
  sending a fixed token.

  This program expects two wallets. Wallet 1 must have at least 1 WHC and 10,0000
  satoshis. Wallet 2 is the recieving wallet. These are wallet.json files generated
  by the create-wallet example app.
*/

const WALLET1 = `./wallet1.json`
const WALLET2 = `./wallet2.json`

const lib = require("./util.js") // Support library.

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 1
}

// The main test function.
async function fixedTokenTest() {
  try {
    // Open wallet 1.
    const wallet1 = await lib.openWallet(WALLET1)
    //console.log(`wallet1: ${JSON.stringify(wallet1, null, 2)}`)

    // Open wallet 2
    const wallet2 = await lib.openWallet(WALLET2)
    //console.log(`wallet2: ${JSON.stringify(wallet2, null, 2)}`)

    // Verify wallet has 1 WHC
    const WHC = wallet1.tokenBalance.find(token => token.propertyid === 1)
    const WHCBalance = Number(WHC.balance)
    if (WHCBalance < 1.0) {
      console.log(
        `Wallet 1 does not have a WHC token needed to run the test.
        Exiting.`
      )
      process.exit(0)
    }

    // Verify wallet has at least 10000 satoshis
    const BCHBalance = wallet1.bchBalance
    //console.log(`BCHBalance: ${JSON.stringify(BCHBalance, null, 2)}`)
    if (BCHBalance.balanceSat < 10000) {
      console.log(`Wallet 1 contains less than 10,000 satoshis. Exiting.`)
      process.exit(0)
    }

    // Create token
    const createTxid = await lib.createFixedToken(wallet1)
    //const createTxid = `af1c19345739139fff1bc0c1070aa45e0e720f018eb8aa327efbe0b09c14428d`
    console.log(`\nNew Fixed-supply token created. txid: ${createTxid}`)

    // Wait for 1-conf
    const propertyId = await lib.waitFor1Conf(createTxid)
    console.log(
      `1 confirmation detected. New token propertyId is ${propertyId}`
    )

    // Send tokens to wallet 2.
    const sendTxid = await lib.sendTokens(wallet1, wallet2, propertyId)
    console.log(`TXID: ${sendTxid}`)

    // Wait for 1-conf
    await lib.waitFor1Conf(sendTxid)
    console.log(`1 confirmation detected.`)

    // Get the new balance of wallet 2.
    const newBalance = await lib.getBalance(wallet2)
    // console.log(`newBalance: ${JSON.stringify(newBalance, null, 2)}`)

    // Verify wallet 2 has the new tokens.
    let tokenBalance = newBalance.tokenBalance.find(
      token => Number(token.propertyid) === Number(propertyId)
    )
    tokenBalance = Number(tokenBalance.balance)

    // Assert that tokens exist and are a specific amount.
    if (tokenBalance === 345) {
      console.log(`Test passed! Congradulations`)
      return
    }

    // Test failed.
    console.log(`Hmm... Something went wrong.`)
    console.log(`newBalance: ${JSON.stringify(newBalance, null, 2)}`)
    console.log(`tokenBalance: ${util.inspect(tokenBalance)}`)
  } catch (err) {
    console.log(`Error in fixedTokenTest: `, err)
  }
}
fixedTokenTest()
