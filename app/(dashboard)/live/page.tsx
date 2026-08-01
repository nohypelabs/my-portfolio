'use client';

import { motion } from 'framer-motion';
import { LiveMetrics } from '@/components/sections/LiveMetrics';
import { Activity, Database, ShieldCheck, Zap } from 'lucide-react';

export default function LivePage() {
  const proofPoints = [
    {
      icon: Database,
      title: 'Sinyal penggunaan nyata',
      desc: 'Halaman ini ada untuk menunjukkan bahwa pekerjaan kami tidak berhenti di mockup. Sistem kustom kami telah memproses transaksi operasional dan aktivitas bisnis harian secara nyata.',
    },
    {
      icon: ShieldCheck,
      title: 'Bukti sebelum klaim',
      desc: 'Daripada meminta klien membayangkan kapabilitas kami, nasaq.id menampilkan metrik live atau metrik yang baru diambil langsung dari database produksi aktif.',
    },
    {
      icon: Zap,
      title: 'Relevansi operasional',
      desc: 'Yang terpenting dari software bukanlah visual atau animasinya. Yang terpenting adalah apakah sistem tersebut benar-benar mempermudah kerja tim harian Anda.',
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[8px] neo-surface p-6 md:p-8"
      >
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-surface px-3 py-1 text-xs font-semibold text-accent-dark">
            <Activity className="h-3.5 w-3.5" />
            Live Proof
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Sistem yang aktif berjalan adalah bukti kredibilitas terbaik.
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            Bagi kami, kepercayaan dibangun bukan dari presentasi visual yang glamor saja. Kepercayaan lahir dari bukti bahwa kami mampu mendeploy, menghubungkan database, dan merawat sistem agar tetap berjalan andal pasca-launch.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {proofPoints.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * index }}
            className="rounded-[8px] neo-surface p-5 bg-surface"
          >
            <item.icon className="mb-3 h-5 w-5 text-accent" />
            <h2 className="mb-2 text-sm font-bold text-foreground">{item.title}</h2>
            <p className="text-xs leading-relaxed text-neutral-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <LiveMetrics />
    </div>
  );
}
