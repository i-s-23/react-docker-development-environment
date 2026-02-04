# react-docker-development-environment

[Remote Container で React の Docker 開発環境を構築](https://qiita.com/I_s/items/c50a65be402d21afa43d)

## Usage

- devcontainer が起動していればローカルで react が立ち上がっております

```bash
http://localhost:5173/
```

```bash
pnpm dev
```

## 使用技術スタック

このプロジェクトでは以下の主要な技術を使用しています。

- **React**: UI構築のためのJavaScriptライブラリ。
- **TypeScript**: JavaScriptに静的型付けを追加し、コードの品質と保守性を向上させます。
- **Vite**: 高速な開発サーバーとバンドル機能を提供するビルドツール。
- **PNPM**: 効率的なパッケージ管理を行うためのツール。
- **Storybook**: UIコンポーネントを独立して開発、テスト、文書化するためのツール。
- **Vitest**: Viteをベースにした高速なユニットテストフレームワーク。
- **ESLint**: コードの品質を維持し、潜在的なエラーを検出するためのリンター。
- **Prettier**: コードの一貫したフォーマットを自動的に適用するためのツール。
- **Docker / DevContainer**: 開発環境をコンテナ化し、プロジェクトメンバー間での一貫性と簡単なセットアップを実現します。
