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

const mockBalance = {
  satoshis_available_bch: 0,
  satoshis_in_slp_baton: 0,
  satoshis_in_slp_token: 1092,
  satoshis_in_invalid_token_dag: 0,
  satoshis_in_invalid_baton_dag: 0,
  slpTokenBalances: {
    df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb:
      "100000000",
    a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37: "10000000"
  },
  slpTokenUtxos: {
    df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb: [
      {
        satoshis: 546,
        txid:
          "4fc789405d58ec612c69eba29aa56cf0c7f228349801114138424eb68df4479d",
        amount: 0.00000546,
        confirmations: 348,
        height: 569108,
        vout: 1,
        cashAddress: "bitcoincash:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvg8nfhq4m",
        legacyAddress: "1ExLo45Z6CVXe7wS7SMN47W4khCZ2RqMRK",
        scriptPubKey: "76a9149911094b189e64075d2ebfcaef4c0aa767750fb388ac",
        tx: {
          txid:
            "4fc789405d58ec612c69eba29aa56cf0c7f228349801114138424eb68df4479d",
          version: 2,
          locktime: 0,
          vin: [
            {
              txid:
                "1b642e6b4cff7f928a67e3d425e7e9c2e13595c899c3cd4eec10ef165ece912d",
              vout: 1,
              sequence: 4294967295,
              n: 0,
              scriptSig: {
                hex:
                  "483045022100dc79a9bc3ab729eda54fe5f5764e32ab6c17f55ed1301f84c218dcb02c52c30f022025090a2eb3e396a7dab5bd98687aa8c79adda8d36b1860350f6f72857e2373a0412102b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed",
                asm:
                  "3045022100dc79a9bc3ab729eda54fe5f5764e32ab6c17f55ed1301f84c218dcb02c52c30f022025090a2eb3e396a7dab5bd98687aa8c79adda8d36b1860350f6f72857e2373a0[ALL|FORKID] 02b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed"
              },
              value: 17166589,
              legacyAddress: "1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB",
              cashAddress:
                "bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg"
            },
            {
              txid:
                "692bd3d08ab653a21735d0bb56dcc19726a6d4afa6bcfe17117c55af26cf6e32",
              vout: 0,
              sequence: 4294967295,
              n: 1,
              scriptSig: {
                hex:
                  "47304402207365c6b8070a74b63bfdcf746562d7ad9b55cc0b6ebb166429aff323aca6854302207f4bbdb171f620ad5586db29123b28bfc23934a4f8b4e6de797767cf0a93312d412102b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed",
                asm:
                  "304402207365c6b8070a74b63bfdcf746562d7ad9b55cc0b6ebb166429aff323aca6854302207f4bbdb171f620ad5586db29123b28bfc23934a4f8b4e6de797767cf0a93312d[ALL|FORKID] 02b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed"
              },
              value: 200000,
              legacyAddress: "1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB",
              cashAddress:
                "bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg"
            },
            {
              txid:
                "587e1522ff1ff6109e760cc7080791975fca5e28419b6f7342af7bb69598d48b",
              vout: 0,
              sequence: 4294967295,
              n: 2,
              scriptSig: {
                hex:
                  "47304402202994dc27cef14a49823ba8e81a5e382aa8c2c890747de93e5ab6cce098fb4f47022070330f5f820309fe2646767d37f48e44724d6ed391ee6ec788335ef3b3f640da412102b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed",
                asm:
                  "304402202994dc27cef14a49823ba8e81a5e382aa8c2c890747de93e5ab6cce098fb4f47022070330f5f820309fe2646767d37f48e44724d6ed391ee6ec788335ef3b3f640da[ALL|FORKID] 02b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed"
              },
              value: 100000,
              legacyAddress: "1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB",
              cashAddress:
                "bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg"
            },
            {
              txid:
                "cc86cca45a0be4d7bd1fad47261342a00d5492c9a94312aec8ead37c716ecb30",
              vout: 2,
              sequence: 4294967295,
              n: 3,
              scriptSig: {
                hex:
                  "47304402203b514bdcb317479bae02df487bca209a1c159bc02e1fd31f0c4665f23442a8700220418e14dfd07f626d98673d0c18d49cca2071f34da3df58de784a398dda7a8e3e412102b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed",
                asm:
                  "304402203b514bdcb317479bae02df487bca209a1c159bc02e1fd31f0c4665f23442a8700220418e14dfd07f626d98673d0c18d49cca2071f34da3df58de784a398dda7a8e3e[ALL|FORKID] 02b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed"
              },
              value: 546,
              legacyAddress: "1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB",
              cashAddress:
                "bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg"
            }
          ],
          vout: [
            {
              value: "0.00000000",
              n: 0,
              scriptPubKey: {
                hex:
                  "6a04534c500001010453454e4420df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb080000000005f5e1000800005ae270b4b600",
                asm:
                  "OP_RETURN 5262419 1 1145980243 df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb 0000000005f5e100 00005ae270b4b600"
              },
              spentTxId: null,
              spentIndex: null,
              spentHeight: null
            },
            {
              value: "0.00000546",
              n: 1,
              scriptPubKey: {
                hex: "76a9149911094b189e64075d2ebfcaef4c0aa767750fb388ac",
                asm:
                  "OP_DUP OP_HASH160 9911094b189e64075d2ebfcaef4c0aa767750fb3 OP_EQUALVERIFY OP_CHECKSIG",
                addresses: ["1ExLo45Z6CVXe7wS7SMN47W4khCZ2RqMRK"],
                type: "pubkeyhash"
              },
              spentTxId: null,
              spentIndex: null,
              spentHeight: null
            },
            {
              value: "0.00000546",
              n: 2,
              scriptPubKey: {
                hex: "76a914e9d42fb8b90cc1b8dcf698280bb3a066ce08876f88ac",
                asm:
                  "OP_DUP OP_HASH160 e9d42fb8b90cc1b8dcf698280bb3a066ce08876f OP_EQUALVERIFY OP_CHECKSIG",
                addresses: ["1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB"],
                type: "pubkeyhash"
              },
              spentTxId:
                "de69468f85f54f889b1a915274c8935e9d68245e9593a524a89647bc21a44b2d",
              spentIndex: 1,
              spentHeight: 569197
            },
            {
              value: "0.17465231",
              n: 3,
              scriptPubKey: {
                hex: "76a914e9d42fb8b90cc1b8dcf698280bb3a066ce08876f88ac",
                asm:
                  "OP_DUP OP_HASH160 e9d42fb8b90cc1b8dcf698280bb3a066ce08876f OP_EQUALVERIFY OP_CHECKSIG",
                addresses: ["1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB"],
                type: "pubkeyhash"
              },
              spentTxId:
                "384e1b8197e8de7d38f98317af2cf5f6bcb50007c46943b3498a6fab6e8aeb7c",
              spentIndex: 0,
              spentHeight: 569108
            }
          ],
          blockhash:
            "0000000000000000025fdf811ef86348ebd0511f4045c4cd83f6b75fcd8c2661",
          blockheight: 569108,
          confirmations: 348,
          time: 1549788135,
          blocktime: 1549788135,
          valueOut: 0.17466323,
          size: 774,
          valueIn: 0.17467135,
          fees: 0.00000812
        },
        slpTransactionDetails: {
          versionType: 1,
          transactionType: 2,
          tokenIdHex:
            "df808a41672a0a0ae6475b44f272a107bc9961b90f29dc918d71301f24fe92fb",
          sendOutputs: ["0", "100000000", "99928600000000"]
        },
        slpUtxoJudgement: 1,
        slpUtxoJudgementAmount: "100000000"
      }
    ],
    a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37: [
      {
        satoshis: 546,
        txid:
          "384e1b8197e8de7d38f98317af2cf5f6bcb50007c46943b3498a6fab6e8aeb7c",
        amount: 0.00000546,
        confirmations: 348,
        height: 569108,
        vout: 1,
        cashAddress: "bitcoincash:qzv3zz2trz0xgp6a96lu4m6vp2nkwag0kvg8nfhq4m",
        legacyAddress: "1ExLo45Z6CVXe7wS7SMN47W4khCZ2RqMRK",
        scriptPubKey: "76a9149911094b189e64075d2ebfcaef4c0aa767750fb388ac",
        tx: {
          txid:
            "384e1b8197e8de7d38f98317af2cf5f6bcb50007c46943b3498a6fab6e8aeb7c",
          version: 2,
          locktime: 0,
          vin: [
            {
              txid:
                "4fc789405d58ec612c69eba29aa56cf0c7f228349801114138424eb68df4479d",
              vout: 3,
              sequence: 4294967295,
              n: 0,
              scriptSig: {
                hex:
                  "483045022100d77ee0c0c1129c658637bcf9ccb215a2c79ab31095ee2078457f51b7e8de047502205edb6710f0f00377a04c8c06449618b2ba41a65e44665fac93e81072b1710fe4412102b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed",
                asm:
                  "3045022100d77ee0c0c1129c658637bcf9ccb215a2c79ab31095ee2078457f51b7e8de047502205edb6710f0f00377a04c8c06449618b2ba41a65e44665fac93e81072b1710fe4[ALL|FORKID] 02b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed"
              },
              value: 17465231,
              legacyAddress: "1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB",
              cashAddress:
                "bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg"
            },
            {
              txid:
                "1baa9662b3a9e7fc690cfee1b3baa125875219cb79c5faf1d338ef1bba8ea9fc",
              vout: 2,
              sequence: 4294967295,
              n: 1,
              scriptSig: {
                hex:
                  "483045022100eaa65ccd71c8d76843ac03cd3abd9b6dd1618bb191600f816a3af35c2ebcea98022073dc30d8fe8b1712b07b4dc98a0a7ac74674b228e991036b956e064c28e149e0412102b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed",
                asm:
                  "3045022100eaa65ccd71c8d76843ac03cd3abd9b6dd1618bb191600f816a3af35c2ebcea98022073dc30d8fe8b1712b07b4dc98a0a7ac74674b228e991036b956e064c28e149e0[ALL|FORKID] 02b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed"
              },
              value: 546,
              legacyAddress: "1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB",
              cashAddress:
                "bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg"
            },
            {
              txid:
                "e60f61b24b2e55b18522c573395023f0ead6b86b6c6fb036b07e6acd4cb3540d",
              vout: 1,
              sequence: 4294967295,
              n: 2,
              scriptSig: {
                hex:
                  "47304402202c9f9bd78541e6436019a8fc51623cdaa6dbe19560eaed350de000463656f46a02203b1558a88a7270fbaf854fa0238ac37d3248f46d7016c6d331e1f36720ab253f412102b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed",
                asm:
                  "304402202c9f9bd78541e6436019a8fc51623cdaa6dbe19560eaed350de000463656f46a02203b1558a88a7270fbaf854fa0238ac37d3248f46d7016c6d331e1f36720ab253f[ALL|FORKID] 02b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed"
              },
              value: 546,
              legacyAddress: "1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB",
              cashAddress:
                "bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg"
            },
            {
              txid:
                "88dd5769ec767420c499c77152d67950333392c41b98387e0994f069d16dd0d3",
              vout: 1,
              sequence: 4294967295,
              n: 3,
              scriptSig: {
                hex:
                  "483045022100890318fbbf5409f5c3d84083983871cfb1e7b7c6f01692de26ff33254f32e62102202436d29d3755d6d50103188f94a9d3165a051478f2d0f69bf242ec6cdb275d0f412102b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed",
                asm:
                  "3045022100890318fbbf5409f5c3d84083983871cfb1e7b7c6f01692de26ff33254f32e62102202436d29d3755d6d50103188f94a9d3165a051478f2d0f69bf242ec6cdb275d0f[ALL|FORKID] 02b2a5564a9e8f3a268f0fdd155d318616cac19930dad11e982f3ecdb4fe319aed"
              },
              value: 546,
              legacyAddress: "1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB",
              cashAddress:
                "bitcoincash:qr5agtachyxvrwxu76vzszan5pnvuzy8dumh7ynrwg"
            }
          ],
          vout: [
            {
              value: "0.00000000",
              n: 0,
              scriptPubKey: {
                hex:
                  "6a04534c500001010453454e4420a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd370800000000009896800800000001ab01f700",
                asm:
                  "OP_RETURN 5262419 1 1145980243 a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37 0000000000989680 00000001ab01f700"
              },
              spentTxId: null,
              spentIndex: null,
              spentHeight: null
            },
            {
              value: "0.00000546",
              n: 1,
              scriptPubKey: {
                hex: "76a9149911094b189e64075d2ebfcaef4c0aa767750fb388ac",
                asm:
                  "OP_DUP OP_HASH160 9911094b189e64075d2ebfcaef4c0aa767750fb3 OP_EQUALVERIFY OP_CHECKSIG",
                addresses: ["1ExLo45Z6CVXe7wS7SMN47W4khCZ2RqMRK"],
                type: "pubkeyhash"
              },
              spentTxId: null,
              spentIndex: null,
              spentHeight: null
            },
            {
              value: "0.00000546",
              n: 2,
              scriptPubKey: {
                hex: "76a914e9d42fb8b90cc1b8dcf698280bb3a066ce08876f88ac",
                asm:
                  "OP_DUP OP_HASH160 e9d42fb8b90cc1b8dcf698280bb3a066ce08876f OP_EQUALVERIFY OP_CHECKSIG",
                addresses: ["1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB"],
                type: "pubkeyhash"
              },
              spentTxId: null,
              spentIndex: null,
              spentHeight: null
            },
            {
              value: "0.17464965",
              n: 3,
              scriptPubKey: {
                hex: "76a914e9d42fb8b90cc1b8dcf698280bb3a066ce08876f88ac",
                asm:
                  "OP_DUP OP_HASH160 e9d42fb8b90cc1b8dcf698280bb3a066ce08876f OP_EQUALVERIFY OP_CHECKSIG",
                addresses: ["1NKNdfgPq1EApuNaf5mrNRUPbwVHQt3MeB"],
                type: "pubkeyhash"
              },
              spentTxId:
                "7193686a145f35fb88aef0a7b21c4455d922adfb4054ee99b16ad1086a7419d5",
              spentIndex: 0,
              spentHeight: 569123
            }
          ],
          blockhash:
            "0000000000000000025fdf811ef86348ebd0511f4045c4cd83f6b75fcd8c2661",
          blockheight: 569108,
          confirmations: 348,
          time: 1549788135,
          blocktime: 1549788135,
          valueOut: 0.17466057,
          size: 776,
          valueIn: 0.17466869,
          fees: 0.00000812
        },
        slpTransactionDetails: {
          versionType: 1,
          transactionType: 2,
          tokenIdHex:
            "a436c8e1b6bee3d701c6044d190f76f774be83c36de8d34a988af4489e86dd37",
          sendOutputs: ["0", "10000000", "7164000000"]
        },
        slpUtxoJudgement: 1,
        slpUtxoJudgementAmount: "10000000"
      }
    ]
  },
  slpBatonUtxos: {},
  nonSlpUtxos: [],
  invalidTokenUtxos: [],
  invalidBatonUtxos: []
}

const mockTokenMeta = [
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

module.exports = {
  mockList,
  mockBalance,
  mockToken,
  mockTokenMeta
}
