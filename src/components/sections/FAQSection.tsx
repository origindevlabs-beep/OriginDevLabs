"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { Plus, Minus, ArrowRight } from "lucide-react"
import {
  FAQ_CATEGORIES,
  HOMEPAGE_FEATURED_CATEGORIES,
  generateFAQSchema,
  type FAQCategory,
} from "@/lib/faq-data"

// ── FAQ Schema Script ──────────────────────────────────────────
function FAQSchemaScript({ categories }: { categories: FAQCategory[] }) {
  const schema = generateFAQSchema(categories)
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

// ── Single FAQ Accordion Item ──────────────────────────────────
function FAQAccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`rounded-xl border transition-colors duration-200 ${
        isOpen
          ? "border-gray-900 bg-gray-50"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-4 px-6 py-4 text-left"
        aria-expanded={isOpen}
      >
        <span className="text-base font-medium text-gray-900">{question}</span>
        <span className="flex-shrink-0 mt-0.5">
          {isOpen ? (
            <Minus className="h-5 w-5 text-gray-900" />
          ) : (
            <Plus className="h-5 w-5 text-gray-400" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm leading-relaxed text-gray-600">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Category Tabs ──────────────────────────────────────────────
function CategoryTabs({
  categories,
  activeId,
  onSelect,
  compact = false,
}: {
  categories: FAQCategory[]
  activeId: string
  onSelect: (id: string) => void
  compact?: boolean
}) {
  return (
    <div
      className={`flex gap-2 overflow-x-auto pb-2 scrollbar-hide ${
        compact ? "" : "flex-wrap justify-center"
      }`}
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
            activeId === cat.id
              ? "bg-gray-900 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {compact ? cat.shortLabel : cat.label}
        </button>
      ))}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════
// FAQ SECTION — Featured (Homepage)
// ═══════════════════════════════════════════════════════════════
export function FAQFeaturedSection() {
  const [activeCategory, setActiveCategory] = useState(
    HOMEPAGE_FEATURED_CATEGORIES[0].id
  )
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const currentCategory = HOMEPAGE_FEATURED_CATEGORIES.find(
    (c) => c.id === activeCategory
  )!

  return (
    <section className="relative bg-white py-24 md:py-32 px-4 overflow-hidden">
      <FAQSchemaScript categories={HOMEPAGE_FEATURED_CATEGORIES} />

      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Frequently Asked Questions
          </h2>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <CategoryTabs
            categories={HOMEPAGE_FEATURED_CATEGORIES}
            activeId={activeCategory}
            onSelect={(id) => {
              setActiveCategory(id)
              setOpenIndex(null)
            }}
            compact
          />
        </motion.div>

        {/* FAQ Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="space-y-3"
          >
            {currentCategory.questions.map((q, i) => (
              <motion.div
                key={q.question}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                <FAQAccordionItem
                  question={q.question}
                  answer={q.answer}
                  isOpen={openIndex === i}
                  onToggle={() =>
                    setOpenIndex(openIndex === i ? null : i)
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All CTA */}
        <motion.div
          className="mt-10 text-center"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          viewport={{ once: true }}
        >
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors group"
          >
            View All Questions
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════
// FAQ SECTION — Full (Dedicated /faq Page)
// ═══════════════════════════════════════════════════════════════
export function FAQFullSection() {
  const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES[0].id)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const currentCategory = FAQ_CATEGORIES.find((c) => c.id === activeCategory)!

  return (
    <>
      <FAQSchemaScript categories={FAQ_CATEGORIES} />

      {/* Category Tabs */}
      <div className="mb-10">
        <CategoryTabs
          categories={FAQ_CATEGORIES}
          activeId={activeCategory}
          onSelect={(id) => {
            setActiveCategory(id)
            setOpenIndex(null)
          }}
        />
      </div>

      {/* FAQ Items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="space-y-3 max-w-3xl mx-auto"
        >
          {currentCategory.questions.map((q, i) => (
            <motion.div
              key={q.question}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <FAQAccordionItem
                question={q.question}
                answer={q.answer}
                isOpen={openIndex === i}
                onToggle={() =>
                  setOpenIndex(openIndex === i ? null : i)
                }
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </>
  )
}