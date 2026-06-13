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
    { value: activeProjects, labelKey: "productsShipped" as const, accent: "text-[#c4956a]", iconBg: "bg-[#c4956a]/10" },
    { value: totalData, labelKey: "dataProcessed" as const, accent: "text-orange-500", iconBg: "bg-orange-500/10" },
    { value: activeProjects, labelKey: "activeProjects" as const, accent: "text-blue-500", iconBg: "bg-blue-500/10" },
    { value: 6, labelKey: "techMastered" as const, accent: "text-purple-500", iconBg: "bg-purple-500/10" },
    { value: 0, labelKey: "devTime" as const, accent: "text-pink-500", iconBg: "bg-pink-500/10", display: "<1yr" },
    { value: 0, labelKey: "productivity" as const, accent: "text-yellow-600", iconBg: "bg-yellow-500/10", display: "Weeks" },
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
          className="bg-[#FAFAFA] border border-neutral-300 rounded-2xl p-4 text-center hover:shadow-md hover:border-[#c4956a]/20 transition-all duration-300 group"
        >
          <div className={`w-8 h-8 rounded-lg ${s.iconBg} flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform`}>
            <div className={`w-2 h-2 rounded-full ${s.accent.replace('text-', 'bg-')}`} />
          </div>
          <p className={`font-extrabold text-lg md:text-xl ${s.accent}`}>
            {s.display ? (
              s.display
            ) : metrics === null && i < 3 ? (
              "—"
            ) : (
              <AnimatedCounter end={s.value} duration={2} />
            )}
          </p>
          <p className="text-muted text-[10px] font-medium mt-1 leading-tight">{t[s.labelKey]}</p>
        </motion.div>
      ))}
    </div>
  );
}
