# SLP SDK

[Simple Ledger Protocol](https://simpleledger.cash) is an emerging standard for issuing secure tokens on the Bitcoin Cash blockchain.

[SLP SDK](https://developer.bitcoin.com/slp) is powered by [BITBOX](https://developer.bitcoin.com/bitbox).

## Installation

`npm install slp-sdk --global`

## REST integration

### List all tokens

```js
(async () => {
  try {
    let list = await SLP.list();
    console.log(list);
  } catch (error) {
    console.error(error);
  }
})();

// returns
 [ { id: '545cba6f72a08cbcb08c7d4e8166267942e8cb9a611328805c62fa538e861ba4',
    timestamp: '2018-08-14 13:42',
    symbol: '',
    name: '',
    document: '' },
  { id: '83bfe019fcf976142c55e7c0ad4a429f4be1bc2cb138bd8d0bab8dd4cd4758c4',
    timestamp: '2018-08-14 13:57',
    symbol: '',
    name: '',
    document: '' },
  { id: '323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d35',
    timestamp: '2018-08-14 17:53',
    symbol: '',
    name: '',
    document: '' },
```

### List single token

```js
(async () => {
  try {
    let list = await SLP.list(
      "323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d35"
    );
    console.log(list);
  } catch (error) {
    console.error(error);
  }
})();

// returns
{ id: '323a1e35ae0b356316093d20f2d9fbc995d19314b5c0148b78dc8d9c0dab9d35',
  timestamp: '2018-08-14 17:53',
  symbol: '',
  name: '',
  document: '' }
```

### Balances For Address

```js
(async () => {
  try {
    let list = await SLP.balancesForAddress('simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m');
    console.log(list);
  } catch (error) {
    console.error(error);
  }
})();

// returns
{ satoshis_available: 1092,
  satoshis_locked_in_minting_baton: 0,
  satoshis_locked_in_token: 1092,
  '1cda254d0a995c713b7955298ed246822bee487458cd9747a91d9e81d9d28125': '995',
  '047918c612e94cce03876f1ad2bd6c9da43b586026811d9b0d02c3c3e910f972': '100',
  slpAddress: 'simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m',
  cashAddress: 'bitcoincash:qz9tzs6d5097ejpg279rg0rnlhz546q4fslra7mh29',
  legacyAddress: '1DeLbv5EMzLEFDvQ8wZiKeSuPGGtSSz5HP' }
```

### Balance

```js
(async () => {
  try {
    let list = await SLP.balance(
      "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m",
      "047918c612e94cce03876f1ad2bd6c9da43b586026811d9b0d02c3c3e910f972"
    );
    console.log(list);
  } catch (error) {
    console.error(error);
  }
})();

// returns
{ id: '047918c612e94cce03876f1ad2bd6c9da43b586026811d9b0d02c3c3e910f972',
 timestamp: '2018-09-22 14:25',
 symbol: 'Ticker',
 name: 'Name',
 document: 'url',
 balance: '100',
 slpAddress: 'simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m',
 cashAddress: 'bitcoincash:qz9tzs6d5097ejpg279rg0rnlhz546q4fslra7mh29',
 legacyAddress: '1DeLbv5EMzLEFDvQ8wZiKeSuPGGtSSz5HP' }
```

### Convert

```js
(async () => {
  try {
    let list = await SLP.convert(
      "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m"
    );
    console.log(list);
  } catch (error) {
    console.error(error);
  }
})();

// returns
{ slpAddress: 'simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m', cashAddress: 'bitcoincash:qz9tzs6d5097ejpg279rg0rnlhz546q4fslra7mh29', legacyAddress: '1DeLbv5EMzLEFDvQ8wZiKeSuPGGtSSz5HP' }
```

## Console

Open a node repl w/ full SLP and BITBOX API build in

```
> slp console
> SLP.Mnemonic.generate()
'ostrich hamster scorpion total another gravity skull lonely boat announce valve purchase'
> (async () => {
  try {
    let list = await SLP.convert(
      "simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m"
    );
    console.log(list);
  } catch (error) {
    console.error(error);
  }
})();

{ slpAddress: 'simpleledger:qz9tzs6d5097ejpg279rg0rnlhz546q4fsnck9wh5m', cashAddress: 'bitcoincash:qz9tzs6d5097ejpg279rg0rnlhz546q4fslra7mh29', legacyAddress: '1DeLbv5EMzLEFDvQ8wZiKeSuPGGtSSz5HP' }
```

## Scaffolds

Create SLP apps in popular frameworks in less than a minute.

- [angular](https://github.com/Bitcoin-com/slp-scaffold-angular)
- [next](https://github.com/Bitcoin-com/slp-scaffold-next)
- [node](https://github.com/Bitcoin-com/slp-scaffold-node)
- [react](https://github.com/Bitcoin-com/slp-scaffold-react)
- [vue](https://github.com/Bitcoin-com/slp-scaffold-vue)

To create a new app

```
slp new myApp --scaffold react
```
