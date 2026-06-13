"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/context/LanguageContext";
import { personalInfo } from "@/lib/data/personalInfo";
import {
  ArrowUpRight,
  Building2,
  CheckCircle2,
  Code2,
  Database,
  Globe,
  Headphones,
  Mail,
  Palette,
  Shield,
  Target,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function StudioDeckPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const stats = [
    {
      value: "7+",
      label: isEn ? "production systems shipped" : "sistem production yang sudah dikirim",
    },
    {
      value: "250K+",
      label: isEn ? "records touched by real workflows" : "record yang pernah disentuh workflow nyata",
    },
    {
      value: "Founder-led",
      label: isEn ? "communication stays direct" : "komunikasi tetap langsung ke orang yang ngerjain",
    },
    {
      value: "Bandung",
      label: isEn ? "remote delivery across Indonesia" : "basis kerja, dengan delivery remote ke seluruh Indonesia",
    },
  ];

  const offerTracks = [
    {
      icon: Palette,
      title: isEn ? "Company profile and landing page polish" : "Polish company profile dan landing page",
      desc: isEn
        ? "For businesses that already have a service, but the current web surface still looks weak, unclear, or not ready to close."
        : "Untuk bisnis yang sebenarnya sudah punya layanan, tapi surface web-nya masih terlihat lemah, tidak jelas, atau belum siap closing.",
    },
    {
      icon: Database,
      title: isEn ? "Internal dashboard and workflow cleanup" : "Dashboard internal dan workflow cleanup",
      desc: isEn
        ? "For teams that still move too much work through chat, spreadsheets, and repeated manual follow-up."
        : "Untuk tim yang masih terlalu banyak menggerakkan kerja lewat chat, spreadsheet, dan follow-up manual berulang.",
    },
    {
      icon: Code2,
      title: isEn ? "Custom systems shaped by real operations" : "Sistem custom yang dibentuk dari operasional nyata",
      desc: isEn
        ? "For cases where the business flow matters more than installing another generic template or boilerplate stack."
        : "Untuk kasus di mana flow bisnis jauh lebih penting daripada sekadar pasang template atau boilerplate generik.",
    },
  ];

  const differences = [
    {
      icon: Shield,
      title: isEn ? "Less agency theater" : "Minim agency theater",
      desc: isEn
        ? "The work is intentionally practical. Less deck inflation, more scope clarity, usable output, and honest tradeoffs."
        : "Cara kerjanya sengaja dibuat praktis. Lebih sedikit deck yang dibesar-besarkan, lebih banyak kejelasan scope, output yang bisa dipakai, dan tradeoff yang jujur.",
    },
    {
      icon: Target,
      title: isEn ? "Operations-first perspective" : "Sudut pandang operations-first",
      desc: isEn
        ? "The system is designed around bottlenecks, approvals, handoffs, data entry pressure, and the team's real daily rhythm."
        : "Sistem dirancang dari bottleneck, approval, handoff, tekanan input data, dan ritme kerja harian tim yang sebenarnya.",
    },
    {
      icon: Zap,
      title: isEn ? "Faster path to something usable" : "Jalur lebih cepat ke output yang bisa dipakai",
      desc: isEn
        ? "The goal is not to look busy for months. The goal is to get to a clean, working surface as early as possible."
        : "Tujuannya bukan terlihat sibuk berbulan-bulan. Tujuannya adalah sampai ke surface yang rapi dan bisa dipakai secepat mungkin.",
    },
    {
      icon: Users,
      title: isEn ? "Founder-led collaboration" : "Kolaborasi langsung dengan founder",
      desc: isEn
        ? "The person breaking down the problem is also the person shaping the build direction, so context loss stays low."
        : "Orang yang membedah problem juga orang yang mengarahkan build-nya, jadi context loss tetap rendah.",
    },
  ];

  const engagementModes = [
    {
      icon: Building2,
      title: isEn ? "Polish what already exists" : "Poles yang sudah ada",
      desc: isEn
        ? "Best when the business already has a website or system, but trust, structure, or usability still feels weak."
        : "Paling cocok saat bisnis sudah punya website atau sistem, tapi trust, struktur, atau usability-nya masih terasa lemah.",
    },
    {
      icon: Globe,
      title: isEn ? "Build a cleaner new surface" : "Bangun surface baru yang lebih rapi",
      desc: isEn
        ? "Best when the business wants a sharper public-facing page, better explanation of services, and clearer CTA."
        : "Paling cocok saat bisnis ingin surface publik yang lebih tajam, penjelasan layanan yang lebih rapi, dan CTA yang lebih jelas.",
    },
    {
      icon: Headphones,
      title: isEn ? "Continue after launch" : "Lanjut setelah launch",
      desc: isEn
        ? "Best when the first version is already live and needs iteration based on real usage, team friction, or conversion gaps."
        : "Paling cocok saat versi pertama sudah live dan butuh iterasi dari penggunaan nyata, friction tim, atau gap conversion.",
    },
  ];

  const process = [
    {
      step: "01",
      title: isEn ? "Problem teardown" : "Bedah masalah",
      desc: isEn ? "Clarify what is weak today and what should improve first." : "Jelaskan apa yang lemah hari ini dan apa yang harus dibenahi lebih dulu.",
    },
    {
      step: "02",
      title: isEn ? "Direction and scope" : "Arah dan scope",
      desc: isEn ? "Translate the problem into a realistic first build path." : "Terjemahkan problem menjadi jalur build pertama yang realistis.",
    },
    {
      step: "03",
      title: isEn ? "Build and tighten" : "Build dan perapihan",
      desc: isEn ? "Ship the working surface, then tighten structure and experience." : "Kirim surface yang bekerja dulu, lalu rapikan struktur dan pengalaman pakainya.",
    },
    {
      step: "04",
      title: isEn ? "Handoff and next steps" : "Handoff dan langkah lanjut",
      desc: isEn ? "Make sure the client team can actually use and continue it." : "Pastikan tim client benar-benar bisa pakai dan melanjutkannya.",
    },
  ];

  const fitNotes = isEn
    ? [
        "Good fit when the business wants a sharper surface that can actually convert trust into action.",
        "Good fit when the team already feels the pain of manual work and wants a cleaner internal flow.",
        "Good fit when the client prefers a practical partner, not a presentation-heavy process.",
      ]
    : [
        "Cocok saat bisnis butuh surface yang lebih meyakinkan dan benar-benar bisa mengubah trust jadi aksi.",
        "Cocok saat tim sudah merasakan sakitnya kerja manual dan ingin flow internal yang lebih rapi.",
        "Cocok saat client lebih suka partner yang praktis, bukan proses yang berat di presentasi.",
      ];

  return (
    <div className="mx-auto max-w-5xl space-y-10 pb-12">
      <motion.div {...fadeUp} className="rounded-[35px] card-elevated bg-[#FAFAFA] p-6 md:p-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c4956a]/20 bg-[#f7f3e8] px-3 py-1 text-xs font-semibold text-[#a67d55]">
            <Building2 className="h-3.5 w-3.5" />
            {isEn ? "Studio deck" : "Profil studio"}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
            {isEn
              ? "nasaq.id builds web surfaces and internal systems that make businesses look more trusted and work more cleanly."
              : "nasaq.id membangun surface web dan sistem internal yang membuat bisnis terlihat lebih dipercaya dan bekerja lebih rapi."}
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            {isEn
              ? "This page is the short version of how the studio works, what clients usually hire it for, and why founder-led execution can move faster for practical business problems."
              : "Halaman ini adalah versi singkat tentang cara kerja studio ini, jenis kebutuhan yang paling sering masuk, dan kenapa execution yang founder-led bisa bergerak lebih cepat untuk problem bisnis yang praktis."}
          </p>
          <div className="flex flex-wrap gap-2 pt-1 text-xs text-neutral-500">
            <span className="rounded-full border border-neutral-300 px-3 py-1">{isEn ? "Bandung based" : "Berbasis di Bandung"}</span>
            <span className="rounded-full border border-neutral-300 px-3 py-1">{isEn ? "Remote across Indonesia" : "Remote untuk client di seluruh Indonesia"}</span>
            <span className="rounded-full border border-neutral-300 px-3 py-1">{personalInfo.contact.email}</span>
          </div>
        </div>
      </motion.div>

      <ScrollReveal>
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="rounded-[28px] card-elevated bg-[#FAFAFA] p-5">
              <div className="text-2xl font-extrabold text-[#c4956a]">{item.value}</div>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">{item.label}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="space-y-4 rounded-[35px] card-elevated bg-[#FAFAFA] p-6 md:p-8">
          <h2 className="text-xl font-bold text-neutral-900">
            {isEn ? "What businesses usually hire nasaq.id for" : "Kebutuhan yang paling sering dikerjakan nasaq.id"}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {offerTracks.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[28px] card-elevated bg-[#f7f3e8] p-5"
              >
                <item.icon className="mb-3 h-5 w-5 text-[#c4956a]" />
                <h3 className="mb-2 text-sm font-bold text-neutral-900">{item.title}</h3>
                <p className="text-xs leading-relaxed text-neutral-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="space-y-4 rounded-[35px] card-elevated bg-[#FAFAFA] p-6 md:p-8">
          <h2 className="text-xl font-bold text-neutral-900">
            {isEn ? "Why founder-led execution feels different" : "Kenapa execution founder-led terasa beda"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {differences.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[28px] card-elevated bg-[#FAFAFA] p-5"
              >
                <item.icon className="mb-3 h-5 w-5 text-[#c4956a]" />
                <h3 className="mb-2 text-sm font-bold text-neutral-900">{item.title}</h3>
                <p className="text-xs leading-relaxed text-neutral-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="space-y-4 rounded-[35px] card-elevated bg-[#FAFAFA] p-6 md:p-8">
          <h2 className="text-xl font-bold text-neutral-900">
            {isEn ? "Three common engagement formats" : "Tiga format kerja yang paling umum"}
          </h2>
          <div className="grid gap-4 md:grid-cols-3">
            {engagementModes.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[28px] card-elevated bg-[#f7f3e8] p-5"
              >
                <item.icon className="mb-3 h-5 w-5 text-[#c4956a]" />
                <h3 className="mb-2 text-sm font-bold text-neutral-900">{item.title}</h3>
                <p className="text-xs leading-relaxed text-neutral-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="space-y-4 rounded-[35px] card-elevated bg-[#FAFAFA] p-6 md:p-8">
          <h2 className="text-xl font-bold text-neutral-900">
            {isEn ? "Typical project rhythm" : "Ritme project yang biasanya dipakai"}
          </h2>
          <div className="grid gap-4 md:grid-cols-4">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="space-y-3 rounded-[28px] card-elevated bg-[#FAFAFA] p-5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c4956a] text-xs font-bold text-white">
                  {item.step}
                </div>
                <h3 className="text-sm font-bold text-neutral-900">{item.title}</h3>
                <p className="text-xs leading-relaxed text-neutral-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[35px] card-elevated bg-[#FAFAFA] p-6 md:p-8">
            <div className="mb-4 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#c4956a]" />
              <h2 className="text-xl font-bold text-neutral-900">{isEn ? "Good fit" : "Cocok untuk"}</h2>
            </div>
            <ul className="space-y-3 text-sm leading-relaxed text-neutral-600">
              {fitNotes.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#c4956a]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[35px] card-elevated bg-[#FAFAFA] p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a67d55]">
              {isEn ? "Next step" : "Langkah berikutnya"}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-neutral-900">
              {isEn ? "If the direction already feels clear, send the brief." : "Kalau arahnya sudah terasa jelas, kirim brief-nya."}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-600">
              {isEn
                ? "A short explanation of the current problem, target outcome, and rough timeline is enough to start a useful conversation."
                : "Penjelasan singkat soal problem saat ini, outcome yang diinginkan, dan timeline kasar sudah cukup untuk mulai percakapan yang berguna."}
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/order"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#c4956a] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#a67d55]"
              >
                {isEn ? "Open project brief" : "Buka brief project"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-400 px-6 py-3 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-50"
              >
                <Mail className="h-4 w-4" />
                {isEn ? "Talk first" : "Diskusi dulu"}
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
