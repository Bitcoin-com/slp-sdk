const BITBOXAddress = require("bitbox-sdk/lib/Address").default
const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
const BITBOX = new BITBOXSDK()
const utils = require("slpjs").slpjs.Utils

import axios from "axios"

class Address extends BITBOXAddress {
  restURL: string
  constructor(restURL: string) {
    super(restURL)
    this.restURL = restURL
  }

  toSLPAddress(address: string): string {
    try {
      this._ensureValidAddress(address)
      return utils.toSlpAddress(address)
    } catch (err) {
      return err
    }
  }

  toCashAddress(address: string): string {
    try {
      this._ensureValidAddress(address)
      return utils.toCashAddress(address)
    } catch (err) {
      return err
    }
  }

  toLegacyAddress(address: string): string {
    try {
      this._ensureValidAddress(address)
      const cashAddr: string = utils.toCashAddress(address)
      return BITBOX.Address.toLegacyAddress(cashAddr)
    } catch (err) {
      return err
    }
  }

  _ensureValidAddress(address: string): any {
    try {
      utils.toCashAddress(address)
    } catch (err) {
      throw new Error(
        `Invalid BCH address. Double check your address is valid: ${address}`
      )
    }
  }
}

export default Address
