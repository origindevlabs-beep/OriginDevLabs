"use client"

import * as React from "react"
import { useState, useEffect } from "react"

import { VariantProps, cva } from "class-variance-authority"
import {
  HTMLMotionProps,
  MotionValue,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react"

import { cn } from "@/lib/utils"
import { Star, X, ChevronDown } from "lucide-react"

const cardVariants = cva("absolute will-change-transform", {
  variants: {
    variant: {
      dark: "flex size-full flex-col items-start justify-between gap-4 rounded-2xl border border-stone-700/50 bg-[#1a1a1a] p-6 md:p-8 backdrop-blur-md",
      light:
        "flex size-full flex-col items-start justify-between gap-4 rounded-2xl border border-gray-200/50 bg-[#FAFAF8] p-6 md:p-8 backdrop-blur-md shadow-sm",
    },
  },
  defaultVariants: {
    variant: "light",
  },
})

interface ReviewProps extends React.HTMLAttributes<HTMLDivElement> {
  rating: number
  maxRating?: number
}

interface CardStickyProps
  extends HTMLMotionProps<"div">,
    VariantProps<typeof cardVariants> {
  arrayLength: number
  index: number
  incrementY?: number
  incrementZ?: number
  incrementRotation?: number
}

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>
}

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined)

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext)
  if (context === undefined) {
    throw new Error(
      "useContainerScrollContext must be used within a ContainerScrollContextProvider"
    )
  }
  return context
}

export const ContainerScroll: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children, style, className, ...props }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end end"],
  })

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn("relative min-h-svh w-full", className)}
        style={{ perspective: "1000px", ...style }}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  )
}
ContainerScroll.displayName = "ContainerScroll"

export const CardsContainer: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
      ref={containerRef}
      className={cn("relative", className)}
      style={{ perspective: "1000px", ...props.style }}
      {...props}
    >
      {children}
    </div>
  )
}
CardsContainer.displayName = "CardsContainer"

export const CardTransformed = React.forwardRef<
  HTMLDivElement,
  CardStickyProps
