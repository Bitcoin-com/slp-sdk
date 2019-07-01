/*
  Contains mocked data used by unit tests.
*/

const mockList = [
  {
    decimals: 0,
    timestamp: "2019-04-29 08:59",
    timestampUnix: 1539218362,
    versionType: 1,
    documentUri: "",
    symbol: "WMW",
    name: "WheresMyWallet",
    containsBaton: false,
    id: "8fc284dcbc922f7bb7e2a443dc3af792f52923bba403fcf67ca028c88e89da0e",
    documentHash: null,
    initialTokenQty: 1000,
    blockCreated: 580336,
    blockLastActiveSend: 580336,
    blockLastActiveMint: null,
    txnsSinceGenesis: 1,
    validAddresses: 1,
    totalMinted: 1000,
    totalBurned: 0,
    circulatingSupply: 1000,
    mintingBatonStatus: "NEVER_CREATED"
  },
  {
    decimals: 0,
    timestamp: "2019-04-29 08:59",
    timestampUnix: 1539218362,
    versionType: 1,
    documentUri: "",
    symbol: "WMW",
    name: "Where'sMyWallet",
    containsBaton: false,
    id: "471d1f33e8a69cf59ce174ce43174feeecdf1f475ccc4cc3705600a5d6d2cd06",
    documentHash: null,
    initialTokenQty: 1000,
    blockCreated: 580336,
    blockLastActiveSend: 580351,
    blockLastActiveMint: null,
    txnsSinceGenesis: 2,
    validAddresses: 2,
    totalMinted: 1000,
    totalBurned: 0,
    circulatingSupply: 1000,
    mintingBatonStatus: "NEVER_CREATED"
  }
]

const mockToken = {
  decimals: 0,
  timestamp: "2018-08-25 01:54",
  timestampUnix: 1539218362,
  versionType: 1,
  documentUri: "",
  symbol: "USDT",
  name: "US Dollar Tether",
  containsBaton: false,
  id: "4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84",
  documentHash: null,
  initialTokenQty: 10000000000000000,
  blockCreated: 544903,
  blockLastActiveSend: 544905,
  blockLastActiveMint: null,
  txnsSinceGenesis: 3,
  validAddresses: 0,
  totalMinted: 10000000000000000,
  totalBurned: 10000000000000000,
  circulatingSupply: 0,
  mintingBatonStatus: "NEVER_CREATED"
}

const mockTokens = [
  {
    decimals: 0,
    timestamp: "2018-08-25 01:54",
    timestampUnix: 1539218362,
    versionType: 1,
    documentUri: "",
    symbol: "USDT",
    name: "US Dollar Tether",
    containsBaton: false,
    id: "4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84",
    documentHash: null,
    initialTokenQty: 10000000000000000,
    blockCreated: 544903,
    blockLastActiveSend: 544905,
    blockLastActiveMint: null,
    txnsSinceGenesis: 3,
    validAddresses: 0,
    totalMinted: 10000000000000000,
    totalBurned: 10000000000000000,
    circulatingSupply: 0,
    mintingBatonStatus: "NEVER_CREATED"
  },
  {
    decimals: 0,
    timestamp: "2019-04-29 08:59",
    timestampUnix: 1539218362,
    versionType: 1,
    documentUri: "",
    symbol: "WMW",
    name: "Where'sMyWallet",
    containsBaton: false,
    id: "471d1f33e8a69cf59ce174ce43174feeecdf1f475ccc4cc3705600a5d6d2cd06",
    documentHash: null,
    initialTokenQty: 1000,
    blockCreated: 580336,
    blockLastActiveSend: 580351,
    blockLastActiveMint: null,
    txnsSinceGenesis: 2,
    validAddresses: 2,
    totalMinted: 1000,
    totalBurned: 0,
    circulatingSupply: 1000,
    mintingBatonStatus: "NEVER_CREATED"
  }
]

const balancesForAddress = [
  {
    tokenId: "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
    balance: "1",
    balanceString: "1",
    slpAddress: "simpleledger:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvyucjzqt9",
    decimalCount: 8
  },
  {
    tokenId: "a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37",
    balance: "1",
    decimalCount: 7
  }
]

const mockBalance = {
  tokenId: "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
  balance: 1,
  balanceString: "1"
}

const mockRawTx = [
  "0100000002b3b54b72de3cdff8d00a5a26e2aa7897f730c2889c46b41a83294004a2c6c9c6020000006a47304402202fff3979f9cf0a5052655c8699081a77a653903de41547928db0b94601aa082502207cdb909e3a7b2b7f8a3eb80243a1bd2fd8ad9449a0ec30242ae4b187436d11a0412103b30e7096c6e3a3b45e5aba4ad8fe48a1fdd7c04de0de55a43095e7560b52e19dfeffffffd25817de09517a6af6c3dbb332041f85d844052b32ea1dbca123365b18953726000000006a473044022011a39acbbb80c4723822d434445fc4b3d72ad0212902fdb183a5408af00e158c02200eb3778b1af9f3a8fe28b6670f5fe543fb4c190f79f349273860125be05269b2412103b30e7096c6e3a3b45e5aba4ad8fe48a1fdd7c04de0de55a43095e7560b52e19dfeffffff030000000000000000336a04534c500001010747454e45534953084e414b414d4f544f084e414b414d4f544f4c004c0001084c0008000775f05a07400022020000000000001976a91433c0448680ca324225eeca7a230cf191ab88400288ac8afc0000000000001976a91433c0448680ca324225eeca7a230cf191ab88400288ac967a0800"
]

const mockIsValidTxid = [
  {
    txid: "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
    valid: true
  }
]

const mockBalancesForToken = [
  {
    tokenBalance: 1000,
    slpAddress: "simpleledger:qzhfd7ssy9nt4gw7j9w5e7w5mxx5w549rv7mknzqkz"
  }
]

const mockTokenStats = {
  tokenId: "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
  documentUri: "",
  symbol: "NAKAMOTO",
  name: "NAKAMOTO",
  decimals: 8,
  txnsSinceGenesis: 367,
  validUtxos: 248,
  validAddresses: 195,
  circulatingSupply: 20995990,
  totalBurned: 4010,
  totalMinted: 21000000,
  satoshisLockedUp: 135408
}

const mockTransactions = [
  {
    txid: "27e27170b546f05b2af69d6eddff8834038facf5d81302e9e562df09a5c4445f",
    tokenDetails: {
      valid: true,
      detail: {
        decimals: null,
        tokenIdHex:
          "495322b37d6b2eae81f045eda612b95870a0c2b6069c58f70cf8ef4e6a9fd43a",
        timestamp: null,
        transactionType: "SEND",
        versionType: 1,
        documentUri: null,
        documentSha256Hex: null,
        symbol: null,
        name: null,
        batonVout: null,
        containsBaton: null,
        genesisOrMintQuantity: null,
        sendOutputs: [
          {
            $numberDecimal: "0"
          },
          {
            $numberDecimal: "25"
          },
          {
            $numberDecimal: "77"
          }
        ]
      },
      invalidReason: null,
      schema_version: 30
    }
  }
]

const mockBurnTotal = {
  transactionId:
    "c7078a6c7400518a513a0bde1f4158cf740d08d3b5bfb19aa7b6657e2f4160de",
  inputTotal: 100000000,
  outputTotal: 100000000,
  burnTotal: 0
}

module.exports = {
  mockList,
  mockToken,
  mockTokens,
  balancesForAddress,
  mockRawTx,
  mockIsValidTxid,
  mockBalancesForToken,
  mockTokenStats,
  mockTransactions,
  mockBalance,
  mockBurnTotal
}
