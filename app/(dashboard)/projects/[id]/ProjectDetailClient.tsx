'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { TechBadge } from '@/components/ui/TechBadge';
import { useEnergySaver } from '@/contexts/EnergySaverContext';
import type { Project } from '@/lib/domain/entities/Project';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Github,
  Quote,
  ShieldCheck,
  Zap,
  RefreshCw,
  Database,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Android3DViewer, {
  type AndroidScreenVariant,
} from '@/components/studio/Android3DViewer';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const METRICS_FALLBACKS: Record<string, Record<string, number>> = {
  'selisih-berat': { entries: 112796, photos: 225592 },
  'wc-check': { inspections: 3293, users: 53, locations: 49 },
  'lakupos': { transactions: 11, products: 2, outlets: 4 },
  'ecommerce-manual': { products: 16, orders: 6, users: 5 },
};

// Which live-metric keys each project surfaces, in display order. The last
// entry in a group is the headline number and renders heavier than the rest.
const METRIC_CARDS: Record<
  string,
  Array<{ key: string; label: string; wide?: boolean }>
> = {
  'selisih-berat': [
    { key: 'entries', label: 'Resi QC Terproses' },
    { key: 'photos', label: 'Foto GPS-Watermarked Terunggah', wide: true },
  ],
  'wc-check': [
    { key: 'inspections', label: 'Inspeksi Masuk' },
    { key: 'users', label: 'User Terdaftar' },
    { key: 'locations', label: 'Lokasi Terkelola' },
  ],
  lakupos: [
    { key: 'transactions', label: 'Transaksi POS' },
    { key: 'products', label: 'Varian Produk' },
    { key: 'outlets', label: 'Outlet Aktif' },
  ],
  'ecommerce-manual': [
    { key: 'products', label: 'Varian Produk' },
    { key: 'orders', label: 'Pesanan Masuk' },
    { key: 'users', label: 'User Terdaftar' },
  ],
};

function MetricCard({
  label,
  value,
  emphasis,
  wide,
}: {
  label: string;
  value: number | undefined;
  emphasis?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={`neo-surface soft-border rounded-2xl p-5 font-mono text-center${
        wide ? ' sm:col-span-2' : ''
      }`}
    >
      <p className="text-[10px] font-semibold uppercase text-foreground/70">
        {label}
      </p>
      <p
        className={`mt-2 text-2xl tracking-tight text-foreground ${
          emphasis ? 'font-semibold' : 'font-light'
        }`}
      >
        {(value ?? 0).toLocaleString('id-ID')}
      </p>
    </div>
  );
}

const ANDROID_SLUGS: Array<{ slug: string; label: string }> = [
  { slug: 'lakupos', label: 'Lakupos' },
  { slug: 'wccheck', label: 'WCCheck' },
  { slug: 'ecommerce', label: 'E-commerce' },
  { slug: 'selisih', label: 'Selisih Berat' },
  { slug: 'signalflow', label: 'SignalFlow' },
  { slug: 'shadowbid', label: 'ShadowBid' },
  { slug: 'traceflow', label: 'TraceFlow' },
];

function slugToLabel(slug: string): string {
  return ANDROID_SLUGS.find((s) => s.slug === slug)?.label ?? slug;
}

function buildAndroidVariants(activeSlug: string): AndroidScreenVariant[] {
  const ordered = [
    activeSlug,
    ...ANDROID_SLUGS.map((s) => s.slug).filter((s) => s !== activeSlug),
  ];
  return ordered.map((slug) => ({
    label: slugToLabel(slug),
    src: `/assets/models/android-phone-${slug}.glb`,
    poster: `/projects/${slug}-thumb.jpg`,
  }));
}

function getStatusLabel(project: Project) {
  if (project.status === 'production') {
    return 'Live Produksi';
  }
  if (project.status === 'development') {
    return 'Dalam Development';
  }
  return 'Arsip';
}

