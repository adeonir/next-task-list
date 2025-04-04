"use client"

import { PlusIcon } from "lucide-react"
import { useState } from "react"

import { CreateTaskForm } from "@/components/app/forms/create-task"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

export function CreateTaskSheet() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>
        <Button variant="outline">
          <PlusIcon />
          Criar tarefa
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full max-w-3/4">
        <SheetHeader>
          <SheetTitle>Criar tarefa</SheetTitle>
          <SheetDescription className="hidden">Formulário para criar uma nova tarefa.</SheetDescription>
        </SheetHeader>
        <CreateTaskForm onOpen={setOpen} />
      </SheetContent>
    </Sheet>
  )
}
