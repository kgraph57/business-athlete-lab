# Business Athlete Lab

医師・岡本賢によるエビデンスベースの予防医療メディアサイト。

運動・睡眠・栄養・メンタル・生活習慣・長寿など、ビジネスパーソンの身体マネジメントに関する記事を、一次文献に基づいて発信しています。

## 技術スタック

- **フレームワーク**: Next.js 16 (App Router)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS v4
- **コンテンツ**: Markdown（記事）
- **ビルド**: 静的エクスポート（`output: "export"`）
- **デプロイ**: GitHub Pages（`/business-athlete-lab` ベースパス）

## 開発

```bash
# 依存関係のインストール
npm install

# 開発サーバー起動（http://localhost:3000）
npm run dev

# ビルド（記事インデックスは prebuild で自動生成）
npm run build

# 本番ビルドのプレビュー
npm start
```

## プロジェクト構造

```
src/
├── app/              # Next.js App Router
│   ├── page.tsx      # ホーム
│   ├── articles/     # 記事一覧・詳細
│   ├── topics/       # トピック別記事
│   ├── about/        # プロフィール
│   └── services/     # セミナー・講座・執筆依頼
├── components/       # React コンポーネント
├── lib/              # 記事管理、トピック設定、サイト設定
└── types/            # TypeScript 型定義

content/
├── articles/         # Markdown 記事
├── index.json        # ビルド時に生成される記事インデックス
└── curated.json      # 厳選記事のスラッグリスト

scripts/
└── build-index.mjs   # 記事インデックス生成スクリプト
```

## 記事の追加・更新

1. **新規記事**: `content/articles/` に Markdown ファイルを追加
2. **厳選記事**: `content/curated.json` にスラッグを追加
3. **ビルド**: `npm run build` でインデックスが自動更新される

記事の frontmatter 形式は `src/types/index.ts` を参照。

## 設定

サイト全体の設定は `src/lib/config.ts` で管理：

- タイトル・説明文
- SNS リンク（Substack, note, X）
- お問い合わせメールアドレス（Services ページ用）

## デプロイ

`main` ブランチへの push で GitHub Actions が自動ビルド・デプロイします。

公開 URL: https://kgraph57.github.io/business-athlete-lab
