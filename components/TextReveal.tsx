"use client";

import { MaskReveal } from "@/components/motion/MaskReveal";

interface TextRevealProps {
  text: string;
  className?: string;
  once?: boolean;
  split?: "words" | "chars" | "lines";
}

/** Thin wrapper — kept for backwards compatibility. Use MaskReveal directly for new code. */
export function TextReveal({ text, className = "", once = true, split = "words" }: TextRevealProps) {
  return (
    <MaskReveal
      as="span"
      text={text}
      split={split}
      once={once}
      className={`inline ${className}`}
      stagger={0.06}
      duration={0.6}
    />
  );
}
