/*
  Temporary file. This directory should be deleted.
*/

// Set NETWORK to either testnet or mainnet
const NETWORK = `mainnet`

const SLPSDK = require("../../lib/SLP")

// Used for debugging and investigating JS objects.
const util = require("util")
util.inspect.defaultOptions = { showHidden: true, colors: true, depth: 2 }

// Instantiate SLP based on the network.
let SLP
if (NETWORK === `mainnet`)
  SLP = new SLPSDK({ restURL: `https://rest.bitcoin.com/v2/` })
else SLP = new SLPSDK({ restURL: `https://trest.bitcoin.com/v2/` })

console.log(`SLP.Util: ${util.inspect(SLP.Util)}`)
console.log(`SLP.Utils: ${util.inspect(SLP.Utils)}`)

const methods = getAllFuncs(SLP.Util)
console.log(`SLP.Util: ${JSON.stringify(methods, null, 2)}`)

const methods2 = getAllFuncs(SLP.Utils)
console.log(`SLP.Utils: ${JSON.stringify(methods2, null, 2)}`)

async function test() {
  const temp = await SLP.Utils.list(
    "4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf"
  )
  console.log(`temp: ${JSON.stringify(temp, null, 2)}`)

  const temp2 = await SLP.Util.list(
    "4de69e374a8ed21cbddd47f2338cc0f479dc58daa2bbe11cd604ca488eca0ddf"
  )
  console.log(`temp2: ${JSON.stringify(temp, null, 2)}`)
}
test()

function getAllFuncs(obj) {
  let props = []

  do {
    const l = Object.getOwnPropertyNames(obj)
      .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
      .sort()
      .filter(
        (p, i, arr) =>
          typeof obj[p] === "function" && //only the methods
          p !== "constructor" && //not the constructor
          (i === 0 || p !== arr[i - 1]) && //not overriding in this prototype
          props.indexOf(p) === -1 //not overridden in a child
      )
    props = props.concat(l)
  } while (
    (obj = Object.getPrototypeOf(obj)) && //walk-up the prototype chain
    Object.getPrototypeOf(obj) //not the the Object prototype methods (hasOwnProperty, etc...)
  )

  return props
}
