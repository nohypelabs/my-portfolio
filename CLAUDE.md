# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio for Abdul Gofur — a Next.js 16 PWA deployed to Vercel at `abdulgofur.vercel.app`. Bilingual (EN/ID), dark/light themed. Compact single-scroll homepage with project showcase, designed for quick recruiter scanning.

## Commands

```bash
pnpm dev          # Dev server (Turbopack) at localhost:3000
pnpm build        # Production build
pnpm start        # Serve production build
pnpm lint         # ESLint (next/core-web-vitals + typescript)
npx tsc --noEmit  # Type-check only (no emit)
```

No test suite is configured.

## Tech Stack

- **Next.js 16** (App Router) with **React 19** and React Compiler enabled
- **TypeScript 5**, **Tailwind CSS v4** (PostCSS plugin), **Framer Motion** for animations
- **next-themes** for dark/light mode (class strategy, `.dark` selector)
- **@ducanh2912/next-pwa** — PWA is disabled in dev, enabled in production
- **lucide-react** for icons
- **pnpm** as package manager (not npm)
- **postgres** (node-postgres) for direct Postgres queries in the live-metrics API route

## Architecture

### Routing (App Router)

`app/(dashboard)/` is a route group that shares a NavBar layout (`app/(dashboard)/layout.tsx`). Pages inside: `page.tsx` (home), `contact/`, `cv/`, `projects/`, `projects/[id]/`, `ongoing/[id]/`. The `(dashboard)` prefix does not appear in URLs. Old routes `/about`, `/skills`, `/ongoing` redirect to `/` via `next.config.ts`.

`app/layout.tsx` is the root layout — wraps everything in `ThemeProvider` and `LanguageProvider`.

Navigation: sticky top NavBar (desktop) + bottom dock (mobile), 4 items: Home, Projects, CV, Contact.

### Data Layer

All portfolio content is static TypeScript in `lib/data/`:
- `projects.ts` — completed projects (typed as `Project[]` from `lib/domain/entities/Project.ts`)
- `ongoingProjects.ts` — in-progress projects (typed as `OngoingProject[]`)
- `personalInfo.ts`, `achievements.ts`, `testimonials.ts`

Domain entities are in `lib/domain/entities/`. When adding fields to projects, update both the entity interface and the data file.

### i18n

Custom implementation (not next-intl). `LanguageContext` holds `"en" | "id"`. All user-facing strings live in `lib/translations/index.ts` as a flat `translations.en` / `translations.id` object. Components access translations via `const { language } = useLanguage(); const t = translations[language];`.

When adding new UI text, add keys to both `en` and `id` in `lib/translations/index.ts`.

### Live Metrics API

`app/api/live-metrics/route.ts` fetches real-time counts from multiple Supabase projects and a Postgres database (ecommerce). Falls back to hardcoded values if any source is unreachable. Environment variables required: `SERAT_QC_SUPABASE_URL`, `SERAT_QC_SUPABASE_ANON_KEY`, `WC_CHECK_SUPABASE_URL`, `WC_CHECK_SUPABASE_ANON_KEY`, `LAKUPOS_SUPABASE_URL`, `LAKUPOS_SUPABASE_SERVICE_KEY`, `ECOMMERCE_DATABASE_URL`.

### Theming

Dark/light mode uses CSS custom properties defined in `app/globals.css` (`:root` for light, `.dark` for dark). Custom utility classes: `.noise-overlay` (texture), `.glass-card` (frosted glass effect).

### Component Organization

- `components/layout/` — NavBar (top nav + mobile bottom dock), Footer, ThemeProvider, ThemeToggle
- `components/sections/` — homepage sections (FeaturedProjects, TechStackStrip, OngoingStrip, ContactSection)
- `components/ui/` — reusable cards (ProjectCard, TechBadge)
- `components/` (root) — cross-cutting features (CommandPalette, AvatarImage, LanguageSwitcher, PWAInstallPrompt, ScrollReveal, TextReveal, TiltCard, Marquee, HeroBackground)

### Key Patterns

- Nearly all components are `"use client"` — the app is client-rendered with motion animations
- `CommandPalette` (Ctrl+K) provides keyboard-driven navigation across all pages and projects
- `ScrollReveal` and `TextReveal` wrap content in intersection-observer-based reveal animations
- `HeroBackground` provides the animated gradient on the home page hero

## Deployment

Vercel. `app/sitemap.ts` and `app/robots.ts` generate SEO files referencing `https://abdulgofur.vercel.app`.
