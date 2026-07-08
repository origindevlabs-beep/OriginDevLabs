"use client"

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react"
import { motion, AnimatePresence } from "motion/react"

const FULL_TEXT = "Origin Dev Labs"
const CHAR_DELAY = 80 // ms per character
const PAUSE_AFTER_TYPE = 600 // ms pause after typewriter finishes
const FORCE_DISMISS = 5000 // max 5s

type Phase = "pulse" | "shift" | "typewriter" | "done"

/* ── Hydration-safe "mounted" detection ── */
const emptySubscribe = () => () => {}

/**
 * LoadScreen — wraps page content and optionally shows a branded loading
 * animation on the user's very first visit.
 *
 * HYDRATION-SAFE DESIGN:
 * - Server + initial client render: always renders children directly
 *   (no motion wrappers, no conditional branches based on sessionStorage).
 * - useSyncExternalStore detects client mount and reads sessionStorage
 *   without setState-in-effect.
 * - On first visit: a full-screen overlay fades IN on top of the children.
 * - When animation finishes, overlay fades OUT — zero DOM mismatch.
 */
export default function LoadScreen({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,  // client
    () => false  // server
  )

  const isFirstVisit = useSyncExternalStore(
    emptySubscribe,
    () => sessionStorage.getItem("odl-loaded") !== "true",  // client
    () => true  // server: assume first visit
  )

  // showOverlay is true only when mounted AND first visit
  const showOverlay = mounted && isFirstVisit

  const [overlayPhase, setOverlayPhase] = useState<Phase>("pulse")
  const [charIndex, setCharIndex] = useState(0)
  const [overlayVisible, setOverlayVisible] = useState(true)
  const dismissed = useRef(false)

  const dismiss = useCallback(() => {
    if (dismissed.current) return
    dismissed.current = true
    sessionStorage.setItem("odl-loaded", "true")
    setOverlayVisible(false)
  }, [])

  // Phase orchestration (only runs when overlay is active)
  useEffect(() => {
    if (!showOverlay) return

    const pulseTimer = setTimeout(() => setOverlayPhase("shift"), 1000)
    const typeTimer = setTimeout(() => setOverlayPhase("typewriter"), 1400)
    const forceTimer = setTimeout(dismiss, FORCE_DISMISS)

    return () => {
      clearTimeout(pulseTimer)
      clearTimeout(typeTimer)
      clearTimeout(forceTimer)
    }
  }, [showOverlay, dismiss])

  // Typewriter effect (setState inside setTimeout callback — OK per lint rule)
  useEffect(() => {
    if (overlayPhase !== "typewriter") return

    if (charIndex < FULL_TEXT.length) {
      const timer = setTimeout(() => setCharIndex((i) => i + 1), CHAR_DELAY)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(dismiss, PAUSE_AFTER_TYPE)
      return () => clearTimeout(timer)
    }
  }, [overlayPhase, charIndex, dismiss])

  // ── Server + pre-mount client: render children directly ──
  if (!mounted || !showOverlay) {
    return <>{children}</>
  }

  // ── After mount, first visit: children (hidden) + overlay on top ──
  return (
    <>
      <div style={{ visibility: overlayVisible ? "hidden" : "visible" }}>
        {children}
      </div>

      <AnimatePresence>
        {overlayVisible && (
          <motion.div
            key="load-overlay"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            <div className="flex items-center gap-4">
              {/* Logo */}
              <motion.img
                src="/odl-logo.png"
                alt="ODL"
                className="h-16 w-auto"
                suppressHydrationWarning
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{
                  scale:
                    overlayPhase === "pulse"
                      ? [0.8, 1.08, 0.96, 1]
                      : 1,
                  opacity: 1,
                  x:
                    overlayPhase === "pulse"
                      ? 0
                      : (overlayPhase === "shift" ||
                          overlayPhase === "typewriter" ||
                          overlayPhase === "done")
                        ? -48
                        : 0,
                }}
                transition={
                  overlayPhase === "pulse"
                    ? { duration: 1, ease: "easeOut", times: [0, 0.35, 0.65, 1] }
                    : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                }
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = "none"
                  const parent = target.parentElement
                  if (parent) {
                    const span = document.createElement("span")
                    span.textContent = "ODL"
                    span.style.cssText =
                      "font-family: var(--font-heading), system-ui; font-size: 36px; font-weight: 700; letter-spacing: -0.02em; color: #111;"
                    parent.insertBefore(span, target)
                  }
                }}
              />

              {/* Typewriter text */}
              <motion.div
                className="overflow-hidden"
                suppressHydrationWarning
                initial={{ opacity: 0, x: 10 }}
                animate={{
                  opacity:
                    overlayPhase === "typewriter" || overlayPhase === "done"
                      ? 1
                      : 0,
                  x:
                    overlayPhase === "typewriter" || overlayPhase === "done"
                      ? 0
                      : 10,
                }}
                transition={{ duration: 0.3, delay: 0.1 }}
                aria-live="polite"
              >
                <span
                  className="text-2xl md:text-3xl font-bold tracking-tight"
                  style={{ fontFamily: "var(--font-heading), system-ui" }}
                >
                  {FULL_TEXT.slice(0, charIndex)}
                </span>
                {overlayPhase === "typewriter" && (
                  <span
                    className="inline-block w-[2px] h-[1.1em] bg-black ml-0.5 align-text-bottom animate-blink-cursor"
                    aria-hidden="true"
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}