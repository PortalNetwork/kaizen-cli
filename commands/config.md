`kaizen config`
===============

Config management for KAIZEN

* [`kaizen config`](#kaizen-config)
* [`kaizen config set`](#kaizen-config-set)
* [`kaizen config get`](#kaizen-config-get)
* [`kaizen config unset`](#kaizen-config-unset)

## `kaizen config`

Config management for KAIZEN

```
Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen config set
  kaizen config get
  kaizen config unset
```

## `kaizen config set`

Set config variable to kaizen

```
Options:
  --help       Show help                                               [boolean]
  --version    Show version number                                     [boolean]
  --key, -k    Configuration key
            [string] [required] [choices: "privateKey", "provider", "networkId"]
  --value, -v  Configuration value                           [string] [required]

Examples:
  kaizen config set --key provider --value https://mainnet.infura.io
```

## `kaizen config get`

Get config variable

```
Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --key, -k  Configuration key
            [string] [required] [choices: "privateKey", "provider", "networkId"]

Examples:
  kaizen config get --key provider
```

## `kaizen config unset`

Unset config variable

```
Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --key, -k  Configuration key
            [string] [required] [choices: "privateKey", "provider", "networkId"]

Examples:
  kaizen config unset --key provider
```
