"use server"

import { prisma } from "@/lib/prisma"

export async function getTasks() {
  const tasks = await prisma.task.findMany({
    orderBy: {
      createdAt: "desc",
    },
  })

  return { tasks }
}
