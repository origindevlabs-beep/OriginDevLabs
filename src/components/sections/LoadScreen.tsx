"use client"

import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react"
import { motion, AnimatePresence } from "motion/react"

const FULL_TEXT = "Origin Dev Labs"
const CHAR_DELAY = 80
const PAUSE_AFTER_TYPE = 600
const FORCE_DISMISS = 5000

type Phase = "pulse" | "shift" | "typewriter" | "done"

const emptySubscribe = () => () => {}

/**
 * LoadScreen — wraps page content and shows a branded loading
 * animation on the user's very first visit.
 *
 * OPTIMIZED: During the overlay, children are NOT mounted, freeing CPU
 * for the loading animation. Children mount after overlay fades out.
 *
 * HYDRATION-SAFE: Server + initial client render always renders children
 * directly (no motion wrappers, no conditional branches on sessionStorage).
 */
export default function LoadScreen({ children }: { children: React.ReactNode }) {
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )

  const isFirstVisit = useSyncExternalStore(
    emptySubscribe,
    () => sessionStorage.getItem("odl-loaded") !== "true",
    () => true
  )

  const showOverlay = mounted && isFirstVisit

  const [overlayPhase, setOverlayPhase] = useState<Phase>("pulse")
  const [charIndex, setCharIndex] = useState(0)
  const [overlayVisible, setOverlayVisible] = useState(true)
  const [childrenVisible, setChildrenVisible] = useState(false)
  const dismissed = useRef(false)

  const dismiss = useCallback(() => {
    if (dismissed.current) return
    dismissed.current = true
    sessionStorage.setItem("odl-loaded", "true")
    setOverlayVisible(false)
    // Mount children AFTER overlay starts fading
    requestAnimationFrame(() => setChildrenVisible(true))
  }, [])

  // Phase orchestration
  useEffect(() => {
    if (!showOverlay) {
      // Use rAF to avoid setState-in-effect warning
      const id = requestAnimationFrame(() => setChildrenVisible(true))
      return () => cancelAnimationFrame(id)
    }

    const pulseTimer = setTimeout(() => setOverlayPhase("shift"), 1000)
    const typeTimer = setTimeout(() => setOverlayPhase("typewriter"), 1400)
    const forceTimer = setTimeout(dismiss, FORCE_DISMISS)

    return () => {
      clearTimeout(pulseTimer)
      clearTimeout(typeTimer)
      clearTimeout(forceTimer)
    }
  }, [showOverlay, dismiss])

  // Typewriter effect
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

  // Server + pre-mount: children render directly
  // Returning visit: children render directly
  // First visit + overlay active: only overlay (children mount after dismiss)
  // First visit + overlay dismissed: children only
  if (!mounted || !showOverlay) {
    return <>{children}</>
  }

  return (
    <>
      {childrenVisible && (
        <>{children}</>
      )}

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