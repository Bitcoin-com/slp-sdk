"use strict"
const assert = require("assert")
const assert2 = require("chai").assert
const slp = require("./../lib/SLP").default
const SLP = new slp()
const nock = require("nock") // http call mocking
const sinon = require("sinon")
const BigNumber = require("bignumber.js")

const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
const slpjs = require("slpjs")

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
        "id",
        "timestamp",
        "symbol",
        "name",
        "documentUri",
        "documentHash",
        "decimals",
        "initialTokenQty"
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
        "id",
        "timestamp",
        "symbol",
        "name",
        "documentUri",
        "documentHash",
        "decimals",
        "initialTokenQty"
      ])
      assert.equal(list.id, tokenId)
    })
  })

  describe("#slpBalancesUtxos", () => {
    it(`should fetch raw UTXO balances from server`, async () => {
      // When run as a unit test, this test case serves to prove that the
      // SLP.Utils.slpBalancesUtxos() function can be successfully stubbed by
      // sinon, which is needed for other tests. When run as an integration
      // test, it confirms that mocked data matches the real data coming from
      // the REST server.

      // Mock the call to rest.bitcoin.com for unit tests.
      if (process.env.TEST === "unit") {
        sandbox
          .stub(SLP.Utils, "slpBalancesUtxos")
          .resolves(mockData.mockBalance)
      }

      // Instantiate BITBOX
      const tmpBITBOX = new BITBOXSDK({
        restURL: `${SERVER}/v2/`
      })

      const getRawTransactions = async txids =>
        await tmpBITBOX.RawTransactions.getRawTransaction(txids)

      // Instantiate a local validator
      const slpValidator = new slpjs.LocalValidator(
        tmpBITBOX,
        getRawTransactions
      )

      // Instantiate the bitboxNetwork object
      const bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)

      const addr = "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9"
      const balances = await SLP.Utils.slpBalancesUtxos(bitboxNetwork, addr)
      //console.log(`balances: ${JSON.stringify(balances, null, 2)}`)

      assert2.hasAnyKeys(balances, [
        "satoshis_available_bch",
        "satoshis_in_slp_baton",
        "satoshis_in_slp_token",
        "satoshis_in_invalid_token_dag",
        "satoshis_in_invalid_baton_dag",
        "slpTokenBalances",
        "slpTokenUtxos",
        "slpBatonUtxos",
        "nonSlpUtxos",
        "invalidTokenUtxos",
        "invalidBatonUtxos"
      ])
    })
  })

  describe("#getTokenMetadata", () => {
    it(`should fetch token metadata from the REST server`, async () => {
      // When run as a unit test, this test case serves to prove that the
      // SLP.Utils.getTokenMetadata() function can be successfully stubbed by
      // sinon, which is needed for other tests. When run as an integration
      // test, it confirms that mocked data matches the real data coming from
      // the REST server.

      // Mock the call to rest.bitcoin.com for unit tests.
      if (process.env.TEST === "unit") {
        sandbox
          .stub(SLP.Utils, "getTokenMetadata")
          .resolves(mockData.mockTokenMeta)
      }

      // Instantiate BITBOX
      const tmpBITBOX = new BITBOXSDK({
        restURL: `${SERVER}/v2/`
      })

      // Instantiate a local validator
      const slpValidator = new slpjs.LocalValidator(
        tmpBITBOX,
        tmpBITBOX.RawTransactions.getRawTransaction
      )

      // Instantiate the bitboxNetwork object
      const bitboxNetwork = new slpjs.BitboxNetwork(tmpBITBOX, slpValidator)

      // Prep data for the test.
      const balances = mockData.mockBalance
      const keys = Object.keys(balances.slpTokenBalances)
      balances.slpTokenBalances[keys[0]] = new BigNumber(
        balances.slpTokenBalances[keys[0]]
      )
      balances.slpTokenBalances[keys[1]] = new BigNumber(
        balances.slpTokenBalances[keys[1]]
      )

      // Call the function under test.
      const tokenMeta = await SLP.Utils.getTokenMetadata(
        keys,
        bitboxNetwork,
        balances
      )
      //console.log(`tokenMeta: ${util.inspect(tokenMeta)}`)

      assert2.isArray(tokenMeta)
      assert2.hasAllKeys(tokenMeta[0], ["tokenId", "balance", "decimalCount"])
    })
  })

  describe("#balancesForAddress", () => {
    it(`should fetch all balances for address: simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9`, async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        sandbox
          .stub(SLP.Utils, "getTokenMetadata")
          .resolves(mockData.mockTokenMeta)

        sandbox
          .stub(SLP.Utils, "slpBalancesUtxos")
          .resolves(mockData.mockBalance)
      }

      const balances = await SLP.Utils.balancesForAddress(
        "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9"
      )
      //console.log(`balances: ${JSON.stringify(balances, null, 2)}`)

      assert2.isArray(balances)
      assert2.hasAllKeys(balances[0], ["tokenId", "balance", "decimalCount"])
    })
  })

  describe("#balance", () => {
    it(`should fetch balance of single token for address: simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9`, async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        sandbox
          .stub(SLP.Utils, "getTokenMetadata")
          .resolves(mockData.mockTokenMeta)

        sandbox
          .stub(SLP.Utils, "slpBalancesUtxos")
          .resolves(mockData.mockBalance)
      }

      const balance = await SLP.Utils.balance(
        "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9",
        "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb"
      )

      assert2.hasAllKeys(balance, ["tokenId", "balance", "balance"])
    })
  })

  describe("#validateTxid", () => {
    it(`should validate slp txid`, async () => {
      // Mock the call to rest.bitcoin.com
      if (process.env.TEST === "unit") {
        nock(SERVER)
          .post(uri => uri.includes("/"))
          .reply(200, mockData.mockRawTx)
      }

      const isValid = await SLP.Utils.validateTxid(
        "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
        "mainnet"
      )
      assert.equal(isValid, true)
    })
  })
})
