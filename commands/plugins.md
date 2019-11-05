`kaizen plugins`
===============

Plugin management for KAIZEN

* [`kaizen plugins`](#kaizen-plugins)
* [`kaizen plugins list`](#kaizen-plugins-list)
* [`kaizen plugins install`](#kaizen-plugins-install)
* [`kaizen plugins uninstall`](#kaizen-plugins-uninstall)

## `kaizen plugins`

Plugin management for KAIZEN

```
Commands:
  kaizen plugins install [plugin]    Install and add a plugin to your project
  kaizen plugins uninstall [plugin]  Uninstall and remove a plugin to your
                                     project
  kaizen plugins list                Lists all available plugins

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen plugins install
  kaizen plugins uninstall
  kaizen plugins list

Available plugins:

bluzelle - Decentralized database
nkn - Data transmisstion
noia - Decentralized CDN
icon - Blockchain
orbit - Decentralized database
arweave - Decentralized file storage

Run 'kaizen plugins <command>' to interact with plugins.
```

## `kaizen plugins list`

List available plugins

```
Available plugin list:
bluzelle - Bluzelle information
nkn - NKN information
noia - NOIA information
icon - ICON information
orbit - Orbit information
arweave - Decentralized file storage

To install a plugin run 'kaizen plugins install <plugin-name-here>'

It will be automatically downloaded and added to your 'package.json' and 'kaizen.json' file
```

## `kaizen plugins install`

Install and add a plugin to your project

```
Positionals:
  plugin, p  plugin name                                     [string] [required]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen plugins install bluzelle
  kaizen plugins install nkn
```

## `kaizen plugins uninstall`

Uninstall and remove a plugin to your project

```
Positionals:
  plugin, p  plugin name                                     [string] [required]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen plugins uninstall bluzelle
  kaizen plugins uninstall nkn
  kaizen plugins uninstall arweave
```
