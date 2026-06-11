'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { Testimonial } from '@/lib/supabase/types';

export function TestimonialsContent({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-10">
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-[22px] font-semibold text-neutral-900 mb-2">Testimoni Klien</h1>
        <p className="text-[14px] text-neutral-500 max-w-2xl">
          Apa kata mereka tentang sistem yang kami bangun.
        </p>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {testimonials.map((t) => (
          <motion.div
            key={t.id}
            variants={fadeInUp}
            className="bg-white border border-neutral-200 rounded-xl p-6 hover:border-[#0D9488]/30 hover:shadow-sm transition-all"
          >
            <div className="flex items-start gap-3 mb-4">
              <Quote className="w-8 h-8 text-[#0D9488]/20 flex-shrink-0" strokeWidth={1} />
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>

            <p className="text-[13px] text-neutral-600 leading-relaxed mb-5 italic">
              &ldquo;{t.content}&rdquo;
            </p>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0D9488]/10 flex items-center justify-center text-[13px] font-semibold text-[#0D9488]">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-[13px] font-medium text-neutral-900">{t.name}</p>
                <p className="text-[11px] text-neutral-500">{t.position} — {t.company}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
