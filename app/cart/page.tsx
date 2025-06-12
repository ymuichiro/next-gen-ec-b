// Shopping Cart Page (Placeholder)
export default function CartPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="glass-effect p-8 md:p-12 rounded-xl min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-center">ショッピングカート</h1>
        <p className="text-muted-foreground text-lg text-center">現在、カートは空です。</p>
        {/* 今後、カートの商品リストや合計金額などが表示されます */}
      </div>
    </div>
  )
}
