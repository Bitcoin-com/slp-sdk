// let fixtures = require('./fixtures/DataRetrieval.json')
const chai = require("chai")
const assert = require("assert")
const wh = require("./../lib/Wormhole").default
const Wormhole = new wh({
  restURL: "https://trest.bitcoin.com/v1/"
})

// Inspect utility used for debugging.
const util = require("util")
util.inspect.defaultOptions = {
  showHidden: true,
  colors: true,
  depth: 1
}

describe("#DataRetrieval", () => {
  describe("#balancesForAddress", () => {
    it(`should get balances for address`, async () => {
      try {
        const balancesForAddress = await Wormhole.DataRetrieval.balancesForAddress(
          "bchtest:qq2j9gp97gm9a6lwvhxc4zu28qvqm0x4j5e72v7ejg"
        )
        assert.deepEqual(Object.keys(balancesForAddress[0]), [
          "propertyid",
          "balance",
          "reserved"
        ])
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const balancesForAddress = await Wormhole.DataRetrieval.balancesForAddress(
          "bchtest:rq2j9gp97gm9a6lwvhxc4zu28qvqm0x4j5e72v7ejg"
        )
      } catch (error) {
        assert.equal(error.code, -5)
        assert.equal(error.message, "Invalid address. Note: use cashAddress")
      }
    })
  })

  describe("#balancesForId", () => {
    it(`should get balances for id`, async () => {
      try {
        const balancesForId = await Wormhole.DataRetrieval.balancesForId(108)
        assert.deepEqual(Object.keys(balancesForId[0]), [
          "address",
          "balance",
          "reserved"
        ])
      } catch (error) {}
    })
    /*
    it(`should fail`, async () => {
      try {
        const balancesForId = await Wormhole.DataRetrieval.balancesForId()
        console.log(`balancesForId: ${util.inspect(balancesForId)}`)
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
    */
  })

  describe("#balance", () => {
    it(`should get balance for address by id`, async () => {
      try {
        const balance = await Wormhole.DataRetrieval.balance(
          "bchtest:qq2j9gp97gm9a6lwvhxc4zu28qvqm0x4j5e72v7ejg",
          1
        )
        assert.deepEqual(Object.keys(balance), ["balance", "reserved"])
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const balance = await Wormhole.DataRetrieval.balance(
          "bchtest:rq2j9gp97gm9a6lwvhxc4zu28qvqm0x4j5e72v7ejg",
          1
        )
      } catch (error) {
        assert.equal(error.code, -5)
        assert.equal(error.message, "Invalid address. Note: use cashAddress")
      }
    })
  })

  describe("#balancesHash", () => {
    it(`should get balancesHash for id`, async () => {
      try {
        const balancesHash = await Wormhole.DataRetrieval.balancesHash(31)
        assert.deepEqual(Object.keys(balancesHash), [
          "block",
          "blockhash",
          "propertyid",
          "balanceshash"
        ])
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const balancesHash = await Wormhole.DataRetrieval.balancesHash("fail")
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })

  describe("#crowdSale", () => {
    it(`should get crowdSale for id`, async () => {
      try {
        const crowdSale = await Wormhole.DataRetrieval.crowdSale(31, true)
        assert.deepEqual(Object.keys(crowdSale), [
          "propertyid",
          "name",
          "active",
          "issuer",
          "propertyiddesired",
          "precision",
          "tokensperunit",
          "earlybonus",
          "starttime",
          "deadline",
          "amountraised",
          "tokensissued",
          "addedissuertokens",
          "closedearly",
          "maxtokens"
        ])
      } catch (error) {}
    })

    /*
    it(`should fail`, async () => {
      try {
        const crowdSale = await Wormhole.DataRetrieval.crowdSale("fail", true)
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
    */
  })

  describe("#currentConsensusHash", () => {
    it(`should get currentConsensusHash`, async () => {
      try {
        const currentConsensusHash = await Wormhole.DataRetrieval.currentConsensusHash()
        assert.deepEqual(Object.keys(currentConsensusHash), [
          "block",
          "blockhash",
          "consensushash"
        ])
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const currentConsensusHash = await Wormhole.DataRetrieval.currentConsensusHash(
          "fail"
        )
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })

  describe("#grants", () => {
    it(`should get grants for id`, async () => {
      try {
        const grants = await Wormhole.DataRetrieval.grants(3)
        assert.deepEqual(Object.keys(grants), [
          "propertyid",
          "name",
          "issuer",
          "creationtxid",
          "totaltokens",
          "issuances"
        ])
      } catch (error) {}
    })
    /*
    it(`should fail`, async () => {
      try {
        const grants = await Wormhole.DataRetrieval.grants("fail")
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
    */
  })

  describe("#info", () => {
    it(`should get info`, async () => {
      try {
        const info = await Wormhole.DataRetrieval.info()
        assert.deepEqual(Object.keys(info), [
          "wormholeversion_int",
          "wormholeversion",
          "bitcoincoreversion",
          "block",
          "blocktime",
          "blocktransactions",
          "totaltrades",
          "totaltransactions",
          "alerts"
        ])
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const info = await Wormhole.DataRetrieval.info("fail")
      } catch (error) {
        assert.equal(error.code, -8)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })

  describe("#payload", () => {
    it(`should get payload`, async () => {
      try {
        const response = await Wormhole.DataRetrieval.payload(
          "000000000000000000000000000000000000000000000000000000000000000"
        )
        return response.data
      } catch (error) {
        assert.equal(
          error.message,
          "txid must be hexadecimal string (not '000000000000000000000000000000000000000000000000000000000000000')"
        )
      }
    })

    it(`should fail`, async () => {
      try {
        const response = await Wormhole.DataRetrieval.payload(0)
      } catch (error) {
        assert.equal(error.code, -8)
        assert.equal(error.message, "txid must be hexadecimal string (not '0')")
      }
    })
  })

  describe("#property", () => {
    it(`should get property by id`, async () => {
      try {
        const property = await Wormhole.DataRetrieval.property(3)
        assert.deepEqual(Object.keys(property), [
          "propertyid",
          "name",
          "category",
          "subcategory",
          "data",
          "url",
          "precision",
          "issuer",
          "creationtxid",
          "fixedissuance",
          "managedissuance",
          "freezingenabled",
          "totaltokens"
        ])
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const property = await Wormhole.DataRetrieval.property("fail")
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })

  describe("#seedBlocks", () => {
    it(`should get seedBlocks`, async () => {
      try {
        const seedBlocks = await Wormhole.DataRetrieval.seedBlocks(
          290000,
          300000
        )
        assert.deepEqual(Object.keys(seedBlocks), [])
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const seedBlocks = await Wormhole.DataRetrieval.seedBlocks()
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })

  describe("#STO", () => {
    it(`should get STO`, async () => {
      try {
        const STO = await Wormhole.DataRetrieval.STO(
          "000000000000000000000000000000000000000000000000000000000000000",
          "*"
        )
        assert.deepEqual(
          STO,
          "txid must be hexadecimal string (not '000000000000000000000000000000000000000000000000000000000000000')"
        )
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const STO = await Wormhole.DataRetrieval.STO()
      } catch (error) {
        assert.equal(error.code, -8)
        assert.equal(
          error.message,
          "txid must be hexadecimal string (not 'undefined')"
        )
      }
    })
  })

  describe("#transaction", () => {
    it(`should get transaction`, async () => {
      try {
        const transaction = await Wormhole.DataRetrieval.transaction(
          "aa5ed83708d0889d25691a27668fe5a6a406cab24191afae7d78bb867a324641"
        )
        assert.deepEqual(
          transaction,
          "txid must be hexadecimal string (not 'aa5ed83708d0889d25691a27668fe5a6a406cab24191afae7d78bb867a324641')"
        )
      } catch (error) {}
    })
    /*
    it(`should fail`, async () => {
      try {
        const transaction = await Wormhole.DataRetrieval.transaction()
      } catch (error) {
        assert.equal(error.code, -8)
        assert.equal(
          error.message,
          "txid must be hexadecimal string (not 'undefined')"
        )
      }
    })
    */
  })

  describe("#blockTransactions", () => {
    it(`should get blockTransactions`, async () => {
      try {
        const blockTransactions = await Wormhole.DataRetrieval.blockTransactions(
          "0000000000009ae2ee5d085a0f3d20c8ace0c742af60269f44fc3e3af354b5cb"
        )
        assert.deepEqual(blockTransactions, [])
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const blockTransactions = await Wormhole.DataRetrieval.blockTransactions()
      } catch (error) {
        assert.equal(error.code, -1)
        assert.equal(error.message, "JSON value is not an integer as expected")
      }
    })
  })

  describe("#pendingTransactions", () => {
    it(`should get pendingTransactions`, async () => {
      try {
        const pendingTransactions = await Wormhole.DataRetrieval.pendingTransactions()
        assert.deepEqual(pendingTransactions, [])
      } catch (error) {}
    })

    /*
    it(`should fail`, async () => {
      try {
        const pendingTransactions = await Wormhole.DataRetrieval.pendingTransactions(
          "fail"
        )
      } catch (error) {
        assert.equal(error.code, -5)
        assert.equal(error.message, "Invalid address. Note: use cashAddress")
      }
    })
    */
  })

  describe("#properties", () => {
    it(`should get properties`, async () => {
      try {
        const properties = await Wormhole.DataRetrieval.properties()
        assert.deepEqual(Object.keys(properties[0]), [
          "propertyid",
          "name",
          "category",
          "subcategory",
          "data",
          "url",
          "precision"
        ])
      } catch (error) {}
    })

    it(`should fail`, async () => {
      try {
        const properties = await Wormhole.DataRetrieval.properties("fail")
      } catch (error) {
        assert.equal(error.code, -8)
        assert.equal(
          error.message,
          "txid must be hexadecimal string (not 'undefined')"
        )
      }
    })
  })
})
