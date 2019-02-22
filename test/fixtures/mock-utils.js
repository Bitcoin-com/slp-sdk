/*
  Contains mocked data used by unit tests.
*/

"use strict"

const mockList = [
  {
    id: "386e85e556ba273e8e733944fa09184ad473badc47256a90ca967e98c760fd68",
    timestamp: "2018-10-13 10:33",
    symbol: "USD",
    name: "Dollar",
    documentUri: "15119324642@163.com",
    documentHash: "",
    decimals: 5,
    initialTokenQty: 1000000000
  },
  {
    id: "437ce1491119a1786f8e17a30d550f8a3a7b9eaa4477c21401d036efc34e7032",
    timestamp: "2018-10-13 08:52",
    symbol: "CNY",
    name: "Chinese Yuan",
    documentUri: "15119324642@163.com",
    documentHash: "",
    decimals: 5,
    initialTokenQty: 1000000000
  },
  {
    id: "03de34ad3dc1875383920592fbca538b51ff4740f283016bf673484c7a7d9c75",
    timestamp: "2018-10-13 08:52",
    symbol: "RMB",
    name: "Renminbi",
    documentUri: "15119324642@163.com",
    documentHash: "",
    decimals: 5,
    initialTokenQty: 1000000000
  },
  {
    id: "00ecb68463600b091e832eed48a2155cff01a0d0930c45f9194f4f289e1330f3",
    timestamp: "2018-10-12 13:08",
    symbol: "ART$",
    name: "Art Dollar",
    documentUri: "",
    documentHash: "",
    decimals: 0,
    initialTokenQty: 21000000
  },
  {
    id: "14c6d416ed14ef7fddacc58b05abf60b13d0ebaacee901282d4d2e37fc0dfcb1",
    timestamp: "2018-10-11 20:54",
    symbol: "rwc",
    name: "cashroyale",
    documentUri: "",
    documentHash: "",
    decimals: 0,
    initialTokenQty: 100000
  }
]

const mockToken = {
  id: "4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84",
  timestamp: "2018-08-25 03:54",
  symbol: "USDT",
  name: "US Dollar Tether",
  documentUri: "",
  documentHash: "",
  decimals: 0,
  initialTokenQty: 10000000000000000
}

const mockTokens = [
  {
    id: "4276533bb702e7f8c9afd8aa61ebf016e95011dc3d54e55faa847ac1dd461e84",
    timestamp: "2018-08-25 03:54",
    symbol: "USDT",
    name: "US Dollar Tether",
    documentUri: "",
    documentHash: "",
    decimals: 0,
    initialTokenQty: 10000000000000000
  },
  {
    id: "b3f4f132dc3b9c8c96316346993a8d54d729715147b7b11aa6c8cd909e955313",
    timestamp: "2019-01-30 21:56",
    symbol: "SLPJS",
    name: "Awesome SLPJS README Token",
    documentUri: "info@simpleledger.io",
    documentHash: "",
    decimals: 2,
    initialTokenQty: 1000000
  }
]

const balancesForAddress = [
  {
    tokenId: "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
    balance: "1",
    decimalCount: 8
  },
  {
    tokenId: "a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37",
    balance: "1",
    decimalCount: 7
  }
]

const mockRawTx = [
  "0100000002b3b54b72de3cdff8d00a5a26e2aa7897f730c2889c46b41a83294004a2c6c9c6020000006a47304402202fff3979f9cf0a5052655c8699081a77a653903de41547928db0b94601aa082502207cdb909e3a7b2b7f8a3eb80243a1bd2fd8ad9449a0ec30242ae4b187436d11a0412103b30e7096c6e3a3b45e5aba4ad8fe48a1fdd7c04de0de55a43095e7560b52e19dfeffffffd25817de09517a6af6c3dbb332041f85d844052b32ea1dbca123365b18953726000000006a473044022011a39acbbb80c4723822d434445fc4b3d72ad0212902fdb183a5408af00e158c02200eb3778b1af9f3a8fe28b6670f5fe543fb4c190f79f349273860125be05269b2412103b30e7096c6e3a3b45e5aba4ad8fe48a1fdd7c04de0de55a43095e7560b52e19dfeffffff030000000000000000336a04534c500001010747454e45534953084e414b414d4f544f084e414b414d4f544f4c004c0001084c0008000775f05a07400022020000000000001976a91433c0448680ca324225eeca7a230cf191ab88400288ac8afc0000000000001976a91433c0448680ca324225eeca7a230cf191ab88400288ac967a0800"
]

const mockIsValidTxid = [
  {
    txid: "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
    valid: true
  }
]

module.exports = {
  mockList,
  mockToken,
  mockTokens,
  balancesForAddress,
  mockRawTx,
  mockIsValidTxid
}
