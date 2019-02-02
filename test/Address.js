"use strict"
const assert = require("assert")
const slp = require("./../lib/SLP").default
const SLP = new slp({
  restURL: "https://rest.bitcoin.com/v2/"
})
const fixtures = require("./fixtures/Address.json")

function flatten(arrays) {
  return [].concat.apply([], arrays)
}

const LEGACY_MAINNET_ADDRESSES = flatten([
  fixtures.mainnet.legacyP2PKH,
  fixtures.mainnet.legacyP2SH
])

const CASH_MAINNET_ADDRESSES = flatten([
  fixtures.mainnet.cashAddressP2PKH,
  fixtures.mainnet.cashAddressP2SH
])

const SLP_MAINNET_ADDRESSES = flatten([
  fixtures.mainnet.slpAddressP2PKH,
  fixtures.mainnet.slpAddressP2SH
])

const LEGACY_TESTNET_ADDRESSES = flatten([
  fixtures.testnet.legacyP2PKH,
  fixtures.testnet.legacyP2SH
])

const CASH_TESTNET_ADDRESSES = flatten([
  fixtures.testnet.cashAddressP2PKH,
  fixtures.testnet.cashAddressP2SH
])

const SLP_TESTNET_ADDRESSES = flatten([
  fixtures.testnet.slpAddressP2PKH,
  fixtures.testnet.slpAddressP2SH
])

describe("#Address", () => {
  describe("#conversion", () => {
    describe("#mainnet", () => {
      describe("#toLegacyAddress", () => {
        it("should translate mainnet legacy address format to itself correctly", () => {
          assert.deepEqual(
            LEGACY_MAINNET_ADDRESSES.map(address =>
              SLP.Address.toLegacyAddress(address)
            ),
            LEGACY_MAINNET_ADDRESSES
          )
        })

        it("should translate mainnet cash address format to itself correctly", () => {
          assert.deepEqual(
            CASH_MAINNET_ADDRESSES.map(address =>
              SLP.Address.toCashAddress(address)
            ),
            CASH_MAINNET_ADDRESSES
          )
        })

        it("should translate mainnet slp address format to itself correctly", () => {
          assert.deepEqual(
            SLP_MAINNET_ADDRESSES.map(address =>
              SLP.Address.toSLPAddress(address)
            ),
            SLP_MAINNET_ADDRESSES
          )
        })
      })

      it(`should convert slpAddr to legacyAddr`, async () => {
        try {
          const legacyAddr = await SLP.Address.toLegacyAddress(
            "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m"
          )
          assert.equal(legacyAddr, "1DeLbv5EMzLEFDvQ8wZiKeSuPGGtSSz5HP")
        } catch (error) {
          throw error
        }
      })

      it(`should convert cashAddr to legacyAddr`, async () => {
        try {
          const legacyAddr = await SLP.Address.toLegacyAddress(
            "bitcoincash:qz9tzs6d5097ejpg279rg0rnlhz546q4fslra7mh29"
          )
          assert.equal(legacyAddr, "1DeLbv5EMzLEFDvQ8wZiKeSuPGGtSSz5HP")
        } catch (error) {
          throw error
        }
      })
    })
    describe("#toSLPAddress", () => {
      it(`should convert cashAddr to slpAddr`, async () => {
        try {
          const slpAddr = await SLP.Address.toSLPAddress(
            "bitcoincash:qz9tzs6d5097ejpg279rg0rnlhz546q4fslra7mh29"
          )
          assert.equal(
            slpAddr,
            "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m"
          )
        } catch (error) {
          throw error
        }
      })

      it(`should convert legacyAddr to slpAddr`, async () => {
        try {
          const slpAddr = await SLP.Address.toSLPAddress(
            "1DeLbv5EMzLEFDvQ8wZiKeSuPGGtSSz5HP"
          )
          assert.equal(
            slpAddr,
            "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m"
          )
        } catch (error) {
          throw error
        }
      })
    })

    describe("#toCashAddress", () => {
      it(`should convert slpAddr to cashAddr`, async () => {
        try {
          const cashAddr = await SLP.Address.toCashAddress(
            "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m"
          )
          assert.equal(
            cashAddr,
            "bitcoincash:qz9tzs6d5097ejpg279rg0rnlhz546q4fslra7mh29"
          )
        } catch (error) {
          throw error
        }
      })

      it(`should convert legacyAddr to cashAddr`, async () => {
        try {
          const cashAddr = await SLP.Address.toCashAddress(
            "1DeLbv5EMzLEFDvQ8wZiKeSuPGGtSSz5HP"
          )
          assert.equal(
            cashAddr,
            "bitcoincash:qz9tzs6d5097ejpg279rg0rnlhz546q4fslra7mh29"
          )
        } catch (error) {
          throw error
        }
      })
    })
    describe("#testnet", () => {
      describe("#toLegacyAddress", () => {
        it("should translate testnet legacy address format to itself correctly", () => {
          assert.deepEqual(
            LEGACY_TESTNET_ADDRESSES.map(address =>
              SLP.Address.toLegacyAddress(address)
            ),
            LEGACY_TESTNET_ADDRESSES
          )
        })

        it("should translate testnet cash address format to itself correctly", () => {
          assert.deepEqual(
            CASH_TESTNET_ADDRESSES.map(address =>
              SLP.Address.toCashAddress(address)
            ),
            CASH_TESTNET_ADDRESSES
          )
        })

        it("should translate testnet slp address format to itself correctly", () => {
          assert.deepEqual(
            SLP_TESTNET_ADDRESSES.map(address =>
              SLP.Address.toSLPAddress(address)
            ),
            SLP_TESTNET_ADDRESSES
          )
        })
      })
    })
  })
})
