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

const mockBalance = [
  {
    tokenId: "968ff0cc4c93864001e03e9524e351250b94ec56150fa4897f65b0b6477d44d4",
    balance: "8987",
    decimalCount: 9
  },
  {
    tokenId: "00ea27261196a411776f81029c0ebe34362936b4a9847deb1f7a40a02b3a1476",
    balance: "1",
    decimalCount: 0
  },
  {
    tokenId: "a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37",
    balance: "725.9",
    decimalCount: 7
  },
  {
    tokenId: "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
    balance: "417",
    decimalCount: 8
  },
  {
    tokenId: "b96304d12f1bbc2196df582516410e55a9b34e13c7b4585bf5c1770af30d034f",
    balance: "1",
    decimalCount: 0
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

module.exports = {
  mockList,
  mockBalance,
  mockToken
}
