"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

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

function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M+`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K+`;
  return String(n);
}

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
    { value: String(activeProjects), labelKey: "productsShipped" as const, accent: "text-[#0D9488]" },
    { value: formatCompact(totalData), labelKey: "dataProcessed" as const, accent: "text-orange-500" },
    { value: String(activeProjects), labelKey: "activeProjects" as const, accent: "text-blue-500" },
    { value: "6", labelKey: "techMastered" as const, accent: "text-purple-500" },
    { value: "<1yr", labelKey: "devTime" as const, accent: "text-pink-500" },
    { value: "Weeks", labelKey: "productivity" as const, accent: "text-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
      {stats.map((s, i) => (
        <motion.div
          key={s.labelKey}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="bg-[#FAFAFA] border border-neutral-400 rounded-xl p-3 text-center hover:shadow-sm transition-all duration-200"
        >
          <p className={`font-extrabold text-lg md:text-xl ${s.accent}`}>
            {metrics === null && i < 3 ? "—" : s.value}
          </p>
          <p className="text-muted text-[10px] font-medium mt-0.5 leading-tight">{t[s.labelKey]}</p>
        </motion.div>
      ))}
    </div>
  );
}
