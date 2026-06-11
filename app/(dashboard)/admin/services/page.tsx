'use client';

import { motion } from 'framer-motion';
import { Save, Loader2, Plus, Trash2, ArrowLeft, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Service } from '@/lib/supabase/types';

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.from('services').select('*').order('sort_order').then(({ data }) => {
      if (data) setServices(data);
      setLoading(false);
    });
  }, []);

  const updateField = (id: string, field: keyof Service, value: unknown) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const updateFeature = (svcId: string, index: number, value: string) => {
    setServices(prev => prev.map(s => {
      if (s.id !== svcId) return s;
      const features = [...s.features];
      features[index] = value;
      return { ...s, features };
    }));
  };

  const addFeature = (svcId: string) => {
    setServices(prev => prev.map(s => {
      if (s.id !== svcId) return s;
      return { ...s, features: [...s.features, ''] };
    }));
  };

  const removeFeature = (svcId: string, index: number) => {
    setServices(prev => prev.map(s => {
      if (s.id !== svcId) return s;
      return { ...s, features: s.features.filter((_, i) => i !== index) };
    }));
  };

  const saveService = async (svc: Service) => {
    setSaving(svc.id);
    const supabase = createClient();
    const { error } = await supabase
      .from('services')
      .update({
        title: svc.title,
        description: svc.description,
        features: svc.features.filter(f => f.trim()),
        icon: svc.icon,
        sort_order: svc.sort_order,
        is_active: svc.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', svc.id);

    if (error) {
      setError('Gagal: ' + error.message);
    } else {
      setError(null);
    }
    setSaving(null);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-6 h-6 animate-spin text-[#0D9488]" /></div>;
  }

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      <motion.div variants={fadeInUp}>
        <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-[12px] text-neutral-500 hover:text-[#0D9488] mb-2 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
        </Link>
        <h1 className="text-[20px] font-semibold text-neutral-900">Kelola Layanan</h1>
      </motion.div>

      {error && (
        <motion.div variants={fadeInUp} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-[12px] text-red-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </motion.div>
      )}

      <div className="space-y-6">
        {services.map((svc) => (
          <motion.div key={svc.id} variants={fadeInUp} className="bg-white border border-neutral-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[15px] font-semibold text-neutral-900">{svc.title}</h3>
              <button
                onClick={() => saveService(svc)}
                disabled={saving === svc.id}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0D9488] text-white rounded-lg text-[12px] font-medium hover:bg-[#0F766E] transition-colors disabled:opacity-50"
              >
                {saving === svc.id ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</> : <><Save className="w-3.5 h-3.5" /> Simpan</>}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[11px] font-medium text-neutral-500 mb-1">Judul</label>
                <input type="text" value={svc.title} onChange={e => updateField(svc.id, 'title', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20" />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-neutral-500 mb-1">Icon (lucide-react name)</label>
                <input type="text" value={svc.icon} onChange={e => updateField(svc.id, 'icon', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-[11px] font-medium text-neutral-500 mb-1">Deskripsi</label>
                <textarea value={svc.description} onChange={e => updateField(svc.id, 'description', e.target.value)} rows={2}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 resize-none" />
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label className="flex items-center gap-2 text-[12px] text-neutral-700 cursor-pointer">
                <input type="checkbox" checked={svc.is_active} onChange={e => updateField(svc.id, 'is_active', e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-[#0D9488] focus:ring-[#0D9488]" />
                Aktif
              </label>
              <div>
                <label className="text-[11px] font-medium text-neutral-500 mr-2">Urutan</label>
                <input type="number" value={svc.sort_order} onChange={e => updateField(svc.id, 'sort_order', parseInt(e.target.value) || 0)}
                  className="w-16 px-2 py-1 border border-neutral-300 rounded-lg text-[12px] focus:outline-none focus:border-[#0D9488]" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-neutral-500 mb-2">Fitur</label>
              <div className="space-y-2">
                {svc.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input type="text" value={f} onChange={e => updateFeature(svc.id, i, e.target.value)}
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-[12px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20" />
                    <button onClick={() => removeFeature(svc.id, i)} className="p-2 text-neutral-400 hover:text-red-500 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button onClick={() => addFeature(svc.id)} className="flex items-center gap-1.5 text-[12px] text-[#0D9488] hover:text-[#0F766E] transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Tambah Fitur
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
