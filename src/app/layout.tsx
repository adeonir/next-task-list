import "@/styles/globals.css"

import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ReactNode } from "react"

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
      <body className="flex min-h-screen bg-gray-200 p-4">
        <div className="flex flex-1 flex-col rounded-lg bg-white shadow-lg">{children}</div>
      </body>
    </html>
  )
}
