<p align=center>
<img src="./assets/title.png">
</p>

<p align=center>
<h1 align=center>KAIZEN CLI</h1>
</p>

<a target="_blank" href="https://travis-ci.org/PortalNetwork/kaizen-cli" title="CircleCI"><img src="https://travis-ci.org/PortalNetwork/kaizen-cli.svg?branch=master"></a>
<a target="_blank" href="https://github.com/PortalNetwork/kaizen-cli/pulls" title="PRs Welcome"><img src="https://img.shields.io/badge/PRs-welcome-blue.svg"></a>
<a href="#"><img src="https://img.shields.io/hackage-deps/v/lens.svg"/></a>
[![Join the chat at https://gitter.im/PortalNetwork/kaizen-cli](https://badges.gitter.im/PortalNetwork/kaizen-cli.svg)](https://gitter.im/PortalNetwork/kaizen-cli?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<a target="_blank" href="#"><img src="https://img.shields.io/github/license/mashape/apistatus.svg"/></a>

> One stop solution for dapp developers

| [English](./README.md) | [한국어](./README_KR.md) | [中文](./README_ZH.md) |

## 🚀 Overview
KAIZEN is an one stop solution for dapp and dweb developer. With KAIZEN, you get:

- Develop and manage multiple decentralized tech in one platform.
- Easily build your blockchain on popular cloud providers.
- Customize an existing blockchain to fulfill your requirements.

## 📚 Table of Contents

<img align="right" width="250" src="https://kaizen.portal.network/images/demo.png"/>

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

4. Upload project to [IPFS](https://ipfs.io) or [BTFS](https://www.bittorrent.com/btfs/):
```
# Upload to IPFS
kaizen upload ipfs ./build
# or upload to BTFS
kaizen upload btfs ./build
```

## <a name="command-topics"></a>🔨 Command Topics

- [`kaizen config`](commands/config.md) - Configure KAIZEN
- [`kaizen create`](commands/create.md) - Create new KAIZEN project
- [`kaizen install`](commands/install.md) - Install a KAIZEN project from GitHub
- [`kaizen upload`](commands/upload.md) - Upload a KAIZEN project
- [`kaizen plugins`](commands/plugins.md) - Plugin management for KAIZEN 
- [`kaizen contracts`](commands/contracts.md) - Contract management for KAIZEN
- [`kaizen blockchains`](commands/blockchains.md) - Blockchain management for KAIZEN

#### Platform (Alpha)
The KAIZEN Platform is currently in experimental alpha.
- [`kaizen login`](commands/login.md) - Login or sign up for the KAIZEN Platform
- [`kaizen logout`](commands/logout.md) - Logout from the KAIZEN Platform
- [`kaizen nodes`](commands/nodes.md) - Node management of KAIZEN Platform

## <a name="plugins"></a>🏗 Plugins
- [Bluzelle](https://www.npmjs.com/package/bluzelle)
- [NKN](https://www.npmjs.com/package/nkn-client)
- [ICON](https://www.npmjs.com/package/icon-sdk-js)
- [Orbit](https://www.npmjs.com/package/orbit-db)
- NOIA

## <a name="faucet"></a>🚰 Faucet
Claim test net tokens
- ETH
- ETC
- WAN
- ICON

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

*Quick Start*: Check out [help wanted](https://github.com/PortalNetwork/kaizen-cli/labels/help%20wanted) or [good first issue](https://github.com/PortalNetwork/kaizen-cli/labels/good%20first%20issue) labels to find issues we want to move forward on with your help.

## <a name="contact"></a>📧 Contact
For any questions, please contact chris@portal.network or join telegram: [http://bit.ly/2XjhQV2](http://bit.ly/2XjhQV2)

## <a name="licence"></a>🗒 Licence
See [LICENSE](./LICENSE) for details.
