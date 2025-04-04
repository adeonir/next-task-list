import { LucideIcon } from "lucide-react"

import { AppNavigationMenu } from "@/components/app/navigation-menu"
import { Separator } from "@/components/ui/separator"

interface HeaderProps {
  title: string
  icon: LucideIcon
}

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Analytics",
    href: "/analytics",
  },
]

export function AppHeader({ title, icon: Icon }: HeaderProps) {
  return (
    <header className="p-8 shadow-2xl/10">
      <div className="flex items-center gap-2">
        <Icon className="size-6" strokeWidth={2.5} />
        <h2 className="font-bold text-2xl">{title}</h2>
      </div>
      <Separator className="my-4" />
      <AppNavigationMenu items={navigationItems} />
    </header>
  )
}
