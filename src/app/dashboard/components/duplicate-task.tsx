"use client"

import { Copy } from "lucide-react"
import { useState, useTransition } from "react"

import { duplicateTaskAction } from "@/actions/duplicate-task"
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

interface DuplicateTaskProps {
  taskId: string
}

export function DuplicateTask({ taskId }: DuplicateTaskProps) {
  const { toast } = useToast()

  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleDuplicate = () => {
    startTransition(async () => {
      try {
        const result = await duplicateTaskAction(taskId)

        if (result.status === "success") {
          toast.success(result.message)
        } else {
          toast.error(result.message, {
            description: result.description,
          })
        }
      } catch (error) {
        toast.error("Erro ao duplicar tarefa", {
          description: "Algo deu errado, tente novamente mais tarde.",
        })
      }
    })
  }

  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="ghost">
          <Copy className="size-5 shrink-0" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Tem certeza que deseja duplicar a tarefa?</AlertDialogTitle>
          <AlertDialogDescription>Esta ação irá criar uma cópia da tarefa com o mesmo conteúdo.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="border-gray-300">Cancelar</AlertDialogCancel>
          <AlertDialogAction disabled={isPending} onClick={handleDuplicate}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
