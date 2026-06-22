'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code,
  Globe,
  Headphones,
  Palette,
  Rocket,
  Search,
  Server,
  Smartphone,
  Wrench,
} from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { ScrollReveal } from '@/components/ScrollReveal';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { ClientLogos } from '@/components/sections/ClientLogos';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CaseStudyCards } from '@/components/sections/CaseStudyCards';
import { FloatingChatWidget } from '@/components/FloatingChatWidget';
import { MagneticButton } from '@/components/MagneticButton';
import { GradientText } from '@/components/GradientText';
import { TiltCard } from '@/components/TiltCard';

const proofPoints = [
  {
    value: '7+',
    label: 'sistem production shipped',
    detail: 'dari company profile sampai dashboard operasional',
  },
  {
    value: '250K+',
    label: 'records dan aktivitas terproses',
    detail: 'QC, inspeksi, transaksi, dan workflow lapangan',
  },
  {
    value: '3 sektor',
    label: 'logistik, retail, dan internal ops',
    detail: 'solusi dibentuk dari konteks bisnis, bukan template generik',
  },
  {
    value: '<=24 jam',
    label: 'respon awal dan breakdown kebutuhan',
    detail: 'biar brief cepat berubah jadi scope yang jelas',
  },
];

const solutionTracks = [
  {
    icon: Globe,
    title: 'Company Profile & Website',
    desc: 'Untuk bisnis yang butuh surface lebih serius, CTA lebih jelas, dan presentasi brand yang lebih rapi di mata calon client.',
    items: [
      'Landing page dan company profile multi-halaman',
      'Copy hierarchy yang lebih meyakinkan',
      'SEO, mobile-friendly, dan siap diarahkan ke order',
    ],
  },
  {
    icon: Server,
    title: 'Dashboard & Sistem Operasional',
    desc: 'Untuk tim yang capek kerja di Excel, chat, atau form manual dan butuh dashboard yang mempermudah kontrol harian.',
    items: [
      'Admin panel, role, dan workflow internal',
      'QC, POS, inspection, tracking, dan reporting',
      'Database, API, dan handoff operasional yang jelas',
    ],
  },
  {
    icon: Smartphone,
    title: 'Web App & Android Companion',
    desc: 'Untuk use case yang butuh login, notifikasi, data real-time, atau tim lapangan yang harus tetap bisa kerja dari mobile.',
    items: [
      'Web app custom dengan backend production-grade',
      'Android companion untuk field team',
      'Build bertahap dari MVP sampai scale-up',
    ],
  },
];

const pricingPreview = [
  {
    name: 'Starter',
    price: '500rb+',
    desc: 'Landing page, simple profile, atau halaman campaign yang butuh cepat tayang.',
  },
  {
    name: 'Basic',
    price: '1.5jt+',
    desc: 'Company profile multi-halaman, CTA jelas, dan fondasi yang lebih siap dipakai closing.',
    popular: true,
  },
  {
    name: 'Custom System',
    price: '3jt+',
    desc: 'Dashboard internal, workflow operasional, atau web app yang butuh logic dan database.',
  },
];

const decisionReasons = [
  {
    icon: Search,
    title: 'Ngerti problem operasional, bukan cuma layout',
    desc: 'Banyak project kami lahir dari alur kerja yang berantakan di lapangan. Jadi output-nya bukan sekadar cantik, tapi lebih gampang dipakai tim.',
  },
  {
    icon: Rocket,
    title: 'Scope realistis dan bisa tumbuh bertahap',
    desc: 'Kalau belum perlu sistem besar, kami mulai dari surface yang paling berdampak dulu. Landing page sekarang, dashboard menyusul saat bisnis siap.',
  },
  {
    icon: Wrench,
    title: 'End-to-end ownership sampai launch',
    desc: 'UI, backend, database, deploy, dan maintenance awal tidak dilempar-lempar. Satu jalur, lebih mudah dieksekusi dan dikontrol.',
  },
];

