"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function deleteTaskAction(taskId: string) {
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
    await prisma.task.delete({
      where: { id: taskId },
    })

    revalidatePath("/dashboard")

    return {
      message: "Tarefa deletada com sucesso!",
      status: "success",
    }
  } catch (error) {
    return {
      message: "Erro ao deletar tarefa!",
      description: "Algo deu errado, tente novamente mais tarde.",
      status: "error",
    }
  }
}
