"use client"

import { useRef, useState } from "react"
import dynamic from "next/dynamic"
import LoadScreen from "@/components/sections/LoadScreen"
import Navbar from "@/components/sections/Navbar"
import HeroSection from "@/components/sections/HeroSection"
import FooterSection from "@/components/sections/FooterSection"

// Lazy load all below-the-fold sections — same visual, 60%+ less initial JS
const NewsStrip = dynamic(
  () => import("@/components/sections/NewsStrip").then((m) => m.default),
  { ssr: false }
)
const TrustBar = dynamic(
  () => import("@/components/sections/TrustBar").then((m) => m.default),
  { ssr: false }
)
const ServicesSection = dynamic(
  () => import("@/components/sections/ServicesSection").then((m) => m.default),
  { ssr: false }
)
const HowItWorksSection = dynamic(
  () => import("@/components/sections/HowItWorksSection").then((m) => m.default),
  { ssr: false }
)
const ProblemSolutionSection = dynamic(
  () => import("@/components/sections/ProblemSolutionSection").then((m) => m.default),
  { ssr: false }
)
const TestimonialsSection = dynamic(
  () => import("@/components/sections/TestimonialsSection").then((m) => m.default),
  { ssr: false }
)
const FAQFeaturedSection = dynamic(
  () => import("@/components/sections/FAQSection").then((m) => m.FAQFeaturedSection),
  { ssr: false }
)
const CTASection = dynamic(
  () => import("@/components/sections/CTASection").then((m) => m.default),
  { ssr: false }
)

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