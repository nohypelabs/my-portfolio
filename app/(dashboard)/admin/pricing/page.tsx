'use client';

import { motion } from 'framer-motion';
import { Save, Loader2, Plus, Trash2, ArrowLeft, GripVertical, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { PricingPackage } from '@/lib/supabase/types';

export default function AdminPricingPage() {
  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('pricing_packages')
      .select('*')
      .order('sort_order')
      .then(({ data }: { data: PricingPackage[] | null }) => {
        if (data) setPackages(data);
        setLoading(false);
      });
  }, []);

  const updateField = (id: string, field: keyof PricingPackage, value: unknown) => {
    setPackages(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const updateFeature = (pkgId: string, index: number, value: string) => {
    setPackages(prev => prev.map(p => {
      if (p.id !== pkgId) return p;
      const features = [...p.features];
      features[index] = value;
      return { ...p, features };
    }));
  };

  const addFeature = (pkgId: string) => {
    setPackages(prev => prev.map(p => {
      if (p.id !== pkgId) return p;
      return { ...p, features: [...p.features, ''] };
    }));
  };

  const removeFeature = (pkgId: string, index: number) => {
    setPackages(prev => prev.map(p => {
      if (p.id !== pkgId) return p;
      const features = p.features.filter((_, i) => i !== index);
      return { ...p, features };
    }));
  };

  const savePackage = async (pkg: PricingPackage) => {
    setSaving(pkg.id);
    const supabase = createClient();
    const { error } = await supabase
      .from('pricing_packages')
      .update({
        name: pkg.name,
        description: pkg.description,
        price_min: pkg.price_min,
        price_max: pkg.price_max,
        features: pkg.features.filter(f => f.trim()),
        is_popular: pkg.is_popular,
        cta_text: pkg.cta_text,
        sort_order: pkg.sort_order,
        is_active: pkg.is_active,
        updated_at: new Date().toISOString(),
      })
      .eq('id', pkg.id);

    if (error) {
      setError('Gagal menyimpan: ' + error.message);
    } else {
      setError(null);
    }
    setSaving(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-[#c4956a]" />
      </div>
    );
  }

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      {/* Header */}
      <motion.div variants={fadeInUp} className="flex items-center justify-between">
        <div>
          <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-[12px] text-neutral-500 hover:text-[#c4956a] mb-2 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
          </Link>
          <h1 className="text-[20px] font-semibold text-neutral-900">Kelola Paket Harga</h1>
          <p className="text-[13px] text-neutral-500">Edit harga, fitur, dan detail paket</p>
        </div>
      </motion.div>

      {error && (
        <motion.div variants={fadeInUp} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-[12px] text-red-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </motion.div>
      )}

      {/* Package Cards */}
      <div className="space-y-6">
        {packages.map((pkg) => (
          <motion.div
            key={pkg.id}
            variants={fadeInUp}
            className="bg-[#f7f3e8] border border-neutral-200 rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <GripVertical className="w-4 h-4 text-neutral-300" />
                <h3 className="text-[15px] font-semibold text-neutral-900">{pkg.name}</h3>
                {pkg.is_popular && (
                  <span className="text-[10px] font-medium text-[#c4956a] bg-[#c4956a]/10 px-2 py-0.5 rounded-full">
                    Populer
                  </span>
                )}
                {!pkg.is_active && (
                  <span className="text-[10px] font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">
                    Nonaktif
                  </span>
                )}
              </div>
              <button
                onClick={() => savePackage(pkg)}
                disabled={saving === pkg.id}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#c4956a] text-white rounded-lg text-[12px] font-medium hover:bg-[#a67d55] transition-colors disabled:opacity-50"
              >
                {saving === pkg.id ? (
                  <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Menyimpan...</>
                ) : (
                  <><Save className="w-3.5 h-3.5" /> Simpan</>
                )}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              {/* Name */}
              <div>
                <label className="block text-[11px] font-medium text-neutral-500 mb-1">Nama Paket</label>
                <input
                  type="text"
                  value={pkg.name}
                  onChange={e => updateField(pkg.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#c4956a] focus:ring-1 focus:ring-[#c4956a]/20"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-[11px] font-medium text-neutral-500 mb-1">Deskripsi</label>
                <input
                  type="text"
                  value={pkg.description || ''}
                  onChange={e => updateField(pkg.id, 'description', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#c4956a] focus:ring-1 focus:ring-[#c4956a]/20"
                />
              </div>

              {/* Price Min */}
              <div>
                <label className="block text-[11px] font-medium text-neutral-500 mb-1">Harga Minimum (IDR)</label>
                <input
                  type="number"
                  value={pkg.price_min}
                  onChange={e => updateField(pkg.id, 'price_min', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#c4956a] focus:ring-1 focus:ring-[#c4956a]/20"
                />
              </div>

              {/* Price Max */}
              <div>
                <label className="block text-[11px] font-medium text-neutral-500 mb-1">Harga Maksimum (IDR)</label>
                <input
                  type="number"
                  value={pkg.price_max}
                  onChange={e => updateField(pkg.id, 'price_max', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#c4956a] focus:ring-1 focus:ring-[#c4956a]/20"
                />
              </div>

              {/* CTA Text */}
              <div>
                <label className="block text-[11px] font-medium text-neutral-500 mb-1">Tombol CTA</label>
                <input
                  type="text"
                  value={pkg.cta_text}
                  onChange={e => updateField(pkg.id, 'cta_text', e.target.value)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#c4956a] focus:ring-1 focus:ring-[#c4956a]/20"
                />
              </div>

              {/* Sort Order */}
              <div>
                <label className="block text-[11px] font-medium text-neutral-500 mb-1">Urutan</label>
                <input
                  type="number"
                  value={pkg.sort_order}
                  onChange={e => updateField(pkg.id, 'sort_order', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#c4956a] focus:ring-1 focus:ring-[#c4956a]/20"
                />
              </div>
            </div>

            {/* Checkboxes */}
            <div className="flex items-center gap-6 mb-5">
              <label className="flex items-center gap-2 text-[12px] text-neutral-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pkg.is_popular}
                  onChange={e => updateField(pkg.id, 'is_popular', e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-[#c4956a] focus:ring-[#c4956a]"
                />
                Populer
              </label>
              <label className="flex items-center gap-2 text-[12px] text-neutral-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pkg.is_active}
                  onChange={e => updateField(pkg.id, 'is_active', e.target.checked)}
                  className="w-4 h-4 rounded border-neutral-300 text-[#c4956a] focus:ring-[#c4956a]"
                />
                Aktif
              </label>
            </div>

            {/* Features */}
            <div>
              <label className="block text-[11px] font-medium text-neutral-500 mb-2">Fitur</label>
              <div className="space-y-2">
                {pkg.features.map((f, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={f}
                      onChange={e => updateFeature(pkg.id, i, e.target.value)}
                      className="flex-1 px-3 py-2 border border-neutral-300 rounded-lg text-[12px] focus:outline-none focus:border-[#c4956a] focus:ring-1 focus:ring-[#c4956a]/20"
                    />
                    <button
                      onClick={() => removeFeature(pkg.id, i)}
                      className="p-2 text-neutral-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addFeature(pkg.id)}
                  className="flex items-center gap-1.5 text-[12px] text-[#c4956a] hover:text-[#a67d55] transition-colors"
                >
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
