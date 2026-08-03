'use client';

import { useEffect, useState } from 'react';
import { projects } from '@/lib/data/projects';
import { ScrollReveal } from '@/components/ScrollReveal';
import { MaskReveal } from '@/components/motion/MaskReveal';
import type { Project } from '@/lib/domain/entities/Project';
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  ExternalLink,
  FolderKanban,
  Gauge,
  Globe2,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const productionProjects = projects.filter((project) => project.status === 'production');

function getFeaturedProject() {
  return productionProjects.find((project) => project.id === 'selisih-berat') ?? productionProjects[0];
}

function getProjectAngle(project: Project) {
  const title = project.title.toLowerCase();

  if (title.includes('logistics') || title.includes('j&t') || title.includes('serat')) {
    return {
      label: 'Bukti Operasional',
      summary: 'Contoh nyata bagaimana alur kerja lapangan yang repetitif diotomasi menjadi sistem yang jauh lebih cepat dan terpantau.',
    };
  }

  if (title.includes('wc check') || title.includes('inspection')) {
    return {
      label: 'Bukti Monitoring',
      summary: 'Studi kasus penggantian pelaporan kertas manual menjadi data digital real-time yang bisa ditelusuri riwayatnya.',
    };
  }

  if (title.includes('pos') || title.includes('warehouse')) {
    return {
      label: 'Workflow Retail',
      summary: 'Menunjukkan bagaimana operasional kasir dan manajemen stok disatukan dalam satu antarmuka kasir pintar.',
    };
  }

  if (title.includes('e-commerce') || title.includes('qohira')) {
    return {
      label: 'Workflow Commerce',
      summary: 'Pusat kelola pesanan dan konfirmasi pembayaran otomatis untuk merapikan alur masuk transaksi pembeli.',
    };
  }

  return {
    label: 'Build Sistem',
    summary: 'Pengembangan sistem kustom untuk mengubah bottleneck operasional menjadi alur kerja web yang pragmatis.',
  };
}

interface LiveMetricsData {
  seratQc: { entries: number };
  wcCheck: { inspections: number };
  lakuPos: { transactions: number };
  ecommerce: { orders: number };
}

