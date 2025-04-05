import { ChartColumnBig } from "lucide-react"

import { getAnalytics } from "@/actions/get-analytics"
import { BarTasksChart } from "@/app/analytics/components/bar-chart"
import { AppContent } from "@/components/app/content"
import { AppHeader } from "@/components/app/header"

export default async function Dashboard() {
  const { data } = await getAnalytics()

  return (
    <>
      <AppHeader icon={ChartColumnBig} title="Analytics" />
      <AppContent>
        <BarTasksChart data={data} />
      </AppContent>
    </>
  )
}
