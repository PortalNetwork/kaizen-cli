`kaizen instances`
===============

Instances management for KAIZEN

* [`kaizen instances`](#kaizen-instances)
* [`kaizen instances deploy`](#kaizen-instances-deploy)
* [`kaizen instances list`](#kaizen-instances-list)
* [`kaizen instances info`](#kaizen-instances-list)

## `kaizen instances`

Instance management of KAIZEN Platform

```
Commands:
  kaizen instances deploy  Deploy an instance
  kaizen instances list    Lists all instances
  kaizen instances info    Show instance information

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen instances deploy
  kaizen instances info
  kaizen instances list
```

## `kaizen instances deploy`

Deploy an instance

```
Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --protocol, -p  Protocol of the instance
    [string] [required] [choices: "ipfs-gateway", "ipfs-api-server", "ethereum",
                                                             "wanchain", "icon"]
  --network, -n   Network of the instance; mainnet: 1, testnet: 3
                                                             [string] [required]

Examples:
  kaizen instances deploy --protocol ipfs-gateway --network 1
```

## `kaizen instances list`

List all instances

```
Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen instances list
```

## `kaizen instances info`

Show instance information

```
Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --instance, -i  Instance id                                [string] [required]
  --type, -t      Type of the instance
          [string] [required] [choices: "SHARED", "PUBLIC", "PRIVATE"] [default:
                                                                       "SHARED"]

Examples:
  kaizen instances info --instance 7 --type SHARED
```