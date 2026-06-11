'use client';

import { motion } from 'framer-motion';
import { Loader2, ArrowLeft, Eye, CheckCircle, Clock, XCircle, Package } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Order } from '@/lib/supabase/types';

const statusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  pending: { label: 'Menunggu', color: 'bg-yellow-50 text-yellow-700 border-yellow-200', icon: Clock },
  reviewing: { label: 'Direview', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Eye },
  quoted: { label: 'Dihargai', color: 'bg-purple-50 text-purple-700 border-purple-200', icon: Package },
  accepted: { label: 'Diterima', color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: CheckCircle },
  in_progress: { label: 'Dikerjakan', color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Package },
  completed: { label: 'Selesai', color: 'bg-green-50 text-green-700 border-green-200', icon: CheckCircle },
  cancelled: { label: 'Dibatalkan', color: 'bg-red-50 text-red-700 border-red-200', icon: XCircle },
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }: { data: Order[] | null }) => {
        if (data) setOrders(data);
        setLoading(false);
      });
  }, []);

  const updateStatus = async (orderId: string, status: string) => {
    setUpdating(orderId);
    const supabase = createClient();
    const { error } = await supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', orderId);

    if (!error) {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: status as Order['status'] } : o));
    }
    setUpdating(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-6 h-6 animate-spin text-[#0D9488]" />
      </div>
    );
  }

  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-8">
      <motion.div variants={fadeInUp}>
        <Link href="/admin/dashboard" className="inline-flex items-center gap-1.5 text-[12px] text-neutral-500 hover:text-[#0D9488] mb-2 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
        </Link>
        <h1 className="text-[20px] font-semibold text-neutral-900">Kelola Pesanan</h1>
        <p className="text-[13px] text-neutral-500">{orders.length} pesanan total</p>
      </motion.div>

      {orders.length === 0 ? (
        <motion.div variants={fadeInUp} className="text-center py-16">
          <Package className="w-10 h-10 text-neutral-300 mx-auto mb-3" />
          <p className="text-[13px] text-neutral-500">Belum ada pesanan</p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const status = statusConfig[order.status] || statusConfig.pending;
            const StatusIcon = status.icon;
            return (
              <motion.div
                key={order.id}
                variants={fadeInUp}
                className="bg-white border border-neutral-200 rounded-xl p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-[14px] font-semibold text-neutral-900">{order.customer_name}</h3>
                    <p className="text-[12px] text-neutral-500">{order.customer_email} · {order.customer_phone || '-'}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium border ${status.color}`}>
                    <StatusIcon className="w-3 h-3" /> {status.label}
                  </span>
                </div>

                <p className="text-[12px] text-neutral-600 mb-3 line-clamp-2">{order.project_description}</p>

                <div className="flex flex-wrap gap-2 mb-3 text-[11px] text-neutral-500">
                  {order.budget_range && <span className="px-2 py-0.5 bg-neutral-100 rounded">Budget: {order.budget_range}</span>}
                  {order.timeline && <span className="px-2 py-0.5 bg-neutral-100 rounded">Timeline: {order.timeline}</span>}
                  <span className="px-2 py-0.5 bg-neutral-100 rounded">
                    {new Date(order.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                {/* Status update */}
                <div className="flex flex-wrap gap-2">
                  {Object.entries(statusConfig).map(([key, cfg]) => (
                    <button
                      key={key}
                      onClick={() => updateStatus(order.id, key)}
                      disabled={order.status === key || updating === order.id}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-medium border transition-colors ${
                        order.status === key
                          ? 'opacity-50 cursor-default ' + cfg.color
                          : 'border-neutral-200 text-neutral-500 hover:border-[#0D9488] hover:text-[#0D9488]'
                      }`}
                    >
                      {cfg.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
