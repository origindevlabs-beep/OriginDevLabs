// ═══════════════════════════════════════════════════════════════
// Origin Dev Labs — FAQ Content Data
// Single source of truth for all FAQ questions/answers
// ═══════════════════════════════════════════════════════════════

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQCategory {
  id: string
  label: string
  shortLabel: string
  questions: FAQItem[]
}

export const FAQ_CATEGORIES: FAQCategory[] = [
  {
    id: "workflow-automation",
    label: "Workflow Automation",
    shortLabel: "Workflow",
    questions: [
      {
        question: "What types of business processes can you automate?",
        answer:
          "We automate repetitive workflows including CRM data entry, invoice processing, client onboarding, email follow-ups, project management updates, and cross-platform data syncing. Most businesses save 10-15+ hours per week by automating administrative tasks that previously required manual effort.",
      },
      {
        question: "How much does workflow automation cost?",
        answer:
          "Workflow automation projects range from $2,500-$15,000 for small to mid-size businesses, with ongoing monitoring retainers from $500-$5,000/month. We use fixed-fee pricing on projects and month-to-month retainers, so there are no surprises and no long-term contracts required.",
      },
      {
        question: "How long does workflow automation implementation take?",
        answer:
          "Simple workflow automations take 2-4 weeks. Mid-complexity builds run 4-8 weeks. Full CRM or operations overhauls typically take 8-16 weeks. We start with a discovery audit to map your processes and provide a clear timeline before any work begins.",
      },
      {
        question: "Will automation replace jobs at my company?",
        answer:
          "No. Automation eliminates repetitive, manual tasks so your team can focus on higher-value work. It handles data entry, follow-ups, and coordination — not strategic thinking, relationship building, or creative problem-solving. Most businesses redeploy saved hours toward revenue-generating activities.",
      },
    ],
  },
  {
    id: "intelligent-agents",
    label: "Intelligent Agents",
    shortLabel: "Agents",
    questions: [
      {
        question: "What is the difference between a basic FAQ chatbot and an AI-powered chatbot?",
        answer:
          "Basic FAQ bots match keywords to scripted responses — they break down when customers phrase questions differently. AI-powered chatbots use retrieval-augmented generation to understand context, cite sources, and handle follow-up questions naturally. For most businesses, AI chatbots deliver the best ROI by deflecting 70%+ of support inquiries.",
      },
      {
        question: "Can a chatbot integrate with my existing CRM and business tools?",
        answer:
          "Yes. We integrate chatbots with CRMs (HubSpot, Salesforce, Pipedrive), project management tools, payment systems, and custom APIs. The chatbot can look up orders, update customer records, schedule appointments, and trigger workflows across your existing tech stack.",
      },
      {
        question: "How much does an AI chatbot cost to build and maintain?",
        answer:
          "Simple FAQ chatbots cost $2,500-$10,000 to set up. AI-powered chatbots range from $10,000-$50,000 for development, with monthly hosting and maintenance from $500-$5,000. Agentic AI that takes actions (booking, ordering, updating CRM) ranges from $50,000-$150,000+ depending on integrations.",
      },
      {
        question: "Will the chatbot sound robotic or damage my brand?",
        answer:
          "We train every chatbot on your specific brand voice, terminology, and approved responses. The conversation feels natural and consistent with your brand. Every response can include source citations for accuracy, and human escalation is built in for complex situations.",
      },
    ],
  },
  {
    id: "smart-assistants",
    label: "Smart Assistants",
    shortLabel: "Assistants",
    questions: [
      {
        question: "What can a smart assistant do that a regular virtual assistant cannot?",
        answer:
          "A smart assistant combines AI automation with human oversight. It handles inbox management, CRM updates, scheduling, reporting, and customer follow-ups 24/7 without breaks. Unlike a basic VA, it processes data instantly across multiple systems, learns from interactions, and escalates complex tasks to your team when needed.",
      },
      {
        question: "How much does a smart assistant service cost compared to hiring?",
        answer:
          "A full-time administrative hire costs $40,000-$60,000/year plus benefits. Our smart assistant services start at $1,500-$5,000/month, handling equivalent workload with 24/7 availability, no benefits overhead, and instant scalability as your business grows.",
      },
      {
        question: "Is my business data secure with a smart assistant?",
        answer:
          "Yes. We use enterprise-grade security including encrypted data transmission, role-based access controls, SOC2-compliant processes, and isolated environments for sensitive projects. You maintain full control over what the assistant can access, and all actions are logged for audit trails.",
      },
      {
        question: "How quickly can a smart assistant be set up?",
        answer:
          "Basic smart assistant setup takes 1-2 weeks. Full integration with your CRM, email, and business tools takes 3-4 weeks. We handle onboarding, training the AI on your processes, and testing before going live.",
      },
    ],
  },
  {
    id: "business-intelligence",
    label: "Business Intelligence",
    shortLabel: "BI",
    questions: [
      {
        question: "What is a business intelligence dashboard and why do I need one?",
        answer:
          "A BI dashboard consolidates data from multiple sources (CRM, accounting, marketing, operations) into a single visual interface showing KPIs, trends, and metrics at a glance. It answers \"how are we doing?\" without requiring your team to run queries or export spreadsheets, enabling faster, data-driven decisions.",
      },
      {
        question: "How much does a custom BI dashboard cost?",
        answer:
          "A focused dashboard project costs $10,000-$50,000 depending on data sources, complexity, and number of KPIs. Ongoing maintenance and data updates run $500-$3,000/month. We provide fixed-price proposals after a discovery phase, so you know exactly what you're paying for.",
      },
      {
        question: "Can you connect my existing tools (QuickBooks, HubSpot, Google Analytics) to one dashboard?",
        answer:
          "Yes. We connect CRMs (HubSpot, Salesforce), accounting software (QuickBooks, Xero), marketing platforms (Google Ads, Meta, GA4), project management tools, and custom databases into a unified dashboard. Most integrations take 1-2 weeks per data source.",
      },
      {
        question: "Will I be able to update the dashboard myself after launch?",
        answer:
          "Absolutely. We build dashboards with self-service capabilities — drag-and-drop filters, simple date range selectors, and export functions. Your team can explore data without waiting on analysts. We also provide training sessions and documentation for your team.",
      },
    ],
  },
  {
    id: "web-development",
    label: "Web Development",
    shortLabel: "Web",
    questions: [
      {
        question: "How much does a custom website cost?",
        answer:
          "A professional 5-10 page business website costs $5,000-$25,000 depending on design complexity, functionality, and integrations. E-commerce sites range from $15,000-$75,000+. We provide transparent, fixed-price proposals with no hidden fees. Every build includes responsive design, on-page SEO, and security setup.",
      },
      {
        question: "How long does it take to build and launch a website?",
        answer:
          "A standard business website takes 6-12 weeks from kickoff to launch. E-commerce or complex web applications take 12-24 weeks. Timeline starts when we receive your content and deposit. We work in agile sprints with regular check-ins so you see progress every week.",
      },
      {
        question: "Will my website be optimized for Google searches?",
        answer:
          "Yes. Every website we build includes on-page SEO (meta tags, header structure, image optimization), schema markup, mobile-first responsive design, and fast page load speeds. We set up Google Analytics and Search Console so you can track traffic and rankings from day one.",
      },
      {
        question: "Do you build in WordPress, custom code, or something else?",
        answer:
          "We recommend the best platform for your specific needs. WordPress works well for content-driven sites and blogs. Custom web applications use modern frameworks (React, Next.js) for performance and scalability. We guide you through the choice during discovery based on your goals, budget, and long-term plans.",
      },
      {
        question: "What's included after the website launches?",
        answer:
          "We offer ongoing maintenance packages including security updates, plugin updates, performance monitoring, content changes, and technical support. Most clients choose a monthly retainer from $200-$1,000/month. We also provide training so your team can make basic updates independently.",
      },
    ],
  },
  {
    id: "ui-ux-design",
    label: "UI/UX Design",
    shortLabel: "UI/UX",
    questions: [
      {
        question: "What does a UI/UX design agency do differently than a regular web designer?",
        answer:
          "A UI/UX agency researches your users, maps their journeys, tests prototypes, and validates designs with real data — not opinions. We focus on measurable outcomes like conversion rates, task completion, and user satisfaction. Every design decision is backed by user research, analytics, and usability testing.",
      },
      {
        question: "How much does UI/UX design cost?",
        answer:
          "A UX audit costs $3,000-$10,000 (2-4 weeks). A single-flow redesign costs $8,000-$30,000 (3-8 weeks). Full product design with research, prototyping, and design system runs $40,000-$250,000 (10-30 weeks). Ongoing design retainers start at $5,000-$40,000/month depending on team size.",
      },
      {
        question: "What's included in your UX design process?",
        answer:
          "Our process includes: Discovery (stakeholder interviews, business goals), User Research (interviews, surveys, analytics review), Information Architecture (sitemaps, user flows), Wireframing, Visual UI Design, Interactive Prototyping, Usability Testing, Developer Handoff, and Post-Launch Optimization. Everything is documented and transparent.",
      },
      {
        question: "Do you only design, or do you also build what you design?",
        answer:
          "We offer both design-only and design + development. Our design-to-code handoff includes detailed specifications, component libraries, and developer documentation. If we also handle development, there's zero translation loss between design and implementation.",
      },
    ],
  },
  {
    id: "digital-products",
    label: "Digital Products",
    shortLabel: "Products",
    questions: [
      {
        question: "What is the difference between a website and a digital product?",
        answer:
          "A website is primarily informational. A digital product is an interactive application that users engage with regularly — SaaS platforms, mobile apps, marketplaces, dashboards, and internal tools. Digital products require ongoing iteration, user feedback loops, performance optimization, and feature development beyond initial launch.",
      },
      {
        question: "How much does digital product development cost?",
        answer:
          "An MVP (minimum viable product) costs $50,000-$150,000 and takes 3-6 months. A full-featured product ranges from $150,000-$500,000+ over 6-18 months. We provide transparent pricing based on scope, with clear milestones and payment schedules tied to deliverables.",
      },
      {
        question: "Do you build for iOS, Android, or both?",
        answer:
          "We build native iOS, native Android, and cross-platform (Flutter/React Native) apps depending on your requirements. Cross-platform is typically 30-40% more cost-effective and faster to market. Native is preferred when you need maximum performance or platform-specific features.",
      },
      {
        question: "Can you modernize or rebuild our existing software product?",
        answer:
          "Yes. We specialize in legacy software modernization — re-architecting outdated systems with modern frameworks, improving performance, adding new features, and migrating to cloud infrastructure. We assess your current product and provide a phased migration plan that minimizes disruption to your business.",
      },
    ],
  },
  {
    id: "custom-solutions",
    label: "Custom Solutions",
    shortLabel: "Custom",
    questions: [
      {
        question: "When should I choose custom software instead of off-the-shelf SaaS?",
        answer:
          "Choose custom software when: existing tools don't fit your unique workflows, you're paying for features you don't use, you need full control over data and security, integration between multiple SaaS tools is becoming unmanageable, or SaaS subscription costs exceed the investment in building your own solution.",
      },
      {
        question: "How much does custom software development cost?",
        answer:
          "Modest custom software projects start at $20,000-$50,000. Mid-range solutions cost $50,000-$200,000. Enterprise platforms range from $200,000-$1,000,000+. We provide fixed-price proposals after discovery, with no hidden costs. You own the source code and intellectual property.",
      },
      {
        question: "Will I own the software and source code?",
        answer:
          "Yes. You retain 100% ownership of all intellectual property, source code, and documentation. Once the project is complete, you own everything needed to build, maintain, or extend the software. There are no vendor lock-in clauses or hidden licensing restrictions.",
      },
      {
        question: "What happens after the software launches?",
        answer:
          "We provide ongoing support including bug fixes, feature updates, security patches, performance monitoring, and scaling. Our SLA support options range from standard business hours to 2-hour emergency response. We also offer retainer packages for continuous development and optimization.",
      },
    ],
  },
]

// Homepage featured categories (first 3, 2 questions each)
export const HOMEPAGE_FEATURED_CATEGORIES = FAQ_CATEGORIES.slice(0, 3).map(
  (cat) => ({
    ...cat,
    questions: cat.questions.slice(0, 2),
  })
)

// Generate JSON-LD FAQPage schema from categories
export function generateFAQSchema(categories: FAQCategory[]) {
  const allQuestions = categories.flatMap((cat) =>
    cat.questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    }))
  )

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allQuestions,
  }
}