function getContextNote(project: Project) {
  const title = project.title.toLowerCase();

  if (title.includes('serat') || title.includes('j&t')) {
    return 'Workflow logistik yang berat di operasional lapangan, di mana kecepatan audit dan pemrosesan data jauh lebih penting daripada ornamen visual.';
  }

  if (title.includes('wc check')) {
    return 'Sistem monitoring kebersihan fasilitas gedung untuk menggantikan checklist kertas manual dengan pelaporan digital real-time terpusat.';
  }

  if (title.includes('lakupos')) {
    return 'Sistem kasir pintar (POS) ritel yang mengintegrasikan transaksi kasir harian, sinkronisasi stok otomatis, dan multi-outlet dalam satu platform.';
  }

  if (title.includes('qohira')) {
    return 'Workflow verifikasi pesanan dan konfirmasi pembayaran otomatis e-commerce untuk merapikan pencatatan admin toko.';
  }

  return 'Pengembangan sistem kustom untuk mengubah bottleneck operasional harian menjadi alur kerja web yang efisien dan praktis.';
}

interface ProjectDetailClientProps {
  project: Project;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const { id } = project;
  const { reduceMotion } = useEnergySaver();

  // Live Metrics states
  const [liveData, setLiveData] = useState<Record<string, number> | null>(null);
  const [fetching, setFetching] = useState(false);
  const [fetchedAt, setFetchedAt] = useState<string | null>(null);

