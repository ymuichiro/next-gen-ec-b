import ChatInterface from "@/components/chat-interface"
// Sparkles アイコンはヘッダーに移動したので、ここでは不要なら削除

export default function HomePage() {
  return (
    // 背景はbodyに設定。ここではコンテンツの配置とpaddingを調整
    // ヘッダー分の高さを考慮したpaddingはSiteHeader側で sticky を使うため不要になるか、
    // もしくはmainタグにpt-16などを設定する。今回はflex-growで対応。
    <div className="flex flex-col items-center w-full p-4 selection:bg-primary/20 selection:text-primary">
      {/* 以前の <header>...</header> 部分は削除 */}
      {/* ChatInterfaceをラップするdivに幅を指定 */}
      <div className="w-full max-w-3xl">
        {" "}
        {/* ← この行を追加・調整 */}
        <ChatInterface />
      </div>
      <footer
        className="mt-12 text-center text-sm text-slate-200/80"
        style={{ textShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
      >
        <p>&copy; {new Date().getFullYear()} ShopNext. All rights reserved.</p>
        <p>Powered by Vercel AI SDK & Next.js</p>
      </footer>
    </div>
  )
}
