import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Origin Dev Labs | Our Story & Mission",
  description: "Learn about Origin Dev Labs — our mission to make automation practical for every business, our core values, and where we're headed.",
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children
}