  useEffect(() => {
    if (METRICS_FALLBACKS[id]) {
      // Load initial cached metrics
      fetch('/api/live-metrics')
        .then((r) => r.json())
        .then((data) => {
          let stats: Record<string, number> | null = null;
          if (id === 'selisih-berat') stats = data.seratQc;
          else if (id === 'wc-check') stats = data.wcCheck;
          else if (id === 'lakupos') stats = data.lakuPos;
          else if (id === 'ecommerce-manual') stats = data.ecommerce;

          if (stats) {
            setLiveData(stats);
            setFetchedAt(
              new Date().toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              })
            );
          }
        })
        .catch(() => {});
    }
  }, [id]);

  const handleFetchLive = () => {
    setFetching(true);
    fetch(`/api/live-metrics?t=${Date.now()}`)
      .then((r) => r.json())
      .then((data) => {
        let stats: Record<string, number> | null = null;
        if (id === 'selisih-berat') stats = data.seratQc;
        else if (id === 'wc-check') stats = data.wcCheck;
        else if (id === 'lakupos') stats = data.lakuPos;
        else if (id === 'ecommerce-manual') stats = data.ecommerce;

        if (stats) {
          setLiveData(stats);
          setFetchedAt(
            new Date().toLocaleTimeString('id-ID', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            })
          );
        }
      })
      .catch(() => {})
      .finally(() => setFetching(false));
  };

  const proofLines = [
    project.impact?.business,
    project.impact?.users,
    project.impact?.dataVolume,
    project.impact?.performance,
  ].filter(Boolean) as string[];

  // Determine active metrics cards to render
  const defaultFallback = METRICS_FALLBACKS[id];
  const activeMetrics = liveData ?? defaultFallback;

  const activeScreenSlug = ANDROID_SLUGS.find((s) => project.image.includes(`${s.slug}-thumb`))?.slug ?? 'lakupos';
  const androidVariants = buildAndroidVariants(activeScreenSlug);

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-foreground/70 transition-opacity hover:opacity-70"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Showcase
      </Link>

      <motion.div {...fadeUp} className="rounded-3xl glass p-6 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="chip uppercase">{getStatusLabel(project)}</span>
              <span className="chip">
                <Calendar className="h-3.5 w-3.5" />
                Tahun {project.year}
              </span>
              {project.caseStudy?.timeline && (
                <span className="chip">
                  <Clock3 className="h-3.5 w-3.5" />
                  Waktu: {project.caseStudy.timeline}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-light tracking-tight text-foreground md:text-[44px] leading-[1.1]">
                {project.title}
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-foreground/70">
                {project.shortDescription}
              </p>
            </div>

            <div className="rounded-2xl soft-border bg-[var(--bg-element-second)] p-4 font-mono text-[12px] leading-relaxed text-foreground/70">
              <p className="font-semibold text-foreground/80 uppercase text-[10px] tracking-wider mb-1">Konteks & Latar Proyek:</p>
              <p>{getContextNote(project)}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="chip text-[10px]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row pt-2">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary px-5 py-3 text-xs"
                >
                  Kunjungi Aplikasi Live
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary px-5 py-3 text-xs"
                >
                  <Github className="h-4 w-4" />
                  Lihat Source Code
                </a>
              )}
            </div>
          </div>

          <div className="card-rotate grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="neo-surface rounded-2xl p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-element-second)] soft-border">
                <Building2 className="h-4.5 w-4.5 text-foreground" strokeWidth={2.2} />
              </div>
              <h2 className="mt-4 text-xs font-semibold font-mono text-foreground uppercase tracking-wide">
                Sekilas Deskripsi
              </h2>
              <p className="mt-2 text-[11px] font-mono leading-relaxed text-foreground/70">{project.fullDescription}</p>
            </div>

            <div className="neo-surface rounded-2xl p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-element-second)] soft-border">
                <ShieldCheck className="h-4.5 w-4.5 text-foreground" strokeWidth={2.2} />
              </div>
              <h2 className="mt-4 text-xs font-semibold font-mono text-foreground uppercase tracking-wide">
                Dampak & Manfaat Nyata
              </h2>
              <div className="mt-3 space-y-2.5">
                {proofLines.slice(0, 3).map((line) => (
                  <div key={line} className="flex items-start gap-2 text-[11px] leading-relaxed text-foreground/70 font-mono">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-money" strokeWidth={2.5} />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* DYNAMIC LIVE PRODUCTION METRICS CARD */}
      {defaultFallback && (
        <ScrollReveal>
          <div className="rounded-3xl glass p-6 md:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-2">
                <span className="chip">
                  <Database className="h-3.5 w-3.5 text-foreground" />
                  Metrik Live Database Produksi
                </span>
                <h2 className="text-xl font-light text-foreground md:text-2xl">
                  Verifikasi integrasi sistem & data lapangan
                </h2>
                <p className="text-xs leading-relaxed text-foreground/70 font-mono max-w-xl">
                  Sistem ini terhubung langsung ke database aktif menggunakan API serverless. Klik tombol di kanan untuk melakukan sinkronisasi data terbaru secara real-time.
                </p>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFetchLive}
                    disabled={fetching}
                    className="btn-secondary px-4 py-2.5 text-xs disabled:opacity-60 disabled:cursor-not-allowed font-mono"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${fetching ? 'animate-spin' : ''}`} />
                    {fetching ? 'Menarik...' : 'Tarik Data Live'}
                  </button>

                  <div className="inline-flex items-center gap-2 rounded-full border border-money/30 bg-money/10 px-3 py-2 text-xs font-semibold font-mono">
                    <span className="relative flex h-2.5 w-2.5">
                      {!reduceMotion && (
                        <span className="absolute inline-flex h-full w-full rounded-full bg-money opacity-75 animate-ping" />
                      )}
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-money" />
                    </span>
                    <span className="text-[10px] text-foreground">CONNECTED</span>
                  </div>
                </div>
                {fetchedAt && (
                  <p className="text-[9px] font-mono text-foreground/70">
                    Sync terakhir: pukul {fetchedAt} WIB
                  </p>
                )}
              </div>
            </div>

            {/* Metrics cards grid */}
            <div className="card-rotate mt-6 grid gap-3 sm:grid-cols-3">
              {(METRIC_CARDS[id] ?? []).map((card, i, all) => (
                <MetricCard
                  key={card.key}
                  label={card.label}
                  value={activeMetrics?.[card.key]}
                  emphasis={i === all.length - 1}
                  wide={card.wide}
                />
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* SCREENSHOT IMAGE */}
      <ScrollReveal>
        <div className="overflow-hidden rounded-3xl border border-foreground/10 shadow-[0_24px_80px_rgba(20,20,25,0.1)]">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            width={1800}
            height={1100}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 1200px"
            priority
          />
        </div>
      </ScrollReveal>

      {/* INTERACTIVE 3D PHONE VIEWER */}
      <ScrollReveal>
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1.5">
              <span className="chip">
                Preview Interaktif 3D
              </span>
              <h2 className="text-lg font-light text-foreground md:text-xl">
                Putar produknya, ganti layar aplikasi
              </h2>
            </div>
            <p className="hidden md:block max-w-xs text-[11px] leading-relaxed text-foreground/70 font-mono">
              Model phone 3D berbasis GLB dengan texture layar dari build produksi. Klik chip untuk mengganti aplikasi yang ditampilkan.
            </p>
          </div>
          <Android3DViewer variants={androidVariants} />
        </div>
      </ScrollReveal>

      {/* CASE STUDY SECTIONS */}
      {project.caseStudy && (
        <>
          <ScrollReveal>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="glass rounded-3xl p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-double/15 border border-double/30">
                    <AlertTriangle className="h-4.5 w-4.5 text-double" strokeWidth={2.2} />
                  </div>
                  <h2 className="text-base font-semibold text-foreground">
                    Tantangan di Lapangan
                  </h2>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-foreground/70 font-mono">{project.caseStudy.problem}</p>

                {project.caseStudy.painPoints.length > 0 && (
                  <div className="mt-5 space-y-2">
                    {project.caseStudy.painPoints.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-2 rounded-xl soft-border bg-[var(--bg-element-second)] px-4 py-3 text-xs leading-relaxed text-foreground/70 font-mono"
                      >
                        <span className="text-punch font-extrabold">•</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="glass rounded-3xl p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-money/15 border border-money/30">
                    <Zap className="h-4.5 w-4.5 text-money" strokeWidth={2.2} />
                  </div>
                  <h2 className="text-base font-semibold text-foreground">
                    Solusi yang Di-deploy
                  </h2>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-foreground/70 font-mono">{project.caseStudy.solution}</p>

                <div className="mt-5 rounded-xl soft-border bg-[var(--bg-element-second)] p-4 font-mono text-[11px] leading-relaxed text-foreground/70">
                  <p className="font-semibold text-foreground/80 uppercase text-[9px] tracking-wider mb-1">Kenapa Ini Signifikan:</p>
                  <p>
                    {project.impact?.business ??
                      project.impact?.users ??
                      'Sistem kustom ini memotong birokrasi penulisan manual dan memastikan validitas data secara real-time.'}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* METRICS COMPARISON */}
          {project.caseStudy.metrics.length > 0 && (
            <ScrollReveal>
              <div className="glass rounded-3xl p-6 md:p-8">
<h2 className="text-lg font-light text-foreground">
                  Sebelum vs Sesudah
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-foreground/70 font-mono">
                  Bukti terkuat dari efisiensi sistem di lapangan: perbandingan data performa kerja sebelum dan sesudah sistem live.
                </p>

                <div className="mt-6 grid gap-4">
                  {project.caseStudy.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="grid gap-3 rounded-2xl soft-border bg-[var(--bg-element-second)] p-4 md:grid-cols-[0.9fr_1fr_1fr] md:items-center font-mono text-[11px]"
                    >
                      <div>
                        <p className="font-semibold text-foreground/80 uppercase text-[10px]">
                          {metric.label}
                        </p>
                      </div>
                      <div className="rounded-xl bg-double/15 border border-double/30 p-4">
                        <p className="text-[10px] font-semibold uppercase text-foreground/70">
                          Sebelum
                        </p>
                        <p className="mt-1 font-semibold text-foreground">{metric.before}</p>
                      </div>
                      <div className="rounded-xl bg-money/15 border border-money/30 p-4">
                        <p className="text-[10px] font-semibold uppercase text-foreground/70">
                          Sesudah
                        </p>
                        <p className="mt-1 font-semibold text-foreground">{metric.after}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* CLIENT QUOTE */}
          {project.caseStudy.testimonial && (
            <ScrollReveal>
              <div className="glass rounded-3xl p-6 md:p-10">
                <Quote className="h-9 w-9 text-foreground/20" />
                <blockquote className="mt-4 text-base font-medium leading-relaxed text-foreground font-mono italic">
                  &ldquo;{project.caseStudy.testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center gap-3 font-mono">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-btn-pm)] font-bold text-[var(--txt-btn-pm)]">
                    {project.caseStudy.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-foreground">{project.caseStudy.testimonial.author}</p>
                    <p className="text-[10px] text-foreground/70">{project.caseStudy.testimonial.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}
        </>
      )}

      {/* HIGHLIGHTS & IMPACT */}
      <ScrollReveal>
        <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
          <div className="glass rounded-3xl p-6">
            <h2 className="text-base font-semibold text-foreground">
              Fitur & Poin Utama Sistem
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {project.highlights.map((highlight) => (
                <div key={highlight.title} className="rounded-2xl soft-border bg-[var(--bg-element-second)] p-4 font-mono text-[11px]">
                  <h3 className="font-semibold text-foreground">{highlight.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-foreground/70">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6">
            <h2 className="text-base font-semibold text-foreground">
              Kelebihan & Dampak Berkelanjutan
            </h2>
            <div className="mt-5 space-y-3 font-mono text-[11px]">
              {proofLines.map((line) => (
                <div
                  key={line}
                  className="flex items-start gap-3 rounded-2xl soft-border px-4 py-3 bg-[var(--bg-element-second)] leading-relaxed text-foreground/70"
                >
                  <ShieldCheck className="mt-0.5 h-4.5 w-4.5 flex-shrink-0 text-money" strokeWidth={2.2} />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* INCLUDED FEATURES & TECH STACK */}
      <ScrollReveal>
        <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
          <div className="glass rounded-3xl p-6">
            <h2 className="text-base font-semibold text-foreground">
              Cakupan Fitur Bawaan
            </h2>
            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              {project.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2 rounded-2xl soft-border px-4 py-3 bg-[var(--bg-element-second)] text-[11px] leading-relaxed text-foreground/70 font-mono">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-money" strokeWidth={2.5} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-3xl p-6">
            <h2 className="text-base font-semibold text-foreground">
              Tumpukan Teknologi (Tech Stack)
            </h2>
            <div className="mt-5 space-y-5">
              {project.techStack.map((stack) => (
                <div key={stack.category}>
                  <h3 className="text-xs font-semibold text-foreground/60 font-mono uppercase tracking-wider">{stack.category}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {stack.technologies.map((tech) => (
                      <TechBadge key={tech} tech={tech} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* FOOTER CTA */}
      <ScrollReveal>
        <div className="rounded-3xl bg-[var(--bg-btn-big)] text-[var(--txt-btn-big)] p-6 md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-light text-current md:text-3xl">
                Menghadapi Tantangan Operasional yang Serupa?
              </h2>
              <p className="text-sm leading-relaxed text-current opacity-75">
                Langkah awal terbaik adalah memetakan bottleneck operasional Anda dan merumuskan scope proyek yang paling pragmatis. Hubungi kami untuk memulai.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              {/* Sits on the dark slab, so the button pins to the light form
                  surface instead of the theme-flipping primary pair. */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--bg-form-element)] px-6 py-3 text-xs font-semibold text-[var(--txt-form-element)] transition-opacity hover:opacity-90"
              >
                Mulai Diskusi Kasus Anda
                <ArrowRight className="h-4.5 w-4.5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}