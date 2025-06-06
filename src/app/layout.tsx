import "@/styles/globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"

import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Task List",
  description: "A simple task list app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html className={`${inter.className} antialiased`} lang="pt-BR">
      <body className="flex min-h-screen overflow-x-hidden bg-gray-200">
        <div className="m-4 flex flex-1 flex-col overflow-x-hidden rounded-lg bg-white shadow-lg">{children}</div>
        <Toaster />
      </body>
    </html>
  )
}
