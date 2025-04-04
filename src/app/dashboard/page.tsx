import { CircleCheckBig } from "lucide-react"

import { AppContent } from "@/components/app/content"
import { AppHeader } from "@/components/app/header"
import { CreateTaskSheet } from "./components/create-task-sheet"

export default function Dashboard() {
  return (
    <>
      <AppHeader icon={CircleCheckBig} title="Task List" />
      <AppContent>
        <CreateTaskSheet />
      </AppContent>
    </>
  )
}
