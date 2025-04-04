import { CircleCheckBig } from "lucide-react"

import { getTasks } from "@/actions/get-tasks"
import { AppContent } from "@/components/app/content"
import { AppHeader } from "@/components/app/header"
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./components/columns"
import { CreateTask } from "./components/create-task"

export default async function Dashboard() {
  const { tasks } = await getTasks()

  return (
    <>
      <AppHeader icon={CircleCheckBig} title="Task List" />
      <AppContent className="space-y-8">
        <CreateTask />
        <DataTable columns={columns} data={tasks} />
      </AppContent>
    </>
  )
}
