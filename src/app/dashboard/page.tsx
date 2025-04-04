import { CircleCheckBig } from "lucide-react"

import { AppContent } from "@/components/app/content"
import { AppHeader } from "@/components/app/header"

export default function Dashboard() {
  return (
    <>
      <AppHeader icon={CircleCheckBig} title="Task List" />
      <AppContent>
        <h1>Dashboard</h1>
      </AppContent>
    </>
  )
}
