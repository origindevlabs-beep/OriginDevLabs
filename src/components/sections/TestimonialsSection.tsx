"use client"

import React, { useState, useEffect, useRef } from "react"
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
} from "motion/react"
import { cn } from "@/lib/utils"
import { Star, ChevronDown } from "lucide-react"
import { TESTIMONIALS } from "@/lib/testimonials-data"

/* ────────────────────────────────────────────
   Review Stars
   ──────────────────────────────────────────── */
function ReviewStars({
  rating,
  maxRating = 5,
  className,
}: {
  rating: number
  maxRating?: number
  className?: string
}) {
  const filledStars = Math.floor(rating)
  const fractionalPart = rating - filledStars
  const emptyStars =
    maxRating - filledStars - (fractionalPart > 0 ? 1 : 0)

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {[...Array(filledStars)].map((_, i) => (
          <Star
            key={`f-${i}`}
            className="size-3.5 fill-gray-900 text-gray-900"
          />
        ))}
        {fractionalPart > 0 && (
          <div className="relative size-3.5">
            <Star className="absolute size-3.5 text-gray-300" />
            <div
              className="absolute overflow-hidden"
              style={{ width: `${fractionalPart * 100}%` }}
            >
              <Star className="size-3.5 fill-gray-900 text-gray-900" />
            </div>
          </div>
        )}
        {[...Array(emptyStars)].map((_, i) => (
          <Star key={`e-${i}`} className="size-3.5 text-gray-300" />
        ))}
      </div>
      <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}

/* ────────────────────────────────────────────
   Animated Card (peels away on scroll)
   ──────────────────────────────────────────── */
function AnimatedCard({
  testimonial,
  index,
  totalCount,
  scrollYProgress,
}: {
  testimonial: {
    id: number
    name: string
    role: string
    company: string
    rating: number
    quote: string
  }
  index: number
  totalCount: number
  scrollYProgress: MotionValue<number>
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  // Each card peels during a 10% slice of total scroll progress
  // Card 0: 0.06–0.16, Card 1: 0.16–0.26, … Card 7: 0.76–0.86
  const cardStart = 0.06 + index * 0.10
  const cardEnd = cardStart + 0.10

  // Eased 6-point ranges: clamp → ease-in peel → clamp
  const y = useTransform(
    scrollYProgress,
    [0, cardStart, cardStart + 0.03, cardStart + 0.07, cardEnd, 1],
    [0, 0, -40, -220, -300, -300],
  )
  const rotate = useTransform(
    scrollYProgress,
    [0, cardStart, cardStart + 0.03, cardStart + 0.07, cardEnd, 1],
    [0, 0, -4, -20, -28, -28],
  )
  const scale = useTransform(
    scrollYProgress,
    [0, cardStart, cardStart + 0.04, cardEnd, 1],
    [1, 1, 0.98, 0.88, 0.88],
  )

  // Shadow grows as card peels
  const shadowBlur = useTransform(
    scrollYProgress,
    [0, cardStart, cardEnd, 1],
    [4, 4, 32, 32],
  )
  const shadowY = useTransform(
    scrollYProgress,
    [0, cardStart, cardEnd, 1],
    [2, 2, 20, 20],
  )
  const boxShadow = useMotionTemplate`0 ${shadowY}px ${shadowBlur}px -4px rgba(0,0,0,0.1), 0 ${shadowY}px ${shadowBlur}px -2px rgba(0,0,0,0.06)`

  // Opacity — MUST use useMotionValueEvent (motion v12 bug:
  // useTransform for opacity in style prop doesn't update DOM
  // when driven by useScroll)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!cardRef.current) return
    if (latest < cardStart) {
      cardRef.current.style.opacity = "1"
    } else if (latest < cardEnd) {
      const t = (latest - cardStart) / (cardEnd - cardStart)
      cardRef.current.style.opacity = String(1 - t * t) // quadratic ease-out
    } else {
      cardRef.current.style.opacity = "0"
    }
  })

  const transform = useMotionTemplate`translateY(${y}px) rotate(${rotate}deg) scale(${scale})`

  return (
    <motion.div
      ref={cardRef}
      style={{
        transform,
        boxShadow,
        zIndex: totalCount - index,
      }}
      className="absolute inset-0 flex flex-col justify-between gap-4 rounded-2xl border border-gray-200/60 bg-white p-5 md:p-7 backface-hidden will-change-transform"
    >
      {/* Quote */}
      <div className="flex-1 flex items-center">
        <p className="text-sm md:text-[15px] text-gray-700 leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-gray-900">
            {testimonial.name}
          </p>
          <p className="text-xs text-gray-500 mt-0.5">
            {testimonial.role}, {testimonial.company}
          </p>
        </div>
        <ReviewStars rating={testimonial.rating} />
      </div>
    </motion.div>
  )
}

/* ────────────────────────────────────────────
   Main Section
   ──────────────────────────────────────────── */
const STACK_COUNT = 8

