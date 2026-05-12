"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

const STATS = [
  { value: "4", labelKey: "productsShipped" as const, accent: "text-emerald-500" },
  { value: "250K+", labelKey: "dataProcessed" as const, accent: "text-orange-500" },
  { value: "4", labelKey: "activeProjects" as const, accent: "text-blue-500" },
  { value: "6", labelKey: "techMastered" as const, accent: "text-purple-500" },
  { value: "<1yr", labelKey: "devTime" as const, accent: "text-pink-500" },
  { value: "10x", labelKey: "productivity" as const, accent: "text-yellow-500" },
];

export function StatsStrip() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
      {STATS.map((s, i) => (
        <motion.div
          key={s.labelKey}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-3 text-center"
        >
          <p className={`font-extrabold text-lg md:text-xl ${s.accent}`}>{s.value}</p>
          <p className="text-zinc-500 text-[10px] font-medium mt-0.5 leading-tight">{t[s.labelKey]}</p>
        </motion.div>
      ))}
    </div>
  );
}
