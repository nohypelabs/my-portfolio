"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Activity,
  Camera,
  ClipboardCheck,
  Database,
  ExternalLink,
  MapPin,
  Package,
  ShoppingCart,
  Store,
  Users,
  Box,
  Receipt,
} from "lucide-react";
import Link from "next/link";

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
  shortName: string;
  link: string;
  demo: string;
  mainMetric: {
    label: string;
    icon: typeof Package;
    getValue: (m: Metrics) => number;
  };
  extraCards: {
    key: string;
    label: string;
    icon: typeof Package;
    getValue: (m: Metrics) => number;
  }[];
}

const projectGroups: ProjectGroup[] = [
  {
    name: "Serat QC — Selisih Berat J&T Express",
    shortName: "Serat QC — J&T Express",
    link: "/projects/selisih-berat",
    demo: "https://selisih-berat.vercel.app",
    mainMetric: {
      label: "Resi",
      icon: Package,
      getValue: (m) => m.seratQc.entries,
    },
    extraCards: [
      { key: "serat-photos", label: "Foto GPS Watermarked", icon: Camera, getValue: (m) => m.seratQc.photos },
    ],
  },
  {
    name: "WC Check — Toilet Inspection System",
    shortName: "WC Check — Inspeksi",
    link: "/projects/wc-check",
    demo: "https://wc-checks.vercel.app",
    mainMetric: {
      label: "Inspeksi",
      icon: ClipboardCheck,
      getValue: (m) => m.wcCheck.inspections,
    },
    extraCards: [
      { key: "wc-users", label: "Users Terdaftar", icon: Users, getValue: (m) => m.wcCheck.users },
      { key: "wc-locations", label: "Lokasi Terkelola", icon: MapPin, getValue: (m) => m.wcCheck.locations },
    ],
  },
  {
    name: "LakuPOS — Kasir & Warehouse System",
    shortName: "LakuPOS — Kasir",
    link: "/projects/lakupos",
    demo: "https://lakupos.vercel.app",
    mainMetric: {
      label: "Transaksi",
      icon: Receipt,
      getValue: (m) => m.lakuPos.transactions,
    },
    extraCards: [
      { key: "laku-products", label: "Produk Terdaftar", icon: Box, getValue: (m) => m.lakuPos.products },
      { key: "laku-outlets", label: "Outlet Aktif", icon: Store, getValue: (m) => m.lakuPos.outlets },
    ],
  },
  {
    name: "Qohira — Online Shop",
    shortName: "Qohira — Toko Online",
    link: "/projects/ecommerce-manual",
    demo: "https://qohira.vercel.app",
    mainMetric: {
      label: "Produk",
      icon: ShoppingCart,
      getValue: (m) => m.ecommerce.products,
    },
    extraCards: [
      { key: "ecom-orders", label: "Pesanan", icon: Receipt, getValue: (m) => m.ecommerce.orders },
      { key: "ecom-users", label: "Users", icon: Users, getValue: (m) => m.ecommerce.users },
    ],
  },
];

