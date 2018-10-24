import { List } from "./List";
import { RawTransactions } from "./RawTransactions";
import BITBOXSDK from "bitbox-sdk/lib/bitbox-sdk";

declare class SLP extends BITBOXSDK {
  constructor(config?: Config);

  List: List;
  RawTransactions: RawTransactions;
}

export declare interface Config {
  restURL?: string;
}

export default SLP;
