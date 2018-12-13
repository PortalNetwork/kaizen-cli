`kaizen nodes`
===============

node management for KAIZEN

* [`kaizen nodes`](#kaizen-nodes)
* [`kaizen nodes deploy`](#kaizen-nodes-deploy)
* [`kaizen nodes list`](#kaizen-nodes-list)
* [`kaizen nodes info`](#kaizen-nodes-list)

## `kaizen nodes`

Node management of KAIZEN Platform

```
Commands:
  kaizen nodes deploy  Deploy an node
  kaizen nodes list    List all nodes
  kaizen nodes info    Show node information

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen nodes deploy
  kaizen nodes info
  kaizen nodes list
```

## `kaizen nodes deploy`

Deploy an node

```
Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --protocol, -p  Protocol of the node
    [string] [required] [choices: "ipfs-gateway", "ipfs-api-server", "ethereum",
                                                             "wanchain", "icon"]
  --network, -n   Network of the node; mainnet: 1, testnet: 3
                                                             [string] [required]

Examples:
  kaizen nodes deploy --protocol ipfs-gateway --network 1
```

## `kaizen nodes list`

List all nodes

```
Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen nodes list
```

## `kaizen nodes info`

Show node information

```
Options:
  --help          Show help                                            [boolean]
  --version       Show version number                                  [boolean]
  --node, -i      Node id                                [string] [required]
  --type, -t      Type of the node
          [string] [required] [choices: "SHARED", "PUBLIC", "PRIVATE"] [default:
                                                                       "SHARED"]

Examples:
  kaizen nodes info --node 7 --type SHARED
```