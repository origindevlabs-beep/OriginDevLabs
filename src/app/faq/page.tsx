import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { FAQFullSection } from "@/components/sections/FAQSection"
import FooterSection from "@/components/sections/FooterSection"
import Navbar from "@/components/sections/Navbar"

export const metadata: Metadata = {
  title:
    "FAQ | Common Questions About Automation, Web Development & Custom Software | Origin Dev Labs",
  description:
    "Get answers to the most common questions about workflow automation costs, AI chatbot development, custom software pricing, web development timelines, UI/UX design, business intelligence dashboards, and digital product development.",
  keywords: [
    "FAQ",
    "workflow automation cost",
    "AI chatbot development cost",
    "custom software pricing",
    "website development cost",
    "UI UX design cost",
    "MVP development cost",
    "business intelligence dashboard",
    "how long does automation take",
    "custom software vs SaaS",
    "smart assistant vs virtual assistant",
    "AI chatbot vs FAQ chatbot",
    "automation replace jobs",
    "custom website timeline",
    "dashboard development cost",
  ],
  openGraph: {
    title: "FAQ | Origin Dev Labs",
    description:
      "Everything you need to know about our automation, development, and design services before getting started.",
    siteName: "Origin Dev Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FAQ | Origin Dev Labs",
    description:
      "Common questions about automation, web development, and custom software — answered.",
  },
  alternates: {
    canonical: "https://origindevlabs.com/faq",
  },
}

export default function FAQPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col">
        {/* Page Hero */}
        <section className="pt-32 pb-12 md:pt-40 md:pb-16 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <h1
              className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Frequently Asked Questions
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Everything you need to know before getting started.
            </p>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="pb-24 md:pb-32 px-4 bg-white">
          <FAQFullSection />
        </section>

        {/* Bottom CTA */}
        <section className="py-24 md:py-32 px-4 text-center bg-white border-t border-gray-100">
          <div className="max-w-2xl mx-auto">
            <h2
              className="text-3xl md:text-4xl font-semibold tracking-tight mb-4 text-gray-900"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Book a free consultation and we&apos;ll walk you through
              everything — no sales pressure, just honest answers.
            </p>
            <Link
              href="/get-started"
              className="animate-cta-pulse inline-flex items-center gap-2 px-8 py-3.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
            >
              Get Started <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </main>
      <FooterSection />
    </>
  )
}