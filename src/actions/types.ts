export interface FormState {
  message: string
  description?: string
  status?: "success" | "error"
  fields?: Record<string, string>
  issues?: {
    issue: string
    path: string
  }[]
}
