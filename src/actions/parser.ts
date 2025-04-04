import type { z } from "zod"

import type { FormState } from "./types"

interface ParseFormData {
  data: FormData
  schema: z.ZodSchema
}

type ParseFormDataResult<T> = { success: true; data: T } | { success: false; formState: FormState }

export function parseFormData<T>({ data, schema }: ParseFormData): ParseFormDataResult<T> {
  const formData = Object.fromEntries(data)

  const parsed = schema.safeParse(formData)

  if (!parsed.success) {
    const fields: Record<string, string> = {}

    for (const key of Object.keys(formData)) {
      const value = formData[key]

      fields[key] = typeof value === "string" ? value : JSON.stringify(value)
    }

    console.error("form validation issues:", parsed.error.issues)

    return {
      success: false,
      formState: {
        message: "Erro ao validar formulário!",
        description: "Verifique os campos e tente novamente.",
        status: "error",
        fields,
        issues: parsed.error.issues.map((issue) => ({
          issue: issue.message,
          path: issue.path.join("."),
        })),
      },
    }
  }

  return {
    success: true,
    data: parsed.data as T,
  }
}
