import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import Navbar from "@/components/Navbar";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Providers } from "@/components/Providers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
// Cloudflare Pages Edge Runtime
export const runtime = "edge";

const inter = Inter({ subsets: ["latin"] });

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
            src="https://analytics.is-a.dev/js/scri7:51 PMpt.js"
          />
        </head>
        <body className={`macchiato text-text bg-base ${inter.className}`}>
          <Navbar />
          <Providers>{children}</Providers>
          <Analytics />
          <SpeedInsights />
          <button className="fixed bottom-4 right-4 w-10 h-10 rounded-md bg-surface0 hover:bg-surface1 transition ease-in-out duration-300 text-text text-lg">
            <FontAwesomeIcon icon={faSun} />
          </button>
        </body>
      </html>
    </>
  );
}
