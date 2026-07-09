# ODL ONBOARDING QUESTIONNAIRE — DESIGN FILE

> **Version:** 3.0
> **Date:** July 2026
> **Route:** `/get-started` (replaces existing contact form)
> **Stack:** Next.js 16 · motion · Supabase · React Hook Form + Zod

---

## 1. PHILOSOPHY

### This Is Not a Form. It's a Discovery Conversation.

The old form asked: "What do you want?" and left it at that. This questionnaire asks the right questions in the right order — so by the end, we know exactly what they need, why they need it, and how to help.

Every step builds on the last. Their purpose shapes their pain. Their pain shapes the project details. The project details shape the solution. No wasted questions.

### The Emotional Arc

```
Step 1: "What do you need?"           → Purpose — pick the service(s)
Step 2: "What's broken?"             → Pain — tailored to their purpose
Step 3: "Tell me more"               → Project details — tailored to their pain
Step 4: "Who are you?"               → Name, email, company (optional)
Step 5: "How much to fix this?"      → Budget — realistic investment
Step 6: "Did we get it right?"       → Full summary confirmation
```

---

## 2. QUESTIONNAIRE STRUCTURE

### Step 1: The Opening

```
┌─────────────────────────────────────────────────┐
│                                                   │
│         What do you need help with?               │
│                                                   │
│    Pick everything that applies. We'll            │
│    ask the right follow-up questions.             │
│                                                   │
└─────────────────────────────────────────────────┘
```

**Options (multi-select):**

| # | Service | Icon | Description (shown below option on select) |
|---|---------|------|---------------------------------------------|
| 1 | Workflow Automation | ⚙️ | Repetitive tasks, data entry, cross-tool syncing |
| 2 | Intelligent Agents | 🤖 | Customer support, sales qualification, operations |
| 3 | Smart Assistants | 🧠 | Calendar, email triage, document processing |
| 4 | Business Intelligence | 📊 | Dashboards, reports, KPI tracking |
| 5 | Web Development | 🌐 | Websites, landing pages, web apps |
| 6 | UI/UX Design | 🎨 | App design, interface design, user experience |
| 7 | Digital Products | 📱 | SaaS tools, mobile apps, proprietary software |
| 8 | Custom Solutions | 🛠️ | Internal tools, portals, something from scratch |

**Behavior:**
- Multi-select (checkbox cards, no limit)
- Each selected option highlights with `border-gray-900 bg-gray-50`
- A small counter appears: "You picked 3 services"
- If they pick 0 and click Next → error: "Pick at least one"

**Follow-up micro-text:**
> "Great choices. Let's dig into what's going on."

---

### Step 2: "What's broken?"

**This step changes based on what they selected in Step 1.**

The pain options are pulled from a service→pain map. If they selected multiple services, all relevant pain options appear (deduplicated). The more services they picked, the more pain options appear — and the more they can select.

**Selection rules:**
- 1 service selected → up to 2 pain points
- 2 services selected → up to 3 pain points
- 3+ services selected → up to 4 pain points

#### Service → Pain Map

**Workflow Automation →**
- Copy-pasting data between tools all day
- Same tasks repeated every week with no end in sight
- Manual approval processes bottlenecking everything
- Errors from human data entry costing me money
- Onboarding new employees takes forever

**Intelligent Agents →**
- Customers waiting too long for responses
- Losing leads because nobody followed up in time
- Support team buried in repetitive questions
- Inconsistent quality across customer interactions
- Can't scale customer service without hiring more people

**Smart Assistants →**
- Email overload — important messages getting buried
- Scheduling wars — too many back-and-forths
- Documents piling up with no system to process them
- Admin work eating into billable hours
- Team spending more time organizing than working

**Business Intelligence →**
- Flying blind — no idea what's actually happening in my business
- Building reports by hand every week/month
- Data scattered across 5 different tools
- Can't spot problems until they're expensive
- No real-time visibility into performance

**Custom Solutions →**
- Off-the-shelf software doesn't fit how I actually work
- Patching together 4 tools to do what 1 should
- Need something specific that doesn't exist yet
- My current system is held together with duct tape
- Scaling is impossible with what I have now

