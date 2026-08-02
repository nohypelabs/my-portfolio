"use client";

import { motion } from "framer-motion";
import { Moon, Zap } from "lucide-react";
import { useEnergySaver } from "@/contexts/EnergySaverContext";
import { translations } from "@/lib/translations";

const ENERGY = {
  low: { dot: "bg-money", label: translations.id.energyLow },
  med: { dot: "bg-amber-400", label: translations.id.energyMed },
  high: { dot: "bg-punch", label: translations.id.energyHigh },
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
      className={`relative flex h-6 w-10 items-center rounded-full border transition-colors ${
        checked ? "border-accent bg-accent/20" : "border-foreground/15 bg-foreground/5"
      }`}
    >
      <span className="sr-only">{label}</span>
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 32 }}
        className={`flex h-4.5 w-4.5 items-center justify-center overflow-hidden rounded-full text-foreground transition-colors ${
          checked ? "ml-[22px] bg-accent text-white" : "ml-[2px] border border-foreground/15 bg-surface-solid"
        }`}
      >
        <span className="scale-[0.72]">{icon}</span>
      </motion.span>
    </button>
  );
}

export function EnergySaverPanel() {
  const { reduceMotion, toggleReduceMotion, isDark, toggleDark, energyLevel, mounted } = useEnergySaver();

  if (!mounted) return null;

  const badge = ENERGY[energyLevel];

  return (
    <div className="hidden sm:flex items-center gap-2 rounded-full glass px-2.5 py-1.5">
      <Switch
        checked={isDark}
        onToggle={toggleDark}
        label={translations.id.playerDarkMode}
        icon={<Moon className="h-3.5 w-3.5" />}
      />
      <Switch
        checked={reduceMotion}
        onToggle={toggleReduceMotion}
        label={translations.id.playerReduceMotion}
        icon={<Zap className="h-3.5 w-3.5" />}
      />
      <span
        className="flex items-center gap-1.5 rounded-full px-2 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em]"
        title={`${translations.id.energyUsage}: ${badge.label}`}
      >
        <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
        <span className="text-foreground/60">{translations.id.energyUsage}</span>
        <span className="text-foreground">{badge.label}</span>
      </span>
    </div>
  );
}