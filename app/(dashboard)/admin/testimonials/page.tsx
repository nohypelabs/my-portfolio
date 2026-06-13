'use client';

import { motion } from 'framer-motion';
import { Save, Loader2, ArrowLeft, Plus, Trash2, Star, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Testimonial } from '@/lib/supabase/types';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('testimonials').select('*').order('sort_order').then(({ data }: { data: Testimonial[] | null }) => {
      if (data) setTestimonials(data);
      setLoading(false);
    });
  }, []);

  const updateField = (id: string, field: keyof Testimonial, value: unknown) => {
    setTestimonials(prev => prev.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const saveTestimonial = async (t: Testimonial) => {
    setSaving(t.id);
    const supabase = createClient();
    const { error } = await supabase
      .from('testimonials')
      .update({
        name: t.name,
        position: t.position,
        company: t.company,
        content: t.content,
        rating: t.rating,
        is_featured: t.is_featured,
        sort_order: t.sort_order,
        is_active: t.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', t.id);

    if (error) {
      setError('Gagal: ' + error.message);
    } else {
      setError(null);
    }
    setSaving(null);
  };

  const addTestimonial = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('testimonials')
      .insert({
        name: 'Nama Baru',
        content: 'Isi testimoni...',
        rating: 5,
        sort_order: testimonials.length + 1,
      })
      .select()
      .single();

    if (data && !error) {
      setTestimonials(prev => [...prev, data]);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm('Hapus testimoni ini?')) return;
    const supabase = createClient();
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (!error) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-6 h-6 animate-spin text-[#c4956a]" /></div>;
  }

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <div>
          <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-[12px] text-neutral-500 hover:text-[#c4956a] mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
          </Link>
          <h1 className="text-[20px] font-semibold text-neutral-900">Kelola Testimoni</h1>
        </div>
        <button onClick={addTestimonial} className="flex items-center gap-1.5 px-3 py-2 bg-[#c4956a] text-white rounded-lg text-[12px] font-medium hover:bg-[#a67d55] transition-colors">
          <Plus className="w-3.5 h-3.5" /> Tambah
        </button>
      </motion.div>

      {error && (
        <motion.div variants={fadeInUp} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-[12px] text-red-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </motion.div>
      )}

      <div className="space-y-4">
        {testimonials.map((t) => (
          <motion.div key={t.id} variants={fadeInUp} className="bg-[#f7f3e8] border border-neutral-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                {t.is_featured && <span className="text-[10px] font-medium text-[#c4956a] bg-[#c4956a]/10 px-2 py-0.5 rounded-full">Featured</span>}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => saveTestimonial(t)} disabled={saving === t.id}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#c4956a] text-white rounded-lg text-[11px] font-medium hover:bg-[#a67d55] transition-colors disabled:opacity-50">
                  {saving === t.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />} Simpan
                </button>
                <button onClick={() => deleteTestimonial(t.id)} className="p-1.5 text-neutral-400 hover:text-red-500 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <input type="text" value={t.name} onChange={e => updateField(t.id, 'name', e.target.value)} placeholder="Nama"
                className="px-3 py-2 border border-neutral-300 rounded-lg text-[12px] focus:outline-none focus:border-[#c4956a]" />
              <input type="text" value={t.position || ''} onChange={e => updateField(t.id, 'position', e.target.value)} placeholder="Posisi"
                className="px-3 py-2 border border-neutral-300 rounded-lg text-[12px] focus:outline-none focus:border-[#c4956a]" />
              <input type="text" value={t.company || ''} onChange={e => updateField(t.id, 'company', e.target.value)} placeholder="Perusahaan"
                className="px-3 py-2 border border-neutral-300 rounded-lg text-[12px] focus:outline-none focus:border-[#c4956a]" />
            </div>

            <textarea value={t.content} onChange={e => updateField(t.id, 'content', e.target.value)} rows={2} placeholder="Isi testimoni..."
              className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-[12px] focus:outline-none focus:border-[#c4956a] resize-none mb-3" />

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-[11px] text-neutral-700 cursor-pointer">
                <input type="checkbox" checked={t.is_featured} onChange={e => updateField(t.id, 'is_featured', e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-neutral-300 text-[#c4956a]" /> Featured
              </label>
              <label className="flex items-center gap-2 text-[11px] text-neutral-700 cursor-pointer">
                <input type="checkbox" checked={t.is_active} onChange={e => updateField(t.id, 'is_active', e.target.checked)}
                  className="w-3.5 h-3.5 rounded border-neutral-300 text-[#c4956a]" /> Aktif
              </label>
              <div className="flex items-center gap-1">
                <span className="text-[11px] text-neutral-500">Rating:</span>
                <select value={t.rating} onChange={e => updateField(t.id, 'rating', parseInt(e.target.value))}
                  className="px-2 py-1 border border-neutral-300 rounded text-[11px] focus:outline-none focus:border-[#c4956a]">
                  {[1,2,3,4,5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
