# HonoX アプリをさくらの AppRun に自動デプロイさせる GitHub Actions の動作確認用の ToDo アプリ

## 必要な環境変数
- SAKURA_API_KEY: さくらのAPIキー（AppRun API の呼び出しに必要）
- SAKURA_API_SECRET: さくらのAPIシークレット（AppRun API の呼び出しに必要）
- REGISTRY_USER: さくらのコンテナレジストリのユーザー名（コンテナレジストリの操作に必要）
- REGISTRY_PASSWORD: さくらのコンテナレジストリのパスワード（コンテナレジストリの操作に必要）

（以下オプション）

- object-storage-access-key: SQLite のデータベースファイルをバックアップするためのさくらのオブジェクトストレージのアクセスキー
- object-storage-secret-key:SQLite のデータベースファイルをバックアップするためのさくらのオブジェクトストレージのシークレットキー

以上の値を、GitHub のリポジトリ Secret に登録してください

また、deploy.yml にて以下の値を記述してください

- container-registry: ${MYREGISTRY}.sakuracr.jp

（以下オプション）

- port: 3000 以外で起動する場合は指定してください
- object-storage-bucket: SQLite のデータベースファイルをバックアップするさくらのオブジェクトストレージのバケット名


## 開発
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
