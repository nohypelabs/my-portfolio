'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, TrendingUp, Clock, Users, Database } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { TiltCard } from '@/components/TiltCard';

const caseStudies = [
  {
    id: 'selisih-berat',
    title: 'Serat QC — J&T Express',
    tag: 'Logistics QC',
    image: '/projects/selisih-thumb.jpg',
    problem: 'Verifikasi selisih berat manual, 4-5 jam per 500 resi',
    solution: 'Barcode scan + GPS watermark + auto upload cloud',
    metrics: [
      { label: 'Waktu proses', before: '4-5 jam', after: '<30 menit', icon: Clock },
      { label: 'Total resi', before: 'Manual', after: '80K+ terproses', icon: Database },
      { label: 'Foto dokumentasi', before: 'Rename manual', after: '160K+ auto', icon: TrendingUp },
    ],
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'wc-check',
    title: 'WC Check — Proservice',
    tag: 'Inspection System',
    image: '/projects/wccheck-thumb.jpg',
    problem: 'Inspeksi toilet pakai form kertas, data hilang/rusak',
    solution: 'QR code scan + checklist + photo + real-time dashboard',
    metrics: [
      { label: 'Inspeksi/hari', before: '5-10', after: '20-30', icon: TrendingUp },
      { label: 'Users aktif', before: '0', after: '53 users', icon: Users },
      { label: 'Data historis', before: 'Tidak ada', after: '3.293 inspeksi', icon: Database },
    ],
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'lakupos',
    title: 'LakuPOS — Retail Client',
    tag: 'POS System',
    image: '/projects/lakupos-thumb.jpg',
    problem: 'Kasir manual, stok antar outlet tidak sync, pembayaran QRIS manual',
    solution: 'POS tablet-optimized + barcode scanner + QRIS auto + multi-outlet sync',
    metrics: [
      { label: 'Checkout', before: 'Manual hitung', after: 'Scan barcode', icon: Clock },
      { label: 'Stok antar outlet', before: 'Excel terpisah', after: 'Real-time sync', icon: Database },
      { label: 'Pembayaran', before: 'Cek rekening', after: 'QRIS auto', icon: TrendingUp },
    ],
    color: 'from-purple-500 to-violet-600',
  },
];

export function CaseStudyCards() {
  return (
    <section className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-neutral-900">Case Study</h2>
          <p className="text-[12px] text-neutral-500 mt-1">Before & after dari project nyata</p>
        </div>
        <Link href="/projects" className="text-[12px] text-[#c4956a] hover:underline flex items-center gap-1">
          Semua Project <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {caseStudies.map((study, i) => (
          <TiltCard key={study.id}>
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-[#FAFAFA] border border-neutral-300 rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#c4956a]/30 transition-all group"
            >
              {/* Image header */}
              <div className="relative h-36 overflow-hidden">
                <Image
                  src={study.image}
                  alt={study.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-[9px] font-semibold text-white bg-gradient-to-r ${study.color} mb-1.5`}>
                    {study.tag}
                  </span>
                  <h3 className="text-[13px] font-bold text-white leading-tight">{study.title}</h3>
                </div>
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/projects/${study.id}`} className="w-7 h-7 rounded-full bg-white/90 flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-900" />
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-3">
                {/* Problem → Solution */}
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0">SEBELUM</span>
                    <p className="text-[11px] text-neutral-500 leading-relaxed">{study.problem}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded mt-0.5 flex-shrink-0">SETELAH</span>
                    <p className="text-[11px] text-neutral-600 leading-relaxed">{study.solution}</p>
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-1.5 pt-1 border-t border-neutral-200">
                  {study.metrics.map((m, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <m.icon className="w-3 h-3 text-[#c4956a] flex-shrink-0" />
                      <span className="text-[10px] text-neutral-400 w-20 flex-shrink-0">{m.label}</span>
                      <span className="text-[10px] text-neutral-400 line-through">{m.before}</span>
                      <span className="text-[10px] text-neutral-400">→</span>
                      <span className="text-[10px] font-semibold text-[#c4956a]">{m.after}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
