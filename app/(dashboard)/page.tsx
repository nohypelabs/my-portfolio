'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { ScrollReveal } from '@/components/ScrollReveal';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { ClientLogos } from '@/components/sections/ClientLogos';
import { TestimonialQuotes } from '@/components/sections/TestimonialQuotes';
import { FloatingChatWidget } from '@/components/FloatingChatWidget';
import { MagneticButton } from '@/components/MagneticButton';
import { TiltCard } from '@/components/TiltCard';

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

export default function DashboardPage() {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-16 pb-12">
      <HeroSection />

      <ScrollReveal>
        <ClientLogos />
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Sistem yang sudah kami bangun dan dipakai di lapangan.
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-8 text-neutral-600 md:text-[15px]">
                Bukan sekadar demo portofolio — semua project ini berjalan di
                operasional nyata, lengkap dengan stack dan konteks pengerjaannya.
              </p>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-accent hover:underline"
            >
              Semua case study <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          <FeaturedProjects />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="space-y-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Harga awal yang gampang dibaca, scope lanjutnya tetap fleksibel.
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-8 text-neutral-600 md:text-[15px]">
                Ini bukan harga final untuk semua kebutuhan, tapi baseline yang
                cukup membantu calon client paham titik masuknya.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-[12px] font-medium text-accent hover:underline"
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
                  className={`relative h-full overflow-hidden rounded-[8px] p-6 ${
                    pkg.popular
                      ? 'neo-pressed'
                      : 'neo-surface'
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute right-5 top-5 rounded-full bg-double border-2 border-foreground px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-foreground">
                      Paling dicari
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-foreground">
                    {pkg.name}
                  </h3>
                  <p className="mt-3 text-3xl font-extrabold text-accent">
                    {pkg.price}
                  </p>
                  <p className="mt-4 text-[13px] leading-7 text-neutral-600">
                    {pkg.desc}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold text-foreground hover:text-accent"
                  >
                    Bahas scope proyek
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
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
              <h2 className="text-2xl font-bold text-foreground md:text-3xl">
                Kata orang yang sistemnya sudah jalan.
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-8 text-neutral-600 md:text-[15px]">
                Feedback langsung dari tim yang sehari-hari pakai sistem buatan kami.
              </p>
            </div>
          </div>

          <TestimonialQuotes />
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <motion.section
          variants={fadeInUp}
          className="relative overflow-hidden rounded-[8px] border-2 border-foreground bg-accent-bg shadow-[6px_6px_0px_#141414]"
        >
          <div className="relative p-8 text-center md:p-12">
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Kalau kebutuhan Anda sudah kebayang, mari kita ubah jadi{' '}
              <span className="inline-block bg-double px-2 py-0.5 box-decoration-clone rounded-[3px]">
                scope yang enak dieksekusi
              </span>.
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-neutral-600 md:text-[15px]">
              Brief awal gratis. Anda bisa mulai dari company profile, landing
              page, atau langsung ke dashboard dan sistem custom kalau memang
              problem bisnisnya sudah jelas.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <MagneticButton
                as="a"
                href="/contact"
                strength={0.15}
                className="btn-primary group inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold"
              >
                Kirim Brief Proyek
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/contact"
                strength={0.15}
                className="neo-button inline-flex items-center justify-center gap-2 rounded-[8px] px-8 py-4 font-semibold text-foreground"
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
