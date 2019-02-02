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

    describe("#isLegacyAddress", () => {
      describe("is legacy addr", () => {
        LEGACY_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a legacy address`, () => {
            const isLegacyaddr = SLP.Address.isLegacyAddress(address)
            assert.equal(isLegacyaddr, true)
          })
        })
      })

      describe("cashaddr is not legacy addr", () => {
        CASH_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a legacy address`, () => {
            const isLegacyaddr = SLP.Address.isLegacyAddress(address)
            assert.equal(isLegacyaddr, false)
          })
        })
      })

      describe("slpaddr is not legacy addr", () => {
        SLP_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a legacy address`, () => {
            const isLegacyaddr = SLP.Address.isLegacyAddress(address)
            assert.equal(isLegacyaddr, false)
          })
        })
      })
    })

    describe("#isCashAddress", () => {
      describe("is cashaddr", () => {
        CASH_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a cashaddr address`, () => {
            const isCashaddr = SLP.Address.isCashAddress(address)
            assert.equal(isCashaddr, true)
          })
        })
      })

      describe("legacy is not cash addr", () => {
        LEGACY_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a cash address`, () => {
            const isCashaddr = SLP.Address.isCashAddress(address)
            assert.equal(isCashaddr, false)
          })
        })
      })

      describe("slpaddr is not cash addr", () => {
        SLP_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a cash address`, () => {
            const isCashaddr = SLP.Address.isCashAddress(address)
            assert.equal(isCashaddr, false)
          })
        })
      })
    })

    describe("#isSLPAddress", () => {
      describe("is slpaddr", () => {
        SLP_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is an slp address`, () => {
            const isSLPaddr = SLP.Address.isSLPAddress(address)
            assert.equal(isSLPaddr, true)
          })
        })
      })

      describe("legacy is not slp addr", () => {
        LEGACY_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not an slp address`, () => {
            const isSLPaddr = SLP.Address.isSLPAddress(address)
            assert.equal(isSLPaddr, false)
          })
        })
      })

      describe("cash is not slp addr", () => {
        CASH_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not an slp address`, () => {
            const isSLPaddr = SLP.Address.isSLPAddress(address)
            assert.equal(isSLPaddr, false)
          })
        })
      })
    })

    describe("#isMainnetAddress", () => {
      describe("mainnet legacy addr", () => {
        LEGACY_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a mainnet address`, () => {
            const isMainnetaddr = SLP.Address.isMainnetAddress(address)
            assert.equal(isMainnetaddr, true)
          })
        })
      })

      describe("mainnet cash addr", () => {
        CASH_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a mainnet address`, () => {
            const isMainnetaddr = SLP.Address.isMainnetAddress(address)
            assert.equal(isMainnetaddr, true)
          })
        })
      })

      describe("mainnet slp addr", () => {
        SLP_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a mainnet address`, () => {
            const isMainnetaddr = SLP.Address.isMainnetAddress(address)
            assert.equal(isMainnetaddr, true)
          })
        })
      })

      describe("testnet legacy addr", () => {
        LEGACY_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a mainnet address`, () => {
            const isMainnetaddr = SLP.Address.isMainnetAddress(address)
            assert.equal(isMainnetaddr, false)
          })
        })
      })

      describe("testnet cash addr", () => {
        CASH_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a mainnet address`, () => {
            const isMainnetaddr = SLP.Address.isMainnetAddress(address)
            assert.equal(isMainnetaddr, false)
          })
        })
      })

      describe("testnet slp addr", () => {
        SLP_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a mainnet address`, () => {
            const isMainnetaddr = SLP.Address.isMainnetAddress(address)
            assert.equal(isMainnetaddr, false)
          })
        })
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

    describe("#isLegacyAddress", () => {
      describe("is legacy addr", () => {
        LEGACY_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a legacy address`, () => {
            const isLegacyaddr = SLP.Address.isLegacyAddress(address)
            assert.equal(isLegacyaddr, true)
          })
        })
      })

      describe("cashaddr is not legacy addr", () => {
        CASH_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a legacy address`, () => {
            const isLegacyaddr = SLP.Address.isLegacyAddress(address)
            assert.equal(isLegacyaddr, false)
          })
        })
      })

      describe("slpaddr is not legacy addr", () => {
        SLP_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a legacy address`, () => {
            const isLegacyaddr = SLP.Address.isLegacyAddress(address)
            assert.equal(isLegacyaddr, false)
          })
        })
      })
    })

    describe("#isCashAddress", () => {
      describe("is cashaddr", () => {
        CASH_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a cashaddr address`, () => {
            const isCashaddr = SLP.Address.isCashAddress(address)
            assert.equal(isCashaddr, true)
          })
        })
      })

      describe("legacy is not cash addr", () => {
        LEGACY_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a cash address`, () => {
            const isCashaddr = SLP.Address.isCashAddress(address)
            assert.equal(isCashaddr, false)
          })
        })
      })

      describe("slpaddr is not cash addr", () => {
        SLP_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a cash address`, () => {
            const isCashaddr = SLP.Address.isCashAddress(address)
            assert.equal(isCashaddr, false)
          })
        })
      })
    })

    describe("#isSLPAddress", () => {
      describe("is slpaddr", () => {
        SLP_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is an slp address`, () => {
            const isSLPaddr = SLP.Address.isSLPAddress(address)
            assert.equal(isSLPaddr, true)
          })
        })
      })

      describe("legacy is not slp addr", () => {
        LEGACY_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not an slp address`, () => {
            const isSLPaddr = SLP.Address.isSLPAddress(address)
            assert.equal(isSLPaddr, false)
          })
        })
      })

      describe("cash is not slp addr", () => {
        CASH_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not an slp address`, () => {
            const isSLPaddr = SLP.Address.isSLPAddress(address)
            assert.equal(isSLPaddr, false)
          })
        })
      })
    })

    describe("#isTestnetAddress", () => {
      describe("testnet legacy addr", () => {
        LEGACY_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a testnet address`, () => {
            const isTestnetaddr = SLP.Address.isTestnetAddress(address)
            assert.equal(isTestnetaddr, true)
          })
        })
      })

      describe("testnet cash addr", () => {
        CASH_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a testnet address`, () => {
            const isTestnetaddr = SLP.Address.isTestnetAddress(address)
            assert.equal(isTestnetaddr, true)
          })
        })
      })

      describe("testnet slp addr", () => {
        SLP_TESTNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a testnet address`, () => {
            const isTestnetaddr = SLP.Address.isTestnetAddress(address)
            assert.equal(isTestnetaddr, true)
          })
        })
      })

      describe("mainnet legacy addr", () => {
        LEGACY_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a testnet address`, () => {
            const isTestnetaddr = SLP.Address.isTestnetAddress(address)
            assert.equal(isTestnetaddr, false)
          })
        })
      })

      describe("mainnet cash addr", () => {
        CASH_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a testnet address`, () => {
            const isTestnetaddr = SLP.Address.isTestnetAddress(address)
            assert.equal(isTestnetaddr, false)
          })
        })
      })

      describe("mainnet slp addr", () => {
        SLP_MAINNET_ADDRESSES.forEach(address => {
          it(`should detect ${address} is not a testnet address`, () => {
            const isTestnetaddr = SLP.Address.isTestnetAddress(address)
            assert.equal(isTestnetaddr, false)
          })
        })
      })
    })
  })
})
