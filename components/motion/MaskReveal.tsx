"use client";

import { useEffect, useId, useRef } from "react";
import { initMotion, EASE } from "@/lib/motion/eases";
import { useEnergySaver } from "@/contexts/EnergySaverContext";

type SplitMode = "lines" | "words" | "chars" | "none";

interface MaskRevealProps {
  children?: React.ReactNode;
  /** Text to split. When provided it takes precedence over children. */
  text?: string;
  as?: React.ElementType;
  className?: string;
  /** Per-item delay in the stagger cascade. */
  stagger?: number;
  duration?: number;
  delay?: number;
  initialY?: string;
  once?: boolean;
  split?: SplitMode;
  /** ScrollTrigger start, e.g. "top 85%". */
  start?: string;
}

/**
 * The single reveal primitive for the site — replaces noho's
 * addAppearanceByTrigger (§1.4).
 *
 * Pattern: each unit sits in an overflow-hidden parent, starts at y:100%,
 * then rides up to 0 with a stagger on the shared `custom-our` ease.
 *
 * When reduce-motion is active the tween is skipped entirely and units are
 * snapped to their end state — matching noho's snapAnimationEntry(), so the
 * content is never left invisible.
 */
export function MaskReveal({
  children,
  text,
  as: Tag = "div",
  className = "",
  stagger = 0.12,
  duration = 1,
  delay = 0,
  initialY = "100%",
  once = true,
  split = "none",
  start = "top 85%",
}: MaskRevealProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const id = useId();
  const { reduceMotion, registerReducedAnimation, unregisterReducedAnimation } =
    useEnergySaver();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const units = Array.from(
      el.querySelectorAll<HTMLElement>("[data-mask-inner]")
    );
    if (units.length === 0) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const gsap = initMotion();

    // Snap to end state and run nothing else.
    const snap = () => {
      gsap.set(units, { yPercent: 0, opacity: 1, clearProps: "transform" });
    };

    if (reduceMotion || prefersReduced) {
      snap();
      return;
    }

    gsap.set(units, { yPercent: 100 });

    const tween = gsap.to(units, {
      yPercent: 0,
      duration,
      delay,
      stagger,
      ease: EASE.our,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: once ? "play none none none" : "play none none reset",
        once,
      },
    });

    const kill = () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };

    // Let the energy-saver toggle cancel this mid-flight without a reload.
    registerReducedAnimation(id, { kill, snap });

    return () => {
      kill();
      unregisterReducedAnimation(id);
    };
  }, [
    reduceMotion,
    duration,
    delay,
    stagger,
    initialY,
    once,
    start,
    id,
    registerReducedAnimation,
    unregisterReducedAnimation,
    text,
    split,
  ]);

  // ── Build the masked units ──────────────────────────────────────────────
  let inner: React.ReactNode;

  if (text && split !== "none") {
    const parts =
      split === "words"
        ? text.split(" ")
        : split === "chars"
          ? Array.from(text)
          : text.split("\n");

    inner = parts.map((part, i) => (
      <span key={i} className="mask-reveal-line align-bottom">
        <span className="mask-reveal-inner" data-mask-inner>
          {part}
          {split === "words" && i < parts.length - 1 ? " " : ""}
        </span>
      </span>
    ));
  } else {
    // Block-level path: wrapping cards/sections must not shrink-wrap, so the
    // inner uses display:block rather than the inline-block text variant.
    inner = (
      <span className="mask-reveal-line">
        <span className="mask-reveal-inner mask-reveal-block" data-mask-inner>
          {text ?? children}
        </span>
      </span>
    );
  }

  return (
    <Tag
      ref={containerRef as React.Ref<HTMLElement>}
      className={className}
    >
      {inner}
    </Tag>
  );
}
