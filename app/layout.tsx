import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";

// Cloudflare Pages Edge Runtime
export const runtime = "edge";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Riddhiman Rana - Developer Portfolio",
  description:
    "My name is Riddhiman Rana and I am a full stack developer. Find out more about me and my projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://unpkg.com/@catppuccin/palette/css/catppuccin.css"
          />
          <script
            defer
            data-domain="rrcoder0167.is-a.dev"
            src="https://analytics.is-a.dev/js/script.js"
          />
        </head>
        <body className={rubik.className}>
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </>
  );
}
