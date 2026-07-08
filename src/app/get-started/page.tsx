"use client"

import { useState, useRef, useMemo, useCallback } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "motion/react"
import { useMousePosition } from "@/lib/use-mouse-position"
import CircuitryBackground from "@/components/CircuitryBackground"

// ─── Data ───────────────────────────────────────────────────────────────────

const EASE = [0.23, 1, 0.32, 1] as const

const SERVICE_PAIN_MAP: Record<string, { label: string; icon: string; painPoints: string[]; projectDetails: string[] }> = {
  "workflow-automation": {
    label: "Workflow Automation", icon: "⚙️",
    painPoints: ["Copy-pasting data between tools all day", "Same tasks repeated every week with no end in sight", "Manual approval processes bottlenecking everything", "Errors from human data entry costing me money", "Onboarding new employees takes forever"],
    projectDetails: ["I need to automate data entry between tools", "I want a system that handles approvals without me chasing people", "I need recurring tasks to run on autopilot", "I want to reduce errors in a specific process"],
  },
  "intelligent-agents": {
    label: "Intelligent Agents", icon: "🤖",
    painPoints: ["Customers waiting too long for responses", "Losing leads because nobody followed up in time", "Support team buried in repetitive questions", "Inconsistent quality across customer interactions", "Can't scale customer service without hiring more people"],
    projectDetails: ["I need something to handle customer support 24/7", "I want agents to qualify and follow up with leads", "I need an internal operations agent for my team", "I want to automate a specific workflow with smart decisions"],
  },
  "smart-assistants": {
    label: "Smart Assistants", icon: "🧠",
    painPoints: ["Email overload — important messages getting buried", "Scheduling wars — too many back-and-forths", "Documents piling up with no system to process them", "Admin work eating into billable hours", "Team spending more time organizing than working"],
    projectDetails: ["I need help managing my email and calendar", "I want document processing automated", "I need an assistant that keeps my team organized", "I want to automate a specific admin task"],
  },
  "business-intelligence": {
    label: "Business Intelligence", icon: "📊",
    painPoints: ["Flying blind — no idea what's actually happening in my business", "Building reports by hand every week or month", "Data scattered across 5 different tools", "Can't spot problems until they're expensive", "No real-time visibility into performance"],
    projectDetails: ["I need a real-time dashboard for my business", "I want automated reports delivered on a schedule", "I need to connect data from multiple tools into one view", "I want to track specific KPIs automatically"],
  },
  "custom-solutions": {
    label: "Custom Solutions", icon: "🛠️",
    painPoints: ["Off-the-shelf software doesn't fit how I actually work", "Patching together 4 tools to do what 1 should", "Need something specific that doesn't exist yet", "My current system is held together with duct tape", "Scaling is impossible with what I have now"],
    projectDetails: ["I need an internal tool built from scratch", "I want a customer-facing portal or app", "I need an API integration between systems", "I want to build something specific from the ground up"],
  },
  "web-development": {
    label: "Web Development", icon: "🌐",
    painPoints: ["My website doesn't represent who I am anymore", "Visitors come but don't convert into customers", "My site is slow, broken on mobile, or just ugly", "I need a site but my developer disappeared", "I'm embarrassed to send people to my website"],
    projectDetails: ["I need a brand new website built from scratch", "I need a landing page for a campaign or product", "I want to redesign my existing site", "I need an e-commerce store or booking system"],
  },
  "ui-ux-design": {
    label: "UI/UX Design", icon: "🎨",
    painPoints: ["My app looks outdated and unprofessional", "Users are confused and dropping off", "My team wastes time debating design decisions", "I need a design system but don't know where to start", "I want a mobile app that feels premium"],
    projectDetails: ["I need a full UI/UX redesign of my product", "I need wireframes and prototypes before building", "I want a design system for consistency", "I need a mobile app design that feels native"],
  },
  "digital-products": {
    label: "Digital Products", icon: "📱",
    painPoints: ["I have an idea but no technical co-founder", "I tried building it myself and it's a mess", "My current product is losing users to better alternatives", "I can't find developers who understand my vision", "I need to ship an MVP before my window closes"],
    projectDetails: ["I want to build a SaaS product from scratch", "I need help scoping and building an MVP", "I want to turn my process into a product others can buy", "I need a technical partner, not just a dev shop"],
  },
}

