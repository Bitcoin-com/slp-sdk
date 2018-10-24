import { TransactionResult } from "./DataRetrieval"

export declare interface RawTransactions {
  restURL: string
  decodeRawTransaction: (hex: string) => Promise<any>
  decodeScript: (hex: string) => Promise<any>
  getRawTransaction: (txid: string, verbose?: boolean) => Promise<string>
  sendRawTransaction: (hex: string, allowhighfees?: boolean) => Promise<string>
  change(rawtx: string, prevTxs: TransactionInput[], destination: string, fee: number, position?: number): Promise<string>
  input(rawtx: string, txid: string, n: number): Promise<string>
  opReturn(rawtx: string, payload: string): Promise<string>
  reference(rawtx: string, destination: string, amount?: number): Promise<string> 
  decodeTransaction(rawtx: string, prevTxs?: TransactionInput[], height?: number): Promise<TransactionResult>
  create(inputs: TransactionInput[], outputs?: TransactionOutput): Promise<string>
}

export declare interface TransactionInput {
  txid: string
  vout: number
  scriptPubKey: string
  value: number
}

export declare interface TransactionOutput {
  address: string
  data: string
}