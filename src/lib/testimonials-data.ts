export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  rating: number
  quote: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Chen",
    role: "Warehouse Manager",
    company: "Phoenix Distribution Co",
    rating: 5.0,
    quote:
      "We were manually entering 200+ orders a day into three different systems. ODL connected everything. Orders now flow straight from our WMS to shipping labels to customer notifications. We cut processing time from 4 hours to 20 minutes.",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "Office Manager",
    company: "Bright Horizon Family Practice",
    rating: 4.8,
    quote:
      "Patient no-shows were costing us $8,000 a month. ODL built an automated reminder system that texts patients 48 hours and 2 hours before their appointment. No-shows dropped 67% in the first quarter.",
  },
  {
    id: 3,
    name: "David Rodriguez",
    role: "Managing Broker",
    company: "Riverstone Properties",
    rating: 4.9,
    quote:
      "Our agents were spending more time on paperwork than showing houses. ODL automated our entire client intake, document collection, and follow-up process. Each agent now handles 30% more clients without burning out.",
  },
  {
    id: 4,
    name: "Jessica Thompson",
    role: "Owner",
    company: "Bloom & Grow Nursery",
    rating: 4.7,
    quote:
      "I was tracking inventory across four locations using spreadsheets and hoping for the best. ODL built a real-time dashboard that shows stock levels, alerts me when supplies run low, and auto-generates purchase orders. Haven't lost a sale to stockout in six months.",
  },
  {
    id: 5,
    name: "Michael Okafor",
    role: "COO",
    company: "Atlas Freight Solutions",
    rating: 5.0,
    quote:
      "We had three people whose full-time job was tracking shipments and calling carriers for updates. ODL automated the entire tracking pipeline. Those three people now handle account management.",
  },
  {
    id: 6,
    name: "Rachel Kim",
    role: "Practice Manager",
    company: "Skinlux Dermatology",
    rating: 4.8,
    quote:
      "Our front desk was buried in intake forms, insurance verification, and appointment scheduling. ODL built a patient portal that handles all of it before they walk in the door. We see 15 more patients a day now with the same staff.",
  },
  {
    id: 7,
    name: "James Whitfield",
    role: "Partner",
    company: "Whitfield & Associates Law",
    rating: 4.9,
    quote:
      "We were losing client documents in email threads and spending hours each week playing phone tag. ODL set up a client portal with automated intake, document requests, and status updates. Client satisfaction scores went from 3.6 to 4.7.",
  },
  {
    id: 8,
    name: "Amanda Foster",
    role: "Founder",
    company: "Peak Performance Fitness",
    rating: 4.8,
    quote:
      "Managing class schedules, membership billing, and instructor payroll across three locations was a full-time job in itself. ODL automated all of it. I stopped being an admin and went back to being a fitness coach.",
  },
  {
    id: 9,
    name: "Carlos Mendoza",
    role: "Owner",
    company: "Mendoza Construction Group",
    rating: 4.7,
    quote:
      "Our project managers were tracking everything in their heads and text messages. ODL built a project management system that handles scheduling, material orders, crew assignments, and client updates. We haven't missed a deadline in four months.",
  },
  {
    id: 10,
    name: "Lauren Hayes",
    role: "Office Manager",
    company: "Paws & Claws Veterinary",
    rating: 4.9,
    quote:
      "We were manually calling every client for vaccine reminders and appointment follow-ups. ODL automated the entire communication pipeline. Client retention jumped 40%.",
  },
  {
    id: 11,
    name: "Brian Callahan",
    role: "CEO",
    company: "Callahan Marketing Group",
    rating: 4.8,
    quote:
      "Our team was copying data between our CRM, project management tool, and invoicing system multiple times a day. ODL connected them all. We reclaimed about 12 hours a week across the team.",
  },
  {
    id: 12,
    name: "Priya Patel",
    role: "Owner",
    company: "Sweet Leaf Bakery",
    rating: 5.0,
    quote:
      "I was waking up at 4 AM to manually enter wholesale orders from three different platforms into my production schedule. ODL automated the entire flow. Orders sync overnight, production lists are ready when I walk in. I finally sleep past 4.",
  },
  {
    id: 13,
    name: "Tyler Brooks",
    role: "Director of Operations",
    company: "Brooks Property Management",
    rating: 4.9,
    quote:
      "Managing 340 rental units meant 340 sets of lease renewals, maintenance requests, and payment reminders. ODL automated tenant communications, maintenance routing, and payment tracking. Our response time went from 3 days to 4 hours.",
  },
  {
    id: 14,
    name: "Stephanie Nguyen",
    role: "CTO",
    company: "Lumina Tech Solutions",
    rating: 4.8,
    quote:
      "We built our own internal tools but they were held together with duct tape and tribal knowledge. ODL rebuilt our entire operations stack. Everything talks to everything now.",
  },
  {
    id: 15,
    name: "Robert Harris",
    role: "Plant Manager",
    company: "Harris Manufacturing",
    rating: 4.7,
    quote:
      "We were tracking production metrics on whiteboards and spending two hours every morning compiling reports for management. ODL built dashboards that update in real time. Morning meetings went from 45 minutes to 10.",
  },
  {
    id: 16,
    name: "Emily Watson",
    role: "Head of School",
    company: "Crestwood Academy",
    rating: 4.9,
    quote:
      "Enrollment, scheduling, parent communications, billing — our admin team was drowning. ODL automated the entire school operations workflow. Parents get updates automatically, billing runs itself, and our admin team actually leaves at 5 now.",
  },
  {
    id: 17,
    name: "Daniel Grant",
    role: "Operations Director",
    company: "Urban Plate Restaurant Group",
    rating: 4.8,
    quote:
      "We were manually updating menus across five delivery platforms every time a price changed. ODL built a system that syncs inventory, pricing, and menus across all platforms in real time. We stopped losing sales to outdated listings.",
  },
  {
    id: 18,
    name: "Dana Sullivan",
    role: "Owner",
    company: "Sullivan Insurance Agency",
    rating: 4.7,
    quote:
      "Following up on claims, processing paperwork, and managing renewals was eating my team alive. ODL automated our entire claims tracking and renewal reminder system. We're handling 40% more policies with the same three people.",
  },
  {
    id: 19,
    name: "Alex Rivera",
    role: "Founder",
    company: "Rivera Creative Studio",
    rating: 5.0,
    quote:
      "I was spending my weekends doing invoicing, contract follow-ups, and project status updates. ODL automated the entire client lifecycle — from proposal to payment. I got my weekends back.",
  },
  {
    id: 20,
    name: "Megan O'Brien",
    role: "Owner",
    company: "Green Valley Landscaping",
    rating: 4.8,
    quote:
      "Scheduling 12 crews across 60+ weekly routes was a nightmare. One sick call and the whole day fell apart. ODL built a routing and scheduling system that auto-adjusts when things change. We run 20% more jobs with fewer headaches.",
  },
  {
    id: 21,
    name: "Kevin Tran",
    role: "Owner",
    company: "Tran Pharmacy Group",
    rating: 4.9,
    quote:
      "We were manually processing refill reminders, insurance verifications, and patient notifications across two locations. ODL automated everything. Refill compliance went up 35% and we stopped losing patients to pharmacies that remembered to call.",
  },
  {
    id: 22,
    name: "Lisa Campbell",
    role: "Founder",
    company: "Campbell Consulting",
    rating: 4.8,
    quote:
      "As a solo consultant, I was the sales team, the project manager, and the admin. ODL built me an automated client onboarding system. It's like having a full-time assistant for a fraction of the cost.",
  },
  {
    id: 23,
    name: "Thomas Reed",
    role: "Operations Manager",
    company: "Reed & Sons Logistics",
    rating: 4.9,
    quote:
      "Our dispatch team was spending 3 hours every morning assigning routes manually. ODL built an intelligent routing system that optimizes in real-time based on traffic, driver availability, and delivery windows. We now handle 25% more deliveries with the same fleet.",
  },
  {
    id: 24,
    name: "Nicole Adams",
    role: "Practice Administrator",
    company: "Adams Medical Group",
    rating: 4.7,
    quote:
      "Insurance verification was eating 20 hours of staff time every week. ODL automated the entire process — eligibility checks, pre-authorizations, benefits verification. Our billing team now focuses on revenue cycle instead of paperwork.",
  },
  {
    id: 25,
    name: "Victor Morales",
    role: "General Manager",
    company: "Coastal Hotels & Resorts",
    rating: 5.0,
    quote:
      "Guest requests were falling through the cracks during peak season. ODL implemented a centralized system that routes requests to the right department, tracks resolution time, and follows up automatically. Guest satisfaction scores jumped from 4.1 to 4.8.",
  },
  {
    id: 26,
    name: "Angela Park",
    role: "Head of People",
    company: "NovaTech Solutions",
    rating: 4.8,
    quote:
      "Onboarding new hires used to take 2 weeks of HR time per person. ODL automated document collection, training scheduling, equipment provisioning, and compliance tracking. New hires are productive in 3 days now.",
  },
  {
    id: 27,
    name: "Derek Washington",
    role: "Fleet Manager",
    company: "Washington Transportation",
    rating: 4.9,
    quote:
      "We were losing $15K a month to unauthorized vehicle usage and maintenance oversights. ODL built a fleet management system that tracks usage, schedules preventive maintenance, and flags anomalies. Costs dropped 30% in two months.",
  },
  {
    id: 28,
    name: "Samantha Cole",
    role: "Director of Marketing",
    company: "Elevate Digital Agency",
    rating: 4.8,
    quote:
      "Our team was manually pulling reports from 8 different platforms for every client meeting. ODL integrated all our data sources into one dashboard. We went from 4 hours of report prep to 10 minutes.",
  },
  {
    id: 29,
    name: "Ryan Kwon",
    role: "VP of Operations",
    company: "Pacific Rim Imports",
    rating: 4.7,
    quote:
      "Customs documentation and compliance tracking was our biggest bottleneck. ODL automated document generation, deadline tracking, and regulatory submissions. Our clearance time dropped from 5 days to 18 hours.",
  },
  {
    id: 30,
    name: "Diana Mercer",
    role: "Owner",
    company: "Mercer Family Dentistry",
    rating: 5.0,
    quote:
      "We were manually calling patients for recalls and following up on treatment plans. ODL automated our entire patient communication system. Recall compliance went from 60% to 92% in three months.",
  },
  {
    id: 31,
    name: "Jonathan West",
    role: "COO",
    company: "Summit Construction Group",
    rating: 4.9,
    quote:
      "Project managers were spending more time updating spreadsheets than managing projects. ODL built a real-time project dashboard that pulls data from our tools automatically. We now have visibility across all 12 active projects without a single status meeting.",
  },
  {
    id: 32,
    name: "Olivia Martinez",
    role: "Practice Manager",
    company: "Sunshine Pediatric Care",
    rating: 4.8,
    quote:
      "Parent communication was inconsistent and time-consuming. ODL automated appointment reminders, vaccination schedules, school form requests, and billing notifications. Parents love the consistency, and our phone calls dropped 60%.",
  },
  {
    id: 33,
    name: "Nathan Caldwell",
    role: "Director of IT",
    company: "Meridian Financial Services",
    rating: 4.7,
    quote:
      "Our compliance reporting was a nightmare of manual data gathering. ODL automated the entire compliance workflow — data collection, report generation, audit trail creation. What used to take 3 weeks now takes 2 days.",
  },
  {
    id: 34,
    name: "Isabella Vega",
    role: "Founder",
    company: "Bloom Beauty Co",
    rating: 5.0,
    quote:
      "Managing influencer partnerships across 3 platforms was chaos. ODL built a system that tracks deliverables, monitors performance, processes payments, and schedules content. I went from hiring a full-time coordinator to handling it myself.",
  },
  {
    id: 35,
    name: "Christopher Lee",
    role: "Operations Director",
    company: "Pacific Northwest Brewing",
    rating: 4.9,
    quote:
      "Our inventory management across taproom, distribution, and wholesale was disconnected. ODL unified everything into one system. We reduced overstock waste by 35% and never run out of popular SKUs anymore.",
  },
  {
    id: 36,
    name: "Patricia Sinclair",
    role: "Office Manager",
    company: "Sinclair & Partners Law Firm",
    rating: 4.8,
    quote:
      "Client intake was a 45-minute process involving 3 different forms and manual data entry. ODL built a digital intake system that clients complete before their first visit. We reduced intake time to 5 minutes and eliminated data entry errors.",
  },
]