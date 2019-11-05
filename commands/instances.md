`kaizen instances`
===============

Instance management for KAIZEN

* [`kaizen instances`](#kaizen-instances)
* [`kaizen instances list`](#kaizen-instances-list)
* [`kaizen instances run`](#kaizen-instances-run)
* [`kaizen instances template`](#kaizen-instances-template)

## `kaizen instances`

Instance management for KAIZEN

```
Commands:
  kaizen instances run [instance]  Run an instance on AWS
  kaizen instances list            List instances of instance name
  kaizen instances template        Template lists of all available instance

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen instances run
  kaizen instances template
  kaizen instances list

Available instance templates:

nym-loopix-mixnode - Nym is a blockchain-based privacy platform.

Run 'kaizen instances <command>' to deploy instances to AWS.
```

## `kaizen instances list`

List running instances

```
List instances of instance name

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## `kaizen instances run`

Run an instance on AWS

```
Run an instance on AWS

Positionals:
  instance, i  instance name                                 [string] [required]

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

Examples:
  kaizen instances run nym-loopix-mixnode
```

## `kaizen instances template`

Show all instance template support by KAIZEN

```
Available instance template:
nym-loopix-mixnode - Nym is a blockchain-based privacy platform.

To start a instance run 'kaizen instances run <instance-name-here>'

It will be automatically start instance on AWS
```
