export declare interface ERC20 {
  restURL: string
  config(token: Token, wallet: Wallet): void
  totalSupply(): Promise<string>
  balanceOf(owner: string): Promise<string>
  transfer(to: string, value: number, cb: (from: string, to: string, value: string) => any): Promise<boolean>
  transferFrom(from: string, to: string, value: number): Promise<boolean>
}

export declare interface Token {
  propertyid: number
}

export declare interface Wallet {
  mnemonic: string
}