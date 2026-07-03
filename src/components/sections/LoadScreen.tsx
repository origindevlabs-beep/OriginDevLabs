"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const pageVariants = {
  hidden: { y: "100vh", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 1,
    },
  },
}

export default function LoadScreen({ children }: { children: React.ReactNode }) {
  // Use lazy initializer to check sessionStorage once
  const [isFirstVisit] = useState(() => {
    if (typeof window === "undefined") return true
    return sessionStorage.getItem("odl-loaded") !== "true"
  })

  const [showContent, setShowContent] = useState(!isFirstVisit)
  const hasMarked = useRef(false)

  useEffect(() => {
    if (!isFirstVisit) return

    const dismiss = () => {
      if (hasMarked.current) return
      hasMarked.current = true
      setTimeout(() => {
        sessionStorage.setItem("odl-loaded", "true")
        setShowContent(true)
      }, 300)
    }

    const timer = setTimeout(dismiss, 2500)
    const forceTimer = setTimeout(dismiss, 5000)

    return () => {
      clearTimeout(timer)
      clearTimeout(forceTimer)
    }
  }, [isFirstVisit])

  if (showContent) {
    return (
      <motion.div
        key="page"
        variants={pageVariants}
        initial={isFirstVisit ? "hidden" : false}
        animate="visible"
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="animate-logo-pulse">
        <img
          src="/logo-white.png"
          alt="ODL"
          className="h-[60px] w-auto brightness-0"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.style.display = "none"
            const parent = target.parentElement
            if (parent) {
              parent.innerHTML =
                '<span style="font-family: var(--font-heading), system-ui; font-size: 28px; font-weight: 700; letter-spacing: -0.02em; color: #111;">ODL</span>'
            }
          }}
        />
      </div>
    </motion.div>
  )
}