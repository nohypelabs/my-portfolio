/**
 * Shared GSAP easing registry.
 *
 * Curve values are the ones the noho.ink bundle registers (see
 * docs/noho-implementation-plan.md §1.4). Registering them once here keeps
 * every scroll/reveal animation on the same motion signature.
 *
 * Safe to call repeatedly and safe to call on the server (it no-ops).
 */
import { gsap } from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const EASE = {
  our: "custom-our",
  popup: "custom-popup",
  slogan: "custom-slogan",
  cascade: "cascade",
  hero1: "hero1",
  hero2: "hero2",
  preloader: "preloader",
} as const;

const CURVES: Array<[string, string]> = [
  [EASE.our, "0.17, 0.17, 0.0, 1.0"],
  [EASE.popup, "0.6, 0.0, 0.0, 1.0"],
  [EASE.slogan, "0.17, 0.17, 0.255, 0.902"],
  [EASE.cascade, "M0,0 C0.2,0 0.1,1 1,1"],
  [EASE.hero1, "M0,0 C0.64,0.0 0.47,0.57 1,1"],
  [EASE.hero2, "M0,0 C0.16,0.56 0.44,1.0 1,1"],
  [EASE.preloader, "M0,0 C0.5,0.0 0.0,1.0 1,1"],
];

let registered = false;

/** Registers plugins + custom eases exactly once. Returns the gsap instance. */
export function initMotion() {
  if (typeof window === "undefined") return gsap;
  if (registered) return gsap;

  gsap.registerPlugin(CustomEase, ScrollTrigger);
  for (const [name, curve] of CURVES) {
    // CustomEase.create is idempotent per name, but guard anyway.
    if (!CustomEase.get?.(name)) CustomEase.create(name, curve);
  }

  // noho drives Lenis from the ticker; disabling lag smoothing stops GSAP from
  // clamping deltas after a stall, which otherwise makes scroll-linked
  // animations jump.
  gsap.ticker.lagSmoothing(0);

  registered = true;
  return gsap;
}

export { gsap, ScrollTrigger };
