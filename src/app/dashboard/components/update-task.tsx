"use client"

import { Task } from "@prisma/client"
import { FilePenLine } from "lucide-react"
import { useState } from "react"

import { TaskForm } from "@/components/app/task-form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface UpdateTaskProps {
  task: Omit<Task, "createdAt" | "updatedAt">
}

export function UpdateTask({ task }: UpdateTaskProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <FilePenLine className="size-5 shrink-0" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-3/4">
        <SheetHeader>
          <SheetTitle>Editar tarefa</SheetTitle>
          <SheetDescription className="hidden">Formulário para editar uma tarefa.</SheetDescription>
        </SheetHeader>
        <TaskForm onOpen={setIsOpen} task={task} />
      </SheetContent>
    </Sheet>
  )
}
