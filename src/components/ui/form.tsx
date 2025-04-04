"use client"

import * as LabelPrimitive from "@radix-ui/react-label"
import { Slot } from "@radix-ui/react-slot"
import { ComponentProps, createContext, useContext, useId } from "react"
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
  useFormState,
} from "react-hook-form"

import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const Form = FormProvider

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName
}

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue)

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  )
}

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  }
}

type FormItemContextValue = {
  id: string
}

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue)

function FormItem({ className, ...props }: ComponentProps<"div">) {
  const id = useId()

  return (
    <FormItemContext.Provider value={{ id }}>
      <div className={cn("grid gap-2", className)} data-slot="form-item" {...props} />
    </FormItemContext.Provider>
  )
}

function FormLabel({ className, ...props }: ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField()

  return (
    <Label
      className={cn("data-[error=true]:text-red-500", className)}
      data-error={!!error}
      data-slot="form-label"
      htmlFor={formItemId}
      {...props}
    />
  )
}

function FormControl({ ...props }: ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      data-slot="form-control"
      id={formItemId}
      {...props}
    />
  )
}

function FormDescription({ className, ...props }: ComponentProps<"p">) {
  const { formDescriptionId } = useFormField()

  return (
    <p
      className={cn("text-gray-500 text-sm", className)}
      data-slot="form-description"
      id={formDescriptionId}
      {...props}
    />
  )
}

function FormMessage({ className, ...props }: ComponentProps<"p">) {
  const { error, formMessageId } = useFormField()
  const body = error ? String(error?.message ?? "") : props.children

  if (!body) {
    return null
  }

  return (
    <p className={cn("text-red-500 text-sm", className)} data-slot="form-message" id={formMessageId} {...props}>
      {body}
    </p>
  )
}

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField }
