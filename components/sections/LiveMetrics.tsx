"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useEnergySaver } from "@/contexts/EnergySaverContext";
import {
  Camera,
  ClipboardCheck,
  ExternalLink,
  MapPin,
  Package,
  RefreshCw,
  ShoppingCart,
  Users,
  Box,
  Receipt,
  Store,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

// ── Types ──────────────────────────────────────────────────────────────────────

interface Metrics {
  seratQc: { entries: number; photos: number };
  wcCheck: { inspections: number; users: number; locations: number };
  lakuPos: { transactions: number; products: number; outlets: number };
  ecommerce: { products: number; orders: number; users: number };
  fetchedAt: string;
  cached?: boolean;
}

interface LogEntry {
  ts: string;
  level: "info" | "fetch" | "ok" | "warn" | "error" | "success";
  msg: string;
  ms?: number;
}

interface ApiResponse {
  metrics: Metrics;
  logs: LogEntry[];
  fetchedAt: string;
  cached?: boolean;
}

const FALLBACK: Metrics = {
  seratQc: { entries: 112796, photos: 225592 },
  wcCheck: { inspections: 4513, users: 53, locations: 49 },
  lakuPos: { transactions: 11, products: 2, outlets: 4 },
  ecommerce: { products: 16, orders: 6, users: 5 },
  fetchedAt: new Date().toISOString(),
  cached: true,
};

// ── Animated number ────────────────────────────────────────────────────────────

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

// ── Log level styling ──────────────────────────────────────────────────────────

const LEVEL_STYLE: Record<string, { tag: string; color: string }> = {
  info:    { tag: "INFO",    color: "text-foreground/50" },
  fetch:   { tag: "FETCH",   color: "text-[var(--indicator-green)]" },
  ok:      { tag: "OK",      color: "text-[var(--indicator-green)]" },
  warn:    { tag: "WARN",    color: "text-[var(--indicator-red)]" },
  error:   { tag: "ERROR",   color: "text-[var(--indicator-red)]" },
  success: { tag: "SUCCESS", color: "text-[var(--indicator-green)]" },
};

// ── Dashboard card config ──────────────────────────────────────────────────────

interface DashboardCard {
  id: string;
  name: string;
  shortName: string;
  link: string;
  demo: string;
  surface: string;
  metrics: {
    key: string;
    labelKey: string;
    icon: typeof Package;
    getValue: (m: Metrics) => number;
    highlight?: boolean;
  }[];
}

function getDashboardCards(): DashboardCard[] {
  return [
    {
      id: "serat",
      name: "Serat QC",
      shortName: "Selisih Berat J&T Express",
      link: "/projects/selisih-berat",
      demo: "https://selisih-berat.vercel.app",
      surface: "bg-[var(--bg-element)]",
      metrics: [
        { key: "entries", labelKey: "receiptsProcessed", icon: Package, getValue: (m) => m.seratQc.entries, highlight: true },
        { key: "photos", labelKey: "gpsWatermarkedPhotos", icon: Camera, getValue: (m) => m.seratQc.photos, highlight: true },
      ],
    },
    {
      id: "wc",
      name: "WC Check",
      shortName: "Toilet Inspection System",
      link: "/projects/wc-check",
      demo: "https://wc-checks.vercel.app",
      surface: "bg-[var(--bg-element-second)]",
      metrics: [
        { key: "inspections", labelKey: "inspectionsRecorded", icon: ClipboardCheck, getValue: (m) => m.wcCheck.inspections, highlight: true },
        { key: "users", labelKey: "registeredUsers", icon: Users, getValue: (m) => m.wcCheck.users },
        { key: "locations", labelKey: "managedLocations", icon: MapPin, getValue: (m) => m.wcCheck.locations },
      ],
    },
    {
      id: "laku",
      name: "LakuPOS",
      shortName: "Kasir & Warehouse System",
      link: "/projects/lakupos",
      demo: "https://lakupos.vercel.app",
      surface: "bg-[var(--bg-element-third)]",
      metrics: [
        { key: "transactions", labelKey: "transactions", icon: Receipt, getValue: (m) => m.lakuPos.transactions, highlight: true },
        { key: "products", labelKey: "registeredProducts", icon: Box, getValue: (m) => m.lakuPos.products },
        { key: "outlets", labelKey: "activeOutlets", icon: Store, getValue: (m) => m.lakuPos.outlets },
      ],
    },
    {
      id: "qohira",
      name: "Qohira",
      shortName: "Online Shop",
      link: "/projects/ecommerce-manual",
      demo: "https://qohira.vercel.app",
      surface: "bg-[var(--bg-element-second)]",
      metrics: [
        { key: "products", labelKey: "products", icon: ShoppingCart, getValue: (m) => m.ecommerce.products, highlight: true },
        { key: "orders", labelKey: "orders", icon: Receipt, getValue: (m) => m.ecommerce.orders },
        { key: "users", labelKey: "users", icon: Users, getValue: (m) => m.ecommerce.users },
      ],
    },
  ];
}

// ── Skeleton shimmer ───────────────────────────────────────────────────────────

function SkeletonPulse({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded bg-[var(--bg-element-third)] ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
}

function DashboardCardSkeleton({ card }: { card: DashboardCard }) {
  return (
    <div className={`rounded-2xl ${card.surface} soft-border p-5`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[var(--dim-gray)]" />
          <div>
            <SkeletonPulse className="h-4 w-24 mb-1" />
            <SkeletonPulse className="h-2.5 w-32" />
          </div>
        </div>
        <SkeletonPulse className="h-5 w-12 rounded" />
      </div>
      <div className={`grid gap-2 ${card.metrics.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
        {card.metrics.map((m) => (
          <div key={m.key} className="rounded-xl p-3 soft-border bg-[var(--bg-page)]">
            <div className="flex items-center gap-1.5 mb-2">
              <SkeletonPulse className="h-5 w-5 rounded" />
              <SkeletonPulse className="h-2.5 w-16" />
            </div>
            <SkeletonPulse className="h-7 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TerminalSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden soft-border bg-[var(--bg-element)]">
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-element-second)] border-b border-[var(--border-hairline)]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--indicator-red)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--indicator-red)] opacity-40" />
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--indicator-green)]" />
          </div>
          <span className="text-[11px] font-mono text-foreground/50">nasaq-live — bash</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-[var(--dim-gray)]" />
          <SkeletonPulse className="h-3 w-20" />
        </div>
      </div>
      {/* Log area skeleton */}
      <div className="p-4 space-y-2">
        <SkeletonPulse className="h-3.5 w-full" />
        <SkeletonPulse className="h-3.5 w-3/4" />
        <SkeletonPulse className="h-3.5 w-5/6" />
        <SkeletonPulse className="h-3.5 w-2/3" />
      </div>
      {/* Footer */}
      <div className="px-4 py-2.5 border-t border-[var(--border-hairline)]">
        <SkeletonPulse className="h-3 w-48" />
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function LiveMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [visibleLogCount, setVisibleLogCount] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [logsDone, setLogsDone] = useState(false);
  const logEndRef = useRef<HTMLDivElement>(null);
  const { reduceMotion } = useEnergySaver();
  const { language } = useLanguage();
  const t = translations[language];
  const dashboardCards = getDashboardCards();

  // Auto-scroll log to bottom
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  }, [visibleLogCount, reduceMotion]);

  // Stagger log entries
  useEffect(() => {
    if (logs.length === 0) return;
    if (reduceMotion) {
      setVisibleLogCount(logs.length);
      setLogsDone(true);
      return;
    }
    if (visibleLogCount >= logs.length) {
      const t = setTimeout(() => setLogsDone(true), 400);
      return () => clearTimeout(t);
    }
    const delay = logs[visibleLogCount]?.level === "fetch" ? 350 : 180;
    const timer = setTimeout(() => setVisibleLogCount((c) => c + 1), delay);
    return () => clearTimeout(timer);
  }, [logs, visibleLogCount, reduceMotion]);

  const fetchMetrics = useCallback(async (bustCache = false) => {
    setRefreshing(true);
    setLogsDone(false);
    setVisibleLogCount(0);
    setLogs([]);
    setMetrics(null);

    try {
      const url = bustCache ? `/api/live-metrics?t=${Date.now()}` : "/api/live-metrics";
      const res = await fetch(url);
      const data: ApiResponse = await res.json();
      setMetrics(data.metrics);
      setIsLive(!data.cached);
      setLogs(data.logs);
    } catch {
      setMetrics(FALLBACK);
      setLogs([
        { ts: new Date().toISOString().replace("T", " ").slice(0, 23), level: "error", msg: "Connection failed — using cached data" },
        { ts: new Date().toISOString().replace("T", " ").slice(0, 23), level: "success", msg: "Fallback loaded ✓" },
      ]);
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  const data = metrics ?? FALLBACK;
  const uptimeStart = useRef(Date.now());
  const [uptime, setUptime] = useState("00:00:00");

  useEffect(() => {
    if (!logsDone) return;
    const interval = setInterval(() => {
      const diff = Math.floor((Date.now() - uptimeStart.current) / 1000);
      const h = String(Math.floor(diff / 3600)).padStart(2, "0");
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, "0");
      const s = String(diff % 60).padStart(2, "0");
      setUptime(`${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [logsDone]);

  return (
    <div className="space-y-4">
      {/* ── Dashboard cards grid ─────────────────────────────────────────── */}
      {!logsDone ? (
        <div className="grid gap-4 md:grid-cols-2">
          {dashboardCards.map((card) => (
            <DashboardCardSkeleton key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 animate-in fade-in duration-500">
          {dashboardCards.map((card) => (
          <div
            key={card.id}
            className={`rounded-2xl ${card.surface} soft-border p-5 transition-all hover:-translate-y-0.5`}
          >
            {/* Card header */}
            <div className="flex items-center justify-between mb-4">
              <Link
                href={card.link}
                className="group flex items-center gap-2"
              >
                <span className="relative flex h-2 w-2">
                  <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isLive ? "animate-ping bg-[var(--indicator-green)]" : "bg-[var(--dim-gray)]"}`} />
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? "bg-[var(--indicator-green)]" : "bg-[var(--dim-gray)]"}`} />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-foreground group-hover:opacity-70 transition-opacity">
                    {card.name}
                  </h3>
                  <p className="text-[10px] text-foreground/50">{card.shortName}</p>
                </div>
                <ExternalLink className="w-3 h-3 text-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
              <a
                href={card.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] font-mono font-semibold flex items-center gap-1 px-2 py-1 rounded soft-border bg-[var(--bg-form-element)] text-[var(--txt-form-element)] hover:-translate-y-0.5 transition-all"
              >
                live <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Metrics grid */}
            <div className={`grid gap-2 ${card.metrics.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
              {card.metrics.map((m) => {
                const Icon = m.icon;
                const value = m.getValue(data);
                const isHero = m.highlight && value >= 1000;
                return (
                  <div
                    key={m.key}
                    className={`rounded-xl p-3 soft-border ${
                      isHero
                        ? "bg-[var(--bg-btn-big)] text-[var(--txt-btn-big)]"
                        : "bg-[var(--bg-page)]"
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <div className={`p-1 rounded ${isHero ? "bg-white/15" : "bg-[var(--bg-element-second)]"}`}>
                        <Icon className={`w-3 h-3 ${isHero ? "text-current" : "text-foreground/70"}`} />
                      </div>
                      <span className={`text-[9px] font-mono uppercase tracking-wider ${
                        isHero ? "text-current opacity-75" : "text-foreground/60"
                      }`}>
                        {(t as Record<string, string>)[m.labelKey] ?? m.labelKey}
                      </span>
                    </div>
                    <p className={`font-light tracking-tight ${
                      isHero ? "text-xl sm:text-2xl text-current" : "text-lg sm:text-xl text-foreground"
                    }`}>
                      <AnimatedNumber value={value} duration={isHero ? 2200 : 1400} started={logsDone} />
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        </div>
      )}

      {/* ── Terminal log (full width) ────────────────────────────────────── */}
      {!logsDone && !metrics ? (
        <TerminalSkeleton />
      ) : (
      <div className="rounded-2xl overflow-hidden soft-border bg-[var(--bg-element)] animate-in fade-in duration-500">
        {/* Title bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[var(--bg-element-second)] border-b border-[var(--border-hairline)]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--indicator-red)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--indicator-red)] opacity-40" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--indicator-green)]" />
            </div>
            <span className="text-[11px] font-mono text-foreground/50">nasaq-live — bash</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${isLive ? "animate-ping bg-[var(--indicator-green)]" : "bg-[var(--dim-gray)]"}`} />
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? "bg-[var(--indicator-green)]" : "bg-[var(--dim-gray)]"}`} />
              </span>
              <span className="text-[11px] font-mono font-semibold text-foreground">
                {isLive ? "LIVE" : logsDone ? "CACHED" : "CONNECTING"}
              </span>
            </div>
            {logsDone && (
              <span className="text-[10px] font-mono text-foreground/40">uptime {uptime}</span>
            )}
            {isLive && metrics?.fetchedAt && (
              <span className="text-[10px] font-mono text-foreground/40">
                last sync {new Date(metrics.fetchedAt).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
            <button
              onClick={() => fetchMetrics(true)}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--bg-element)] soft-border hover:bg-[var(--bg-element-hover)] disabled:opacity-50 transition-all text-[10px] font-mono font-semibold text-foreground"
            >
              <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
              {refreshing ? "fetching" : "refresh"}
            </button>
          </div>
        </div>

        {/* Log area */}
        <div className="relative">
          <div className="max-h-[200px] overflow-y-auto p-4 font-mono text-[11px] leading-relaxed space-y-0.5">
            {logs.slice(0, visibleLogCount).map((entry, i) => {
              const style = LEVEL_STYLE[entry.level] ?? LEVEL_STYLE.info;
              return (
                <div key={i} className={`flex gap-2 ${style.color}`}>
                  <span className="text-foreground/30 shrink-0">[{entry.ts.slice(11, 19)}]</span>
                  <span className={`font-bold shrink-0 ${style.color}`} style={{ minWidth: "4.5em" }}>
                    {style.tag}
                  </span>
                  <span className="text-foreground/80 break-all">
                    {entry.msg}
                    {entry.ms !== undefined && entry.ms > 0 && (
                      <span className="text-foreground/30 ml-1">({entry.ms}ms)</span>
                    )}
                  </span>
                </div>
              );
            })}
            {!logsDone && (
              <div className="flex gap-2 items-center text-foreground/40">
                <span className="inline-block w-2 h-3.5 bg-foreground/50 animate-pulse" />
              </div>
            )}
            <div ref={logEndRef} />
          </div>
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[var(--bg-element)] to-transparent pointer-events-none" />
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-[var(--border-hairline)] flex items-center justify-between">
          <p className="text-[10px] font-mono text-foreground/40">
            Data fetched directly from production databases. No mocks.
          </p>
          <div className="flex items-center gap-1.5">
            {["Supabase", "PostgreSQL"].map((db) => (
              <span key={db} className="px-2 py-0.5 rounded soft-border bg-[var(--bg-element-second)] text-[9px] font-mono font-semibold text-foreground/60 uppercase tracking-wider">
                {db}
              </span>
            ))}
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
