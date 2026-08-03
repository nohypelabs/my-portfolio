"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { initMotion, ScrollTrigger } from "@/lib/motion/eases";
import { useEnergySaver } from "@/contexts/EnergySaverContext";
import { useSidebar } from "@/contexts/SidebarContext";
import { usePathname } from "next/navigation";

/**
 * Wraps the page in Lenis smooth scroll, driven by the GSAP ticker so
 * ScrollTrigger stays in sync. Mirrors the noho.ink setup (§1.4) but with
 * duration 1.2 instead of 3 — this is a conversion-focused studio site, not
 * a contemplative catalogue.
 *
 * Kills Lenis entirely when:
 *  - prefers-reduced-motion is set (OS/browser level)
 *  - EnergySaverContext.reduceMotion is on (user toggle)
 *
 * Stops scroll when the mobile sidebar is open.
 * Resets scroll position on route change.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const { reduceMotion } = useEnergySaver();
  const { isMobileOpen } = useSidebar();
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Detect OS-level preference once on mount; re-check on change.
  const prefersReducedRef = useRef(
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e: MediaQueryListEvent) => {
      prefersReducedRef.current = e.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Create / destroy Lenis based on motion preference.
  useEffect(() => {
    const shouldDisable = reduceMotion || prefersReducedRef.current;
    if (shouldDisable) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      return;
    }

    const gsap = initMotion();

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.075,
      gestureOrientation: "vertical",
      allowNestedScroll: true,
    });

    lenisRef.current = lenis;

    // Drive from GSAP ticker so ScrollTrigger stays in sync.
    const onScroll = () => ScrollTrigger.update();
    const raf = (time: number) => lenis.raf(time * 1000);

    lenis.on("scroll", onScroll);
    gsap.ticker.add(raf);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", onScroll);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduceMotion]);

  // Stop / resume when mobile sidebar opens.
  useEffect(() => {
    if (!lenisRef.current) return;
    if (isMobileOpen) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [isMobileOpen]);

  // Scroll to top on route change.
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
