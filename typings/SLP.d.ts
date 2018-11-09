import { Conversion } from "./Conversion"
import BITBOXSDK from "bitbox-sdk/lib/bitbox-sdk"

declare class SLP extends BITBOXSDK {
  constructor(config?: Config)

  Conversion: Conversion
}

export declare interface Config {
  restURL?: string
}

export default SLP
