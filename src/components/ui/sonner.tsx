"use client"

import { Toaster as Sonner, toast as sonnerToast, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      position="top-right"
      richColors
      theme="light"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-500",
          actionButton: "group-[.toast]:bg-blue-500 group-[.toast]:text-white font-medium",
          cancelButton: "group-[.toast]:bg-gray-200 group-[.toast]:text-gray-500 font-medium",
        },
      }}
      {...props}
    />
  )
}

const useToast = () => {
  return {
    toast: sonnerToast,
  }
}

export { Toaster, useToast }
