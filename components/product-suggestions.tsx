import type { Product } from "@/lib/product-db"
import { ShoppingBag } from "lucide-react" // New icon

interface ProductSuggestionsProps {
  products: Product[]
  title?: string
}

export default function ProductSuggestions({
  products,
  title = "こちらの商品はいかがですか？",
}: ProductSuggestionsProps) {
  if (!products || products.length === 0) {
    return null
  }

  return (
    <div className="my-4 w-full animate-fadeIn">
      <div className="glass-effect-darker rounded-lg p-4">
        <h3 className="mb-3 text-lg font-semibold text-foreground flex items-center">
          <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
          {title}
        </h3>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
          {products.map((product) => (
            <div key={product.id} className="snap-center shrink-0">
              {/* ProductCardを直接使用 */}
              <div className="w-full sm:w-[240px] glass-effect rounded-xl overflow-hidden group">
                <div className="aspect-square w-full bg-black/5 overflow-hidden relative">
                  <img
                    src={
                      product.imageUrl ||
                      `/placeholder.svg?width=240&height=240&text=${encodeURIComponent(product.name) || "/placeholder.svg"}`
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-primary/80 text-primary-foreground px-2 py-1 text-xs font-semibold rounded backdrop-blur-sm">
                    ¥{product.price.toLocaleString()}
                  </div>
                </div>
                <div className="p-3">
                  <h4 className="text-md font-semibold text-foreground mb-1 truncate group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <p className="text-xs text-muted-foreground h-8 overflow-hidden text-ellipsis mb-2">
                    {product.description}
                  </p>
                  {/* chat-interface.tsxのProductCardから持ってきたボタンをここに配置 */}
                  {/* <FuturisticButton className="w-full" variant="outline" size="sm">
                    <ShoppingCart className="mr-2 h-4 w-4" /> カートに追加 (仮)
                  </FuturisticButton> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
