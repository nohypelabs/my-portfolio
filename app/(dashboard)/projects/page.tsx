'use client';

import { motion } from 'framer-motion';
import { projects } from '@/lib/data/projects';
import { ongoingProjects } from '@/lib/data/ongoingProjects';
import { testimonials } from '@/lib/data/testimonials';
import { ScrollReveal } from '@/components/ScrollReveal';
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
  Star,
  Clock,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

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

export default function ProjectsPage() {
  const featuredProject = getFeaturedProject();

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
      <motion.div {...fadeUp} className="rounded-[8px] neo-surface p-6 md:p-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-surface px-3 py-1 text-xs font-semibold text-accent-dark">
            <FolderKanban className="h-3.5 w-3.5" />
            Showcase Portofolio
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Sistem kustom yang benar-benar rilis dan dipakai kerja.
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            Halaman ini bukan sekadar galeri tangkapan layar. Di sini kami merangkum tantangan awal di lapangan, solusi arsitektur yang kami bangun, serta metrik perbaikan nyata setelah rilis.
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[8px] neo-surface p-4 bg-surface">
              <div className="text-2xl font-extrabold text-accent-dark font-mono">{stat.value}</div>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Lenses */}
      <ScrollReveal>
        <div className="grid gap-4 md:grid-cols-3">
          {reviewLenses.map((lens) => (
            <div key={lens.title} className="rounded-[8px] neo-surface p-5 bg-surface">
              <lens.icon className="h-4.5 w-4.5 text-accent" strokeWidth={2.2} />
              <h2 className="mt-3 text-sm font-bold text-foreground">{lens.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-neutral-500">{lens.desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* 2. CASE STUDY UTAMA (FEATURED PROOF) */}
      {featuredProject && (
        <ScrollReveal>
          <div className="rounded-[8px] neo-surface p-6 md:p-8 bg-surface">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-surface px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent-dark">
                  <Sparkles className="h-3 w-3" />
                  Studi Kasus Utama
                </div>
                <h2 className="mt-3 text-2xl font-bold text-foreground md:text-3xl">
                  Rekomendasi Studi Kasus Pilihan
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  Pelajari bagaimana kami mengidentifikasi masalah penimbangan manual di logistik J&T Express, mendesain verifikasi GPS otomatis, dan mempercepat alur kerja hingga 8x lipat.
                </p>
              </div>

              <Link
                href={`/projects/${featuredProject.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent-dark transition-colors hover:text-[#8b6543]"
              >
                Baca Studi Kasus Lengkap
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="overflow-hidden rounded-[8px] border-2 border-foreground shadow-[3px_3px_0px_#141414]">
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
                  <div className="inline-flex rounded-full border-2 border-foreground bg-accent-bg px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground shadow-[1px_1px_0px_#141414]">
                    {getProjectAngle(featuredProject).label}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-foreground">{featuredProject.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500 font-mono">
                    {getProjectAngle(featuredProject).summary}
                  </p>
                </div>

                <div className="rounded-[4px] border border-foreground/20 bg-background/50 p-4 font-mono text-[12px] leading-relaxed text-neutral-600">
                  <p className="font-bold text-foreground/80 uppercase text-[10px] tracking-wider mb-1">Masalah Lapangan:</p>
                  <p>{featuredProject.caseStudy?.problem ?? featuredProject.shortDescription}</p>
                </div>

                {featuredProject.caseStudy?.metrics?.length ? (
                  <div className="space-y-3">
                    {featuredProject.caseStudy.metrics.slice(0, 3).map((metric) => (
                      <div
                        key={metric.label}
                        className="grid gap-3 rounded-[6px] border border-foreground/30 bg-surface p-4 md:grid-cols-[0.9fr_1fr_1fr] md:items-center"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 font-mono">
                          {metric.label}
                        </p>
                        <div className="rounded-[4px] border-2 border-foreground bg-double px-3 py-2 shadow-[2px_2px_0px_#141414]">
                          <p className="text-[10px] font-bold uppercase text-foreground font-mono">
                            Sebelum
                          </p>
                          <p className="mt-1 text-xs font-mono font-bold text-foreground">{metric.before}</p>
                        </div>
                        <div className="rounded-[4px] border-2 border-foreground bg-money px-3 py-2 shadow-[2px_2px_0px_#141414]">
                          <p className="text-[10px] font-bold uppercase text-foreground font-mono">
                            Sesudah
                          </p>
                          <p className="mt-1 text-xs font-mono font-bold text-foreground">{metric.after}</p>
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
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              Selusuri Studi Kasus Berdasarkan Masalah
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
              Berikut adalah daftar sistem berskala produksi yang telah kami deploy. Kami menyertakan detail teknis, alur, dan tautan uji coba jika tersedia.
            </p>
          </div>

          <div className="grid gap-6">
            {productionProjects.map((project, index) => {
              const angle = getProjectAngle(project);
              const metrics = project.caseStudy?.metrics.slice(0, 2) ?? [];

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.05, duration: 0.45 }}
                  className="rounded-[8px] neo-surface p-5 bg-surface"
                >
                  <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
                    <div className="overflow-hidden rounded-[8px] border-2 border-foreground shadow-[3px_3px_0px_#141414] h-[220px] lg:h-full relative">
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
                          <span className="rounded-full border-2 border-foreground bg-accent-bg px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground shadow-[1px_1px_0px_#141414]">
                            {angle.label}
                          </span>
                          <span className="rounded-[4px] border border-foreground/30 bg-surface px-2.5 py-0.5 text-[10px] font-bold font-mono text-neutral-600">
                            Tahun {project.year}
                          </span>
                          <span className="rounded-[4px] border border-foreground/30 bg-surface px-2.5 py-0.5 text-[10px] font-bold font-mono uppercase text-neutral-600">
                            {project.status === 'production' ? 'Live Produksi' : 'Pengerjaan'}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-xl font-extrabold text-foreground">
                            {project.title}
                          </h3>
                          <p className="mt-1.5 text-xs leading-relaxed text-neutral-500 font-mono">{project.shortDescription}</p>
                        </div>

                        <div className="grid gap-3 lg:grid-cols-2">
                          <div className="rounded-[4px] border border-foreground/20 bg-background/50 p-3 font-mono text-[11px] leading-relaxed text-neutral-600">
                            <p className="font-bold text-foreground/80 uppercase text-[9px] tracking-wider mb-1">Masalah Lapangan:</p>
                            <p>{project.caseStudy?.problem ?? angle.summary}</p>
                          </div>
                          <div className="rounded-[4px] border border-foreground/20 bg-background/50 p-3 font-mono text-[11px] leading-relaxed text-neutral-600">
                            <p className="font-bold text-foreground/80 uppercase text-[9px] tracking-wider mb-1">Apa yang Berubah:</p>
                            <p>{project.caseStudy?.solution ?? project.fullDescription}</p>
                          </div>
                        </div>

                        {metrics.length > 0 && (
                          <div className="grid gap-2 md:grid-cols-2 pt-1">
                            {metrics.map((metric) => (
                              <div key={metric.label} className="rounded-[4px] border border-foreground/20 bg-background/30 p-3 font-mono text-[11px]">
                                <p className="font-bold text-foreground/80 text-[10px] uppercase mb-1.5">{metric.label}</p>
                                <div className="flex items-center gap-2">
                                  <span className="bg-double border border-foreground px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-[2px]">Sebelum</span>
                                  <span className="text-neutral-600">{metric.before}</span>
                                </div>
                                <div className="mt-1.5 flex items-center gap-2">
                                  <span className="bg-money border border-foreground px-1.5 py-0.5 text-[9px] font-bold uppercase rounded-[2px]">Sesudah</span>
                                  <span className="text-foreground font-bold">{metric.after}</span>
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
                              className="rounded-[4px] border border-foreground/30 bg-surface px-2.5 py-0.5 text-[10px] font-mono font-bold text-neutral-500 shadow-[1px_1px_0px_#141414]"
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
                              className="inline-flex items-center gap-1.5 rounded-[4px] border-2 border-foreground bg-accent-light px-3.5 py-1.5 text-xs font-bold text-foreground shadow-[2px_2px_0px_#141414] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
                            >
                              Lihat Live
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          )}
                          <Link
                            href={`/projects/${project.id}`}
                            className="inline-flex items-center gap-1 text-xs font-bold text-foreground hover:underline"
                          >
                            Buka Detail Kasus
                            <ArrowUpRight className="h-4 w-4 text-accent" strokeWidth={2.5} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* 4. ONGOING PROJECTS (PROYEK YANG SEDANG BERJALAN) */}
      <ScrollReveal>
        <div className="space-y-6 rounded-[8px] neo-surface p-6 md:p-8 bg-surface">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              Sistem yang Sedang Dibangun (Ongoing)
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
              Transparansi progres adalah kunci. Di bawah ini adalah daftar proyek aktif yang sedang kami beri kode (development) beserta estimasi waktu rilisnya.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {ongoingProjects.map((item) => (
              <div
                key={item.id}
                className="rounded-[6px] border-2 border-foreground bg-background p-4 shadow-[3px_3px_0px_#141414] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-neutral-400">MULAI: {item.startDate}</span>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] font-extrabold uppercase font-mono bg-accent-bg border border-foreground rounded-[2px]">
                      <Clock className="w-3 h-3" /> CODING AKTIF
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-extrabold text-foreground">{item.name}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-neutral-500 font-mono">{item.description}</p>
                  </div>

                  {/* Retro Progress Bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] font-bold font-mono text-neutral-500">
                      <span>PROGRES CODING</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="h-4 border-2 border-foreground bg-surface rounded-[4px] shadow-[1px_1px_0px_#141414] overflow-hidden relative">
                      <div
                        className="h-full bg-money border-r-2 border-foreground transition-all duration-500"
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1 pt-1">
                    <p className="text-[10px] font-bold font-mono text-foreground/70 uppercase">Target Rilis:</p>
                    <ul className="space-y-1">
                      {item.keyGoals?.slice(0, 3).map((goal, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-[10px] leading-relaxed text-neutral-500 font-mono">
                          <span className="text-accent-dark font-extrabold">•</span>
                          <span>{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-foreground/10 pt-3 mt-4">
                  <div className="flex flex-wrap gap-1">
                    {item.techStack.slice(0, 3).map((t) => (
                      <span key={t} className="text-[9px] font-bold font-mono text-neutral-500 px-1 border border-foreground/15 rounded-[2px]">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold font-mono text-accent-dark">
                    ESTIMASI RILIS: {item.estimatedCompletion}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* 5. TESTIMONIALS (ULASAN KLIEN) */}
      <ScrollReveal>
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              Ulasan Pengguna & Klien Kami
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
              Berikut testimoni langsung dari manajer operasional dan pemilik bisnis yang menggunakan sistem buatan kami sehari-hari.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="rounded-[8px] border-2 border-foreground bg-surface p-5 shadow-[4px_4px_0px_#141414] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-xs leading-relaxed text-neutral-600 font-mono italic">
                    &ldquo;{item.content}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-foreground/10 pt-4 mt-4 font-mono">
                  <div>
                    <h4 className="text-xs font-extrabold text-foreground">{item.name}</h4>
                    <p className="text-[10px] text-neutral-400">{item.role}, {item.company}</p>
                  </div>
                  <span className="rounded-[4px] border border-foreground/20 bg-background px-2.5 py-0.5 text-[9px] font-bold text-neutral-500 uppercase">
                    PROYEK: {item.project}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* FOOTER CTA */}
      <ScrollReveal>
        <div className="rounded-[8px] border-2 border-foreground bg-accent-bg p-6 md:p-8 shadow-[4px_4px_0px_#141414]">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold text-foreground">
                Punya Masalah Operasional Lapangan?
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Jangan biarkan tim Anda membuang jam kerja untuk entri manual. Mari diskusikan solusi digital pragmatis untuk mempercepat operasional Anda.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-foreground text-background px-5 py-3 text-sm font-extrabold shadow-[3px_3px_0px_var(--color-accent)] border-2 border-foreground hover:-translate-y-0.5 transition-all"
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
