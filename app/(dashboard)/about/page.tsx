'use client';

import { motion } from 'framer-motion';
import { AvatarImage } from '@/components/AvatarImage';
import { ScrollReveal } from '@/components/ScrollReveal';
import {
  ArrowRight,
  Building2,
  Code,
  FileText,
  Globe,
  GraduationCap,
  Sparkles,
  Target,
  Wrench,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function AboutPage() {
  const stats = [
    {
      value: '7+',
      label: 'sistem skala produksi rilis',
    },
    {
      value: '340rb+',
      label: 'resi logistik terproses otomatis',
    },
    {
      value: 'Langsung',
      label: 'komunikasi langsung tanpa perantara',
    },
    {
      value: 'Bandung',
      label: 'remote delivery seluruh Indonesia',
    },
  ];

  const studioTracks = [
    {
      icon: Globe,
      title: 'Company Profile Kredibel',
      desc: 'Brosur digital interaktif dan landing page konversi yang membuat bisnis Anda terlihat kokoh, serius, dan siap closing.',
    },
    {
      icon: Building2,
      title: 'Sistem Operasional Lapangan',
      desc: 'Dashboard internal, sinkronisasi stok multi-outlet, pencatatan otomatis, serta pelacakan kurir GPS real-time.',
    },
    {
      icon: Code,
      title: 'Backend & Integrasi API kustom',
      desc: 'Sentralisasi database PostgreSQL, API kustom, integrasi payment gateway, dan otomasi alur data bebas spreadsheet manual.',
    },
  ];

  const techSkills = [
    { category: 'Frontend', items: 'Next.js, React, TypeScript, TailwindCSS, Framer Motion' },
    { category: 'Backend & API', items: 'Node.js, Express, tRPC, Python, REST API' },
    { category: 'Penyimpanan', items: 'PostgreSQL, Supabase, Prisma ORM, Redis' },
    { category: 'DevOps & Tools', items: 'Docker, Git, Vercel, Railway, CI/CD' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* 1. PROFILE HEADER */}
      <motion.div {...fadeUp} className="rounded-[8px] neo-surface p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="shrink-0 mx-auto md:mx-0">
            <div className="inline-flex rounded-full border-4 border-foreground shadow-[4px_4px_0_0_var(--color-accent)] overflow-hidden">
              <AvatarImage size={108} priority />
            </div>
          </div>

          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-surface px-3 py-1 text-xs font-semibold text-accent-dark">
              <Building2 className="h-3.5 w-3.5" />
              Digital Product Studio
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Kenalkan Founder nasaq.id
              </h1>
              <p className="text-sm leading-relaxed text-neutral-600">
                nasaq.id didirikan oleh developer praktis yang percaya bahwa software yang baik lahir dari pemahaman mendalam tentang masalah nyata di lapangan. Kami tidak suka birokrasi berbelit atau &ldquo;agency theater&rdquo; yang lambat dan mahal.
              </p>
              <p className="text-sm leading-relaxed text-neutral-600">
                Founder kami sempat menyelesaikan D3 Teknik Informatika hingga 104 SKS sebelum terpaksa terhenti akibat kendala biaya kuliah. Namun, ia menghabiskan 9 tahun berikutnya bekerja langsung di operasional ritel, logistik, dan pergudangan fisik Indonesia. Pengalaman langsung ini membentuk cara kami mendesain software: sistem harus membumi, mempermudah admin, membantu penjualan, dan bekerja andal di lapangan.
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. STATS */}
      <ScrollReveal>
        <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-[8px] neo-surface bg-surface p-4 text-center">
              <div className="text-2xl font-extrabold text-accent font-mono">{item.value}</div>
              <p className="mt-2 text-[10px] leading-relaxed font-bold font-mono text-neutral-500 uppercase">{item.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* 3. MASALAH YANG KAMI SELESAIKAN */}
      <ScrollReveal>
        <div className="space-y-4 rounded-[8px] neo-surface p-6 bg-surface">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Target className="h-4.5 w-4.5 text-accent" strokeWidth={2.2} />
            Kebutuhan yang Paling Sering Kami Selesaikan
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {studioTracks.map((item) => (
              <div
                key={item.title}
                className="rounded-[6px] border border-foreground/20 p-4 bg-background"
              >
                <item.icon className="mb-3 h-5 w-5 text-accent" strokeWidth={2.2} />
                <h3 className="mb-1.5 text-xs font-bold text-foreground font-mono">{item.title}</h3>
                <p className="text-[11px] leading-relaxed text-neutral-500 font-mono">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* 4. KEAHLIAN TEKNIS */}
      <ScrollReveal>
        <div className="space-y-4 rounded-[8px] neo-surface p-6 bg-surface">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Wrench className="h-4.5 w-4.5 text-accent" strokeWidth={2.2} />
            Spesifikasi & Keahlian Teknis
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {techSkills.map((skill) => (
              <div key={skill.category} className="rounded-[6px] border border-foreground/15 p-4 bg-background font-mono">
                <h3 className="text-xs font-bold text-accent-dark uppercase tracking-wider mb-1">{skill.category}</h3>
                <p className="text-[11px] leading-relaxed text-neutral-600">{skill.items}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* 5. PENDIDIKAN & LATAR BELAKANG */}
      <ScrollReveal>
        <div className="space-y-4 rounded-[8px] neo-surface p-6 bg-surface">
          <h2 className="flex items-center gap-2 text-lg font-bold text-foreground">
            <GraduationCap className="h-4.5 w-4.5 text-accent" strokeWidth={2.2} />
            Latar Belakang & Pendidikan
          </h2>

          <div className="space-y-3 font-mono text-[12px] leading-relaxed text-neutral-600">
            <div className="rounded-[4px] border border-foreground/10 bg-background/50 p-4">
              <p className="font-bold text-foreground text-xs">D3 Teknik Informatika (Unfinished)</p>
              <p className="text-[10px] text-neutral-400">104 / 114 SKS Selesai — Terhenti karena kendala biaya kuliah</p>
              <p className="mt-2">Meskipun perkuliahan formal terhenti, founder tidak pernah berhenti melakukan eksplorasi coding mandiri. Keahlian utama Next.js, tRPC, dan PostgreSQL diperoleh dari pengerjaan proyek riil skala produksi.</p>
            </div>

            <div className="rounded-[4px] border border-foreground/10 bg-background/50 p-4">
              <p className="font-bold text-foreground text-xs">9 Tahun di Lapangan Ritel & Logistik</p>
              <p className="text-[10px] text-neutral-400">Operasional Lapangan, Supervisi Stok, & Alur Gudang</p>
              <p className="mt-2">Bekerja langsung di lantai gudang logistik dan operasional ritel multi-cabang. Memahami secara detail bagaimana sistem kasir hang menghambat antrean pembeli, atau bagaimana data input resi manual memakan waktu tim berjam-jam.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* FOOTER CTA & DOWNLOAD DECK */}
      <ScrollReveal>
        <div className="rounded-[8px] neo-surface p-6 md:p-8 bg-surface">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-[10px] font-bold font-mono uppercase tracking-[0.24em] text-accent-dark">Unduh Dokumen Profil</p>
              <h2 className="text-2xl font-extrabold text-foreground">Butuh Profil Cetak / Dokumen Pitch?</h2>
              <p className="text-xs leading-relaxed text-neutral-500 max-w-xl font-mono">
                Anda dapat mengunduh Ringkasan Profil Studio (Studio Deck/Resume) dalam format PDF resmi untuk dibagikan dengan tim atau manajemen Anda.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href="/api/cv/pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] border-2 border-foreground bg-surface px-5 py-3 text-xs font-bold text-foreground shadow-[3px_3px_0px_#141414] hover:-translate-y-0.5 transition-all"
              >
                <FileText className="h-4.5 w-4.5 text-accent" strokeWidth={2.2} />
                Unduh Profil PDF
              </a>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 rounded-[4px] border-2 border-foreground bg-foreground text-background px-5 py-3 text-xs font-bold shadow-[3px_3px_0px_var(--color-accent)] hover:-translate-y-0.5 transition-all"
              >
                Lihat Showcase
                <ArrowRight className="h-4.5 w-4.5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
