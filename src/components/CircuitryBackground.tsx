"use client"

import { useEffect, useRef, useCallback } from "react"

interface CircuitryBackgroundProps {
  /** Normalized mouse position (0–1) relative to the container */
  mousePosition: { x: number; y: number }
  /** Color mode: "dark" renders on white bg (black nodes), "light" renders on dark bg (white nodes) */
  mode?: "dark" | "light"
  /** Canvas opacity overlay */
  opacity?: number
}

/**
 * Shared circuitry background with mouse-reactive glow.
 * Optimized: uses mouse ref (no re-renders), batched path drawing,
 * spatial grid for connections, visibility-based pause.
 */
export default function CircuitryBackground({
  mousePosition,
  mode = "dark",
  opacity = 0.6,
}: CircuitryBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const nodesRef = useRef<
    Array<{ x: number; y: number; connections: number[]; pulse: number }>
  >([])
  const mouseRef = useRef(mousePosition)
  const isVisibleRef = useRef(true)

  // Keep mouse ref in sync without triggering re-render
  useEffect(() => {
    mouseRef.current = mousePosition
  }, [mousePosition])

  // Pause animation when section is off-screen
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
      },
      { threshold: 0 }
    )
    observer.observe(canvas.parentElement || canvas)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isLight = mode === "light"
    const nodeRGB = isLight ? "255,255,255" : "0,0,0"

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth || window.innerWidth
      canvas.height = canvas.parentElement?.offsetHeight || window.innerHeight
      generateNodes()
    }

    const generateNodes = () => {
      const nodes: Array<{
        x: number
        y: number
        connections: number[]
        pulse: number
      }> = []
      const spacing = 80
      const cols = Math.ceil(canvas.width / spacing) + 1
      const rows = Math.ceil(canvas.height / spacing) + 1

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * spacing + (row % 2 === 0 ? 0 : spacing / 2)
          const y = row * spacing
          nodes.push({
            x,
            y,
            connections: [],
            pulse: Math.random() * Math.PI * 2,
          })
        }
      }

      // Use spatial grid instead of O(n²) brute force
      const maxDist = spacing * 1.5
      const cellSize = maxDist
      const grid = new Map<string, number[]>()
      nodes.forEach((node, i) => {
        const cx = Math.floor(node.x / cellSize)
        const cy = Math.floor(node.y / cellSize)
        const key = `${cx},${cy}`
        if (!grid.has(key)) grid.set(key, [])
        grid.get(key)!.push(i)
      })

      nodes.forEach((node, i) => {
        const cx = Math.floor(node.x / cellSize)
        const cy = Math.floor(node.y / cellSize)
        // Only check neighboring cells
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const key = `${cx + dx},${cy + dy}`
            const neighbors = grid.get(key)
            if (!neighbors) continue
            for (const j of neighbors) {
              if (j <= i) continue
              const other = nodes[j]
              const dist = Math.hypot(node.x - other.x, node.y - other.y)
              if (dist < maxDist && Math.random() > 0.6) {
                node.connections.push(j)
              }
            }
          }
        }
      })

      nodesRef.current = nodes
    }

    resize()
    window.addEventListener("resize", resize)

    let time = 0
    const animate = () => {
      // Pause when off-screen
      if (!isVisibleRef.current) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      time += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const nodes = nodesRef.current
      const mx = mouseRef.current.x * canvas.width
      const my = mouseRef.current.y * canvas.height

      // Batch all connection lines into fewer draw calls
      ctx.lineWidth = 1
      // Group by approximate alpha to reduce state changes
      ctx.beginPath()
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        const distToMouse = Math.hypot(node.x - mx, node.y - my)
        const alpha = Math.max(0.02, 0.08 - distToMouse / 2000)
        // Use mid-range alpha for batching (visual difference negligible)
        const batchAlpha = alpha > 0.05 ? 0.06 : 0.03
        if (batchAlpha > 0.03) {
          for (let c = 0; c < node.connections.length; c++) {
            const other = nodes[node.connections[c]]
            if (!other) continue
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
          }
        }
      }
      ctx.strokeStyle = `rgba(${nodeRGB}, 0.04)`
      ctx.stroke()

      // Faint lines pass (low-alpha connections)
      ctx.beginPath()
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        const distToMouse = Math.hypot(node.x - mx, node.y - my)
        const alpha = Math.max(0.02, 0.08 - distToMouse / 2000)
        if (alpha <= 0.05) {
          for (let c = 0; c < node.connections.length; c++) {
            const other = nodes[node.connections[c]]
            if (!other) continue
            ctx.moveTo(node.x, node.y)
            ctx.lineTo(other.x, other.y)
          }
        }
      }
      ctx.strokeStyle = `rgba(${nodeRGB}, 0.03)`
      ctx.stroke()

      // Draw nodes — batch dots, skip gradient for distant nodes
      ctx.beginPath()
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        const distToMouse = Math.hypot(node.x - mx, node.y - my)
        const glow = Math.max(0, 1 - distToMouse / 300)
        const radius = 1.5 + glow * 2

        if (glow > 0.1) {
          // Glow gradient (only for nearby nodes)
          const gradient = ctx.createRadialGradient(
            node.x, node.y, 0,
            node.x, node.y, radius * 4
          )
          gradient.addColorStop(0, `rgba(${nodeRGB}, ${glow * 0.15})`)
          gradient.addColorStop(1, `rgba(${nodeRGB}, 0)`)
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2)
          ctx.fill()

          // Pulse ring
          node.pulse += 0.02
          if (glow > 0.2) {
            const pulseRadius = radius + Math.sin(node.pulse) * 2 * glow
            ctx.strokeStyle = `rgba(${nodeRGB}, ${glow * 0.1})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.arc(node.x, node.y, pulseRadius + 4, 0, Math.PI * 2)
            ctx.stroke()
            ctx.lineWidth = 1
          }
        }

        // Node dot
        ctx.fillStyle = `rgba(${nodeRGB}, ${0.1 + glow * 0.3})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fill()
      }

      // Traveling pulses (reduced frequency)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        if (Math.random() > 0.998 && node.connections.length > 0) {
          const targetIdx = node.connections[
            Math.floor(Math.random() * node.connections.length)
          ]
          const target = nodes[targetIdx]
          if (target) {
            const progress = (time * 0.5) % 1
            const px = node.x + (target.x - node.x) * progress
            const py = node.y + (target.y - node.y) * progress
            ctx.fillStyle = `rgba(${nodeRGB}, 0.2)`
            ctx.beginPath()
            ctx.arc(px, py, 2, 0, Math.PI * 2)
            ctx.fill()
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [mode]) // Only re-create on mode change, NOT on mousePosition

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
    />
  )
}