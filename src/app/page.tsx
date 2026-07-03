"use client"

import { useEffect } from "react"
import Lenis from "lenis"
import LoadScreen from "@/components/sections/LoadScreen"
import Navbar from "@/components/sections/Navbar"
import HeroSection from "@/components/sections/HeroSection"
import NewsStrip from "@/components/sections/NewsStrip"
import TrustBar from "@/components/sections/TrustBar"
import ServicesSection from "@/components/sections/ServicesSection"
import HowItWorksSection from "@/components/sections/HowItWorksSection"
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import CTASection from "@/components/sections/CTASection"
import FooterSection from "@/components/sections/FooterSection"

function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    return () => {
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}

export default function Home() {
  return (
    <SmoothScroll>
      <LoadScreen>
        <Navbar />
        <main>
          {/* Hero: 100vh scroll container */}
          <div className="h-screen w-full relative">
            <HeroSection />
          </div>

          <NewsStrip />
          <TrustBar />
          <ServicesSection />
          <HowItWorksSection />
          <ProblemSolutionSection />
          <TestimonialsSection />
          <CTASection />
        </main>
        <FooterSection />
      </LoadScreen>
    </SmoothScroll>
  )
}