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
        primary: "border-transparent bg-purple-100 text-purple-950",
        secondary: "border-transparent bg-gray-200 text-gray-950",
        success: "border-transparent bg-green-100 text-green-950",
        error: "border-transparent bg-red-100 text-red-950",
        info: "border-transparent bg-blue-100 text-blue-950",
        warning: "border-transparent bg-amber-100 text-amber-950",
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
