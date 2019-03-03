// require deps
const BITBOXAddress = require("bitbox-sdk/lib/Address").default
const BITBOXSDK = require("bitbox-sdk")
const BITBOX = new BITBOXSDK()
const utils = require("slpjs").Utils

class Address extends BITBOXAddress {
  restURL: string
  constructor(restURL?: string) {
    super(restURL)
    this.restURL = restURL
  }

  toSLPAddress(address: string, prefix = true, regtest = false): string {
    try {
      this._ensureValidAddress(address)
      const slpAddress: string = utils.toSlpAddress(address)
      if (prefix) return slpAddress
      return slpAddress.split(":")[1]
    } catch (err) {
      return err
    }
  }

  toCashAddress(address: string, prefix = true, regtest = false): string {
    try {
      this._ensureValidAddress(address)
      const cashAddress: string = utils.toCashAddress(address)
      if (prefix) return cashAddress
      return cashAddress.split(":")[1]
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
      if (utils.isSlpAddress(address)) return false

      return BITBOX.Address.isCashAddress(address)
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
      const cashaddr: string = utils.toCashAddress(address)
      return BITBOX.Address.isMainnetAddress(cashaddr)
    } catch (err) {
      return err
    }
  }

  isTestnetAddress(address: string): boolean {
    try {
      this._ensureValidAddress(address)
      const cashAddr: string = utils.toCashAddress(address)
      return BITBOX.Address.isTestnetAddress(cashAddr)
    } catch (err) {
      return err
    }
  }

  isP2PKHAddress(address: string): boolean {
    try {
      this._ensureValidAddress(address)
      const cashAddr: string = utils.toCashAddress(address)
      return BITBOX.Address.isP2PKHAddress(cashAddr)
    } catch (err) {
      return err
    }
  }

  isP2SHAddress(address: string): boolean {
    try {
      this._ensureValidAddress(address)
      const cashAddr: string = utils.toCashAddress(address)
      return BITBOX.Address.isP2SHAddress(cashAddr)
    } catch (err) {
      return err
    }
  }

  detectAddressFormat(address: string): string {
    try {
      this._ensureValidAddress(address)
      if (utils.isSlpAddress(address)) return "slpaddr"

      return BITBOX.Address.detectAddressFormat(address)
    } catch (err) {
      return err
    }
  }

  detectAddressNetwork(address: string): string {
    try {
      this._ensureValidAddress(address)
      const cashAddr: string = utils.toCashAddress(address)
      return BITBOX.Address.detectAddressNetwork(cashAddr)
    } catch (err) {
      return err
    }
  }

  detectAddressType(address: string): string {
    try {
      this._ensureValidAddress(address)
      const cashAddr: string = utils.toCashAddress(address)
      return BITBOX.Address.detectAddressType(cashAddr)
    } catch (err) {
      return err
    }
  }

  async details(address: string | Array<string>): Promise<Object> {
    let tmpBITBOX: any
    let network: string
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (network === "mainnet")
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    else tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })

    try {
      if (typeof address === "string") {
        const cashAddr: string = utils.toCashAddress(address)
        return tmpBITBOX.Address.details(cashAddr)
      }
      address = address.map((address: string) => utils.toCashAddress(address))
      return tmpBITBOX.Address.details(address)
    } catch (error) {
      throw error
    }
  }

  async utxo(address: string | Array<string>): Promise<Object> {
    let tmpBITBOX: any
    let network: string
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (network === "mainnet")
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    else tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })

    try {
      if (typeof address === "string") {
        const cashAddr: string = utils.toCashAddress(address)
        return tmpBITBOX.Address.utxo(cashAddr)
      }
      address = address.map((address: string) => utils.toCashAddress(address))
      return tmpBITBOX.Address.utxo(address)
    } catch (error) {
      throw error
    }
  }

  async unconfirmed(address: string | Array<string>): Promise<Object> {
    let tmpBITBOX: any
    let network: string
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (network === "mainnet")
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    else tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })

    try {
      if (typeof address === "string") {
        const cashAddr: string = utils.toCashAddress(address)
        return tmpBITBOX.Address.unconfirmed(cashAddr)
      }
      address = address.map((address: string) => utils.toCashAddress(address))
      return tmpBITBOX.Address.unconfirmed(address)
    } catch (error) {
      throw error
    }
  }

  async transactions(address: string | Array<string>): Promise<Object> {
    let tmpBITBOX: any
    let network: string
    if (typeof address === "string")
      network = this.detectAddressNetwork(address)
    else network = this.detectAddressNetwork(address[0])

    if (network === "mainnet")
      tmpBITBOX = new BITBOXSDK({ restURL: "https://rest.bitcoin.com/v2/" })
    else tmpBITBOX = new BITBOXSDK({ restURL: "https://trest.bitcoin.com/v2/" })

    try {
      if (typeof address === "string") {
        const cashAddr: string = utils.toCashAddress(address)
        return tmpBITBOX.Address.transactions(cashAddr)
      }
      address = address.map((address: string) => utils.toCashAddress(address))
      return tmpBITBOX.Address.transactions(address)
    } catch (error) {
      throw error
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
