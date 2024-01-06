import type { Metadata } from 'next'
import { Rubik } from 'next/font/google'

import './globals.css'
import Navbar from '@/components/Navbar'
import '@fortawesome/fontawesome-svg-core/styles.css'

const rubik = Rubik({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Riddhiman Rana - Developer Portfolio',
  description: 'My name is Riddhiman Rana and I am a full stack developer. Find out more about me and my projects.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <html lang="en">
    <head>
        <script defer data-domain="rrcoder0167.is-a.dev" src="https://analytics.is-a.dev/js/script.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/@catppuccin/palette/css/catppuccin.css" />
    </head>
    <body className={rubik.className}>
    <Navbar />
      {children}
    </body>
     </html>
</>
  )
}