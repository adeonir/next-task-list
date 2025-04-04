import { Priority } from "@prisma/client"

import { Badge, BadgeProps } from "@/components/ui/badge"

const priorityMap: Record<Priority, { label: string; variant: BadgeProps["variant"] }> = {
  Low: {
    label: "Baixa",
    variant: "secondary",
  },
  Medium: {
    label: "Média",
    variant: "warning",
  },
  High: {
    label: "Alta",
    variant: "error",
  },
}

interface PriorityBadgeProps {
  priority: Priority
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  return (
    <Badge shape="pill" variant={priorityMap[priority].variant as BadgeProps["variant"]}>
      {priorityMap[priority].label}
    </Badge>
  )
}
