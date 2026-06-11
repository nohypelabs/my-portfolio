'use client';

import { motion } from 'framer-motion';
import { Search, Palette, Code, CheckCircle, Rocket, Headphones, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useEffect, useState } from 'react';
import type { ProcessStep } from '@/lib/supabase/types';

const iconMap: Record<string, React.ElementType> = {
  Search, Palette, Code, CheckCircle, Rocket, Headphones,
};

const fallbackSteps: ProcessStep[] = [
  { id: '1', step_number: 1, title: 'Discovery', description: 'Analisis kebutuhan bisnis Anda. Kita diskusi mendalam tentang masalah yang ingin diselesaikan, target user, dan ekspektasi hasil.', icon: 'Search', sort_order: 1, is_active: true, created_at: '', updated_at: '' },
  { id: '2', step_number: 2, title: 'Design', description: 'Wireframe dan UI/UX design. Anda review dan approve setiap screen sebelum development dimulai.', icon: 'Palette', sort_order: 2, is_active: true, created_at: '', updated_at: '' },
  { id: '3', step_number: 3, title: 'Development', description: 'Build sistem dengan clean code dan best practices. Progress update rutin setiap minggu.', icon: 'Code', sort_order: 3, is_active: true, created_at: '', updated_at: '' },
  { id: '4', step_number: 4, title: 'Testing', description: 'QA dan UAT menyeluruh. Semua fitur ditest sebelum launch untuk memastikan kualitas.', icon: 'CheckCircle', sort_order: 4, is_active: true, created_at: '', updated_at: '' },
  { id: '5', step_number: 5, title: 'Deploy', description: 'Launch ke production. Setup hosting, domain, SSL, dan monitoring. Sistem siap digunakan user.', icon: 'Rocket', sort_order: 5, is_active: true, created_at: '', updated_at: '' },
  { id: '6', step_number: 6, title: 'Support', description: 'Maintenance pasca-launch. Bug fix, update, dan optimasi berkelanjutan sesuai paket yang dipilih.', icon: 'Headphones', sort_order: 6, is_active: true, created_at: '', updated_at: '' },
];

export default function ProcessPage() {
  const [steps, setSteps] = useState<ProcessStep[]>(fallbackSteps);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/process')
      .then(r => r.json())
      .then(data => { if (data.length > 0) setSteps(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
        {/* Vertical line */}
        <div className="absolute left-[23px] top-0 bottom-0 w-[2px] bg-neutral-200 hidden md:block" />

        <div className="space-y-6">
          {steps.map((step, i) => {
            const Icon = iconMap[step.icon] || Search;
            return (
              <motion.div
                key={step.id}
                variants={fadeInUp}
                className="flex gap-5 relative"
              >
                {/* Step number circle */}
                <div className="w-12 h-12 rounded-full bg-white border-2 border-[#0D9488] flex items-center justify-center flex-shrink-0 z-10">
                  <Icon className="w-5 h-5 text-[#0D9488]" strokeWidth={1.5} />
                </div>

                {/* Content */}
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
