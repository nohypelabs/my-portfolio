"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

export type EnergyLevel = "low" | "med" | "high";

interface EnergySaverContextValue {
  reduceMotion: boolean;
  toggleReduceMotion: () => void;
  isDark: boolean;
  toggleDark: () => void;
  energyLevel: EnergyLevel;
  mounted: boolean;
}

const EnergySaverContext = createContext<EnergySaverContextValue | null>(null);

const STORAGE_KEY = "nasaq:reduce-motion";

function getReduceMotionSnapshot(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

const REDUCE_MOTION_EVENT = "nasaq:reduce-motion-change";

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

export function EnergySaverProvider({ children }: { children: React.ReactNode }) {
  const { setTheme, resolvedTheme } = useTheme();

  const reduceMotion = useSyncExternalStore(
    subscribeReduceMotion,
    getReduceMotionSnapshot,
    getReduceMotionSnapshot
  );

  // Server snapshot returns false → render identical before/after hydration; true only on client.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

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
    }),
    [reduceMotion, toggleReduceMotion, isDark, toggleDark, energyLevel, mounted]
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