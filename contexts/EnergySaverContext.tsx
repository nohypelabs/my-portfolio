"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
} from "react";
import { useTheme } from "next-themes";

export type EnergyLevel = "low" | "med" | "high";

/** A registered animation that reduce-motion can cancel mid-flight. */
export interface ReducedAnimationEntry {
  /** Tear down the tween + its ScrollTrigger. */
  kill: () => void;
  /** Jump the target to its end state (never leave content hidden). */
  snap: () => void;
}

interface EnergySaverContextValue {
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  isDark: boolean;
  toggleDark: () => void;
  energyLevel: EnergyLevel;
  mounted: boolean;
  /** True while the tab is hidden — consumers should pause heavy rendering. */
  runtimePaused: boolean;
  registerReducedAnimation: (id: string, entry: ReducedAnimationEntry) => void;
  unregisterReducedAnimation: (id: string) => void;
}

const EnergySaverContext = createContext<EnergySaverContextValue | null>(null);

const STORAGE_KEY = "nasaq:reduce-motion";
const REDUCE_MOTION_EVENT = "nasaq:reduce-motion-change";

function getReduceMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribeReduceMotion(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onChange = () => callback();
  window.addEventListener("storage", onChange);
  window.addEventListener(REDUCE_MOTION_EVENT, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(REDUCE_MOTION_EVENT, onChange);
  };
}

function setStoredReduceMotion(next: boolean) {
  try {
    if (next) window.localStorage.setItem(STORAGE_KEY, "1");
    else window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(REDUCE_MOTION_EVENT));
  }
}

// ── Page Visibility store (mirrors html.noho-site-runtime-paused) ──────────
function subscribeVisibility(callback: () => void): () => void {
  if (typeof document === "undefined") return () => {};
  document.addEventListener("visibilitychange", callback);
  return () => document.removeEventListener("visibilitychange", callback);
}

function getVisibilitySnapshot(): boolean {
  if (typeof document === "undefined") return false;
  return document.hidden;
}

export function EnergySaverProvider({ children }: { children: React.ReactNode }) {
  const { setTheme, resolvedTheme } = useTheme();

  const reduceMotion = useSyncExternalStore(
    subscribeReduceMotion,
    getReduceMotionSnapshot,
    getReduceMotionSnapshot
  );

  const runtimePaused = useSyncExternalStore(
    subscribeVisibility,
    getVisibilitySnapshot,
    () => false
  );

  // Server snapshot returns false → render identical before/after hydration.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // ── Reduce-motion animation registry ────────────────────────────────────
  const registry = useRef(new Map<string, ReducedAnimationEntry>());

  const registerReducedAnimation = useCallback(
    (id: string, entry: ReducedAnimationEntry) => {
      registry.current.set(id, entry);
    },
    []
  );

  const unregisterReducedAnimation = useCallback((id: string) => {
    registry.current.delete(id);
  }, []);

  // When the toggle flips on, cancel every live animation to its end state.
  useEffect(() => {
    if (!reduceMotion) return;
    for (const entry of registry.current.values()) {
      try {
        entry.kill();
        entry.snap();
      } catch {
        /* a single bad entry must not break the sweep */
      }
    }
  }, [reduceMotion]);

  // Expose both flags as html attributes so pure-CSS rules can react.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.reduceMotion = reduceMotion ? "true" : "false";
    return () => {
      delete root.dataset.reduceMotion;
    };
  }, [reduceMotion]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.runtimePaused = runtimePaused ? "true" : "false";
    return () => {
      delete root.dataset.runtimePaused;
    };
  }, [runtimePaused]);

  const toggleReduceMotion = useCallback(() => {
    setStoredReduceMotion(!getReduceMotionSnapshot());
  }, []);

  const isDark = resolvedTheme === "dark";

  const toggleDark = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const energyLevel: EnergyLevel = useMemo(() => {
    if (isDark && reduceMotion) return "low";
    if (isDark || reduceMotion) return "med";
    return "high";
  }, [isDark, reduceMotion]);

  const value = useMemo(
    () => ({
      reduceMotion,
      toggleReduceMotion,
      isDark,
      toggleDark,
      energyLevel,
      mounted,
      runtimePaused,
      registerReducedAnimation,
      unregisterReducedAnimation,
    }),
    [
      reduceMotion,
      toggleReduceMotion,
      isDark,
      toggleDark,
      energyLevel,
      mounted,
      runtimePaused,
      registerReducedAnimation,
      unregisterReducedAnimation,
    ]
  );

  return <EnergySaverContext.Provider value={value}>{children}</EnergySaverContext.Provider>;
}

export function useEnergySaver() {
  const ctx = useContext(EnergySaverContext);
  if (!ctx) {
    throw new Error("useEnergySaver must be used within an EnergySaverProvider");
  }
  return ctx;
}
