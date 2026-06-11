'use client';

import { motion } from 'framer-motion';
import { Package, DollarSign, MessageSquare, HelpCircle, ShoppingBag, Settings, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';

interface Stats {
  orders: number;
  services: number;
  packages: number;
  testimonials: number;
  faqs: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({ orders: 0, services: 0, packages: 0, testimonials: 0, faqs: 0 });

  useEffect(() => {
    const supabase = createClient();
    Promise.all([
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('services').select('id', { count: 'exact', head: true }),
      supabase.from('pricing_packages').select('id', { count: 'exact', head: true }),
      supabase.from('testimonials').select('id', { count: 'exact', head: true }),
      supabase.from('faqs').select('id', { count: 'exact', head: true }),
    ]).then(([orders, services, packages, testimonials, faqs]) => {
      setStats({
        orders: orders.count ?? 0,
        services: services.count ?? 0,
        packages: packages.count ?? 0,
        testimonials: testimonials.count ?? 0,
        faqs: faqs.count ?? 0,
      });
    });
  }, []);

  const cards = [
    { label: 'Orders', count: stats.orders, icon: ShoppingBag, href: '/admin/orders', color: 'bg-blue-50 text-blue-600' },
    { label: 'Paket Harga', count: stats.packages, icon: DollarSign, href: '/admin/pricing', color: 'bg-emerald-50 text-emerald-600' },
    { label: 'Layanan', count: stats.services, icon: Package, href: '/admin/services', color: 'bg-purple-50 text-purple-600' },
    { label: 'Testimoni', count: stats.testimonials, icon: MessageSquare, href: '/admin/testimonials', color: 'bg-amber-50 text-amber-600' },
    { label: 'FAQ', count: stats.faqs, icon: HelpCircle, href: '/admin/faqs', color: 'bg-rose-50 text-rose-600' },
    { label: 'Settings', count: 0, icon: Settings, href: '/admin/settings', color: 'bg-neutral-100 text-neutral-600' },
  ];

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      <motion.div variants={fadeInUp}>
        <h1 className="text-[22px] font-semibold text-neutral-900 mb-1">Admin Dashboard</h1>
        <p className="text-[13px] text-neutral-500">Kelola konten dan pesanan nasaq.id</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.div key={card.label} variants={fadeInUp}>
              <Link
                href={card.href}
                className="block bg-white border border-neutral-200 rounded-xl p-5 hover:border-[#0D9488]/30 hover:shadow-sm transition-all group"
              >
                <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
                <p className="text-[20px] font-bold text-neutral-900">{card.count}</p>
                <p className="text-[12px] text-neutral-500">{card.label}</p>
                <ArrowRight className="w-4 h-4 text-neutral-300 mt-2 group-hover:text-[#0D9488] transition-colors" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
