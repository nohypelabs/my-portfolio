"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
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
  seratQc: { entries: 112796, photos: 225592 },
  wcCheck: { inspections: 3293, users: 53, locations: 49 },
  lakuPos: { transactions: 11, products: 2, outlets: 4 },
  ecommerce: { products: 16, orders: 6, users: 5 },
  fetchedAt: new Date().toISOString(),
  cached: true,
};

function AnimatedNumber({
  value,
  duration = 2000,
  started,
}: {
  value: number;
  duration?: number;
  started: boolean;
}) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!started || value === 0) return;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.floor(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [value, duration, started]);

  return <>{display.toLocaleString("id-ID")}</>;
}

function SkeletonCard({ wide = false }: { wide?: boolean }) {
  return (
    <div className={`relative overflow-hidden rounded-[8px] md:rounded-[8px] p-4 md:p-6 border bg-surface border-foreground/20`}>
      <div className="animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-neutral-200" />
          <div className="h-3 w-20 rounded bg-neutral-200" />
        </div>
        <div className={`h-8 md:h-12 ${wide ? "w-32 md:w-44" : "w-16 md:w-24"} rounded bg-neutral-200`} />
      </div>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/60 to-transparent" />
    </div>
  );
}

function SkeletonGroup() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-neutral-200 animate-pulse" />
          <div className="h-4 w-48 rounded bg-neutral-200 animate-pulse" />
        </div>
        <div className="h-3 w-16 rounded bg-neutral-200 animate-pulse" />
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
  note?: string;
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
      note: "Recently deployed — client actively onboarding",
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

  const loadMetrics = async (bustCache = false): Promise<Metrics> => {
    const url = bustCache ? `/api/live-metrics?t=${Date.now()}` : "/api/live-metrics";
    const res = await fetch(url);
    return res.json();
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadMetrics(true)
      .then((data) => {
        setMetrics(data);
        setIsLive(!data.cached);
        setGeneration((g) => g + 1);
      })
      .catch(() => setMetrics(FALLBACK))
      .finally(() => setRefreshing(false));
  };

  useEffect(() => {
    let ignore = false;

    loadMetrics()
      .then((data) => {
        if (ignore) return;
        setMetrics(data);
        setIsLive(!data.cached);
      })
      .catch(() => {
        if (!ignore) setMetrics(FALLBACK);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const data = metrics ?? FALLBACK;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden neo-surface rounded-[8px] p-6 md:p-10 text-foreground"
    >
      <div className="relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-3 group text-left">
            <div className="p-2 rounded-[8px] bg-surface border border-foreground/40">
              <Database className="w-5 h-5 text-accent" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
                  {t.liveProductionData}
                </h2>
                <div className="p-1 rounded-lg bg-accent-bg group-hover:bg-accent-light/40 transition-colors">
                  <motion.div animate={{ rotate: expanded ? 0 : -90 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="w-4 h-4 text-neutral-500" />
                  </motion.div>
                </div>
              </div>
              <p className="text-sm text-neutral-500 max-w-lg mt-1">
                {t.liveMetricsDesc}
              </p>
            </div>
          </button>

          <div className="flex flex-col items-end gap-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => handleRefresh()}
                disabled={refreshing}
                className="group/btn flex items-center gap-2 px-4 py-2.5 rounded-[8px] bg-surface border border-foreground/40 hover:bg-accent-light/30 disabled:opacity-60 disabled:cursor-not-allowed transition-all text-xs font-semibold text-accent"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : "group-hover/btn:rotate-180 transition-transform duration-500"}`} />
                {refreshing ? t.fetching : t.fetchLatest}
              </button>

              <div className="flex items-center gap-3 px-4 py-2.5 rounded-[8px] bg-surface border border-foreground/40">
                <span className="relative flex h-3 w-3">
                  <span
                    className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                      isLive ? "animate-ping bg-accent-light" : "bg-yellow-400"
                    }`}
                  />
                  <span
                    className={`relative inline-flex rounded-full h-3 w-3 ${
                      isLive ? "bg-accent-light" : "bg-yellow-500"
                    }`}
                  />
                </span>
                <div className="text-xs">
                  <p className="font-semibold text-foreground">
                    {isLive ? "LIVE" : t.loading}
                  </p>
                  {isLive && metrics?.fetchedAt && (
                    <p className="text-neutral-400">
                      {t.fetched} {formatTime(metrics.fetchedAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <p className="text-[10px] text-neutral-400 text-right">
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
            const accentMap: Record<string, { border: string; bg: string; icon: string; dot: string; btnBorder: string }> = {
              emerald: { border: "border-l-accent", bg: "bg-surface", icon: "text-accent", dot: "bg-accent-light", btnBorder: "border-foreground/40" },
              purple: { border: "border-l-purple-500", bg: "bg-surface", icon: "text-purple-600", dot: "bg-purple-500", btnBorder: "border-foreground/40" },
              blue: { border: "border-l-blue-500", bg: "bg-surface", icon: "text-blue-600", dot: "bg-blue-500", btnBorder: "border-foreground/40" },
              orange: { border: "border-l-orange-500", bg: "bg-surface", icon: "text-orange-600", dot: "bg-orange-500", btnBorder: "border-foreground/40" },
            };
            const accent = accentMap[group.accent] ?? accentMap.emerald;

            return (
            <div
              key={group.name}
              className={`rounded-[8px] ${accent.bg} border border-foreground/40 ${accent.border} border-l-2 p-4 md:p-5`}
            >
              <div className="flex items-center justify-between mb-4">
                <Link
                  href={group.link}
                  className="group flex items-center gap-2 text-sm font-semibold text-neutral-700 hover:text-foreground transition-colors"
                >
                  <span className={`w-2 h-2 rounded-full ${accent.dot}`} />
                  {group.name}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                {group.note && (
                  <span className="text-[10px] text-neutral-400 ml-4 mt-0.5 italic">
                    {group.note}
                  </span>
                )}
                <a
                  href={group.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all bg-surface ${accent.btnBorder} ${accent.icon} hover:bg-accent-bg`}
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
                      className={`relative overflow-hidden rounded-[8px] md:rounded-[8px] p-4 md:p-6 transition-shadow hover:shadow-2xl ${
                        isHero
                          ? "neo-pressed"
                          : "bg-surface"
                      }`}
                    >
                      <div className="relative">
                        <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
                          <div
                            className={`p-1 md:p-1.5 rounded-lg ${
                              isHero ? "bg-surface" : "bg-accent-bg"
                            }`}
                          >
                            <Icon
                              className={`w-3.5 h-3.5 md:w-4 md:h-4 ${
                                isHero ? "text-accent" : "text-neutral-500"
                              }`}
                            />
                          </div>
                          <span className="text-[10px] md:text-xs font-medium text-neutral-500 uppercase tracking-wider">
                            {(t as Record<string, string>)[card.labelKey] ?? card.labelKey}
                          </span>
                        </div>
                        <p
                          className={`font-extrabold tracking-tight ${
                            isHero
                              ? "text-2xl sm:text-4xl md:text-5xl text-accent"
                              : "text-xl sm:text-3xl md:text-4xl text-foreground"
                          }`}
                        >
                          <AnimatedNumber
                            key={generation}
                            value={value}
                            duration={isHero ? 2200 : 1400}
                            started={started}
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
        <div className="mt-8 pt-6 border-t border-foreground/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-neutral-400">
            {t.liveMetricsFooter}
          </p>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-surface border border-foreground/40 text-[10px] font-semibold text-accent uppercase tracking-wider">
              Supabase
            </span>
            <span className="px-2.5 py-1 rounded-md bg-surface border border-foreground/40 text-[10px] font-semibold text-blue-600 uppercase tracking-wider">
              PostgreSQL
            </span>
            <span className="px-2.5 py-1 rounded-md bg-surface border border-foreground/40 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
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
