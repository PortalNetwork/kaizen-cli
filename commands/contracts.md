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

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen contracts deploy

KAIZEN support smart contracts:You can develop, test, deploy smart contract
though KAIZEN CLI

Support contract template:

ERC20 - ERC20 Token Standard,
https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20
ERC721 - ERC721 Token Standard,
https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC721

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

ERC20 - ERC20 Token Standard,
https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20
ERC721 - ERC721 Token Standard,
https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC721
```
