"use client";

import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const target = language === "en" ? "id" : "en";

  return (
    <button
      onClick={() => setLanguage(target)}
      className="group relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-border/50 border border-border hover:border-emerald-500/30 hover:bg-border transition-all"
      aria-label="Switch language"
      title={language === "en" ? t.switchToId : t.switchToEn}
    >
      <Globe className="w-3.5 h-3.5 text-muted group-hover:text-emerald-500 transition-colors" />
      <div className="relative w-7 h-5 overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={language}
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-foreground group-hover:text-emerald-500 transition-colors"
          >
            {target.toUpperCase()}
          </motion.span>
        </AnimatePresence>
      </div>
    </button>
  );
}
