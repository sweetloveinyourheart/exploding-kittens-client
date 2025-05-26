import type { Metadata } from "next"
import { Geist, Geist_Mono, Londrina_Shadow, Londrina_Solid } from "next/font/google"
import { SessionProvider } from "next-auth/react"
import { Toaster } from "@/components/ui/sonner"

import "./globals.css"
import { GrpcProvider } from "@/contexts/GrpcProvider"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const londrinaShadow = Londrina_Shadow({
  weight: "400",
  variable: "--font-londrina-shadow",
  subsets: ["latin"],
})

const londrinaSolid = Londrina_Solid({
  weight: "400",
  variable: "--font-londrina-solid",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Exploding Kittens",
  description: "An online version of the Exploding Kittens card game",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${londrinaShadow.variable} ${londrinaSolid.variable} font-geist-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider>
            <GrpcProvider>
              {children}
              <Toaster />
            </GrpcProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
