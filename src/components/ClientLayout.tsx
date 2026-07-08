"use client"

import { useSyncExternalStore } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "motion/react"
import Navbar from "@/components/sections/Navbar"
import FooterSection from "@/components/sections/FooterSection"
import { LenisProvider } from "@/lib/lenis-context"

const emptySubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const mounted = useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot)

  return (
    <LenisProvider>
      {!isHome && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={mounted ? { opacity: 0, y: 30 } : false}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      {!isHome && <FooterSection />}
    </LenisProvider>
  )
}