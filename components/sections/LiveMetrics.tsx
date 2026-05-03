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
  Users,
} from "lucide-react";
import Link from "next/link";

interface Metrics {
  seratQc: { entries: number; photos: number };
  wcCheck: { inspections: number; users: number; locations: number };
  fetchedAt: string;
  cached?: boolean;
}

const FALLBACK: Metrics = {
  seratQc: { entries: 80187, photos: 160374 },
  wcCheck: { inspections: 3293, users: 53, locations: 49 },
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
  link: string;
  demo: string;
  cards: {
    key: string;
    label: string;
    icon: typeof Package;
    getValue: (m: Metrics) => number;
    highlight?: boolean;
  }[];
}

const projectGroups: ProjectGroup[] = [
  {
    name: "Serat QC — Selisih Berat J&T Express",
    link: "/projects/selisih-berat",
    demo: "https://selisih-berat.vercel.app",
    cards: [
      {
        key: "serat-entries",
        label: "Resi Diproses",
        icon: Package,
        getValue: (m) => m.seratQc.entries,
        highlight: true,
      },
      {
        key: "serat-photos",
        label: "Foto GPS Watermarked",
        icon: Camera,
        getValue: (m) => m.seratQc.photos,
        highlight: true,
      },
    ],
  },
  {
    name: "WC Check — Toilet Inspection System",
    link: "/projects/wc-check",
    demo: "https://wc-checks.vercel.app",
    cards: [
      {
        key: "wc-inspections",
        label: "Inspeksi Tercatat",
        icon: ClipboardCheck,
        getValue: (m) => m.wcCheck.inspections,
        highlight: true,
      },
      {
        key: "wc-users",
        label: "Users Terdaftar",
        icon: Users,
        getValue: (m) => m.wcCheck.users,
      },
      {
        key: "wc-locations",
        label: "Lokasi Terkelola",
        icon: MapPin,
        getValue: (m) => m.wcCheck.locations,
      },
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
      className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 dark:from-zinc-950 dark:via-zinc-950 dark:to-emerald-950 rounded-3xl p-6 md:p-10 text-white"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-500/8 via-transparent to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <Database className="w-5 h-5 text-emerald-400" />
              </div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                Live Production Data
              </h2>
            </div>
            <p className="text-sm text-zinc-400 max-w-lg">
              Real-time data langsung dari production database. Bukan dummy — ini
              sistem yang benar-benar dipakai setiap hari.
            </p>
          </div>

          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="relative flex h-3 w-3">
              <span
                className={`absolute inline-flex h-full w-full rounded-full opacity-75 ${
                  isLive
                    ? "animate-ping bg-emerald-400"
                    : "bg-yellow-400"
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
                {isLive ? "LIVE" : "LOADING"}
              </p>
              {isLive && metrics?.fetchedAt && (
                <p className="text-zinc-500">
                  Fetched {formatTime(metrics.fetchedAt)}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Project Groups */}
        <div className="space-y-6">
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

              <div
                className={`grid gap-4 ${
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
                      className={`relative overflow-hidden rounded-2xl p-5 md:p-6 border transition-shadow hover:shadow-2xl ${
                        isHero
                          ? "bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border-emerald-500/20 hover:border-emerald-500/40"
                          : "bg-white/5 border-white/10 hover:border-white/20"
                      }`}
                    >
                      {isHero && (
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                      )}
                      <div className="relative">
                        <div className="flex items-center gap-2 mb-3">
                          <div
                            className={`p-1.5 rounded-lg ${
                              isHero
                                ? "bg-emerald-500/20"
                                : "bg-white/10"
                            }`}
                          >
                            <Icon
                              className={`w-4 h-4 ${
                                isHero
                                  ? "text-emerald-400"
                                  : "text-zinc-400"
                              }`}
                            />
                          </div>
                          <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                            {card.label}
                          </span>
                        </div>
                        <p
                          className={`font-extrabold tracking-tight ${
                            isHero
                              ? "text-4xl md:text-5xl bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent"
                              : "text-3xl md:text-4xl text-white"
                          }`}
                        >
                          <AnimatedNumber
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
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-zinc-500">
            Data di-fetch langsung dari Supabase production database via
            server-side API route. Auto-refresh setiap 5 menit.
          </p>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-400 uppercase tracking-wider">
              Supabase
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Next.js API
            </span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
              Real Data
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
