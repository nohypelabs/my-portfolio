"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Zap } from "lucide-react";
import { useEnergySaver } from "@/contexts/EnergySaverContext";
import { translations } from "@/lib/translations";

const t = translations.id;

const ENERGY = {
  low: { dot: "bg-money", label: t.energyLow },
  med: { dot: "bg-amber-400", label: t.energyMed },
  high: { dot: "bg-punch", label: t.energyHigh },
} as const;

function Switch({
  checked,
  onToggle,
  label,
  icon,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
      className={`relative flex h-6 w-10 shrink-0 items-center rounded-full border transition-colors ${
        checked
          ? "border-transparent bg-[var(--bg-switch-active)]"
          : "border-[var(--border-hairline)] bg-[var(--bg-switch)]"
      }`}
    >
      <span className="sr-only">{label}</span>
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={`flex h-[18px] w-[18px] items-center justify-center overflow-hidden rounded-full bg-[var(--bg-inner-switch)] text-foreground ${
          checked ? "ml-[20px]" : "ml-[2px]"
        }`}
      >
        <span className="scale-[0.72]">{icon}</span>
      </motion.span>
    </button>
  );
}

export function EnergySaverPanel() {
  const { reduceMotion, toggleReduceMotion, isDark, toggleDark, energyLevel, mounted } =
    useEnergySaver();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close on outside click / Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!mounted) return null;

  const badge = ENERGY[energyLevel];

  return (
    <div ref={rootRef} className="relative hidden sm:block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="dialog"
        aria-label={t.energyPanelToggleAria}
        className="flex items-center gap-1.5 rounded-full soft-border bg-[var(--bg-element)] px-2.5 py-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] transition-colors hover:bg-[var(--bg-element-hover)]"
      >
        <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
        <span className="text-foreground/60">{t.energyUsage}</span>
        <span className="text-foreground">{badge.label}</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t.energyPanelTitle}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18, ease: [0.6, 0, 0, 1] }}
            className="absolute right-0 z-50 mt-2 w-[310px] rounded-2xl soft-border bg-[var(--bg-element)] p-4 shadow-lg"
          >
            <p className="font-display text-[13px] font-semibold text-foreground">
              {t.energyPanelTitle}
            </p>
            <p className="mt-1.5 text-[12px] leading-relaxed text-foreground/70">
              {t.energyPanelBody}
            </p>

            <div className="mt-4 space-y-3">
              <div className="flex items-start gap-3">
                <Switch
                  checked={isDark}
                  onToggle={toggleDark}
                  label={t.playerDarkMode}
                  icon={<Moon className="h-3.5 w-3.5" />}
                />
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-foreground">
                    {t.energyPanelDarkLabel}
                  </p>
                  <p className="text-[11px] leading-snug text-foreground/60">
                    {t.energyPanelDarkHint}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Switch
                  checked={reduceMotion}
                  onToggle={toggleReduceMotion}
                  label={t.playerReduceMotion}
                  icon={<Zap className="h-3.5 w-3.5" />}
                />
                <div className="min-w-0">
                  <p className="text-[12px] font-medium text-foreground">
                    {t.energyPanelMotionLabel}
                  </p>
                  <p className="text-[11px] leading-snug text-foreground/60">
                    {t.energyPanelMotionHint}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[var(--border-hairline)] pt-3 font-mono text-[10px] uppercase tracking-[0.14em]">
              <span className="text-foreground/60">{t.energyPanelCurrent}</span>
              <span className="flex items-center gap-1.5 text-foreground">
                <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
                {badge.label}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
