"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, X } from "lucide-react"

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Client Stories", href: "/testimonials" },
  { label: "Get Started", href: "/get-started" },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileOpen])

  return (
    <>
      {/* Desktop/Mobile Pill */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 shadow-lg shadow-black/5"
            : "bg-white/60"
        } backdrop-blur-xl border border-white/20 rounded-full px-2 py-2 flex items-center gap-1`}
      >
        {/* Logo */}
        <a
          href="/"
          className="flex items-center px-3 shrink-0"
        >
          <img
            src="/logo-white.png"
            alt="Origin Dev Labs"
            className="h-7 w-auto brightness-0 invert-0"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.style.display = "none"
              const parent = target.parentElement
              if (parent) {
                const span = document.createElement("span")
                span.textContent = "ODL"
                span.className = "text-sm font-bold tracking-tight text-gray-900"
                parent.appendChild(span)
              }
            }}
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-full"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="/get-started"
          className="hidden md:inline-flex px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors ml-2"
        >
          Get Started
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-full"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
        >
          {isMobileOpen ? (
            <X className="w-4 h-4" />
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span className="text-sm font-medium">Menu</span>
            </>
          )}
        </button>
      </motion.nav>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-menu"
            className="fixed inset-0 z-[60] bg-[#0A0A0A]/98 backdrop-blur-30 flex flex-col items-center justify-center"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 52px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 52px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 52px)" }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-2xl md:text-3xl font-semibold text-white hover:text-gray-400 transition-colors"
                  style={{ fontFamily: "var(--font-heading), system-ui" }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/get-started"
                onClick={() => setIsMobileOpen(false)}
                className="mt-4 px-8 py-3.5 bg-white text-gray-900 text-base font-medium rounded-full hover:bg-gray-100 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              >
                Get Started
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}