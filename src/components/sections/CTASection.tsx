"use client"

import { useRef, useEffect, useCallback } from "react"
import { motion, useInView } from "motion/react"

interface CTASectionProps {
  onVisibilityChange?: (visible: boolean) => void
}

export default function CTASection({ onVisibilityChange }: CTASectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

  /* ------------------------------------------------------------------ */
  /*  IntersectionObserver — fires when the section is centred in the   */
  /*  viewport (rootMargin narrows the trigger zone to the middle 20 %) */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const el = sectionRef.current
    if (!el || !onVisibilityChange) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        onVisibilityChange(entry.isIntersecting)
      },
      {
        // Only the middle 20 % of the viewport counts as "centred"
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [onVisibilityChange])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white py-24 md:py-32 overflow-hidden"
      aria-label="Call to action"
    >
      <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
        {/* ---- Headline — scales up from 0.9 → 1.0 with opacity ---- */}
        <motion.h2
          className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          suppressHydrationWarning
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          Done Losing Hours to Busywork?
        </motion.h2>

        {/* ---- Body — slides up with blur-to-clear ---- */}
        <motion.p
          className="text-base md:text-lg text-gray-600 leading-relaxed mb-10 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          suppressHydrationWarning
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.32, 0.72, 0, 1],
          }}
        >
          Tell us what&apos;s slowing you down. We&apos;ll map out how
          automation can fix it — and show you exactly what the system would
          look like.
        </motion.p>

        {/* ---- CTA Button — bounces in from bottom (spring) + pulse ---- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          suppressHydrationWarning
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.3,
          }}
        >
          <a
            href="/get-started"
            className="animate-cta-pulse inline-flex items-center gap-2 bg-gray-900 text-white text-base font-medium rounded-full px-10 py-4 hover:bg-gray-800 transition-colors duration-300 hover:scale-105 hover:shadow-lg hover:shadow-black/20"
          >
            Get Started Today&nbsp;→
          </a>
        </motion.div>

        {/* ---- Subtext — fades in last ---- */}
        <motion.p
          className="mt-8 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          suppressHydrationWarning
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Free consultation. No commitment. Response within 24 hours.
        </motion.p>
      </div>
    </section>
  )
}