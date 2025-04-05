"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

export async function duplicateTaskAction(taskId: string) {
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
    await prisma.task.create({
      data: {
        title: `${task.title} (Copy)`,
        description: task.description,
        status: task.status,
        priority: task.priority,
        favorite: false,
      },
    })

    revalidatePath("/dashboard")

    return {
      message: "Tarefa duplicada com sucesso!",
      status: "success",
    }
  } catch (error) {
    console.error(error)
    return {
      message: "Erro ao duplicar tarefa!",
      description: "Algo deu errado, tente novamente mais tarde.",
      status: "error",
    }
  }
}
