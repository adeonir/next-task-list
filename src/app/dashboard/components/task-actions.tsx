import { Copy, FilePenLine } from "lucide-react"
import { useTransition } from "react"

import { deleteTaskAction } from "@/actions/delete-task"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/sonner"
import { DeleteTask } from "./delete-task"

interface TaskActionsProps {
  taskId: string
}

export function TaskActions({ taskId }: TaskActionsProps) {
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    startTransition(async () => {
      try {
        const result = await deleteTaskAction(taskId)

        if (result.status === "success") {
          toast.success(result.message)
        } else {
          toast.error(result.message, {
            description: result.description,
          })
        }
      } catch (error) {
        toast.error("Erro ao deletar tarefa", {
          description: "Algo deu errado, tente novamente mais tarde.",
        })
      }
    })
  }

  return (
    <div className="flex items-center">
      <Button variant="ghost">
        <FilePenLine className="size-5 shrink-0" />
      </Button>
      <Button variant="ghost">
        <Copy className="size-5 shrink" />
      </Button>
      <DeleteTask isPending={isPending} onDelete={handleDelete} />
    </div>
  )
}
