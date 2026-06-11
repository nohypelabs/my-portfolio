'use client';

import { motion } from 'framer-motion';
import { Search, Palette, Code, CheckCircle, Rocket, Headphones, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { ProcessStep } from '@/lib/supabase/types';

const iconMap: Record<string, React.ElementType> = {
  Search, Palette, Code, CheckCircle, Rocket, Headphones,
};

export function ProcessContent({ steps }: { steps: ProcessStep[] }) {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-10">
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-[22px] font-semibold text-neutral-900 mb-2">Cara Kami Bekerja</h1>
        <p className="text-[14px] text-neutral-500 max-w-2xl">
          Proses yang terstruktur dan transparan. Anda tau persis di setiap tahap apa yang sedang dikerjakan.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-neutral-200 hidden md:block" />

        <div className="space-y-6">
          {steps.map((step) => {
            const Icon = iconMap[step.icon] || Search;
            return (
              <motion.div
                key={step.id}
                variants={fadeInUp}
                className="flex gap-5 relative"
              >
                <div className="w-12 h-12 rounded-full bg-white border-2 border-[#0D9488] flex items-center justify-center flex-shrink-0 z-10">
                  <Icon className="w-5 h-5 text-[#0D9488]" strokeWidth={1.5} />
                </div>

                <div className="flex-1 bg-white border border-neutral-200 rounded-xl p-5 hover:border-[#0D9488]/30 hover:shadow-sm transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[11px] font-medium text-[#0D9488] bg-[#0D9488]/10 px-2 py-0.5 rounded-full">
                      Step {step.step_number}
                    </span>
                    <h3 className="text-[15px] font-semibold text-neutral-900">{step.title}</h3>
                  </div>
                  <p className="text-[13px] text-neutral-500 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <motion.div variants={fadeInUp} className="bg-[#0D9488]/5 border border-[#0D9488]/20 rounded-xl p-8 text-center">
        <h2 className="text-[18px] font-semibold text-neutral-900 mb-2">Siap Memulai Project?</h2>
        <p className="text-[13px] text-neutral-500 mb-5 max-w-lg mx-auto">
          Mulai dari tahap discovery. Konsultasi gratis, tanpa komitmen.
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D9488] text-white rounded-lg text-[13px] font-medium hover:bg-[#0F766E] transition-colors"
        >
          Lihat Harga <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
