import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Pavo - Flaunt Your Academic Feathers",
  description:
    "Academic guidance platform helping Class 10/12 students make informed career decisions with course recommendations, career pathways, and scholarship opportunities.",
  generator: "v0.app",
  keywords: [
    "academic guidance",
    "career counseling",
    "student guidance",
    "college admission",
    "scholarships",
    "career pathways",
  ],
  authors: [{ name: "Pavo Team" }],
  viewport: "width=device-width, initial-scale=1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
