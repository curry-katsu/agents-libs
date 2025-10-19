---
id: maintenance-setup
title: ドキュメント環境セットアップ（Docusaurus、docs/ 配下完結）
---

このページは本リポジトリで Docusaurus によるドキュメント環境を "`docs/` 配下で完結" させるための最終的に必要な手順のみをまとめた備忘録です。

前提

- Node.js と npm がインストールされていること（推奨 Node.js v18 または v20 以上）
- リポジトリのルートは Python のソースを管理する状態である（`docs/` のみが Docusaurus を持つ）

セットアップ手順

1. リポジトリをクローン（既にクローン済みならルートを作業ディレクトリにする）

```bash
git clone <repo-url>
cd agents-libs
```

2. `docs/` 配下で依存をインストール

```bash
cd docs
npm install --legacy-peer-deps
```

- 依存解決で peerDependencies の衝突が出る環境では `--legacy-peer-deps` を付けてください。

3. 開発サーバーでプレビュー

```bash
cd docs
# ファイルウォッチ数の制限によりエラーが出る場合、ポーリングモードで起動する
CHOKIDAR_USEPOLLING=true npm start

# またはローカルバイナリを直接使う
CHOKIDAR_USEPOLLING=true ./node_modules/.bin/docusaurus start
```

- サイトは通常 http://localhost:3000/ で確認できます。
- `CHOKIDAR_USEPOLLING=true` はファイル監視で `EMFILE: too many open files` が発生する際の回避手段です（CPU 負荷はやや増えます）。

4. 静的ビルド

```bash
cd docs
npm run build
```

5. ビルド結果のローカル確認

```bash
cd docs
npm run serve
# 表示されるURL（例: http://localhost:3000/）にアクセス
```

ルートをクリーンに保つための注意

- Docusaurus 関連のファイル・依存はすべて `docs/` に集約しています。リポジトリルートには `package.json` / `node_modules` 等を残さない方針です。
- そのため、ルートに存在した Docusaurus 関連ファイルは削除済みです。
- `.gitignore` に `docs/node_modules/` と `docs/.cache/` を追加してあります。

設定のポイント

- `docs/docusaurus.config.js` の `docs.path` を `'.'` に設定して、`docs/` 内の Markdown を直接参照するようにしています。
- 重複ルート（トップページ `/` の競合）を避けるため、トップページのドキュメント（`intro.md`）には明示的な `slug: /` を設定しないでください。
- 大きな `node_modules` などを Docusaurus が走査しないよう、`docs/docusaurus.config.js` の `docs.exclude` で `**/node_modules/**` 等を除外しています。

展開・デプロイの提案（必要に応じて追加）

- GitHub Actions を使って `docs` をビルドし、`gh-pages` ブランチや GitHub Pages にデプロイするワークフローを作成することを推奨します。

自動デプロイワークフロー

このリポジトリには `docs` を自動でビルドして GitHub Pages にデプロイする GitHub Actions ワークフロー（`.github/workflows/deploy-docs.yml`）を追加しています。

必要な設定:

- GitHub リポジトリの `Settings > Pages` で `GitHub Actions` を使ったデプロイが許可されていることを確認してください（通常はデフォルトで OK です）。
- ページ公開先やカスタムドメインを設定する場合はリポジトリの Pages 設定を適宜変更してください。

以上が本リポジトリで Docusaurus を `docs/` 配下で完結させるために最小限必要な手順です。問題なければこのファイルをドキュメント目次に追加します。
