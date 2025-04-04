import { CircleX, Copy, FilePenLine } from "lucide-react"

import { Button } from "@/components/ui/button"

interface TaskActionsProps {
  taskId: string
}

export function TaskActions({ taskId }: TaskActionsProps) {
  return (
    <div className="flex items-center">
      <Button variant="ghost">
        <FilePenLine className="size-5 shrink-0" />
      </Button>
      <Button variant="ghost">
        <Copy className="size-5 shrink" />
      </Button>
      <Button variant="ghost">
        <CircleX className="size-5 shrink-0" />
      </Button>
    </div>
  )
}
