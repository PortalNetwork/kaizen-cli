<p align=center>
<img src="./assets/title.png">
</p>


<p align=center>
<h1 align=center>KAIZEN CLI</h1>
</p>

<a target="_blank" href="https://circleci.com/gh/PhyrexTsai/kaizen-cli" title="CircleCI"><img src="https://circleci.com/gh/PhyrexTsai/kaizen-cli/tree/master.svg?style=shield"></a>
<a target="_blank" href="https://github.com/PortalNetwork/nifty-game/pulls" title="PRs Welcome"><img src="https://img.shields.io/badge/PRs-welcome-blue.svg"></a>
<a href="#"><img src="https://img.shields.io/hackage-deps/v/lens.svg"/></a>
<a target="_blank" href="#"><img src="https://img.shields.io/github/license/mashape/apistatus.svg"/></a>

> dapp 개발자들을 위한 원 스톱 솔루션

| [English](./README.md) | [한국어](./README_KR.md) | [中文](./README_ZH.md) |

## 📚 문서
카이젠에 대한 자세한 내용은 [DOCS](https://kaizen-cli.readthedocs.io/) 를 참조하십시오

## 🚀 개요
카이잔 (KAIZEN) 은 dapp 및 dweb 개발자들을 위한 원 스톱 솔루션 입니다. 카이잔은 다음과 같은 옵션들이 포함되있습니다:
- 내장된 스마트 컨트랙 모음집, 배치, 연결 및 관리
- Mocha와 Chai를 통한 자동 코드 테스팅
- 기술지원을 통해 사용자 지정 빌드 프로세스에 대한 구성 가능

#### 설치
```
npm install -g kaizen-cli 
```

## 🔨 명령어

- `kaizen new` - 원격 저장소에서 dapp 템플릿을 만들기
- `kaizen config` - dapp 의 환경 변수
- `kaizen plugin:add` - dapp 에 플러그인 첨부
    - [Bluzelle](https://www.npmjs.com/package/bluzelle)
    - [NOIA](https://www.npmjs.com/package/@noia-network/sdk-react)
    - [NKN](https://www.npmjs.com/package/nkn-client)
- `kaizen plugin:remove` - dapp 에 플러그인 제거
- `kaizen build` - dapp 을 압축할때 사용되는 스크립트
- `kaizen publish` - dapp 을 발표할때 사용되는 스크립트

## 🏗 사용

![kaizen-cli](./assets/kaizen-cli.png)

#### dapp 프로젝트 만들기

```
kaizen new -n <name> -b <vue|react>
```

## 📣 기여하기 
[CONTRIBUTING.md](./CONTRIBUTING.md) 참조하기

## 🗒 라이센스
[LICENSE](./LICENSE) 참조하기
