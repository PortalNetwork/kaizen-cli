`kaizen upload`
===============

Upload project to server or decentralized storage

* [`kaizen upload`](#kaizen-upload)

## `kaizen upload`

Upload project to server or decentralized storage

```
Commands:
  kaizen upload ipfs [file]   Upload file or folder to IPFS
  kaizen upload btfs [file]   Upload file or folder to BTFS
  kaizen upload swarm [file]  Upload file to swarm

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen upload ipfs
  kaizen upload btfs
  kaizen upload swarm
```

## `kaizen upload ipfs`

Upload file or folder to IPFS

```
Positionals:
  file  the file or the folder which you want to upload to IPFS
                                                             [string] [required]

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  --host      host of IPFS endpoint
                                 [string] [required] [default: "ipfs.infura.io"]
  --port      port of IPFS endpoint        [string] [required] [default: "5001"]
  --protocol  protocol of IPFS endpoint   [string] [required] [default: "https"]

Examples:
  kaizen upload ipfs . => to upload the current folder
  kaizen upload ipfs ./build => to upload the build folder in the current
  folder
```

## `kaizen upload btfs`

Upload file or folder to BTFS

```
Positionals:
  file  the file or the folder which you want to upload to BTFS
                                                             [string] [required]

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  --host      host of BTFS endpoint
                                      [string] [required] [default: "localhost"]
  --port      port of BTFS endpoint        [string] [required] [default: "5001"]
  --protocol  protocol of BTFS endpoint   [string] [required] [default: "https"]

Examples:
  kaizen upload btfs . => to upload the current folder
  kaizen upload btfs ./build => to upload the build folder in the current
  folder
```

## `kaizen upload swarm`

Upload file to swarm

```
Positionals:
  file  the file which you want to upload to swarm           [string] [required]

Options:
  --help      Show help                                                [boolean]
  --version   Show version number                                      [boolean]
  --provider  swarm endpoint
               [string] [required] [default: "https://swarm-gateways.net/bzz:/"]

Examples:
  kaizen upload swarm [file] => to upload the file
```