"use client"

import { Status } from "@prisma/client"
import { Priority } from "@prisma/client"
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
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => <p className="font-semibold">{row.original.title}</p>,
  },
  {
    header: "Description",
    accessorKey: "description",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
    size: 180,
    maxSize: 180,
  },
  {
    header: "Priority",
    accessorKey: "priority",
    cell: ({ row }) => <PriorityBadge priority={row.original.priority} />,
    size: 140,
    maxSize: 140,
  },
  {
    header: "Favorite",
    accessorKey: "favorite",
    size: 100,
    maxSize: 100,
    cell: ({ row }) => <ToggleFavorite favorite={row.original.favorite} taskId={row.original.id} />,
  },
  {
    header: "Actions",
    accessorKey: "actions",
    size: 140,
    maxSize: 140,
    cell: ({ row }) => <TaskActions taskId={row.original.id} />,
  },
]