const ALWAYS_PAIN = ["It's a mix of everything, honestly", "I just need someone who gets it"]
const ALWAYS_PROJECT = ["I'm not 100% sure yet — help me figure it out", "I need the full package — design, build, and deploy"]

const BUDGET_OPTIONS = [
  { value: "under-1k", label: "Under $1,000", sub: "I need something simple", followUp: "We can work with that. Simple doesn't mean ineffective." },
  { value: "1k-5k", label: "$1,000 – $5,000", sub: "I want a real solution", followUp: "Solid range. We'll maximize every dollar." },
  { value: "5k-10k", label: "$5,000 – $10,000", sub: "I'm ready to invest properly", followUp: "Now we're building something real." },
  { value: "10k-15k", label: "$10,000 – $15,000", sub: "Let's do this right", followUp: "That budget unlocks serious systems." },
  { value: "15k+", label: "$15,000+", sub: "I want the best, not the cheapest", followUp: "World-class budget. Let's build something incredible." },
  { value: "dont-know", label: "I don't know yet", sub: "Help me scope it first", followUp: "No problem. We'll scope it first so you know exactly what you're paying for." },
  { value: "discuss", label: "Let's discuss", sub: "It depends on what you propose", followUp: "Smart. The right solution is worth more than a round number." },
]

// ─── Types ──────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7

interface QuestionnaireState {
  step: Step
  selectedServices: string[]
  selectedPains: string[]
  painCustomText: string
  selectedProjects: string[]
  projectCustomText: string
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  contactPrefs: string[]
  bestTime: string
  additionalNotes: string
  budget: string
}

const INITIAL_STATE: QuestionnaireState = {
  step: 1,
  selectedServices: [],
  selectedPains: [],
  painCustomText: "",
  selectedProjects: [],
  projectCustomText: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  company: "",
  contactPrefs: [],
  bestTime: "",
  additionalNotes: "",
  budget: "",
}

// ─── Helpers ────────────────────────────────────────────────────────────────

function getPainLimit(serviceCount: number): number {
  if (serviceCount === 1) return 2
  if (serviceCount === 2) return 3
  return 4
}

function getAvailablePains(services: string[]): string[] {
  const pains = new Set<string>()
  for (const svc of services) {
    const entry = SERVICE_PAIN_MAP[svc]
    if (entry) entry.painPoints.forEach((p) => pains.add(p))
  }
  return [...pains]
}

function getAvailableProjects(services: string[]): string[] {
  const projects = new Set<string>()
  for (const svc of services) {
    const entry = SERVICE_PAIN_MAP[svc]
    if (entry) entry.projectDetails.forEach((p) => projects.add(p))
  }
  return [...projects]
}

// ─── Step Transition Wrapper ────────────────────────────────────────────────

const STEP_VARIANTS = {
  enter: (dir: number) => ({
    x: dir > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -80 : 80,
    opacity: 0,
  }),
}

// ─── Main Component ─────────────────────────────────────────────────────────

