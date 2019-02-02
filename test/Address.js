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
        it("should convert mainnet legacy address format to itself correctly", () => {
          assert.deepEqual(
            LEGACY_MAINNET_ADDRESSES.map(address =>
              SLP.Address.toLegacyAddress(address)
            ),
            LEGACY_MAINNET_ADDRESSES
          )
        })

        it(`should convert cashAddr to legacyAddr`, async () => {
          assert.deepEqual(
            CASH_MAINNET_ADDRESSES.map(address =>
              SLP.Address.toLegacyAddress(address)
            ),
            LEGACY_MAINNET_ADDRESSES
          )
        })

        it(`should convert slpAddr to legacyAddr`, async () => {
          assert.deepEqual(
            SLP_MAINNET_ADDRESSES.map(address =>
              SLP.Address.toLegacyAddress(address)
            ),
            LEGACY_MAINNET_ADDRESSES
          )
        })
      })

      describe("#toCashAddress", () => {
        it("should convert mainnet cash address format to itself correctly", () => {
          assert.deepEqual(
            CASH_MAINNET_ADDRESSES.map(address =>
              SLP.Address.toCashAddress(address)
            ),
            CASH_MAINNET_ADDRESSES
          )
        })

        it(`should convert legacyAddr to cashAddr`, async () => {
          assert.deepEqual(
            LEGACY_MAINNET_ADDRESSES.map(address =>
              SLP.Address.toCashAddress(address)
            ),
            CASH_MAINNET_ADDRESSES
          )
        })

        it(`should convert slpAddr to cashAddr`, async () => {
          assert.deepEqual(
            SLP_MAINNET_ADDRESSES.map(address =>
              SLP.Address.toCashAddress(address)
            ),
            CASH_MAINNET_ADDRESSES
          )
        })
      })

      describe("#toSLPAddress", () => {
        it("should convert mainnet slp address format to itself correctly", () => {
          assert.deepEqual(
            SLP_MAINNET_ADDRESSES.map(address =>
              SLP.Address.toSLPAddress(address)
            ),
            SLP_MAINNET_ADDRESSES
          )
        })

        it(`should convert legacyAddr to slpAddr`, async () => {
          assert.deepEqual(
            LEGACY_MAINNET_ADDRESSES.map(address =>
              SLP.Address.toSLPAddress(address)
            ),
            SLP_MAINNET_ADDRESSES
          )
        })

        it(`should convert cashAddr to slpAddr`, async () => {
          assert.deepEqual(
            CASH_MAINNET_ADDRESSES.map(address =>
              SLP.Address.toSLPAddress(address)
            ),
            SLP_MAINNET_ADDRESSES
          )
        })
      })
    })

    describe("#testnet", () => {
      describe("#toLegacyAddress", () => {
        it("should convert testnet legacy address format to itself correctly", () => {
          assert.deepEqual(
            LEGACY_TESTNET_ADDRESSES.map(address =>
              SLP.Address.toLegacyAddress(address)
            ),
            LEGACY_TESTNET_ADDRESSES
          )
        })

        it(`should convert cashAddr to legacyAddr`, async () => {
          assert.deepEqual(
            CASH_TESTNET_ADDRESSES.map(address =>
              SLP.Address.toLegacyAddress(address)
            ),
            LEGACY_TESTNET_ADDRESSES
          )
        })

        it(`should convert slpAddr to legacyAddr`, async () => {
          assert.deepEqual(
            SLP_TESTNET_ADDRESSES.map(address =>
              SLP.Address.toLegacyAddress(address)
            ),
            LEGACY_TESTNET_ADDRESSES
          )
        })
      })

      describe("#toCashAddress", () => {
        it("should convert testnet cash address format to itself correctly", () => {
          assert.deepEqual(
            CASH_TESTNET_ADDRESSES.map(address =>
              SLP.Address.toCashAddress(address)
            ),
            CASH_TESTNET_ADDRESSES
          )
        })

        it(`should convert legacyAddr to cashAddr`, async () => {
          assert.deepEqual(
            LEGACY_TESTNET_ADDRESSES.map(address =>
              SLP.Address.toCashAddress(address)
            ),
            CASH_TESTNET_ADDRESSES
          )
        })

        it(`should convert slpAddr to cashAddr`, async () => {
          assert.deepEqual(
            SLP_TESTNET_ADDRESSES.map(address =>
              SLP.Address.toCashAddress(address)
            ),
            CASH_TESTNET_ADDRESSES
          )
        })
      })

      describe("#toSLPAddress", () => {
        it("should convert testnet slp address format to itself correctly", () => {
          assert.deepEqual(
            SLP_TESTNET_ADDRESSES.map(address =>
              SLP.Address.toSLPAddress(address)
            ),
            SLP_TESTNET_ADDRESSES
          )
        })

        it(`should convert legacyAddr to slpAddr`, async () => {
          assert.deepEqual(
            LEGACY_TESTNET_ADDRESSES.map(address =>
              SLP.Address.toSLPAddress(address)
            ),
            SLP_TESTNET_ADDRESSES
          )
        })

        it(`should convert cashAddr to slpAddr`, async () => {
          assert.deepEqual(
            CASH_TESTNET_ADDRESSES.map(address =>
              SLP.Address.toSLPAddress(address)
            ),
            SLP_TESTNET_ADDRESSES
          )
        })
      })
    })
  })
})
