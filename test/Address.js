"use strict"
const assert = require("assert")
const slp = require("./../lib/SLP").default
const SLP = new slp({
  restURL: "https://rest.bitcoin.com/v2/"
})
const fixtures = require("./fixtures/Address.json")
const axios = require("axios")
const sinon = require("sinon")

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

const MAINNET_P2PKH_ADDRESSES = flatten([
  fixtures.mainnet.legacyP2PKH,
  fixtures.mainnet.cashAddressP2PKH,
  fixtures.mainnet.slpAddressP2PKH
])

const TESTNET_P2PKH_ADDRESSES = flatten([
  fixtures.testnet.legacyP2PKH,
  fixtures.testnet.cashAddressP2PKH,
  fixtures.testnet.slpAddressP2PKH
])

const MAINNET_P2SH_ADDRESSES = flatten([
  fixtures.mainnet.legacyP2SH,
  fixtures.mainnet.cashAddressP2SH,
  fixtures.mainnet.slpAddressP2SH
])

const TESTNET_P2SH_ADDRESSES = flatten([
  fixtures.testnet.legacyP2SH,
  fixtures.testnet.cashAddressP2SH,
  fixtures.testnet.slpAddressP2SH
])

const CASH_MAINNET_ADDRESSES_NO_PREFIX = CASH_MAINNET_ADDRESSES.map(address => {
  const parts = address.split(":")
  return parts[1]
})

const CASH_TESTNET_ADDRESSES_NO_PREFIX = CASH_TESTNET_ADDRESSES.map(address => {
  const parts = address.split(":")
  return parts[1]
})

const SLP_MAINNET_ADDRESSES_NO_PREFIX = SLP_MAINNET_ADDRESSES.map(address => {
  const parts = address.split(":")
  return parts[1]
})

