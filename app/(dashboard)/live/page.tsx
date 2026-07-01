"use client";

import { motion } from "framer-motion";
import { LiveMetrics } from "@/components/sections/LiveMetrics";
import { useLanguage } from "@/lib/context/LanguageContext";
import { Activity, Database, ShieldCheck, Zap } from "lucide-react";

export default function LivePage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const proofPoints = [
    {
      icon: Database,
      title: isEn ? "Real usage signals" : "Sinyal penggunaan nyata",
      desc: isEn
        ? "This page exists to show that the work is not just mockup-deep. Some projects already process real records and daily activity."
        : "Halaman ini ada untuk menunjukkan bahwa kerjaannya bukan berhenti di mockup. Beberapa project sudah memproses record nyata dan aktivitas harian.",
    },
    {
      icon: ShieldCheck,
      title: isEn ? "Proof before claims" : "Bukti sebelum klaim",
      desc: isEn
        ? "Instead of asking clients to imagine capability, nasaq.id surfaces live or recently fetched metrics from working systems."
        : "Daripada minta client membayangkan kapabilitas, nasaq.id menampilkan metrik live atau metrik yang baru diambil dari sistem yang berjalan.",
    },
    {
      icon: Zap,
      title: isEn ? "Operational relevance" : "Relevansi operasional",
      desc: isEn
        ? "The important part is not animation. It is whether the system is actually used, updated, and helpful to the team."
        : "Yang penting bukan animasinya. Yang penting apakah sistemnya benar-benar dipakai, ter-update, dan berguna buat tim.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[35px] neo-surface p-6 md:p-8"
      >
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c4956a]/20 bg-[#f7f3e8] px-3 py-1 text-xs font-semibold text-[#a67d55]">
            <Activity className="h-3.5 w-3.5" />
            {isEn ? "Live proof" : "Live proof"}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl">
            {isEn ? "Running systems are the strongest credibility layer." : "Sistem yang benar-benar berjalan adalah lapisan trust paling kuat."}
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            {isEn
              ? "For service businesses, trust does not only come from design polish. It also comes from proof that the team can ship, connect data, and maintain something that stays useful after launch."
              : "Untuk bisnis jasa, trust tidak datang dari design polish saja. Trust juga datang dari bukti bahwa timnya bisa shipping, menghubungkan data, dan menjaga sesuatu tetap berguna setelah launch."}
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
            className="rounded-[28px] neo-surface p-5"
          >
            <item.icon className="mb-3 h-5 w-5 text-[#c4956a]" />
            <h2 className="mb-2 text-sm font-bold text-neutral-900">{item.title}</h2>
            <p className="text-xs leading-relaxed text-neutral-600">{item.desc}</p>
          </motion.div>
        ))}
      </div>

      <LiveMetrics />
    </div>
  );
}
