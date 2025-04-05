"use client"

import { CircleX } from "lucide-react"
import { useState, useTransition } from "react"

import { deleteTaskAction } from "@/actions/delete-task"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/sonner"

interface DeleteTaskProps {
  taskId: string
}

export function DeleteTask({ taskId }: DeleteTaskProps) {
  const { toast } = useToast()

  const [isOpen, setIsOpen] = useState(false)
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
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <CircleX className="size-5 shrink-0" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja deletar a tarefa?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser revertida. Isso irá deletar a tarefa permanentemente e remover seus dados dos nossos
            servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="border-gray-300">Cancelar</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
