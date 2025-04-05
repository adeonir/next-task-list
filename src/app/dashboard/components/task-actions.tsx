"use client"

import { Task } from "@prisma/client"

import { DeleteTask } from "./delete-task"
import { DuplicateTask } from "./duplicate-task"
import { UpdateTask } from "./update-task"

interface TaskActionsProps {
  task: Omit<Task, "createdAt" | "updatedAt">
}

export function TaskActions({ task }: TaskActionsProps) {
  return (
    <div className="flex items-center">
      <UpdateTask task={task} />
      <DuplicateTask taskId={task.id} />
      <DeleteTask taskId={task.id} />
    </div>
  )
}
