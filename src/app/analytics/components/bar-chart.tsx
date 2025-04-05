"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import { Analytics } from "@/actions/get-analytics"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const chartConfig = {
  todo: {
    label: "A fazer",
    color: "#ad46ff",
  },
  inProgress: {
    label: "Em andamento",
    color: "#2b7fff",
  },
  done: {
    label: "Concluídas",
    color: "#00c951",
  },
} satisfies ChartConfig

interface BarChartProps {
  data: Analytics[]
  className?: string
}

export function BarTasksChart({ data, className }: BarChartProps) {
  const chartData = data.map((item) => ({ ...item }))

  Object.keys(chartConfig).map((key) => {
    console.log(key)
  })

  return (
    <div>
      <ChartContainer className={cn("h-[calc(100vh-480px)] w-full", className)} config={chartConfig}>
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis axisLine={false} dataKey="date" tickLine={false} tickMargin={10} />
          <ChartTooltip content={<ChartTooltipContent />} cursor={{ fill: "#f3f4f6" }} />
          <ChartLegend content={<ChartLegendContent />} />
          {Object.keys(chartConfig).map((key) => (
            <Bar dataKey={key} fill={`var(--color-${key})`} key={key} minPointSize={2} radius={4} />
          ))}
        </BarChart>
      </ChartContainer>
    </div>
  )
}
