# ShopNext AI Assistant

ShopNext AI Assistantは、Next.jsとVercel AI SDKを使用して構築された、近未来的なAI搭載Eコマースチャットアプリケーションです。ユーザーはAIアシスタントと対話し、商品を検索・発見することができます。

## スクリーンショット

![ShopNext AI Assistant Screenshot](https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BOt51bteaMiWW55sTdHBAZTNb6BIRx.png)

## 概要

このアプリケーションは、ユーザーが自然言語でAIアシスタントに話しかけることで、ECサイト内の商品を検索できるインターフェースを提供します。AIはユーザーの要望を理解し、関連する商品を提案します。デザインは、白を基調とした透明感のあるガラスモーフィズムを採用し、洗練されたユーザー体験を目指しています。

## 主な機能

*   **AIチャットインターフェース**: Vercel AI SDK (OpenAI) を利用した自然言語での商品検索。
*   **商品提案表示**: AIが検索した商品を専用のUIコンポーネントで分かりやすく表示。
*   **動的な商品検索**: キーワード、カテゴリ、価格帯など、様々な条件での商品検索（ツール呼び出し経由）。
*   **レスポンシブデザイン**: デスクトップおよびモバイルデバイスに対応。
*   **ガラスモーフィズムUI**: 透明感のある洗練されたデザイン。
*   **基本的なECサイト機能**:
    *   ヘッダー（ロゴ、カート、マイページへのリンク）
    *   ショッピングカートページ（プレースホルダー）
    *   マイページ（プレースホルダー）

## 技術スタック

*   **フレームワーク**: Next.js 15 (App Router)
*   **言語**: TypeScript
*   **AI**: Vercel AI SDK, OpenAI (gpt-4o-mini)
*   **スタイリング**: Tailwind CSS, shadcn/ui (一部カスタムコンポーネント)
*   **UIコンポーネント**: Radix UI (shadcn/ui経由)
*   **その他**: Lucide React (アイコン)

## セットアップと実行

1.  **リポジトリをクローンします**:
    ```bash
    git clone <your-repository-url>
    cd nextgen-ecommerce-chat
    ```

2.  **依存関係をインストールします**:
    ```bash
    npm install
    # または
    yarn install
    # または
    pnpm install
    ```

3.  **環境変数を設定します**:
    プロジェクトルートに `.env.local` ファイルを作成し、以下の内容を記述します。
    ```env
    OPENAI_API_KEY=your_openai_api_key_here
    ```
    `your_openai_api_key_here` を実際のOpenAI APIキーに置き換えてください。

4.  **開発サーバーを起動します**:
    ```bash
    npm run dev
    # または
    yarn dev
    # または
    pnpm dev
    ```
    ブラウザで `http://localhost:3000` を開くと、アプリケーションが表示されます。

## 今後の展望 (Work Itemsより)

*   商品データの拡充
*   検索機能の強化
*   カート機能の実装
*   AIの応答改善
*   UI/UXのさらなる改善
*   商品カードのインタラクション強化
*   AIアバターの動的変更
*   テーマ切り替え機能
*   サウンドエフェクトの追加
*   クイック返信機能の改善

---

このREADMEはプロジェクトの基本的な情報を提供します。必要に応じて詳細を追加・更新してください。
```

この `README.md` ファイルは、v0のCode Project内に存在します。ご自身のローカル環境やGitHubリポジトリに含めるには、v0のUI上部にある「Download Code」ボタンをクリックしてプロジェクト全体をダウンロードし、そのファイルをリポジトリのルートに配置してください。

