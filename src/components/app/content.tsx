import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

interface AppContentProps extends ComponentProps<"main"> {}

export function AppContent({ children, className, ...props }: AppContentProps) {
  return (
    <main className={cn("flex-1 p-8", className)} {...props}>
      {children}
    </main>
  )
}