const processSteps = [
  {
    icon: Search,
    label: 'Bedah Kebutuhan',
    duration: '1-2 hari',
    desc: 'Kami pecah dulu tujuan bisnis, pain point, dan CTA utama sebelum ngomong desain.',
  },
  {
    icon: Palette,
    label: 'Flow & Visual Direction',
    duration: '2-4 hari',
    desc: 'Struktur halaman, hirarki copy, dan arah visual dibikin jelas biar eksekusi tidak muter.',
  },
  {
    icon: Code,
    label: 'Build & Integration',
    duration: '1-6 minggu',
    desc: 'Mulai dari surface yang paling penting, lanjut ke backend, form, dashboard, atau integrasi jika dibutuhkan.',
  },
  {
    icon: Headphones,
    label: 'Launch & Support',
    duration: 'ongoing',
    desc: 'Setelah live, kami bantu rapikan feedback, monitoring, dan improvement yang memang relevan.',
  },
];

export default function DashboardPage() {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-16 pb-12">
      <HeroSection />

      <ScrollReveal>
        <section className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <motion.div
            variants={fadeInUp}
            className="rounded-[32px] card-elevated bg-[#FAFAFA] p-7 md:p-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#c4956a]/20 bg-[#c4956a]/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#c4956a]">
              Kenapa Client Order
            </span>
            <h2 className="mt-5 max-w-2xl text-2xl font-bold leading-tight text-neutral-900 md:text-3xl">
              Website cantik itu bonus. Yang sebenarnya dicari client adalah
              <span className="text-[#c4956a]"> bisnis yang terlihat lebih siap</span>{' '}
              dan workflow yang terasa lebih rapi.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-8 text-neutral-600 md:text-[15px]">
              Karena itu, homepage ini kami arahkan bukan sekadar seperti
              portfolio developer, tapi seperti studio yang bisa diajak
              berpikir, ngasih scope yang realistis, lalu mengeksekusinya sampai
              live.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            {proofPoints.map((item, index) => (
              <motion.div
                key={item.label}
                variants={fadeInUp}
                transition={{ delay: index * 0.06 }}
                className="rounded-2xl card-elevated bg-[#FAFAFA] p-4 md:p-5"
              >
                <p className="text-xl font-extrabold text-neutral-900 md:text-2xl">
                  {item.value}
                </p>
                <p className="mt-1 text-[11px] font-semibold text-neutral-700">
                  {item.label}
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-neutral-500">
                  {item.detail}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <ClientLogos />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
                Surface yang dijual rapi, sistem di belakangnya juga ikut kuat.
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-8 text-neutral-600 md:text-[15px]">
                Ini tiga jalur kerja yang paling sering diminta client ke
                nasaq.id. Kalau project Anda belum butuh semuanya, kami bisa
                mulai dari yang paling berdampak dulu.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[#c4956a] hover:underline"
            >
              Lihat detail layanan <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {solutionTracks.map((track, index) => (
              <TiltCard key={track.title}>
                <motion.div
                  variants={fadeInUp}
                  transition={{ delay: index * 0.08 }}
                  className="h-full rounded-[28px] card-elevated bg-[#FAFAFA] p-6 transition-all hover:shadow-lg"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c4956a]/10">
                    <track.icon className="h-5 w-5 text-[#c4956a]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {track.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-7 text-neutral-600">
                    {track.desc}
                  </p>
                  <div className="mt-5 space-y-3">
                    {track.items.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c4956a]" />
                        <p className="text-[12px] leading-6 text-neutral-700">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <CaseStudyCards />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-6">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
              Kenapa surface ini lebih kuat untuk closing dibanding portfolio
              biasa.
            </h2>
            <p className="mt-2 text-sm leading-8 text-neutral-600 md:text-[15px]">
              Yang kami kejar bukan sekadar impresi “wah”. Yang kami kejar
              adalah trust yang cukup kuat untuk bikin calon client lanjut tanya
              scope dan harga.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {decisionReasons.map((item, index) => (
              <TiltCard key={item.title}>
                <motion.div
                  variants={fadeInUp}
                  transition={{ delay: index * 0.08 }}
                  className="h-full rounded-[28px] card-elevated bg-[#FAFAFA] p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c4956a]/10">
                    <item.icon className="h-5 w-5 text-[#c4956a]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-base font-semibold text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-7 text-neutral-600">
                    {item.desc}
                  </p>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
                Cara kami bekerja supaya project tidak muter di revisi yang
                tidak perlu.
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-8 text-neutral-600 md:text-[15px]">
                Kami sengaja bedah problem dan scope lebih dulu, baru masuk ke
                visual dan build. Ini yang bikin delivery lebih cepat dan
                ekspektasi lebih sinkron.
              </p>
            </div>
            <Link
              href="/process"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[#c4956a] hover:underline"
            >
              Lihat proses lengkap <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.label}
                variants={fadeInUp}
                transition={{ delay: index * 0.07 }}
                className="rounded-[28px] card-elevated bg-[#FAFAFA] p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#c4956a]/10">
                    <step.icon className="h-5 w-5 text-[#c4956a]" strokeWidth={1.5} />
                  </div>
                  <span className="rounded-full border border-neutral-300 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    0{index + 1}
                  </span>
                </div>
                <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#c4956a]">
                  {step.duration}
                </p>
                <h3 className="mt-2 text-base font-semibold text-neutral-900">
                  {step.label}
                </h3>
                <p className="mt-3 text-[13px] leading-7 text-neutral-600">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
                Harga awal yang gampang dibaca, scope lanjutnya tetap fleksibel.
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-8 text-neutral-600 md:text-[15px]">
                Ini bukan harga final untuk semua kebutuhan, tapi baseline yang
                cukup membantu calon client paham titik masuknya.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[#c4956a] hover:underline"
            >
              Lihat semua paket <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {pricingPreview.map((pkg, index) => (
              <TiltCard key={pkg.name}>
                <motion.div
                  variants={fadeInUp}
                  transition={{ delay: index * 0.08 }}
                  className={`relative h-full overflow-hidden rounded-[28px] p-6 ${
                    pkg.popular
                      ? 'border border-[#c4956a] bg-[#FAFAFA] shadow-lg ring-1 ring-[#c4956a]/20'
                      : 'card-elevated bg-[#FAFAFA]'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute right-5 top-5 rounded-full bg-[#c4956a] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
                      Paling dicari
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-neutral-900">
                    {pkg.name}
                  </h3>
                  <p className="mt-3 text-3xl font-extrabold text-[#c4956a]">
                    {pkg.price}
                  </p>
                  <p className="mt-4 text-[13px] leading-7 text-neutral-600">
                    {pkg.desc}
                  </p>
                  <Link
                    href="/order"
                    className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold text-neutral-900 hover:text-[#c4956a]"
                  >
                    Bahas scope project
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <TestimonialsSection />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
                Butuh bukti teknis yang lebih detail?
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-8 text-neutral-600 md:text-[15px]">
                Di bawah ini tetap kami tampilkan portofolio engineering-nya,
                supaya calon client yang teknis atau tim internal mereka bisa
                cek stack, hasil build, dan konteks project dengan lebih dalam.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-[#c4956a] hover:underline"
            >
              Semua case study <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <FeaturedProjects />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <motion.section
          variants={fadeInUp}
          className="relative overflow-hidden rounded-[35px] border border-neutral-400 bg-[#FAFAFA]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(196,149,106,0.18),_transparent_52%)]" />
          <div className="relative p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold text-neutral-900 md:text-3xl">
              Kalau kebutuhan Anda sudah kebayang, mari kita ubah jadi{' '}
              <GradientText>scope yang enak dieksekusi</GradientText>.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-neutral-600 md:text-[15px]">
              Brief awal gratis. Anda bisa mulai dari company profile, landing
              page, atau langsung ke dashboard dan sistem custom kalau memang
              problem bisnisnya sudah jelas.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <MagneticButton
                as="a"
                href="/order"
                strength={0.15}
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#c4956a] px-8 py-4 font-semibold text-white shadow-lg shadow-[#c4956a]/20 transition-colors hover:bg-[#a67d55]"
              >
                Kirim Brief Project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/contact"
                strength={0.15}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-400 bg-[#f7f3e8] px-8 py-4 font-semibold text-neutral-900 transition-all hover:bg-[#FAFAFA]"
              >
                Konsultasi Dulu
              </MagneticButton>
            </div>
          </div>
        </motion.section>
      </ScrollReveal>

      <FloatingChatWidget />
    </motion.div>
  );
}
