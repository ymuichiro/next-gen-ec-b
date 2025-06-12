import { OpenAI } from "@ai-sdk/openai"
import { streamText, tool } from "ai"
import { z } from "zod"

export const runtime = "edge" // Optional: use edge runtime

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai("gpt-4o-mini"), // Using a cost-effective model
    system: `You are an advanced shopping AI assistant for 'ShopNext'.
Your goal is to help users find products through natural conversation.
Ask clarifying questions if needed to narrow down the search.
When you find products using the 'searchProductsTool', briefly mention them (e.g., "こちらが見つかった商品です：") and let the user see the product details displayed by the system.
If no products are found, inform the user politely and perhaps suggest broadening their search or trying different keywords.
If many products are found, you can suggest ways to narrow them down (e.g., "たくさんの商品が見つかりました。特定のブランドや価格帯はありますか？").
Be friendly, helpful, and engaging. Use Japanese for responses.
Today is ${new Date().toLocaleDateString("ja-JP")}.`,
    messages,
    tools: {
      searchProductsTool: tool({
        description:
          "Search for products in the e-commerce store based on various criteria like keywords, category, color, price range, and tags. Use this tool whenever a user asks to find or search for products.",
        parameters: z.object({
          query: z
            .string()
            .optional()
            .describe(
              "Keywords for product search (e.g., 'ランニングシューズ', '夏物 ワンピース'). This can be a general description of what the user is looking for.",
            ),
          category: z
            .string()
            .optional()
            .describe("Product category (e.g., 'トップス', 'シューズ', 'オーディオ', 'バッグ')."),
          color: z.string().optional().describe("Desired product color (e.g., '赤', '青', '黒')."),
          minPrice: z.number().optional().describe("Minimum price for the product."),
          maxPrice: z.number().optional().describe("Maximum price for the product."),
          tags: z
            .array(z.string())
            .optional()
            .describe("Specific tags to filter products (e.g., ['organic', 'cotton'], ['waterproof'])."),
        }),
        // Execute function is NOT defined here because tool calls are handled on the client-side
        // via experimental_onToolCall in useChat.
        // The AI SDK will generate a tool_call message part that the client will handle.
      }),
    },
  })

  return result.toAIStreamResponse()
}
