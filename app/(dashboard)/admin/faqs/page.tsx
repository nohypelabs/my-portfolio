'use client';

import { motion } from 'framer-motion';
import { Save, Loader2, ArrowLeft, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { FAQ } from '@/lib/supabase/types';

export default function AdminFAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('faqs').select('*').order('sort_order').then(({ data }) => {
      if (data) setFaqs(data);
      setLoading(false);
    });
  }, []);

  const updateField = (id: string, field: keyof FAQ, value: unknown) => {
    setFaqs(prev => prev.map(f => f.id === id ? { ...f, [field]: value } : f));
  };

  const saveFaq = async (faq: FAQ) => {
    setSaving(faq.id);
    const supabase = createClient();
    const { error } = await supabase
      .from('faqs')
      .update({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        sort_order: faq.sort_order,
        is_active: faq.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', faq.id);

    if (error) alert('Gagal: ' + error.message);
    setSaving(null);
  };

  const addFaq = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('faqs')
      .insert({
        question: 'Pertanyaan baru?',
        answer: 'Jawaban...',
        category: 'general',
        sort_order: faqs.length + 1,
      })
      .select()
      .single();

    if (data && !error) {
      setFaqs(prev => [...prev, data]);
    }
  };

  const deleteFaq = async (id: string) => {
    if (!confirm('Hapus FAQ ini?')) return;
    const supabase = createClient();
    const { error } = await supabase.from('faqs').delete().eq('id', id);
    if (!error) setFaqs(prev => prev.filter(f => f.id !== id));
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-6 h-6 animate-spin text-[#0D9488]" /></div>;
  }

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <div>
          <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-[12px] text-neutral-500 hover:text-[#0D9488] mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
          </Link>
          <h1 className="text-[20px] font-semibold text-neutral-900">Kelola FAQ</h1>
        </div>
        <button onClick={addFaq} className="flex items-center gap-1.5 px-3 py-2 bg-[#0D9488] text-white rounded-lg text-[12px] font-medium hover:bg-[#0F766E] transition-colors">
          <Plus className="w-3.5 h-3.5" /> Tambah
        </button>
      </motion.div>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <motion.div key={faq.id} variants={fadeInUp} className="bg-white border border-neutral-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full">{faq.category}</span>
              <div className="flex items-center gap-2">
                <button onClick={() => saveFaq(faq)} disabled={saving === faq.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D9488] text-white rounded-lg text-[11px] font-medium hover:bg-[#0F766E] transition-colors disabled:opacity-50">
                  {saving === faq.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Simpan
                </button>
                <button onClick={() => deleteFaq(faq.id)} className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <input type="text" value={faq.question} onChange={e => updateField(faq.id, 'question', e.target.value)} placeholder="Pertanyaan"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-[13px] font-medium focus:outline-none focus:border-[#0D9488]" />
              <textarea value={faq.answer} onChange={e => updateField(faq.id, 'answer', e.target.value)} rows={3} placeholder="Jawaban"
                className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-[12px] focus:outline-none focus:border-[#0D9488] resize-none" />
              <div className="flex items-center gap-4">
                <select value={faq.category} onChange={e => updateField(faq.id, 'category', e.target.value)}
                  className="px-2 py-1 border border-neutral-300 rounded text-[11px] focus:outline-none focus:border-[#0D9488]">
                  <option value="general">General</option>
                  <option value="project">Project</option>
                  <option value="technical">Teknis</option>
                  <option value="payment">Pembayaran</option>
                  <option value="legal">Legal</option>
                </select>
                <label className="flex items-center gap-2 text-[11px] text-neutral-700 cursor-pointer">
                  <input type="checkbox" checked={faq.is_active} onChange={e => updateField(faq.id, 'is_active', e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-neutral-300 text-[#0D9488]" /> Aktif
                </label>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
