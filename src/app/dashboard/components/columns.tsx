"use client"

import { Priority, Status } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"

import { PriorityBadge } from "@/components/app/priority-badge"
import { StatusBadge } from "@/components/app/status-badge"
import { TaskActions } from "./task-actions"
import { ToggleFavorite } from "./toggle-favorite"

export interface Task {
  id: string
  title: string
  description: string
  favorite: boolean
  status: Status
  priority: Priority
}

export const columns: ColumnDef<Task>[] = [
  {
    header: "Título",
    accessorKey: "title",
    cell: ({ row }) => <p className="font-semibold">{row.original.title}</p>,
  },
  {
    header: () => <span className="hidden lg:block">Descrição</span>,
    accessorKey: "description",
    cell: ({ row }) => <p className="hidden lg:block">{row.original.description}</p>,
  },
  {
    header: () => <span className="hidden sm:block">Status</span>,
    accessorKey: "status",
    cell: ({ row }) => (
      <div className="hidden sm:block">
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    header: () => <span className="hidden md:block">Prioridade</span>,
    accessorKey: "priority",
    cell: ({ row }) => (
      <div className="hidden md:block">
        <PriorityBadge priority={row.original.priority} />
      </div>
    ),
  },
  {
    header: "Favorito",
    accessorKey: "favorite",
    cell: ({ row }) => <ToggleFavorite favorite={row.original.favorite} taskId={row.original.id} />,
  },
  {
    header: "Ações",
    accessorKey: "actions",
    cell: ({ row }) => <TaskActions task={row.original} />,
  },
]
