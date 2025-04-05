"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Priority, Status, Task } from "@prisma/client"
import { Loader2Icon } from "lucide-react"
import { FormEvent, useActionState, useEffect, useRef, useState, useTransition } from "react"
import { useForm } from "react-hook-form"

import { upsertTaskAction } from "@/actions/upsert-task"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/sonner"
import { Textarea } from "@/components/ui/textarea"
import { TaskSchema, taskSchema } from "@/schemas/task"

const statusOptions = [
  { label: "A Fazer", value: "Todo" },
  { label: "Em Andamento", value: "InProgress" },
  { label: "Concluído", value: "Done" },
]

const priorityOptions = [
  { label: "Baixa", value: "Low" },
  { label: "Média", value: "Medium" },
  { label: "Alta", value: "High" },
]

const defaultValues: TaskSchema = {
  title: "",
  description: "",
  status: "" as unknown as Status,
  priority: "" as unknown as Priority,
}

interface TaskFormProps {
  task?: Omit<Task, "createdAt" | "updatedAt">
  onOpen: (open: boolean) => void
}

export function TaskForm({ task, onOpen }: TaskFormProps) {
  const { toast } = useToast()

  const [isPending, startTransition] = useTransition()
  const [state, formAction] = useActionState(upsertTaskAction, {
    message: "",
  })

  const formRef = useRef<HTMLFormElement>(null)

  const form = useForm<TaskSchema>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      ...defaultValues,
      ...(task ?? {}),
      ...(state?.fields ?? {}),
    },
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    void form.handleSubmit(() => {
      const formData = new FormData(formRef.current!)

      if (task) {
        formData.append("taskId", task.id)
      }

      startTransition(() => {
        void formAction(formData)
      })
    })(event)
  }

  useEffect(() => {
    if (state?.status === "success") {
      form.reset({
        ...defaultValues,
        ...(task ?? {}),
        ...(state?.fields ?? {}),
      })

      toast.success(state.message)
      onOpen(false)
    }

    if (state?.status === "error") {
      toast.error(state.message, {
        description: state.description,
      })
    }
  }, [form, state, toast, onOpen, task])

  return (
    <Form {...form}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit} ref={formRef}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título da tarefa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Textarea placeholder="Descrição da tarefa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <FormControl>
                  <Select name="status" onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger aria-invalid={!!form.formState.errors.status} className="w-full">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prioridade</FormLabel>
                <FormControl>
                  <Select name="priority" onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger aria-invalid={!!form.formState.errors.priority} className="w-full">
                      <SelectValue placeholder="Prioridade" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorityOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button className="mt-8" type="submit">
          {isPending ? <Loader2Icon className="size-5 animate-spin" /> : "Criar"}
        </Button>
      </form>
    </Form>
  )
}
