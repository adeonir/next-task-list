import { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "field-sizing-content flex min-h-16 w-full rounded-md border border-gray-200 bg-transparent px-3 py-2 text-base shadow-xs",
        "outline-none transition-[color,box-shadow] placeholder:text-gray-500 focus-visible:border-gray-950 focus-visible:ring-[3px]",
        "focus-visible:ring-blue-500/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-500",
        "selection:bg-blue-100 selection:text-gray-950 aria-invalid:ring-red-500/20 md:text-sm",
        className,
      )}
      data-slot="textarea"
      {...props}
    />
  )
}

export { Textarea }
