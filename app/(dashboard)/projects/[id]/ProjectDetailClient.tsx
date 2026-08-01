'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/ScrollReveal';
import { TechBadge } from '@/components/ui/TechBadge';
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

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-bold text-neutral-600 transition-colors hover:text-foreground font-mono"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke Showcase
      </Link>

      <motion.div {...fadeUp} className="rounded-[8px] neo-surface p-6 md:p-8 bg-surface">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border-2 border-foreground bg-accent-bg px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground shadow-[1px_1px_0px_#141414]">
                {getStatusLabel(project)}
              </span>
              <span className="inline-flex items-center gap-1 rounded-[4px] border border-foreground/30 bg-background px-3 py-1 text-[11px] font-bold font-mono text-neutral-600">
                <Calendar className="h-3.5 w-3.5" />
                Tahun {project.year}
              </span>
              {project.caseStudy?.timeline && (
                <span className="inline-flex items-center gap-1 rounded-[4px] border border-foreground/30 bg-background px-3 py-1 text-[11px] font-bold font-mono text-neutral-600">
                  <Clock3 className="h-3.5 w-3.5" />
                  Waktu: {project.caseStudy.timeline}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                {project.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                {project.shortDescription}
              </p>
            </div>

            <div className="rounded-[4px] border border-foreground/20 bg-background/50 p-4 font-mono text-[12px] leading-relaxed text-neutral-600">
              <p className="font-bold text-foreground/80 uppercase text-[10px] tracking-wider mb-1">Konteks & Latar Proyek:</p>
              <p>{getContextNote(project)}</p>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-[4px] border border-foreground/30 bg-background px-2.5 py-0.5 text-[10px] font-mono font-bold text-neutral-600 shadow-[1px_1px_0px_#141414]">
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
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] border-2 border-foreground bg-accent-light px-5 py-3 text-xs font-bold text-foreground shadow-[3px_3px_0px_#141414] hover:-translate-y-0.5 transition-all"
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
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] border-2 border-foreground bg-surface px-5 py-3 text-xs font-bold text-foreground shadow-[3px_3px_0px_#141414] hover:-translate-y-0.5 transition-all"
                >
                  Lihat Source Code
                  <Github className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[6px] border border-foreground/20 p-5 bg-background">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] border-2 border-foreground bg-surface shadow-[1.5px_1.5px_0px_#141414]">
                <Building2 className="h-4.5 w-4.5 text-foreground" strokeWidth={2.2} />
              </div>
              <h2 className="mt-4 text-xs font-bold font-mono text-foreground uppercase tracking-wide">
                Sekilas Deskripsi
              </h2>
              <p className="mt-2 text-[11px] font-mono leading-relaxed text-neutral-500">{project.fullDescription}</p>
            </div>

            <div className="rounded-[6px] border border-foreground/20 p-5 bg-background">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-[4px] border-2 border-foreground bg-surface shadow-[1.5px_1.5px_0px_#141414]">
                <ShieldCheck className="h-4.5 w-4.5 text-foreground" strokeWidth={2.2} />
              </div>
              <h2 className="mt-4 text-xs font-bold font-mono text-foreground uppercase tracking-wide">
                Dampak & Manfaat Nyata
              </h2>
              <div className="mt-3 space-y-2.5">
                {proofLines.slice(0, 3).map((line) => (
                  <div key={line} className="flex items-start gap-2 text-[11px] leading-relaxed text-neutral-600 font-mono">
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
          <div className="rounded-[8px] neo-surface p-6 md:p-8 bg-surface border-2 border-foreground">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-[#ffd9ee] px-3 py-1 text-xs font-bold text-foreground">
                  <Database className="h-3.5 w-3.5 text-accent" />
                  Metrik Live Database Produksi
                </div>
                <h2 className="text-xl font-extrabold text-foreground">
                  Verifikasi Integrasi Sistem & Data Lapangan
                </h2>
                <p className="text-xs leading-relaxed text-neutral-500 font-mono max-w-xl">
                  Sistem ini terhubung langsung ke database aktif menggunakan API serverless. Klik tombol di kanan untuk melakukan sinkronisasi data terbaru secara real-time.
                </p>
              </div>

              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFetchLive}
                    disabled={fetching}
                    className="inline-flex items-center justify-center gap-2 rounded-[4px] border-2 border-foreground bg-background px-4 py-2.5 text-xs font-bold text-foreground shadow-[2px_2px_0px_#141414] hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed font-mono"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 text-accent ${fetching ? 'animate-spin' : ''}`} />
                    {fetching ? 'Menarik...' : 'Tarik Data Live'}
                  </button>

                  <div className="inline-flex items-center gap-2 rounded-[4px] border-2 border-foreground bg-background px-3 py-2 text-xs font-bold text-foreground shadow-[2px_2px_0px_#141414] font-mono">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-money opacity-75 animate-ping" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-money" />
                    </span>
                    <span className="text-[10px]">CONNECTED</span>
                  </div>
                </div>
                {fetchedAt && (
                  <p className="text-[9px] font-mono text-neutral-400">
                    Sync terakhir: pukul {fetchedAt} WIB
                  </p>
                )}
              </div>
            </div>

            {/* Metrics cards grid */}
            <div className="grid gap-3 sm:grid-cols-3 mt-6">
              {id === 'selisih-berat' && (
                <>
                  <div className="rounded-[6px] border border-foreground/20 p-4 bg-background font-mono text-center">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">Resi QC Terproses</p>
                    <p className="text-2xl font-extrabold text-foreground mt-2">
                      {activeMetrics.entries.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="rounded-[6px] border border-foreground/20 p-4 bg-background font-mono text-center sm:col-span-2">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">Foto GPS-Watermarked Terunggah</p>
                    <p className="text-2xl font-extrabold text-accent mt-2">
                      {activeMetrics.photos.toLocaleString('id-ID')}
                    </p>
                  </div>
                </>
              )}

              {id === 'wc-check' && (
                <>
                  <div className="rounded-[6px] border border-foreground/20 p-4 bg-background font-mono text-center">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">Inspeksi Masuk</p>
                    <p className="text-2xl font-extrabold text-foreground mt-2">
                      {activeMetrics.inspections.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="rounded-[6px] border border-foreground/20 p-4 bg-background font-mono text-center">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">User Terdaftar</p>
                    <p className="text-2xl font-extrabold text-foreground mt-2">
                      {activeMetrics.users.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="rounded-[6px] border border-foreground/20 p-4 bg-background font-mono text-center">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">Lokasi Terkelola</p>
                    <p className="text-2xl font-extrabold text-accent mt-2">
                      {activeMetrics.locations.toLocaleString('id-ID')}
                    </p>
                  </div>
                </>
              )}

              {id === 'lakupos' && (
                <>
                  <div className="rounded-[6px] border border-foreground/20 p-4 bg-background font-mono text-center">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">Transaksi POS</p>
                    <p className="text-2xl font-extrabold text-foreground mt-2">
                      {activeMetrics.transactions.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="rounded-[6px] border border-foreground/20 p-4 bg-background font-mono text-center">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">Varian Produk</p>
                    <p className="text-2xl font-extrabold text-foreground mt-2">
                      {activeMetrics.products.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="rounded-[6px] border border-foreground/20 p-4 bg-background font-mono text-center">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">Outlet Aktif</p>
                    <p className="text-2xl font-extrabold text-accent mt-2">
                      {activeMetrics.outlets.toLocaleString('id-ID')}
                    </p>
                  </div>
                </>
              )}

              {id === 'ecommerce-manual' && (
                <>
                  <div className="rounded-[6px] border border-foreground/20 p-4 bg-background font-mono text-center">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">Varian Produk</p>
                    <p className="text-2xl font-extrabold text-foreground mt-2">
                      {activeMetrics.products.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="rounded-[6px] border border-foreground/20 p-4 bg-background font-mono text-center">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">Pesanan Masuk</p>
                    <p className="text-2xl font-extrabold text-foreground mt-2">
                      {activeMetrics.orders.toLocaleString('id-ID')}
                    </p>
                  </div>
                  <div className="rounded-[6px] border border-foreground/20 p-4 bg-background font-mono text-center">
                    <p className="text-[10px] text-neutral-400 font-bold uppercase">User Terdaftar</p>
                    <p className="text-2xl font-extrabold text-accent mt-2">
                      {activeMetrics.users.toLocaleString('id-ID')}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* SCREENSHOT IMAGE */}
      <ScrollReveal>
        <div className="overflow-hidden rounded-[8px] border-2 border-foreground shadow-[4px_4px_0px_#141414]">
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

      {/* CASE STUDY SECTIONS */}
      {project.caseStudy && (
        <>
          <ScrollReveal>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-[8px] neo-surface p-6 bg-surface">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[4px] border-2 border-foreground bg-double shadow-[1.5px_1.5px_0px_#141414]">
                    <AlertTriangle className="h-4.5 w-4.5 text-foreground" strokeWidth={2.2} />
                  </div>
                  <h2 className="text-base font-extrabold text-foreground">
                    Tantangan di Lapangan
                  </h2>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-neutral-600 font-mono">{project.caseStudy.problem}</p>

                {project.caseStudy.painPoints.length > 0 && (
                  <div className="mt-5 space-y-2">
                    {project.caseStudy.painPoints.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-2 rounded-[4px] border border-foreground/20 bg-background/50 px-4 py-3 text-xs leading-relaxed text-neutral-600 font-mono"
                      >
                        <span className="text-red-500 font-extrabold">•</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-[8px] neo-surface p-6 bg-surface">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-[4px] border-2 border-foreground bg-money shadow-[1.5px_1.5px_0px_#141414]">
                    <Zap className="h-4.5 w-4.5 text-foreground" strokeWidth={2.2} />
                  </div>
                  <h2 className="text-base font-extrabold text-foreground">
                    Solusi yang Di-deploy
                  </h2>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-neutral-600 font-mono">{project.caseStudy.solution}</p>

                <div className="mt-5 rounded-[4px] border border-foreground/20 bg-background/50 p-4 font-mono text-[11px] leading-relaxed text-neutral-600">
                  <p className="font-bold text-foreground/80 uppercase text-[9px] tracking-wider mb-1">Kenapa Ini Signifikan:</p>
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
              <div className="rounded-[8px] neo-surface p-6 bg-surface">
                <h2 className="text-lg font-bold text-foreground">
                  Sebelum vs Sesudah (Metrik Efisiensi)
                </h2>
                <p className="mt-1.5 text-xs leading-relaxed text-neutral-500 font-mono">
                  Bukti terkuat dari efisiensi sistem di lapangan: perbandingan data performa kerja sebelum dan sesudah sistem live.
                </p>

                <div className="mt-6 grid gap-4">
                  {project.caseStudy.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="grid gap-3 rounded-[6px] border border-foreground/20 bg-background/30 p-4 md:grid-cols-[0.9fr_1fr_1fr] md:items-center font-mono text-[11px]"
                    >
                      <div>
                        <p className="font-bold text-foreground/80 uppercase text-[10px]">
                          {metric.label}
                        </p>
                      </div>
                      <div className="rounded-[4px] border-2 border-foreground bg-double p-4 shadow-[2px_2px_0px_#141414]">
                        <p className="text-[10px] font-bold uppercase text-foreground">
                          Sebelum
                        </p>
                        <p className="mt-1 font-bold text-foreground">{metric.before}</p>
                      </div>
                      <div className="rounded-[4px] border-2 border-foreground bg-money p-4 shadow-[2px_2px_0px_#141414]">
                        <p className="text-[10px] font-bold uppercase text-foreground">
                          Sesudah
                        </p>
                        <p className="mt-1 font-bold text-foreground">{metric.after}</p>
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
              <div className="rounded-[8px] neo-surface p-6 md:p-8 bg-surface">
                <Quote className="h-9 w-9 text-accent/20" />
                <blockquote className="mt-4 text-base font-medium leading-relaxed text-foreground font-mono italic">
                  &ldquo;{project.caseStudy.testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center gap-3 font-mono">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-light border-2 border-foreground font-extrabold text-foreground shadow-[1px_1px_0px_#141414]">
                    {project.caseStudy.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-foreground">{project.caseStudy.testimonial.author}</p>
                    <p className="text-[10px] text-neutral-400">{project.caseStudy.testimonial.role}</p>
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
          <div className="rounded-[8px] neo-surface p-6 bg-surface">
            <h2 className="text-base font-bold text-foreground">
              Fitur & Poin Utama Sistem
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {project.highlights.map((highlight) => (
                <div key={highlight.title} className="rounded-[4px] border border-foreground/15 p-4 bg-background font-mono text-[11px]">
                  <h3 className="font-bold text-foreground">{highlight.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-neutral-500">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] neo-surface p-6 bg-surface">
            <h2 className="text-base font-bold text-foreground">
              Kelebihan & Dampak Berkelanjutan
            </h2>
            <div className="mt-5 space-y-3 font-mono text-[11px]">
              {proofLines.map((line) => (
                <div
                  key={line}
                  className="flex items-start gap-3 rounded-[4px] border border-foreground/15 px-4 py-3 bg-background leading-relaxed text-neutral-600"
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
          <div className="rounded-[8px] neo-surface p-6 bg-surface">
            <h2 className="text-base font-bold text-foreground">
              Cakupan Fitur Bawaan
            </h2>
            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              {project.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2 rounded-[4px] border border-foreground/15 px-4 py-3 bg-background text-[11px] leading-relaxed text-neutral-600 font-mono">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-money" strokeWidth={2.5} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[8px] neo-surface p-6 bg-surface">
            <h2 className="text-base font-bold text-foreground">
              Tumpukan Teknologi (Tech Stack)
            </h2>
            <div className="mt-5 space-y-5">
              {project.techStack.map((stack) => (
                <div key={stack.category}>
                  <h3 className="text-xs font-bold text-accent-dark font-mono uppercase tracking-wider">{stack.category}</h3>
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
        <div className="rounded-[8px] neo-surface p-6 md:p-8 bg-surface">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-extrabold text-foreground">
                Menghadapi Tantangan Operasional yang Serupa?
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Langkah awal terbaik adalah memetakan bottleneck operasional Anda dan merumuskan scope proyek yang paling pragmatis. Hubungi kami untuk memulai.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] border-2 border-foreground bg-foreground text-background px-5 py-3 text-xs font-bold shadow-[3px_3px_0px_var(--color-accent)] hover:-translate-y-0.5 transition-all"
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
