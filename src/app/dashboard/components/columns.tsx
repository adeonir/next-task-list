"use client"

import { Status } from "@prisma/client"
import { Priority } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { PriorityBadge } from "@/components/app/priority-badge"
import { StatusBadge } from "@/components/app/status-badge"
import { Button } from "@/components/ui/button"

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
  },
  {
    header: "Priority",
    accessorKey: "priority",
    cell: ({ row }) => <PriorityBadge priority={row.original.priority} />,
  },
  {
    header: "Favorite",
    accessorKey: "favorite",
  },
  {
    header: "Actions",
    accessorKey: "actions",
    cell: ({ row }) => <Button variant="outline">View</Button>,
  },
]
