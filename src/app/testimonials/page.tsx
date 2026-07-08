"use client"

import Link from "next/link"
import { motion, useInView } from "motion/react"
import { Star, ArrowRight } from "lucide-react"
import { TESTIMONIALS } from "@/lib/testimonials-data"
import { useRef } from "react"
import CircuitryBackground from "@/components/CircuitryBackground"
import { useMousePosition } from "@/lib/use-mouse-position"

function ReviewStars({ rating }: { rating: number }) {
  const filled = Math.floor(rating)
  const hasHalf = rating - filled >= 0.5
  const empty = 5 - filled - (hasHalf ? 1 : 0)
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(filled)].map((_, i) => (
        <Star key={`f-${i}`} className="w-3.5 h-3.5 fill-white text-white" />
      ))}
      {hasHalf && (
        <div className="relative w-3.5 h-3.5">
          <Star className="absolute w-3.5 h-3.5 text-white/30" />
          <div className="absolute overflow-hidden w-1/2">
            <Star className="w-3.5 h-3.5 fill-white text-white" />
          </div>
        </div>
      )}
      {[...Array(empty)].map((_, i) => (
        <Star key={`e-${i}`} className="w-3.5 h-3.5 text-white/30" />
      ))}
    </div>
  )
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: { id: number; name: string; role: string; company: string; rating: number; quote: string }
  index: number
}) {
  return (
    <motion.div
      className="bg-white rounded-2xl border border-gray-200/60 p-6 shadow-sm flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: (index % 12) * 0.05,
        ease: [0.23, 1, 0.32, 1],
      }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex-1 mb-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">{testimonial.name}</p>
          <p className="text-xs text-gray-500 mt-0.5">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
        <ReviewStars rating={testimonial.rating} />
      </div>
    </motion.div>
  )
}

export default function TestimonialsPage() {
  const heroRef = useRef<HTMLElement>(null)
  const mousePosition = useMousePosition(heroRef)
  const gridRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(gridRef, { once: true, margin: "-50px" })

  return (
    <main>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[60vh] flex items-center justify-center bg-white overflow-hidden">
        <CircuitryBackground mousePosition={mousePosition} />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <motion.span
            className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium tracking-wider uppercase rounded-full mb-6 border border-gray-200"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          >
            Client Stories
          </motion.span>
          <h1
            className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            What Our Clients Say
          </h1>
          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            Every testimonial represents a business that stopped doing things manually.
          </motion.p>
        </div>
      </section>

      {/* ── Aggregate Rating ── */}
      <section className="py-12 text-center">
        <motion.div
          className="flex flex-col items-center gap-3 max-w-md mx-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-gray-900 text-gray-900" />
            ))}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>4.8</span>
            <span className="text-lg text-gray-500">/ 5.0</span>
          </div>
          <p className="text-sm text-gray-500">Based on 50+ client projects</p>
        </motion.div>
      </section>

      {/* ── Testimonial Grid ── */}
      <section className="py-16 px-4">
        <div
          ref={gridRef}
          className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-[#FAFAF8] text-center px-4">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-8"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            Start Your Success Story
          </motion.h2>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="/get-started"
              className="animate-cta-pulse inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  )
}