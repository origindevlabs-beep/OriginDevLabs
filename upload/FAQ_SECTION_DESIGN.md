# ODL FAQ SECTION — DESIGN FILE

> **Version:** 2.0
> **Date:** July 2026
> **Placement:** Homepage (featured subset), dedicated /faq page (full set)
> **SEO Purpose:** Target long-tail search queries for each service

---

## 1. SEO STRATEGY

### Why FAQs Matter

FAQ pages are one of the highest-converting page types for service businesses. They:
- Target "people also ask" queries in Google
- Generate FAQ rich snippets (schema markup)
- Answer objections before they become objections
- Reduce bounce rate by keeping users engaged
- Build topical authority per service category

### How It Ranks

When someone searches "how much does workflow automation cost" or "AI chatbot vs FAQ chatbot", the `/faq` page is the target. The page has:
- Dedicated URL with clear topic signal
- Comprehensive questions and answers per service
- JSON-LD FAQ schema markup for rich snippets
- Internal links from homepage (featured subset) and footer
- Strong topical authority from covering 8 service categories

### Target Keywords Per Service

| Service | Primary Keywords | Long-Tail Queries |
|---------|-----------------|-------------------|
| Workflow Automation | workflow automation cost, business automation | how much does workflow automation cost, how long does automation take |
| Intelligent Agents | AI chatbot development, smart agents | AI chatbot vs FAQ chatbot, can chatbot integrate with CRM |
| Smart Assistants | virtual assistant automation | smart assistant vs virtual assistant cost |
| Business Intelligence | dashboard development, BI consulting | custom dashboard cost, how long to build dashboard |
| Web Development | web development, website design | how much does a website cost, custom website timeline |
| UI/UX Design | UI UX agency, app design | UI UX design cost, what is UX design process |
| Digital Products | SaaS development, app development | MVP development cost, build SaaS from scratch |
| Custom Solutions | custom software development | custom software vs SaaS, do I own the source code |

---

## 2. PAGE ARCHITECTURE

### Homepage (Featured Subset)

The homepage shows a **curated subset** of the FAQ — top 3 categories, 2 questions each. This gives visitors a taste and drives them to the full FAQ page.

```
┌─────────────────────────────────────────────────┐
│                                                   │
│         Frequently Asked Questions                │
│                                                   │
│    [ Workflow ] [ Agents ] [ Assistants ] [ BI ]  │
│                                                   │
│  ▸ What types of business processes can you       │
│    automate?                                      │
│  ▸ How much does workflow automation cost?        │
│                                                   │
│            [ View All Questions → ]                │
│                                                   │
└─────────────────────────────────────────────────┘
```

- 3 category tabs (first 3 services)
- 2 questions per category
- "View All Questions" button → links to `/faq`
- Button is NOT in header or footer — only in this section

### Dedicated FAQ Page (/faq)

The full FAQ page shows **all 8 categories, all questions**. This is the page that ranks in search results.

```
┌─────────────────────────────────────────────────┐
│                                                   │
│         Frequently Asked Questions                │
│                                                   │
│    Everything you need to know before             │
│    getting started.                               │
│                                                   │
│  [ Workflow ] [ Agents ] [ Assistants ] [ BI ]    │
│  [ Web ] [ UI/UX ] [ Products ] [ Custom ]        │
│                                                   │
│  ▸ What types of business processes can you       │
│    automate?                                      │
│  ▸ How much does workflow automation cost?        │
│  ▸ How long does implementation take?             │
│  ▸ Will automation replace jobs?                  │
│                                                   │
│  ... (all 8 categories)                           │
│                                                   │
└─────────────────────────────────────────────────┘
```

- 8 category tabs (all services)
- 4-5 questions per category
- No "View All" button (this IS the full page)
- JSON-LD FAQPage schema for rich snippets

---

## 3. FAQ CONTENT (No Location References)

### WORKFLOW AUTOMATION

**Q: What types of business processes can you automate?**
We automate repetitive workflows including CRM data entry, invoice processing, client onboarding, email follow-ups, project management updates, and cross-platform data syncing. Most businesses save 10-15+ hours per week by automating administrative tasks that previously required manual effort.

