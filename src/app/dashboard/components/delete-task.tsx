import { CircleX } from "lucide-react"

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

interface DeleteTaskProps {
  isPending: boolean
  onDelete: () => void
}

export function DeleteTask({ isPending, onDelete }: DeleteTaskProps) {
  return (
    <AlertDialog>
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
          <AlertDialogAction disabled={isPending} onClick={onDelete}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
