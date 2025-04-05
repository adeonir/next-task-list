import dayjs from "dayjs"
import { prisma } from "@/lib/prisma"

export interface Analytics {
  date: string
  todo: number
  inProgress: number
  done: number
}

export async function getAnalytics() {
  const tasksByDate = await prisma.task.groupBy({
    by: ["createdAt", "status"],
    _count: {
      _all: true,
    },
    orderBy: {
      createdAt: "asc",
    },
    where: {
      createdAt: {
        gte: dayjs().subtract(1, "month").toDate(),
      },
    },
  })

  const analytics = tasksByDate.reduce(
    (acc, curr) => {
      const date = dayjs(curr.createdAt).format("DD/MM/YYYY")

      if (!acc[date]) {
        acc[date] = {
          date,
          todo: 0,
          inProgress: 0,
          done: 0,
        }
      }

      switch (curr.status) {
        case "Done":
          acc[date].done += curr._count._all
          break
        case "InProgress":
          acc[date].inProgress += curr._count._all
          break
        case "Todo":
          acc[date].todo += curr._count._all
          break
      }

      return acc
    },
    {} as Record<string, Analytics>,
  )

  return { data: Object.values(analytics) }
}
