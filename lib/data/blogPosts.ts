export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "shipped-4-production-systems-in-12-months",
    title: "How I Shipped 4 Production Systems in 12 Months After a 9-Year Break",
    excerpt: "I left tech in 2015. In 2024, I came back with AI as my force multiplier and shipped 4 production systems processing 250K+ records. Here's the playbook.",
    date: "2026-04-15",
    readTime: "8 min",
    tags: ["career", "ai-augmented", "productivity"],
    content: `## The Gap

In 2015, I walked away from tech. Not by choice — life happened. I spent the next 9 years working as a waiter, logistics admin, QC staff, and sales marketing. Code was just a memory.

In early 2024, I decided to come back. But the tech landscape had changed dramatically. React Server Components, Next.js App Router, TypeScript everywhere, AI coding assistants — it was overwhelming.

## The Strategy

Instead of trying to catch up on 9 years of missing knowledge, I leaned into AI-augmented development:

1. **Claude CLI as my pair programmer** — I focused on architecture and business logic. Claude handled boilerplate, patterns, and syntax I'd forgotten.

2. **Production-first mindset** — No tutorial hell, no toy projects. Every line of code I wrote was going to real users.

3. **Domain knowledge as an advantage** — My 9 years in operations, logistics, and retail weren't wasted. I understood the pain points because I'd lived them.

## The Results

In 12 months, I shipped:

- **Serat QC** — Logistics QC system for J&T Express. 80K+ entries, 160K+ GPS-watermarked photos. Cut processing time from 4-5 hours to under 30 minutes per 500 packages.

- **WC Check** — Toilet inspection monitoring system. 3,293 inspections, 53 users, 49 locations. QR code scanning + real-time dashboard.

- **LakuPOS** — Multi-outlet POS & warehouse system with QRIS payment, barcode scanning, and DDD architecture.

- **Qohira** — E-commerce platform with manual payment verification, web push notifications, and admin dashboard.

## The Lesson

You don't need to know everything. You need to:
- Understand the problem deeply (domain expertise)
- Use AI to bridge the technical gap (force multiplier)
- Ship fast and iterate based on real feedback

The 9-year gap wasn't a weakness. It was a differentiator.`,
  },
  {
    slug: "building-logistics-qc-system-80k-records",
    title: "Building a Logistics QC System That Processed 80K+ Records",
    excerpt: "From manual photo renaming (4-5 hours/day) to automated barcode scanning with GPS watermarking. A deep dive into how Serat QC was built for J&T Express operations.",
    date: "2026-03-10",
    readTime: "10 min",
    tags: ["case-study", "logistics", "nextjs", "production"],
    content: `## The Problem

The J&T Express QC team had to verify weight discrepancies for every package. For each waybill (resi), they needed 2 photos as evidence. The process:

1. Scan the barcode manually
2. Take photos with a phone camera
3. Rename each photo with the waybill number + description
4. Upload to shared folders
5. Manually count and report

For 500 packages per day, this meant renaming 1,000 photos one by one. It took 4-5 hours daily.

## The Solution

I built a PWA (Progressive Web App) that automates the entire flow:

### Barcode Scanning
Using Quagga2, the app scans barresi directly from the phone camera. No manual typing, no errors.

### GPS Watermarking
Every photo automatically gets a GPS watermark with:
- Date and time
- GPS coordinates
- Reverse-geocoded location name
- Package waybill number

### Real-time Dashboard
All data flows into a Supabase-backed dashboard showing:
- Daily/weekly/monthly statistics
- Per-user performance
- Leaderboard with gamification levels (Beginner → Diamond)

### Earnings Calculator
Each entry earns 500-1500 IDR. The system tracks and calculates earnings automatically.

## The Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL)
- **Storage**: Cloudinary for photo management
- **Features**: PWA (offline capable), GPS API, Barcode scanning

## The Impact

| Metric | Before | After |
|--------|--------|-------|
| Time per 500 resi | 4-5 hours | < 30 minutes |
| Photo renaming | Manual 1-by-1 | Automatic via barcode |
| Total data | Scattered local folders | 80K+ resi centralized |
| Monitoring | None | Real-time dashboard |

The system went from idea to production in 3 months and has been running continuously since.`,
  },
  {
    slug: "ai-augmented-development-workflow",
    title: "My AI-Augmented Development Workflow with Claude CLI",
    excerpt: "AI doesn't replace developers — it amplifies them. Here's my exact workflow for shipping production systems using Claude CLI as a force multiplier.",
    date: "2026-02-05",
    readTime: "6 min",
    tags: ["ai", "workflow", "claude", "productivity"],
    content: `## The Misconception

"AI will replace developers." No. AI replaces boilerplate. AI replaces syntax lookups. AI replaces Stack Overflow rabbit holes. But architecture decisions, business logic, and understanding user needs? That's still on you.

## My Workflow

### 1. Problem-First Thinking

Before writing any code, I deeply understand the problem:
- Who is the user?
- What's the current workflow?
- Where are the pain points?
- What does "done" look like?

### 2. Architecture with Claude

I describe the system to Claude in plain language:
- "I need a POS system with multi-outlet support, barcode scanning, and QRIS payment"
- Claude suggests the architecture: tRPC for type-safe APIs, Prisma for ORM, Supabase for auth
- I review, adjust, and approve

### 3. Domain-Driven Implementation

I write the domain entities and business logic myself. This is the core value — no AI should own your business rules. Claude handles:
- Boilerplate CRUD operations
- Form validation schemas
- Test scaffolding
- CSS/Layout patterns

### 4. Type-Safe Everything

tRPC + TypeScript end-to-end means:
- API contracts are defined once
- Frontend gets autocompletion for API calls
- Runtime errors become compile-time errors

Claude is excellent at generating tRPC routers and React Query hooks.

### 5. Ship, Measure, Iterate

Every project ships to production within weeks, not months:
- MVP in 2-4 weeks
- Real user feedback within the first month
- Iterate based on actual usage data

## The Results

With this workflow:
- **4 production systems** in 12 months
- **250K+ records** processed
- **< 1 year** from comeback to shipping
- **Ships in weeks, not months** — AI handles boilerplate, you focus on architecture

## Key Takeaways

1. **AI amplifies, not replaces** — You still need to understand the domain
2. **Type safety is non-negotiable** — tRPC + TypeScript catches errors before users do
3. **Ship to real users fast** — Feedback from 10 real users beats 1000 hours of hypothetical planning
4. **Domain knowledge is your edge** — Understanding the problem is more valuable than knowing the syntax`,
  },
];