#### Always shown (regardless of service selection):
- It's a mix of everything, honestly
- I just need someone who gets it
- [Something else...]

**Custom option:** [Something else...]
→ Expands text input: "Tell us what's going on"

**Behavior:**
- Multi-select (checkbox cards, limit varies by service count)
- After selection, personalized follow-up:

> "That's the kind of stuff we love fixing."

---

### Step 3: "Tell me more about your project"

**This step changes based on both their purpose (Step 1) AND their pain (Step 2).**

The project detail options are a combination of service-specific and pain-specific follow-ups. This gives us the most useful context for scoping.

#### If they picked Workflow Automation:
- I need to automate data entry between [tool] and [tool]
- I want a system that handles approvals without me chasing people
- I need recurring tasks to run on autopilot
- I want to reduce errors in [specific process]

#### If they picked Intelligent Agents:
- I need something to handle customer support 24/7
- I want agents to qualify and follow up with leads
- I need an internal operations agent for my team
- I want to automate [specific workflow] with smart decisions

#### If they picked Smart Assistants:
- I need help managing my email and calendar
- I want document processing automated
- I need an assistant that keeps my team organized
- I want to automate [specific admin task]

#### If they picked Business Intelligence:
- I need a real-time dashboard for my business
- I want automated reports delivered on a schedule
- I need to connect data from multiple tools into one view
- I want to track [specific KPIs]

#### If they picked Custom Solutions:
- I need an internal tool built from scratch
- I want a customer-facing portal or app
- I need an API integration between systems
- I want to build [specific thing]

#### If they picked Web Development:
- My website doesn't represent who I am anymore
- I need a site that actually converts visitors into customers
- My site is slow, broken on mobile, or just ugly
- I need a landing page for a specific campaign or product
- I want to redesign my site without rebuilding from scratch

#### If they picked UI/UX Design:
- My app looks like it was built in 2010
- Users are confused by my interface — they keep dropping off
- I need a design system that keeps everything consistent
- I want a mobile app that actually feels good to use
- I need wireframes and prototypes before building anything

#### If they picked Digital Products:
- I want to build a SaaS product and need a technical partner
- I have an idea for an app but don't know where to start
- I need to turn my existing process into a product others can use
- I want to monetize my expertise through a digital tool
- I need help scoping and building an MVP

