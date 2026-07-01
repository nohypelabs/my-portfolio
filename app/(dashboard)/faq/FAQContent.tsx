'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useState } from 'react';
import type { FAQ } from '@/lib/supabase/types';

function AccordionItem({ faq, isOpen, onToggle }: { faq: FAQ; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="neo-surface rounded-xl overflow-hidden">
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

export function FAQContent({ faqs }: { faqs: FAQ[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

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
