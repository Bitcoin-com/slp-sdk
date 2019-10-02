// imports
import { BITBOX } from "bitbox-sdk"

// consts
const BITBOXAddress = require("bitbox-sdk").Address
const bitbox = new BITBOX()
const utils = require("slpjs").Utils

class Address extends BITBOXAddress {
  restURL: string
  constructor(restURL?: string) {
    super(restURL)
    this.restURL = restURL
  }

  toSLPAddress(address: string, prefix = true, regtest = false): string {
    this._ensureValidAddress(address)
    const slpAddress: string = utils.toSlpAddress(address)
    if (prefix) return slpAddress
    return slpAddress.split(":")[1]
  }

  toCashAddress(address: string, prefix = true, regtest = false): string {
    this._ensureValidAddress(address)
    const cashAddress: string = utils.toCashAddress(address)
    if (prefix) return cashAddress
    return cashAddress.split(":")[1]
  }

  toLegacyAddress(address: string): string {
    this._ensureValidAddress(address)
    const cashAddr: string = utils.toCashAddress(address)
    return bitbox.Address.toLegacyAddress(cashAddr)
  }

  isLegacyAddress(address: string): boolean {
    this._ensureValidAddress(address)
    return bitbox.Address.isLegacyAddress(address)
  }

  isCashAddress(address: string): boolean {
    this._ensureValidAddress(address)
    if (utils.isSlpAddress(address)) return false

    return bitbox.Address.isCashAddress(address)
  }

  isSLPAddress(address: string): boolean {
    this._ensureValidAddress(address)
    return utils.isSlpAddress(address)
  }

  isMainnetAddress(address: string): boolean {
    this._ensureValidAddress(address)
    const cashaddr: string = utils.toCashAddress(address)
    return bitbox.Address.isMainnetAddress(cashaddr)
  }

  isTestnetAddress(address: string): boolean {
    this._ensureValidAddress(address)
    const cashAddr: string = utils.toCashAddress(address)
    return bitbox.Address.isTestnetAddress(cashAddr)
  }

  isP2PKHAddress(address: string): boolean {
    this._ensureValidAddress(address)
    const cashAddr: string = utils.toCashAddress(address)
    return bitbox.Address.isP2PKHAddress(cashAddr)
  }

  isP2SHAddress(address: string): boolean {
    this._ensureValidAddress(address)
    const cashAddr: string = utils.toCashAddress(address)
    return bitbox.Address.isP2SHAddress(cashAddr)
  }

  detectAddressFormat(address: string): string {
    this._ensureValidAddress(address)
    if (utils.isSlpAddress(address)) return "slpaddr"

    return bitbox.Address.detectAddressFormat(address)
  }

  detectAddressNetwork(address: string): string {
    this._ensureValidAddress(address)
    const cashAddr: string = utils.toCashAddress(address)
    return bitbox.Address.detectAddressNetwork(cashAddr)
  }

  detectAddressType(address: string): string {
    this._ensureValidAddress(address)
    const cashAddr: string = utils.toCashAddress(address)
    return bitbox.Address.detectAddressType(cashAddr)
  }

  async details(address: string | Array<string>): Promise<Object> {
    let tmpBITBOX: any = new BITBOX({ restURL: this.restURL })
    let network: string
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (typeof address === "string") {
      const cashAddr: string = utils.toCashAddress(address)
      return tmpBITBOX.Address.details(cashAddr)
    }
    address = address.map((address: string) => utils.toCashAddress(address))
    return tmpBITBOX.Address.details(address)
  }

  async utxo(address: string | Array<string>): Promise<Object> {
    let tmpBITBOX: any = new BITBOX({ restURL: this.restURL })
    let network: string
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (typeof address === "string") {
      const cashAddr: string = utils.toCashAddress(address)
      return tmpBITBOX.Address.utxo(cashAddr)
    }
    address = address.map((address: string) => utils.toCashAddress(address))
    return tmpBITBOX.Address.utxo(address)
  }

  async unconfirmed(address: string | Array<string>): Promise<Object> {
    let tmpBITBOX: any = new BITBOX({ restURL: this.restURL })
    let network: string
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (typeof address === "string") {
      const cashAddr: string = utils.toCashAddress(address)
      return tmpBITBOX.Address.unconfirmed(cashAddr)
    }
    address = address.map((address: string) => utils.toCashAddress(address))
    return tmpBITBOX.Address.unconfirmed(address)
  }

  async transactions(address: string | Array<string>): Promise<Object> {
    let tmpBITBOX: any = new BITBOX({ restURL: this.restURL })
    let network: string
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (typeof address === "string") {
      const cashAddr: string = utils.toCashAddress(address)
      return tmpBITBOX.Address.transactions(cashAddr)
    }
    address = address.map((address: string) => utils.toCashAddress(address))
    return tmpBITBOX.Address.transactions(address)
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
