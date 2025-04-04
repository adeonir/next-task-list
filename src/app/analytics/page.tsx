import { ChartColumnBig } from "lucide-react"

import { AppContent } from "@/components/app/content"
import { AppHeader } from "@/components/app/header"

export default function Dashboard() {
  return (
    <>
      <AppHeader icon={ChartColumnBig} title="Analytics" />
      <AppContent>
        <h1>Analytics</h1>
      </AppContent>
    </>
  )
}
