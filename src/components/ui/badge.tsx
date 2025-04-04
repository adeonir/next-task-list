import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { ComponentProps } from "react"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden whitespace-nowrap border border-gray-200",
    "px-2 py-0.5 font-medium text-sm transition-colors aria-invalid:border-red-500 aria-invalid:ring-red-500/20 [&>svg]:pointer-events-none [&>svg]:size-3",
  ],
  {
    variants: {
      variant: {
        primary: "border-transparent bg-purple-500 text-purple-50 [a&]:hover:bg-purple-500/90",
        secondary: "border-transparent bg-gray-200 text-gray-900 [a&]:hover:bg-gray-200/90",
        success: "border-transparent bg-green-600 text-green-50 [a&]:hover:bg-green-600/90",
        error: "border-transparent bg-red-500 text-white [a&]:hover:bg-red-500/90",
        info: "border-transparent bg-blue-500 text-blue-50 [a&]:hover:bg-blue-500/90",
        warning: "border-transparent bg-yellow-400 text-yellow-900 [a&]:hover:bg-yellow-400/90",
        outline: "text-gray-950 [a&]:hover:bg-gray-100 [a&]:hover:text-gray-900",
      },
      shape: {
        rounded: "rounded-md",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      shape: "pill",
    },
  },
)

export interface BadgeProps extends ComponentProps<"span">, VariantProps<typeof badgeVariants> {
  asChild?: boolean
}

function Badge({ className, variant, shape, asChild = false, ...props }: BadgeProps) {
  const Comp = asChild ? Slot : "span"

  return <Comp className={cn(badgeVariants({ variant, shape }), className)} data-slot="badge" {...props} />
}

export { Badge, badgeVariants }
