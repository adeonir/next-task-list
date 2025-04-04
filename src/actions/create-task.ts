"use server"

import { revalidatePath } from "next/cache"
import { prisma } from "@/lib/prisma"

import { CreateTaskSchema, createTaskSchema } from "@/schemas/create-task"
import { parseFormData } from "./parser"
import { FormState } from "./types"

export async function createTaskAction(_: FormState, data: FormData): Promise<FormState> {
  const result = parseFormData<CreateTaskSchema>({ data, schema: createTaskSchema })

  if (!result.success) {
    return result.formState
  }

  const { title, description, status, priority } = result.data

  try {
    await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
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
