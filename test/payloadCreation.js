// let fixtures = require('./fixtures/PayloadCreation.json')
const chai = require("chai")
const assert = require("assert")
const wh = require("./../lib/Wormhole").default
const Wormhole = new wh({
  restURL: "https://trest.bitcoin.com/v1/"
})

describe("#PayloadCreation", () => {
  describe("#burnBCH", () => {
    it(`should burnBCH`, async () => {
      try {
        const burnBCH = await Wormhole.PayloadCreation.burnBCH()
        assert.equal(burnBCH, "00000044")
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const burnBCH = await Wormhole.PayloadCreation.burnBCH("fail")
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })

  describe("#changeIssuer", () => {
    it(`should changeIssuer`, async () => {
      try {
        const changeIssuer = await Wormhole.PayloadCreation.changeIssuer(3)
        assert.equal(changeIssuer, "0000004600000003")
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const changeIssuer = await Wormhole.PayloadCreation.changeIssuer("fail")
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })

  describe("#closeCrowdSale", () => {
    it(`should closeCrowdSale`, async () => {
      try {
        const closeCrowdSale = await Wormhole.PayloadCreation.closeCrowdSale(70)
        assert.equal(closeCrowdSale, "0000003500000046")
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const closeCrowdSale = await Wormhole.PayloadCreation.closeCrowdSale(
          "fail"
        )
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })

  describe("#grant", () => {
    it(`should grant`, async () => {
      try {
        const grant = await Wormhole.PayloadCreation.grant(3, "7000")
        assert.equal(grant, "00000037000000030000000000001b5800")
      } catch (error) {}
    })
    /*
    it(`should fail`, async () => {
      try {
        const grant = await Wormhole.PayloadCreation.grant("fail")
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
*/
  })

  describe("#crowdsale", () => {
    it(`should crowdsale`, async () => {
      try {
        const crowdsale = await Wormhole.PayloadCreation.crowdsale(
          1,
          1,
          0,
          "Companies",
          "Bitcoin Mining",
          "Quantum Miner",
          "www.example.com",
          "Quantum Miner Tokens",
          1,
          "100",
          1483228800,
          30,
          0,
          192978657
        )
        assert.equal(
          crowdsale,
          "0000003301000100000000436f6d70616e69657300426974636f696e204d696e696e67005175616e74756d204d696e6572007777772e6578616d706c652e636f6d005175616e74756d204d696e657220546f6b656e73000000000100000002540be40000000000586846801e0000000000730634ca"
        )
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const crowdsale = await Wormhole.PayloadCreation.crowdsale()
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })

  describe("#fixed", () => {
    it(`should fixed`, async () => {
      try {
        const fixed = await Wormhole.PayloadCreation.fixed(
          1,
          1,
          0,
          "Companies",
          "Bitcoin Mining",
          "Quantum Miner",
          "www.example.com",
          "Quantum Miner Tokens",
          "1000000"
        )
        assert.equal(
          fixed,
          "0000003201000100000000436f6d70616e69657300426974636f696e204d696e696e67005175616e74756d204d696e6572007777772e6578616d706c652e636f6d005175616e74756d204d696e657220546f6b656e73000000000000989680"
        )
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const fixed = await Wormhole.PayloadCreation.fixed()
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })

  describe("#managed", () => {
    it(`should managed`, async () => {
      try {
        const managed = await Wormhole.PayloadCreation.managed(
          1,
          1,
          0,
          "Companies",
          "Bitcoin Mining",
          "Quantum Miner",
          "www.example.com",
          "Quantum Miner Tokens"
        )
        assert.equal(
          managed,
          "0000003601000100000000436f6d70616e69657300426974636f696e204d696e696e67005175616e74756d204d696e6572007777772e6578616d706c652e636f6d005175616e74756d204d696e657220546f6b656e7300"
        )
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const managed = await Wormhole.PayloadCreation.managed()
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })

  describe("#participateCrowdSale", () => {
    it(`should participateCrowdSale`, async () => {
      try {
        const participateCrowdSale = await Wormhole.PayloadCreation.participateCrowdSale(
          "100.0"
        )
        assert.equal(participateCrowdSale, "000000010000000100000002540be400")
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const participateCrowdSale = await Wormhole.PayloadCreation.participateCrowdSale()
      } catch (error) {
        assert.equal(error.code, -3)
        assert.equal(error.message, "Invalid amount")
      }
    })
  })

  describe("#revoke", () => {
    it(`should revoke`, async () => {
      try {
        const revoke = await Wormhole.PayloadCreation.revoke(105, "100")
        assert.equal(
          revoke,
          "Property identifier does not refer to a managed property"
        )
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const revoke = await Wormhole.PayloadCreation.revoke("fail")
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })

  describe("#simpleSend", () => {
    it(`should simpleSend`, async () => {
      try {
        const simpleSend = await Wormhole.PayloadCreation.simpleSend(1, "100.0")
        assert.equal(simpleSend, "000000000000000100000002540be400")
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const simpleSend = await Wormhole.PayloadCreation.simpleSend("fail")
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })

  describe("#STO", () => {
    it(`should STO`, async () => {
      try {
        const STO = await Wormhole.PayloadCreation.STO(3, "5000")
        assert.equal(STO, "0000000300000003000000000000138800000003")
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const STO = await Wormhole.PayloadCreation.STO("fail")
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })
})
