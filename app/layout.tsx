import type React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NavBar from "@/components/navbar";
import { Toaster } from "@/components/toaster";
import FooterWrapper from "@/components/footer-wrapper";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { PostHogProvider } from "@/components/PostHogProvider";
import Script from "next/script";

const overusedGrotesk = localFont({
  src: "../public/fonts/OverusedGrotesk-VF.woff2",
  variable: "--font-overused-grotesk",
  display: "swap",
});

const pixelta = localFont({
  src: "../public/fonts/Pixelta.ttf",
  variable: "--font-pixelta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Riddhiman Rana | Developer, Researcher & Founder",
  description:
    "Riddhiman Rana is a developer, researcher, and founder building thoughtful software at the intersection of product and real-world impact.",
  keywords: [
    "Riddhiman Rana",
    "Web Developer",
    "Competitive Programmer",
    "USACO",
    "Portfolio",
    "Next.js",
    "React",
  ],
  authors: [{ name: "Riddhiman Rana" }],
  creator: "Riddhiman Rana",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://riddhimanrana.com",
    title: "Riddhiman Rana | Full Stack Developer & Competitive Programmer",
    description:
      "Developer, researcher, and founder building thoughtful software with real-world impact.",
    siteName: "Riddhiman Rana Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Riddhiman Rana | Full Stack Developer & Competitive Programmer",
    description:
      "Developer, researcher, and founder building thoughtful software with real-world impact.",
    creator: "@riddhimanrana",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="r_ZlioncOUkRZdQRZ9V7xI0Y9eO6wxnqD5l5-JMeqoY"
        />
        {/* <meta name="p:domain_verify" content="e6f8733d4a51c0b42b10f26a628378b5"/> */}
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="me" href="https://mastodon.online/@rrcoder0167" /> */}
      </head>
      <body
        className={`bg-background font-sans text-foreground antialiased ${overusedGrotesk.variable} ${pixelta.variable}`}
      >
        <Script
          src="https://cdn.jsdelivr.net/npm/html2canvas-pro@2.1.1/dist/html2canvas-pro.min.js"
          strategy="afterInteractive"
        />
        <Script
          src="/scripts/liquidGL.js"
          strategy="afterInteractive"
        />
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen">
              <NavBar />
              <div className="flex-1">
                {children}
              </div>
              <FooterWrapper />
            </div>
            <SpeedInsights />
            <Toaster />
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
