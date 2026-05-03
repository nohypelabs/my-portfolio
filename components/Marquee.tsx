"use client";

import { useRef, useEffect, useState } from "react";

interface MarqueeProps {
  children: React.ReactNode;
  speed?: number;
  pauseOnHover?: boolean;
  className?: string;
}

export function Marquee({ children, speed = 30, pauseOnHover = true, className = "" }: MarqueeProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !mounted) return;

    let offset = 0;
    let animId: number;

    const step = () => {
      if (!paused) {
        offset += speed / 60;
        const half = el.scrollWidth / 2;
        if (offset >= half) offset = 0;
        el.style.transform = `translateX(-${offset}px)`;
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [speed, paused, mounted]);

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => pauseOnHover && setPaused(true)}
      onMouseLeave={() => pauseOnHover && setPaused(false)}
    >
      <div ref={scrollRef} className="flex gap-3 w-max will-change-transform">
        {children}
        {mounted && <div aria-hidden="true" className="flex gap-3">{children}</div>}
      </div>
    </div>
  );
}
