'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Coins, FileText, ShieldCheck, Sparkles, Star } from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/lib/context/LanguageContext';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { PricingPackage } from '@/lib/supabase/types';

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

function getPackageLens(pkg: PricingPackage, isEn: boolean) {
  const key = pkg.slug.toLowerCase();

  if (key.includes('starter')) {
    return {
      badge: isEn ? 'Fast first step' : 'Langkah awal cepat',
      fit: isEn
        ? 'Best when the business needs a cleaner online surface without a large system scope yet.'
        : 'Paling cocok saat bisnis butuh surface online yang lebih rapi tanpa scope sistem yang besar dulu.',
      note: isEn
        ? 'Good for landing pages, early company profiles, and simple lead-capture setups.'
        : 'Cocok untuk landing page, company profile awal, dan setup lead capture yang sederhana.',
    };
  }

  if (key.includes('basic')) {
    return {
      badge: isEn ? 'Trust upgrade' : 'Upgrade trust',
      fit: isEn
        ? 'Best when the business already looks active, but still needs a more serious profile and a clearer structure.'
        : 'Paling cocok saat bisnis sudah berjalan, tapi masih butuh profile yang lebih serius dan struktur yang lebih jelas.',
      note: isEn
        ? 'Good for brands that want to look more established before moving into heavier custom builds.'
        : 'Cocok untuk brand yang ingin terlihat lebih matang sebelum masuk ke build custom yang lebih berat.',
    };
  }

  if (key.includes('standard')) {
    return {
      badge: isEn ? 'Operations-ready' : 'Siap operasional',
      fit: isEn
        ? 'Best when the business needs a real working system, not just a marketing surface.'
        : 'Paling cocok saat bisnis butuh sistem yang benar-benar bekerja, bukan sekadar surface marketing.',
      note: isEn
        ? 'This is usually the package for internal workflows, dashboards, and practical admin systems.'
        : 'Ini biasanya paket untuk workflow internal, dashboard, dan sistem admin yang benar-benar dipakai.',
    };
  }

  if (key.includes('premium')) {
    return {
      badge: isEn ? 'Broader build scope' : 'Scope build lebih luas',
      fit: isEn
        ? 'Best when multiple surfaces need to work together, such as web, admin, and mobile.'
        : 'Paling cocok saat beberapa surface perlu bekerja bersama, seperti web, admin, dan mobile.',
      note: isEn
        ? 'A better fit for businesses that already know the system is central to operations or service delivery.'
        : 'Lebih cocok untuk bisnis yang sudah tahu bahwa sistemnya memang jadi bagian inti operasional atau delivery.',
    };
  }

  return {
    badge: isEn ? 'Scope-first estimate' : 'Estimasi berbasis scope',
    fit: isEn
      ? 'Best when the requirement is still unique, still moving, or cannot be squeezed into a generic package safely.'
      : 'Paling cocok saat kebutuhannya masih unik, masih bergerak, atau tidak aman dipaksa masuk ke paket generik.',
    note: isEn
      ? 'Use this route if the business problem matters more than fitting a preset package.'
      : 'Pakai jalur ini kalau problem bisnisnya lebih penting daripada memaksa masuk ke paket yang sudah preset.',
  };
}

