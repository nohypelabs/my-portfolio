"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { AnimatedCounter } from "@/components/AnimatedCounter";

interface Metrics {
  seratQc: { entries: number; photos: number };
  wcCheck: { inspections: number; users: number; locations: number };
  lakuPos: { transactions: number; products: number; outlets: number };
  ecommerce: { products: number; orders: number; users: number };
}

const FALLBACK: Metrics = {
  seratQc: { entries: 80187, photos: 160374 },
  wcCheck: { inspections: 3293, users: 53, locations: 49 },
  lakuPos: { transactions: 11, products: 2, outlets: 4 },
  ecommerce: { products: 16, orders: 6, users: 5 },
};

function deriveStats(m: Metrics) {
  const totalData =
    m.seratQc.entries + m.seratQc.photos + m.wcCheck.inspections;
  const activeProjects = [
    m.seratQc.entries > 0,
    m.wcCheck.inspections > 0,
    m.lakuPos.transactions > 0,
    m.ecommerce.orders > 0,
  ].filter(Boolean).length;

  return { totalData, activeProjects };
}

export function StatsStrip() {
  const { language } = useLanguage();
  const t = translations[language];
  const [metrics, setMetrics] = useState<Metrics | null>(null);

  useEffect(() => {
    fetch("/api/live-metrics")
      .then((r) => r.json())
      .then((data: Metrics) => setMetrics(data))
      .catch(() => {});
  }, []);

  const m = metrics ?? FALLBACK;
  const { totalData, activeProjects } = deriveStats(m);

  const stats = [
    { value: activeProjects, labelKey: "productsShipped" as const, accent: "text-accent", iconBg: "bg-accent-light" },
    { value: totalData, labelKey: "dataProcessed" as const, accent: "text-foreground", iconBg: "bg-money" },
    { value: activeProjects, labelKey: "activeProjects" as const, accent: "text-foreground", iconBg: "bg-splash text-white" },
    { value: 6, labelKey: "techMastered" as const, accent: "text-foreground", iconBg: "bg-double text-white" },
    { value: 0, labelKey: "devTime" as const, accent: "text-foreground", iconBg: "bg-[#ffd9ee]", display: "<1yr" },
    { value: 0, labelKey: "productivity" as const, accent: "text-foreground", iconBg: "bg-[#fff3c4]", display: "Weeks" },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
      {stats.map((s, i) => (
        <motion.div
          key={s.labelKey}
          initial={{ opacity: 0, y: 15, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.5 }}
          className="neo-surface rounded-[8px] p-4 text-center transition-all duration-300 group"
        >
          <div className={`w-9 h-9 border-2 border-foreground rounded-[6px] ${s.iconBg} flex items-center justify-center mx-auto mb-2.5 shadow-[2px_2px_0px_#141414] group-hover:scale-105 transition-transform`}>
            <div className="w-2.5 h-2.5 border border-foreground rounded-full bg-foreground" />
          </div>
          <p className="font-extrabold text-lg md:text-xl text-foreground font-mono">
            {s.display ? (
              s.display
            ) : metrics === null && i < 3 ? (
              "—"
            ) : (
              <AnimatedCounter end={s.value} duration={2} />
            )}
          </p>
          <p className="text-neutral-700 text-[10px] font-bold mt-1 leading-tight font-mono">{t[s.labelKey]}</p>
        </motion.div>
      ))}
    </div>
  );
}
