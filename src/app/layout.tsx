import type { Metadata } from "next"
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import ClientLayout from "@/components/ClientLayout"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
})

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Origin Dev Labs",
  url: "https://origindevlabs.com",
  logo: "https://origindevlabs.com/logo.png",
  description:
    "Origin Dev Labs builds automation systems, AI-powered chatbots, smart assistants, business intelligence dashboards, custom websites, and software that save businesses time and money.",
  email: "hello@origindevlabs.com",
  sameAs: [
    "https://tiktok.com/@origindevlabs",
    "https://instagram.com/origindevlabs",
    "https://twitter.com/origindevlabs",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: "hello@origindevlabs.com",
    availableLanguage: ["English"],
  },
}

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Origin Dev Labs",
  url: "https://origindevlabs.com",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://origindevlabs.com/faq?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
}

export const metadata: Metadata = {
  metadataBase: new URL("https://origindevlabs.com"),
  title: "Origin Dev Labs | Automation Systems That Work While You Sleep",
  description:
    "Origin Dev Labs builds automation systems, AI-powered chatbots, smart assistants, business intelligence dashboards, custom websites, and software that save businesses time and money. Free consultation.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "automation",
    "business automation",
    "workflow automation",
    "intelligent agents",
    "AI chatbot development",
    "smart assistants",
    "business intelligence dashboards",
    "web development",
    "UI UX design",
    "digital product development",
    "custom software development",
    "SaaS development",
    "MVP development",
    "Origin Dev Labs",
    "custom solutions",
    "automation consulting",
    "process automation",
    "FAQ",
  ],
  authors: [{ name: "Origin Dev Labs" }],
  openGraph: {
    title: "Origin Dev Labs | Automation Systems That Work While You Sleep",
    description:
      "Origin Dev Labs builds automation systems, smart agents, and custom solutions that save businesses time and money.",
    siteName: "Origin Dev Labs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Origin Dev Labs | Automation That Works While You Sleep",
    description:
      "We build automation systems, smart agents, and custom solutions for businesses.",
  },
  alternates: {
    canonical: "https://origindevlabs.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://owhsdxsdghuevutodkvp.supabase.co" />
      </head>
      <body className="antialiased bg-white text-gray-900">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webSiteSchema),
          }}
        />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}