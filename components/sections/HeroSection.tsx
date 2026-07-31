'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { GradientText } from '@/components/GradientText';
import { MagneticButton } from '@/components/MagneticButton';
import { FloatingParticles } from '@/components/FloatingParticles';
import { CursorSpotlight } from '@/components/CursorSpotlight';
import { ProjectMosaic } from '@/components/ProjectMosaic';

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.23, 1, 0.32, 1] as const },
  },
};

const serviceFits = [
  'Company profile dan landing page yang terasa lebih serius',
  'Dashboard internal, admin panel, dan workflow operasional',
  'Sistem custom untuk QC, POS, tracking, dan form lapangan',
  'Android companion untuk tim yang butuh akses mobile',
];

const proofItems = [
  { value: '7+', label: 'sistem production shipped' },
  { value: '250K+', label: 'records dan aktivitas terproses' },
  { value: '3', label: 'sektor utama: logistik, retail, operasional' },
  { value: '≤24 jam', label: 'respon awal untuk breakdown kebutuhan' },
];

export function HeroSection() {
  return (
    <motion.section variants={stagger} initial="hidden" animate="visible" className="relative">
      <CursorSpotlight
        overlayColor="#fff3c4"
        radius={260}
        backgroundContent={<ProjectMosaic />}
        className="rounded-[8px] border-2 border-foreground overflow-hidden"
      >
        <FloatingParticles count={18} />
        <div className="relative grid gap-8 p-8 text-foreground md:p-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:p-20">
          <div>
            <motion.div variants={fadeUp} className="mb-8">
              <span className="inline-flex items-center gap-2.5 rounded-full border-2 border-accent bg-accent/10 px-4 py-2 text-[11px] font-semibold tracking-wide text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-light animate-pulse" />
                FOUNDER-LED DIGITAL PRODUCT STUDIO
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tight md:text-5xl lg:text-[64px]"
            >
              Website dan sistem internal yang bikin bisnis lebih{' '}
              <GradientText>rapi, cepat, dan meyakinkan</GradientText>.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-2xl text-[15px] leading-[1.85] text-neutral-600 md:text-base"
            >
              nasaq.id membantu bisnis, vendor operasional, dan tim lapangan
              membangun company profile, dashboard internal, POS, QC, dan
              aplikasi Android yang benar-benar dipakai. Fokus kami bukan cuma
              UI yang enak dilihat, tapi surface yang jelas jualannya dan sistem
              yang mempermudah kerja tim.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-3">
              <MagneticButton
                as="a"
                href="/order"
                strength={0.2}
                className="btn-primary group inline-flex items-center gap-2.5 px-8 py-4 text-[13px] font-semibold"
              >
                Minta Estimasi Project
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                as="a"
                href="/projects"
                strength={0.2}
                className="btn-secondary group inline-flex items-center gap-2.5 px-8 py-4 text-[13px] font-semibold"
              >
                Lihat Case Study
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[11px] text-neutral-500"
            >
              {[
                'Respon awal maksimal 24 jam',
                'Scope dibedah dulu sebelum develop',
                'Bisa mulai dari company profile sampai sistem custom',
              ].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                  {item}
                </span>
              ))}
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="flex flex-col gap-4">
            <div className="rounded-[8px] neo-surface p-6">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
                Yang Paling Sering Dikerjakan
              </p>
              <div className="space-y-3">
                {serviceFits.map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                    <p className="text-[13px] leading-relaxed text-neutral-700">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {proofItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[8px] neo-surface p-4"
                >
                  <p className="text-xl font-extrabold text-foreground md:text-2xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </CursorSpotlight>
    </motion.section>
  );
}
