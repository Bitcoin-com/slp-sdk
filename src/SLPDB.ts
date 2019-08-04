// imports
import axios, { AxiosResponse } from "axios"
import { QueryInterface, SLPDBResponse } from "./interfaces/SLPInterfaces"

const SLPDB_URL = "https://slpdb.bitcoin.com/"
// consts
const Buffer = require("safe-buffer").Buffer

export class SLPDB {
  public slpdbURL: string
  constructor(slpdbURL: string = SLPDB_URL) {
    this.slpdbURL = slpdbURL
  }

  public async get(query: QueryInterface): Promise<SLPDBResponse> {
    try {
      const s: string = JSON.stringify(query)
      const b64: string = Buffer.from(s).toString("base64")
      const url: string = `${this.slpdbURL}q/${b64}`
      const slpdbRes: AxiosResponse = await axios.get(url)
      return slpdbRes.data
    } catch (error) {
      if (error.response && error.response.data) throw error.response.data
      else throw error
    }
  }
}
