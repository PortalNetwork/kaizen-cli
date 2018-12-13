`kaizen blockchains`
===============

Blockchain management for KAIZEN

* [`kaizen blockchains`](#kaizen-blockchains)
* [`kaizen blockchains faucet`](#kaizen-blockchains-faucet)
* [`kaizen blockchains tx`](#kaizen-blockchains-tx)
* [`kaizen blockchains balance`](#kaizen-blockchains-balance)

## `kaizen blockchains`

Blockchain management for KAIZEN

```
Commands:
  kaizen blockchains faucet   Get testnet token
  kaizen blockchains tx       Get transaction hash information
  kaizen blockchains balance  Get address balance

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen blockchains tx
  kaizen blockchains balance
  kaizen blockchains faucet

Support blockchains:

ethereum - Etheruem blockchain
wanchain - Wanchain blockchain

Run 'kaizen blockchains <command>' to interact with blockchain.
```

## `kaizen blockchains faucet`

Get testnet token

```
Options:
  --help            Show help                                          [boolean]
  --version         Show version number                                [boolean]
  --blockchain, -b  Name of the blockchain
       [string] [required] [choices: "eth", "etc", "wan", "icon", "qtum", "neo",
                                                           "qkc", "bch", "tomo"]
  --network, -n     Specify the network       [string] [required] [choices: "3"]
  --address, -a     Your wallet address                      [string] [required]

Examples:
  kaizen blockchains faucet --blockchain eth --network 3 --address
  0x2d2B3CD3E585fF4065B55668dCac22EBd9E3590D

Support blockchain faucet:

ethereum - Ethereum Ropsten testnet, network: 3
wanchain - Wanchain testnet, network: 3
icon - ICON Yeouido testnet, network: 3
quarkchain - QuarkChain testnet, network: 3
```

## `kaizen blockchains tx`

Get transaction hash information

```
Options:
  --help            Show help                                          [boolean]
  --version         Show version number                                [boolean]
  --blockchain, -b  Blockchain                               [string] [required]
  --network, -n     Network of the blockchain                [string] [required]
  --txhash, -t      Address of the balance                   [string] [required]

Examples:
  kaizen blockchains tx --blockchain ethereum --network 1 --txhash
  0x8457c253451ba31d1292d04083aa47d94b33017bd5ff75794d3381c708c23467
```

## `kaizen blockchains balance`

Get address balance

```
Options:
  --help            Show help                                          [boolean]
  --version         Show version number                                [boolean]
  --blockchain, -b  Blockchain                               [string] [required]
  --network, -n     Network of the blockchain                [string] [required]
  --address, -a     Address of the balance                   [string] [required]

Examples:
  kaizen blockchains balance --blockchain ethereum --network 1 --address
  0x0000000000000000000000000000000000000000
```
