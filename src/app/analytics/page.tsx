import { ChartColumnBig } from "lucide-react"

import { getAnalytics } from "@/actions/get-analytics"
import { BarTasksChart } from "@/app/analytics/components/bar-chart"
import { AppContent } from "@/components/app/content"
import { AppHeader } from "@/components/app/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Dashboard() {
  const { data } = await getAnalytics()

  const cardData = [
    {
      title: "Total de tarefas",
      value: data.totalTasks,
    },
    {
      title: "Total a fazer",
      value: data.totalTasksTodo,
    },
    {
      title: "Total em andamento",
      value: data.totalTasksInProgress,
    },
    {
      title: "Total concluídas",
      value: data.totalTasksDone,
    },
  ]

  return (
    <>
      <AppHeader icon={ChartColumnBig} title="Analytics" />
      <AppContent className="space-y-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {cardData.map((card) => (
            <Card className="gap-0 md:gap-4" key={card.title}>
              <CardHeader>
                <CardTitle className="text-lg">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="font-bold text-3xl">{card.value}</CardContent>
            </Card>
          ))}
        </div>
        <Card>
          <BarTasksChart data={data.analytics} />
        </Card>
      </AppContent>
    </>
  )
}
