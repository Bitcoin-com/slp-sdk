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

  isLegacyAddress(address: string): boolean {
    try {
      this._ensureValidAddress(address)
      return BITBOX.Address.isLegacyAddress(address)
    } catch (err) {
      return err
    }
  }

  isCashAddress(address: string): boolean {
    try {
      this._ensureValidAddress(address)
      if (utils.isSlpAddress(address)) {
        return false
      } else {
        return BITBOX.Address.isCashAddress(address)
      }
    } catch (err) {
      return err
    }
  }

  isSLPAddress(address: string): boolean {
    try {
      this._ensureValidAddress(address)
      return utils.isSlpAddress(address)
    } catch (err) {
      return err
    }
  }

  isMainnetAddress(address: string): boolean {
    try {
      this._ensureValidAddress(address)
      let cashAddr: string = utils.toCashAddress(address)
      return BITBOX.Address.isMainnetAddress(cashAddr)
    } catch (err) {
      return err
    }
  }

  isTestnetAddress(address: string): boolean {
    try {
      this._ensureValidAddress(address)
      let cashAddr: string = utils.toCashAddress(address)
      return BITBOX.Address.isTestnetAddress(cashAddr)
    } catch (err) {
      return err
    }
  }

  isP2PKHAddress(address: string): boolean {
    try {
      this._ensureValidAddress(address)
      let cashAddr: string = utils.toCashAddress(address)
      return BITBOX.Address.isP2PKHAddress(cashAddr)
    } catch (err) {
      return err
    }
  }

  isP2SHAddress(address: string): boolean {
    try {
      this._ensureValidAddress(address)
      let cashAddr: string = utils.toCashAddress(address)
      return BITBOX.Address.isP2SHAddress(cashAddr)
    } catch (err) {
      return err
    }
  }

  detectAddressFormat(address: string): string {
    try {
      this._ensureValidAddress(address)
      if (utils.isSlpAddress(address)) {
        return "slpaddr"
      } else {
        return BITBOX.Address.detectAddressFormat(address)
      }
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
