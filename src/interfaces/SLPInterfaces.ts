export interface IConfig {
  restURL?: string
  slpdbURL?: string
}

export interface ICreateConfig {
  fundingAddress: string
  fundingWif: string
  tokenReceiverAddress: string
  batonReceiverAddress: string
  bchChangeReceiverAddress: string
  decimals: number
  name: string
  symbol: string
  documentUri: string
  documentHash: any
  initialTokenQty: number
}

export interface IMintConfig {
  fundingAddress: string
  fundingWif: string
  tokenReceiverAddress: string
  batonReceiverAddress: string
  bchChangeReceiverAddress: string
  tokenId: string
  additionalTokenQty: number
}

export interface ISendConfig {
  fundingAddress: string | string[]
  fundingWif: string | string[]
  tokenReceiverAddress: string | string[]
  bchChangeReceiverAddress: string
  tokenId: string
  amount: number | number[]
}

export interface IBurnConfig {
  fundingAddress: string
  fundingWif: string
  tokenId: string
  bchChangeReceiverAddress: string
  amount: number
}

export interface QueryInterface {
  amount?: number
  label?: string
  message?: string
}

export interface SLPDBResponse {
  message: string
}

export interface SLPSocketConfig {
  restURL?: string
  wsURL?: string
  slpsocketURL?: string
  callback?: Function
}
