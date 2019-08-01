import { BITBOX } from "bitbox-sdk"
import Address from "./Address"

// consts
const addy: any = new Address()
export function returnNetwork(address: string): string {
  return addy.detectAddressNetwork(address)
}

export function returnBITBOXInstance(network: string): any {
  let tmpBITBOX: any

  let restURL: string
  if (network === "mainnet") restURL = "https://rest.bitcoin.com/v2/"
  else restURL = "https://trest.bitcoin.com/v2/"

  return new BITBOX({ restURL: restURL })
}
export function validateAddressFormat(config: any): string | void {
  // validate address formats
  // fundingAddress, tokenReceiverAddress and batonReceiverAddress must be simpleledger format
  // bchChangeReceiverAddress can be either simpleledger or cashAddr format
  // validate fundingAddress format
  // single fundingAddress
  if (config.fundingAddress && !addy.isSLPAddress(config.fundingAddress))
    throw Error("Funding Address must be simpleledger format")

  // bulk fundingAddress
  if (config.fundingAddress && Array.isArray(config.fundingAddress)) {
    config.fundingAddress.forEach((address: string) => {
      if (!addy.isSLPAddress(address))
        throw Error("Funding Address must be simpleledger format")
    })
  }

  // validate tokenReceiverAddress format
  // single tokenReceiverAddress
  if (
    config.tokenReceiverAddress &&
    !addy.isSLPAddress(config.tokenReceiverAddress)
  )
    throw Error("Token Receiver Address must be simpleledger format")

  // bulk tokenReceiverAddress
  if (
    config.tokenReceiverAddress &&
    Array.isArray(config.tokenReceiverAddress)
  ) {
    config.tokenReceiverAddress.forEach((address: string) => {
      if (!addy.isSLPAddress(address))
        throw Error("Token Receiver Address must be simpleledger format")
    })
  }

  // validate bchChangeReceiverAddress format
  if (
    config.bchChangeReceiverAddress &&
    !addy.isCashAddress(config.bchChangeReceiverAddress)
  )
    throw Error("BCH Change Receiver Address must be cash address format")

  // validate batonReceiverAddress format
  if (
    config.batonReceiverAddress &&
    !addy.isSLPAddress(config.batonReceiverAddress)
  )
    throw Error("Baton Receiver Address must be simpleledger format")
}
