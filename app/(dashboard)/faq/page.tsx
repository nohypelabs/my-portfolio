'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useEffect, useState } from 'react';
import type { FAQ } from '@/lib/supabase/types';

const fallbackFaqs: FAQ[] = [
  { id: '1', question: 'Berapa lama waktu pengerjaan sebuah project?', answer: 'Tergantung kompleksitas. Landing page: 1-2 minggu. Web app standar: 4-8 minggu. Full system (web + mobile): 8-16 minggu. Timeline pasti akan diinformasikan setelah tahap discovery.', category: 'project', sort_order: 1, is_active: true, created_at: '', updated_at: '' },
  { id: '2', question: 'Apakah bisa custom sesuai kebutuhan bisnis saya?', answer: 'Tentu! Semua project dibuat custom dari nol sesuai kebutuhan Anda. Tidak pakai template. Setiap fitur didesain untuk menyelesaikan masalah spesifik bisnis Anda.', category: 'project', sort_order: 2, is_active: true, created_at: '', updated_at: '' },
  { id: '3', question: 'Teknologi apa yang digunakan?', answer: 'Stack utama: Next.js, React, TypeScript untuk web. Kotlin/Flutter untuk Android. PostgreSQL/Supabase untuk database. Deploy di Vercel/Railway. Semua teknologi modern dan production-proven.', category: 'technical', sort_order: 3, is_active: true, created_at: '', updated_at: '' },
  { id: '4', question: 'Apakah ada maintenance setelah project selesai?', answer: 'Ya, setiap paket include maintenance. Basic: tidak include. Standard: 1 bulan. Premium: 3 bulan. Setelah itu bisa perpanjang dengan biaya terpisah.', category: 'project', sort_order: 4, is_active: true, created_at: '', updated_at: '' },
  { id: '5', question: 'Bagaimana sistem pembayaran?', answer: 'Pembayaran bertahap: 50% di awal (setelah design approval), 50% setelah selesai. Untuk project besar, bisa dibicarakan skema cicilan. Transfer bank atau e-wallet.', category: 'payment', sort_order: 5, is_active: true, created_at: '', updated_at: '' },
  { id: '6', question: 'Apakah source code menjadi milik saya?', answer: 'Ya, untuk paket Premium source code sepenuhnya milik Anda. Untuk paket Basic dan Standard, source code bisa dibeli terpisah.', category: 'legal', sort_order: 6, is_active: true, created_at: '', updated_at: '' },
  { id: '7', question: 'Bisa revisi berapa kali?', answer: 'Basic: 1x revisi desain. Standard: 3x revisi desain + 2x revisi development. Premium: unlimited revisi selama masa development. Revisi di luar scope awal ada biaya tambahan.', category: 'project', sort_order: 7, is_active: true, created_at: '', updated_at: '' },
  { id: '8', question: 'Apakah bisa integrasi dengan sistem yang sudah ada?', answer: 'Bisa! Kami berpengalaman integrasi dengan berbagai sistem: payment gateway (Midtrans, Xendit), API pihak ketiga, database existing, dan sistem legacy.', category: 'technical', sort_order: 8, is_active: true, created_at: '', updated_at: '' },
];

function AccordionItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border border-neutral-200 rounded-xl overflow-hidden hover:border-[#0D9488]/30 transition-colors">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-[14px] font-medium text-neutral-900 pr-4">{faq.question}</span>
        <ChevronDown
          className={`w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="px-5 pb-5">
          <p className="text-[13px] text-neutral-500 leading-relaxed">{faq.answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>(fallbackFaqs);
  const [openId, setOpenId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/faqs')
      .then(r => r.json())
      .then(data => { if (data.length > 0) setFaqs(data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const categories = [...new Set(faqs.map(f => f.category))];
  const categoryLabels: Record<string, string> = {
    project: 'Project',
    technical: 'Teknis',
    payment: 'Pembayaran',
    legal: 'Legal',
  };

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-10">
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-[22px] font-semibold text-neutral-900 mb-2">Frequently Asked Questions</h1>
        <p className="text-[14px] text-neutral-500 max-w-2xl">
          Pertanyaan yang sering ditanyakan tentang layanan, harga, dan proses kerja kami.
        </p>
      </motion.div>

      {/* FAQ by category */}
      {categories.map(cat => (
        <motion.div key={cat} variants={fadeInUp}>
          <h2 className="text-[15px] font-semibold text-neutral-900 mb-4">
            {categoryLabels[cat] || cat}
          </h2>
          <div className="space-y-3">
            {faqs.filter(f => f.category === cat).map(faq => (
              <AccordionItem
                key={faq.id}
                faq={faq}
                isOpen={openId === faq.id}
                onToggle={() => setOpenId(openId === faq.id ? null : faq.id)}
              />
            ))}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
