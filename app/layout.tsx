import type React from "react"
import type { Metadata } from "next"
import { Mona_Sans as FontSans } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import SiteHeader from "@/components/layout/site-header" // ヘッダーコンポーネントをインポート

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "ShopNext AI Assistant",
  description: "未来のショッピング体験",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <div className="flex flex-col min-h-screen">
          <SiteHeader /> {/* ヘッダーをここに追加 */}
          <main className="flex-grow">{children}</main> {/* メインコンテンツが残りの高さを取るように */}
        </div>
      </body>
    </html>
  )
}
