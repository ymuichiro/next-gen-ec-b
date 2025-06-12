// My Page (Placeholder)
export default function MyPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="glass-effect p-8 md:p-12 rounded-xl min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">マイページ</h1>
        <p className="text-muted-foreground text-lg text-center">購入履歴やお気に入り商品などを確認できます。</p>
        {/* 今後、ユーザー情報、注文履歴、設定などが表示されます */}
      </div>
    </div>
  )
}