export default function TestimonialsSection() {
  const [gridCount, setGridCount] = useState(0)
  const [showSkip, setShowSkip] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Skip button visibility
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => {
      setShowSkip(v > 0.12 && v < 0.82)
    })
    return unsub
  }, [scrollYProgress])

  // Load More overlay: fade in after last card peels (0.86-0.92), stay visible
  // (motion v12 opacity workaround)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!loadMoreRef.current) return
    if (latest < 0.86) {
      loadMoreRef.current.style.opacity = "0"
      loadMoreRef.current.style.pointerEvents = "none"
    } else if (latest < 0.92) {
      const t = (latest - 0.86) / (0.92 - 0.86)
      loadMoreRef.current.style.opacity = String(t)
      loadMoreRef.current.style.pointerEvents = t > 0.5 ? "auto" : "none"
    } else {
      loadMoreRef.current.style.opacity = "1"
      loadMoreRef.current.style.pointerEvents = "auto"
    }
  })

  const handleSkip = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }

  const handleLoadMore = () => {
    setGridCount((prev) =>
      Math.min(prev + 8, TESTIMONIALS.length - STACK_COUNT),
    )
    // Scroll to grid after state updates
    setTimeout(() => {
      document
        .getElementById("testimonial-grid")
        ?.scrollIntoView({ behavior: "smooth" })
    }, 150)
  }

  const stackTestimonials = TESTIMONIALS.slice(0, STACK_COUNT)
  const gridTestimonials = TESTIMONIALS.slice(
    STACK_COUNT,
    STACK_COUNT + gridCount,
  )
  const hasMore = STACK_COUNT + gridCount < TESTIMONIALS.length

  return (
    <section className="relative w-full bg-[#FAFAF8]">
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="tGrid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="0.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tGrid)" />
        </svg>
      </div>

      {/* Skip button (fixed) */}
      <motion.button
        onClick={handleSkip}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        animate={{ opacity: showSkip ? 1 : 0, y: showSkip ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: showSkip ? "auto" : "none" }}
        suppressHydrationWarning
      >
        Skip
        <ChevronDown className="w-4 h-4" />
      </motion.button>

      {/* ── Tidal Lock Wrapper ── */}
      {/* 700vh = 600vh pinned scroll distance.
          6% intro + 80% cards (8×10%) + 14% Load More reveal = 100%. */}
      <div
        ref={sectionRef}
        className="relative"
        style={{ minHeight: "700vh" }}
      >
        {/* ── Sticky Container (pins to viewport) ── */}
        <div
          className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
        >
          {/* Section Header */}
          <div className="text-center mb-6 md:mb-8 max-w-lg">
            <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium tracking-wider uppercase rounded-full mb-4 border border-gray-200">
              Client Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-3">
              Businesses That Run on
              <br />
              <span className="text-gray-400">ODL Systems</span>
            </h2>
            <p className="text-sm md:text-base text-gray-500 max-w-md mx-auto">
              Every testimonial here is a business that stopped doing things
              manually and started running smarter.
            </p>
          </div>

          {/* Aggregate Rating */}
          <div className="flex items-center gap-2.5 mb-6 md:mb-8">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-gray-900 text-gray-900"
                />
              ))}
            </div>
            <span className="text-base font-semibold text-gray-900">4.8</span>
            <span className="text-sm text-gray-400">/ 5.0</span>
          </div>

          {/* Card Stack + Load More overlay */}
          <div
            className="relative w-full max-w-md"
            style={{ height: "clamp(260px, 38vh, 400px)" }}
          >
            {stackTestimonials.map((testimonial, index) => (
              <AnimatedCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                totalCount={STACK_COUNT}
                scrollYProgress={scrollYProgress}
              />
            ))}

            {/* Load More — fades in after all cards peel (progress 0.86+) */}
            <div
              ref={loadMoreRef}
              className="absolute inset-0 flex flex-col items-center justify-center gap-3"
              style={{ opacity: 0, pointerEvents: "none" }}
            >
              <p className="text-sm text-gray-500">
                {TESTIMONIALS.length - STACK_COUNT} more stories
              </p>
              <button
                onClick={handleLoadMore}
                className="px-7 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors shadow-sm cursor-pointer"
                suppressHydrationWarning
              >
                Load More Stories
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Grid of additional testimonials (appears after clicking Load More) ── */}
      {gridCount > 0 && (
        <div
          id="testimonial-grid"
          className="relative z-10 max-w-5xl mx-auto px-4 pt-8 pb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {gridTestimonials.map((t) => (
              <div
                key={t.id}
                className="flex flex-col justify-between gap-4 rounded-2xl border border-gray-200/60 bg-white p-6 shadow-sm"
              >
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {t.role}, {t.company}
                    </p>
                  </div>
                  <ReviewStars rating={t.rating} />
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-7 py-3 bg-white text-gray-900 text-sm font-medium rounded-full border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer"
                suppressHydrationWarning
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </section>
  )
}