"use strict"
const assert = require("assert")
const slp = require("./../lib/SLP").default
const SLP = new slp()

describe("#Utils", () => {
  describe("#list", () => {
    it(`should list all SLP tokens`, async () => {
      try {
        const list = await SLP.Utils.list()
        assert.deepEqual(Object.keys(list[0]), [
          "id",
          "timestamp",
          "symbol",
          "name",
          "documentUri",
          "documentHash",
          "decimals",
          "initialTokenQty"
        ])
      } catch (error) {
        throw error
      }
    })

    it(`should list single SLP token by id: 4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84`, async () => {
      try {
        const list = await SLP.Utils.list(
          "4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84"
        )
        assert.deepEqual(Object.keys(list), [
          "id",
          "timestamp",
          "symbol",
          "name",
          "documentUri",
          "documentHash",
          "decimals",
          "initialTokenQty"
        ])
      } catch (error) {
        throw error
      }
    })
  })

  describe("#balancesForAddress", () => {
    it(`should fetch all balances for address: simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9`, async () => {
      try {
        const balances = await SLP.Utils.balancesForAddress(
          "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9"
        )
        const data = {
          tokenId:
            "a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37",
          balance: "1",
          decimalCount: 7
        }
        assert.deepEqual(balances[1], data)
      } catch (error) {
        throw error
      }
    })
  })

  describe("#balance", () => {
    it(`should fetch balance of single token for address: simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9`, async () => {
      try {
        const balance = await SLP.Utils.balance(
          "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9",
          "a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37"
        )

        const data = {
          tokenId:
            "a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37",
          balance: "1",
          decimalCount: 7
        }
        assert.deepEqual(balance, data)
      } catch (error) {
        throw error
      }
    })
  })

  describe("#validateTxid", () => {
    it(`should validate slp txid`, async () => {
      try {
        const isValid = await SLP.Utils.validateTxid(
          "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
          "mainnet"
        )
        assert.equal(isValid, true)
      } catch (error) {
        throw error
      }
    })
  })
})
