"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { Search, Compass, Code, CheckCircle, Rocket, TrendingUp } from "lucide-react"

const STEPS = [
  {
    number: 1,
    title: "Discovery",
    description:
      "We map your workflows and find the bottlenecks. No assumptions — just a clear picture of where your time and money are going, and where automation can make the biggest impact.",
    icon: Search,
  },
  {
    number: 2,
    title: "Solution Design",
    description:
      "Architecture that fits your business. We design systems around your actual processes, not generic templates. Every workflow is custom-planned for maximum efficiency.",
    icon: Compass,
  },
  {
    number: 3,
    title: "Development",
    description:
      "Build, integrate, connect everything. Our team assembles the automation using proven tools and clean code — no black boxes, no vendor lock-in.",
    icon: Code,
  },
  {
    number: 4,
    title: "Testing",
    description:
      "Break it on purpose so customers never have to. We stress-test every edge case, every failure mode, and every integration point before anything goes live.",
    icon: CheckCircle,
  },
  {
    number: 5,
    title: "Deployment",
    description:
      "Launch, train, and support. We handle the full rollout, train your team, and make sure everyone knows how the new system works before we step back.",
    icon: Rocket,
  },
  {
    number: 6,
    title: "Optimization",
    description:
      "Watch data, tune systems, maximize ROI. Post-launch monitoring and continuous improvement — because automation that isn't improving is slowing down.",
    icon: TrendingUp,
  },
]

function StepCard({
  step,
  index,
}: {
  step: (typeof STEPS)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })
  const isLeft = index % 2 === 0

  return (
    <motion.div
      ref={ref}
      className={`flex items-start gap-6 md:gap-12 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      } flex-row`}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.32, 0.72, 0, 1],
      }}
    >
      {/* Content */}
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} text-left`}>
        <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:justify-end" : "md:justify-start"} justify-start`}>
          <span
            className="text-xs font-mono font-bold text-white/40 tracking-widest"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            0{step.number}
          </span>
          <h3 className="text-xl md:text-2xl font-semibold text-white tracking-tight">
            {step.title}
          </h3>
        </div>
        <p className="text-sm text-gray-400 leading-relaxed max-w-md">
          {step.description}
        </p>
      </div>

      {/* Center Icon */}
      <div className="relative flex items-center justify-center w-12 h-12 shrink-0">
        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center z-10">
          <step.icon className="w-5 h-5 text-white/70" />
        </div>
      </div>

      {/* Spacer for alignment */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  )
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const titleInView = useInView(titleRef, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.8], ["0%", "100%"])

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#0A0A0A] py-24 md:py-32 overflow-hidden"
    >
      {/* Dot pattern background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="hiwDots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="0.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hiwDots)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div ref={titleRef} className="text-center mb-20 md:mb-28">
          <motion.span
            className="inline-block px-4 py-1.5 bg-white/5 text-white/60 text-xs font-medium tracking-wider uppercase rounded-full mb-6 border border-white/10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={titleInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our Process
          </motion.span>
          <motion.h2
            className="text-3xl md:text-5xl font-semibold text-white tracking-tight mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={titleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          >
            How Your Automation
            <br />
            <span className="text-white/40">Gets Built</span>
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated center line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/10">
            <motion.div
              className="absolute top-0 left-0 w-full bg-white/40 origin-top"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-16 md:gap-20">
            {STEPS.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}