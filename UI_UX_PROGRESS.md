# UI/UX Snapshot

This file tracks the current direction of the nasaq.id surface. It is no longer a historical checklist of experimental portfolio effects.

## Current Product Direction

- Reposition the site as a founder-led digital product studio
- Make the company profile easier to trust and easier to order from
- Prioritize narrative clarity, credibility, and conversion over decorative UI volume

## Active Conversion Surfaces

- Homepage funnel in `app/(dashboard)/page.tsx`
- Hero messaging in `components/sections/HeroSection.tsx`
- Founder trust page in `app/(dashboard)/about/page.tsx`
- Consultation page in `app/(dashboard)/contact/page.tsx`
- Live proof page in `app/(dashboard)/live/page.tsx`
- Studio Deck in `app/(dashboard)/cv/page.tsx`
- Pricing, process, services, testimonials, faq, and order routes as supporting decision pages

## Active Shell

- `app/(dashboard)/layout.tsx`
- `components/layout/Sidebar.tsx`
- `components/layout/Header.tsx`
- `components/layout/MobileSidebarWrapper.tsx`
- `components/PageTransition.tsx`

## Reusable Visual Helpers Still In Play

- `components/ScrollReveal.tsx`
- `components/TextReveal.tsx`
- `components/TiltCard.tsx`
- `components/HeroBackground.tsx`

These support the presentation, but they are secondary to trust, readability, and CTA clarity.

## Legacy Cleanup Status

The repo has moved away from several older portfolio-era pieces such as recruiter-style shell components, global novelty effects, and dead backup pages. Keep future polish aligned with the current studio funnel instead of reviving unused experiments.

## Next Polish Priorities

- Tighten case-study storytelling and before/after proof
- Improve mobile spacing and CTA consistency
- Keep founder credibility, offer clarity, and order flow aligned across pages
