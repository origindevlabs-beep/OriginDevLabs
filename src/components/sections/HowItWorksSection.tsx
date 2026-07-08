"use client"

import { useRef, useEffect, useCallback, useState } from "react"
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react"
import { Search, Compass, Code, CheckCircle, Rocket, TrendingUp, Check } from "lucide-react"

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const STEPS = [
  { number: 1, title: "Discovery", description: "We map your workflows and find the bottlenecks", icon: Search, progress: 0 },
  { number: 2, title: "Solution Design", description: "Architecture that fits your business", icon: Compass, progress: 0.11 },
  { number: 3, title: "Development", description: "Build, integrate, connect everything", icon: Code, progress: 0.22 },
  { number: 4, title: "Testing", description: "Break it on purpose so customers never have to", icon: CheckCircle, progress: 0.33 },
  { number: 5, title: "Deployment", description: "Launch, train, and support", icon: Rocket, progress: 0.44 },
  { number: 6, title: "Optimization", description: "Watch data, tune systems, maximize ROI", icon: TrendingUp, progress: 0.55 },
]

/* ------------------------------------------------------------------ */
/*  Canvas Background Hook                                             */
/* ------------------------------------------------------------------ */
function useCircuitBackground(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  containerRef: React.RefObject<HTMLDivElement | null>,
  dark = true,
) {
  const mouseRef = useRef({ x: -9999, y: -9999 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
  }, [canvasRef])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const nodeColor = dark ? "255,255,255" : "0,0,0"
    const glowColor = dark ? "255,255,255" : "0,0,0"

    /* Generate nodes */
    const nodeCount = 50
    const nodes: { x: number; y: number; vx: number; vy: number; radius: number }[] = []
    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
      })
    }

    /* Connections */
    const connections: [number, number][] = []
    for (let i = 0; i < nodeCount; i++) {
      const closest = [...Array(nodeCount).keys()]
        .filter((j) => j !== i)
        .sort((a, b) => {
          const da = (nodes[a].x - nodes[i].x) ** 2 + (nodes[a].y - nodes[i].y) ** 2
          const db = (nodes[b].x - nodes[i].x) ** 2 + (nodes[b].y - nodes[i].y) ** 2
          return da - db
        })
      const connectCount = Math.floor(Math.random() * 2) + 1
      for (let c = 0; c < connectCount && c < closest.length; c++) {
        const j = closest[c]
        if (j > i) connections.push([i, j])
      }
    }

    let raf: number
    function draw() {
      if (!canvas || !ctx) return
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y

      /* Update positions */
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > w) n.vx *= -1
        if (n.y < 0 || n.y > h) n.vy *= -1
        n.x = Math.max(0, Math.min(w, n.x))
        n.y = Math.max(0, Math.min(h, n.y))
      }

      /* Draw connections */
      for (const [a, b] of connections) {
        const na = nodes[a]
        const nb = nodes[b]
        const dist = Math.sqrt((na.x - nb.x) ** 2 + (na.y - nb.y) ** 2)
        if (dist > 200) continue

        const midX = (na.x + nb.x) / 2
        const midY = (na.y + nb.y) / 2
        const mouseDist = Math.sqrt((mx - midX) ** 2 + (my - midY) ** 2)
        const glow = Math.max(0, 1 - mouseDist / 180)

        const baseAlpha = dark ? 0.06 : 0.08
        const alpha = baseAlpha + glow * 0.2
        ctx.strokeStyle = `rgba(${nodeColor},${alpha})`
        ctx.lineWidth = 0.5 + glow * 1.5
        ctx.beginPath()
        ctx.moveTo(na.x, na.y)
        /* Right-angle paths for circuitry feel */
        if (Math.random() > 0.5) {
          ctx.lineTo(na.x, nb.y)
          ctx.lineTo(nb.x, nb.y)
        } else {
          ctx.lineTo(nb.x, na.y)
          ctx.lineTo(nb.x, nb.y)
        }
        ctx.stroke()
      }

      /* Draw nodes */
      for (const n of nodes) {
        const mouseDist = Math.sqrt((mx - n.x) ** 2 + (my - n.y) ** 2)
        const glow = Math.max(0, 1 - mouseDist / 150)

        const baseAlpha = dark ? 0.15 : 0.2
        const alpha = baseAlpha + glow * 0.6
        const r = n.radius + glow * 3

        if (glow > 0.1) {
          ctx.shadowColor = `rgba(${glowColor},${glow * 0.5})`
          ctx.shadowBlur = 12
        } else {
          ctx.shadowColor = "transparent"
          ctx.shadowBlur = 0
        }

        ctx.fillStyle = `rgba(${nodeColor},${alpha})`
        ctx.beginPath()
        ctx.arc(n.x, n.y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.shadowColor = "transparent"
      ctx.shadowBlur = 0

      raf = requestAnimationFrame(draw)
    }

    draw()
    const parent = containerRef.current
    parent?.addEventListener("mousemove", handleMouseMove)

    const resize = () => {
      if (!canvas) return
      const rect = containerRef.current?.getBoundingClientRect()
      if (rect) {
        canvas.width = rect.width * (window.devicePixelRatio || 1)
        canvas.height = rect.height * (window.devicePixelRatio || 1)
        canvas.style.width = `${rect.width}px`
        canvas.style.height = `${rect.height}px`
        ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1)
      }
    }
    resize()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(raf)
      parent?.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resize)
    }
  }, [canvasRef, containerRef, dark, handleMouseMove])
}

