"use client"

import { Star, StarOff } from "lucide-react"
import { useTransition } from "react"

import { toggleFavoriteAction } from "@/actions/toggle-favorite"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/sonner"

interface ToggleFavoriteProps {
  taskId: string
  favorite: boolean
}

export function ToggleFavorite({ taskId, favorite }: ToggleFavoriteProps) {
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      try {
        const result = await toggleFavoriteAction(taskId)

        if (result.status === "success") {
          toast.success(result.message)
        } else {
          toast.error(result.message, {
            description: result.description,
          })
        }
      } catch (error) {
        toast.error("Erro ao atualizar favorito", {
          description: "Algo deu errado, tente novamente mais tarde.",
        })
      }
    })
  }

  return (
    <Button disabled={isPending} onClick={handleClick} variant="ghost">
      {favorite ? <Star className="size-5 shrink-0" /> : <StarOff className="size-5 shrink-0" />}
    </Button>
  )
}
