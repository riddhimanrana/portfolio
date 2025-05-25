import type React from "react"
import type { Metadata } from "next"
import { Geist } from 'next/font/google'
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import NavBar from "@/components/navbar"
import { Toaster } from "@/components/toaster"
import FooterWrapper from "@/components/footer-wrapper"

const geist = Geist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Riddhiman Rana | Full Stack Developer & Competitive Programmer",
  description:
    "Hi, I'm Riddhiman Rana, a passionate full stack developer and competitive programmer. I'm a USACO Gold medalist and a freshman at Dougherty Valley High School, eager to explore the endless possibilities of technology.",
  keywords: ["Riddhiman Rana", "Web Developer", "Competitive Programmer", "USACO", "Portfolio", "Next.js", "React"],
  authors: [{ name: "Riddhiman Rana" }],
  creator: "Riddhiman Rana",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://riddhimanrana.com",
    title: "Riddhiman Rana | Full Stack Developer & Competitive Programmer",
    description: "Hi, I'm Riddhiman Rana, a passionate full stack developer and competitive programmer.",
    siteName: "Riddhiman Rana Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riddhiman Rana | Full Stack Developer & Competitive Programmer",
    description: "Hi, I'm Riddhiman Rana, a passionate full stack developer and competitive programmer.",
    creator: "@riddhimanrana",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NavBar />
          {children}
        </ThemeProvider>
        <Toaster />
        <FooterWrapper />
      </body>
    </html>
  )
}