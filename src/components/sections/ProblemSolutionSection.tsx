"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { useScroll, useTransform, useMotionValueEvent } from "motion/react"
import CircuitryBackground from "@/components/CircuitryBackground"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const PROBLEMS = [
  { text: "Manual data entry 20+ hrs/week" },
  { text: "Leads going cold" },
  { text: "Friday reports" },
  { text: "Human errors" },
]

const SOLUTIONS = [
  { text: "Automated workflows 24/7" },
  { text: "Leads captured in 5 min" },
  { text: "Real-time dashboards" },
  { text: "Zero-error systems" },
]

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function ProblemSolutionSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)

  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 })
  const mousePosRef = useRef({ x: 0.5, y: 0.5 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = stickyRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    const clamped = { x: Math.max(0, Math.min(1, nx)), y: Math.max(0, Math.min(1, ny)) }
    mousePosRef.current = clamped
    setMousePos(clamped)
  }, [])

  useEffect(() => {
    const el = stickyRef.current
    if (!el) return
    el.addEventListener("mousemove", handleMouseMove)
    return () => el.removeEventListener("mousemove", handleMouseMove)
  }, [handleMouseMove])

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end start"],
  })

  /* 0→1 over the scroll range, clamped at 85% so ODL Way is fully visible before release */
  const rawProgress = useTransform(scrollYProgress, [0, 0.85], [0, 1])

  const [progress, setProgress] = useState(0)

  useMotionValueEvent(rawProgress, "change", (v) => {
    setProgress(Math.max(0, Math.min(1, v)))
  })

  /* Phase calculations */
  // 0–0.4: Old Way visible
  // 0.4–0.6: Crossfade
  // 0.6–1.0: ODL Way visible (must be fully shown before scroll releases)
  const oldWayOpacity = progress < 0.4 ? 1 : progress < 0.6 ? 1 - (progress - 0.4) / 0.2 : 0
  const odlWayOpacity = progress < 0.4 ? 0 : progress < 0.6 ? (progress - 0.4) / 0.2 : 1
  const oldWayY = progress < 0.4 ? 0 : progress < 0.6 ? (progress - 0.4) / 0.2 * -20 : -20
  const odlWayY = progress < 0.4 ? 20 : progress < 0.6 ? 20 - (progress - 0.4) / 0.2 * 20 : 0

  /* Staggered item reveals for Old Way */
  const oldItemOpacities = PROBLEMS.map((_, i) => {
    if (progress >= 0.4) return oldWayOpacity
    const threshold = 0.02 + i * 0.05
    return Math.min(1, Math.max(0, (progress - threshold) / 0.08))
  })

  /* Staggered item reveals for ODL Way */
  const odlItemOpacities = SOLUTIONS.map((_, i) => {
    if (progress < 0.55) return 0
    const threshold = 0.58 + i * 0.05
    return Math.min(1, Math.max(0, (progress - threshold) / 0.08))
  })

  return (
    <div ref={outerRef} id="problem-solution" className="relative min-h-[300vh]">
      <div
        ref={stickyRef}
        className="h-screen sticky top-0 w-full overflow-hidden bg-white"
      >
        {/* Hero-style Circuitry Background — reactive to mouse hover */}
        <CircuitryBackground mousePosition={mousePos} mode="dark" opacity={0.5} />

        {/* Content Layer */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
          {/* Card Container — relative panel gives height, absolute panel overlays */}
          <div className="relative w-full max-w-2xl rounded-3xl border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden">
            {/* THE OLD WAY — relative (defines card height) */}
            <div
              className="relative p-8 md:p-12"
              style={{
                opacity: oldWayOpacity,
                transform: `translateY(${oldWayY}px)`,
                transition: "opacity 0.15s ease, transform 0.15s ease",
              }}
            >
              <h3
                className="text-xs font-mono font-bold text-gray-400 tracking-widest uppercase mb-8"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                The Old Way
              </h3>
              <div className="space-y-5">
                {PROBLEMS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3"
                    style={{
                      opacity: oldItemOpacities[i],
                      transform: `translateX(${(1 - oldItemOpacities[i]) * -15}px)`,
                      transition: "opacity 0.2s ease, transform 0.2s ease",
                    }}
                  >
                    <span className="mt-2 w-2 h-2 rounded-full bg-gray-300 shrink-0" />
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* THE ODL WAY — absolute overlay with solid bg to cover Old Way */}
            <div
              className="absolute inset-0 p-8 md:p-12 flex flex-col justify-center bg-white/95"
              style={{
                opacity: odlWayOpacity,
                transform: `translateY(${odlWayY}px)`,
                transition: "opacity 0.15s ease, transform 0.15s ease",
              }}
            >
              <h3
                className="text-xs font-mono font-bold text-gray-900 tracking-widest uppercase mb-8"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                The ODL Way
              </h3>
              <div className="space-y-5">
                {SOLUTIONS.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3"
                    style={{
                      opacity: odlItemOpacities[i],
                      transform: `translateX(${(1 - odlItemOpacities[i]) * 15}px)`,
                      transition: "opacity 0.2s ease, transform 0.2s ease",
                    }}
                  >
                    <span className="mt-2 w-2 h-2 rounded-full bg-gray-900 shrink-0" />
                    <p className="text-gray-900 text-sm md:text-base leading-relaxed font-medium">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}