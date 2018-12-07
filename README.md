<p align=center>
<img src="./assets/title.png">
</p>


<p align=center>
<h1 align=center>KAIZEN CLI</h1>
</p>

<a target="_blank" href="https://circleci.com/gh/PhyrexTsai/kaizen-cli" title="CircleCI"><img src="https://circleci.com/gh/PhyrexTsai/kaizen-cli/tree/master.svg?style=shield"></a>
<a target="_blank" href="https://github.com/PortalNetwork/kaizen-cli/pulls" title="PRs Welcome"><img src="https://img.shields.io/badge/PRs-welcome-blue.svg"></a>
<a href="#"><img src="https://img.shields.io/hackage-deps/v/lens.svg"/></a>
[![Join the chat at https://gitter.im/PortalNetwork/kaizen-cli](https://badges.gitter.im/PortalNetwork/kaizen-cli.svg)](https://gitter.im/PortalNetwork/kaizen-cli?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<a target="_blank" href="#"><img src="https://img.shields.io/github/license/mashape/apistatus.svg"/></a>

> One stop solution for dapp developers

| [English](./README.md) | [한국어](./README_KR.md) | [中文](./README_ZH.md) |

## 🚀 Overview
KAIZEN is an one stop solution for dapp and dweb developer. With KAIZEN, you get:

- Built-in smart contract deployment.
- Automated code testing with Mocha and Chai.
- Configurable with support technologies for custom build processes.

## 📚 Contents
- [Quick Start](#quick-start)
- [Examples](https://github.com/PortalNetwork/kaizen-examples)
- [Contracts](https://github.com/PortalNetwork/kaizen-contracts)
- [Command Topics](#command-topics)
- [Plugins](#plugins)
- [Community](#community)
- [Contributing](#contributing)
- [Licence](#licence)

## <a name="quick-start"></a>🚀 Quick Start
1. Install via npm:
```
npm install -g kaizen-cli 
```

2. Create a project:
```
kaizen create --template react --name myproject
```

3. Deploy smart contracts:
```
kaizen contracts deploy --url https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20
```

4. Upload project to IPFS:
```
kaizen upload ipfs ./build
```

## <a name="command-topics"></a>🔨 Command Topics

- `kaizen config` - Configure KAIZEN
- `kaizen create` - Create new KAIZEN project
- `kaizen install` - Install a KAIZEN project from GitHub
- `kaizen upload` - Upload a KAIZEN project
- `kaizen plugins` - Plugin management for KAIZEN 
- `kaizen plugins install` - Install and add a plugin to your project
- `kaizen plugins uninstall` - Uninstall and remove a plugin from your project 
- `kaizen plugins list` - Lists all available plugins
- `kaizen contracts` - Contract management for KAIZEN
- `kaizen contracts deploy` - Deploy smart contract
- `kaizen blockchains` - Blockchain management for KAIZEN
- `kaizen blockchains txresult` - Get transaction result
- `kaizen blockchains balance` - Get account balance
- `kaizen blockchains faucet` - Get testnet token

#### Platform (Alpha)
The KAIZEN Platform is currently in experimental alpha.
- `kaizen login` - Login or sign up for the KAIZEN Platform
- `kaizen logout` - Logout from the KAIZEN Platform

## <a name="plugins"></a>🏗 Plugins
- Bluzelle
- NKN
- NOIA

## <a name="community"></a>💡 Community
- [Gitter](https://gitter.im/PortalNetwork/kaizen-cli)
- [Twitter](https://twitter.com/itisportal)
- [Facebook](https://www.facebook.com/portalnetworkofficial)
- [Reddit](https://www.reddit.com/r/portalnetwork)
- [Telegram](https://t.me/portalnetworkofficial)
- [Medium](https://medium.com/portalnetworkofficial)

## <a name="contributing"></a>📣 Contributing
We love our contributors!  

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to help out.

*Quick Start*: Check out [help wanted](https://github.com/PortalNetwork/kaizen-cli/labels/help%20wanted) or [good first issue](https://github.com/PortalNetwork/kaizencli/labels/good%20first%20issue) labels to find issues we want to move forward on with your help.

## <a name="licence"></a>🗒 Licence
See [LICENSE](./LICENSE) for details.