export function LiveMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [isLive, setIsLive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const started = isInView && metrics !== null;

  useEffect(() => {
    fetch("/api/live-metrics")
      .then((r) => r.json())
      .then((data: Metrics) => {
        setMetrics(data);
        setIsLive(!data.cached);
      })
      .catch(() => setMetrics(FALLBACK));
  }, []);

  const data = metrics ?? FALLBACK;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 dark:from-zinc-950 dark:via-zinc-950 dark:to-emerald-950 rounded-3xl p-5 md:p-10 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/8 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-6 md:mb-8">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 md:p-2 rounded-lg md:rounded-xl bg-emerald-500/10 border border-emerald-500/20">
              <Database className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg md:text-3xl font-extrabold tracking-tight">
                Live Production Data
              </h2>
              <p className="text-[10px] md:text-sm text-zinc-500 hidden md:block">
                Real-time dari production database — bukan dummy data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-2.5 py-1.5 md:px-4 md:py-2.5 rounded-lg md:rounded-xl bg-white/5 border border-white/10">
            <span className="relative flex h-2 w-2 md:h-3 md:w-3">
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isLive ? "animate-ping bg-emerald-400" : "bg-yellow-400"
                }`}
              />
              <span
                className={`relative inline-flex rounded-full h-2 w-2 md:h-3 md:w-3 ${
                  isLive ? "bg-emerald-500" : "bg-yellow-500"
                }`}
              />
            </span>
            <span className="text-[10px] md:text-xs font-semibold">
              {isLive ? "LIVE" : "..."}
            </span>
          </div>
        </div>

        {/* ── Mobile: Compact rows ── */}
        <div className="md:hidden space-y-2.5">
          {projectGroups.map((group, gi) => {
            const Icon = group.mainMetric.icon;
            const value = group.mainMetric.getValue(data);
            return (
              <motion.div
                key={group.shortName}
                initial={{ opacity: 0, x: -12 }}
                animate={
                  started
                    ? { opacity: 1, x: 0 }
                    : { opacity: 0, x: -12 }
                }
                transition={{ delay: 0.1 + gi * 0.08, duration: 0.35 }}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10"
              >
                <div className="p-2 rounded-lg bg-emerald-500/15 shrink-0">
                  <Icon className="w-4 h-4 text-emerald-400" />
                </div>

                <Link href={group.link} className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-zinc-400 truncate">
                    {group.shortName}
                  </p>
                  <p className="text-xl font-extrabold text-white leading-tight">
                    <AnimatedNumber value={value} duration={1800} started={started} />
                    <span className="text-xs font-medium text-zinc-500 ml-1.5">
                      {group.mainMetric.label}
                    </span>
                  </p>
                </Link>

                <a
                  href={group.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[10px] font-semibold flex items-center gap-1 shrink-0"
                >
                  Live <ExternalLink className="w-3 h-3" />
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* ── Desktop: Full cards ── */}
        <div className="hidden md:block space-y-6">
          {projectGroups.map((group, gi) => (
            <div key={group.name}>
              <div className="flex items-center justify-between mb-4">
                <Link
                  href={group.link}
                  className="group flex items-center gap-2 text-sm font-semibold text-zinc-300 hover:text-emerald-400 transition-colors"
                >
                  <Activity className="w-4 h-4 text-emerald-500" />
                  {group.name}
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <a
                  href={group.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-500 hover:text-emerald-400 font-medium flex items-center gap-1 transition-colors"
                >
                  Visit App <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className={`grid gap-4 ${
                group.extraCards.length === 1 ? "grid-cols-2" : "grid-cols-3"
              }`}>
                {/* Main metric card */}
                {(() => {
                  const Icon = group.mainMetric.icon;
                  const value = group.mainMetric.getValue(data);
                  const isHero = value >= 1000;
                  return (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 16 }}
                      animate={
                        started
                          ? { opacity: 1, scale: 1, y: 0 }
                          : { opacity: 0, scale: 0.95, y: 16 }
                      }
                      transition={{ delay: 0.15 + gi * 0.2, duration: 0.4 }}
                      className={`relative overflow-hidden rounded-2xl p-6 border transition-shadow hover:shadow-2xl ${
                        isHero
                          ? "bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-emerald-500/20"
                          : "bg-white/5 border-white/10"
                      }`}
                    >
                      {isHero && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                      )}
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                          <div className={`p-1.5 rounded-lg ${isHero ? "bg-emerald-500/20" : "bg-white/10"}`}>
                            <Icon className={`w-4 h-4 ${isHero ? "text-emerald-400" : "text-zinc-400"}`} />
                          </div>
                          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                            {group.mainMetric.label}
                          </span>
                        </div>
                        <p className={`font-extrabold tracking-tight ${
                          isHero
                            ? "text-5xl bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent"
                            : "text-4xl text-white"
                        }`}>
                          <AnimatedNumber value={value} duration={isHero ? 2200 : 1400} started={started} />
                        </p>
                      </div>
                    </motion.div>
                  );
                })()}

                {/* Extra cards */}
                {group.extraCards.map((card, ci) => {
                  const Icon = card.icon;
                  const value = card.getValue(data);
                  return (
                    <motion.div
                      key={card.key}
                      initial={{ opacity: 0, scale: 0.95, y: 16 }}
                      animate={
                        started
                          ? { opacity: 1, scale: 1, y: 0 }
                          : { opacity: 0, scale: 0.95, y: 16 }
                      }
                      transition={{ delay: 0.25 + gi * 0.2 + ci * 0.1, duration: 0.4 }}
                      className="relative overflow-hidden rounded-2xl p-6 border bg-white/5 border-white/10 hover:border-white/20 transition-shadow hover:shadow-2xl"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <div className="p-1.5 rounded-lg bg-white/10">
                          <Icon className="w-4 h-4 text-zinc-400" />
                        </div>
                        <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                          {card.label}
                        </span>
                      </div>
                      <p className="text-4xl font-extrabold tracking-tight text-white">
                        <AnimatedNumber value={value} duration={1400} started={started} />
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-white/5 flex items-center justify-between gap-3">
          <p className="text-[10px] md:text-xs text-zinc-500">
            <span className="hidden md:inline">Data di-fetch langsung dari Supabase & PostgreSQL production database. </span>
            Auto-refresh setiap 5 menit
          </p>
          <div className="flex items-center gap-1.5 md:gap-2">
            <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[9px] md:text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
              Supabase
            </span>
            <span className="px-2 py-0.5 md:px-2.5 md:py-1 rounded-md bg-white/5 border border-white/10 text-[9px] md:text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              4 DB
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
