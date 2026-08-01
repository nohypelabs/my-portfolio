'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe,
  MessageCircle,
  Rocket,
  Server,
  Smartphone,
  Wrench,
  Search,
  Palette,
  Code,
  CheckCircle,
  Headphones,
  ChevronDown,
  Sparkles,
  Coins,
  FileText,
  ShieldCheck,
  Star,
  Target,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useState } from 'react';
import type { Service, PricingPackage, ProcessStep, FAQ } from '@/lib/supabase/types';
import { clsx } from '@/lib/utils';

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Server,
  Wrench,
  MessageCircle,
  Code: Globe,
};

const stepIconMap: Record<string, LucideIcon> = {
  Search,
  Palette,
  Code,
  CheckCircle,
  Rocket,
  Headphones,
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function formatCompactIdr(value: number) {
  if (value === 0) return 'Gratis';

  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    const label = Number.isInteger(millions) ? String(millions) : millions.toFixed(1).replace(/\.0$/, '');
    return `Rp ${label}jt`;
  }

  if (value >= 1_000) {
    return `Rp ${Math.round(value / 1_000)}rb`;
  }

  return `Rp ${value}`;
}

function formatPrice(min: number, max: number): string {
  if (min === 0 && max === 0) return 'Gratis';
  if (min === max) return formatCompactIdr(min);
  return `${formatCompactIdr(min)} - ${formatCompactIdr(max)}`;
}

function getServiceLens(service: Service) {
  const key = service.slug.toLowerCase();

  if (key.includes('web') || key.includes('website')) {
    return {
      badge: 'Surface Publik',
      fit: 'Paling cocok saat bisnis sudah punya penawaran, tapi website yang sekarang masih terlihat lemah atau susah dipercaya.',
      outcome: 'Target: Bikin brand Anda terlihat kokoh, tajam, dan mudah dihubungi klien.',
      summary: 'Company profile interaktif, landing page konversi, atau brosur digital yang menjelaskan nilai unik bisnis Anda secara instan.',
    };
  }

  if (key.includes('mobile')) {
    return {
      badge: 'Operasional Lapangan',
      fit: 'Paling cocok saat tim lapangan butuh alat catat cepat, atau customer Anda butuh akses on-the-go tanpa buka laptop.',
      outcome: 'Target: Menghilangkan pencatatan kertas di lapangan dan mempercepat input data.',
      summary: 'Aplikasi Android native/hybrid yang ringan, mendukung mode offline (gudang/tambang), serta dilengkapi GPS watermark.',
    };
  }

  if (key.includes('api') || key.includes('backend')) {
    return {
      badge: 'Backbone Sistem',
      fit: 'Paling cocok saat bisnis Anda mulai kewalahan dengan sheet manual, integrasi yang sering terputus, atau data tersebar.',
      outcome: 'Target: Sentralisasi data operasional agar aman, rapi, dan siap di-scale.',
      summary: 'Desain database PostgreSQL/Supabase, API kustom terenkripsi, integrasi payment gateway, dan otomasi alur data.',
    };
  }

  if (key.includes('maint') || key.includes('support')) {
    return {
      badge: 'Dukungan Pasca-Rilis',
      fit: 'Paling cocok saat sistem pertama Anda sudah live, tapi Anda butuh jaminan bug langsung beres tanpa rekrut IT full-time.',
      outcome: 'Target: Menjaga server tetap menyala stabil dan sistem bebas kendala operasional.',
      summary: 'Monitoring server berkala, perbaikan bug darurat, optimasi query database, dan pembaruan patch keamanan.',
    };
  }

  return {
    badge: 'Konsultasi Teknis',
    fit: 'Paling cocok saat Anda tahu ada masalah operasional tapi bingung harus membuat software seperti apa atau dari mana memulainya.',
    outcome: 'Target: Menghindari pemborosan budget IT pada arah pengerjaan yang salah.',
    summary: 'Bedah alur kerja operasional, penyusunan rancangan database awal, rekomendasi stack teknologi, serta estimasi biaya.',
  };
}

