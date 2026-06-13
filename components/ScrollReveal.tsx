"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const variants = {
    up: { y: 40, x: 0, scale: 1 },
    left: { y: 0, x: -40, scale: 1 },
    right: { y: 0, x: 40, scale: 1 },
    scale: { y: 0, x: 0, scale: 0.92 },
  };

  const offset = variants[direction];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offset }}
      animate={
        isInView
          ? { opacity: 1, y: 0, x: 0, scale: 1 }
          : {}
      }
      transition={{
        delay,
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
