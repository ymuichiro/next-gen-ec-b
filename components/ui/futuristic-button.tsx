import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 glass-interactive", // glass-interactive を基本スタイルに追加
  {
    variants: {
      variant: {
        default: "bg-primary/80 text-primary-foreground hover:bg-primary/90 shadow-lg", // 少し透明度を持たせる
        destructive: "bg-destructive/80 text-destructive-foreground hover:bg-destructive/90 shadow-lg",
        outline: "border border-input !bg-opacity-30 hover:!bg-opacity-50 text-foreground", // glass-interactiveの背景を活かすため、背景色指定を調整
        secondary: "bg-secondary/80 text-secondary-foreground hover:bg-secondary/90 shadow-lg",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground", // 背景を半透明に
        link: "text-primary underline-offset-4 hover:underline !bg-transparent !border-none !shadow-none backdrop-filter-none", // リンクはガラス効果なし
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const FuturisticButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
FuturisticButton.displayName = "Button"

export { FuturisticButton, buttonVariants }
