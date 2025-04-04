import { Status } from "@prisma/client"

import { Badge, BadgeProps } from "@/components/ui/badge"

const statusMap: Record<Status, { label: string; variant: BadgeProps["variant"] }> = {
  Todo: {
    label: "A Fazer",
    variant: "primary",
  },
  InProgress: {
    label: "Em Andamento",
    variant: "info",
  },
  Done: {
    label: "Concluído",
    variant: "success",
  },
}

interface StatusBadgeProps {
  status: Status
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge shape="rounded" variant={statusMap[status].variant}>
      {statusMap[status].label}
    </Badge>
  )
}
