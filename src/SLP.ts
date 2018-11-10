const BITBOXSDK = require("bitbox-sdk/lib/bitbox-sdk").default
import Conversion from "./Conversion"
import axios from "axios"
let slp = require("slpjs").slp
let bitboxproxy = require("slpjs").bitbox
let bitdb = require("slpjs").bitdb
const BigNumber = require("bignumber.js")
import { IConfig } from "./interfaces/IConfig"

class SLP extends BITBOXSDK {
  constructor(config: IConfig) {
    super(config)
    if (config && config.restURL && config.restURL !== "")
      this.restURL = config.restURL
    else this.restURL = "https://rest.bitcoin.com/v1/"

    this.Conversion = new Conversion()
    this.bitbox = bitboxproxy
    this.slp = slp
    this.BigNumber = BigNumber
    this.biddb = bitdb
  }

  async list(id: string): Promise<Object | Array<Object>> {
    let path: string
    if (!id) {
      path = `${this.restURL}slp/list`
    } else {
      path = `${this.restURL}slp/list/${id}`
    }
    try {
      const response = await axios.get(path)
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async balancesForAddress(address: string): Promise<Object> {
    try {
      const response = await axios.get(
        `${this.restURL}slp/balancesForAddress/${address}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async balance(address: string, id: string): Promise<Object> {
    try {
      const response = await axios.get(
        `${this.restURL}slp/balance/${address}/${id}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }

  async convert(address: string): Promise<Object> {
    try {
      const response = await axios.get(
        `${this.restURL}slp/address/convert/${address}`
      )
      return response.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      throw error
    }
  }
}

export default SLP
