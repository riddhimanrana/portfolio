"use client"
import dynamic from "next/dynamic"
import { usePathname } from "next/navigation"

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false,
})

const FooterWrapper = () => {
  const pathname = usePathname()
  if (pathname === "/") return null
  return <Footer />
}

export default FooterWrapper
