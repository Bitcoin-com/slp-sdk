import { DataRetrieval } from "./DataRetrieval"
import { PayloadCreation } from "./PayloadCreation"
import { RawTransactions } from "./RawTransactions"
import { ERC20 } from "./ERC20"
import BITBOXSDK from "bitbox-sdk/lib/bitbox-sdk"

declare class Wormhole extends BITBOXSDK {
  constructor(config?: Config)

  DataRetrieval: DataRetrieval
  PayloadCreation: PayloadCreation
  RawTransactions: RawTransactions
  ERC20: ERC20
}

export declare interface Config {
  restURL?: string
}

export default Wormhole