/* ------------------------------------------------------------------ */
/*  Step Card                                                          */
/* ------------------------------------------------------------------ */
function StepCard({
  step,
  index,
  progress,
}: {
  step: (typeof STEPS)[0]
  index: number
  progress: number
}) {
  const Icon = step.icon
  const isLeft = index % 2 === 0

  /* Determine reveal state */
  const stepReached = progress >= step.progress
  const stepPassed = progress >= step.progress + 0.1

  /* 3D reveal interpolation */
  const revealProgress = Math.min(1, Math.max(0, (progress - step.progress) / 0.08))

  const rotateX = -20 + revealProgress * 20
  const opacity = revealProgress
  const scale = 0.9 + revealProgress * 0.1

  return (
    <div
      className={`flex items-start gap-4 md:gap-12 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
      style={{
        perspective: "800px",
        opacity,
        transform: `rotateX(${rotateX}deg) scale(${scale})`,
        transition: "opacity 0.05s, transform 0.05s",
      }}
    >
      {/* Content side */}
      <div className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"} text-left`}>
        <div
          className={`flex items-center gap-3 mb-2 ${isLeft ? "md:justify-end" : "md:justify-start"} justify-start`}
        >
          <span
            className="text-xs font-mono font-bold text-white/40 tracking-widest"
            style={{ fontFamily: "var(--font-mono), monospace" }}
          >
            0{step.number}
          </span>
          <h3 className="text-lg md:text-2xl font-semibold text-white tracking-tight">
            {step.title}
          </h3>
          {stepPassed && (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              suppressHydrationWarning
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/50"
            >
              <Check className="w-3 h-3 text-emerald-400" />
            </motion.span>
          )}
        </div>
        <p className="text-sm text-gray-400 leading-relaxed max-w-xs md:max-w-md">
          {step.description}
        </p>
      </div>

      {/* Center icon node */}
      <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12 shrink-0 z-10">
        <div
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border transition-colors duration-300 ${
            stepReached
              ? "bg-white/10 border-white/30"
              : "bg-white/[0.02] border-white/10"
          }`}
        >
          <Icon className={`w-4 h-4 md:w-5 md:h-5 transition-colors duration-300 ${stepReached ? "text-white" : "text-white/40"}`} />
        </div>
      </div>

      {/* Spacer for zigzag alignment */}
      <div className="flex-1 hidden md:block" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */
export default function HowItWorksSection() {
  const outerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end start"],
  })

  const rawProgress = useTransform(scrollYProgress, [0, 0.65], [0, 1])

  const [progress, setProgress] = useState(0)

  useMotionValueEvent(rawProgress, "change", (v) => {
    setProgress(Math.max(0, Math.min(1, v)))
  })

  /* Canvas background */
  useCircuitBackground(canvasRef, containerRef, true)

  return (
    <div ref={outerRef} className="relative min-h-[300vh]">
      <div
        ref={stickyRef}
        className="h-screen sticky top-0 w-full bg-[#0A0A0A]"
      >
        {/* Animated Canvas Background */}
        <div ref={containerRef} className="absolute inset-0" style={{ zIndex: 0, transform: "translateZ(0)" }}>
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 md:px-8">
          {/* Section Header */}
          <div className="text-center mt-6 md:mt-10 mb-4 md:mb-6 shrink-0">
            <span className="inline-block px-4 py-1.5 bg-white/5 text-white/60 text-xs font-medium tracking-wider uppercase rounded-full mb-4 border border-white/10">
              Our Process
            </span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight">
              How Your Automation
              <br />
              <span className="text-white/40">Gets Built</span>
            </h2>
          </div>

          {/* Steps Area */}
          <div className="relative flex-1 w-full max-w-4xl flex flex-col md:flex-row items-stretch min-h-0">
            {/* Steps column */}
            <div className="flex-1 relative">
              {/* Steps */}
              <div className="relative flex flex-col justify-center pt-1 pb-2 md:pt-2 md:pb-4 pl-10 md:pl-0 gap-4 md:gap-5">
                {STEPS.map((step, i) => (
                  <StepCard
                    key={step.number}
                    step={step}
                    index={i}
                    progress={progress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}