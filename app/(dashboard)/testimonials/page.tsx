'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useEffect, useState } from 'react';
import type { Testimonial } from '@/lib/supabase/types';

const fallbackTestimonials: Testimonial[] = [
  { id: '1', name: 'Manager Operasional', position: 'Logistics Manager', company: 'J&T Express', content: 'Sistem audit selisih berat yang dibangun sangat membantu operasional kami. Data real-time dan report otomatis menghemat waktu tim.', rating: 5, avatar_url: null, is_featured: true, sort_order: 1, is_active: true, created_at: '', updated_at: '' },
  { id: '2', name: 'Owner', position: 'Founder', company: 'LakuPOS', content: 'POS dan inventory system yang dibuat sangat user-friendly. Karyawan kami bisa langsung pakai tanpa training lama.', rating: 5, avatar_url: null, is_featured: true, sort_order: 2, is_active: true, created_at: '', updated_at: '' },
  { id: '3', name: 'IT Manager', position: 'Head of IT', company: 'WC Check', content: 'Aplikasi monitoring kebersihan yang reliable. Deploy ke 50+ lokasi tanpa masalah. Maintenance juga responsif.', rating: 5, avatar_url: null, is_featured: true, sort_order: 3, is_active: true, created_at: '', updated_at: '' },
  { id: '4', name: 'Project Manager', position: 'PM', company: 'Qohira', content: 'E-commerce platform yang dibangun handle ribuan transaksi dengan lancar. Tim sangat profesional dan komunikatif.', rating: 5, avatar_url: null, is_featured: false, sort_order: 4, is_active: true, created_at: '', updated_at: '' },
];

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/testimonials')
      .then(r => r.json())
      .then(data => { if (data.length > 0) setTestimonials(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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
