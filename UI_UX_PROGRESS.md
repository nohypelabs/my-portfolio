# UI/UX Improvement Plan

## Session 1 — WOW Factor (Core Visual Impact)
- [x] Page Transitions (route animation with AnimatePresence)
- [x] 3D Tilt Card Hover (Featured Projects — desktop)
- [x] Animated Background di Hero (subtle mesh/dot grid)
- [x] Dock-Style Bottom Nav (macOS magnification effect)

## Session 2 — Polish & Professional Feel
- [ ] Skeleton Loading (Live Metrics shimmer)
- [ ] Scroll Progress Bar (emerald thin line di top)
- [ ] Staggered Text Reveal (Hero headline per-word)
- [ ] Animated Skill Bars (About page — fill on scroll)

## Session 3 — Power User & Finishing Touch
- [ ] Command Palette (Cmd+K quick navigation)
- [ ] Scroll-Driven Section Reveals (parallax offset)
- [ ] Custom Cursor (desktop — shape shift on hover)
- [ ] Noise Texture + Glassmorphism Cards

---

## Progress Log

### Session 1 — COMPLETED (2026-05-03)
- `components/PageTransition.tsx` — smooth fade+slide on route changes
- `components/TiltCard.tsx` — 3D perspective tilt following mouse on desktop
- `components/HeroBackground.tsx` — animated dot network with emerald connections (canvas)
- `components/layout/BottomNav.tsx` — macOS dock magnification, spring physics, glow effect
- `app/(dashboard)/layout.tsx` — integrated PageTransition wrapper
- `app/(dashboard)/page.tsx` — integrated HeroBackground + TiltCard on featured projects
