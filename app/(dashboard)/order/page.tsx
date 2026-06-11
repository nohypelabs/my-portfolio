'use client';

import { motion } from 'framer-motion';
import { Send, ArrowLeft, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useState, useEffect, Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { PricingPackage, Service } from '@/lib/supabase/types';
import type { User } from '@supabase/supabase-js';

function OrderForm() {
  const searchParams = useSearchParams();
  const preselectedPackage = searchParams.get('package');

  const [packages, setPackages] = useState<PricingPackage[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    service_id: '',
    package_id: '',
    project_description: '',
    budget_range: '',
    timeline: '',
  });

  useEffect(() => {
    const supabase = createClient();

    // Check auth
    supabase.auth.getUser().then(({ data }: { data: { user: User | null } }) => {
      if (data.user) {
        setUser(data.user);
        setForm(prev => ({
          ...prev,
          customer_name: data.user.user_metadata?.full_name || prev.customer_name,
          customer_email: data.user.email || prev.customer_email,
        }));
      }
    });

    // Fetch packages & services
    Promise.all([
      fetch('/api/pricing').then(r => r.json()),
      fetch('/api/services').then(r => r.json()),
    ]).then(([pkgs, svcs]) => {
      setPackages(pkgs);
      setServices(svcs);
      if (preselectedPackage) {
        const found = pkgs.find((p: PricingPackage) => p.slug === preselectedPackage);
        if (found) setForm(prev => ({ ...prev, package_id: found.id }));
      }
    });
  }, [preselectedPackage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase.from('orders').insert({
        ...form,
        customer_id: user?.id || null,
      });

      if (error) throw error;
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError('Gagal mengirim pesanan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div variants={staggerContainer} initial="initial" animate="animate" className="max-w-lg mx-auto text-center py-16">
        <motion.div variants={fadeInUp}>
          <div className="w-16 h-16 rounded-full bg-[#0D9488]/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-[#0D9488]" />
          </div>
          <h1 className="text-[20px] font-semibold text-neutral-900 mb-2">Pesanan Terkirim!</h1>
          <p className="text-[13px] text-neutral-500 mb-6">
            Terima kasih! Kami akan review pesanan Anda dan menghubungi dalam 1×24 jam.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0D9488] text-white rounded-lg text-[13px] font-medium hover:bg-[#0F766E] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Dashboard
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="max-w-2xl mx-auto space-y-8">
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <Link href="/pricing" className="inline-flex items-center gap-1.5 text-[12px] text-neutral-500 hover:text-[#0D9488] mb-4 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Harga
        </Link>
        <h1 className="text-[22px] font-semibold text-neutral-900 mb-2">Pesan Layanan</h1>
        <p className="text-[14px] text-neutral-500">
          Isi form di bawah untuk memesan. Kami akan menghubungi Anda untuk diskusi lebih lanjut.
        </p>
      </motion.div>

      {error && (
        <motion.div variants={fadeInUp} className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-[12px] text-red-600">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </motion.div>
      )}

      {/* Form */}
      <motion.form variants={fadeInUp} onSubmit={handleSubmit} className="bg-white border border-neutral-200 rounded-xl p-6 space-y-5">
        {/* Name */}
        <div>
          <label className="block text-[12px] font-medium text-neutral-700 mb-1.5">Nama Lengkap *</label>
          <input
            type="text"
            required
            value={form.customer_name}
            onChange={e => setForm({ ...form, customer_name: e.target.value })}
            className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 transition-colors"
            placeholder="John Doe"
          />
        </div>

        {/* Email & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-neutral-700 mb-1.5">Email *</label>
            <input
              type="email"
              required
              value={form.customer_email}
              onChange={e => setForm({ ...form, customer_email: e.target.value })}
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 transition-colors"
              placeholder="john@email.com"
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-neutral-700 mb-1.5">No. WhatsApp</label>
            <input
              type="tel"
              value={form.customer_phone}
              onChange={e => setForm({ ...form, customer_phone: e.target.value })}
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 transition-colors"
              placeholder="+62812345678"
            />
          </div>
        </div>

        {/* Service & Package */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-neutral-700 mb-1.5">Layanan</label>
            <select
              value={form.service_id}
              onChange={e => setForm({ ...form, service_id: e.target.value })}
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 transition-colors bg-white"
            >
              <option value="">Pilih layanan</option>
              {services.map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-neutral-700 mb-1.5">Paket Harga</label>
            <select
              value={form.package_id}
              onChange={e => setForm({ ...form, package_id: e.target.value })}
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 transition-colors bg-white"
            >
              <option value="">Pilih paket</option>
              {packages.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget & Timeline */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] font-medium text-neutral-700 mb-1.5">Budget Range</label>
            <select
              value={form.budget_range}
              onChange={e => setForm({ ...form, budget_range: e.target.value })}
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 transition-colors bg-white"
            >
              <option value="">Pilih range</option>
              <option value="< 5jt">&lt; Rp 5jt</option>
              <option value="5-15jt">Rp 5jt — 15jt</option>
              <option value="15-40jt">Rp 15jt — 40jt</option>
              <option value="40-100jt">Rp 40jt — 100jt</option>
              <option value="> 100jt">&gt; Rp 100jt</option>
            </select>
          </div>
          <div>
            <label className="block text-[12px] font-medium text-neutral-700 mb-1.5">Timeline</label>
            <select
              value={form.timeline}
              onChange={e => setForm({ ...form, timeline: e.target.value })}
              className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 transition-colors bg-white"
            >
              <option value="">Pilih timeline</option>
              <option value="1-2 minggu">1-2 minggu</option>
              <option value="2-4 minggu">2-4 minggu</option>
              <option value="1-2 bulan">1-2 bulan</option>
              <option value="2-3 bulan">2-3 bulan</option>
              <option value="3+ bulan">3+ bulan</option>
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-[12px] font-medium text-neutral-700 mb-1.5">Deskripsi Project *</label>
          <textarea
            required
            rows={5}
            value={form.project_description}
            onChange={e => setForm({ ...form, project_description: e.target.value })}
            className="w-full px-3 py-2.5 border border-neutral-300 rounded-lg text-[13px] focus:outline-none focus:border-[#0D9488] focus:ring-1 focus:ring-[#0D9488]/20 transition-colors resize-none"
            placeholder="Jelaskan project yang ingin Anda bangun. Masalah apa yang ingin diselesaikan? Fitur apa saja yang dibutuhkan?"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#0D9488] text-white rounded-lg text-[13px] font-medium hover:bg-[#0F766E] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Mengirim...</>
          ) : (
            <><Send className="w-4 h-4" /> Kirim Pesanan</>
          )}
        </button>
      </motion.form>
    </motion.div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-16"><Loader2 className="w-6 h-6 animate-spin text-[#0D9488]" /></div>}>
      <OrderForm />
    </Suspense>
  );
}
