# ORIGIN DEV LABS — COMPREHENSIVE WEBSITE DESIGN FILE & PRD

> **Version:** 2.0  
> **Date:** July 2026  
> **Status:** Active Build  
> **Stack:** Next.js 16 · Tailwind CSS v4 · motion · Lenis · Supabase

---

## TABLE OF CONTENTS

1. [Company Overview & Positioning](#1-company-overview--positioning)
2. [Brand Identity System](#2-brand-identity-system)
3. [Site Architecture & Navigation](#3-site-architecture--navigation)
4. [Load Screen Animation](#4-load-screen-animation)
5. [Homepage — Section-by-Section Design](#5-homepage--section-by-section-design)
6. [About Page](#6-about-page)
7. [Services Page](#7-services-page)
8. [Testimonials Page](#8-testimonials-page)
9. [Get Started / Contact Page](#9-get-started--contact-page)
10. [Supabase Database Schema](#10-supabase-database-schema)
11. [Form Submission Flow & Welcome Animation](#11-form-submission-flow--welcome-animation)
12. [Animation System](#12-animation-system)
13. [Image & Video Assets](#13-image--video-assets)
14. [SEO & LLMO Optimization](#14-seo--llmo-optimization)
15. [Responsive Design Specifications](#15-responsive-design-specifications)
16. [Copy Guidelines & Voice](#16-copy-guidelines--voice)
17. [Tech Stack & Dependencies](#17-tech-stack--dependencies)

---

# 1. COMPANY OVERVIEW & POSITIONING

## 1.1 Company Profile

| Field | Value |
|-------|-------|
| **Name** | Origin Dev Labs (ODL) |
| **Type** | Automation & Digital Transformation Company |
| **Primary Tagline** | We Build Systems That Work While You Sleep |
| **Primary Service** | Intelligent automation, systems, and business solutions |
| **Secondary Service** | Web design, development, and optimization |
| **Headquarters** | 100 South Orange Avenue, Suite 1200, Orlando, FL 32801 |
| **Target Region** | US → Global |
| **Budget Range** | $500 – $15,000 |

### Tagline Variations (for Hero Scroll Animation)

During the hero section's scroll animation, the tagline cycles through four tones:

| Tone | Tagline | Character |
|------|---------|-----------|
| **Bold + Confident** | We Build Systems That Work While You Sleep | The default — direct, authoritative |
| **Clean + Direct** | Automation That Runs Your Business for You | No fluff, states the outcome plainly |
| **Aspirational + Visionary** | The Future of Work Is Automated. We're Building It. | Forward-looking, positions ODL as a leader |
| **Smart + Witty** | Sleep More. Scale Faster. Let the Systems Handle It. | Conversational, memorable, human |

## 1.2 Mission

We build automation systems that remove busywork from businesses — so people spend their time on work that actually matters. Every system we ship is designed to save hours, cut costs, and scale without adding headcount.

## 1.3 Vision

By year three, we'll operate multiple proprietary software products, serve international clients from our Orlando headquarters, and have built acquisition-ready software assets. Our north star hasn't changed: make automation practical, measurable, and profitable for every business we touch.

## 1.4 Core Philosophy

- Your best people shouldn't spend their days on data entry, scheduling, or copy-pasting between tools.
- Automation should pay for itself — in hours saved, errors avoided, or revenue gained.
- If a system needs a manual to operate, it's not finished yet.
- ODL exists because most businesses know automation is possible but can't figure out how to actually get it working.

## 1.5 Value Proposition

ODL replaces manual, repetitive processes with systems that run on their own. You get back the hours your team loses to busywork, the money you burn on fixable inefficiencies, and the growth you're leaving on the table because your operations can't keep up.

**What changes when you work with us:**
- Your team stops doing the same 30 tasks every Monday morning
- Leads get responded to in minutes, not hours
- Reports generate themselves instead of someone spending Friday afternoon on spreadsheets
- Customer follow-ups happen automatically — no one falls through the cracks
- You know exactly what's happening across your business, in real time

## 1.6 Competitive Positioning

ODL is **not** a web design agency. We're an automation company. Web development exists as a supporting capability — we build the front-end systems that make automation visible and usable.

**Where we compete:**
- Automation Consulting
- Business Process Automation
- Intelligent Agent Development
- Operations Management
- Digital Transformation
- Productivity Systems

## 1.7 Target Market

### Primary Clients

| Segment | Pain Points | What They Get |
|---------|-------------|---------------|
| **Small & Medium Businesses** | Spending 20+ hours/week on manual processes | 10-30 hours back every week, fewer errors |
| **Startups** | Small teams wearing 5 roles each | Systems that scale with them |
| **Entrepreneurs** | Drowning in admin while trying to run the business | Automated workflows, less overhead |
| **Professionals** | No time for deep work because admin fills every gap | Intelligent assistants that handle scheduling |

## 1.8 Revenue Model

1. **Project-Based Services** — One-time automation builds, agent deployment, custom system development
2. **Retainer Services** — Ongoing system maintenance, monitoring, optimization
3. **Subscription Products** — Proprietary automation tools and dashboards (launching Year 2)
4. **Consulting** — Automation audits, process optimization, transformation planning

---

# 2. BRAND IDENTITY SYSTEM

## 2.1 Color System

### Design Philosophy

**No gradients. No bright colors. No conventional AI slop.**

The color system uses a restrained, professional palette built on neutrals with intentional accent moments. Colors serve function, not decoration.

### Primary Background (Services, Problem/Solution, Sub Pages)

| Element | Color | Description |
|---------|-------|-------------|
| **Base** | `#FFFFFF` | Pure white |
| **Circuitry Pattern** | `rgba(0,0,0,0.03)` to `rgba(0,0,0,0.08)` | Animated circuit board nodes and connections |
| **Node Glow** | `rgba(0,0,0,0.15)` | Radial glow on nodes near cursor |

The primary background features an interactive circuitry animation — a canvas-based network of nodes and connections that pulse and glow as the mouse moves across the surface. The effect is subtle: visible but never distracting.

### Secondary Background (Header, Footer, How It Works)

| Element | Color | Description |
|---------|-------|-------------|
| **Base** | `#0A0A0A` | Near-black |
| **Pattern** | `rgba(255,255,255,0.03)` | Subtle dot grid |
| **Text** | `#FFFFFF` and `rgba(255,255,255,0.4)` | White primary, muted secondary |

### Testimonials Background

| Element | Color | Description |
|---------|-------|-------------|
| **Base** | `#FAFAF8` | Warm off-white |
| **Pattern** | `rgba(0,0,0,0.02)` | Subtle dot grid |

### Neutral Scale

| Name | Hex | Usage |
|------|-----|-------|
| Black | `#000000` | Text on light backgrounds |
| Gray 900 | `#111111` | Primary text, dark elements |
| Gray 700 | `#374151` | Secondary text |
| Gray 500 | `#6B7280` | Muted text, placeholders |
| Gray 300 | `#D1D5DB` | Borders, dividers |
| Gray 100 | `#F3F4F6` | Subtle backgrounds |
| White | `#FFFFFF` | Text on dark, cards |

### Accent Usage

| Element | Style |
|---------|-------|
| **Primary Buttons** | `bg-gray-900 text-white` — solid, no gradient |
| **Secondary Buttons** | `bg-transparent border border-gray-300 text-gray-900` |
| **Links** | `text-gray-900` with hover underline |
| **Icons** | Monochrome, consistent with text color |

## 2.2 Typography

### Font Stack

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| **Headings** | Space Grotesk | 600, 700 | H1-H6, hero text, section titles |
| **Body** | Plus Jakarta Sans | 400, 500, 600 | Paragraphs, descriptions, form labels |
| **Monospace** | JetBrains Mono | 400 | Code, technical terms, metrics |

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Line Height | Letter Spacing |
|---------|---------------|---------------|-------------|----------------|
| H1 | 60px (3.75rem) | 32px (2rem) | 1.1 | -0.02em |
| H2 | 48px (3rem) | 28px (1.75rem) | 1.2 | -0.01em |
| H3 | 32px (2rem) | 22px (1.375rem) | 1.3 | 0 |
| H4 | 24px (1.5rem) | 18px (1.125rem) | 1.4 | 0 |
| Body Large | 18px (1.125rem) | 16px (1rem) | 1.6 | 0 |
| Body | 16px (1rem) | 16px (1rem) | 1.6 | 0 |
| Body Small | 14px (0.875rem) | 13px (0.8125rem) | 1.5 | 0.01em |
| Caption | 12px (0.75rem) | 12px (0.75rem) | 1.4 | 0.02em |

## 2.3 Logo Usage

### Files

| File | Format | Usage |
|------|--------|-------|
| `logo.png` | PNG | Primary logo — dark background |
| `logo-white.png` | PNG | Light/dark background variant |
| `logo-icon.png` | PNG | Favicon, small spaces |

### Placement Rules

- **Header:** Left-aligned in floating pill, max height 32px, links to homepage
- **Footer:** Left-aligned, max height 28px
- **Load Screen:** Center of viewport, max 60px wide (small pulsating)
- **Minimum size:** 20px height (icon only), 60px height (full logo)

## 2.4 Visual Language

### Design Principles

1. **White-first:** White backgrounds with interactive circuitry — clean, modern, premium
2. **No gradients:** Solid colors only — gradient-free by design
3. **Depth through motion:** Animations guide attention, reinforce hierarchy
4. **Generous whitespace:** Let content breathe — no cluttered layouts
5. **Monochrome with intent:** Color appears only when it means something

### UI Component Patterns

| Component | Style |
|-----------|-------|
| **Buttons (Primary)** | `bg-gray-900 text-white rounded-full px-8 py-3.5 hover:bg-gray-800 transition-all` |
| **Buttons (Secondary)** | `bg-transparent border border-gray-300 text-gray-900 rounded-full px-8 py-3.5` |
| **Cards (Light)** | `bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-xl` |
| **Cards (Dark)** | `bg-[#0a0a0a] border border-white/10 rounded-2xl` |
| **Inputs** | `bg-white border border-gray-200 rounded-lg px-4 py-2.5 focus:outline-none focus:border-gray-400` |
| **Sections** | `min-height: 100vh`, `padding: 120px 0` (desktop), `80px 0` (mobile) |

---

# 3. SITE ARCHITECTURE & NAVIGATION

## 3.1 Page Map

| Route | Page | Priority |
|-------|------|----------|
| `/` | Homepage | Primary |
| `/about` | About ODL | Primary |
| `/services` | All Services | Primary |
| `/testimonials` | Client Stories | Primary |
| `/get-started` | Contact Form | Primary |
| `/*` (modal) | Contact Form (overlay) | Secondary |

## 3.2 Navigation Structure

### Desktop Header (Floating Glass Pill)

- **Position:** Fixed, top 1.5rem, centered horizontally
- **Layout:** Floating pill — `top: 1.5rem; left: 50%; transform: translateX(-50%); width: max-content`
- **Background:** `rgba(255,255,255,0.08)` with `backdrop-filter: blur(20px)`
- **Border:** `1px solid rgba(255,255,255,0.1)`, `border-radius: 9999px`
- **Logo:** Left, 28px height, links to homepage
- **Nav Links:** Plus Jakarta Sans 500 14px, hover: gray-900
- **CTA Button:** `bg-gray-900 text-white rounded-full`, "Get Started"
- **z-index:** 50

### Mobile Header

- Same floating pill, smaller padding
- **Menu button:** Black pill with Plus icon + "Menu" text

### Mobile Menu Overlay

- Fullscreen, `bg: rgba(10,10,10,0.98)`, `backdrop-filter: blur(30px)`
- Links: Space Grotesk 28px, stacked vertically, centered
- Staggered mask reveal animation
- Close: X morph from hamburger

### Footer

- **Background:** `#0A0A0A` (secondary background — same as header)
- **Logo:** Left-aligned, `logo-white.png`
- **Columns:** 4-column grid (stacks on mobile)
  - Brand & Newsletter | Company Links | Services Links | Contact & Social
- **Social Icons:** TikTok, Instagram, WhatsApp, Twitter
- **Address:** Only appears here (100 South Orange Avenue, Suite 1200, Orlando, FL 32801)
- **Back-to-top:** Floating button, bottom-right
- **Border-top:** `1px solid rgba(255,255,255,0.1)`

---

# 4. LOAD SCREEN ANIMATION

## 4.1 Purpose

The load screen serves two functions:
1. **Brand moment** — Logo animation establishes premium feel
2. **Frame preload** — Hero canvas requires pre-rendered frames

## 4.2 Sequence Overview

```
Phase 1: Logo Pulse     →  Logo scales 1.0 ↔ 1.05, subtle glow pulse, small size (60px)
Phase 2: Bounce Reveal  →  Whole webpage bounces up from bottom, centered in view
Phase 3: Experience     →  Hero section begins immediately
```

## 4.3 Visual Design

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│                                                              │
│                                                              │
│                    [ODL Logo]                                 │
│                    (centered, 60px wide)                      │
│                    (subtle pulse animation)                   │
│                                                              │
│                                                              │
│                                                              │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- **Background:** `#FFFFFF` (white)
- **Logo:** Centered, 60px wide, subtle pulse animation
- **No progress bar**
- **No percentage text**

## 4.4 Transition

- **Load → Content:** Logo fades out (0.3s), then entire webpage bounces up from bottom (`translateY(100vh)` to `translateY(0)`) with spring animation (`stiffness: 200, damping: 20`)
- The bounce effect brings the full page into view while continuing the experience
- Hero section activates immediately after reveal

## 4.5 Technical Implementation

```typescript
// Bounce-in animation for page reveal
const pageVariants = {
  hidden: { y: "100vh", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      mass: 1,
    },
  },
};
```

## 4.6 Fallback

- If user has `prefers-reduced-motion: reduce`, skip bounce, instant reveal
- Maximum load screen duration: 5 seconds (force dismiss)
- Loading state stored in sessionStorage to avoid replay on SPA navigation

---

# 5. HOMEPAGE — SECTION-BY-SECTION DESIGN

## 5.1 Overview

| # | Section | Animation Type | Background | Min Height |
|---|---------|---------------|------------|------------|
| 1 | Hero | Scroll-driven card morph + circuitry | Primary (white + circuitry) | 100vh (scroll container) |
| 2 | News Strip | Marquee scroll | Secondary (#0a0a0a) | auto |
| 3 | Trust Bar | Counter + liquid glass overlay | Primary (white + circuitry) | auto |
| 4 | Services | 3D card tilt + frosted hover | Primary (white + circuitry) | auto |
| 5 | How It Works | Vertical zigzag timeline | Secondary (creative) | auto |
| 6 | Problem/Solution | Overlay revelation | Primary (white + circuitry) | 100vh |
| 7 | Testimonials | Stacking cards | Testimonials (#FAFAF8) | 300vh (scroll container) |
| 8 | CTA | Unique reveal | Primary (white + circuitry) | 60vh |
| 9 | Footer | Standard | Secondary (#0A0A0A) | auto |

---

## 5.2 Section 1: Hero

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  [Floating glass pill navbar]                                │
│                                                              │
│                                                              │
│              [Intro: "Systems That Work While You Sleep"]    │
│              [Fades as cards form arc]                        │
│                                                              │
│              [20 flip cards morph from scatter → circle →     │
│               bottom arc, scrubbing on scroll]                │
│                                                              │
│              [Arc Content: "We Build Automation"]             │
│              [Subheadline + Get Started CTA]                  │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Copy

- **Intro (fades out):** "Systems That Work While You Sleep"
- **Scroll prompt:** "SCROLL TO EXPLORE"
- **Main (fades in):** "We Build Automation"
- **Description:** "From workflow automation to intelligent agents, we architect systems that handle the work your team shouldn't have to."
- **CTA:** "Get Started" (appears after 90% morph progress)

### Animation System

This section uses a **scroll-driven card morph** — NOT a frame-sequence canvas.

**How it works:**
1. 20 flip cards start scattered across the viewport
2. On load, they animate into a circle formation
3. On scroll, the circle morphs into a bottom arc
4. Cards shuffle along the arc as user continues scrolling
5. Mouse parallax affects card positions
6. Each card flips on hover to reveal ODL service labels

**Scroll math:**
- Morph progress: `scrollY [0, 600]` → `[0, 1]` (circle to arc)
- Arc rotation: `scrollY [600, 3000]` → `[0, 360]` (shuffle cards)
- Content fade: `morphProgress [0.8, 1]` → `[0, 1]`
- CTA appearance: `morphProgress > 0.9`

**Card labels:**
Workflow Automation, Neural Processing, Data Pipeline, System Integration, Predictive Analytics, Agent Logic, Process Mining, API Mesh, Decision Trees, Real-Time Sync, Automation Grid, Smart Assistants, Cloud Infrastructure, Security Layer, Scaling Matrix, Client Portals, Dashboard UI, Report Engine, Notifications, Deployment Pipeline

### Circuitry Background

Canvas-based animated circuit board:
- Nodes spaced 80px apart
- Connections between nearby nodes (60% probability)
- Mouse proximity causes node glow (300px radius)
- Traveling pulses along connections
- Opacity: 40% (subtle but visible)

---

## 5.3 Section 2: News/Announcement Strip

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  ● NOW ACCEPTING PROJECTS FOR Q3 2026 — BOOK YOUR            │
│    FREE CONSULTATION TODAY  ●  NOW ACCEPTING PROJECTS        │
│    FOR Q3 2026 — BOOK YOUR FREE CONSULTATION TODAY  ●       │
└──────────────────────────────────────────────────────────────┘
```

### Design

- **Background:** `#0A0A0A` (secondary)
- **Text:** White, uppercase, 12px, letter-spacing 0.1em
- **Animation:** Continuous horizontal marquee, 30s loop
- **Separator:** Bullet point (●) between messages
- **Height:** 48px
- **Message:** "NOW ACCEPTING PROJECTS FOR Q3 2026 — BOOK YOUR FREE CONSULTATION TODAY"

### Implementation

```css
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

---

## 5.4 Section 3: Trust Bar

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ┌────────────────────────────────────────────────────┐    │
│   │  LIQUID GLASS PANEL                                 │    │
│   │                                                     │    │
│   │   50+          99.8%        24/7         4.8★       │    │
│   │   Automations   Uptime      Support      Rating    │    │
│   │   Deployed                                                  │    │
│   │                                                     │    │
│   └────────────────────────────────────────────────────┘    │
│                                                              │
│   "Every number here represents a business that stopped      │
│    doing things manually and started running smarter."       │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Design

- **Container:** Liquid glass panel — `backdrop-filter: blur(20px)`, `bg: rgba(255,255,255,0.6)`, `border: 1px solid rgba(255,255,255,0.8)`
- **Overlay:** Sits on top of primary background (circuitry visible through glass)
- **Bleed:** Panel dynamically bleeds into next section with varying opacity at edges
- **Numbers:** Count up from 0 on scroll (useInView trigger)
- **Hover:** Subtle 3D tilt on each metric card

### Metrics

| Metric | Value | Label |
|--------|-------|-------|
| Counter 1 | 50+ | Automations Deployed |
| Counter 2 | 99.8% | Uptime Guarantee |
| Counter 3 | 24/7 | System Monitoring |
| Counter 4 | 4.8★ | Client Rating |

---

## 5.5 Section 4: Services Overview

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│         Systems That Scale                                   │
│         Without Adding Headcount                              │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ [Image]       │  │ [Image]       │  │ [Image]       │      │
│  │ ⚡ Workflow   │  │ 🤖 Intelligent│  │ 💡 Smart      │      │
│  │  Automation   │  │  Agents       │  │  Assistants   │      │
│  │ [Features]    │  │ [Features]    │  │ [Features]    │      │
│  │ Learn More →  │  │ Learn More →  │  │ Learn More →  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐                          │
│  │ [Image]       │  │ [Image]       │                         │
│  │ 📊 Business  │  │ 🔧 Custom    │                          │
│  │  Intelligence │  │  Solutions   │                          │
│  │ [Features]    │  │ [Features]    │                         │
│  │ Learn More →  │  │ Learn More →  │                         │
│  └──────────────┘  └──────────────┘                          │
│                                                              │
│              [ View All Services → ]                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Card Design

- **Background:** White (`#FFFFFF`)
- **Border:** `1px solid #F3F4F6`
- **Layout:** 55% image, 45% content
- **Hover:** 3D tilt effect + frosted glass overlay (`backdrop-filter: blur(8px)`, `bg: rgba(255,255,255,0.7)`)
- **Scroll reveal:** Staggered entrance with rotateX transform

### Services

| # | Service | Icon | Features |
|---|---------|------|----------|
| 1 | Workflow Automation | Workflow | Conditional Logic, Cross-Platform, Real-Time Monitoring |
| 2 | Intelligent Agents | Bot | Natural Language, Multi-Step Reasoning, Tool Integration |
| 3 | Smart Assistants | Headphones | Context-Aware, Calendar Management, Document Processing |
| 4 | Business Intelligence | BarChart3 | Custom Dashboards, Automated Reports, KPI Tracking |
| 5 | Custom Solutions | Code2 | Full-Stack Dev, API Design, Deployment & Support |

---

## 5.6 Section 5: How It Works

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│               How Your Automation Gets Built                 │
│                                                              │
│    1  Discovery                                    [Icon]    │
│       ─────────────────────────────────────────────          │
│                                          [Icon]              │
│    ─────────────────────────────────────────────────         │
│    2  Solution Design                                    │
│       ─────────────────────────────────────────────          │
│    [Icon]                                                   │
│    ─────────────────────────────────────────────────         │
│    3  Development                                          │
│       ─────────────────────────────────────────────          │
│                                          [Icon]              │
│    ─────────────────────────────────────────────────         │
│    4  Testing                                              │
│       ─────────────────────────────────────────────          │
│    [Icon]                                                   │
│    ─────────────────────────────────────────────────         │
│    5  Deployment                                           │
│       ─────────────────────────────────────────────          │
│                                          [Icon]              │
│    ─────────────────────────────────────────────────         │
│    6  Optimization                                         │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Design

- **Layout:** Vertical zigzag — steps alternate left/right
- **Timeline:** Vertical line down center, animated progress fills on scroll
- **Background:** Secondary/creative background (NOT primary white+circuitry)
- **Animation:** Each step reveals with scroll, line draws progressively
- **Active step:** Expanded card with full description

### Steps

| # | Step | Icon | Description |
|---|------|------|-------------|
| 1 | Discovery | 🔍 | We map your workflows and find the bottlenecks |
| 2 | Solution Design | 📐 | Architecture that fits your business |
| 3 | Development | 💻 | Build, integrate, connect everything |
| 4 | Testing | ✅ | Break it on purpose so customers never have to |
| 5 | Deployment | 🚀 | Launch, train, support |
| 6 | Optimization | 📈 | Watch data, tune systems, maximize ROI |

---

## 5.7 Section 6: Problem/Solution Story

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  THE OLD WAY                                         │   │
│   │  • Manual data entry                                 │   │
│   │  • Missed leads                                      │   │
│   │  • Hours of reporting                                │   │
│   │  • Human error                                       │   │
│   │                                                      │   │
│   │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─   │   │
│   │                                                      │   │
│   │  THE ODL WAY (overlays on scroll)                    │   │
│   │  • Automated workflows                               │   │
│   │  • 24/7 lead capture                                 │   │
│   │  • Real-time dashboards                              │   │
│   │  • Zero errors                                       │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Design

- **Animation:** Solution panel slides over problem panel on scroll
- **Reveal:** Problem section visible first, solution overlays progressively
- **Retraction:** On scroll back, solution retracts revealing problem again
- **Background:** Primary (white + circuitry)
- **Styling:** Problem in muted gray, Solution in crisp black/white

### Copy

**The Old Way:**
- Manual data entry eating 20+ hours every week
- Leads going cold because no one followed up fast enough
- Friday afternoons spent compiling reports
- Costly human errors in invoicing and scheduling

**The ODL Way:**
- Automated workflows that run around the clock
- Every lead captured, qualified, and routed in under five minutes
- Real-time dashboards that update themselves
- Zero-error systems built to catch what humans miss

---

## 5.8 Section 7: Testimonials

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│  Background: #FAFAF8 (warm off-white)                        │
│                                                              │
│        Businesses That Run on                                │
│        ODL Systems                                           │
│                                                              │
│        ★★★★★ 4.8 / 5.0                                      │
│        Based on 50+ client projects                          │
│                                                              │
│        ┌────────────────────────────────────┐               │
│        │  [Stacking Card 1]                  │               │
│        │  [Stacking Card 2]                  │               │
│        │  [Stacking Card 3]                  │               │
│        │  ... up to 36 cards                 │               │
│        └────────────────────────────────────┘               │
│                                                              │
│        [Skip Section] ← appears after 15% scroll             │
│                                                              │
│        [Load More Stories] ← loads 8 at a time               │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Design

- **Background:** `#FAFAF8` (warm off-white) — 3rd unique color
- **Cards:** 36 total testimonials
- **Card style:** Light variant, `bg-[#FAFAF8]`, subtle border
- **Stacking:** Cards pile up on scroll, each revealing sequentially
- **Skip button:** Fixed bottom-right, appears after 15% scroll, smooth scrolls to end
- **Load more:** Shows 8 cards initially, adds 8 on click

### Card Content (No Avatars)

```
┌─────────────────────────────────────┐
│  "Quote from the client about their  │
│   experience and results..."         │
│                                      │
│  ──────────────────────────────────  │
│  Name, Role, Company        ★★★★★   │
└─────────────────────────────────────┘
```

### Testimonials (36 Total)

1. Marcus Chen — Phoenix Distribution Co — 5.0
2. Sarah Mitchell — Bright Horizon Family Practice — 4.8
3. David Rodriguez — Riverstone Properties — 4.9
4. Jessica Thompson — Bloom & Grow Nursery — 4.7
5. Michael Okafor — Atlas Freight Solutions — 5.0
6. Rachel Kim — Skinlux Dermatology — 4.8
7. James Whitfield — Whitfield & Associates Law — 4.9
8. Amanda Foster — Peak Performance Fitness — 4.8
9. Carlos Mendoza — Mendoza Construction Group — 4.7
10. Lauren Chen — Paws & Claws Veterinary — 4.9
11. Brian Callahan — Callahan Marketing Group — 4.8
12. Priya Patel — Sweet Leaf Bakery — 5.0
13. Tyler Brooks — Brooks Property Management — 4.9
14. Stephanie Nguyen — Lumina Tech Solutions — 4.8
15. Robert Harris — Harris Manufacturing — 4.7
16. Emily Watson — Crestwood Academy — 4.9
17. Marcus Johnson — Urban Plate Restaurant Group — 4.8
18. Dana Sullivan — Sullivan Insurance Agency — 4.7
19. Alex Rivera — Rivera Creative Studio — 5.0
20. Megan O'Brien — Green Valley Landscaping — 4.8
21. Kevin Tran — Tran Pharmacy Group — 4.9
22. Lisa Campbell — Campbell Consulting — 4.8
23. Thomas Reed — Reed & Sons Logistics — 4.9
24. Nicole Adams — Adams Medical Group — 4.7
25. Victor Morales — Coastal Hotels & Resorts — 5.0
26. Angela Park — NovaTech Solutions — 4.8
27. Derek Washington — Washington Transportation — 4.9
28. Samantha Brooks — Elevate Digital Agency — 4.8
29. Ryan Chen — Pacific Rim Imports — 4.7
30. Diana Foster — Foster Family Dentistry — 5.0
31. Marcus Williams — Summit Construction Group — 4.9
32. Olivia Martinez — Sunshine Pediatric Care — 4.8
33. Nathan Brooks — Meridian Financial Services — 4.7
34. Isabella Nguyen — Bloom Beauty Co — 5.0
35. Christopher Lee — Pacific Northwest Brewing — 4.9
36. Patricia Adams — Adams & Partners Law Firm — 4.8

---

## 5.9 Section 8: CTA Banner

### Layout

```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│         Done Losing Hours to Busywork?                       │
│                                                              │
│    Tell us what's slowing you down. We'll map out how        │
│    automation can fix it — and show you exactly what         │
│    the system would look like.                               │
│                                                              │
│              [ Get Started Today → ]                         │
│                                                              │
│         Free consultation. No commitment.                    │
│         Response within 24 hours.                            │
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

### Design

- **Background:** Primary (white + circuitry)
- **Unique reveal:** Content elements enter with different animations:
  - Headline: Scale up from 0.9 → 1.0
  - Body: Slide up with blur-to-clear
  - CTA: Bounce in from bottom
  - Subtext: Fade in last
- **CTA button:** Subtle continuous pulse (`scale 1.0 → 1.02`)

---

# 6. ABOUT PAGE

## 6.1 Page Structure

| # | Section | Content | Background |
|---|---------|---------|------------|
| 1 | Hero | Company name + mission tagline | Primary |
| 2 | Origin Story | Why ODL exists | Primary |
| 3 | Core Values | 4 values with icons | Primary |
| 4 | Vision | Where ODL is headed | Primary |
| 5 | CTA | "Work With Us" | Primary |

## 6.2 Expressive Image

**Location:** `public/images/expressive/team-collaboration.jpg`
**Search:** "diverse team working modern office", "teamwork collaboration"
**Placement:** Between Origin Story and Core Values sections

---

# 7. SERVICES PAGE

## 7.1 Page Structure

| # | Section | Content | Background |
|---|---------|---------|------------|
| 1 | Hero | "What We Build (And Why It Matters)" | Primary |
| 2 | Service 1 | Workflow Automation | Primary |
| 3 | Service 2 | Intelligent Agents | Primary |
| 4 | Service 3 | Smart Assistants | Primary |
| 5 | Service 4 | Business Intelligence | Primary |
| 6 | Service 5 | Custom Solutions | Primary |
| 7 | Secondary | Web Dev, UI/UX, Digital Products | Primary |
| 8 | CTA | "Let's Talk About What You Need" | Primary |

## 7.2 Service Detail Pattern

Each service section includes:
- Title and description
- Feature cards (3 per service)
- Tool badges
- CTA button
- **Image:** From `public/images/services/` (5 images total, one per main service)

---

# 8. TESTIMONIALS PAGE

## 8.1 Page Structure

| # | Section | Content | Background |
|---|---------|---------|------------|
| 1 | Hero | "What Our Clients Say" | Testimonials (#FAFAF8) |
| 2 | Overall Rating | 4.8/5 stars aggregate | Testimonials |
| 3 | Testimonial Stack | 36 cards (scroll-stacking) | Testimonials |
| 4 | CTA | "Start Your Success Story" | Testimonials |

---

# 9. GET STARTED / CONTACT PAGE

## 9.1 Page Structure

| # | Section | Content | Background |
|---|---------|---------|------------|
| 1 | Hero | "Let's Talk About What You Need" | Primary |
| 2 | Form | Full contact/lead form | Primary |
| 3 | Trust Signals | Response time, privacy | Primary |
| 4 | Alternative Contact | Email, social links | Primary |

## 9.2 Form Fields

| Field | Type | Required |
|-------|------|----------|
| Full Name | text | ✅ |
| Email Address | email | ✅ |
| Phone Number | tel | ✅ |
| Company Name | text | ❌ |
| Service Interest | select | ✅ |
| Budget Range | select | ❌ |
| Tell Us About Your Project | textarea | ❌ |
| WhatsApp checkbox | checkbox | ❌ |

### Budget Range Options

- Under $1,000
- $1,000 – $5,000
- $5,000 – $10,000
- $10,000 – $15,000
- Let's discuss

## 9.3 Expressive Image

**Location:** `public/images/expressive/contact-visual.jpg`
**Search:** "communication network abstract", "connection concept"
**Placement:** Alongside form (desktop), above form (mobile)

---

# 10. IMAGE & VIDEO ASSETS

## 10.1 Image Strategy

**All images downloaded from Pinterest — no AI generation required.**

### Hero Images (20)

**Location:** `public/images/hero/`

| # | Filename | Pinterest Search |
|---|----------|-----------------|
| 1 | workflow-nodes.jpg | "abstract technology nodes connected" |
| 2 | neural-network.jpg | "neural network visualization dark" |
| 3 | data-flow.jpg | "data flow visualization" |
| 4 | system-integration.jpg | "system integration diagram" |
| 5 | predictive-analytics.jpg | "analytics graph abstract dark" |
| 6 | agent-logic.jpg | "decision tree abstract" |
| 7 | process-mining.jpg | "process flow diagram" |
| 8 | api-mesh.jpg | "API network mesh" |
| 9 | decision-tree.jpg | "branching paths abstract" |
| 10 | real-time-sync.jpg | "synchronization abstract" |
| 11 | automation-grid.jpg | "grid pattern technology" |
| 12 | smart-assistants.jpg | "floating UI elements dark" |
| 13 | cloud-infra.jpg | "cloud infrastructure abstract" |
| 14 | security-layer.jpg | "security shield abstract" |
| 15 | scaling-matrix.jpg | "expanding grid pattern" |
| 16 | client-portal.jpg | "dashboard cards floating" |
| 17 | dashboard-ui.jpg | "minimal dashboard dark" |
| 18 | report-engine.jpg | "document automation abstract" |
| 19 | notification-system.jpg | "notification bells abstract" |
| 20 | deployment-pipe.jpg | "pipeline stages abstract" |

### Service Images (5)

**Location:** `public/images/services/`

| # | Filename | Pinterest Search |
|---|----------|-----------------|
| 1 | workflow-automation.jpg | "workflow diagram minimal white" |
| 2 | intelligent-agents.jpg | "neural network white background" |
| 3 | smart-assistants.jpg | "dashboard elements white" |
| 4 | business-intelligence.jpg | "charts graphs minimal white" |
| 5 | custom-solutions.jpg | "code blocks abstract white" |

### Expressive Images (8)

**Location:** `public/images/expressive/`

| # | Filename | Section | Pinterest Search |
|---|----------|---------|-----------------|
| 1 | automation-hero.jpg | Hero Background | "futuristic automation city" |
| 2 | team-collaboration.jpg | About | "diverse team working modern office" |
| 3 | business-growth.jpg | Problem/Solution | "business growth abstract" |
| 4 | technology-abstract.jpg | CTA | "digital transformation art" |
| 5 | automation-process.jpg | How It Works | "workflow process isometric" |
| 6 | client-success.jpg | Testimonials | "success celebration abstract" |
| 7 | contact-visual.jpg | Get Started | "communication network abstract" |
| 8 | orlando-skyline.jpg | Footer/About | "Orlando skyline night" |

## 10.2 Video Assets (AI Generate)

**Location:** `public/videos/`

| # | Filename | Section | Description | Tool |
|---|----------|---------|-------------|------|
| 1 | hero-loop.mp4 | Hero | 5s loop: data flowing through connected nodes, dark bg, subtle glow | Runway ML, Pika Labs |
| 2 | service-reveal.mp4 | Services | 3s: workflow building itself, nodes appearing | After Effects, Rive |
| 3 | success-moment.mp4 | CTA | 2s: abstract confetti burst | Lottie, Rive |

**Runway/Pika Prompt:**
> "Abstract dark technology background, glowing white nodes connecting in a network, data flowing between points, smooth animation, minimalist, no text, 4K, cinematic"

## 10.3 File Structure

```
public/
├── images/
│   ├── hero/           (20 images)
│   ├── services/       (5 images)
│   ├── expressive/     (8 images)
│   └── logo-white.png
└── videos/             (3 videos, optional)
```

---

# 11. ANIMATION SYSTEM

## 11.1 Architecture

| Layer | Technology | Used For |
|-------|-----------|----------|
| **Canvas layer** | CircuitryBackground + Lenis | Hero interactive background |
| **Component layer** | `motion` (framer-motion) | All sections — scroll reveals, card animations, transitions |

## 11.2 Unique Animation Per Section

**Every section has a distinct animation — no repeating patterns:**

| Section | Animation |
|---------|-----------|
| Hero | Card morph (scatter → circle → arc) + mouse parallax |
| News Strip | Continuous horizontal marquee |
| Trust Bar | Liquid glass overlay + number counters |
| Services | 3D card tilt + frosted glass hover |
| How It Works | Vertical zigzag timeline with progressive reveal |
| Problem/Solution | Overlay revelation (solution slides over problem) |
| Testimonials | Stacking cards with scroll-driven pile |
| CTA | Multi-element staggered entrance |
| Footer | Standard fade-in |

## 11.3 Easing Tokens

```css
:root {
  --ease-premium: cubic-bezier(0.32, 0.72, 0, 1);
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-sharp: cubic-bezier(0.5, 0, 0.75, 0);
}
```

## 11.4 Performance Rules

- Animate only `transform` and `opacity`
- `will-change: transform` only on actively animating elements
- Canvas: DPR-aware sizing, passive listeners, RAF-guarded updates
- `prefers-reduced-motion: reduce` → disable all animations

---

# 12. SEO & LLMO OPTIMIZATION

## 12.1 Meta Tags (Per Page)

### Homepage

```html
<title>Origin Dev Labs | Automation Systems That Work While You Sleep | Orlando, FL</title>
<meta name="description" content="Origin Dev Labs builds automation systems, smart agents, and custom solutions that save businesses time and money. Based in Orlando, FL. Free consultation." />
```

### About Page

```html
<title>About Origin Dev Labs | Our Story & Mission | Orlando, FL</title>
<meta name="description" content="Learn about Origin Dev Labs — our mission to make automation practical for every business, our core values, and where we're headed." />
```

### Services Page

```html
<title>Services | Workflow Automation, Smart Agents & Custom Solutions | Origin Dev Labs</title>
<meta name="description" content="Workflow automation, intelligent agents, smart assistants, business intelligence, and custom solutions. See how Origin Dev Labs can automate your operations." />
```

### Testimonials Page

```html
<title>Client Stories | Origin Dev Labs</title>
<meta name="description" content="See what our clients say about Origin Dev Labs. 4.8/5 rating from 50+ automation projects delivered." />
```

### Get Started Page

```html
<title>Get Started | Free Automation Consultation | Origin Dev Labs | Orlando, FL</title>
<meta name="description" content="Ready to automate your business? Tell us about your project and get a free consultation within 24 hours." />
```

---

# 13. RESPONSIVE DESIGN

## 13.1 Breakpoints

| Name | Width |
|------|-------|
| Mobile | < 768px |
| Desktop | ≥ 768px |

## 13.2 Universal Mobile Rules

- All asymmetric layouts fall back to `w-full`, `px-4`, `py-8` below 768px
- Use `min-h-[100dvh]` instead of `h-screen` (iOS Safari safe)
- Remove all rotations and negative-margin overlaps below 768px
- Minimum touch target: 44×44px
- Minimum body text: 16px

## 13.3 Section Mobile Adaptations

| Section | Desktop | Mobile |
|---------|---------|--------|
| Hero | Full arc with cards | Stacked layout, reduced card count |
| Trust Bar | 4-column glass panel | 2×2 grid |
| Services | 3-column grid | Single column stack |
| How It Works | Zigzag timeline | Linear vertical |
| Problem/Solution | Side-by-side overlay | Stacked vertically |
| Testimonials | Stacking cards | Swipeable stack |
| Footer | 4-column | Single column |

---

# 14. COPY GUIDELINES & VOICE

## 14.1 Banned Words

| Banned | Why | Use Instead |
|--------|-----|-------------|
| AI | Overused | "intelligent", "smart", "powered" |
| Chatbot | Feels cheap | "assistant", "agent" |
| Disruptive | Cliché | "transformative", "effective" |
| Synergy | Corporate jargon | "working together" |
| Cutting-edge | Cliché | "modern", "proven" |
| Innovative | Cliché | "smart", "purpose-built" |
| Seamless | AI crutch | "smooth", "reliable" |
| Empower | Overused | "help", "enable" |
| Transform | Overused | "improve", "upgrade" |
| Delve | AI marker | "explore", "examine" |
| Robust | Overused | "strong", "solid" |
| Streamline | AI marker | "simplify", "speed up" |

## 14.2 Tone of Voice

| Attribute | Description |
|-----------|-------------|
| **Professional** | Confident without being stiff |
| **Warm** | Approachable, human, not corporate |
| **Results-focused** | Every sentence connects to outcomes |
| **Clear** | No jargon, no fluff |
| **Honest** | We don't oversell |

## 14.3 Writing Formula

```
[Problem] → [Solution] → [Outcome]
```

---

# 15. TECH STACK & DEPENDENCIES

## 15.1 Core Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.2.2 | React framework |
| React | 19.2.4 | UI library |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | v4 | Styling |
| motion | 12.38.0 | Animations |
| Lenis | 1.3.21 | Smooth scroll |

## 15.2 UI & Icons

| Library | Purpose |
|---------|---------|
| lucide-react | Icon system |
| clsx | Conditional classes |
| tailwind-merge | Tailwind class merging |
| class-variance-authority | Component variants |

## 15.3 Forms & Validation

| Library | Purpose |
|---------|---------|
| React Hook Form | Form state |
| Zod | Schema validation |

## 15.4 Database & Backend

| Technology | Purpose |
|------------|---------|
| Supabase | PostgreSQL, auth, Edge Functions |
| @supabase/supabase-js | Client |
| @supabase/ssr | Server-side |

## 15.5 Fonts

| Font | Source | Usage |
|------|--------|-------|
| Space Grotesk | Google Fonts | Headings |
| Plus Jakarta Sans | Google Fonts | Body |
| JetBrains Mono | Google Fonts | Code, metrics |

---

# APPENDIX A: COMPONENT FILES

| Component | File | Status |
|-----------|------|--------|
| Hero Section | `HERO_SECTION.tsx` | ✅ Complete |
| Services Section | `SERVICES_SECTION.tsx` | ✅ Complete |
| Testimonials Section | `TESTIMONIALS_SECTION.tsx` | ✅ Complete |
| Footer Section | `FOOTER_SECTION.tsx` | ✅ Complete |

---

*This design file is the single source of truth for the Origin Dev Labs website build. Version 2.0 incorporates all design revisions including updated backgrounds, unique animations per section, Pinterest-sourced imagery, and expanded testimonial deck.*
