"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Apa Kata Klien</h2>
          <p className="text-[12px] text-neutral-500 mt-0.5">Feedback dari pengguna sistem kami</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-[#FAFAFA] border border-neutral-300 rounded-xl p-5 hover:shadow-sm transition-all relative"
          >
            <Quote className="w-5 h-5 text-[#0D9488]/20 absolute top-4 right-4" />
            <div className="flex items-center gap-0.5 mb-3">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-[12px] text-neutral-600 leading-relaxed mb-4">
              &ldquo;{t.content}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#0D9488]/10 flex items-center justify-center text-[11px] font-bold text-[#0D9488]">
                {t.name}
              </div>
              <div>
                <p className="text-[12px] font-semibold text-neutral-900">{t.name}</p>
                <p className="text-[10px] text-neutral-500">{t.role}</p>
              </div>
              {t.project && (
                <span className="ml-auto text-[9px] font-medium text-[#0D9488] bg-[#0D9488]/8 px-2 py-0.5 rounded-full">
                  {t.project}
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
