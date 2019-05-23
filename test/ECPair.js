const fixtures = require("./fixtures/ECPair.json")
const assert = require("assert")
const slp = require("./../lib/SLP")
const SLP = new slp()
// console.log(SLP)

// Used for debugging and iterrogating JS objects.
const util = require("util")
util.inspect.defaultOptions = { depth: 1 }

describe("#ECPair", () => {
  describe("#toSLPAddress", () => {
    it(`should return slp address for ecpair`, async () => {
      fixtures.wif.forEach((wif, index) => {
        const ecpair = SLP.ECPair.fromWIF(wif)
        const slpAddr = SLP.ECPair.toSLPAddress(ecpair)
        assert.equal(slpAddr, fixtures.address[index])
      })
    })
  })
})