export default function ProjectsPage() {
  const featuredProject = getFeaturedProject();

  const [liveMetrics, setLiveMetrics] = useState<LiveMetricsData | null>(null);

  useEffect(() => {
    fetch('/api/live-metrics')
      .then((r) => r.json())
      .then((data) => setLiveMetrics(data.metrics))
      .catch(() => {});
  }, []);

  const getLiveBadgeText = (pId: string) => {
    if (!liveMetrics) return null;
    if (pId === 'selisih-berat') {
      return `● ${liveMetrics.seratQc.entries.toLocaleString('id-ID')} resi terproses`;
    }
    if (pId === 'wc-check') {
      return `● ${liveMetrics.wcCheck.inspections.toLocaleString('id-ID')} inspeksi`;
    }
    if (pId === 'lakupos') {
      return `● ${liveMetrics.lakuPos.transactions.toLocaleString('id-ID')} transaksi`;
    }
    if (pId === 'ecommerce-manual') {
      return `● ${liveMetrics.ecommerce.orders.toLocaleString('id-ID')} pesanan`;
    }
    return null;
  };

  const liveDemoCount = productionProjects.filter((project) => Boolean(project.demo)).length;
  const documentedStudies = productionProjects.filter((project) => Boolean(project.caseStudy)).length;
  const proofMetricsCount = productionProjects.reduce(
    (count, project) => count + (project.caseStudy?.metrics.length ?? 0),
    0
  );

  const stats = [
    {
      value: String(productionProjects.length),
      label: 'sistem rilis aktif',
    },
    {
      value: String(liveDemoCount),
      label: 'demo live tersedia',
    },
    {
      value: String(documentedStudies),
      label: 'studi kasus lengkap',
    },
    {
      value: `${proofMetricsCount}+`,
      label: 'titik bukti efisiensi',
    },
    {
      value: '2024-2026',
      label: 'rentang pengerjaan',
    },
  ];

  const reviewLenses = [
    {
      icon: Building2,
      title: 'Konteks bisnis riil',
      desc: 'Setiap sistem dirancang untuk memecahkan hambatan operasional nyata, bukan sekadar demo.',
    },
    {
      icon: Gauge,
      title: 'Sebelum vs sesudah',
      desc: 'Bukti pengerjaan kami diukur dari perubahan kecepatan kerja, kejelasan data, dan hilangnya friction.',
    },
    {
      icon: Globe2,
      title: 'Teruji di lapangan',
      desc: 'Aplikasi didesain untuk bertahan menghadapi beban kerja riil operasional harian tim Anda.',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-12 pb-12">
      {/* 1. HERO PORTFOLIO */}
      <ScrollReveal>
        <div className="rounded-3xl bg-[var(--bg-element)] soft-border p-6 md:p-10">
        <div className="max-w-3xl space-y-5">
          <span className="chip">
            <FolderKanban className="h-3.5 w-3.5 text-foreground/60" />
            Showcase Portofolio
          </span>
          <h1 className="text-3xl font-light tracking-tight text-foreground md:text-5xl">
            Sistem kustom yang benar-benar rilis dan dipakai kerja.
          </h1>
          <p className="text-sm leading-relaxed text-foreground/70 md:text-base">
            Halaman ini bukan sekadar galeri tangkapan layar. Di sini kami merangkum tantangan awal di lapangan, solusi arsitektur yang kami bangun, serta metrik perbaikan nyata setelah rilis.
          </p>
        </div>

        <div className="card-rotate mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl soft-border p-4">
              <div className="text-2xl font-light tracking-tight text-foreground font-mono">
                {stat.value}
              </div>
              <p className="mt-2 text-xs leading-relaxed text-foreground/70">{stat.label}</p>
            </div>
          ))}
        </div>
        </div>
      </ScrollReveal>

      {/* Lenses */}
      <ScrollReveal>
        <div className="card-rotate grid gap-4 md:grid-cols-3">
          {reviewLenses.map((lens) => (
            <div key={lens.title} className="neo-surface rounded-2xl p-5 hover:-translate-y-1 transition-transform">
              <lens.icon className="h-4.5 w-4.5 text-foreground" strokeWidth={2.2} />
              <h2 className="mt-3 text-sm font-semibold text-foreground">{lens.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-foreground/70">{lens.desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* 2. CASE STUDY UTAMA (FEATURED PROOF) */}
      {featuredProject && (
        <ScrollReveal>
          <div className="rounded-3xl bg-[var(--bg-element)] soft-border p-6 md:p-10">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="chip">
                  <Sparkles className="h-3 w-3 text-foreground/60" />
                  Studi Kasus Utama
                </div>
                <h2 className="mt-3 text-2xl font-light text-foreground md:text-3xl">
                  Rekomendasi studi kasus pilihan
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  Pelajari bagaimana kami mengidentifikasi masalah penimbangan manual di logistik J&T Express, mendesain verifikasi GPS otomatis, dan mempercepat alur kerja hingga 8x lipat.
                </p>
              </div>

              <Link
                href={`/projects/${featuredProject.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
              >
                Baca Studi Kasus Lengkap
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="overflow-hidden rounded-2xl soft-border">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  width={1400}
                  height={900}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="chip text-[10px] uppercase tracking-[0.14em]">
                      {getProjectAngle(featuredProject).label}
                    </span>
                    {getLiveBadgeText(featuredProject.id) && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-money/15 border border-money/30 px-2.5 py-1 text-[10px] font-semibold font-mono text-foreground animate-pulse">
                        {getLiveBadgeText(featuredProject.id)}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-foreground">{featuredProject.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70 font-mono">
                    {getProjectAngle(featuredProject).summary}
                  </p>
                </div>

                <div className="rounded-2xl soft-border bg-[var(--bg-element-second)] p-4 font-mono text-[12px] leading-relaxed text-foreground/80">
                  <p className="font-semibold text-foreground/80 uppercase text-[10px] tracking-wider mb-1">Masalah Lapangan:</p>
                  <p>{featuredProject.caseStudy?.problem ?? featuredProject.shortDescription}</p>
                </div>

                {featuredProject.caseStudy?.metrics?.length ? (
                  <div className="space-y-3">
                    {featuredProject.caseStudy.metrics.slice(0, 3).map((metric) => (
                      <div
                        key={metric.label}
                        className="grid gap-3 rounded-2xl soft-border bg-[var(--bg-element)] p-4 md:grid-cols-[0.9fr_1fr_1fr] md:items-center"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-foreground/70 font-mono">
                          {metric.label}
                        </p>
                        <div className="rounded-xl bg-[var(--bg-element-second)] soft-border px-3 py-2">
                          <p className="text-[10px] font-semibold uppercase text-foreground/70 font-mono">
                            Sebelum
                          </p>
                          <p className="mt-1 text-xs font-mono font-semibold text-foreground">{metric.before}</p>
                        </div>
                        {/* indicator-green is one of only two hues in the palette;
                            reserved for exactly this "after / improved" signal. */}
                        <div className="rounded-xl bg-money/20 border border-money/40 px-3 py-2">
                          <p className="text-[10px] font-semibold uppercase text-foreground/70 font-mono">
                            Sesudah
                          </p>
                          <p className="mt-1 text-xs font-mono font-semibold text-foreground">{metric.after}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* 3. CASE STUDIES GRID (PROYEK SELESAI) */}
      <ScrollReveal>
        <div className="space-y-6">
          <div className="max-w-2xl">
            <p className="descriptor">Studi Kasus</p>
            <h2 className="mt-2 text-2xl font-light text-foreground md:text-3xl">
              Selusuri berdasarkan masalah
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-foreground/70">
              Berikut adalah daftar sistem berskala produksi yang telah kami deploy. Kami menyertakan detail teknis, alur, dan tautan uji coba jika tersedia.
            </p>
          </div>

          {/* row-mirror alternates which side the screenshot sits on */}
          <div className="row-mirror grid gap-6">
            {productionProjects.map((project, index) => {
              const angle = getProjectAngle(project);
              const metrics = project.caseStudy?.metrics.slice(0, 2) ?? [];

              return (
                <MaskReveal
                  key={project.id}
                  split="none"
                  duration={0.45}
                  delay={0.08 + index * 0.05}
                  stagger={0}
                  start="top 90%"
                  className="neo-surface rounded-3xl p-6 hover:-translate-y-1 transition-transform"
                >
                  <div className="row-mirror-row grid gap-6 lg:grid-cols-[320px_1fr]">
                    <div className="row-mirror-media overflow-hidden rounded-2xl soft-border h-[220px] lg:h-full relative">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={1200}
                        height={900}
                        className="h-full w-full object-cover"
                        sizes="(max-width: 1024px) 100vw, 320px"
                      />
                    </div>

                    <div className="flex flex-col justify-between gap-4">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="chip text-[10px] uppercase tracking-[0.14em]">
                            {angle.label}
                          </span>
                          <span className="chip">
                            Tahun {project.year}
                          </span>
                          <span className="chip uppercase">
                            {project.status === 'production' ? 'Live Produksi' : 'Pengerjaan'}
                          </span>
                          {getLiveBadgeText(project.id) && (
                            <span className="inline-flex items-center rounded-full bg-money/15 border border-money/30 px-2.5 py-1 text-[10px] font-semibold font-mono text-foreground animate-pulse">
                              {getLiveBadgeText(project.id)}
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {project.title}
                          </h3>
                          <p className="mt-1.5 text-xs leading-relaxed text-foreground/70 font-mono">{project.shortDescription}</p>
                        </div>

                        <div className="grid gap-3 lg:grid-cols-2">
                          <div className="rounded-2xl soft-border bg-[var(--bg-element-second)] p-3.5 font-mono text-[11px] leading-relaxed text-foreground/80">
                            <p className="font-semibold text-foreground uppercase text-[9px] tracking-wider mb-1">Masalah Lapangan:</p>
                            <p>{project.caseStudy?.problem ?? angle.summary}</p>
                          </div>
                          <div className="rounded-2xl soft-border bg-[var(--bg-element-second)] p-3.5 font-mono text-[11px] leading-relaxed text-foreground/80">
                            <p className="font-semibold text-foreground uppercase text-[9px] tracking-wider mb-1">Apa yang Berubah:</p>
                            <p>{project.caseStudy?.solution ?? project.fullDescription}</p>
                          </div>
                        </div>

                        {metrics.length > 0 && (
                          <div className="grid gap-2 md:grid-cols-2 pt-1">
                            {metrics.map((metric) => (
                              <div key={metric.label} className="rounded-2xl soft-border bg-[var(--bg-element-second)] p-3.5 font-mono text-[11px]">
                                <p className="font-semibold text-foreground/80 text-[10px] uppercase mb-1.5">{metric.label}</p>
                                <div className="flex items-center gap-2">
                                  <span className="bg-double/15 border border-double/30 px-1.5 py-0.5 text-[9px] font-semibold uppercase rounded-full">Sebelum</span>
                                  <span className="text-foreground/70">{metric.before}</span>
                                </div>
                                <div className="mt-1.5 flex items-center gap-2">
                                  <span className="bg-money/15 border border-money/30 px-1.5 py-0.5 text-[9px] font-semibold uppercase rounded-full">Sesudah</span>
                                  <span className="text-foreground font-semibold">{metric.after}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 border-t border-foreground/10 pt-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span
                              key={tag}
                              className="chip text-[10px]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-secondary px-4 py-2 text-xs"
                            >
                              Lihat Live
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                          <Link
                            href={`/projects/${project.id}`}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-foreground underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
                          >
                            Buka Detail Kasus
                            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </MaskReveal>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* FOOTER CTA */}
      <ScrollReveal>
        <div className="rounded-3xl bg-[var(--bg-btn-big)] text-[var(--txt-btn-big)] p-6 md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-light text-current md:text-3xl">
                Punya Masalah Operasional Lapangan?
              </h2>
              <p className="text-sm leading-relaxed opacity-70">
                Jangan biarkan tim Anda membuang jam kerja untuk entri manual. Mari diskusikan solusi digital pragmatis untuk mempercepat operasional Anda.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--bg-form-element)] px-6 py-3 text-sm font-semibold text-[#3c3c3c] transition-transform hover:-translate-y-0.5"
              >
                Mulai Diskusi Sekarang
                <ArrowRight className="h-4.5 w-4.5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}