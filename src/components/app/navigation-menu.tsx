"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

interface NavigationMenuProps {
  items: {
    label: string
    href: string
  }[]
}

export function AppNavigationMenu({ items }: NavigationMenuProps) {
  const pathname = usePathname()

  return (
    <nav>
      <ul className="flex items-center justify-start gap-1">
        {items.map((item) => (
          <li key={item.href}>
            <Link
              className={cn(
                "inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 font-medium text-sm outline-none transition-all",
                "hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus-visible:outline-1",
                "focus-visible:ring-[3px] focus-visible:ring-gray-950/50 disabled:pointer-events-none disabled:opacity-50",
                "data-[active=true]:bg-gray-100 data-[active=true]:text-gray-900 data-[active=true]:focus:bg-gray-100 data-[active=true]:hover:bg-gray-100",
              )}
              data-active={pathname === item.href}
              href={item.href}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
