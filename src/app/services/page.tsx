"use client"

import Link from "next/link"
import { motion, useInView } from "motion/react"
import { ArrowRight, Workflow, Bot, Headphones, BarChart3, Code2, Globe, Palette, Package } from "lucide-react"
import { useRef } from "react"
import CircuitryBackground from "@/components/CircuitryBackground"
import { useMousePosition } from "@/lib/use-mouse-position"

function SpringWords({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ")
  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
            delay: i * 0.03,
          }}
        >
          {word}
          {i < words.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </span>
  )
}

interface ServiceData {
  id: string
  title: string
  description: string
  features: { title: string; description: string }[]
  tools: string[]
  icon: React.ReactNode
  image: string
}

const SERVICES: ServiceData[] = [
  {
    id: "automation",
    title: "Workflow Automation",
    description: "We connect your existing tools and build automated workflows that handle repetitive tasks around the clock. No more manual data entry, no more copy-pasting between systems.",
    features: [
      { title: "Conditional Logic", description: "Build workflows that adapt based on conditions — if this, then that, with full branching support." },
      { title: "Cross-Platform", description: "Connect any tool — CRMs, spreadsheets, email, payment systems — into one automated pipeline." },
      { title: "Real-Time Monitoring", description: "Watch your automations run in real time. Get alerts when something needs attention." },
    ],
    tools: ["n8n", "Zapier", "Make", "Custom APIs"],
    icon: <Workflow className="w-6 h-6" />,
    image: "/images/services/workflow-automation.jpg",
  },
  {
    id: "agents",
    title: "Intelligent Agents",
    description: "Autonomous agents that handle multi-step tasks, reason through problems, and integrate with your existing tools. Like hiring a team member who never sleeps.",
    features: [
      { title: "Natural Language", description: "Give instructions in plain English. The agent understands context and takes the right action." },
      { title: "Multi-Step Reasoning", description: "Handles complex tasks that require multiple decisions and tool calls." },
      { title: "Tool Integration", description: "Connects to your CRM, email, calendar, databases, and internal APIs." },
    ],
    tools: ["LangChain", "OpenAI", "Custom LLM Pipelines"],
    icon: <Bot className="w-6 h-6" />,
    image: "/images/services/intelligent-agents.jpg",
  },
  {
    id: "assistants",
    title: "Smart Assistants",
    description: "Context-aware assistants that manage your schedule, process documents, and handle communications. They learn your preferences and get better over time.",
    features: [
      { title: "Context-Aware", description: "Understands your business context — knows your clients, projects, and priorities." },
      { title: "Calendar Management", description: "Schedules, reschedules, and coordinates across your entire team automatically." },
      { title: "Document Processing", description: "Extracts, categorizes, and routes documents based on content and rules." },
    ],
    tools: ["OpenAI Assistants", "Custom NLP", "RAG Pipelines"],
    icon: <Headphones className="w-6 h-6" />,
    image: "/images/services/smart-assistants.jpg",
  },
  {
    id: "intelligence",
    title: "Business Intelligence",
    description: "Custom dashboards and automated reports that give you real-time visibility into your operations. Stop spending Friday afternoons building spreadsheets.",
    features: [
      { title: "Custom Dashboards", description: "Built for your specific KPIs — not a generic template." },
      { title: "Automated Reports", description: "Reports that generate and distribute themselves on your schedule." },
      { title: "KPI Tracking", description: "Track the metrics that matter. Set alerts when numbers move in the wrong direction." },
    ],
    tools: ["Metabase", "Custom React Dashboards", "PostgreSQL"],
    icon: <BarChart3 className="w-6 h-6" />,
    image: "/images/services/business-intelligence.jpg",
  },
  {
    id: "custom",
    title: "Custom Solutions",
    description: "When off-the-shelf tools don't fit, we build exactly what you need. Full-stack development with deployment and ongoing support.",
    features: [
      { title: "Full-Stack Dev", description: "Front-end, back-end, database — we handle the full stack." },
      { title: "API Design", description: "RESTful or GraphQL APIs that integrate cleanly with your existing systems." },
      { title: "Deployment & Support", description: "We don't just build and leave. Deployment, monitoring, and ongoing optimization included." },
    ],
    tools: ["Next.js", "TypeScript", "PostgreSQL", "AWS/Vercel"],
    icon: <Code2 className="w-6 h-6" />,
    image: "/images/services/custom-solutions.jpg",
  },
]

const SECONDARY_SERVICES = [
  { title: "Web Development", description: "Custom websites and web applications built with modern frameworks.", icon: <Globe className="w-5 h-5" /> },
  { title: "UI/UX Design", description: "Interfaces that are intuitive, beautiful, and built for conversion.", icon: <Palette className="w-5 h-5" /> },
  { title: "Digital Products", description: "From concept to launch — we build software products.", icon: <Package className="w-5 h-5" /> },
]

function ServiceSection({ service, index }: { service: ServiceData; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  const isEven = index % 2 === 0

  return (
    <section id={service.id} className="py-20 md:py-28 px-4 border-t border-gray-100">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Info (or Image on even rows) */}
          <motion.div
            initial={isEven ? { x: -60, opacity: 0 } : { x: 60, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.1 }}
            className={isEven ? "" : "md:order-2"}
          >
            {isEven ? (
              <>
                <h2
                  className="text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {service.title}
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {service.features.map((f) => (
                    <div
                      key={f.title}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{f.title}</p>
                        <p className="text-sm text-gray-500">{f.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tool badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tools.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href="/get-started"
                  className="animate-cta-pulse inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            ) : (
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            )}
          </motion.div>

          {/* Right: Image (or Info on even rows) */}
          <motion.div
            initial={isEven ? { x: 60, opacity: 0 } : { x: -60, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1], delay: 0.25 }}
            className={isEven ? "" : "md:order-1"}
          >
            {isEven ? (
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ) : (
              <>
                <h2
                  className="text-3xl md:text-4xl font-semibold tracking-tight mb-4"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {service.title}
                </h2>
                <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {service.features.map((f) => (
                    <div
                      key={f.title}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-900 mt-2 shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{f.title}</p>
                        <p className="text-sm text-gray-500">{f.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tool badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tools.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <Link
                  href="/get-started"
                  className="animate-cta-pulse inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
                >
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default function ServicesPage() {
  const heroRef = useRef<HTMLElement>(null)
  const mousePosition = useMousePosition(heroRef)

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
            Our Services
          </motion.span>
          <h1
            className="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            <SpringWords text="What We Build (And Why It Matters)" />
          </h1>
          <motion.p
            className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            From workflow automation to intelligent agents, every system we ship is designed to save hours and scale operations.
          </motion.p>
        </div>
      </section>

      {/* ── Five Main Services ── */}
      {SERVICES.map((service, index) => (
        <ServiceSection key={service.id} service={service} index={index} />
      ))}

      {/* ── Secondary Services ── */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-12 text-center"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            Also Available
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SECONDARY_SERVICES.map((service, i) => (
              <motion.div
                key={service.title}
                className="bg-white rounded-2xl p-6 md:p-8 border border-gray-100 shadow-sm"
                initial={{ rotateX: -30, opacity: 0 }}
                whileInView={{ rotateX: 0, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.23, 1, 0.32, 1],
                }}
                viewport={{ once: true }}
                style={{ perspective: "800px" }}
              >
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-900 mb-4">
                  {service.icon}
                </div>
                <h3
                  className="text-lg font-semibold text-gray-900 mb-2 tracking-tight"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-semibold tracking-tight mb-8"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            viewport={{ once: true }}
          >
            Let&apos;s Talk About What You Need
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