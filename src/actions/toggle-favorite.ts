"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function toggleFavoriteAction(taskId: string) {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
  })

  if (!task) {
    return {
      message: "Tarefa não encontrada!",
      description: "Algo deu errado, tente novamente mais tarde.",
      status: "error",
    }
  }

  try {
    await prisma.task.update({
      where: { id: taskId },
      data: { favorite: !task.favorite },
    })

    revalidatePath("/dashboard")

    return {
      message: task.favorite ? "Tarefa removida dos favoritos!" : "Tarefa adicionada aos favoritos!",
      status: "success",
    }
  } catch (error) {
    return {
      message: "Erro ao atualizar tarefa!",
      description: "Algo deu errado, tente novamente mais tarde.",
      status: "error",
    }
  }
}
