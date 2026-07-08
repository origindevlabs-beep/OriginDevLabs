"use client"

import { useState, useEffect, useCallback, useRef } from "react"

/**
 * Returns normalized mouse position (0–1) relative to a ref element.
 * Defaults to { x: 0.5, y: 0.5 } (center) when mouse hasn't moved yet.
 */
export function useMousePosition(ref: React.RefObject<HTMLElement | null>) {
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 })

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    setPosition({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) })
  }, [ref])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => el.removeEventListener("mousemove", handleMouseMove)
  }, [ref, handleMouseMove])

  return position
}