**Q: How much does workflow automation cost?**
Workflow automation projects range from $2,500-$15,000 for small to mid-size businesses, with ongoing monitoring retainers from $500-$5,000/month. We use fixed-fee pricing on projects and month-to-month retainers, so there are no surprises and no long-term contracts required.

**Q: How long does workflow automation implementation take?**
Simple workflow automations take 2-4 weeks. Mid-complexity builds run 4-8 weeks. Full CRM or operations overhauls typically take 8-16 weeks. We start with a discovery audit to map your processes and provide a clear timeline before any work begins.

**Q: Will automation replace jobs at my company?**
No. Automation eliminates repetitive, manual tasks so your team can focus on higher-value work. It handles data entry, follow-ups, and coordination — not strategic thinking, relationship building, or creative problem-solving. Most businesses redeploy saved hours toward revenue-generating activities.

---

### INTELLIGENT AGENTS

**Q: What is the difference between a basic FAQ chatbot and an AI-powered chatbot?**
Basic FAQ bots match keywords to scripted responses — they break down when customers phrase questions differently. AI-powered chatbots use retrieval-augmented generation to understand context, cite sources, and handle follow-up questions naturally. For most businesses, AI chatbots deliver the best ROI by deflecting 70%+ of support inquiries.

**Q: Can a chatbot integrate with my existing CRM and business tools?**
Yes. We integrate chatbots with CRMs (HubSpot, Salesforce, Pipedrive), project management tools, payment systems, and custom APIs. The chatbot can look up orders, update customer records, schedule appointments, and trigger workflows across your existing tech stack.

**Q: How much does an AI chatbot cost to build and maintain?**
Simple FAQ chatbots cost $2,500-$10,000 to set up. AI-powered chatbots range from $10,000-$50,000 for development, with monthly hosting and maintenance from $500-$5,000. Agentic AI that takes actions (booking, ordering, updating CRM) ranges from $50,000-$150,000+ depending on integrations.

**Q: Will the chatbot sound robotic or damage my brand?**
We train every chatbot on your specific brand voice, terminology, and approved responses. The conversation feels natural and consistent with your brand. Every response can include source citations for accuracy, and human escalation is built in for complex situations.

---

### SMART ASSISTANTS

**Q: What can a smart assistant do that a regular virtual assistant cannot?**
A smart assistant combines AI automation with human oversight. It handles inbox management, CRM updates, scheduling, reporting, and customer follow-ups 24/7 without breaks. Unlike a basic VA, it processes data instantly across multiple systems, learns from interactions, and escalates complex tasks to your team when needed.

**Q: How much does a smart assistant service cost compared to hiring?**
A full-time administrative hire costs $40,000-$60,000/year plus benefits. Our smart assistant services start at $1,500-$5,000/month, handling equivalent workload with 24/7 availability, no benefits overhead, and instant scalability as your business grows.

**Q: Is my business data secure with a smart assistant?**
Yes. We use enterprise-grade security including encrypted data transmission, role-based access controls, SOC2-compliant processes, and isolated environments for sensitive projects. You maintain full control over what the assistant can access, and all actions are logged for audit trails.

**Q: How quickly can a smart assistant be set up?**
Basic smart assistant setup takes 1-2 weeks. Full integration with your CRM, email, and business tools takes 3-4 weeks. We handle onboarding, training the AI on your processes, and testing before going live.

---

### BUSINESS INTELLIGENCE

**Q: What is a business intelligence dashboard and why do I need one?**
A BI dashboard consolidates data from multiple sources (CRM, accounting, marketing, operations) into a single visual interface showing KPIs, trends, and metrics at a glance. It answers "how are we doing?" without requiring your team to run queries or export spreadsheets, enabling faster, data-driven decisions.

**Q: How much does a custom BI dashboard cost?**
A focused dashboard project costs $10,000-$50,000 depending on data sources, complexity, and number of KPIs. Ongoing maintenance and data updates run $500-$3,000/month. We provide fixed-price proposals after a discovery phase, so you know exactly what you're paying for.

**Q: Can you connect my existing tools (QuickBooks, HubSpot, Google Analytics) to one dashboard?**
Yes. We connect CRMs (HubSpot, Salesforce), accounting software (QuickBooks, Xero), marketing platforms (Google Ads, Meta, GA4), project management tools, and custom databases into a unified dashboard. Most integrations take 1-2 weeks per data source.

