import { Priority, Status } from "@prisma/client"

import { PriorityBadge } from "@/components/app/priority-badge"
import { StatusBadge } from "@/components/app/status-badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const statusOptions: { label: Status; value: string }[] = [
  { label: "Todo", value: "todo" },
  { label: "InProgress", value: "in_progress" },
  { label: "Done", value: "done" },
]

const priorityOptions: { label: Priority; value: string }[] = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
]

export function CreateTaskForm() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Título</Label>
        <Input placeholder="Título da tarefa" />
      </div>

      <div className="flex flex-col gap-2">
        <Label>Descrição</Label>
        <Textarea placeholder="Descrição da tarefa" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <Label>Status</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <StatusBadge status={option.label} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2">
          <Label>Prioridade</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Prioridade" />
            </SelectTrigger>
            <SelectContent>
              {priorityOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <PriorityBadge priority={option.label} />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button className="mt-8" type="submit">
        Criar
      </Button>
    </div>
  )
}
