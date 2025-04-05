"use client"

import { Task } from "@prisma/client"
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DeleteTask } from "./delete-task"
import { UpdateTask } from "./update-task"

interface TaskActionsProps {
  task: Omit<Task, "createdAt" | "updatedAt">
}

export function TaskActions({ task }: TaskActionsProps) {
  return (
    <div className="flex items-center">
      <UpdateTask task={task} />
      <Button variant="ghost">
        <Copy className="size-5 shrink" />
      </Button>
      <DeleteTask taskId={task.id} />
    </div>
  )
}
