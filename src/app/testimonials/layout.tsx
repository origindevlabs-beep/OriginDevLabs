import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Client Stories | Origin Dev Labs",
  description: "See what our clients say about Origin Dev Labs. 4.8/5 rating from 50+ automation projects delivered.",
}

export default function TestimonialsLayout({ children }: { children: React.ReactNode }) {
  return children
}