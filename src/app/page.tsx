"use client"

import { useRef, useState } from "react"
import LoadScreen from "@/components/sections/LoadScreen"
import Navbar from "@/components/sections/Navbar"
import HeroSection from "@/components/sections/HeroSection"
import NewsStrip from "@/components/sections/NewsStrip"
import TrustBar from "@/components/sections/TrustBar"
import ServicesSection from "@/components/sections/ServicesSection"
import HowItWorksSection from "@/components/sections/HowItWorksSection"
import ProblemSolutionSection from "@/components/sections/ProblemSolutionSection"
import TestimonialsSection from "@/components/sections/TestimonialsSection"
import { FAQFeaturedSection } from "@/components/sections/FAQSection"
import CTASection from "@/components/sections/CTASection"
import FooterSection from "@/components/sections/FooterSection"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const [ctaVisible, setCtaVisible] = useState(false)

  return (
    <LoadScreen>
      <Navbar
        ctaVisible={ctaVisible}
        heroSectionRef={heroRef as React.RefObject<HTMLElement | null>}
      />
      <main className="min-h-screen flex flex-col">
        {/* Hero: 100vh scroll container */}
        <div ref={heroRef} className="h-screen w-full relative shrink-0">
          <HeroSection />
        </div>

        <NewsStrip />
        <TrustBar />
        <ServicesSection />
        <HowItWorksSection />
        <ProblemSolutionSection />
        <TestimonialsSection />
        <FAQFeaturedSection />
        <CTASection onVisibilityChange={setCtaVisible} />
      </main>
      <FooterSection />
    </LoadScreen>
  )
}