export function PricingContent({ packages }: { packages: PricingPackage[] }) {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const guidePoints = isEn
    ? [
        {
          icon: FileText,
          title: 'Discovery affects final quote',
          desc: 'These numbers are guide ranges. Final scope follows the brief and problem teardown.',
        },
        {
          icon: Coins,
          title: 'Staged payment is preferred',
          desc: 'The usual model is split payment so both sides move with clearer expectations.',
        },
        {
          icon: ShieldCheck,
          title: 'Not a commodity list',
          desc: 'The right package depends on whether the goal is trust, workflow cleanup, or a wider system build.',
        },
      ]
    : [
        {
          icon: FileText,
          title: 'Discovery mempengaruhi quote final',
          desc: 'Angka ini adalah range panduan. Scope final mengikuti brief dan hasil bedah problem.',
        },
        {
          icon: Coins,
          title: 'Pembayaran bertahap lebih disukai',
          desc: 'Model yang biasa dipakai adalah pembayaran bertahap supaya ekspektasi dua sisi lebih jelas.',
        },
        {
          icon: ShieldCheck,
          title: 'Bukan daftar harga komoditas',
          desc: 'Paket yang tepat tergantung apakah targetnya trust, perapihan workflow, atau build sistem yang lebih luas.',
        },
      ];

  const notes = isEn
    ? [
        'The first conversation is for clarity, not pressure.',
        'Scope changes outside the agreed direction can affect cost and timeline.',
        'Packages are useful as starting frames, not as rigid boxes.',
        'If the requirement is unusual, the Custom route is the safer path.',
      ]
    : [
        'Percakapan pertama tujuannya kejelasan, bukan tekanan untuk langsung deal.',
        'Perubahan scope di luar arah yang sudah disepakati bisa memengaruhi biaya dan timeline.',
        'Paket berguna sebagai frame awal, bukan kotak yang kaku.',
        'Kalau kebutuhannya tidak biasa, jalur Custom biasanya lebih aman.',
      ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="mx-auto max-w-5xl space-y-10 pb-12"
    >
      <motion.div {...fadeUp} className="rounded-[35px] neo-surface p-6 md:p-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c4956a]/20 bg-[#f7f3e8] px-3 py-1 text-xs font-semibold text-[#a67d55]">
            <Sparkles className="h-3.5 w-3.5" />
            {isEn ? 'Pricing guide' : 'Panduan harga'}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
            {isEn
              ? 'Pricing ranges that help clients choose the right starting scope, not guess blindly.'
              : 'Range harga yang membantu client memilih titik mulai yang tepat, bukan menebak-nebak secara buta.'}
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            {isEn
              ? 'This page exists to make early conversations easier. The numbers are here to set expectations, but the real job is still to match the package with the business problem and the operational complexity behind it.'
              : 'Halaman ini ada untuk mempermudah percakapan awal. Angkanya dipasang untuk memberi ekspektasi, tapi pekerjaan utamanya tetap mencocokkan paket dengan problem bisnis dan kompleksitas operasional di belakangnya.'}
          </p>
        </div>
      </motion.div>

      <ScrollReveal>
        <div className="grid gap-4 md:grid-cols-3">
          {guidePoints.map((item) => (
            <div key={item.title} className="rounded-[28px] neo-surface p-5">
              <item.icon className="h-4 w-4 text-[#c4956a]" />
              <h2 className="mt-3 text-sm font-bold text-neutral-900">{item.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="space-y-5 rounded-[35px] neo-surface p-6 md:p-8">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-neutral-900 md:text-2xl">
              {isEn ? 'Choose the package by the real level of complexity' : 'Pilih paket dari level kompleksitas yang sebenarnya'}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {isEn
                ? 'A cheaper package is not always more efficient if the scope clearly needs more structure. Likewise, a larger package is not automatically better if the first need is simply a cleaner, more trusted public surface.'
                : 'Paket yang lebih murah tidak selalu lebih efisien kalau scope-nya jelas butuh struktur yang lebih besar. Sebaliknya, paket yang lebih besar juga tidak otomatis lebih tepat kalau kebutuhan pertamanya hanya surface publik yang lebih rapi dan lebih dipercaya.'}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {packages.map((pkg) => {
              const lens = getPackageLens(pkg, isEn);
              const primaryHref = pkg.cta_link ?? `/order?package=${pkg.slug}`;

              return (
                <motion.div
                  key={pkg.id}
                  variants={fadeInUp}
                  className={`relative rounded-[30px] p-5 transition-transform duration-200 hover:-translate-y-1 ${
                    pkg.is_popular
                      ? 'neo-pressed border border-[#c4956a]/20'
                      : 'neo-surface'
                  }`}
                >
                  {pkg.is_popular && (
                    <div className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-[#c4956a] px-3 py-1 text-[11px] font-semibold text-white">
                      <Star className="h-3 w-3" fill="currentColor" />
                      {isEn ? 'Most chosen' : 'Paling sering dipilih'}
                    </div>
                  )}

                  <div className="max-w-[85%]">
                    <div className="inline-flex rounded-full border border-[#c4956a]/20 bg-[#f7f3e8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a67d55]">
                      {lens.badge}
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-neutral-900">{pkg.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{pkg.description ?? lens.note}</p>
                  </div>

                  <div className="mt-5 grid gap-3 rounded-[24px] bg-[#f0f0f0] p-4 sm:grid-cols-[1fr_1fr] sm:items-end">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {isEn ? 'Range' : 'Range'}
                      </p>
                      <div className="mt-2 text-2xl font-extrabold text-[#a67d55]">{formatPrice(pkg.price_min, pkg.price_max)}</div>
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {isEn ? 'Best fit' : 'Paling cocok'}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-700">{lens.fit}</p>
                    </div>
                  </div>

                  <ul className="mt-5 space-y-2">
                    {pkg.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-[13px] leading-relaxed text-neutral-700">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#c4956a]" strokeWidth={1.6} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 text-xs leading-relaxed text-neutral-500">{lens.note}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <Link
                      href={primaryHref}
                      className={`inline-flex items-center justify-center gap-2 rounded-[22px] px-4 py-3 text-sm font-semibold transition-colors ${
                        pkg.is_popular
                          ? 'bg-[#c4956a] text-white hover:bg-[#a67d55]'
                          : 'neo-button text-neutral-900'
                      }`}
                    >
                      {pkg.cta_text}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Link
                      href="/contact"
                      className="neo-button inline-flex items-center justify-center gap-2 rounded-[22px] px-4 py-3 text-sm font-semibold text-neutral-700"
                    >
                      {isEn ? 'Ask first' : 'Tanya dulu'}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="rounded-[35px] neo-surface p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-neutral-900">
                {isEn ? 'Important before you compare numbers only' : 'Hal penting sebelum membandingkan angka saja'}
              </h2>
              <div className="grid gap-2">
                {notes.map((note) => (
                  <div key={note} className="flex items-start gap-2 text-sm leading-relaxed text-neutral-600">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c4956a]" strokeWidth={1.6} />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/process"
                className="neo-button inline-flex items-center justify-center gap-2 rounded-[22px] px-4 py-3 text-sm font-semibold text-neutral-900"
              >
                {isEn ? 'See the work model' : 'Lihat model kerja'}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/order?package=custom"
                className="inline-flex items-center justify-center gap-2 rounded-[22px] bg-[#c4956a] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a67d55]"
              >
                {isEn ? 'Start custom brief' : 'Mulai brief custom'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </motion.div>
  );
}