#### Always shown (regardless of service selection):
- I'm not 100% sure yet — help me figure it out
- I need the full package — design, build, and deploy
- [I'll explain...]

**Custom option:** [I'll explain...]
→ Expands text input: "Tell us about your project — what does it look like, what tools do you use, what would make your life easier?"

**Behavior:**
- Multi-select (checkbox cards, up to 3)
- Custom option always available
- Answers stored as `project_details` array + optional `project_description` text

**Follow-up micro-text:**
> "That gives us a lot to work with. Perfect."

---

### Step 4: "Who are you?"

**Layout:**

```
┌─────────────────────────────────────────────────┐
│                                                   │
│         Quick intro — who are we talking to?      │
│                                                   │
│    ┌──────────────────────────────────────┐       │
│    │  First Name *                        │       │
│    └──────────────────────────────────────┘       │
│    ┌──────────────────────────────────────┐       │
│    │  Last Name                           │       │
│    └──────────────────────────────────────┘       │
│    ┌──────────────────────────────────────┐       │
│    │  Email *                             │       │
│    └──────────────────────────────────────┘       │
│    ┌──────────────────────────────────────┐       │
│    │  Phone                               │       │
│    └──────────────────────────────────────┘       │
│    ┌──────────────────────────────────────┐       │
│    │  Company Name (optional)             │       │
│    └──────────────────────────────────────┘       │
│                                                   │
│    How do you prefer we reach you?                │
│                                                   │
│    [ ✉️ Email ]  [ 📱 Phone ]  [ 💬 WhatsApp ]   │
│                                                   │
│    Best time to reach you?                        │
│    [ Morning ] [ Afternoon ] [ Evening ] [ Any ]  │
│                                                   │
│    Anything else we should know?                  │
│    ┌──────────────────────────────────────┐       │
│    │                                     │       │
│    └──────────────────────────────────────┘       │
│                                                   │
└─────────────────────────────────────────────────┘
```

**Fields:**

| Field | Type | Required |
|-------|------|----------|
| First Name | text | ✅ |
| Last Name | text | ❌ |
| Email | email | ✅ |
| Phone | tel | ❌ |
| Company Name | text | ❌ |
| Preferred contact method | checkboxes (Email / Phone / WhatsApp) | ✅ (at least one) |
| Best time to reach you | radio (Morning / Afternoon / Evening / Anytime) | ❌ |
| Anything else? | textarea | ❌ |

**Behavior:**
- Email is always required (even if they don't check "Email" as preference — it's added automatically)
- If they check Phone → phone field appears with validation
- If they check WhatsApp → WhatsApp field appears with validation
- Company field is always visible but marked optional
- Contact preference stored as array, individual fields stored separately

**Follow-up micro-text:**
> "Nice to meet you, [first name]."

---

### Step 5: "How much to solve this?"

**Question:** How much are you willing to spend to solve this problem realistically?

**Options:**
- Under $1,000 — I need something simple
- $1,000 – $5,000 — I want a real solution
- $5,000 – $10,000 — I'm ready to invest properly
- $10,000 – $15,000 — let's do this right
- $15,000+ — I want the best, not the cheapest
- I don't know yet — help me scope it first
- Let's discuss — it depends on what you propose

**Behavior:**
- Single select (radio-style cards)
- Answer stored as `budget_willingness` field
- Follow-up micro-text (varies):
  - Under $1,000: "We can work with that. Simple doesn't mean ineffective."
  - $1,000 – $5,000: "Solid range. We'll maximize every dollar."
  - $5,000 – $10,000: "Now we're building something real."
  - $10,000 – $15,000: "That budget unlocks serious systems."
  - $15,000+: "World-class budget. Let's build something incredible."
  - Don't know: "No problem. We'll scope it first so you know exactly what you're paying for."
  - Let's discuss: "Smart. The right solution is worth more than a round number."

---

### Step 6: "Did we get it right?"

**Full summary of everything they've told us, displayed as a clean card.**

```
┌─────────────────────────────────────────────────┐
│                                                   │
│         Here's what we heard, [Name].             │
│                                                   │
│  ──────────────────────────────────────────────  │
│                                                   │
│  WHAT YOU NEED                                    │
>  [Service 1], [Service 2]                          │
│                                                   │
│  WHAT'S BROKEN                                    │
>  [Pain 1], [Pain 2]                                │
│                                                   │
│  YOUR PROJECT                                      │
>  [Project detail 1], [Project detail 2]           │
│  [Custom project description if provided]          │
│                                                   │
│  WHO YOU ARE                                       │
│  Name: [First] [Last]                              │
│  Email: [email]                                    │
│  Phone: [phone] (if provided)                      │
│  Company: [company] (if provided)                  │
│                                                   │
│  HOW TO REACH YOU                                  │
│  Preferred: [contact methods]                      │
│  Best time: [best time]                            │
│                                                   │
│  YOUR INVESTMENT                                   │
>  [budget willingness]                              │
│                                                   │
│  ──────────────────────────────────────────────  │
│                                                   │
│  Looks right?                                     │
│                                                   │
│  [ Yeah, send it → ]     [ ← Go back ]            │
│                                                   │
└─────────────────────────────────────────────────┘
```

**Each section has a clickable "Edit" link** that jumps back to that step.

**Design:**
- Background: White with circuitry
- Summary card: `bg-white border border-gray-200 rounded-2xl p-8`
- Sections animate in with stagger (0.1s delay)
- "Go back" on each section
- CTA: "Yeah, send it →"

---

### Step 7: The Receipt

```
┌─────────────────────────────────────────────────┐
│                                                   │
│           We got it, [Name].                      │
│                                                   │
│    Here's what happens next:                      │
│                                                   │
│    ✓  We read your answers                        │
│    ✓  We map out a solution                       │
│    ✓  We reach out within 24 hours                │
│                                                   │
│    No pitch. No commitment. Just a plan.          │
│                                                   │
│              [ Back to Home ]                      │
│                                                   │
└─────────────────────────────────────────────────┘
```

---

## 3. VISUAL DESIGN

### Layout

```
┌─────────────────────────────────────────────────┐
│  ← ODL Logo (top left)                           │
│  ═══════════════════════════════════════════════  │ ← progress bar
│                                                   │
│         [ Question Text ]                         │
│         [ Optional subtext ]                      │
│                                                   │
│    ┌──────────────────────┐                       │
│    │  Option 1      [ ✓ ] │                       │
│    └──────────────────────┘                       │
│    ┌──────────────────────┐                       │
│    │  Option 2            │                       │
│    └──────────────────────┘                       │
│    ┌──────────────────────┐                       │
│    │  Option 3            │                       │
│    └──────────────────────┘                       │
│    ┌──────────────────────┐                       │
│    │  Something else...   │                       │
│    └──────────────────────┘                       │
│                                                   │
│  ──────────────────────────────────────────────  │
│  Step 1 of 5              [ Back ]  [ Next → ]   │
└─────────────────────────────────────────────────┘
```

### Progress Bar
- Thin line at very top of viewport
- Fills left-to-right as steps complete
- Color: `#111111` on white
- Height: 2px

### Option Cards

```
Default:   bg-white border border-gray-200 rounded-xl px-6 py-4 cursor-pointer
Hover:     border-gray-400 shadow-md
Selected:  border-gray-900 bg-gray-50 shadow-sm
```

### Custom Input
- Appears when "Something else..." or "I'll explain..." is selected
- Slides down (0.3s)
- Style: `bg-gray-50 border border-gray-200 rounded-lg px-4 py-3`

### Navigation

| Button | Style |
|--------|-------|
| **Next** | `bg-gray-900 text-white rounded-full px-8 py-3 hover:bg-gray-800` |
| **Back** | `text-gray-500 hover:text-gray-900 transition-colors` |
| **Start** | `bg-white text-gray-900 rounded-full px-8 py-3 hover:bg-gray-100` |

### Transitions
- Step out: slide left + fade (0.4s)
- Step in: slide from right (0.4s)
- Easing: `[0.23, 1, 0.32, 1]`
- Follow-up text: fade in from below (0.3s delay)

### Backgrounds
- Steps 1-5: White + circuitry canvas
- Step 6 (Confirmation): White + subtle dot pattern
- Step 7 (Receipt): `#0A0A0A` + dot pattern

---

## 4. SERVICE → PAIN → PROJECT DETAIL MAP

This is the core data structure that powers the dynamic questionnaire.

```typescript
const SERVICE_PAIN_MAP = {
  "workflow-automation": {
    label: "Workflow Automation",
    icon: "⚙️",
    painPoints: [
      "Copy-pasting data between tools all day",
      "Same tasks repeated every week with no end in sight",
      "Manual approval processes bottlenecking everything",
      "Errors from human data entry costing me money",
      "Onboarding new employees takes forever",
    ],
    projectDetails: [
      "I need to automate data entry between tools",
      "I want a system that handles approvals without me chasing people",
      "I need recurring tasks to run on autopilot",
      "I want to reduce errors in a specific process",
    ],
  },
  "intelligent-agents": {
    label: "Intelligent Agents",
    icon: "🤖",
    painPoints: [
      "Customers waiting too long for responses",
      "Losing leads because nobody followed up in time",
      "Support team buried in repetitive questions",
      "Inconsistent quality across customer interactions",
      "Can't scale customer service without hiring more people",
    ],
    projectDetails: [
      "I need something to handle customer support 24/7",
      "I want agents to qualify and follow up with leads",
      "I need an internal operations agent for my team",
      "I want to automate a specific workflow with smart decisions",
    ],
  },
  "smart-assistants": {
    label: "Smart Assistants",
    icon: "🧠",
    painPoints: [
      "Email overload — important messages getting buried",
      "Scheduling wars — too many back-and-forths",
      "Documents piling up with no system to process them",
      "Admin work eating into billable hours",
      "Team spending more time organizing than working",
    ],
    projectDetails: [
      "I need help managing my email and calendar",
      "I want document processing automated",
      "I need an assistant that keeps my team organized",
      "I want to automate a specific admin task",
    ],
  },
  "business-intelligence": {
    label: "Business Intelligence",
    icon: "📊",
    painPoints: [
      "Flying blind — no idea what's actually happening in my business",
      "Building reports by hand every week or month",
      "Data scattered across 5 different tools",
      "Can't spot problems until they're expensive",
      "No real-time visibility into performance",
    ],
    projectDetails: [
      "I need a real-time dashboard for my business",
      "I want automated reports delivered on a schedule",
      "I need to connect data from multiple tools into one view",
      "I want to track specific KPIs automatically",
    ],
  },
  "custom-solutions": {
    label: "Custom Solutions",
    icon: "🛠️",
    painPoints: [
      "Off-the-shelf software doesn't fit how I actually work",
      "Patching together 4 tools to do what 1 should",
      "Need something specific that doesn't exist yet",
      "My current system is held together with duct tape",
      "Scaling is impossible with what I have now",
    ],
    projectDetails: [
      "I need an internal tool built from scratch",
      "I want a customer-facing portal or app",
      "I need an API integration between systems",
      "I want to build something specific from the ground up",
    ],
  },
  "web-development": {
    label: "Web Development",
    icon: "🌐",
    painPoints: [
      "My website doesn't represent who I am anymore",
      "Visitors come but don't convert into customers",
      "My site is slow, broken on mobile, or just ugly",
      "I need a site but my developer disappeared",
      "I'm embarrassed to send people to my website",
    ],
    projectDetails: [
      "I need a brand new website built from scratch",
      "I need a landing page for a campaign or product",
      "I want to redesign my existing site",
      "I need an e-commerce store or booking system",
    ],
  },
  "ui-ux-design": {
    label: "UI/UX Design",
    icon: "🎨",
    painPoints: [
      "My app looks outdated and unprofessional",
      "Users are confused and dropping off",
      "My team wastes time debating design decisions",
      "I need a design system but don't know where to start",
      "I want a mobile app that feels premium",
    ],
    projectDetails: [
      "I need a full UI/UX redesign of my product",
      "I need wireframes and prototypes before building",
      "I want a design system for consistency",
      "I need a mobile app design that feels native",
    ],
  },
  "digital-products": {
    label: "Digital Products",
    icon: "📱",
    painPoints: [
      "I have an idea but no technical co-founder",
      "I tried building it myself and it's a mess",
      "My current product is losing users to better alternatives",
      "I can't find developers who understand my vision",
      "I need to ship an MVP before my window closes",
    ],
    projectDetails: [
      "I want to build a SaaS product from scratch",
      "I need help scoping and building an MVP",
      "I want to turn my process into a product others can buy",
      "I need a technical partner, not just a dev shop",
    ],
  },
};

// Always-available options (shown regardless of service selection)
const ALWAYS_PAIN = [
  "It's a mix of everything, honestly",
  "I just need someone who gets it",
];

const ALWAYS_PROJECT = [
  "I'm not 100% sure yet — help me figure it out",
  "I need the full package — design, build, and deploy",
];
```

---

## 5. DATABASE SCHEMA

```sql
CREATE TABLE onboarding_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,

  -- Identity
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,

  -- Purpose
  services_needed TEXT[] NOT NULL DEFAULT '{}',

  -- Pain
  pain_points TEXT[] NOT NULL DEFAULT '{}',
  pain_description TEXT,

  -- Project
  project_details TEXT[] NOT NULL DEFAULT '{}',
  project_description TEXT,

  -- Contact preferences
  contact_preferences TEXT[] NOT NULL DEFAULT '{}',
  best_time TEXT CHECK (best_time IN ('morning', 'afternoon', 'evening', 'anytime')),

  -- Investment
  budget_willingness TEXT NOT NULL,

  -- Additional
  additional_notes TEXT,

  -- Metadata
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- CRM
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'proposal', 'won', 'lost')),
  summary TEXT,
  tags TEXT[] DEFAULT '{}'
);

CREATE INDEX idx_onboarding_email ON onboarding_submissions(email);
CREATE INDEX idx_onboarding_status ON onboarding_submissions(status);
CREATE INDEX idx_onboarding_created ON onboarding_submissions(created_at DESC);

CREATE TABLE onboarding_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  submission_id UUID REFERENCES onboarding_submissions(id) ON DELETE CASCADE,
  step_number INT NOT NULL,
  step_key TEXT NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  answer_type TEXT CHECK (answer_type IN ('selection', 'custom', 'multiple', 'text')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_responses_submission ON onboarding_responses(submission_id);

ALTER TABLE onboarding_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE onboarding_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON onboarding_submissions
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts" ON onboarding_responses
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated reads" ON onboarding_submissions
  FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated reads" ON onboarding_responses
  FOR SELECT USING (auth.role() = 'authenticated');
```

---

## 6. DATA SHAPE

```typescript
{
  first_name: "Sarah",
  last_name: "Mitchell",
  email: "sarah@brightdental.com",
  phone: "+14075551234",
  company: "Bright Dental Group",
  services_needed: ["workflow-automation", "business-intelligence"],
  pain_points: [
    "Copy-pasting data between tools all day",
    "Flying blind — no idea what's actually happening in my business",
    "Building reports by hand every week or month"
  ],
  pain_description: null,
  project_details: [
    "I need to automate data entry between tools",
    "I need a real-time dashboard for my business"
  ],
  project_description: null,
  contact_preferences: ["email", "whatsapp"],
  best_time: "morning",
  budget_willingness: "$5,000 – $10,000",
  additional_notes: "We're a dental practice with 3 locations.",
  tags: ["dental", "multi-location", "workflow", "bi"]
}
```

---

## 7. ANIMATION SYSTEM

| Animation | Trigger | Duration | Easing |
|-----------|---------|----------|--------|
| Slide left + fade | Step complete | 0.4s | `[0.23, 1, 0.32, 1]` |
| Slide in from right | New step | 0.4s | `[0.23, 1, 0.32, 1]` |
| Option hover | Mouse enter | 0.2s | `ease-out` |
| Option select | Click | 0.3s | spring |
| Custom input expand | Selection | 0.3s | `[0.23, 1, 0.32, 1]` |
| Follow-up text | Answer selected | 0.3s delay | 0.4s |
| Progress bar | Step complete | 0.4s | `[0.23, 1, 0.32, 1]` |
| Confirmation sections | Page load | 0.5s each | staggered 0.1s |
| Receipt checkmarks | Page load | 0.5s each | staggered 0.2s |

---

## 8. RESPONSIVE DESIGN

### Mobile (< 768px)
- Options stack vertically (full width)
- Reduced padding: `px-4 py-3`
- Progress bar: top of viewport
- Navigation: fixed bottom bar
- Question text: `text-xl`
- Step 4 form: full width, stacked fields
- Confirmation: scrollable card

### Desktop (≥ 768px)
- Options in 2-column grid
- Generous padding: `px-6 py-4`
- Navigation: inline below options
- Question text: `text-2xl md:text-3xl`
- Step 4 form: 2-column layout for name fields
- Confirmation: centered card, max-width 600px

---

## 9. ERROR HANDLING

### Validation Errors
- Inline below field: `text-sm text-red-600 mt-1`
- Appear on blur or "Next" click

### Network Errors
- Retry button: `bg-red-600 hover:bg-red-700 text-white rounded-full`
- Message: "Something went wrong. Try again?"

### Edge Function Failure
- Non-blocking — submission saves regardless
- Summary field remains null (filled later)

---

*This design file replaces the static form in Section 9 of the main design file. Version 3.0 uses dynamic pain/project options based on service selection.*
