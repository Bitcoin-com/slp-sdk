const assert = require("assert")
const slp = require("./../lib/SLP").default
const SLP = new slp({
  restURL: "https://rest.bitcoin.com/v1/"
})

describe("#SLP", () => {
  describe("#list", () => {
    it(`should list all SLP tokens`, async () => {
      try {
        const list = await SLP.list()
        assert.deepEqual(Object.keys(list[0]), [
          "id",
          "timestamp",
          "symbol",
          "name",
          "document"
        ])
      } catch (error) {
        throw error
      }
    })

    it(`should list single SLP token by id: 4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84`, async () => {
      try {
        const list = await SLP.list(
          "4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84"
        )
        assert.deepEqual(Object.keys(list), [
          "id",
          "timestamp",
          "symbol",
          "name",
          "document"
        ])
      } catch (error) {
        throw error
      }
    })
  })

  describe("#balancesForAddress", () => {
    it(`should fetch all balances for address: simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m`, async () => {
      try {
        const balances = await SLP.balancesForAddress(
          "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m"
        )
        assert.equal(
          balances[
            "1cda254d0a995c713b7955298ed246822bee487458cd9747a91d9e81d9d28125"
          ],
          995
        )
      } catch (error) {
        throw error
      }
    })
  })

  describe("#balance", () => {
    it(`should fetch balance of single token for address: simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m`, async () => {
      try {
        const balance = await SLP.balance(
          "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m",
          "1cda254d0a995c713b7955298ed246822bee487458cd9747a91d9e81d9d28125"
        )
        assert.equal(balance.balance, 995)
      } catch (error) {
        throw error
      }
    })
  })

  describe("#convert", () => {
    it(`should convert address`, async () => {
      try {
        const conversion = await SLP.convert(
          "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m"
        )
        assert.equal(
          conversion.slpAddress,
          "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m"
        )
        assert.equal(
          conversion.cashAddress,
          "bitcoincash:qz9tzs6d5097ejpg279rg0rnlhz546q4fslra7mh29"
        )
        assert.equal(
          conversion.legacyAddress,
          "1DeLbv5EMzLEFDvQ8wZiKeSuPGGtSSz5HP"
        )
      } catch (error) {
        throw error
      }
    })
  })
})
