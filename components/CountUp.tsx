"use client";

import { useEffect, useRef, useState } from "react";
import { useEnergySaver } from "@/contexts/EnergySaverContext";

interface CountUpProps {
  /** Raw stat value, e.g. "340K+", "7+", "≤24 jam". */
  value: string;
  /** Animation duration in ms. */
  duration?: number;
  className?: string;
}

/**
 * Count-up animation for metric strings.
 *
 * Parses the leading number out of values like "340K+", "7+", or "≤24 jam"
 * and animates from 0 to the target once the element scrolls into view.
 * Non-numeric prefixes (≤) and suffixes (K+, jam) are preserved verbatim.
 * Under reduce-motion the target value renders immediately.
 */
export function CountUp({ value, duration = 1200, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { reduceMotion } = useEnergySaver();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (reduceMotion) return;

    const el = ref.current;
    if (!el) return;

    // Split "≤24 jam" → { prefix: "≤", num: 24, suffix: " jam" }
    const match = value.match(/^([^\d]*)(\d+)(.*)$/);
    if (!match) return;
    const [, prefix, numStr, suffix] = match;
    const target = Number(numStr);

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast start, soft landing
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target);
      setDisplay(`${prefix}${current}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };

    let io: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== "undefined") {
      io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            raf = requestAnimationFrame(tick);
            io?.disconnect();
          }
        },
        { threshold: 0.4 }
      );
      io.observe(el);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
    };
  }, [value, duration, reduceMotion]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
