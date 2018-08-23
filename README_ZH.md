<p align=center>
<img src="./assets/title.png">
</p>


<p align=center>
<h1 align=center>KAIZEN CLI</h1>
</p>

<a target="_blank" href="https://github.com/PortalNetwork/nifty-game/pulls" title="PRs Welcome"><img src="https://img.shields.io/badge/PRs-welcome-blue.svg"></a>
<img src="https://img.shields.io/hackage-deps/v/lens.svg"/>
<a target="_blank" href="#"><img src="https://img.shields.io/github/license/mashape/apistatus.svg"/></a>

| [English](./README.md) | [한국어](./README_KR.md) | [中文](./README_ZH.md) |

> Kaizen是為dapp和dweb開發人員的一站式解決方案。

## 🚀 概要
Kaizen是為dapp和dweb開發人員的一站式解決方案。 Kaizen包括:
- 內建的智能合約匯集，鏈接，部署和管理
- 使用Mocha和Chai進行自動code測試
- 可以透過技術支援來組態化自訂的構建過程

#### 安裝
```
npm install -g kaizen-cli 
```

## 🔨 命令集

- `kaizen new` - 從遠端git存儲庫創建一個dapp模板
- `kaizen config` - dapp的環境變數
- `kaizen plugin` - 列出dapp的所有插件
- `kaizen plugin:add` - 將插件加至dapp
- `kaizen plugin:remove` - 將插件從dapp移除
- `kaizen build` - 用於打包dapp的腳本
- `kaizen publish` - 用於發布dapp的腳本

## 🏗 使用

![kaizen-cli](./assets/kaizen-cli.png)

#### 創建dapp項目

```
kaizen new -n <name> -b <vue|react>
```

## 📣 參與貢獻
若欲參與貢獻，請參考 [CONTRIBUTING.md](./CONTRIBUTING.md)

## 🗒 執照
詳細內容請參考 [LICENSE](./LICENSE)
