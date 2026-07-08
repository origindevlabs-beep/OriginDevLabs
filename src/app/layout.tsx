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

export const metadata: Metadata = {
  metadataBase: new URL("https://origindevlabs.com"),
  title: "Origin Dev Labs | Automation Systems That Work While You Sleep | Orlando, FL",
  description:
    "Origin Dev Labs builds automation systems, smart agents, and custom solutions that save businesses time and money. Based in Orlando, FL. Free consultation.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  keywords: [
    "automation",
    "business automation",
    "workflow automation",
    "intelligent agents",
    "Orlando",
    "Origin Dev Labs",
    "custom solutions",
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
      <body className="antialiased bg-white text-gray-900">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}