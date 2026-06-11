'use client';

import { motion } from 'framer-motion';
import { Globe, Smartphone, Server, Wrench, MessageCircle, ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { Service } from '@/lib/supabase/types';

const iconMap: Record<string, React.ElementType> = {
  Globe, Smartphone, Server, Wrench, MessageCircle, Code: Globe,
};

export function ServicesContent({ services }: { services: Service[] }) {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-10">
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-[22px] font-semibold text-neutral-900 mb-2">Layanan Kami</h1>
        <p className="text-[14px] text-neutral-500 max-w-2xl">
          Solusi teknologi end-to-end untuk bisnis Anda. Dari ide hingga deploy ke production.
        </p>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {services.map((service) => {
          const Icon = iconMap[service.icon] || Globe;
          return (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              className="bg-white border border-neutral-200 rounded-xl p-6 hover:border-[#0D9488]/30 hover:shadow-sm transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-lg bg-[#0D9488]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0D9488]/20 transition-colors">
                  <Icon className="w-5 h-5 text-[#0D9488]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[15px] font-semibold text-neutral-900 mb-1">{service.title}</h3>
                  <p className="text-[13px] text-neutral-500 leading-relaxed mb-4">{service.description}</p>
                  <ul className="space-y-1.5">
                    {service.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-[12px] text-neutral-600">
                        <CheckCircle className="w-3.5 h-3.5 text-[#0D9488] flex-shrink-0" strokeWidth={1.5} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* CTA */}
      <motion.div variants={fadeInUp} className="bg-[#0D9488]/5 border border-[#0D9488]/20 rounded-xl p-8 text-center">
        <h2 className="text-[18px] font-semibold text-neutral-900 mb-2">Butuh Solusi Custom?</h2>
        <p className="text-[13px] text-neutral-500 mb-5 max-w-lg mx-auto">
          Konsultasikan kebutuhan project Anda secara gratis. Kami bantu analisis dan rekomendasi teknologi terbaik.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D9488] text-white rounded-lg text-[13px] font-medium hover:bg-[#0F766E] transition-colors"
        >
          Konsultasi Gratis <ArrowRight className="w-4 h-4" />
        </Link>
      </motion.div>
    </motion.div>
  );
}
