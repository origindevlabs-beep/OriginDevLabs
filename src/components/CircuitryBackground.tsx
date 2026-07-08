"use client"

import { useEffect, useRef } from "react"

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
 * Used by HeroSection and ProblemSolutionSection.
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

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isLight = mode === "light"
    const nodeRGB = isLight ? "255,255,255" : "0,0,0"

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
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

      nodes.forEach((node, i) => {
        nodes.forEach((other, j) => {
          if (i !== j) {
            const dist = Math.hypot(node.x - other.x, node.y - other.y)
            if (dist < spacing * 1.5 && Math.random() > 0.6) {
              node.connections.push(j)
            }
          }
        })
      })

      nodesRef.current = nodes
    }

    resize()
    window.addEventListener("resize", resize)

    let time = 0
    const animate = () => {
      time += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const nodes = nodesRef.current
      const mx = mousePosition.x * canvas.width
      const my = mousePosition.y * canvas.height

      // Draw connections
      ctx.strokeStyle = `rgba(${nodeRGB}, 0.03)`
      ctx.lineWidth = 1
      nodes.forEach((node) => {
        node.connections.forEach((j) => {
          const other = nodes[j]
          const distToMouse = Math.hypot(node.x - mx, node.y - my)
          const alpha = Math.max(0.02, 0.08 - distToMouse / 2000)
          ctx.strokeStyle = `rgba(${nodeRGB}, ${alpha})`
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(other.x, other.y)
          ctx.stroke()
        })
      })

      // Draw nodes
      nodes.forEach((node) => {
        const distToMouse = Math.hypot(node.x - mx, node.y - my)
        const glow = Math.max(0, 1 - distToMouse / 300)
        const baseRadius = 1.5
        const radius = baseRadius + glow * 2

        // Node glow
        if (glow > 0.1) {
          const gradient = ctx.createRadialGradient(
            node.x,
            node.y,
            0,
            node.x,
            node.y,
            radius * 4
          )
          gradient.addColorStop(0, `rgba(${nodeRGB}, ${glow * 0.15})`)
          gradient.addColorStop(1, `rgba(${nodeRGB}, 0)`)
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(node.x, node.y, radius * 4, 0, Math.PI * 2)
          ctx.fill()
        }

        // Node dot
        ctx.fillStyle = `rgba(${nodeRGB}, ${0.1 + glow * 0.3})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2)
        ctx.fill()

        // Pulse effect
        node.pulse += 0.02
        const pulseRadius = radius + Math.sin(node.pulse) * 2 * glow
        if (glow > 0.2) {
          ctx.strokeStyle = `rgba(${nodeRGB}, ${glow * 0.1})`
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.arc(node.x, node.y, pulseRadius + 4, 0, Math.PI * 2)
          ctx.stroke()
        }
      })

      // Draw traveling pulses along connections
      nodes.forEach((node) => {
        if (Math.random() > 0.995 && node.connections.length > 0) {
          const targetIdx =
            node.connections[
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
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [mousePosition, mode])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
    />
  )
}