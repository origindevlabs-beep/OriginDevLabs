"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const NAV_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Client Stories", href: "/testimonials" },
]

interface NavbarProps {
  ctaVisible?: boolean
  heroSectionRef?: React.RefObject<HTMLElement | null>
}

export default function Navbar({ ctaVisible = false, heroSectionRef }: NavbarProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const lastScrollY = useRef(0)
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const isVisibleRef = useRef(true)
  const pastThresholdRef = useRef(false)
  const ctaVisibleRef = useRef(ctaVisible)

  // Keep ctaVisible ref in sync with prop & cancel idle timer if CTA takes over
  useEffect(() => {
    ctaVisibleRef.current = ctaVisible
    // If CTA section becomes visible, cancel any pending show timer so navbar won't pop in
    if (ctaVisible && idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
      idleTimerRef.current = null
    }
  }, [ctaVisible])

  // Show navbar temporarily (3 seconds of idle), then auto-hide
  const showNavbarTemporarily = useCallback(() => {
    isVisibleRef.current = true
    setIsVisible(true)
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    idleTimerRef.current = setTimeout(() => {
      if (pastThresholdRef.current || ctaVisibleRef.current) {
        isVisibleRef.current = false
        setIsVisible(false)
      }
    }, 3000)
  }, [])

  // Force-hide the navbar immediately
  const forceHideNavbar = useCallback(() => {
    isVisibleRef.current = false
    setIsVisible(false)
    if (idleTimerRef.current) {
      clearTimeout(idleTimerRef.current)
      idleTimerRef.current = null
    }
  }, [])

  // ── Scroll listener: tidal lock + direction detection ──
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY

      // Hero 20% threshold for tidal lock
      const heroEl = heroSectionRef?.current
      const heroHeight = heroEl?.offsetHeight || window.innerHeight
      const heroThreshold = heroHeight * 0.2
      const isPastThreshold = scrollY >= heroThreshold

      pastThresholdRef.current = isPastThreshold

      if (!isPastThreshold) {
        // ── Tidal lock: navbar stays visible during first 20% of hero scroll ──
        if (!isVisibleRef.current) {
          isVisibleRef.current = true
          setIsVisible(true)
        }
        // Clear any pending auto-hide timer
        if (idleTimerRef.current) {
          clearTimeout(idleTimerRef.current)
          idleTimerRef.current = null
        }
      } else {
        // ── Past the tidal lock zone ──
        const direction = scrollY - lastScrollY.current

        if (direction > 0) {
          // Scrolling DOWN → hide (immediately)
          forceHideNavbar()
        } else if (direction < -5) {
          // Scrolling UP (with small dead-zone) → show unless CTA section visible
          if (ctaVisibleRef.current) {
            forceHideNavbar()
          } else {
            showNavbarTemporarily()
          }
        }
      }

      lastScrollY.current = scrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [heroSectionRef, showNavbarTemporarily, forceHideNavbar])

  // Lock body scroll when mobile menu is open
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

  // Cleanup idle timer on unmount
  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current)
    }
  }, [])

  return (
    <>
      {/* ── Navbar Pill ── */}
      <AnimatePresence>
        {isVisible && (
          <motion.nav
            key="navbar-pill"
            initial={{ y: -80, opacity: 0 }}
            suppressHydrationWarning
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className={`fixed top-5 left-0 right-0 mx-auto w-fit z-50 rounded-full px-2 py-1.5 flex items-center gap-1 border transition-colors duration-500 bg-white/80 border-white/40 shadow-lg shadow-black/5 backdrop-blur-xl max-w-[calc(100vw-1.5rem)]`}
          >
            {/* Logo + Name */}
            <Link href="/" className="flex items-center gap-1.5 md:gap-2 px-1.5 md:px-2 shrink-0">
              <img
                src="/odl-logo.png"
                alt="Origin Dev Labs"
                className="h-6 w-auto"
              />
              <span
                className="hidden md:inline text-sm font-semibold tracking-tight text-gray-900"
                style={{ fontFamily: "var(--font-heading), system-ui" }}
              >
                Origin Dev Labs
              </span>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-0.5">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium rounded-full text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Pulsating CTA Button */}
            <Link
              href="/get-started"
              className="hidden md:inline-flex animate-cta-pulse px-5 py-2 bg-gray-900 text-white text-sm font-medium rounded-full"
            >
              Get Started
            </Link>

            {/* Mobile Hamburger Button — liquid glass casing */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 backdrop-blur-lg bg-gray-100/70 border border-gray-300/40 shadow-[0_2px_12px_rgba(0,0,0,0.12)] hover:bg-gray-200/70 hover:shadow-[0_4px_16px_rgba(0,0,0,0.16)] active:scale-95"
              aria-label="Open menu"
              suppressHydrationWarning
            >
              <Menu className="w-[18px] h-[18px] text-gray-700" />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* ── Mobile Fullscreen Overlay ── */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-menu-overlay"
            className="fixed inset-0 z-[60] bg-[#0A0A0A]/98 backdrop-blur-[30px] flex flex-col"
            initial={{ opacity: 0 }}
            suppressHydrationWarning
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            {/* Close (X) Button — top-right */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsMobileOpen(false)}
                className="w-12 h-12 flex items-center justify-center rounded-full border border-white/20 hover:bg-white/10 transition-colors"
                aria-label="Close menu"
                suppressHydrationWarning
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Centered Navigation Links with staggered reveal */}
            <nav className="flex-1 flex flex-col items-center justify-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  suppressHydrationWarning
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.1 + i * 0.08,
                    duration: 0.4,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-3xl font-semibold text-white hover:text-gray-400 transition-colors"
                    style={{ fontFamily: "var(--font-heading), system-ui" }}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                suppressHydrationWarning
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.35,
                  duration: 0.4,
                  ease: [0.32, 0.72, 0, 1],
                }}
              >
                <Link
                  href="/get-started"
                  onClick={() => setIsMobileOpen(false)}
                  className="mt-6 px-8 py-3.5 bg-white text-gray-900 text-base font-medium rounded-full hover:bg-gray-100 transition-colors"
                >
                  Get Started
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}