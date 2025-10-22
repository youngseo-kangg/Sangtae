## Sangtae 
### React를 위한 전역 상태 관리 라이브러리

> “상태(狀態)” — 단순하고, 안정적이며, 동기적인.

sangtae는 React의 `useSyncExternalStore`를 기반으로 만들어진
가볍고 직관적인 전역 상태 관리 라이브러리입니다.

Zustand처럼 복잡한 추상화와 Provider 없이 “어떻게 전역 상태가 React와 동기화되는가”를 직접 이해하고 제어할 수 있도록 설계되었습니다.

## ✨ 주요 특징

⚛️ Concurrent-safe — React 18의 useSyncExternalStore 기반

🧱 심플한 API — createStore와 useStore 두 가지로 충분

🔍 선택적 구독 — 필요한 상태만 구독하는 selector 지원

🚀 Context 불필요 — 어디서든 바로 사용할 수 있음

🪶 아주 가벼움 — gzipped 기준 1KB 이하

🧠 투명한 동작 — 학습용, 커스텀 확장용으로 이상적

## 📦 설치
`<사용하는 패키지 매니저> <설치 명령어> sangtae` 형태로 설치합니다.

```
npm install sangtae
```
```
yarn add sangtae
```
```
pnpm add sangtae
```

## 🐻 참고 문서

- [Zustand](https://zustand-demo.pmnd.rs/)

- [React useSyncExternalStore 공식문서](https://ko.react.dev/reference/react/useSyncExternalStore)
