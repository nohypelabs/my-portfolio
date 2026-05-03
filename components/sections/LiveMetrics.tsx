"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Activity,
  Camera,
  ChevronDown,
  ClipboardCheck,
  Database,
  ExternalLink,
  MapPin,
  Package,
  RefreshCw,
  ShoppingCart,
  Store,
  Users,
  Box,
  Receipt,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

interface Metrics {
  seratQc: { entries: number; photos: number };
  wcCheck: { inspections: number; users: number; locations: number };
  lakuPos: { transactions: number; products: number; outlets: number };
  ecommerce: { products: number; orders: number; users: number };
  fetchedAt: string;
  cached?: boolean;
}

const FALLBACK: Metrics = {
  seratQc: { entries: 80187, photos: 160374 },
  wcCheck: { inspections: 3293, users: 53, locations: 49 },
  lakuPos: { transactions: 11, products: 2, outlets: 4 },
  ecommerce: { products: 0, orders: 0, users: 0 },
  fetchedAt: new Date().toISOString(),
  cached: true,
};

function AnimatedNumber({
  value,
  duration = 2000,
  started,
  generation,
}: {
  value: number;
  duration?: number;
  started: boolean;
  generation: number;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!started || value === 0) return;
    setDisplay(0);
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.floor(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [value, duration, started, generation]);

  return <>{display.toLocaleString("id-ID")}</>;
}

