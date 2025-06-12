import { NextResponse } from "next/server"
import { searchProducts, type SearchParams } from "@/lib/product-db"

export async function POST(req: Request) {
  try {
    const params = (await req.json()) as SearchParams
    const products = searchProducts(params)
    return NextResponse.json(products)
  } catch (error) {
    console.error("[Search Products API Error]", error)
    return NextResponse.json({ error: "Failed to search products" }, { status: 500 })
  }
}
