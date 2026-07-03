"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Send, ArrowUp } from "lucide-react"

// --- Social Icons ---
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 10.86 4.46V13a8.28 8.28 0 0 0 5.58 2.15v-3.44a4.85 4.85 0 0 1-5.58-2.72V6.69h3.58z" />
  </svg>
)

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
)

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

// --- Footer Component ---
export default function FooterSection() {
  const [email, setEmail] = React.useState("")
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      setEmail("")
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-[#0a0a0a] text-white overflow-hidden">
      {/* Subtle Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="footerDots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="12" cy="12" r="0.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerDots)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            {/* Logo */}
            <div className="mb-6">
              <a href="/" className="inline-block">
                <img
                  src="/logo-white.png"
                  alt="Origin Dev Labs"
                  className="h-8 w-auto"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.style.display = "none"
                    target.parentElement!.innerHTML = '<span class="text-xl font-bold tracking-tight">ODL</span>'
                  }}
                />
              </a>
            </div>

            <p className="mb-6 text-sm text-gray-400 leading-relaxed">
              Automation systems that work while you sleep. Built in Orlando, serving businesses everywhere.
            </p>

            {/* Newsletter */}
            <div>
              <p className="mb-3 text-sm font-medium text-white">Stay updated</p>
              <form onSubmit={handleSubmit} className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 pr-12 bg-white/5 border border-white/10 rounded-lg text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-white/30 transition-colors"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-2 bg-white/10 rounded-md hover:bg-white/20 transition-colors"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </form>
              {isSubmitted && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs text-gray-400"
                >
                  Thanks for subscribing!
                </motion.p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">Company</h3>
            <nav className="space-y-3">
              <a href="/about" className="block text-sm text-gray-400 hover:text-white transition-colors">
                About
              </a>
              <a href="/services" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Services
              </a>
              <a href="/testimonials" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Client Stories
              </a>
              <a href="/get-started" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Get Started
              </a>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">Services</h3>
            <nav className="space-y-3">
              <a href="/services#automation" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Workflow Automation
              </a>
              <a href="/services#agents" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Intelligent Agents
              </a>
              <a href="/services#assistants" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Smart Assistants
              </a>
              <a href="/services#intelligence" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Business Intelligence
              </a>
              <a href="/services#custom" className="block text-sm text-gray-400 hover:text-white transition-colors">
                Custom Solutions
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">Contact</h3>
            <address className="space-y-3 text-sm text-gray-400 not-italic">
              <p>100 South Orange Avenue, Suite 1200</p>
              <p>Orlando, FL 32801</p>
              <p className="pt-2">
                <a href="mailto:hello@origindevlabs.com" className="hover:text-white transition-colors">
                  hello@origindevlabs.com
                </a>
              </p>
            </address>

            {/* Social Icons */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://tiktok.com/@origindevlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a
                href="https://instagram.com/origindevlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a
                href="https://wa.me/1XXXXXXXXXX"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
              <a
                href="https://twitter.com/origindevlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                aria-label="Twitter"
              >
                <TwitterIcon className="w-4 h-4 text-gray-400 hover:text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Origin Dev Labs. All rights reserved.
          </p>

          <nav className="flex items-center gap-6 text-xs text-gray-500">
            <a href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </a>
          </nav>

          {/* Back to Top */}
          <button
            onClick={scrollToTop}
            className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp className="w-4 h-4 text-gray-400" />
          </button>
        </div>
      </div>
    </footer>
  )
}