>(
  (
    {
      arrayLength,
      index,
      incrementY = 10,
      incrementZ = 10,
      incrementRotation = -index + 90,
      className,
      variant,
      style,
      ...props
    },
    ref
  ) => {
    const { scrollYProgress } = useContainerScrollContext()

    const start = index / (arrayLength + 1)
    const end = (index + 1) / (arrayLength + 1)
    const range = React.useMemo(() => [start, end], [start, end])
    const rotateRange = [range[0] - 1.5, range[1] / 1.5]

    const y = useTransform(scrollYProgress, range, ["0%", "-180%"])
    const rotate = useTransform(scrollYProgress, rotateRange, [
      incrementRotation,
      0,
    ])
    const transform = useMotionTemplate`translateZ(${
      index * incrementZ
    }px) translateY(${y}) rotate(${rotate}deg)`

    const dx = useTransform(scrollYProgress, rotateRange, [4, 0])
    const dy = useTransform(scrollYProgress, rotateRange, [4, 12])
    const blur = useTransform(scrollYProgress, rotateRange, [2, 24])
    const alpha = useTransform(scrollYProgress, rotateRange, [0.15, 0.2])
    const filter =
      variant === "light"
        ? useMotionTemplate`drop-shadow(${dx}px ${dy}px ${blur}px rgba(0,0,0,${alpha}))`
        : "none"

    const cardStyle = {
      top: index * incrementY,
      transform,
      backfaceVisibility: "hidden" as const,
      zIndex: (arrayLength - index) * incrementZ,
      filter,
      ...style,
    }

    return (
      <motion.div
        layout="position"
        ref={ref}
        style={cardStyle}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
CardTransformed.displayName = "CardTransformed"

export const ReviewStars = React.forwardRef<HTMLDivElement, ReviewProps>(
  ({ rating, maxRating = 5, className, ...props }, ref) => {
    const filledStars = Math.floor(rating)
    const fractionalPart = rating - filledStars
    const emptyStars = maxRating - filledStars - (fractionalPart > 0 ? 1 : 0)

    return (
      <div
        className={cn("flex items-center gap-1", className)}
        ref={ref}
        {...props}
      >
        <div className="flex items-center">
          {[...Array(filledStars)].map((_, index) => (
            <Star
              key={`filled-${index}`}
              className="size-3.5 fill-gray-900 text-gray-900"
            />
          ))}
          {fractionalPart > 0 && (
            <div className="relative size-3.5">
              <Star className="absolute size-3.5 text-gray-300" />
              <div
                className="absolute overflow-hidden"
                style={{ width: `${fractionalPart * 100}%` }}
              >
                <Star className="size-3.5 fill-gray-900 text-gray-900" />
              </div>
            </div>
          )}
          {[...Array(emptyStars)].map((_, index) => (
            <Star
              key={`empty-${index}`}
              className="size-3.5 text-gray-300"
            />
          ))}
        </div>
        <span className="text-xs text-gray-500 ml-1">{rating.toFixed(1)}</span>
        <p className="sr-only">{rating}</p>
      </div>
    )
  }
)
ReviewStars.displayName = "ReviewStars"

// --- Testimonial Data ---
const TESTIMONIALS = [
  {
    id: 1,
    name: "Marcus Chen",
    role: "Warehouse Manager",
    company: "Phoenix Distribution Co",
    rating: 5.0,
    quote: "We were manually entering 200+ orders a day into three different systems. ODL connected everything. Orders now flow straight from our WMS to shipping labels to customer notifications. We cut processing time from 4 hours to 20 minutes.",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "Office Manager",
    company: "Bright Horizon Family Practice",
    rating: 4.8,
    quote: "Patient no-shows were costing us $8,000 a month. ODL built an automated reminder system that texts patients 48 hours and 2 hours before their appointment. No-shows dropped 67% in the first quarter.",
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Managing Broker",
    company: "Riverstone Properties",
    rating: 4.9,
    quote: "Our agents were spending more time on paperwork than showing houses. ODL automated our entire client intake, document collection, and follow-up process. Each agent now handles 30% more clients without burning out.",
  },
  {
    id: 4,
    name: "Jessica Thompson",
    role: "Owner",
    company: "Bloom & Grow Nursery",
    rating: 4.7,
    quote: "I was tracking inventory across four locations using spreadsheets and hoping for the best. ODL built a real-time dashboard that shows stock levels, alerts me when supplies run low, and auto-generates purchase orders. Haven't lost a sale to stockout in six months.",
  },
  {
    id: 5,
    name: "Michael Okafor",
    role: "COO",
    company: "Atlas Freight Solutions",
    rating: 5.0,
    quote: "We had three people whose full-time job was tracking shipments and calling carriers for updates. ODL automated the entire tracking pipeline. Those three people now handle account management.",
  },
  {
    id: 6,
    name: "Rachel Kim",
    role: "Practice Manager",
    company: "Skinlux Dermatology",
    rating: 4.8,
    quote: "Our front desk was buried in intake forms, insurance verification, and appointment scheduling. ODL built a patient portal that handles all of it before they walk in the door. We see 15 more patients a day now with the same staff.",
  },
  {
    id: 7,
    name: "James Whitfield",
    role: "Partner",
    company: "Whitfield & Associates Law",
    rating: 4.9,
    quote: "We were losing client documents in email threads and spending hours each week playing phone tag. ODL set up a client portal with automated intake, document requests, and status updates. Client satisfaction scores went from 3.6 to 4.7.",
  },
  {
    id: 8,
    name: "Amanda Foster",
    role: "Founder",
    company: "Peak Performance Fitness",
    rating: 4.8,
    quote: "Managing class schedules, membership billing, and instructor payroll across three locations was a full-time job in itself. ODL automated all of it. I stopped being an admin and went back to being a fitness coach.",
  },
  {
    id: 9,
    name: "Carlos Mendoza",
    role: "Owner",
    company: "Mendoza Construction Group",
    rating: 4.7,
    quote: "Our project managers were tracking everything in their heads and text messages. ODL built a project management system that handles scheduling, material orders, crew assignments, and client updates. We haven't missed a deadline in four months.",
  },
  {
    id: 10,
    name: "Lauren Chen",
    role: "Office Manager",
    company: "Paws & Claws Veterinary",
    rating: 4.9,
    quote: "We were manually calling every client for vaccine reminders and appointment follow-ups. ODL automated the entire communication pipeline. Client retention jumped 40%.",
  },
  {
    id: 11,
    name: "Brian Callahan",
    role: "CEO",
    company: "Callahan Marketing Group",
    rating: 4.8,
    quote: "Our team was copying data between our CRM, project management tool, and invoicing system multiple times a day. ODL connected them all. We reclaimed about 12 hours a week across the team.",
  },
  {
    id: 12,
    name: "Priya Patel",
    role: "Owner",
    company: "Sweet Leaf Bakery",
    rating: 5.0,
    quote: "I was waking up at 4 AM to manually enter wholesale orders from three different platforms into my production schedule. ODL automated the entire flow. Orders sync overnight, production lists are ready when I walk in. I finally sleep past 4.",
  },
  {
    id: 13,
    name: "Tyler Brooks",
    role: "Director of Operations",
    company: "Brooks Property Management",
    rating: 4.9,
    quote: "Managing 340 rental units meant 340 sets of lease renewals, maintenance requests, and payment reminders. ODL automated tenant communications, maintenance routing, and payment tracking. Our response time went from 3 days to 4 hours.",
  },
  {
    id: 14,
    name: "Stephanie Nguyen",
    role: "CTO",
    company: "Lumina Tech Solutions",
    rating: 4.8,
    quote: "We built our own internal tools but they were held together with duct tape and tribal knowledge. ODL rebuilt our entire operations stack. Everything talks to everything now.",
  },
  {
    id: 15,
    name: "Robert Harris",
    role: "Plant Manager",
    company: "Harris Manufacturing",
    rating: 4.7,
    quote: "We were tracking production metrics on whiteboards and spending two hours every morning compiling reports for management. ODL built dashboards that update in real time. Morning meetings went from 45 minutes to 10.",
  },
  {
    id: 16,
    name: "Emily Watson",
    role: "Head of School",
    company: "Crestwood Academy",
    rating: 4.9,
    quote: "Enrollment, scheduling, parent communications, billing — our admin team was drowning. ODL automated the entire school operations workflow. Parents get updates automatically, billing runs itself, and our admin team actually leaves at 5 now.",
  },
  {
    id: 17,
    name: "Marcus Johnson",
    role: "Operations Director",
    company: "Urban Plate Restaurant Group",
    rating: 4.8,
    quote: "We were manually updating menus across five delivery platforms every time a price changed. ODL built a system that syncs inventory, pricing, and menus across all platforms in real time. We stopped losing sales to outdated listings.",
  },
  {
    id: 18,
    name: "Dana Sullivan",
    role: "Owner",
    company: "Sullivan Insurance Agency",
    rating: 4.7,
    quote: "Following up on claims, processing paperwork, and managing renewals was eating my team alive. ODL automated our entire claims tracking and renewal reminder system. We're handling 40% more policies with the same three people.",
  },
  {
    id: 19,
    name: "Alex Rivera",
    role: "Founder",
    company: "Rivera Creative Studio",
    rating: 5.0,
    quote: "I was spending my weekends doing invoicing, contract follow-ups, and project status updates. ODL automated the entire client lifecycle — from proposal to payment. I got my weekends back.",
  },
  {
    id: 20,
    name: "Megan O'Brien",
    role: "Owner",
    company: "Green Valley Landscaping",
    rating: 4.8,
    quote: "Scheduling 12 crews across 60+ weekly routes was a nightmare. One sick call and the whole day fell apart. ODL built a routing and scheduling system that auto-adjusts when things change. We run 20% more jobs with fewer headaches.",
  },
  {
    id: 21,
    name: "Kevin Tran",
    role: "Owner",
    company: "Tran Pharmacy Group",
    rating: 4.9,
    quote: "We were manually processing refill reminders, insurance verifications, and patient notifications across two locations. ODL automated everything. Refill compliance went up 35% and we stopped losing patients to pharmacies that remembered to call.",
  },
  {
    id: 22,
    name: "Lisa Campbell",
    role: "Founder",
    company: "Campbell Consulting",
    rating: 4.8,
    quote: "As a solo consultant, I was the sales team, the project manager, and the admin. ODL built me an automated client onboarding system. It's like having a full-time assistant for a fraction of the cost.",
  },
  {
    id: 23,
    name: "Thomas Reed",
    role: "Operations Manager",
    company: "Reed & Sons Logistics",
    rating: 4.9,
    quote: "Our dispatch team was spending 3 hours every morning assigning routes manually. ODL built an intelligent routing system that optimizes in real-time based on traffic, driver availability, and delivery windows. We now handle 25% more deliveries with the same fleet.",
  },
  {
    id: 24,
    name: "Nicole Adams",
    role: "Practice Administrator",
    company: "Adams Medical Group",
    rating: 4.7,
    quote: "Insurance verification was eating 20 hours of staff time every week. ODL automated the entire process — eligibility checks, pre-authorizations, benefits verification. Our billing team now focuses on revenue cycle instead of paperwork.",
  },
  {
    id: 25,
    name: "Victor Morales",
    role: "General Manager",
    company: "Coastal Hotels & Resorts",
    rating: 5.0,
    quote: "Guest requests were falling through the cracks during peak season. ODL implemented a centralized system that routes requests to the right department, tracks resolution time, and follows up automatically. Guest satisfaction scores jumped from 4.1 to 4.8.",
  },
  {
    id: 26,
    name: "Angela Park",
    role: "Head of People",
    company: "NovaTech Solutions",
    rating: 4.8,
    quote: "Onboarding new hires used to take 2 weeks ofHR time per person. ODL automated document collection, training scheduling, equipment provisioning, and compliance tracking. New hires are productive in 3 days now.",
  },
  {
    id: 27,
    name: "Derek Washington",
    role: "Fleet Manager",
    company: "Washington Transportation",
    rating: 4.9,
    quote: "We were losing $15K a month to unauthorized vehicle usage and maintenance oversights. ODL built a fleet management system that tracks usage, schedules preventive maintenance, and flags anomalies. Costs dropped 30% in two months.",
  },
  {
    id: 28,
    name: "Samantha Brooks",
    role: "Director of Marketing",
    company: "Elevate Digital Agency",
    rating: 4.8,
    quote: "Our team was manually pulling reports from 8 different platforms for every client meeting. ODL integrated all our data sources into one dashboard. We went from 4 hours of report prep to 10 minutes.",
  },
  {
    id: 29,
    name: "Ryan Chen",
    role: "VP of Operations",
    company: "Pacific Rim Imports",
    rating: 4.7,
    quote: "Customs documentation and compliance tracking was our biggest bottleneck. ODL automated document generation, deadline tracking, and regulatory submissions. Our clearance time dropped from 5 days to 18 hours.",
  },
  {
    id: 30,
    name: "Diana Foster",
    role: "Owner",
    company: "Foster Family Dentistry",
    rating: 5.0,
    quote: "We were manually calling patients for recalls and following up on treatment plans. ODL automated our entire patient communication system. Recall compliance went from 60% to 92% in three months.",
  },
  {
    id: 31,
    name: "Marcus Williams",
    role: "COO",
    company: "Summit Construction Group",
    rating: 4.9,
    quote: "Project managers were spending more time updating spreadsheets than managing projects. ODL built a real-time project dashboard that pulls data from our tools automatically. We now have visibility across all 12 active projects without a single status meeting.",
  },
  {
    id: 32,
    name: "Olivia Martinez",
    role: "Practice Manager",
    company: "Sunshine Pediatric Care",
    rating: 4.8,
    quote: "Parent communication was inconsistent and time-consuming. ODL automated appointment reminders, vaccination schedules, school form requests, and billing notifications. Parents love the consistency, and our phone calls dropped 60%.",
  },
  {
    id: 33,
    name: "Nathan Brooks",
    role: "Director of IT",
    company: "Meridian Financial Services",
    rating: 4.7,
    quote: "Our compliance reporting was a nightmare of manual data gathering. ODL automated the entire compliance workflow — data collection, report generation, audit trail creation. What used to take 3 weeks now takes 2 days.",
  },
  {
    id: 34,
    name: "Isabella Nguyen",
    role: "Founder",
    company: "Bloom Beauty Co",
    rating: 5.0,
    quote: "Managing influencer partnerships across 3 platforms was chaos. ODL built a system that tracks deliverables, monitors performance, processes payments, and schedules content. I went from hiring a full-time coordinator to handling it myself.",
  },
  {
    id: 35,
    name: "Christopher Lee",
    role: "Operations Director",
    company: "Pacific Northwest Brewing",
    rating: 4.9,
    quote: "Our inventory management across taproom, distribution, and wholesale was disconnected. ODL unified everything into one system. We reduced overstock waste by 35% and never run out of popular SKUs anymore.",
  },
  {
    id: 36,
    name: "Patricia Adams",
    role: "Office Manager",
    company: "Adams & Partners Law Firm",
    rating: 4.8,
    quote: "Client intake was a 45-minute process involving 3 different forms and manual data entry. ODL built a digital intake system that clients complete before their first visit. We reduced intake time to 5 minutes and eliminated data entry errors.",
  },
]

// --- Main Testimonials Component ---
export default function TestimonialsSection() {
  const [visibleCards, setVisibleCards] = useState(8)
  const [showSkip, setShowSkip] = useState(false)
  const sectionRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  })

  // Show skip button after scrolling through a few cards
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      if (v > 0.15) {
        setShowSkip(true)
      } else {
        setShowSkip(false)
      }
    })
    return unsubscribe
  }, [scrollYProgress])

  const handleSkip = () => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }

  const displayedTestimonials = TESTIMONIALS.slice(0, visibleCards)

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#FAFAF8] overflow-hidden"
    >
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <svg width="100%" height="100%">
          <defs>
            <pattern id="testimonialGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="0.5" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#testimonialGrid)" />
        </svg>
      </div>

      {/* Skip Button */}
      <motion.button
        onClick={handleSkip}
        className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full shadow-lg hover:bg-gray-800 transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: showSkip ? 1 : 0, y: showSkip ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        style={{ pointerEvents: showSkip ? "auto" : "none" }}
      >
        Skip Section
        <ChevronDown className="w-4 h-4" />
      </motion.button>

      <ContainerScroll className="min-h-[300vh] py-20">
        {/* Section Header */}
        <div className="sticky top-0 z-0 h-screen flex flex-col items-center justify-start pt-20 pointer-events-none">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          >
            <span className="inline-block px-4 py-1.5 bg-gray-100 text-gray-600 text-xs font-medium tracking-wider uppercase rounded-full mb-5 border border-gray-200">
              Client Stories
            </span>
            <h2 className="text-3xl md:text-5xl font-semibold text-gray-900 tracking-tight mb-3">
              Businesses That Run on
              <br />
              <span className="text-gray-400">ODL Systems</span>
            </h2>
            <p className="text-base text-gray-600 max-w-lg mx-auto">
              Every testimonial here is a business that stopped doing things manually
              and started running smarter.
            </p>
          </motion.div>

          {/* Aggregate Rating */}
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gray-900 text-gray-900" />
              ))}
            </div>
            <span className="text-lg font-semibold text-gray-900">4.8</span>
            <span className="text-sm text-gray-500">/ 5.0</span>
          </motion.div>
          <motion.p
            className="text-xs text-gray-500 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            Based on 50+ client projects
          </motion.p>
        </div>

        {/* Cards Stack */}
        <CardsContainer className="sticky top-32 mx-auto w-full max-w-md h-[400px]">
          {displayedTestimonials.map((testimonial, index) => (
            <CardTransformed
              key={testimonial.id}
              arrayLength={displayedTestimonials.length}
              index={index}
              incrementY={8}
              incrementZ={10}
              variant="light"
              className="w-full"
            >
              <div className="flex flex-col h-full">
                {/* Quote */}
                <div className="flex-1">
                  <p className="text-sm md:text-base text-gray-700 leading-relaxed italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                </div>

                {/* Author */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                  <ReviewStars rating={testimonial.rating} />
                </div>
              </div>
            </CardTransformed>
          ))}
        </CardsContainer>

        {/* Bottom Spacer */}
        <div className="h-[20vh]" />
      </ContainerScroll>

      {/* Load More */}
      {visibleCards < TESTIMONIALS.length && (
        <div className="relative z-10 flex justify-center pb-20">
          <motion.button
            onClick={() => setVisibleCards((prev) => Math.min(prev + 8, TESTIMONIALS.length))}
            className="px-6 py-3 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-800 transition-colors"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Load More Stories
          </motion.button>
        </div>
      )}
    </section>
  )
}
