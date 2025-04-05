"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

import { TaskSchema, taskSchema } from "@/schemas/task"
import { parseFormData } from "./parser"
import { FormState } from "./types"

export async function upsertTaskAction(_: FormState, data: FormData): Promise<FormState> {
  const result = parseFormData<TaskSchema>({ data, schema: taskSchema })

  if (!result.success) {
    return result.formState
  }

  const { title, description, status, priority } = result.data

  const taskId = data.get("taskId") as string

  if (taskId) {
    const task = await prisma.task.findUnique({ where: { id: taskId } })

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
        data: {
          title,
          description,
          status,
          priority,
          favorite: task.favorite,
        },
      })

      revalidatePath("/dashboard")
    } catch (error) {
      return {
        message: "Erro ao atualizar tarefa!",
        description: "Algo deu errado, tente novamente mais tarde.",
        status: "error",
      }
    }

    return {
      message: "Tarefa atualizada com sucesso!",
      status: "success",
    }
  }

  try {
    await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        favorite: false,
      },
    })

    revalidatePath("/dashboard")
  } catch (error) {
    return {
      message: "Erro ao criar tarefa!",
      description: "Algo deu errado, tente novamente mais tarde.",
      status: "error",
    }
  }

  return {
    message: "Tarefa criada com sucesso!",
    status: "success",
  }
}
