import Link from "next/link"
import { ShoppingCart, User, BotIcon } from "lucide-react" // BotIconを追加
import { cn } from "@/lib/utils"

export default function SiteHeader() {
  return (
    <header
      className={cn(
        "glass-effect sticky top-0 z-50 w-full border-b border-white/10", // glass-effectを適用し、下に薄い境界線を追加
      )}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Logo/Site Name */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1.5 rounded-md bg-primary/80 group-hover:bg-primary/90 transition-colors backdrop-blur-sm">
            <BotIcon className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">ShopNext</span>
        </Link>

        {/* Right: Icons */}
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/cart"
            className="text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-black/5"
            aria-label="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">ショッピングカート</span>
          </Link>
          <Link
            href="/my-page"
            className="text-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-black/5"
            aria-label="My Page"
          >
            <User className="h-5 w-5 sm:h-6 sm:w-6" />
            <span className="sr-only">マイページ</span>
          </Link>
        </nav>
      </div>
    </header>
  )
}
