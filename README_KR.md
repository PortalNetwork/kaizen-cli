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

> Dapp 개발자들을 위한 원 스톱 솔루션

| [English](./README.md) | [한국어](./README_KR.md) | [中文](./README_ZH.md) |

## 🚀 개요
카이잔 (KAIZEN) 은 DApp 및 DWeb 개발자들을 위한 원 스톱 솔루션 입니다. 카이잔은 다음과 같은 옵션들이 포함되있습니다:

- Develop and manage multiple decentralized tech in one platform.
- Easily build your blockchain on popular cloud providers.
- Customize an existing blockchain to fulfill your requirements.

## 📚 Table of Contents

<img align="right" width="250" src="https://kaizen.portal.network/images/demo.png"/>

- [Quick Start](#quick-start)
- [Examples](https://github.com/PortalNetwork/kaizen-examples)
- [Contracts](https://github.com/PortalNetwork/kaizen-contracts)
- [Command Topics](#command-topics)
- [플러그인](#plugins)
- [커뮤니티](#community)
- [기여하기](#contributing)
- [라이센스](#licence)

## <a name="quick-start"></a>🚀 Quick Start
STEP 1. Install via npm:
```
npm install -g kaizen-cli 
```

STEP 2. Create a project:
```
kaizen create --template react --name myproject
```

STEP 3. Deploy smart contracts:
```
kaizen contracts deploy --url https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20
```

STEP 4. Upload project to [IPFS](https://ipfs.io) 或者 [BTFS](https://www.bittorrent.com/btfs/):
```
# Upload to IPFS
kaizen upload ipfs ./build
# or upload to BTFS
kaizen upload btfs ./build
```

STEP 5. Hosting instance on AWS
```
kaizen instances run nym-loopix-mixnode
```

## <a name="command-topics"></a>🔨 Command Topics

- [`kaizen config`](commands/config.md) - Configure KAIZEN
- [`kaizen create`](commands/create.md) - Create new KAIZEN project
- [`kaizen install`](commands/install.md) - Install a KAIZEN project from GitHub
- [`kaizen upload`](commands/upload.md) - Upload a KAIZEN project
- [`kaizen plugins`](commands/plugins.md) - Plugin management for KAIZEN 
- [`kaizen instances`](commands/instances.md) - Instances management for KAIZEN
- [`kaizen contracts`](commands/contracts.md) - Contract management for KAIZEN
- [`kaizen blockchains`](commands/blockchains.md) - Blockchain management for KAIZEN

#### Platform (Alpha)
The KAIZEN Platform is currently in experimental alpha.
- [`kaizen login`](commands/login.md) - Login or sign up for the KAIZEN Platform
- [`kaizen logout`](commands/logout.md) - Logout from the KAIZEN Platform
- [`kaizen nodes`](commands/nodes.md) - Node management of KAIZEN Platform

## <a name="plugins"></a>🏗 플러그인
- [Bluzelle](https://www.npmjs.com/package/bluzelle) - Decentralized database
- [NKN](https://www.npmjs.com/package/nkn-client) - Data transmisstion
- [ICON](https://www.npmjs.com/package/icon-sdk-js) - Blockchain
- [Orbit](https://www.npmjs.com/package/orbit-db) - Decentralized database
- [Arweave](https://www.npmjs.com/package/arweave) - Decentralized file storage
- [Fluence](https://www.npmjs.com/package/fluence) - Decentralized database
- [Sia](https://sia.tech/) - Decentralized file storage
- [NOIA](http://noia.network/) - Decentralized CDN

## <a name="instances"></a>⚙️ 인스턴스
- [NYM](http://nymtech.net/) - Decentralized privacy
- [Golem](https://golem.network/) - Decentralized cloud computing

## <a name="faucet"></a>🚰 수도꼭지
KAIZEN Faucet
- ETH
- ETC
- WAN
- ICON

## <a name="community"></a>💡 커뮤니티
- [Gitter](https://gitter.im/PortalNetwork/kaizen-cli)
- [Twitter](https://twitter.com/itisportal)
- [Facebook](https://www.facebook.com/portalnetworkofficial)
- [Reddit](https://www.reddit.com/r/portalnetwork)
- [Telegram](https://t.me/portalnetworkofficial)
- [Medium](https://medium.com/portalnetworkofficial)

## <a name="contributing"></a>📣 기여하기 
We love our contributors!  

See [CONTRIBUTING.md](./CONTRIBUTING.md) for how to help out.

*Quick Start*: Check out [help wanted](https://github.com/PortalNetwork/kaizen-cli/labels/help%20wanted) or [good first issue](https://github.com/PortalNetwork/kaizen-cli/labels/good%20first%20issue) labels to find issues we want to move forward on with your help.

## <a name="contact"></a>📧 Contact
For any questions, please contact **chris@portal.network** or join telegram: [http://bit.ly/2XjhQV2](http://bit.ly/2XjhQV2)

## <a name="licence"></a>🗒 라이센스
[LICENSE](./LICENSE) 참조하기
