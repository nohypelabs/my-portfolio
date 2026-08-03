"use client";

import { MaskReveal } from "@/components/motion/MaskReveal";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /**
   * Retained for API compatibility. The consolidated primitive only does the
   * vertical mask reveal, which is the house motion signature — the old
   * left/right/scale variants intentionally collapse onto it.
   */
  direction?: "up" | "left" | "right" | "scale";
}

/** Thin wrapper — kept for backwards compatibility. Use MaskReveal directly for new code. */
export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  return (
    <MaskReveal className={className} delay={delay} duration={0.8} stagger={0}>
      {children}
    </MaskReveal>
  );
}
