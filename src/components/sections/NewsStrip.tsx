"use client"

import { useMemo } from "react"

function getCurrentQuarter(): { quarter: number; year: number } {
  const now = new Date()
  const month = now.getMonth() // 0-indexed: Jan=0 ... Dec=11
  const quarter = Math.floor(month / 3) + 1 // 1-4
  return { quarter, year: now.getFullYear() }
}

export default function NewsStrip() {
  const message = useMemo(() => {
    const { quarter, year } = getCurrentQuarter()
    return `NOW ACCEPTING PROJECTS FOR Q${quarter} ${year} — BOOK YOUR FREE CONSULTATION TODAY`
  }, [])

  return (
    <div className="relative w-full h-12 bg-[#0A0A0A] overflow-hidden flex items-center">
      <div className="animate-marquee flex whitespace-nowrap">
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="inline-flex items-center px-4 text-[12px] font-medium uppercase tracking-[0.1em] text-white"
          >
            <span className="mr-4 inline-block h-1.5 w-1.5 rounded-full bg-white/60" aria-hidden="true" />
            {message}
          </span>
        ))}
      </div>
    </div>
  )
}