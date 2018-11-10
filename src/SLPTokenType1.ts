const slptokentype1 = require("slpjs/lib/slptokentype1")
const slp = require("slpjs").slp

class SlpTokenType1 {
  lokadIdHex(): string {
    return "534c5000"
  }

  buildGenesisOpReturn(
    ticker: any,
    name: any,
    documentUrl: any,
    documentHash: any,
    decimals: any,
    batonVout: any,
    initialQuantity: any
  ): any {
    return slptokentype1.buildGenesisOpReturn(
      ticker,
      name,
      documentUrl,
      documentHash,
      decimals,
      batonVout,
      initialQuantity
    )
  }

  buildSendOpReturn(tokenIdHex: any, outputQtyArray: any): any {
    return slptokentype1.buildSendOpReturn(tokenIdHex, outputQtyArray)
  }

  buildRawGenesisTx(config: any, type: any): any {
    return slp.buildRawGenesisTx(config, type)
  }

  buildRawSendTx(config: any, type: any): any {
    return slptokentype1.buildRawSendTx(config, type)
  }

  decodeTxOut(txOut: any): any {
    return slptokentype1.decodeTxOut(txOut)
  }

  decodeMetadata(txDetails: any): any {
    return slptokentype1.decodeMetadata(txDetails)
  }

  calculateGenesisCost(
    genesisOpReturnLength: any,
    inputUtxoSize: any,
    batonAddress: any = null,
    bchChangeAddress: any = null,
    feeRate: any = 1
  ): any {
    return slptokentype1.calculateGenesisCost(
      genesisOpReturnLength,
      inputUtxoSize,
      batonAddress,
      bchChangeAddress,
      feeRate
    )
  }

  calculateSendCost(
    sendOpReturnLength: any,
    inputUtxoSize: any,
    outputAddressArraySize: any,
    bchChangeAddress: any = null,
    feeRate: any = 1
  ): any {
    return slptokentype1.calculateSendCost(
      sendOpReturnLength,
      inputUtxoSize,
      outputAddressArraySize,
      bchChangeAddress,
      feeRate
    )
  }
}

export default SlpTokenType1
