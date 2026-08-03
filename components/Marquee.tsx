"use client";

import { useRef, useEffect, useState, useSyncExternalStore } from "react";
import { useEnergySaver } from "@/contexts/EnergySaverContext";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

const noopSubscribe = () => () => {};

export function Marquee({ children, speed = 30, pauseOnHover = true, className = "" }: MarqueeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const { reduceMotion, runtimePaused } = useEnergySaver();
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );

  // Reduce-motion and a hidden tab stop the loop outright — no rAF is
  // scheduled at all, so the toggle has a real cost saving.
  const halted = reduceMotion || runtimePaused;

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !mounted) return;

    if (halted) {
      el.style.transform = "translateX(0px)";
      return;
    }

    let offset = 0;
    let animId: number;
    let last = performance.now();

    const step = (now: number) => {
      // Time-based rather than assuming 60fps, so speed is consistent
      // on high-refresh displays.
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;

      if (!paused) {
        offset += speed * dt;
        const half = el.scrollWidth / 2;
        if (half > 0 && offset >= half) offset -= half;
        el.style.transform = `translateX(-${offset}px)`;
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [speed, paused, mounted, halted]);

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div ref={scrollRef} className="flex gap-3 w-max will-change-transform">
        {children}
        {mounted && !halted && (
          <div aria-hidden="true" className="flex gap-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