**Q: Will I be able to update the dashboard myself after launch?**
Absolutely. We build dashboards with self-service capabilities — drag-and-drop filters, simple date range selectors, and export functions. Your team can explore data without waiting on analysts. We also provide training sessions and documentation for your team.

---

### WEB DEVELOPMENT

**Q: How much does a custom website cost?**
A professional 5-10 page business website costs $5,000-$25,000 depending on design complexity, functionality, and integrations. E-commerce sites range from $15,000-$75,000+. We provide transparent, fixed-price proposals with no hidden fees. Every build includes responsive design, on-page SEO, and security setup.

**Q: How long does it take to build and launch a website?**
A standard business website takes 6-12 weeks from kickoff to launch. E-commerce or complex web applications take 12-24 weeks. Timeline starts when we receive your content and deposit. We work in agile sprints with regular check-ins so you see progress every week.

**Q: Will my website be optimized for Google searches?**
Yes. Every website we build includes on-page SEO (meta tags, header structure, image optimization), schema markup, mobile-first responsive design, and fast page load speeds. We set up Google Analytics and Search Console so you can track traffic and rankings from day one.

**Q: Do you build in WordPress, custom code, or something else?**
We recommend the best platform for your specific needs. WordPress works well for content-driven sites and blogs. Custom web applications use modern frameworks (React, Next.js) for performance and scalability. We guide you through the choice during discovery based on your goals, budget, and long-term plans.

**Q: What's included after the website launches?**
We offer ongoing maintenance packages including security updates, plugin updates, performance monitoring, content changes, and technical support. Most clients choose a monthly retainer from $200-$1,000/month. We also provide training so your team can make basic updates independently.

---

### UI/UX DESIGN

**Q: What does a UI/UX design agency do differently than a regular web designer?**
A UI/UX agency researches your users, maps their journeys, tests prototypes, and validates designs with real data — not opinions. We focus on measurable outcomes like conversion rates, task completion, and user satisfaction. Every design decision is backed by user research, analytics, and usability testing.

**Q: How much does UI/UX design cost?**
A UX audit costs $3,000-$10,000 (2-4 weeks). A single-flow redesign costs $8,000-$30,000 (3-8 weeks). Full product design with research, prototyping, and design system runs $40,000-$250,000 (10-30 weeks). Ongoing design retainers start at $5,000-$40,000/month depending on team size.

**Q: What's included in your UX design process?**
Our process includes: Discovery (stakeholder interviews, business goals), User Research (interviews, surveys, analytics review), Information Architecture (sitemaps, user flows), Wireframing, Visual UI Design, Interactive Prototyping, Usability Testing, Developer Handoff, and Post-Launch Optimization. Everything is documented and transparent.

**Q: Do you only design, or do you also build what you design?**
We offer both design-only and design + development. Our design-to-code handoff includes detailed specifications, component libraries, and developer documentation. If we also handle development, there's zero translation loss between design and implementation.

---

### DIGITAL PRODUCTS

**Q: What is the difference between a website and a digital product?**
A website is primarily informational. A digital product is an interactive application that users engage with regularly — SaaS platforms, mobile apps, marketplaces, dashboards, and internal tools. Digital products require ongoing iteration, user feedback loops, performance optimization, and feature development beyond initial launch.

**Q: How much does digital product development cost?**
An MVP (minimum viable product) costs $50,000-$150,000 and takes 3-6 months. A full-featured product ranges from $150,000-$500,000+ over 6-18 months. We provide transparent pricing based on scope, with clear milestones and payment schedules tied to deliverables.

**Q: Do you build for iOS, Android, or both?**
We build native iOS, native Android, and cross-platform (Flutter/React Native) apps depending on your requirements. Cross-platform is typically 30-40% more cost-effective and faster to market. Native is preferred when you need maximum performance or platform-specific features.

**Q: Can you modernize or rebuild our existing software product?**
Yes. We specialize in legacy software modernization — re-architecting outdated systems with modern frameworks, improving performance, adding new features, and migrating to cloud infrastructure. We assess your current product and provide a phased migration plan that minimizes disruption to your business.

---

### CUSTOM SOLUTIONS