function getPackageLens(pkg: PricingPackage) {
  const key = pkg.slug.toLowerCase();

  if (key.includes('starter')) {
    return {
      badge: 'Mulai Online',
      fit: 'Sangat cocok untuk validasi ide awal, brosur online sederhana, atau profil bisnis ringkas.',
      note: 'Fokus pada kecepatan rilis dan kejelasan informasi kontak utama.',
    };
  }

  if (key.includes('basic')) {
    return {
      badge: 'Meningkatkan Kredibilitas',
      fit: 'Paling pas untuk bisnis yang ingin tampil profesional sebelum melangkah ke sistem custom yang rumit.',
      note: 'Desain visual yang tajam untuk meningkatkan konversi kunjungan menjadi prospek.',
    };
  }

  if (key.includes('standard')) {
    return {
      badge: 'Otomasi Workflow',
      fit: 'Dirancang khusus untuk mengelola data operasional internal, rekap admin, dan dashboard CRUD.',
      note: 'Paket terlaris untuk merapikan bisnis yang mulai kewalahan dengan pencatatan manual.',
    };
  }

  if (key.includes('premium')) {
    return {
      badge: 'Multi-Platform Sistem',
      fit: 'Bagi bisnis yang memerlukan ekosistem lengkap: aplikasi admin web terintegrasi dengan app kurir/tim lapangan.',
      note: 'Dukungan pasca-rilis intensif dan serah terima penuh hak milik source code.',
    };
  }

  return {
    badge: 'Kustom Spesifik',
    fit: 'Jika alur kerja Anda unik, memiliki integrasi hardware (IoT/printer), atau regulasi keamanan ketat.',
    note: 'Desain scope pengerjaan disesuaikan dengan budget dan bottleneck riil operasional.',
  };
}

function FAQItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="neo-surface rounded-[6px] overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left"
      >
        <span className="text-[13px] font-bold text-foreground pr-4 font-mono">{faq.question}</span>
        <ChevronDown
          className={clsx('w-4 h-4 text-neutral-500 flex-shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
          strokeWidth={2.5}
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 border-t border-foreground/10 pt-3 bg-surface/50">
          <p className="text-[12px] text-neutral-600 leading-relaxed font-mono">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export function ServicesContent({
  services,
  packages,
  steps,
  faqs,
}: {
  services: Service[];
  packages: PricingPackage[];
  steps: ProcessStep[];
  faqs: FAQ[];
}) {
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);

  const trustPoints = [
    {
      icon: Building2,
      title: 'Arah langsung dari founder',
      desc: 'Diskusi terjadi langsung dengan orang yang mengarahkan sistem, sehingga tidak ada detail lapangan yang hilang.',
    },
    {
      icon: Target,
      title: 'Scope dimulai dari problem bisnis',
      desc: 'Kami mendesain fitur berdasarkan titik kemacetan (bottleneck) nyata di operasional Anda, bukan sekadar gaya-gayaan.',
    },
    {
      icon: Rocket,
      title: 'Dibuat untuk langsung dipakai',
      desc: 'Target utama kami adalah mendeploy aplikasi yang fungsional secepat mungkin, baru kemudian menyempurnakannya.',
    },
  ];

  const guidePoints = [
    {
      icon: FileText,
      title: 'Desain scope memengaruhi harga',
      desc: 'Angka di bawah adalah rentang panduan. Harga final akan mengikuti kompleksitas brief operasional Anda.',
    },
    {
      icon: Coins,
      title: 'Pembayaran bertahap 50:50',
      desc: 'Model pembayaran split 50% di awal (setelah desain disepakati) dan 50% setelah serah terima sistem.',
    },
    {
      icon: ShieldCheck,
      title: 'Hasil nyata bebas ketergantungan',
      desc: 'Kami mendeploy dengan dokumentasi yang jelas sehingga tim internal Anda bisa menggunakannya secara mandiri.',
    },
  ];

  const categoryLabels: Record<string, string> = {
    project: 'Manajemen Proyek',
    technical: 'Teknis & Infrastruktur',
    payment: 'Skema Pembayaran',
    legal: 'Hak Cipta & Garansi',
  };

  const categories = [...new Set(faqs.map((f) => f.category))];

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="mx-auto max-w-5xl space-y-12 pb-12"
    >
      {/* 1. HERO SERVICES */}
      <motion.div {...fadeUp} className="rounded-[8px] neo-surface p-6 md:p-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-surface px-3 py-1 text-xs font-semibold text-accent-dark">
            <Building2 className="h-3.5 w-3.5" />
            Layanan Kami
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-5xl">
            Sistem kustom untuk merapikan alur kerja operasional Anda.
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            Kami mendeploy software operasional terpadu bagi bisnis yang mulai kewalahan dengan pencatatan manual, Excel berantakan, atau sistem pihak ketiga yang kaku. Pilih track yang paling cocok untuk bisnis Anda.
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {trustPoints.map((item) => (
            <div key={item.title} className="rounded-[8px] neo-surface p-4 bg-surface">
              <item.icon className="h-4.5 w-4.5 text-accent" />
              <h2 className="mt-3 text-sm font-bold text-foreground">{item.title}</h2>
              <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. TRACK LAYANAN DETAIL */}
      <ScrollReveal>
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              Fokus Track Solusi Digital
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-500">
              Setiap track dirancang untuk memecahkan satu masalah utama: merapikan citra publik, mempercepat kerja tim lapangan, atau merapikan integrasi data operasional.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Globe;
              const lens = getServiceLens(service);

              return (
                <motion.div
                  key={service.id}
                  variants={fadeInUp}
                  className="rounded-[8px] neo-surface p-5 bg-surface flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="inline-flex rounded-full border-2 border-foreground bg-accent-bg px-3 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-foreground shadow-[1px_1px_0px_#141414]">
                        {lens.badge}
                      </div>
                      <div className="flex h-9 w-9 items-center justify-center rounded-[4px] border-2 border-foreground bg-surface shadow-[1.5px_1.5px_0px_#141414]">
                        <Icon className="h-4.5 w-4.5 text-foreground" strokeWidth={2.2} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-base font-extrabold text-foreground">{service.title}</h3>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-neutral-500">{lens.summary}</p>
                    </div>

                    <div className="rounded-[4px] border border-foreground/20 bg-background/50 p-3 text-[11px] leading-relaxed text-neutral-600">
                      <p className="font-bold text-foreground/80 font-mono text-[10px] uppercase tracking-wider">Kapan Butuh Ini:</p>
                      <p className="mt-1 font-mono">{lens.fit}</p>
                    </div>

                    <ul className="grid gap-1.5 sm:grid-cols-2 pt-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-neutral-600 font-mono">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-money" strokeWidth={2.5} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between border-t border-foreground/10 pt-4 mt-4">
                    <p className="text-[10px] font-mono text-neutral-500">{lens.outcome}</p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-foreground hover:underline"
                    >
                      Bahas Solusi
                      <ArrowRight className="h-3.5 w-3.5 text-accent" strokeWidth={2.5} />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* 3. CARA KERJA (PROCESS) */}
      <ScrollReveal>
        <div className="space-y-6 rounded-[8px] neo-surface p-6 md:p-8 bg-surface">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              Alur Kerja Pengerjaan Sistem
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
              Proses kerja kami dirancang untuk mengeliminasi ketakutan akan proyek yang macet di tengah jalan. Setiap tahap memiliki output konkret yang bisa Anda evaluasi langsung.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {steps.map((step) => {
              const StepIcon = stepIconMap[step.icon] || Search;
              return (
                <div
                  key={step.id}
                  className="rounded-[6px] border-2 border-foreground bg-background p-4 shadow-[3px_3px_0px_#141414]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-neutral-400">TAHAP {step.step_number}</span>
                    <StepIcon className="h-4 w-4 text-accent" strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* 4. HARGA & PAKET (PRICING) */}
      <ScrollReveal>
        <div className="space-y-6">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              Panduan Rentang Harga & Paket
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
              Kami terbuka mengenai rentang biaya agar Anda dapat memilih titik pengerjaan awal yang realistis dengan budget operasional bisnis Anda.
            </p>
          </div>

          {/* Pricing Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {packages.map((pkg) => {
              const lens = getPackageLens(pkg);
              const isPopular = pkg.is_popular;

              return (
                <div
                  key={pkg.id}
                  className={clsx(
                    'rounded-[8px] bg-surface flex flex-col justify-between transition-all duration-200',
                    isPopular
                      ? 'border-4 border-foreground shadow-[8px_8px_0px_#141414] scale-102 z-10 p-5'
                      : 'border-2 border-foreground shadow-[3px_3px_0px_#141414] p-4'
                  )}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold font-mono uppercase tracking-wider text-neutral-400">
                        {lens.badge}
                      </span>
                      {isPopular && (
                        <span className="inline-flex items-center gap-1 rounded-[4px] border-2 border-foreground bg-money px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wide text-foreground shadow-[1px_1px_0px_#141414]">
                          <Star className="h-3 w-3 fill-foreground" /> Terpopuler
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-extrabold text-foreground">{pkg.name}</h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">{pkg.description}</p>
                    </div>

                    <div className="py-2 border-y border-foreground/10">
                      <p className="text-[10px] font-mono text-neutral-400">Estimasi Rentang Biaya:</p>
                      <p className="text-lg font-extrabold text-foreground font-mono">
                        {formatPrice(pkg.price_min, pkg.price_max)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-bold font-mono text-foreground/70 uppercase">Cakupan Pekerjaan:</p>
                      <ul className="space-y-1.5">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-neutral-600 font-mono">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-money" strokeWidth={2.5} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-foreground/10 space-y-3">
                    <p className="text-[9px] font-mono text-neutral-400 leading-relaxed italic">{lens.fit}</p>
                    <Link
                      href="/contact"
                      className={clsx(
                        'w-full inline-flex items-center justify-center gap-2 rounded-[4px] py-2 text-xs font-extrabold shadow-[2px_2px_0px_#141414] border-2 border-foreground transition-all hover:-translate-y-0.5 active:translate-y-0 active:shadow-none',
                        isPopular ? 'bg-accent-light text-foreground' : 'bg-background text-foreground'
                      )}
                    >
                      {pkg.cta_text || 'Diskusikan Kebutuhan'}
                      <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pricing Info Cards */}
          <div className="grid gap-3 md:grid-cols-3 pt-2">
            {guidePoints.map((point) => (
              <div key={point.title} className="rounded-[6px] border border-foreground/20 bg-surface/50 p-4">
                <point.icon className="h-4.5 w-4.5 text-accent" strokeWidth={2.2} />
                <h4 className="mt-2 text-xs font-bold text-foreground">{point.title}</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-neutral-500 font-mono">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* 5. PERTANYAAN UMUM (FAQ) */}
      <ScrollReveal>
        <div className="space-y-6 rounded-[8px] neo-surface p-6 md:p-8 bg-surface">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              Pertanyaan yang Sering Diajukan (FAQ)
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">
              Berikut jawaban cepat tentang bagaimana kerja sama pengerjaan sistem ini berjalan di lapangan.
            </p>
          </div>

          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat} className="space-y-3">
                <h3 className="text-xs font-bold text-foreground font-mono uppercase tracking-wider border-b border-foreground/10 pb-1.5">
                  {categoryLabels[cat] || cat}
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {faqs
                    .filter((f) => f.category === cat)
                    .map((faq) => (
                      <FAQItem
                        key={faq.id}
                        faq={faq}
                        isOpen={activeFaqId === faq.id}
                        onToggle={() => setActiveFaqId(activeFaqId === faq.id ? null : faq.id)}
                      />
                    ))}
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
                Siap Merapikan Operasional Bisnis Anda?
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                Kami siap membantu memetakan bottleneck operasional Anda dan mendesain sistem digital kustom yang andal. Mulai dengan membuat brief proyek singkat.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-foreground text-background px-5 py-3 text-sm font-extrabold shadow-[3px_3px_0px_var(--color-accent)] border-2 border-foreground hover:-translate-y-0.5 transition-all"
              >
                Mulai Hubungi Kami
                <ArrowRight className="h-4.5 w-4.5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </motion.div>
  );
}
