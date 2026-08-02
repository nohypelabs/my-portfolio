# CLAUDE.md

This file gives current repo guidance for assistants working in this project.

## Project Overview

`nasaq.id` is a website and Android app development studio profile built with Next.js. The site is no longer a generic personal portfolio; the main goal is to convert visitors into consultation and brief submissions through stronger positioning, trust proof, and clear service funnels.

## Commands

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
npx tsc --noEmit
pnpm test
pnpm test:watch
```

## Tech Stack

- Next.js 16 App Router with React 19 and TypeScript 5
- Tailwind CSS v4 and Framer Motion
- `next-themes` for theme support
- `@ducanh2912/next-pwa` for production PWA support
- `@react-pdf/renderer` for the founder profile PDF
- `postgres` for live metrics data access

No Supabase CMS dependencies remain: the site is fully static/hardcoded except `app/api/live-metrics` (production DB counts via REST/`postgres`).

## Active Architecture

### Routing

The main site lives under `app/(dashboard)/`. Current business-facing routes:

- `/` for the homepage funnel: hero → mitra strip → projects grid → pricing → 2 testimonial quotes → CTA
- `/services` for the full service tracks, process, pricing packages, and FAQ (single page, static data)
- `/projects` and `/projects/[id]` for proof and case studies
- `/about` for the founder story and trust surface
- `/contact` for consultation / brief flow
- `/live` for production-proof metrics

The old `/pricing`, `/process`, `/testimonials`, `/faq`, `/cv`, `/ongoing`, `/blog`, and `/order` routes do not exist anymore; their content lives in `/services` or the homepage. Do not reintroduce them.

### Shell

`app/(dashboard)/layout.tsx` uses the current top navigation shell:

- `components/layout/Header.tsx` — brutalist top nav: logo sticker, primary links, CTA
- `components/layout/MobileSidebar.tsx` (+ `MobileSidebarWrapper.tsx`) — mobile slide-over menu
- `contexts/SidebarContext.tsx` — mobile drawer open state only
- `components/PageTransition.tsx`

The admin-panel sidebar shell and the Supabase CMS admin (`/admin/*`, `/auth/*`) were intentionally removed (product decision). Content is hardcoded in `lib/data/`. Do not reintroduce them.

### Data and Content

Shared copy and structured content live in `lib/data/` and `lib/translations/index.ts`.

- `lib/data/personalInfo.ts` now represents founder/studio positioning, not a recruiter-facing bio
- `lib/data/services.ts` is the single source for service tracks, pricing packages, process steps, and FAQs (used by `/services`)
- `lib/data/studioStats.ts` is the single source for proof stats (hero + about)
- `lib/data/testimonials.ts`, `projects.ts`, `ongoingProjects.ts`, and `cvData.ts` support trust and proof surfaces
- When adding UI copy, update both `en` and `id` entries in `lib/translations/index.ts`

### PDF and SEO

- `app/api/cv/pdf/route.ts` serves the nasaq.id founder profile PDF
- `components/CVPDFDocument.tsx` renders the PDF content
- `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, and `public/manifest.json` should stay aligned to `https://nasaq.id`

## UI Direction

- Optimize for clarity, trust, and conversion, not demo-heavy effects
- Keep the feel closer to a premium studio/company profile than a developer resume
- Preserve the current funnel direction across homepage, founder, consultation, pricing, and brief surfaces

## Legacy Notes

The old portfolio-era shell pieces and recruiter-style enhancements are intentionally deprecated. If they resurface in docs or new code, treat that as drift and verify whether the current layout still uses them before expanding the feature set.
