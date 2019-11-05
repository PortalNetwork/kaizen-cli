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

> KAIZEN 是為 DApp 和 DWeb 開發人員所設計的一站式解決方案

| [English](./README.md) | [한국어](./README_KR.md) | [中文](./README_ZH.md) |

## 🚀 概要
KAIZEN 是為 DApp 和 DWeb 開發人員所設計的一站式解決方案。 
KAIZEN 包括:
- 輕鬆開發和管理多個區塊鏈技術
- 在流行的雲提供商上輕鬆構建區塊鏈節點與服務
- 自定義現有區塊鏈技術以滿足您的開發要求

## 📚 目錄

<img align="right" width="250" src="https://kaizen.portal.network/images/demo.png"/>

- [快速開始](#quick-start)
- [專案範例](https://github.com/PortalNetwork/kaizen-examples)
- [智能合約](https://github.com/PortalNetwork/kaizen-contracts)
- [指令集](#command-topics)
- [插件](#plugins)
- [社群連結](#community)
- [參與貢獻](#contributing)
- [許可證](#licence)

## <a name="quick-start"></a>🚀 快速開始
1. 透過 npm 安裝 KAIZEN:
```
npm install -g kaizen-cli 
```

2. 創建專案:
```
kaizen create --template react --name myproject
```

3. 部署智能合約:
```
kaizen contracts deploy --url https://github.com/PortalNetwork/kaizen-contracts/tree/master/ERC20
```

4. 上傳專案到 [IPFS](https://ipfs.io) 或者 [BTFS](https://www.bittorrent.com/btfs/):
```
# Upload to IPFS
kaizen upload ipfs ./build
# or upload to BTFS
kaizen upload btfs ./build
```

## <a name="command-topics"></a>🔨 指令集

- [`kaizen config`](commands/config.md) - 設定 KAIZEN
- [`kaizen create`](commands/create.md) - 創建 KAIZEN 專案
- [`kaizen install`](commands/install.md) - 從 GitHub 安裝已經存在的 KAIZEN 
- [`kaizen upload`](commands/upload.md) - 上傳 KAIZEN 專案
- [`kaizen plugins`](commands/plugins.md) - KAIZEN 插件管理功能
- [`kaizen instances`](commands/instances.md) - KAIZEN 運行實例管理功能
- [`kaizen contracts`](commands/contracts.md) - KAIZEN 智能合約管理功能
- [`kaizen blockchains`](commands/blockchains.md) - KAIZEN 區塊鏈管理功能

#### KAIZEN Platform (Alpha)
KAIZEN Platform 目前正在 Alpha 階段
- [`kaizen login`](commands/login.md) - 登入或註冊 KAIZEN Platform
- [`kaizen logout`](commands/logout.md) - 登出 KAIZEN Platform
- [`kaizen nodes`](commands/nodes.md) - KAIZEN Platform 節點管理

## <a name="plugins"></a>🏗 插件
- [Bluzelle](https://www.npmjs.com/package/bluzelle)
- [NKN](https://www.npmjs.com/package/nkn-client)
- [ICON](https://www.npmjs.com/package/icon-sdk-js)
- [Orbit](https://www.npmjs.com/package/orbit-db)
- [Arweave](https://www.npmjs.com/package/arweave)
- NOIA

## <a name="instances"></a>⚙️ 實例
- [NYM](http://nymtech.net/)

## <a name="faucet"></a>🚰 水龍頭
KAIZEN Faucet 支援下列區塊鏈測試網路的代幣
- ETH
- ETC
- WAN
- ICON

## <a name="community"></a>💡 社群連結
- [Gitter](https://gitter.im/PortalNetwork/kaizen-cli)
- [Twitter](https://twitter.com/itisportal)
- [Facebook](https://www.facebook.com/portalnetworkofficial)
- [Reddit](https://www.reddit.com/r/portalnetwork)
- [Telegram](https://t.me/portalnetworkofficial)
- [Medium](https://medium.com/portalnetworkofficial)

## <a name="contributing"></a>📣 參與貢獻
我們非常歡迎社群的貢獻。

若您想參與一起讓 KAIZEN 更好使用，請參考 [CONTRIBUTING.md](./CONTRIBUTING.md) 來看看如何貢獻。

*快速開始：您可以透過 [help wanted](https://github.com/PortalNetwork/kaizen-cli/labels/help%20wanted) 或者 [good first issue](https://github.com/PortalNetwork/kaizen-cli/labels/good%20first%20issue) 標籤找到可以參與貢獻的任務。

## <a name="contact"></a>📧 聯絡
如果您有任何問題請聯繫 **chris@portal.network** 或者加入我們的 Telegram: [http://bit.ly/2XjhQV2](http://bit.ly/2XjhQV2)

## <a name="licence"></a>🗒 許可證
詳細內容請參考 [LICENSE](./LICENSE)
