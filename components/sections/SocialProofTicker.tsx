'use client';

import { motion } from 'framer-motion';
import { Zap, CheckCircle2, Users, TrendingUp } from 'lucide-react';

const activities = [
  { icon: CheckCircle2, text: 'WC Check: 3.293 inspeksi tercatat', time: 'Live', color: 'text-emerald-500' },
  { icon: TrendingUp, text: 'Serat QC: 80K+ resi diproses', time: 'Production', color: 'text-blue-500' },
  { icon: Users, text: 'LakuPOS: 4 outlet aktif', time: 'Active', color: 'text-purple-500' },
  { icon: Zap, text: 'Qohira: 6 orders terverifikasi', time: 'Real-time', color: 'text-orange-500' },
  { icon: CheckCircle2, text: 'SignalFlow: 5-Layer Engine V2', time: 'Shipped', color: 'text-emerald-500' },
  { icon: TrendingUp, text: 'ShadowBid: 47 tests passing', time: 'Production', color: 'text-blue-500' },
  { icon: Users, text: 'TraceFlow: Real-time GPS tracking', time: 'Active', color: 'text-purple-500' },
];

export function SocialProofTicker() {
  return (
    <section className="space-y-4">
      <p className="text-center text-[11px] text-neutral-400 tracking-wide uppercase font-medium">
        Aktivitas Real-time
      </p>

      <div className="neo-surface rounded-2xl p-4 overflow-hidden">
        <div className="flex gap-3 overflow-hidden">
          <motion.div
            className="flex gap-3"
            animate={{ x: [0, -2000] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 30,
                ease: 'linear',
              },
            }}
          >
            {[...activities, ...activities, ...activities].map((activity, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-neutral-200 rounded-xl flex-shrink-0 hover:border-[#c4956a]/20 transition-colors"
              >
                <activity.icon className={`w-4 h-4 ${activity.color} flex-shrink-0`} />
                <span className="text-[12px] text-neutral-700 whitespace-nowrap">{activity.text}</span>
                <span className="text-[9px] font-medium text-[#c4956a] bg-[#c4956a]/8 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                  {activity.time}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
