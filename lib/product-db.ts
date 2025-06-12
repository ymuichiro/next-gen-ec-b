export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl?: string
  colors?: string[]
  sizes?: string[]
  tags?: string[]
}

const mockProducts: Product[] = [
  {
    id: "1",
    name: "オーガニックコットンTシャツ",
    description: "肌触りの良いオーガニックコットン100%のTシャツ。シンプルで着回しやすいデザインです。",
    price: 2980,
    category: "トップス",
    imageUrl: "/placeholder.svg?width=300&height=300&text=Organic+Cotton+T-Shirt",
    colors: ["White", "Black", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL"],
    tags: ["tshirt", "organic", "cotton", "basic", "シンプル", "Tシャツ"],
  },
  {
    id: "2",
    name: "高機能ランニングシューズ",
    description: "軽量でクッション性に優れたランニングシューズ。長距離ランニングも快適にサポートします。",
    price: 12800,
    category: "シューズ",
    imageUrl: "/placeholder.svg?width=300&height=300&text=Running+Shoes",
    colors: ["Blue", "Red", "Black", "Green"],
    sizes: ["25.0cm", "26.0cm", "27.0cm", "28.0cm"],
    tags: ["running", "shoes", "sports", "ランニング", "シューズ", "スポーツ"],
  },
  {
    id: "3",
    name: "ワイヤレスノイズキャンセリングヘッドホン",
    description: "周囲の騒音をシャットアウトし、クリアな音質で音楽を楽しめるワイヤレスヘッドホン。",
    price: 24800,
    category: "オーディオ",
    imageUrl: "/placeholder.svg?width=300&height=300&text=Wireless+Headphones",
    colors: ["Black", "Silver", "Rose Gold"],
    tags: ["headphones", "wireless", "noise cancelling", "audio", "ヘッドホン", "ワイヤレス"],
  },
  {
    id: "4",
    name: "リネンブレンドワンピース",
    description: "涼しげなリネンブレンド素材のワンピース。夏のお出かけにぴったりです。",
    price: 7990,
    category: "ワンピース",
    imageUrl: "/placeholder.svg?width=300&height=300&text=Linen+Dress",
    colors: ["Beige", "Navy", "Olive"],
    sizes: ["S", "M", "L"],
    tags: ["dress", "linen", "summer", "ワンピース", "リネン", "夏物"],
  },
  {
    id: "5",
    name: "ステンレス製タンブラー",
    description: "保温・保冷効果に優れたステンレス製タンブラー。オフィスやアウトドアで活躍します。",
    price: 3500,
    category: "キッチン雑貨",
    imageUrl: "/placeholder.svg?width=300&height=300&text=Stainless+Tumbler",
    colors: ["Silver", "Matte Black", "White"],
    tags: ["tumbler", "stainless steel", "kitchen", "タンブラー", "ステンレス"],
  },
  {
    id: "6",
    name: "レザーバックパック",
    description: "上質な本革を使用したバックパック。通勤・通学にも使えるスタイリッシュなデザイン。",
    price: 19800,
    category: "バッグ",
    imageUrl: "/placeholder.svg?width=300&height=300&text=Leather+Backpack",
    colors: ["Black", "Brown", "Navy"],
    tags: ["backpack", "leather", "bag", "バックパック", "本革", "バッグ"],
  },
  {
    id: "7",
    name: "赤いシルクのスカーフ",
    description: "鮮やかな赤いシルク100%のスカーフ。コーディネートのアクセントに。",
    price: 4500,
    category: "小物",
    imageUrl: "/placeholder.svg?width=300&height=300&text=Red+Silk+Scarf",
    colors: ["Red"],
    tags: ["scarf", "silk", "red", "accessory", "スカーフ", "シルク", "赤"],
  },
  {
    id: "8",
    name: "赤いコットンTシャツ",
    description: "鮮やかな赤色のコットンTシャツ。カジュアルな着こなしに。",
    price: 2500,
    category: "トップス",
    imageUrl: "/placeholder.svg?width=300&height=300&text=Red+Cotton+T-Shirt",
    colors: ["Red"],
    sizes: ["S", "M", "L"],
    tags: ["tshirt", "cotton", "red", "Tシャツ", "赤"],
  },
]

export interface SearchParams {
  query?: string
  category?: string
  color?: string
  minPrice?: number
  maxPrice?: number
  tags?: string[]
}

export function searchProducts(params: SearchParams): Product[] {
  let results = [...mockProducts]

  if (params.query) {
    const qLower = params.query.toLowerCase()
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(qLower) ||
        p.description.toLowerCase().includes(qLower) ||
        (p.tags && p.tags.some((tag) => tag.toLowerCase().includes(qLower))),
    )
  }

  if (params.category) {
    const catLower = params.category.toLowerCase()
    results = results.filter((p) => p.category.toLowerCase() === catLower)
  }

  if (params.color) {
    const colorLower = params.color.toLowerCase()
    results = results.filter((p) => p.colors && p.colors.some((c) => c.toLowerCase() === colorLower))
  }

  if (params.minPrice !== undefined) {
    results = results.filter((p) => p.price >= params.minPrice!)
  }

  if (params.maxPrice !== undefined) {
    results = results.filter((p) => p.price <= params.maxPrice!)
  }

  if (params.tags && params.tags.length > 0) {
    const searchTagsLower = params.tags.map((t) => t.toLowerCase())
    results = results.filter(
      (p) => p.tags && searchTagsLower.every((st) => p.tags!.map((pt) => pt.toLowerCase()).includes(st)),
    )
  }

  return results
}

export { mockProducts }
