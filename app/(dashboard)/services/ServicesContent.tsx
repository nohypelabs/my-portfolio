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
import type { Service, PricingPackage, ProcessStep, FAQ } from '@/lib/data/services';
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

  if (key.includes('android') || key.includes('mobile')) {
    return {
      badge: 'Operasional Lapangan',
      fit: 'Paling cocok saat tim lapangan butuh alat catat cepat, atau customer Anda butuh akses on-the-go tanpa buka laptop.',
      outcome: 'Target: Menghilangkan pencatatan kertas di lapangan dan mempercepat input data.',
      summary: 'Aplikasi Android native/hybrid yang ringan, mendukung mode offline (gudang/tambang), serta dilengkapi GPS watermark.',
    };
  }

  if (key.includes('web') || key.includes('website')) {
    return {
      badge: 'Surface Publik',
      fit: 'Paling cocok saat bisnis sudah punya penawaran, tapi website yang sekarang masih terlihat lemah atau susah dipercaya.',
      outcome: 'Target: Bikin brand Anda terlihat kokoh, tajam, dan mudah dihubungi klien.',
      summary: 'Company profile interaktif, landing page konversi, atau brosur digital yang menjelaskan nilai unik bisnis Anda secara instan.',
    };
  }

  if (key.includes('dashboard') || key.includes('operasional') || key.includes('api') || key.includes('backend')) {
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
      fit: 'Bagi bisnis yang memerlukan ekosistem lengkap: aplikasi admin web terintegrasi dengan app kurir/lapangan.',
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
    <div className="glass rounded-2xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4.5 text-left"
      >
        <span className="text-[13px] font-semibold text-foreground pr-4 font-mono">{faq.question}</span>
        <ChevronDown
          className={clsx('w-4 h-4 text-muted flex-shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
          strokeWidth={2.5}
        />
      </button>
      {isOpen && (
        <div className="px-4.5 pb-4 border-t border-foreground/10 pt-3">
          <p className="text-[12px] text-muted leading-relaxed font-mono">{faq.answer}</p>
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
      <motion.div {...fadeUp} className="rounded-3xl glass p-6 md:p-10">
        <div className="max-w-3xl space-y-5">
          <span className="chip">
            <Building2 className="h-3.5 w-3.5 text-accent" />
            Layanan Kami
          </span>
          <h1 className="text-3xl font-light tracking-tight text-foreground md:text-5xl">
            Sistem kustom untuk merapikan alur kerja operasional Anda.
          </h1>
          <p className="text-sm leading-relaxed text-muted md:text-base">
            Kami mendeploy software operasional terpadu bagi bisnis yang mulai kewalahan dengan pencatatan manual, Excel berantakan, atau sistem pihak ketiga yang kaku. Pilih track yang paling cocok untuk bisnis Anda.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {trustPoints.map((item) => (
            <div key={item.title} className="glass-soft rounded-2xl p-5">
              <item.icon className="h-4.5 w-4.5 text-accent" strokeWidth={2.2} />
              <h2 className="mt-3 text-sm font-semibold text-foreground">{item.title}</h2>
              <p className="mt-1 text-[12px] leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* 2. TRACK LAYANAN DETAIL */}
      <ScrollReveal>
        <div className="space-y-6">
          <div className="max-w-2xl">
            <p className="descriptor">Fokus Track</p>
            <h2 className="mt-2 text-2xl font-light text-foreground md:text-3xl">
              Dipecah per masalah utama
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
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
                  className="glass rounded-2xl p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform"
                >
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <span className="chip text-[10px] uppercase tracking-[0.14em] text-foreground/70">
                        {lens.badge}
                      </span>
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 border border-accent/20">
                        <Icon className="h-4.5 w-4.5 text-accent" strokeWidth={2.2} />
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{service.title}</h3>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-muted">{lens.summary}</p>
                    </div>

                    <div className="rounded-xl border border-foreground/10 bg-foreground/[0.03] p-3.5 text-[11px] leading-relaxed text-muted">
                      <p className="font-bold text-foreground/80 font-mono text-[10px] uppercase tracking-wider">
                        Kapan Butuh Ini:
                      </p>
                      <p className="mt-1 font-mono">{lens.fit}</p>
                    </div>

                    <ul className="grid gap-1.5 sm:grid-cols-2 pt-1">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-money" strokeWidth={2.5} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between border-t border-foreground/10 pt-4 mt-4">
                    <p className="text-[10px] font-mono text-muted">{lens.outcome}</p>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground hover:text-accent transition-colors"
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
        <div className="space-y-6 glass rounded-3xl p-6 md:p-10">
          <div className="max-w-2xl">
            <p className="descriptor">Alur Kerja</p>
            <h2 className="mt-2 text-2xl font-light text-foreground md:text-3xl">
              Output konkret di setiap tahap
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Proses kerja kami dirancang untuk mengeliminasi ketakutan akan proyek yang macet di tengah jalan. Setiap tahap memiliki output konkret yang bisa Anda evaluasi langsung.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {steps.map((step) => {
              const StepIcon = stepIconMap[step.icon] || Search;
              return (
                <div
                  key={step.id}
                  className="glass-soft rounded-2xl p-5 border border-foreground/10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold font-mono text-muted">TAHAP {step.step_number}</span>
                    <StepIcon className="h-4 w-4 text-accent" strokeWidth={2.2} />
                  </div>
                  <h3 className="mt-2 text-sm font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted">{step.description}</p>
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
            <p className="descriptor">Harga</p>
            <h2 className="mt-2 text-2xl font-light text-foreground md:text-3xl">
              Rentang yang realistis
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
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
                    'rounded-2xl flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 p-6',
                    isPopular
                      ? 'bg-gradient-to-br from-accent/10 to-splash/10 border border-accent/40 shadow-[0_20px_60px_rgba(93,81,255,0.12)]'
                      : 'glass border border-foreground/10'
                  )}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted">
                        {lens.badge}
                      </span>
                      {isPopular && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-white">
                          <Star className="h-3 w-3 fill-white" /> Terpopuler
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{pkg.name}</h3>
                      <p className="mt-1 text-[11px] leading-relaxed text-muted">{pkg.description}</p>
                    </div>

                    <div className="py-3 border-y border-foreground/10">
                      <p className="text-[10px] font-mono text-muted">Estimasi Rentang Biaya:</p>
                      <p className="text-xl font-light tracking-tight text-foreground font-mono">
                        {formatPrice(pkg.price_min, pkg.price_max)}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-semibold font-mono text-foreground/70 uppercase">Cakupan Pekerjaan:</p>
                      <ul className="space-y-1.5">
                        {pkg.features.map((feature, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-[11px] leading-relaxed text-muted">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-money" strokeWidth={2.5} />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-foreground/10 space-y-3">
                    <p className="text-[10px] font-mono text-muted leading-relaxed italic">{lens.fit}</p>
                    <Link
                      href="/contact"
                      className={clsx(
                        'w-full inline-flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-semibold transition-all',
                        isPopular ? 'btn-primary' : 'btn-secondary'
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
              <div key={point.title} className="glass-soft rounded-2xl p-5">
                <point.icon className="h-4.5 w-4.5 text-accent" strokeWidth={2.2} />
                <h4 className="mt-2 text-xs font-semibold text-foreground">{point.title}</h4>
                <p className="mt-1 text-[11px] leading-relaxed text-muted font-mono">{point.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* 5. PERTANYAAN UMUM (FAQ) */}
      <ScrollReveal>
        <div className="space-y-6 glass rounded-3xl p-6 md:p-10">
          <div className="max-w-2xl">
            <p className="descriptor">FAQ</p>
            <h2 className="mt-2 text-2xl font-light text-foreground md:text-3xl">
              Pertanyaan yang sering diajukan
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Kami hendaknya menjawab tentang bagaimana kerja sama pengerjaan sistem ini berjalan di lapangan.
            </p>
          </div>

          <div className="space-y-6">
            {categories.map((cat) => (
              <div key={cat} className="space-y-3">
                <h3 className="text-xs font-semibold text-foreground font-mono uppercase tracking-wider border-b border-foreground/10 pb-1.5">
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
        <div className="rounded-3xl bg-gradient-to-br from-accent/10 to-splash/10 border border-accent/30 p-6 md:p-10">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-2">
              <h2 className="text-2xl font-light text-foreground md:text-3xl">
                Siap Merapikan Operasional Bisnis Anda?
              </h2>
              <p className="text-sm leading-relaxed text-muted">
                Kami siap membantu memetakan bottleneck operasional Anda dan mendesain sistem digital kustom yang andal. Mulai dengan membuat brief proyek singkat.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <Link
                href="/contact"
                className="btn-primary px-6 py-3 text-sm"
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