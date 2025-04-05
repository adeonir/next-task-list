import { faker } from "@faker-js/faker"
import { Priority, PrismaClient, Status } from "@prisma/client"
import dayjs from "dayjs"

const prisma = new PrismaClient()

const status = ["Todo", "InProgress", "Done"]
const priority = ["Low", "Medium", "High"]

const tasks = Array.from({ length: 20 }, () => ({
  title: faker.commerce.productName(),
  description: faker.company.catchPhrase(),
  status: status[Math.floor(Math.random() * status.length)] as Status,
  priority: priority[Math.floor(Math.random() * priority.length)] as Priority,
  createdAt: faker.date.between({
    from: dayjs().subtract(5, "day").toDate(),
    to: dayjs().toDate(),
  }),
}))

export default async function seed() {
  await prisma.task.deleteMany()

  await prisma.task.createMany({
    data: tasks,
  })
}

seed()