export default function GetStartedPage() {
  const pageRef = useRef<HTMLDivElement>(null)
  const mousePosition = useMousePosition(pageRef)

  const [state, setState] = useState<QuestionnaireState>(INITIAL_STATE)
  const [direction, setDirection] = useState(1)

  const update = useCallback(<K extends keyof QuestionnaireState>(key: K, value: QuestionnaireState[K]) => {
    setState((prev) => ({ ...prev, [key]: value }))
  }, [])

  const goNext = useCallback(() => {
    setDirection(1)
    setState((prev) => ({ ...prev, step: Math.min(prev.step + 1, 7) as Step }))
  }, [])

  const goBack = useCallback(() => {
    setDirection(-1)
    setState((prev) => ({ ...prev, step: Math.max(prev.step - 1, 1) as Step }))
  }, [])

  const goToStep = useCallback((step: Step) => {
    setDirection(step > state.step ? 1 : -1)
    setState((prev) => ({ ...prev, step }))
  }, [state.step])

  const toggleService = useCallback((svc: string) => {
    setState((prev) => {
      const has = prev.selectedServices.includes(svc)
      const next = has
        ? prev.selectedServices.filter((s) => s !== svc)
        : [...prev.selectedServices, svc]
      // Reset downstream state
      return { ...prev, selectedServices: next, selectedPains: [], painCustomText: "", selectedProjects: [], projectCustomText: "" }
    })
  }, [])

  const togglePain = useCallback((pain: string) => {
    setState((prev) => {
      if (pain === "__custom__") {
        const has = prev.selectedPains.includes("__custom__")
        if (!has && prev.selectedPains.length >= getPainLimit(prev.selectedServices.length)) return prev
        const next = has
          ? prev.selectedPains.filter((p) => p !== "__custom__")
          : [...prev.selectedPains, "__custom__"]
        return { ...prev, selectedPains: next }
      }
      const has = prev.selectedPains.includes(pain)
      if (!has && prev.selectedPains.length >= getPainLimit(prev.selectedServices.length)) return prev
      const next = has
        ? prev.selectedPains.filter((p) => p !== pain)
        : [...prev.selectedPains, pain]
      return { ...prev, selectedPains: next }
    })
  }, [])

  const toggleProject = useCallback((proj: string) => {
    setState((prev) => {
      if (proj === "__custom_project__") {
        const has = prev.selectedProjects.includes("__custom_project__")
        if (!has && prev.selectedProjects.length >= 3) return prev
        const next = has
          ? prev.selectedProjects.filter((p) => p !== "__custom_project__")
          : [...prev.selectedProjects, "__custom_project__"]
        return { ...prev, selectedProjects: next }
      }
      const has = prev.selectedProjects.includes(proj)
      if (!has && prev.selectedProjects.length >= 3) return prev
      const next = has
        ? prev.selectedProjects.filter((p) => p !== proj)
        : [...prev.selectedProjects, proj]
      return { ...prev, selectedProjects: next }
    })
  }, [])

  const toggleContactPref = useCallback((pref: string) => {
    setState((prev) => {
      const has = prev.contactPrefs.includes(pref)
      return { ...prev, contactPrefs: has ? prev.contactPrefs.filter((p) => p !== pref) : [...prev.contactPrefs, pref] }
    })
  }, [])

  // Derived values
  const painLimit = getPainLimit(state.selectedServices.length)
  const availablePains = useMemo(() => getAvailablePains(state.selectedServices), [state.selectedServices])
  const availableProjects = useMemo(() => getAvailableProjects(state.selectedServices), [state.selectedServices])
  const selectedBudget = BUDGET_OPTIONS.find((b) => b.value === state.budget)
  const totalSteps = 6
  const progressPct = state.step <= 6 ? (state.step / totalSteps) * 100 : 100

  // Validation helpers
  const canStep1 = state.selectedServices.length >= 1
  const canStep2 = state.selectedPains.length >= 1
  const canStep3 = state.selectedProjects.length >= 1
  const canStep4 = state.firstName.trim() !== "" && state.email.trim() !== "" && state.contactPrefs.length >= 1
  const canStep5 = state.budget !== ""

  const canProceed = state.step === 1 ? canStep1
    : state.step === 2 ? canStep2
    : state.step === 3 ? canStep3
    : state.step === 4 ? canStep4
    : state.step === 5 ? canStep5
    : true

  // ─── Render ─────────────────────────────────────────────────────────────────

  return (
    <main ref={pageRef} className="relative min-h-screen bg-white">
      {/* Step 7 uses its own dark background, steps 1-6 use circuitry */}
      {state.step <= 6 && (
        <CircuitryBackground mousePosition={mousePosition} />
      )}

      {/* ── Progress Bar (steps 1-6 only) ── */}
      {state.step <= 6 && (
        <div className="fixed top-0 left-0 right-0 z-50 h-[2px] bg-gray-100">
          <motion.div
            className="h-full bg-[#111111]"
            initial={false}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.4, ease: EASE }}
          />
        </div>
      )}

      {/* ── Hero (compact, steps 1-6 only) ── */}
      {state.step <= 6 && (
        <section className="relative min-h-[40vh] flex items-center justify-center px-4 pt-8 pb-4">
          <div className="text-center max-w-3xl mx-auto relative z-10">
            <motion.span
              className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium tracking-wider uppercase rounded-full mb-6 border border-gray-200"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              Get Started
            </motion.span>
            <motion.h1
              className="text-4xl md:text-6xl font-bold tracking-tight leading-tight text-gray-900"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: EASE }}
            >
              Let&apos;s Build Something
            </motion.h1>
            <motion.p
              className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
            >
              A few quick questions so we can hit the ground running. Takes about 2 minutes.
            </motion.p>
          </div>
        </section>
      )}

      {/* ── Step 7: Full dark receipt page ── */}
      {state.step === 7 && (
        <Step7 firstName={state.firstName} />
      )}

      {/* ── Steps 1-6: Questionnaire Area ── */}
      {state.step <= 6 && (
        <section className="relative z-10 pb-32 md:pb-20">
          <div className="max-w-3xl mx-auto px-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={state.step}
                custom={direction}
                variants={STEP_VARIANTS}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: EASE }}
              >
                {state.step === 1 && (
                  <Step1
                    selectedServices={state.selectedServices}
                    toggleService={toggleService}
                  />
                )}
                {state.step === 2 && (
                  <Step2
                    selectedPains={state.selectedPains}
                    painCustomText={state.painCustomText}
                    painLimit={painLimit}
                    availablePains={availablePains}
                    togglePain={togglePain}
                    updatePainCustom={(v) => update("painCustomText", v)}
                  />
                )}
                {state.step === 3 && (
                  <Step3
                    selectedProjects={state.selectedProjects}
                    projectCustomText={state.projectCustomText}
                    availableProjects={availableProjects}
                    toggleProject={toggleProject}
                    updateProjectCustom={(v) => update("projectCustomText", v)}
                  />
                )}
                {state.step === 4 && (
                  <Step4
                    state={state}
                    update={update}
                    toggleContactPref={toggleContactPref}
                  />
                )}
                {state.step === 5 && (
                  <Step5
                    budget={state.budget}
                    selectBudget={(v) => update("budget", v)}
                  />
                )}
                {state.step === 6 && (
                  <Step6
                    state={state}
                    selectedBudget={selectedBudget}
                    goToStep={goToStep}
                    goNext={goNext}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Desktop Navigation (bottom) ── */}
          {state.step >= 1 && state.step <= 5 && (
            <div className="hidden md:flex items-center justify-between max-w-3xl mx-auto px-4 mt-8">
              <button
                onClick={goBack}
                className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
                suppressHydrationWarning
              >
                ← Back
              </button>
              <button
                onClick={goNext}
                disabled={!canProceed}
                className={`animate-cta-pulse rounded-full px-8 py-3 text-sm font-medium transition-colors ${
                  canProceed
                    ? "bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                suppressHydrationWarning
              >
                Next →
              </button>
            </div>
          )}

          {/* ── Mobile Navigation (fixed bottom bar) ── */}
          {state.step >= 1 && state.step <= 5 && (
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 px-4 py-3 flex items-center justify-between">
              <button
                onClick={goBack}
                className="text-gray-500 hover:text-gray-900 transition-colors text-sm py-2 px-4"
                suppressHydrationWarning
              >
                ← Back
              </button>
              <button
                onClick={goNext}
                disabled={!canProceed}
                className={`animate-cta-pulse rounded-full px-6 py-2.5 text-sm font-medium transition-colors ${
                  canProceed
                    ? "bg-gray-900 text-white hover:bg-gray-800 cursor-pointer"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
                suppressHydrationWarning
              >
                Next →
              </button>
            </div>
          )}
        </section>
      )}
    </main>
  )
}

