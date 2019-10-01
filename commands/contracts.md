`kaizen contracts`
===============

Contract management for KAIZEN

* [`kaizen contracts`](#kaizen-contracts)
* [`kaizen contracts deploy`](#kaizen-contracts-deploy)

## `kaizen contracts`

Contract management for KAIZEN

```
Commands:
  kaizen contracts deploy  Deploy smart contracts
  kaizen contracts list    Lists all available contracts

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen contracts deploy
  kaizen contracts list

KAIZEN support smart contracts:You can develop, test, deploy smart contract
though KAIZEN CLI

Support contract template:

Chainlink - Chainlink Oracle Service,
https://github.com/PortalNetwork/kaizen-contracts/tree/master/Chainlink
ERC20 - ERC20 Token Standard,
https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20
ERC721 - ERC721 Token Standard,
https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC721
NuCypher - NuCypher
Contractshttps://github.com/PortalNetwork/kaizen-contracts/tree/master/NuCypher

NOTE: Please make sure use 'kaizen config set --key <KEY> --value <VALUE>' to
setup the configuration before you deploy smart contracts.
```

## `kaizen contracts deploy`

Deploy contracts through KAIZEN

```
Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --url, -u  URL of the template contract                    [string] [required]

Examples:
  kaizen contracts deploy -u
  https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20

Please enter the url of the template contract

Support contract template:

Chainlink - Chainlink Oracle Service,
https://github.com/PortalNetwork/kaizen-contracts/tree/master/Chainlink
ERC20 - ERC20 Token Standard,
https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20
ERC721 - ERC721 Token Standard,
https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC721
NuCypher - NuCypher
Contractshttps://github.com/PortalNetwork/kaizen-contracts/tree/master/NuCypher
```

## `kaizen contracts list`

List all contracts support by KAIZEN

```
Available contract list:
ChainLink - Chainlink Oracle Service, link: https://github.com/PortalNetwork/kaizen-contracts/tree/master/Chainlink
ERC20 - ERC20 Token Standard, link: https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20
ERC721 - ERC721 Token Standard, link: https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC721
NuCypher - NuCypher Contracts, link: https://github.com/PortalNetwork/kaizen-contracts/tree/master/NuCypher

To install a plugin run 'kaizen contracts deploy <contract-link-here>'
```
