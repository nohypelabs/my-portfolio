# CLAUDE.md

This file gives current repo guidance for assistants working in this project.

## Project Overview

`nasaq.id` is a founder-led digital product studio profile built with Next.js. The site is no longer a generic personal portfolio; the main goal is to convert visitors into consultation and brief submissions through stronger positioning, trust proof, and clear service funnels.

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

## Active Architecture

### Routing

The main site lives under `app/(dashboard)/`. Important business-facing routes include:

- `/` for the homepage funnel
- `/about` for the founder story and trust surface
- `/services`, `/process`, `/pricing`, `/testimonials`, `/faq`
- `/contact` and `/order` for consultation and brief flow
- `/live` for production-proof metrics
- `/cv` for the Studio Deck / founder profile
- `/projects`, `/ongoing`, and `/blog` for supporting proof content

### Shell

`app/(dashboard)/layout.tsx` uses the current sidebar shell:

- `components/layout/Sidebar.tsx`
- `components/layout/Header.tsx`
- `components/layout/MobileSidebarWrapper.tsx`
- `contexts/SidebarContext.tsx`
- `components/PageTransition.tsx`

Do not reintroduce the old top-nav/footer shell without an explicit product decision.

### Data and Content

Shared copy and structured content live in `lib/data/` and `lib/translations/index.ts`.

- `lib/data/personalInfo.ts` now represents founder/studio positioning, not a recruiter-facing bio
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
