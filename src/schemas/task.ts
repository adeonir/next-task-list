import { Priority, Status } from "@prisma/client"
import { z } from "zod"

export const taskSchema = z.object({
  title: z.string().trim().min(1, { message: "Título é obrigatório" }),
  description: z.string().trim().min(1, { message: "Descrição é obrigatória" }),
  status: z.nativeEnum(Status, { message: "Status é obrigatório" }),
  priority: z.nativeEnum(Priority, { message: "Prioridade é obrigatória" }),
})

export type TaskSchema = z.infer<typeof taskSchema>
