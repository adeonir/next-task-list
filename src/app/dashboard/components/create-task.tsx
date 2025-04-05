"use client"

import { PlusIcon } from "lucide-react"
import { useState } from "react"

import { TaskForm } from "@/components/app/task-form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function CreateTask() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button className="border-gray-300" variant="outline">
          <PlusIcon />
          Criar tarefa
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-3/4">
        <SheetHeader>
          <SheetTitle>Criar tarefa</SheetTitle>
          <SheetDescription className="hidden">Formulário para criar uma nova tarefa.</SheetDescription>
        </SheetHeader>
        <TaskForm onOpen={setIsOpen} />
      </SheetContent>
    </Sheet>
  )
}
