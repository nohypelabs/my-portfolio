'use client';

import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useEffect, useState } from 'react';
import type { PricingPackage } from '@/lib/supabase/types';

const fallbackPackages: PricingPackage[] = [
  {
    id: '1', name: 'Basic', slug: 'basic', description: 'Untuk kebutuhan sederhana dan landing page profesional',
    price_min: 5000000, price_max: 15000000, price_unit: 'IDR',
    features: ['Landing Page / Website Company Profile', 'Responsive Design', 'Basic SEO', 'Contact Form', '1x Revisi Desain', 'Deploy ke Hosting'],
    is_popular: false, cta_text: 'Pilih Basic', cta_link: null, sort_order: 1, is_active: true, created_at: '', updated_at: '',
  },
  {
    id: '2', name: 'Standard', slug: 'standard', description: 'Untuk bisnis yang butuh sistem manajemen lengkap',
    price_min: 15000000, price_max: 40000000, price_unit: 'IDR',
    features: ['Web App + Admin Dashboard', 'Database & API', 'Authentication (Login/Register)', 'CRUD Operations', 'Responsive & Mobile-friendly', '3x Revisi Desain', 'Deploy + Domain Setup', '1 Bulan Maintenance'],
    is_popular: true, cta_text: 'Pilih Standard', cta_link: null, sort_order: 2, is_active: true, created_at: '', updated_at: '',
  },
  {
    id: '3', name: 'Premium', slug: 'premium', description: 'Full-stack system: web + mobile + API + deployment',
    price_min: 40000000, price_max: 100000000, price_unit: 'IDR',
    features: ['Web App + Android App', 'Full Backend & API', 'Database Design & Optimization', 'Push Notifications', 'Admin Dashboard Lengkap', 'Unlimited Revisi', 'Deploy Web + Play Store', '3 Bulan Maintenance', 'Source Code Ownership'],
    is_popular: false, cta_text: 'Pilih Premium', cta_link: null, sort_order: 3, is_active: true, created_at: '', updated_at: '',
  },
  {
    id: '4', name: 'Custom', slug: 'custom', description: 'Konsultasi gratis untuk kebutuhan spesial Anda',
    price_min: 0, price_max: 0, price_unit: 'IDR',
    features: ['Konsultasi Gratis', 'Analisis Kebutuhan', 'Estimasi Harga Transparan', 'Fleksibel Sesuai Scope', 'Timeline Disesuaikan'],
    is_popular: false, cta_text: 'Konsultasi Gratis', cta_link: null, sort_order: 4, is_active: true, created_at: '', updated_at: '',
  },
];

function formatPrice(min: number, max: number): string {
  if (min === 0 && max === 0) return 'Gratis';
  const fmt = (n: number) => `Rp ${(n / 1000000).toFixed(0)}jt`;
  return `${fmt(min)} — ${fmt(max)}`;
}

export default function PricingPage() {
  const [packages, setPackages] = useState<PricingPackage[]>(fallbackPackages);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pricing')
      .then(r => r.json())
      .then(data => { if (data.length > 0) setPackages(data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-10">
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-[22px] font-semibold text-neutral-900 mb-2">Harga & Paket</h1>
        <p className="text-[14px] text-neutral-500 max-w-2xl">
          Harga transparan tanpa hidden cost. Pilih paket yang sesuai kebutuhan bisnis Anda.
        </p>
      </motion.div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            variants={fadeInUp}
            className={`bg-white border rounded-xl p-6 transition-all relative ${
              pkg.is_popular
                ? 'border-[#0D9488] shadow-md ring-1 ring-[#0D9488]/20'
                : 'border-neutral-200 hover:border-[#0D9488]/30 hover:shadow-sm'
            }`}
          >
            {pkg.is_popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-[#0D9488] text-white text-[11px] font-medium rounded-full">
                <Star className="w-3 h-3" fill="currentColor" /> Populer
              </div>
            )}

            <div className="mb-5">
              <h3 className="text-[17px] font-semibold text-neutral-900 mb-1">{pkg.name}</h3>
              <p className="text-[12px] text-neutral-500 mb-3">{pkg.description}</p>
              <div className="text-[20px] font-bold text-[#0D9488]">
                {formatPrice(pkg.price_min, pkg.price_max)}
              </div>
            </div>

            <ul className="space-y-2 mb-6">
              {pkg.features.map((f, j) => (
                <li key={j} className="flex items-start gap-2 text-[12px] text-neutral-600">
                  <CheckCircle className="w-3.5 h-3.5 text-[#0D9488] flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={`/order?package=${pkg.slug}`}
              className={`flex items-center justify-center gap-2 w-full py-2.5 rounded-lg text-[13px] font-medium transition-colors ${
                pkg.is_popular
                  ? 'bg-[#0D9488] text-white hover:bg-[#0F766E]'
                  : 'border border-neutral-300 text-neutral-700 hover:border-[#0D9488] hover:text-[#0D9488]'
              }`}
            >
              {pkg.cta_text} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Note */}
      <motion.div variants={fadeInUp} className="bg-neutral-50 border border-neutral-200 rounded-xl p-6">
        <h3 className="text-[14px] font-semibold text-neutral-900 mb-2">Catatan Penting</h3>
        <ul className="space-y-1.5 text-[12px] text-neutral-500">
          <li>• Harga bersifat estimasi, final price ditentukan setelah discovery</li>
          <li>• Pembayaran bertahap: 50% di awal, 50% setelah selesai</li>
          <li>• Revisi di luar scope awal ada biaya tambahan</li>
          <li>• Konsultasi pertama GRATIS tanpa komitmen</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
