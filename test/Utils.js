/*
  Util class tests.

  TODO:
  - Finish integration tests for isTokenUtxo() and decodeOpReturn().
  - Mock calls made by isTokenUtxo() and decodeOpReturn() to turn them into unit tests.
*/

const assert = require("assert")
const assert2 = require("chai").assert
const slp = require("./../lib/SLP")
const SLP = new slp()
const nock = require("nock") // http call mocking
const sinon = require("sinon")
const axios = require("axios")

// Mock data used for unit tests
const mockData = require("./fixtures/mock-utils")

// Default to unit tests unless some other value for TEST is passed.
if (!process.env.TEST) process.env.TEST = "unit"
const SERVER = "https://rest.bitcoin.com"

// Used for debugging and iterrogating JS objects.
const util = require("util")
util.inspect.defaultOptions = { depth: 1 }

describe("#Utils", () => {
  let sandbox

  beforeEach(() => {
    // Activate nock if it's inactive.
    if (!nock.isActive()) nock.activate()

    sandbox = sinon.createSandbox()
  })

  afterEach(() => {
    // Clean up HTTP mocks.
    nock.cleanAll() // clear interceptor list.
    nock.restore()

    sandbox.restore()
  })

  describe("#list", () => {
    it(`should list all SLP tokens`, async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .get(uri => uri.includes("/"))
          .reply(200, mockData.mockList)
      }

      const list = await SLP.Utils.list()
      //console.log(`list: ${JSON.stringify(list, null, 2)}`)

      assert2.isArray(list)
      assert2.hasAllKeys(list[0], [
        "blockCreated",
        "blockLastActiveMint",
        "blockLastActiveSend",
        "circulatingSupply",
        "containsBaton",
        "decimals",
        "documentHash",
        "documentUri",
        "id",
        "initialTokenQty",
        "mintingBatonStatus",
        "name",
        "symbol",
        "timestamp",
        "timestampUnix",
        "totalBurned",
        "totalMinted",
        "txnsSinceGenesis",
        "validAddresses",
        "versionType"
      ])
    })

    it(`should list single SLP token by id: 4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84`, async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .get(uri => uri.includes("/"))
          .reply(200, mockData.mockToken)
      }

      const tokenId =
        "4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84"

      const list = await SLP.Utils.list(tokenId)
      //console.log(`list: ${JSON.stringify(list, null, 2)}`)

      assert2.hasAllKeys(list, [
        "blockCreated",
        "blockLastActiveMint",
        "blockLastActiveSend",
        "circulatingSupply",
        "containsBaton",
        "decimals",
        "documentHash",
        "documentUri",
        "id",
        "initialTokenQty",
        "mintingBatonStatus",
        "name",
        "symbol",
        "timestamp",
        "timestampUnix",
        "totalBurned",
        "totalMinted",
        "txnsSinceGenesis",
        "validAddresses",
        "versionType"
      ])
      assert.equal(list.id, tokenId)
    })

    it(`should list multople SLP tokens by array of ids`, async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .post(uri => uri.includes("/"))
          .reply(200, mockData.mockTokens)
      }

      const tokenIds = [
        "4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84",
        "b3f4f132dc3b9c8c96316346993a8d54d729715147b7b11aa6c8cd909e955313"
      ]

      const list = await SLP.Utils.list(tokenIds)
      // console.log(`list: ${JSON.stringify(list, null, 2)}`)

      assert2.hasAllKeys(list[0], [
        "blockCreated",
        "blockLastActiveMint",
        "blockLastActiveSend",
        "circulatingSupply",
        "containsBaton",
        "decimals",
        "documentHash",
        "documentUri",
        "id",
        "initialTokenQty",
        "mintingBatonStatus",
        "name",
        "symbol",
        "timestamp",
        "timestampUnix",
        "totalBurned",
        "totalMinted",
        "txnsSinceGenesis",
        "validAddresses",
        "versionType"
      ])
      assert.equal(list[0].id, tokenIds[0])
    })
  })

  describe("#balancesForAddress", () => {
    it(`should fetch all balances for address: simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9`, async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        sandbox
          .stub(axios, "get")
          .resolves({ data: mockData.balancesForAddress })
      }
      //sandbox
      //  .stub(SLP.Utils, "balancesForAddress")
      //  .resolves(mockData.balancesForAddress)

      const balances = await SLP.Utils.balancesForAddress(
        "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9"
      )
      // console.log(`balances: ${JSON.stringify(balances, null, 2)}`)

      assert2.isArray(balances)
      assert2.hasAllKeys(balances[0], [
        "tokenId",
        "balanceString",
        "balance",
        "decimalCount",
        "slpAddress"
      ])
    })
  })

  describe("#balance", () => {
    it(`should fetch balance of single token for address: simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9`, async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit")
        sandbox.stub(axios, "get").resolves({ data: mockData.mockBalance })

      const balance = await SLP.Utils.balance(
        "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9",
        "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
      )
      //console.log(`balance: ${JSON.stringify(balance, null, 2)}`)

      assert2.hasAllKeys(balance, [
        "cashAddress",
        "legacyAddress",
        "slpAddress",
        "tokenId",
        "balance",
        "balanceString"
      ])
    })
  })

  describe("#validateTxid", () => {
    it(`should validate slp txid`, async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .post(uri => uri.includes("/"))
          .reply(200, mockData.mockIsValidTxid)
      }

      const isValid = await SLP.Utils.validateTxid(
        "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
      )
      assert.deepEqual(isValid, [
        {
          txid:
            "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
          valid: true
        }
      ])
    })
  })

  describe("#balancesForToken", () => {
    it(`should retrieve token balances for a given tokenId`, async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .get(uri => uri.includes("/"))
          .reply(200, mockData.mockBalancesForToken)
      }

      const balances = await SLP.Utils.balancesForToken(
        "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
      )
      assert2.hasAnyKeys(balances[0], ["tokenBalance", "slpAddress"])
    })
  })

  describe("#tokenStats", () => {
    it(`should retrieve stats for a given tokenId`, async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .get(uri => uri.includes("/"))
          .reply(200, mockData.mockTokenStats)
      }

      const tokenStats = await SLP.Utils.tokenStats(
        "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
      )
      assert2.hasAnyKeys(tokenStats, [
        "circulatingSupply",
        "decimals",
        "documentUri",
        "name",
        "satoshisLockedUp",
        "symbol",
        "tokenId",
        "totalBurned",
        "totalMinted",
        "txnsSinceGenesis",
        "validAddresses",
        "validUtxos"
      ])
    })
  })

  describe("#transactions", () => {
    it(`should retrieve transactions for a given tokenId and address`, async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .get(uri => uri.includes("/"))
          .reply(200, mockData.mockTransactions)
      }

      const transactions = await SLP.Utils.transactions(
        "495322b37d6b2eae81f045eda612b95870a0c2b6069c58f70cf8ef4e6a9fd43a",
        "simpleledger:qrhvcy5xlegs858fjqf8ssl6a4f7wpstaqnt0wauwu"
      )
      assert2.hasAnyKeys(transactions[0], ["txid", "tokenDetails"])
    })
  })

  describe("#burnTotal", () => {
    it(`should retrieve input, output and burn totals`, async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .get(uri => uri.includes("/"))
          .reply(200, mockData.mockBurnTotal)
      }

      const burnTotal = await SLP.Utils.burnTotal(
        "c7078a6c7400518a513a0bde1f4158cf740d08d3b5bfb19aa7b6657e2f4160de"
      )
      //console.log(`burnTotal: ${JSON.stringify(burnTotal, null, 2)}`)

      assert2.hasAnyKeys(burnTotal, [
        "transactionId",
        "inputTotal",
        "outputTotal",
        "burnTotal"
      ])
    })
  })

  describe("#isTokenUtxo", () => {
    it("should throw error if input is not an array.", async () => {
      try {
        await SLP.Utils.isTokenUtxo("test")

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert2.include(
          err.message,
          `Input must be an array`,
          "Expected error message."
        )
      }
    })

    it("should throw error if utxo does not have satoshis property.", async () => {
      try {
        const utxos = [
          {
            txid:
              "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
            vout: 3,
            amount: 0.00002015,
            satoshis: 2015,
            height: 594892,
            confirmations: 5
          },
          {
            txid:
              "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
            vout: 2,
            amount: 0.00000546,
            height: 594892,
            confirmations: 5
          }
        ]

        await SLP.Utils.isTokenUtxo(utxos)

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert2.include(
          err.message,
          `utxo 1 does not have a satoshis property`,
          "Expected error message."
        )
      }
    })

    it("should throw error if utxo does not have txid property.", async () => {
      try {
        const utxos = [
          {
            txid:
              "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
            vout: 3,
            amount: 0.00002015,
            satoshis: 2015,
            height: 594892,
            confirmations: 5
          },
          {
            vout: 2,
            amount: 0.00000546,
            satoshis: 546,
            height: 594892,
            confirmations: 5
          }
        ]

        await SLP.Utils.isTokenUtxo(utxos)

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert2.include(
          err.message,
          `utxo 1 does not have a txid property`,
          "Expected error message."
        )
      }
    })

    // This captures an important corner-case. When an SLP token is created, the
    // change UTXO will contain the same SLP txid, but it is not an SLP UTXO.
    it("should correctly invalidate change in an SLP token creation transaction", async () => {
      const utxos = [
        {
          txid:
            "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
          vout: 3,
          amount: 0.00002015,
          satoshis: 2015,
          height: 594892,
          confirmations: 5
        },
        {
          txid:
            "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90",
          vout: 2,
          amount: 0.00000546,
          satoshis: 546,
          height: 594892,
          confirmations: 5
        }
      ]

      const data = await SLP.Utils.isTokenUtxo(utxos)
      //console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert.equal(
        data[0],
        false,
        "Change should not be identified as SLP utxo."
      )
      assert.equal(data[1], true, "SLP UTXO correctly identified.")
    })
  })

  describe("#decodeOpReturn", () => {
    it("should throw an error for a non-string input", async () => {
      try {
        const txid = 53423 // Not a string.

        await SLP.Utils.decodeOpReturn(txid)

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert2.include(err.error, `parameter 1 must be hexadecimal string`)
      }
    })

    it("should throw an error for non-SLP transaction", async () => {
      try {
        const txid =
          "3793d4906654f648e659f384c0f40b19c8f10c1e9fb72232a9b8edd61abaa1ec"

        await SLP.Utils.decodeOpReturn(txid)

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert2.include(err.message, `Not an OP_RETURN`)
        //console.log(`err: ${util.inspect(err)}`)
      }
    })

    it("should throw an error for non-SLP transaction with OP_RETURN", async () => {
      try {
        const txid =
          "2ff74c48a5d657cf45f699601990bffbbe7a2a516d5480674cbf6c6a4497908f"

        await SLP.Utils.decodeOpReturn(txid)

        assert2.equal(true, false, "Unexpected result.")
      } catch (err) {
        assert2.include(err.message, `Not a SLP OP_RETURN`)
        //console.log(`err: ${util.inspect(err)}`)
      }
    })

    it("should decode a genesis transaction", async () => {
      const txid =
        "bd158c564dd4ef54305b14f44f8e94c44b649f246dab14bcb42fb0d0078b8a90"

      const data = await SLP.Utils.decodeOpReturn(txid)
      //console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.hasAnyKeys(data, [
        "tokenType",
        "transactionType",
        "ticker",
        "name",
        "documentUrl",
        "documentHash",
        "decimals",
        "mintBatonVout",
        "initialQty",
        "tokensSentTo",
        "batonHolder"
      ])
    })

    it("should decode a mint transaction", async () => {
      const txid =
        "65f21bbfcd545e5eb515e38e861a9dfe2378aaa2c4e458eb9e59e4d40e38f3a4"

      const data = await SLP.Utils.decodeOpReturn(txid)
      //console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.hasAnyKeys(data, [
        "tokenType",
        "tokenId",
        "mintBatonVout",
        "batonStillExists",
        "quantity",
        "tokensSentTo",
        "batonHolder"
      ])
    })

    it("should decode a send transaction", async () => {
      const txid =
        "4f922565af664b6fdf0a1ba3924487344be721b3d8815c62cafc8a51e04a8afa"

      const data = await SLP.Utils.decodeOpReturn(txid)
      //console.log(`data: ${JSON.stringify(data, null, 2)}`)

      assert2.hasAnyKeys(data, ["tokenType", "tokenId", "spendData"])
      assert2.isArray(data.spendData)
      assert2.hasAnyKeys(data.spendData[0], ["quantity", "sentTo", "vout"])
    })
  })
})