// ─── Step 1: What do you need help with? ───────────────────────────────────

function Step1({
  selectedServices,
  toggleService,
}: {
  selectedServices: string[]
  toggleService: (s: string) => void
}) {
  return (
    <div>
      <h2
        className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        What do you need help with?
      </h2>
      <p className="text-gray-500 text-sm mt-2 mb-2">Pick as many as you like.</p>
      {selectedServices.length > 0 && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-400 text-xs mb-4"
        >
          You picked {selectedServices.length} service{selectedServices.length !== 1 ? "s" : ""}
        </motion.p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        {Object.entries(SERVICE_PAIN_MAP).map(([key, svc]) => {
          const selected = selectedServices.includes(key)
          return (
            <motion.button
              key={key}
              onClick={() => toggleService(key)}
              className={`text-left px-6 py-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                selected
                  ? "border-gray-900 bg-gray-50 shadow-sm"
                  : "bg-white border-gray-200 hover:border-gray-400 hover:shadow-md"
              }`}
              whileTap={{ scale: 0.97 }}
              suppressHydrationWarning
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{svc.icon}</span>
                  <span className={`text-sm font-medium ${selected ? "text-gray-900" : "text-gray-700"}`}>
                    {svc.label}
                  </span>
                </div>
                {selected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="text-gray-900 font-bold text-sm"
                  >
                    ✓
                  </motion.span>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Step 2: What's broken? ────────────────────────────────────────────────

function Step2({
  selectedPains,
  painCustomText,
  painLimit,
  availablePains,
  togglePain,
  updatePainCustom,
}: {
  selectedPains: string[]
  painCustomText: string
  painLimit: number
  availablePains: string[]
  togglePain: (p: string) => void
  updatePainCustom: (v: string) => void
}) {
  const allPains = [...availablePains, ...ALWAYS_PAIN]
  const atLimit = selectedPains.length >= painLimit
  const hasCustom = selectedPains.includes("__custom__")

  return (
    <div>
      <h2
        className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        What&apos;s broken?
      </h2>
      <p className="text-gray-500 text-sm mt-2 mb-2">
        Pick up to {painLimit} that resonate.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        {allPains.map((pain) => {
          const selected = selectedPains.includes(pain)
          return (
            <motion.button
              key={pain}
              onClick={() => togglePain(pain)}
              disabled={!selected && atLimit}
              className={`text-left px-6 py-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                selected
                  ? "border-gray-900 bg-gray-50 shadow-sm"
                  : atLimit
                    ? "bg-white border-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-white border-gray-200 hover:border-gray-400 hover:shadow-md"
              }`}
              whileTap={atLimit && !selected ? {} : { scale: 0.97 }}
              suppressHydrationWarning
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm ${selected ? "text-gray-900 font-medium" : atLimit ? "text-gray-300" : "text-gray-700"}`}>
                  {pain}
                </span>
                {selected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="text-gray-900 font-bold text-sm shrink-0 ml-2"
                  >
                    ✓
                  </motion.span>
                )}
              </div>
            </motion.button>
          )
        })}

        {/* Custom "Something else..." option */}
        <motion.button
          onClick={() => togglePain("__custom__")}
          disabled={!hasCustom && atLimit}
          className={`text-left px-6 py-4 rounded-xl border cursor-pointer transition-all duration-300 ${
            hasCustom
              ? "border-gray-900 bg-gray-50 shadow-sm"
              : atLimit
                ? "bg-white border-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-white border-gray-200 hover:border-gray-400 hover:shadow-md"
          }`}
          whileTap={atLimit && !hasCustom ? {} : { scale: 0.97 }}
          suppressHydrationWarning
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm italic ${hasCustom ? "text-gray-900 font-medium" : atLimit ? "text-gray-300" : "text-gray-500"}`}>
              Something else...
            </span>
            {hasCustom && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="text-gray-900 font-bold text-sm"
              >
                ✓
              </motion.span>
            )}
          </div>
        </motion.button>
      </div>

      {/* Custom textarea */}
      <AnimatePresence>
        {hasCustom && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden mt-3"
          >
            <textarea
              value={painCustomText}
              onChange={(e) => updatePainCustom(e.target.value)}
              placeholder="Tell us what's going on..."
              rows={3}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-colors resize-none"
              suppressHydrationWarning
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Step 3: Tell me more about your project ───────────────────────────────

function Step3({
  selectedProjects,
  projectCustomText,
  availableProjects,
  toggleProject,
  updateProjectCustom,
}: {
  selectedProjects: string[]
  projectCustomText: string
  availableProjects: string[]
  toggleProject: (p: string) => void
  updateProjectCustom: (v: string) => void
}) {
  const allProjects = [...availableProjects, ...ALWAYS_PROJECT]
  const atLimit = selectedProjects.length >= 3
  const hasCustom = selectedProjects.includes("__custom_project__")

  return (
    <div>
      <h2
        className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Tell me more about your project
      </h2>
      <p className="text-gray-500 text-sm mt-2 mb-2">
        Pick up to 3 that describe what you&apos;re looking for.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        {allProjects.map((proj) => {
          const selected = selectedProjects.includes(proj)
          return (
            <motion.button
              key={proj}
              onClick={() => toggleProject(proj)}
              disabled={!selected && atLimit}
              className={`text-left px-6 py-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                selected
                  ? "border-gray-900 bg-gray-50 shadow-sm"
                  : atLimit
                    ? "bg-white border-gray-100 text-gray-300 cursor-not-allowed"
                    : "bg-white border-gray-200 hover:border-gray-400 hover:shadow-md"
              }`}
              whileTap={atLimit && !selected ? {} : { scale: 0.97 }}
              suppressHydrationWarning
            >
              <div className="flex items-center justify-between">
                <span className={`text-sm ${selected ? "text-gray-900 font-medium" : atLimit ? "text-gray-300" : "text-gray-700"}`}>
                  {proj}
                </span>
                {selected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="text-gray-900 font-bold text-sm shrink-0 ml-2"
                  >
                    ✓
                  </motion.span>
                )}
              </div>
            </motion.button>
          )
        })}

        {/* Custom option */}
        <motion.button
          onClick={() => toggleProject("__custom_project__")}
          disabled={!hasCustom && atLimit}
          className={`text-left px-6 py-4 rounded-xl border cursor-pointer transition-all duration-300 ${
            hasCustom
              ? "border-gray-900 bg-gray-50 shadow-sm"
              : atLimit
                ? "bg-white border-gray-100 text-gray-300 cursor-not-allowed"
                : "bg-white border-gray-200 hover:border-gray-400 hover:shadow-md"
          }`}
          whileTap={atLimit && !hasCustom ? {} : { scale: 0.97 }}
          suppressHydrationWarning
        >
          <div className="flex items-center justify-between">
            <span className={`text-sm italic ${hasCustom ? "text-gray-900 font-medium" : atLimit ? "text-gray-300" : "text-gray-500"}`}>
              I&apos;ll explain...
            </span>
            {hasCustom && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="text-gray-900 font-bold text-sm"
              >
                ✓
              </motion.span>
            )}
          </div>
        </motion.button>
      </div>

      {/* Custom textarea */}
      <AnimatePresence>
        {hasCustom && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="overflow-hidden mt-3"
          >
            <textarea
              value={projectCustomText}
              onChange={(e) => updateProjectCustom(e.target.value)}
              placeholder="Describe your project in your own words..."
              rows={3}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-colors resize-none"
              suppressHydrationWarning
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Step 4: Who are we talking to? ────────────────────────────────────────

function Step4({
  state,
  update,
  toggleContactPref,
}: {
  state: QuestionnaireState
  update: <K extends keyof QuestionnaireState>(key: K, value: QuestionnaireState[K]) => void
  toggleContactPref: (p: string) => void
}) {
  const inputClass = "w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:border-gray-900 transition-colors bg-white"
  const labelClass = "block text-sm font-medium text-gray-900 mb-1.5"

  return (
    <div>
      <h2
        className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Quick intro — who are we talking to?
      </h2>
      <p className="text-gray-500 text-sm mt-2">
        So we know who to reach out to.
      </p>

      <div className="mt-8 space-y-5">
        {/* Name row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>
              First Name <span className="text-gray-400">*</span>
            </label>
            <input
              type="text"
              value={state.firstName}
              onChange={(e) => update("firstName", e.target.value)}
              placeholder="John"
              className={inputClass}
              suppressHydrationWarning
            />
          </div>
          <div>
            <label className={labelClass}>Last Name</label>
            <input
              type="text"
              value={state.lastName}
              onChange={(e) => update("lastName", e.target.value)}
              placeholder="Smith"
              className={inputClass}
              suppressHydrationWarning
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className={labelClass}>
            Email <span className="text-gray-400">*</span>
          </label>
          <input
            type="email"
            value={state.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="john@company.com"
            className={inputClass}
            suppressHydrationWarning
          />
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>Phone</label>
          <input
            type="tel"
            value={state.phone}
            onChange={(e) => update("phone", e.target.value)}
            placeholder="(407) 555-0123"
            className={inputClass}
            suppressHydrationWarning
          />
        </div>

        {/* Company */}
        <div>
          <label className={labelClass}>Company Name</label>
          <input
            type="text"
            value={state.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Acme Inc (optional)"
            className={inputClass}
            suppressHydrationWarning
          />
        </div>

        {/* Preferred contact */}
        <div>
          <label className={labelClass}>
            Preferred Contact <span className="text-gray-400">*</span>
          </label>
          <div className="flex flex-wrap gap-4 mt-2">
            {(["email", "phone", "whatsapp"] as const).map((pref) => {
              const checked = state.contactPrefs.includes(pref)
              return (
                <label
                  key={pref}
                  className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                    checked
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleContactPref(pref)}
                    className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900/20"
                    suppressHydrationWarning
                  />
                  <span className={`text-sm capitalize ${checked ? "text-gray-900 font-medium" : "text-gray-600"}`}>
                    {pref === "whatsapp" ? "WhatsApp" : pref}
                  </span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Best time */}
        <div>
          <label className={labelClass}>Best time to reach you</label>
          <div className="flex flex-wrap gap-4 mt-2">
            {["Morning", "Afternoon", "Evening", "Anytime"].map((time) => {
              const val = time.toLowerCase()
              return (
                <label
                  key={val}
                  className={`flex items-center gap-2 cursor-pointer px-4 py-2.5 rounded-xl border transition-all duration-200 ${
                    state.bestTime === val
                      ? "border-gray-900 bg-gray-50"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="bestTime"
                    checked={state.bestTime === val}
                    onChange={() => update("bestTime", val)}
                    className="w-4 h-4 border-gray-300 text-gray-900 focus:ring-gray-900/20"
                    suppressHydrationWarning
                  />
                  <span className={`text-sm ${state.bestTime === val ? "text-gray-900 font-medium" : "text-gray-600"}`}>
                    {time}
                  </span>
                </label>
              )
            })}
          </div>
        </div>

        {/* Additional notes */}
        <div>
          <label className={labelClass}>Additional Notes</label>
          <textarea
            value={state.additionalNotes}
            onChange={(e) => update("additionalNotes", e.target.value)}
            placeholder="Anything else you want us to know?"
            rows={3}
            className={`${inputClass} resize-none`}
            suppressHydrationWarning
          />
        </div>
      </div>
    </div>
  )
}

// ─── Step 5: Budget ────────────────────────────────────────────────────────

function Step5({
  budget,
  selectBudget,
}: {
  budget: string
  selectBudget: (v: string) => void
}) {
  return (
    <div>
      <h2
        className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        How much are you willing to invest?
      </h2>
      <p className="text-gray-500 text-sm mt-2">
        This helps us scope the right solution. No wrong answers.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        {BUDGET_OPTIONS.map((opt) => {
          const selected = budget === opt.value
          return (
            <motion.button
              key={opt.value}
              onClick={() => selectBudget(opt.value)}
              className={`text-left px-6 py-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                selected
                  ? "border-gray-900 bg-gray-50 shadow-sm"
                  : "bg-white border-gray-200 hover:border-gray-400 hover:shadow-md"
              }`}
              whileTap={{ scale: 0.97 }}
              suppressHydrationWarning
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className={`text-sm font-medium ${selected ? "text-gray-900" : "text-gray-700"}`}>
                    {opt.label}
                  </div>
                  <div className={`text-xs mt-0.5 ${selected ? "text-gray-500" : "text-gray-400"}`}>
                    {opt.sub}
                  </div>
                </div>
                {selected && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="text-gray-900 font-bold text-sm ml-3 shrink-0"
                  >
                    ✓
                  </motion.span>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Step 6: Summary ───────────────────────────────────────────────────────

function Step6({
  state,
  selectedBudget,
  goToStep,
  goNext,
}: {
  state: QuestionnaireState
  selectedBudget: { label: string; followUp: string } | undefined
  goToStep: (s: Step) => void
  goNext: () => void
}) {
  const displayName = state.firstName || "friend"

  // Build display lists
  const serviceLabels = state.selectedServices.map((s) => SERVICE_PAIN_MAP[s]?.label || s)
  const painLabels = state.selectedPains
    .filter((p) => p !== "__custom__")
    .map((p) => p)
  const projectLabels = state.selectedProjects
    .filter((p) => p !== "__custom_project__")
    .map((p) => p)

  const contactLabel = state.contactPrefs
    .map((p) => (p === "whatsapp" ? "WhatsApp" : p.charAt(0).toUpperCase() + p.slice(1)))
    .join(", ")

  const sections = [
    {
      title: "What You Need",
      step: 1 as Step,
      content: serviceLabels.join(", "),
    },
    {
      title: "What's Broken",
      step: 2 as Step,
      content: [
        ...painLabels,
        state.painCustomText ? `Other: ${state.painCustomText}` : "",
      ].filter(Boolean).join(", "),
    },
    {
      title: "Your Project",
      step: 3 as Step,
      content: [
        ...projectLabels,
        state.projectCustomText ? `Custom: ${state.projectCustomText}` : "",
      ].filter(Boolean).join(", "),
    },
    {
      title: "Who You Are",
      step: 4 as Step,
      content: [
        state.firstName && state.lastName ? `${state.firstName} ${state.lastName}` : state.firstName,
        state.email,
        state.phone,
        state.company,
      ].filter(Boolean).join(" · "),
    },
    {
      title: "How to Reach You",
      step: 4 as Step,
      content: [
        contactLabel,
        state.bestTime ? `Best time: ${state.bestTime}` : "",
      ].filter(Boolean).join(" · "),
    },
    {
      title: "Your Investment",
      step: 5 as Step,
      content: selectedBudget?.label || "",
    },
  ].filter((s) => s.content)

  return (
    <div>
      <h2
        className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        Here&apos;s what we heard, {displayName}.
      </h2>

      {selectedBudget && (
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4, ease: EASE }}
          className="text-gray-500 text-sm italic mt-2 mb-6"
        >
          {selectedBudget.followUp}
        </motion.p>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 max-w-2xl mx-auto mt-6 space-y-6">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                {section.title}
              </span>
              <button
                onClick={() => goToStep(section.step)}
                className="text-sm text-gray-400 hover:text-gray-900 transition-colors"
                suppressHydrationWarning
              >
                Edit
              </button>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{section.content}</p>
          </motion.div>
        ))}

        {/* Budget follow-up */}
        {selectedBudget && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * sections.length, duration: 0.4, ease: EASE }}
            className="pt-4 border-t border-gray-100"
          >
            <p className="text-sm text-gray-500 italic">{selectedBudget.followUp}</p>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={() => goToStep(5)}
          className="text-gray-500 hover:text-gray-900 transition-colors text-sm"
          suppressHydrationWarning
        >
          ← Go back
        </button>
        <button
          onClick={goNext}
          className="animate-cta-pulse bg-gray-900 text-white rounded-full px-8 py-3 text-sm font-medium hover:bg-gray-800 transition-colors cursor-pointer"
          suppressHydrationWarning
        >
          Yeah, send it →
        </button>
      </div>
    </div>
  )
}

// ─── Step 7: Receipt / Success ─────────────────────────────────────────────

function Step7({ firstName }: { firstName: string }) {
  const displayName = firstName || "friend"

  const checkItems = [
    "We received your details",
    "Our team is reviewing your project",
    "We'll reach out within 24 hours",
  ]

  return (
    <div className="bg-[#0A0A0A] min-h-screen flex flex-col items-center justify-center px-4 text-white">
      <div className="max-w-md mx-auto text-center">
        {/* Main heading */}
        <motion.h1
          className="text-3xl md:text-5xl font-bold tracking-tight"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          We got it, {displayName}.
        </motion.h1>

        <motion.p
          className="mt-4 text-gray-400 text-base leading-relaxed"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
        >
          Thanks for taking the time. Here&apos;s what happens next:
        </motion.p>

        {/* Checkmark items */}
        <div className="mt-10 space-y-4 text-left">
          {checkItems.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + 0.2 * i, duration: 0.5, ease: EASE }}
              className="flex items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + 0.2 * i, type: "spring", stiffness: 400, damping: 20 }}
                className="w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0"
              >
                <svg
                  className="w-3.5 h-3.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </motion.div>
              <span className="text-sm text-gray-300">{item}</span>
            </motion.div>
          ))}
        </div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.5, ease: EASE }}
          className="mt-12"
        >
          <Link
            href="/"
            className="inline-block bg-white text-gray-900 rounded-full px-8 py-3 text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  )
}