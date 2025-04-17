import type React from "react";
import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Riddhiman Rana | Web Developer & Competitive Programmer",
  description:
    "Personal portfolio of Riddhiman Rana, a Web Developer and Competitive Programmer. USACO Gold Medalist and Freshman at Dougherty Valley High School.",
  keywords: ["Riddhiman Rana", "Web Developer", "Competitive Programmer", "USACO", "Portfolio", "Next.js", "React"],
  authors: [{ name: "Riddhiman Rana" }],
  creator: "Riddhiman Rana",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://riddhimanrana.com",
    title: "Riddhiman Rana | Web Developer & Competitive Programmer",
    description: "Personal portfolio of Riddhiman Rana, a Web Developer and Competitive Programmer",
    siteName: "Riddhiman Rana Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riddhiman Rana | Web Developer & Competitive Programmer",
    description: "Personal portfolio of Riddhiman Rana, a Web Developer and Competitive Programmer",
    creator: "@riddhimanrana",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NavBar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
