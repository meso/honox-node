# HonoX アプリをさくらの AppRun に自動デプロイさせる GitHub Actions の動作確認用の ToDo アプリ

## 必要な環境変数

### GitHub リポジトリ Secret に登録する環境変数

| 環境変数名 | 説明 | 必須 |
|-----------|------|------|
| SAKURA_API_KEY | さくらのAPIキー（AppRun API の呼び出しに必要） | ✓ |
| SAKURA_API_SECRET | さくらのAPIシークレット（AppRun API の呼び出しに必要） | ✓ |
| REGISTRY_USER | さくらのコンテナレジストリのユーザー名（コンテナレジストリの操作に必要） | ✓ |
| REGISTRY_PASSWORD | さくらのコンテナレジストリのパスワード（コンテナレジストリの操作に必要） | ✓ |
| object-storage-access-key | さくらのオブジェクトストレージのアクセスキー（SQLite のデータベースファイルをバックアップするため） | - |
| object-storage-secret-key | さくらのオブジェクトストレージのシークレットキー（SQLite のデータベースファイルをバックアップするため） | - |

### deploy.yml に記述する設定値

| 設定項目 | 説明 | 必須 |
|---------|------|------|
| container-registry | ${MYREGISTRY}.sakuracr.jp | ✓ |
| port | 3000 以外で起動する場合は指定してください | - |
| object-storage-bucket | さくらのオブジェクトストレージのバケット名（SQLite のデータベースファイルをバックアップするため） | - |


## 開発サーバーの起動
```
npm install
npm run dev
open http://localhost:5173
```

## 本番
```
npm run build
npm start
open http://localhost:3000
```
