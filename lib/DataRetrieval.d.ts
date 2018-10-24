export declare interface DataRetrieval {
  restURL: string
  balancesForAddress(address: string): Promise<BalancesResult[]>
  balancesForId(propertyId: number): Promise<BalancesResult[]>
  balance(address: string, propertyId: number): Promise<BalanceResult>
  balancesHash(propertyId: number): Promise<BalancesHashResult>
  crowdSale(propertyId: number): Promise<CrowdSaleResult>
  currentConsensusHash(): Promise<CurrentConsensusHashResult>
  grants(propertyId: number): Promise<GrantsResult>
  info(): Promise<InfoResult>
  payload(txid: string): Promise<PayloadResult>
  property(propertyId: number): Promise<PropertyResult>
  seedBlocks(startBlock: number, endBlock: number): Promise<number[]>
  STO(txid: string, recipientFilter: string): Promise<STOResult>
  transaction(txid: string): Promise<TransactionResult>
  blockTransactions(index: number): Promise<string[]>
  pendingTransactions(address: string): Promise<PendingTransaction[]>
  properties(): Promise<PropertyResult[]>
  transactions(): Promise<TransactionResult[]>
}

export declare interface BalancesResult {
  propertyid: number
  balance: string
  reserved: string
}

export declare interface BalanceResult {
  balance: string
  reserved: string
}

export declare interface BalancesHashResult {
  block: number
  blockHash: string
  propertyid: number
  balanceshash: string
}

export declare interface CrowdSaleResult {
  propertyid: number
  name: string
  active: boolean
  issuer: string
  propertyiddesired: number
  precision: string
  tokensperunit: string
  earlybonus: number
  starttime: number
  deadline: number
  amountraised: string
  tokenissued: string
  addedissuertokens: string
  closedearly?: boolean
  maxtokens?: boolean
  endedtime?: number
  closetx?: string
}

export declare interface CurrentConsensusHashResult {
  block: number
  blockhash: string
  consensushash: string
}

export declare interface GrantsResult {
  propertyid: number
  name: string
  issuer: string
  creationtxid: string
  totaltokens: string
  issuances: Issuance[]
}

export declare interface Issuance {
  txid: string
  grant?: string
  revoke?: string
}

export declare interface InfoResult {
  wormholeversion_int: number
  wormholeversion: string
  bitcoincoreversion: string
  block: number
  blocktime: number
  blocktransactions: number
  totaltransactions: number
  alerts: Alert[]
}

export declare interface Alert {
  alerttypeint: number
  alerttype: string
  alertexpiry: string
  alertmessage: string
}

export declare interface PayloadResult {
  payload: string
  payloadsize: number
}

export declare interface PropertyResult {
  propertyid: number
  name: string
  category: string
  subcategory: string
  data: string
  url: string
  precision: number
  issuer: string
  creationtxid: string
  fixedissuance: boolean
  managedissuance: boolean
  totaltokens: string
}

export declare interface STOResult {
  txid: string
  fee: string
  sendingaddress: string
  ismine: boolean
  blocktime: number
  valid: boolean
  positioninblock: number
  version: number
  type_int: number
  type: string
  propertyid: number
  devisible: boolean
  amount: string
  confirmations: number
}

export declare interface TransactionResult {
  txid: string
  fee: string
  sendingaddress: string
  ismine: boolean
  version: number
  type_int: number
  confirmations: number
  referenceaddress?: string
  valid?: boolean
  invalidreason?: string
  blockhash?: string
  blocktime?: number
  positioninblock?: number
  block?: number
  propertyid?: number
  amount?: number
  precision?: number
  type?: string
  actualInvested?: number
  purchasedpropertyid?: number
  purchasedpropertyname?: string
  purchasedpropertyprecision?: number
  purchasedtokens?: string
  issuertokens?: string
  ecosystem?: string
  mature?: boolean
  Enough?: string
  burn?: string
  category?: string
  subcategory?: string
  propertyname?: string
  data?: string
  url?: string
  propertyiddesired?: number
  tokensperunit?: string
  deadline?: number
  earlybonus?: number
}

export declare interface PendingTransaction {
  txid: string
  fee: string
  sendingaddress: string
  referenceaddress?: string
  ismine: boolean
  version: number
  type_int: number
  type?: string
  confirmations: number
}

export declare interface PropertyResult {
  propertyid: number
  name: string
  category: string
  subcategory: string
  data: string
  url: string
  precision: number
}
