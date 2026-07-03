"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

const PROBLEMS = [
  { text: "Manual data entry eating 20+ hours every week" },
  { text: "Leads going cold because no one followed up fast enough" },
  { text: "Friday afternoons spent compiling reports" },
  { text: "Costly human errors in invoicing and scheduling" },
]

const SOLUTIONS = [
  { text: "Automated workflows that run around the clock" },
  { text: "Every lead captured, qualified, and routed in under five minutes" },
  { text: "Real-time dashboards that update themselves" },
  { text: "Zero-error systems built to catch what humans miss" },
]

export default function ProblemSolutionSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const overlayWidth = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "100%"])
  const solutionOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white min-h-screen py-24 md:py-32 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-16">
          <motion.span
            className="inline-block px-4 py-1.5 bg-gray-50 text-gray-600 text-xs font-medium tracking-wider uppercase rounded-full mb-6 border border-gray-100"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The Difference
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            Before & After ODL
          </motion.h2>
        </div>

        {/* Comparison Container */}
        <div className="relative rounded-3xl border border-gray-100 overflow-hidden min-h-[500px]">
          {/* Problem Layer (base) */}
          <div className="relative p-8 md:p-12">
            <div className="mb-8">
              <h3
                className="text-xs font-mono font-bold text-gray-400 tracking-widest uppercase mb-6"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                The Old Way
              </h3>
              <div className="space-y-4">
                {PROBLEMS.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-300 shrink-0" />
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Solution Layer (overlay) */}
          <motion.div
            className="absolute inset-0 bg-white z-10 p-8 md:p-12 flex flex-col justify-center"
            style={{ width: overlayWidth }}
          >
            <motion.div style={{ opacity: solutionOpacity }}>
              <h3
                className="text-xs font-mono font-bold text-gray-900 tracking-widest uppercase mb-6"
                style={{ fontFamily: "var(--font-mono), monospace" }}
              >
                The ODL Way
              </h3>
              <div className="space-y-4">
                {SOLUTIONS.map((item, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                  >
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-900 shrink-0" />
                    <p className="text-gray-900 text-sm md:text-base leading-relaxed font-medium">
                      {item.text}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}