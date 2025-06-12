"use client"

import { useState, useRef, useEffect, type FormEvent } from "react"
import { useChat, type Message, type ToolCallPayload, type ToolResultPayload } from "ai/react"
import { FuturisticInput } from "@/components/ui/futuristic-input"
import { FuturisticButton } from "@/components/ui/futuristic-button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { SendHorizonal, Bot, User, Loader2, AlertTriangle, SparklesIcon } from "lucide-react"
import { type Product, mockProducts } from "@/lib/product-db" // mockProducts をインポート
import { cn } from "@/lib/utils"
import ProductSuggestions from "./product-suggestions"

// chat-interface.tsx 内の ProductCard 定義は削除 (product-suggestions.tsx が担当)

export default function ChatInterface() {
  const [productResults, setProductResults] = useState<Product[]>([])
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleToolCall = async (toolCall: ToolCallPayload): Promise<ToolResultPayload> => {
    if (toolCall.toolName === "searchProductsTool") {
      const args = toolCall.arguments as any
      try {
        const response = await fetch("/api/tools/search-products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(args),
        })
        if (!response.ok) {
          throw new Error(`Search API failed: ${response.statusText}`)
        }
        const products: Product[] = await response.json()
        setProductResults(products)
        return { toolCallId: toolCall.toolCallId, toolName: "searchProductsTool", result: products }
      } catch (error) {
        console.error("Tool call error:", error)
        setProductResults([])
        return {
          toolCallId: toolCall.toolCallId,
          toolName: "searchProductsTool",
          result: { error: (error as Error).message },
        }
      }
    }
    return { toolCallId: toolCall.toolCallId, toolName: toolCall.toolName, result: { error: "Unknown tool" } }
  }

  const { messages, input, handleInputChange, handleSubmit, isLoading, error, setMessages, append } = useChat({
    api: "/api/chat",
    experimental_onToolCall: handleToolCall,
    onFinish: () => {
      inputRef.current?.focus()
    },
    // initialMessages はユーザー/アシスタントロール用なので、ここでは使わない
  })

  // 初期メッセージとダミー商品データを設定するuseEffect
  useEffect(() => {
    if (messages.length === 0 && !isLoading) {
      const welcomeMessage: Message = {
        id: "initial-welcome-" + Date.now(), // ユニークID
        role: "assistant",
        content: "こんにちは！何かお探しですか？まずはこちらのおすすめ商品をご覧ください。",
      }
      // mockProductsから最初の3つをダミーデータとして使用
      const dummyProductsToShow = mockProducts.slice(0, 3)
      const dummyToolResult: Message = {
        id: "initial-products-" + Date.now(), // ユニークID
        role: "tool",
        name: "searchProductsTool",
        content: JSON.stringify(dummyProductsToShow),
      }
      setMessages([welcomeMessage, dummyToolResult])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // messages, isLoading, setMessages を依存配列から除外し、マウント時に一度だけ実行されるようにする

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [messages])

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === "user") {
      setProductResults([])
    }
  }, [messages])

  const onFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
  }

  const quickReplies = ["おすすめは？", "セール中の商品は？", "最近の人気商品は？", "ギフトを探してる"]

  const handleQuickReply = (reply: string) => {
    append({ role: "user", content: reply })
  }

  return (
    <div className="glass-effect rounded-xl overflow-hidden flex flex-col h-[75vh] max-h-[800px]">
      <ScrollArea className="flex-grow p-6" ref={scrollAreaRef}>
        {messages.map((m: Message, index: number) => {
          if (m.role === "tool" && m.name === "searchProductsTool") {
            let productsToShow: Product[] | null = null
            try {
              const parsedContent = JSON.parse(m.content as string)
              if (Array.isArray(parsedContent)) {
                if (parsedContent.every((p) => typeof p === "object" && p.id && p.name)) {
                  productsToShow = parsedContent
                }
              } else if (parsedContent && parsedContent.error) {
                console.warn("Tool call (searchProductsTool) returned an error:", parsedContent.error)
              }
            } catch (e) {
              console.error("Failed to parse tool message content for products:", e, m.content)
            }

            if (productsToShow && productsToShow.length > 0) {
              return <ProductSuggestions key={`${m.id}-products`} products={productsToShow} />
            }
            return null
          }

          return (
            <div
              key={m.id}
              className={cn("flex gap-3 my-4 animate-fadeIn", m.role === "user" ? "justify-end" : "items-start")}
            >
              {m.role === "assistant" && (
                <Avatar className="flex-shrink-0 border-2 border-white/30 shadow-md">
                  <AvatarImage
                    src={`/placeholder.svg?text=AI&width=40&height=40&bgColor=rgba(var(--primary-rgb),0.8)&textColor=rgb(var(--primary-foreground-rgb))`}
                    alt="AI Avatar"
                  />
                  <AvatarFallback className="bg-primary/80 text-primary-foreground">
                    <Bot size={20} />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "p-3 rounded-lg max-w-[80%] relative prose prose-sm prose-p:my-1 prose-headings:my-2",
                  m.role === "user"
                    ? "bg-primary/80 text-primary-foreground rounded-br-none shadow-md backdrop-blur-sm"
                    : "glass-effect-darker text-foreground rounded-bl-none",
                )}
              >
                {isLoading && m.role === "assistant" && m.content === "" && index === messages.length - 1 && (
                  <div className="flex items-center space-x-1 p-1">
                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-pulse delay-0"></span>
                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-pulse delay-150"></span>
                    <span className="w-1.5 h-1.5 bg-foreground/50 rounded-full animate-pulse delay-300"></span>
                  </div>
                )}
                {m.content !== "" && <p className="text-sm whitespace-pre-wrap">{m.content}</p>}
              </div>
              {m.role === "user" && (
                <Avatar className="flex-shrink-0 border-2 border-white/20 shadow-md">
                  <AvatarImage
                    src={`/placeholder.svg?text=U&width=40&height=40&bgColor=rgba(var(--muted-rgb),0.7)&textColor=rgb(var(--foreground-rgb))`}
                    alt="User Avatar"
                  />
                  <AvatarFallback className="bg-muted/70 text-muted-foreground">
                    <User size={20} />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          )
        })}
        {isLoading &&
          messages.length > 0 &&
          messages[messages.length - 1].role === "user" &&
          !messages.find(
            (msg) =>
              msg.role === "assistant" && messages.indexOf(msg) > messages.map((m) => m.role).lastIndexOf("user"),
          ) && (
            <div className="flex gap-3 my-4 items-start animate-fadeIn">
              <Avatar className="flex-shrink-0 border-2 border-white/30 shadow-md">
                <AvatarImage
                  src={`/placeholder.svg?text=AI&width=40&height=40&bgColor=rgba(var(--primary-rgb),0.8)&textColor=rgb(var(--primary-foreground-rgb))`}
                  alt="AI Avatar"
                />
                <AvatarFallback className="bg-primary/80 text-primary-foreground">
                  <Bot size={20} />
                </AvatarFallback>
              </Avatar>
              <div className="p-3 rounded-lg glass-effect-darker text-foreground flex items-center space-x-1">
                <span className="w-1.5 h-1.5 bg-foreground/70 rounded-full animate-pulse delay-0"></span>
                <span className="w-1.5 h-1.5 bg-foreground/70 rounded-full animate-pulse delay-150"></span>
                <span className="w-1.5 h-1.5 bg-foreground/70 rounded-full animate-pulse delay-300"></span>
              </div>
            </div>
          )}
      </ScrollArea>

      {error && (
        <div className="p-3 text-destructive-foreground bg-destructive/80 backdrop-blur-sm border-t border-destructive/50 flex items-center gap-2 text-sm">
          <AlertTriangle className="h-4 w-4" />
          <span>エラー: {error.message}</span>
        </div>
      )}

      {!isLoading &&
        messages.length > 0 &&
        messages[messages.length - 1].role === "assistant" &&
        productResults.length === 0 && (
          <ScrollArea orientation="horizontal" className="whitespace-nowrap">
            <div className="flex gap-2 p-3 border-t border-white/10">
              {quickReplies.map((reply) => (
                <FuturisticButton
                  key={reply}
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuickReply(reply)}
                  className="text-xs glass-interactive !bg-opacity-50 hover:!bg-opacity-70 !border-opacity-20 hover:!border-opacity-30 text-foreground"
                >
                  <SparklesIcon className="w-3 h-3 mr-1.5 text-primary/70" />
                  {reply}
                </FuturisticButton>
              ))}
            </div>
          </ScrollArea>
        )}

      <div className="p-4 border-t border-white/10 bg-black/5 backdrop-blur-sm">
        <form onSubmit={onFormSubmit} className="flex items-center gap-3">
          <FuturisticInput
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="メッセージを入力..."
            className="flex-grow"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                onFormSubmit(e as any)
              }
            }}
          />
          <FuturisticButton
            type="submit"
            disabled={isLoading || !input.trim()}
            size="lg"
            className="aspect-square p-2.5"
          >
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
            <span className="sr-only">送信</span>
          </FuturisticButton>
        </form>
      </div>
    </div>
  )
}
