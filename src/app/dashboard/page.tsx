import { CircleCheckBig, PlusIcon } from "lucide-react"

import { AppContent } from "@/components/app/content"
import { CreateTaskForm } from "@/components/app/forms/create-task"
import { AppHeader } from "@/components/app/header"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export default function Dashboard() {
  return (
    <>
      <AppHeader icon={CircleCheckBig} title="Task List" />
      <AppContent>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline">
              <PlusIcon />
              Criar tarefa
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full max-w-3/4">
            <SheetHeader>
              <SheetTitle>Criar tarefa</SheetTitle>
            </SheetHeader>
            <CreateTaskForm />
          </SheetContent>
        </Sheet>
      </AppContent>
    </>
  )
}
