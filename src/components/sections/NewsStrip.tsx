"use client"

export default function NewsStrip() {
  const message =
    "NOW ACCEPTING PROJECTS FOR Q3 2026 \u2014 BOOK YOUR FREE CONSULTATION TODAY"

  return (
    <div className="relative w-full bg-[#0A0A0A] overflow-hidden h-12 flex items-center">
      <div className="animate-marquee flex whitespace-nowrap">
        {/* Double the content for seamless loop */}
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className="inline-flex items-center text-white text-xs font-medium uppercase tracking-[0.1em] px-4"
          >
            <span className="mr-4 inline-block w-1.5 h-1.5 rounded-full bg-white/60" />
            {message}
          </span>
        ))}
      </div>
    </div>
  )
}