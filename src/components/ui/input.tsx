import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-9 w-full min-w-0 rounded-md border border-gray-200 bg-transparent px-3 py-1 text-base shadow-xs outline-none",
        "transition-[color,box-shadow] selection:bg-gray-900 selection:text-gray-50 file:inline-flex file:h-7 file:border-0",
        "file:bg-transparent file:font-medium file:text-gray-950 file:text-sm placeholder:text-gray-500",
        "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-gray-950 focus-visible:ring-[3px] focus-visible:ring-blue-500/20",
        "aria-invalid:border-red-500 aria-invalid:ring-red-500/20",
        className,
      )}
      data-slot="input"
      type={type}
      {...props}
    />
  )
}

export { Input }
