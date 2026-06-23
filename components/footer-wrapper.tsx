"use client"
import dynamic from "next/dynamic"

const Footer = dynamic(() => import("@/components/footer"), {
  ssr: false,
})

const FooterWrapper = () => {
  return <Footer />
}

export default FooterWrapper