const SLP_TESTNET_ADDRESSES_NO_PREFIX = SLP_TESTNET_ADDRESSES.map(address => {
  const parts = address.split(":")
  return parts[1]
})

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

    describe("#isP2PKHAddress", () => {
      describe("mainnet legacy addr", () => {
        MAINNET_P2PKH_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a P2PKH address`, () => {
            const isP2PKHaddr = SLP.Address.isP2PKHAddress(address)
            assert.equal(isP2PKHaddr, true)
          })
        })
      })
    })

    describe("#isP2SHAddress", () => {
      describe("mainnet legacy addr", () => {
        MAINNET_P2SH_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a P2SH address`, () => {
            const isP2SHaddr = SLP.Address.isP2SHAddress(address)
            assert.equal(isP2SHaddr, true)
          })
        })
      })
    })

    describe("#detectAddressFormat", () => {
      LEGACY_MAINNET_ADDRESSES.forEach(address => {
        it(`should detect ${address} is a legacy address`, () => {
          const isLegacy = SLP.Address.detectAddressFormat(address)
          assert.equal(isLegacy, "legacy")
        })
      })

      CASH_MAINNET_ADDRESSES.forEach(address => {
        it(`should detect ${address} is a cash address`, () => {
          const isCashaddr = SLP.Address.detectAddressFormat(address)
          assert.equal(isCashaddr, "cashaddr")
        })
      })

      SLP_MAINNET_ADDRESSES.forEach(address => {
        it(`should detect ${address} is an slp address`, () => {
          const isSlpaddr = SLP.Address.detectAddressFormat(address)
          assert.equal(isSlpaddr, "slpaddr")
        })
      })
    })

    describe("#detectAddressNetwork", () => {
      LEGACY_MAINNET_ADDRESSES.forEach(address => {
        it(`should detect ${address} is a mainnet address`, () => {
          const isMainnet = SLP.Address.detectAddressNetwork(address)
          assert.equal(isMainnet, "mainnet")
        })
      })

      CASH_MAINNET_ADDRESSES.forEach(address => {
        it(`should detect ${address} is a mainnet address`, () => {
          const isMainnet = SLP.Address.detectAddressNetwork(address)
          assert.equal(isMainnet, "mainnet")
        })
      })

      SLP_MAINNET_ADDRESSES.forEach(address => {
        it(`should detect ${address} is a mainnet address`, () => {
          const isMainnet = SLP.Address.detectAddressNetwork(address)
          assert.equal(isMainnet, "mainnet")
        })
      })
    })

    describe("#detectAddressType", () => {
      MAINNET_P2PKH_ADDRESSES.forEach(address => {
        it(`should detect ${address} is a p2pkh address`, () => {
          const isp2pkh = SLP.Address.detectAddressType(address)
          assert.equal(isp2pkh, "p2pkh")
        })
      })

      MAINNET_P2SH_ADDRESSES.forEach(address => {
        it(`should detect ${address} is a p2sh address`, () => {
          const isp2sh = SLP.Address.detectAddressType(address)
          assert.equal(isp2sh, "p2sh")
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

    describe("#isP2PKHAddress", () => {
      describe("testnet legacy addr", () => {
        TESTNET_P2PKH_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a P2PKH address`, () => {
            const isP2PKHaddr = SLP.Address.isP2PKHAddress(address)
            assert.equal(isP2PKHaddr, true)
          })
        })
      })
    })

    describe("#isP2SHAddress", () => {
      describe("testnet legacy addr", () => {
        TESTNET_P2SH_ADDRESSES.forEach(address => {
          it(`should detect ${address} is a P2SH address`, () => {
            const isP2SHaddr = SLP.Address.isP2SHAddress(address)
            assert.equal(isP2SHaddr, true)
          })
        })
      })
    })

    describe("#detectAddressFormat", () => {
      LEGACY_TESTNET_ADDRESSES.forEach(address => {
        it(`should detect ${address} is a legacy address`, () => {
          const isLegacy = SLP.Address.detectAddressFormat(address)
          assert.equal(isLegacy, "legacy")
        })
      })

      CASH_TESTNET_ADDRESSES.forEach(address => {
        it(`should detect ${address} is a cash address`, () => {
          const isCashaddr = SLP.Address.detectAddressFormat(address)
          assert.equal(isCashaddr, "cashaddr")
        })
      })

      SLP_TESTNET_ADDRESSES.forEach(address => {
        it(`should detect ${address} is an slp address`, () => {
          const isSlpaddr = SLP.Address.detectAddressFormat(address)
          assert.equal(isSlpaddr, "slpaddr")
        })
      })
    })

    describe("#detectAddressNetwork", () => {
      LEGACY_TESTNET_ADDRESSES.forEach(address => {
        it(`should detect ${address} is a testnet address`, () => {
          const isTestnet = SLP.Address.detectAddressNetwork(address)
          assert.equal(isTestnet, "testnet")
        })
      })

      CASH_TESTNET_ADDRESSES.forEach(address => {
        it(`should detect ${address} is a testnet address`, () => {
          const isTestnet = SLP.Address.detectAddressNetwork(address)
          assert.equal(isTestnet, "testnet")
        })
      })

      SLP_TESTNET_ADDRESSES.forEach(address => {
        it(`should detect ${address} is a testnet address`, () => {
          const isTestnet = SLP.Address.detectAddressNetwork(address)
          assert.equal(isTestnet, "testnet")
        })
      })
    })

    describe("#detectAddressType", () => {
      TESTNET_P2PKH_ADDRESSES.forEach(address => {
        it(`should detect ${address} is a p2pkh address`, () => {
          const isp2pkh = SLP.Address.detectAddressType(address)
          assert.equal(isp2pkh, "p2pkh")
        })
      })
    })

    describe("#detectAddressType", () => {
      TESTNET_P2SH_ADDRESSES.forEach(address => {
        it(`should detect ${address} is a p2sh address`, () => {
          const isp2sh = SLP.Address.detectAddressType(address)
          assert.equal(isp2sh, "p2sh")
        })
      })
    })
  })
})

describe("#details", () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.sandbox.create()))
  afterEach(() => sandbox.restore())

  it("should get details", done => {
    const data = {
      legacyAddress: "3CnzuFFbtgVyHNiDH8BknGo3PQ3dpdThgJ",
      cashAddress: "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l",
      balance: 300.0828874,
      balanceSat: 30008288740,
      totalReceived: 12945.45174649,
      totalReceivedSat: 1294545174649,
      totalSent: 12645.36885909,
      totalSentSat: 1264536885909,
      unconfirmedBalance: 0,
      unconfirmedBalanceSat: 0,
      unconfirmedTxApperances: 0,
      txApperances: 1042,
      transactions: [
        "b29425a876f62e114508e67e66b5eb1ab0d320d7c9a57fb0ece086a36e2b7309"
      ]
    }

    const resolved = new Promise(r => r({ data: data }))
    sandbox.stub(axios, "get").returns(resolved)

    SLP.Address.details(
      "simpleledger:qrdka2205f4hyukutc2g0s6lykperc8nsuc8pkcp7h"
    )
      .then(result => {
        assert.deepEqual(data, result)
      })
      .then(done, done)
  })
})

describe("#utxo", () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.sandbox.create()))
  afterEach(() => sandbox.restore())

  it("should get utxo", done => {
    const data = [
      {
        legacyAddress: "3CnzuFFbtgVyHNiDH8BknGo3PQ3dpdThgJ",
        cashAddress: "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l",
        txid:
          "6f56254424378d6914cebd097579c70664843e5876ca86f0bf412ba7f3928326",
        vout: 0,
        scriptPubKey: "a91479cb06a5986baf588237de9b7fb1a8f68c35b76687",
        amount: 12.5002911,
        satoshis: 1250029110,
        height: 528745,
        confirmations: 17
      },
      {
        legacyAddress: "3CnzuFFbtgVyHNiDH8BknGo3PQ3dpdThgJ",
        cashAddress: "bitcoincash:ppuukp49np467kyzxl0fkla34rmgcddhvc33ce2d6l",
        txid:
          "b29425a876f62e114508e67e66b5eb1ab0d320d7c9a57fb0ece086a36e2b7309",
        vout: 0,
        scriptPubKey: "a91479cb06a5986baf588237de9b7fb1a8f68c35b76687",
        amount: 12.50069247,
        satoshis: 1250069247,
        height: 528744,
        confirmations: 18
      }
    ]
    const resolved = new Promise(r => r({ data: data }))
    sandbox.stub(axios, "get").returns(resolved)

    SLP.Address.utxo("simpleledger:ppuukp49np467kyzxl0fkla34rmgcddhvca2nzldyp")
      .then(result => {
        assert.deepEqual(data, result)
      })
      .then(done, done)
  })
})
describe("#unconfirmed", () => {
  let sandbox
  beforeEach(() => (sandbox = sinon.sandbox.create()))
  afterEach(() => sandbox.restore())

  it("should get unconfirmed transactions", done => {
    const data = [
      {
        txid:
          "e0aadd861a06993e39af932bb0b9ad69e7b37ef5843a13c6724789e1c94f3513",
        vout: 1,
        scriptPubKey: "76a914a0f531f4ff810a415580c12e54a7072946bb927e88ac",
        amount: 0.00008273,
        satoshis: 8273,
        confirmations: 0,
        ts: 1526680569,
        legacyAddress: "1Fg4r9iDrEkCcDmHTy2T79EusNfhyQpu7W",
        cashAddress: "bitcoincash:qzs02v05l7qs5s24srqju498qu55dwuj0cx5ehjm2c"
      }
    ]
    const resolved = new Promise(r => r({ data: data }))
    sandbox.stub(axios, "get").returns(resolved)

    SLP.Address.unconfirmed(
      "simpleledger:qzs02v05l7qs5s24srqju498qu55dwuj0c20jv8m5x"
    )
      .then(result => {
        assert.deepEqual(data, result)
      })
      .then(done, done)
  })
})
