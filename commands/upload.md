`kaizen upload`
===============

Upload project to server or decentralized storage

* [`kaizen upload`](#kaizen-upload)

## `kaizen upload`

Upload project to server or decentralized storage

```
Commands:
  kaizen upload ipfs [file]  To upload file or folder to IPFS

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen upload ipfs
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