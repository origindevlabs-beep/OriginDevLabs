"use client"

import { useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "motion/react"
import CircuitryBackground from "@/components/CircuitryBackground"
import { useMousePosition } from "@/lib/use-mouse-position"

function AnimatedWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ")
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: i * 0.04,
            ease: [0.23, 1, 0.32, 1],
          }}
          viewport={{ once: true }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </span>
  )
}

function RevealParagraph({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.p
      ref={ref}
      className={className}
      initial={{ x: -60, opacity: 0, filter: "blur(8px)" }}
      animate={isInView ? { x: 0, opacity: 1, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </motion.p>
  )
}

const CORE_VALUES = [
  {
    title: "Practical Over Theoretical",
    description: "If a system needs a manual to operate, it's not finished yet.",
  },
  {
    title: "Results You Can Measure",
    description: "Automation should pay for itself — in hours saved, errors avoided, or revenue gained.",
  },
  {
    title: "Systems Thinking",
    description: "We don't build features. We build systems that work together.",
  },
  {
    title: "Honest Communication",
    description: "We don't oversell. We tell you what's possible and deliver it.",
  },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null)
  const mousePosition = useMousePosition(heroRef)
  const visionRef = useRef<HTMLDivElement>(null)
  const visionInView = useInView(visionRef, { once: true, margin: "-100px" })
  const visionText = "We're building toward a world where every small business has access to the same operational technology that Fortune 500 companies take for granted — automation that works quietly in the background, making businesses faster, leaner, and more profitable without adding complexity."

  return (
    <main>
      {/* ── Page Hero ── */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center bg-white overflow-hidden">
        <CircuitryBackground mousePosition={mousePosition} />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.span
            className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium tracking-wider uppercase rounded-full mb-6 border border-gray-200"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            About ODL
          </motion.span>
          <h1
            className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <AnimatedWords text="We Build Systems That Remove Busywork" />
          </h1>
          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            Origin Dev Labs exists because most businesses know automation is possible but can&apos;t figure out how to actually get it working.
          </motion.p>
        </div>
      </section>

      {/* ── Origin Story ── */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-12"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            Why We Exist
          </motion.h2>

          <RevealParagraph className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
            We build automation systems that remove busywork from businesses — so people spend their time on work that actually matters.
          </RevealParagraph>
          <RevealParagraph className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
            Most businesses know they could be more efficient. They&apos;ve heard about automation, maybe even tried a tool or two. But the gap between &ldquo;knowing&rdquo; and &ldquo;actually working&rdquo; is where most companies get stuck. That&apos;s the gap we close.
          </RevealParagraph>
          <RevealParagraph className="text-gray-600 text-base md:text-lg leading-relaxed">
            Every system we ship is designed to save hours, cut costs, and scale without adding headcount. We don&apos;t build tech for the sake of tech — we build it because your time is worth more than repetitive tasks.
          </RevealParagraph>
        </div>
      </section>

      {/* ── Team Photo ── */}
      <section className="px-4 max-w-6xl mx-auto">
        <motion.div
          className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg"
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Image
            src="/images/team-collaboration.jpg"
            alt="The Origin Dev Labs team collaborating on a project"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1152px"
            priority={false}
          />
          {/* Subtle gradient overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </motion.div>
      </section>

      {/* ── Core Values ── */}
      <section className="py-24 md:py-32 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-12 text-center"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            What We Stand For
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CORE_VALUES.map((value, i) => (
              <motion.div
                key={value.title}
                className="bg-white border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm"
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                viewport={{ once: true }}
              >
                <h3
                  className="text-xl font-semibold text-gray-900 mb-3 tracking-tight"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vision Section ── */}
      <section className="py-24 md:py-32 bg-[#0a0a0a] text-white px-4">
        <div className="max-w-3xl mx-auto text-center" ref={visionRef}>
          <motion.h2
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-12"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            Where We&apos;re Headed
          </motion.h2>

          <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
            {visionText.split(" ").map((word, i) => (
              <motion.span
                key={i}
                className="inline-block"
                initial={{ opacity: 0 }}
                animate={visionInView ? { opacity: 1 } : {}}
                transition={{
                  duration: 0.3,
                  delay: i * 0.025,
                }}
              >
                {word}
                {i < visionText.split(" ").length - 1 && "\u00A0"}
              </motion.span>
            ))}
          </p>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-24 md:py-32 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-8"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            Want to Work With Us?
          </motion.h2>
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 20,
              delay: 0.2,
            }}
            viewport={{ once: true }}
          >
            <Link
              href="/get-started"
              className="animate-cta-pulse inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              Get Started <span className="text-base">→</span>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}