**Q: When should I choose custom software instead of off-the-shelf SaaS?**
Choose custom software when: existing tools don't fit your unique workflows, you're paying for features you don't use, you need full control over data and security, integration between multiple SaaS tools is becoming unmanageable, or SaaS subscription costs exceed the investment in building your own solution.

**Q: How much does custom software development cost?**
Modest custom software projects start at $20,000-$50,000. Mid-range solutions cost $50,000-$200,000. Enterprise platforms range from $200,000-$1,000,000+. We provide fixed-price proposals after discovery, with no hidden costs. You own the source code and intellectual property.

**Q: Will I own the software and source code?**
Yes. You retain 100% ownership of all intellectual property, source code, and documentation. Once the project is complete, you own everything needed to build, maintain, or extend the software. There are no vendor lock-in clauses or hidden licensing restrictions.

**Q: What happens after the software launches?**
We provide ongoing support including bug fixes, feature updates, security patches, performance monitoring, and scaling. Our SLA support options range from standard business hours to 2-hour emergency response. We also offer retainer packages for continuous development and optimization.

---

## 4. VISUAL DESIGN

### Layout

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                   │
│              Frequently Asked Questions                           │
│                                                                   │
│    Everything you need to know before getting started.            │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │  Workflow Automation                                    │     │
│  │                                                          │     │
│  │  ▸ What types of business processes can you automate?   │     │
│  │  ▸ How much does workflow automation cost?              │     │
│  │  ▸ How long does implementation take?                   │     │
│  │  ▸ Will automation replace jobs?                        │     │
│  └─────────────────────────────────────────────────────────┘     │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐     │
│  │  Intelligent Agents                                     │     │
│  │                                                          │     │
│  │  ▸ What's the difference between basic and AI chatbots? │     │
│  │  ▸ Can a chatbot integrate with my CRM?                 │     │
│  │  ▸ How much does an AI chatbot cost?                    │     │
│  │  ▸ Will it sound robotic?                               │     │
│  └─────────────────────────────────────────────────────────┘     │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### Accordion Component

```
Default:   bg-white border border-gray-200 rounded-xl overflow-hidden
Expanded:  border-gray-900 bg-gray-50
Question:  text-base font-medium text-gray-900 px-6 py-4 cursor-pointer
Answer:    text-sm text-gray-600 px-6 pb-4 leading-relaxed
Icon:      Plus (+) rotates to Minus (−) on expand
```

### Category Tabs

- Horizontal scrollable tabs on mobile
- Grid of tabs on desktop
- Active tab: `bg-gray-900 text-white rounded-full`
- Inactive tab: `bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200`

### Animation

| Element | Animation | Duration |
|---------|-----------|----------|
| Answer expand | Height auto + fade in | 0.3s |
| Answer collapse | Height 0 + fade out | 0.2s |
| Plus → Minus icon | Rotate 45° | 0.2s |
| Category tab switch | Crossfade content | 0.3s |

### Background

- White (`#FFFFFF`) with circuitry canvas (same as other sections)

---

## 5. SCHEMA MARKUP (JSON-LD)

### FAQPage Schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does a custom website cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A professional 5-10 page business website costs $5,000-$25,000 depending on design complexity, functionality, and integrations."
      }
    }
  ]
}
```

This schema is auto-generated by the FAQ component from the questions/answers it renders. Each FAQ section on each page gets its own `<script type="application/ld+json">` block.

---

## 6. SEO FLOW

### How Users Find the FAQ

```
Search query → Google result → Click → /faq page
                                          ↓
                                    Full FAQ with all 8 categories
                                          ↓
                                    Rich snippet (FAQ schema)
```

### How Homepage Drives Traffic to FAQ

```
Homepage visitor → Sees featured FAQ (3 categories, 2 questions each)
                        ↓
                  "View All Questions" button
                        ↓
                  /faq page (full content)
```

### Internal Linking

- Homepage featured FAQ links to `/faq`
- `/faq` page has canonical URL
- `/faq` is in sitemap.xml with priority 0.9
- `/faq` is linked from footer (optional, for crawlability)

---

*This design file defines the FAQ section for all ODL webpages. Version 2.0 removes location-specific references and clarifies the homepage → /faq page architecture.*
