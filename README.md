# oshigoto-links-frontend

これはフロントエンド用のリポジトリです。
バックエンドは別リポジトリ（`oshigoto-links-backend`）にあります。

## API仕様の管理

このプロジェクトはSpec Firstアプローチを採用しています。

### API型の生成

1. **環境変数の設定**
   ```bash
   cp .env.example .env.local
   # NEXT_PUBLIC_API_BASE_URLを適切な値に設定
   ```

2. **依存関係のインストール**
   ```bash
   npm ci
   ```

3. **API型とSDKの生成**
   ```bash
   npm run generate:api
   ```
   バックエンドの`docs/openapi.yaml`から型定義とAPIクライアントを自動生成します。

4. **型チェック**
   ```bash
   npm run typecheck
   ```

### 変更フロー

1. **仕様変更**: バックエンドで`docs/openapi.yaml`を更新
2. **合意**: APIの変更について合意形成
3. **実装**: フロントエンド・バックエンドで実装
4. **破壊的変更**: `/api/v2`での新バージョン追加

### バージョニング規約

- **非破壊的変更**: v1.x のマイナー・パッチで対応
- **破壊的変更**: 新しいAPIバージョン（/api/v2等）で対応
- **廃止プロセス**: Deprecated告知 → 猶予期間 → EOL

### 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 型チェック
npm run typecheck

# Lint
npm run lint

# API型・SDK生成
npm run generate:api
```
