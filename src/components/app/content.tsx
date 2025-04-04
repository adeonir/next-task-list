import { ReactNode } from "react"

interface AppContentProps {
  children: ReactNode
}

export function AppContent({ children }: AppContentProps) {
  return <main className="flex-1 p-8">{children}</main>
}