function SkeletonCard({ wide = false }: { wide?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-xl md:rounded-2xl p-4 md:p-6 border bg-white/5 border-white/10`}>
      <div className="animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-white/10" />
          <div className="h-3 w-20 rounded bg-white/10" />
        </div>
        <div className={`h-8 md:h-12 ${wide ? "w-32 md:w-44" : "w-16 md:w-24"} rounded bg-white/10`} />
      </div>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}

function SkeletonGroup() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-white/10 animate-pulse" />
          <div className="h-4 w-48 rounded bg-white/10 animate-pulse" />
        </div>
        <div className="h-3 w-16 rounded bg-white/10 animate-pulse" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 md:gap-4">
        <SkeletonCard wide />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}

function formatTime(iso: string) {
  try {
    return new Date(iso).toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return "";
  }
}

interface ProjectGroup {
  name: string;
  link: string;
  demo: string;
  accent: string;
  cards: {
    key: string;
    labelKey: string;
    icon: typeof Package;
    getValue: (m: Metrics) => number;
    highlight?: boolean;
  }[];
}

function getProjectGroups(): ProjectGroup[] {
  return [
    {
      name: "Serat QC — Selisih Berat J&T Express",
      link: "/projects/selisih-berat",
      demo: "https://selisih-berat.vercel.app",
      accent: "emerald",
      cards: [
        { key: "serat-entries", labelKey: "receiptsProcessed", icon: Package, getValue: (m) => m.seratQc.entries, highlight: true },
        { key: "serat-photos", labelKey: "gpsWatermarkedPhotos", icon: Camera, getValue: (m) => m.seratQc.photos, highlight: true },
      ],
    },
    {
      name: "WC Check — Toilet Inspection System",
      link: "/projects/wc-check",
      demo: "https://wc-checks.vercel.app",
      accent: "purple",
      cards: [
        { key: "wc-inspections", labelKey: "inspectionsRecorded", icon: ClipboardCheck, getValue: (m) => m.wcCheck.inspections, highlight: true },
        { key: "wc-users", labelKey: "registeredUsers", icon: Users, getValue: (m) => m.wcCheck.users },
        { key: "wc-locations", labelKey: "managedLocations", icon: MapPin, getValue: (m) => m.wcCheck.locations },
      ],
    },
    {
      name: "LakuPOS — Kasir & Warehouse System",
      link: "/projects/lakupos",
      demo: "https://lakupos.vercel.app",
      accent: "blue",
      cards: [
        { key: "laku-transactions", labelKey: "transactions", icon: Receipt, getValue: (m) => m.lakuPos.transactions, highlight: true },
        { key: "laku-products", labelKey: "registeredProducts", icon: Box, getValue: (m) => m.lakuPos.products },
        { key: "laku-outlets", labelKey: "activeOutlets", icon: Store, getValue: (m) => m.lakuPos.outlets },
      ],
    },
    {
      name: "Qohira — Online Shop",
      link: "/projects/ecommerce-manual",
      demo: "https://qohira.vercel.app",
      accent: "orange",
      cards: [
        { key: "ecom-products", labelKey: "products", icon: ShoppingCart, getValue: (m) => m.ecommerce.products, highlight: true },
        { key: "ecom-orders", labelKey: "orders", icon: Receipt, getValue: (m) => m.ecommerce.orders },
        { key: "ecom-users", labelKey: "users", icon: Users, getValue: (m) => m.ecommerce.users },
      ],
    },
  ];
}

export function LiveMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isLive, setIsLive] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [generation, setGeneration] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const started = isInView && metrics !== null;
  const { language } = useLanguage();
  const t = translations[language];
  const projectGroups = getProjectGroups();

  const fetchMetrics = (bustCache = false) => {
    setRefreshing(true);
    const url = bustCache ? `/api/live-metrics?t=${Date.now()}` : "/api/live-metrics";
    fetch(url)
      .then((r) => r.json())
      .then((data: Metrics) => {
        setMetrics(data);
        setIsLive(!data.cached);
        if (bustCache) setGeneration((g) => g + 1);
      })
      .catch(() => setMetrics(FALLBACK))
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const data = metrics ?? FALLBACK;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="noise-overlay relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 dark:from-zinc-950 dark:via-zinc-950 dark:to-emerald-950 rounded-3xl p-6 md:p-10 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/8 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-3 group text-left">
            <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Database className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                  {t.liveProductionData}
                </h2>
                <div className="p-1 rounded-lg bg-white/5 group-hover:bg-white/10 transition-colors">
                  <motion.div animate={{ rotate: expanded ? 0 : -90 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-zinc-400" />
                  </motion.div>
                </div>
              </div>
              <p className="text-sm text-zinc-400 max-w-lg mt-1">
                {t.liveMetricsDesc}
              </p>
            </div>
          </button>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => fetchMetrics(true)}
                disabled={refreshing}
                className="group/btn flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 hover:border-emerald-500/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-xs font-semibold text-emerald-400"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : "group-hover/btn:rotate-180 transition-transform duration-500"}`} />
                {refreshing ? t.fetching : t.fetchLatest}
              </button>

              <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <span className="relative flex h-3 w-3">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isLive ? "animate-ping bg-emerald-400" : "bg-yellow-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      isLive ? "bg-emerald-500" : "bg-yellow-500"
                    }`}
                  />
                </span>
                <div className="text-xs">
                  <p className="font-semibold text-white">
                    {isLive ? "LIVE" : t.loading}
                  </p>
                  {isLive && metrics?.fetchedAt && (
                    <p className="text-zinc-500">
                      {t.fetched} {formatTime(metrics.fetchedAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <p className="text-[10px] text-zinc-500 text-right">
              {t.fetchHint}
            </p>
          </div>
        </div>

        {/* Project Groups */}
        <AnimatePresence initial={false}>
        {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
        <div className="space-y-4">
          {!metrics && (
            <>
              <SkeletonGroup />
              <SkeletonGroup />
              <SkeletonGroup />
              <SkeletonGroup />
            </>
          )}
          {metrics && projectGroups.map((group, gi) => {
            const accentMap: Record<string, { border: string; bg: string; icon: string; dot: string }> = {
              emerald: { border: "border-l-emerald-500/40", bg: "bg-emerald-500/5", icon: "text-emerald-500", dot: "bg-emerald-500" },
              purple: { border: "border-l-purple-500/40", bg: "bg-purple-500/5", icon: "text-purple-500", dot: "bg-purple-500" },
              blue: { border: "border-l-blue-500/40", bg: "bg-blue-500/5", icon: "text-blue-500", dot: "bg-blue-500" },
              orange: { border: "border-l-orange-500/40", bg: "bg-orange-500/5", icon: "text-orange-500", dot: "bg-orange-500" },
            };
            const accent = accentMap[group.accent] ?? accentMap.emerald;

            return (
            <div
              key={group.name}
              className={`rounded-xl ${accent.bg} border border-white/5 ${accent.border} border-l-2 p-4 md:p-5`}
            >
              <div className="flex items-center justify-between mb-4">
                <Link
                  href={group.link}
                  className="group flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-white transition-colors"
                >
                  <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
                  {group.name}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <a
                  href={group.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-xs font-medium flex items-center gap-1 transition-colors ${accent.icon} hover:brightness-125`}
                >
                  {t.visitApp} <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div
                className={`grid gap-2.5 md:gap-4 ${
                  group.cards.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-2 md:grid-cols-3"
                }`}
              >
                {group.cards.map((card, ci) => {
                  const Icon = card.icon;
                  const value = card.getValue(data);
                  const isHero = card.highlight && value >= 1000;
                  return (
                    <motion.div
                      key={card.key}
                      initial={{ opacity: 0, scale: 0.95, y: 16 }}
                      animate={
                        started
                          ? { opacity: 1, scale: 1, y: 0 }
                          : { opacity: 0, scale: 0.95, y: 16 }
                      }
                      transition={{
                        delay: 0.15 + gi * 0.2 + ci * 0.1,
                        duration: 0.4,
                      }}
                      className={`relative overflow-hidden rounded-xl md:rounded-2xl p-4 md:p-6 border transition-shadow hover:shadow-2xl ${
                        isHero
                          ? "bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-emerald-500/20 hover:border-emerald-500/40"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {isHero && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                      )}
                      <div className="relative">
                        <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                          <div
                            className={`p-1 md:p-1.5 rounded-lg ${
                              isHero ? "bg-emerald-500/20" : "bg-white/10"
                            }`}
                          >
                            <Icon
                              className={`w-3.5 h-3.5 md:w-4 md:h-4 ${
                                isHero ? "text-emerald-400" : "text-zinc-400"
                              }`}
                            />
                          </div>
                          <span className="text-[10px] md:text-xs font-medium text-zinc-400 uppercase tracking-wider">
                            {(t as Record<string, string>)[card.labelKey] ?? card.labelKey}
                          </span>
                        </div>
                        <p
                          className={`font-extrabold tracking-tight ${
                            isHero
                              ? "text-2xl sm:text-4xl md:text-5xl bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent"
                              : "text-xl sm:text-3xl md:text-4xl text-white"
                          }`}
                        >
                          <AnimatedNumber
                            value={value}
                            duration={isHero ? 2200 : 1400}
                            started={started}
                            generation={generation}
                          />
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">
            {t.liveMetricsFooter}
          </p>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
              Supabase
            </span>
            <span className="px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-[10px] font-semibold text-blue-400 uppercase tracking-wider">
              PostgreSQL
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              4 {t.databases}
            </span>
          </div>
        </div>
        </motion.div>
        )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}
