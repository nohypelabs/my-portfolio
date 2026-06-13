"use client";

import { motion } from "framer-motion";
import { AvatarImage } from "@/components/AvatarImage";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/context/LanguageContext";
import {
  ArrowUpRight,
  Building2,
  Code,
  Globe,
  Lightbulb,
  Link as LinkIcon,
  Rocket,
  ShoppingCart,
  Target,
  Truck,
  Zap,
} from "lucide-react";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const isEn = language === "en";

  const studioTracks = [
    {
      icon: Globe,
      title: isEn ? "Company Profile That Feels Credible" : "Company Profile yang Terasa Kredibel",
      desc: isEn
        ? "Landing pages and company profiles that make the business look serious, clear, and ready to close."
        : "Landing page dan company profile yang membuat bisnis terlihat serius, jelas, dan siap closing.",
    },
    {
      icon: Building2,
      title: isEn ? "Internal Systems That Cut Friction" : "Sistem Internal yang Mengurangi Ribet",
      desc: isEn
        ? "Dashboards, admin panels, and workflows that reduce repeated manual work in daily operations."
        : "Dashboard, admin panel, dan workflow yang mengurangi kerja manual berulang di operasional harian.",
    },
    {
      icon: Code,
      title: isEn ? "Custom Web Builds for Real Use" : "Build Custom untuk Kebutuhan Nyata",
      desc: isEn
        ? "Not template dumping. Each build starts from the business problem, then the system follows."
        : "Bukan sekadar pasang template. Setiap build dimulai dari masalah bisnis, lalu sistem mengikuti.",
    },
  ];

  const workStyle = [
    {
      icon: Lightbulb,
      title: isEn ? "Start from bottlenecks" : "Mulai dari bottleneck",
      desc: isEn
        ? "I map what slows the team down before touching visual or technical decisions."
        : "Saya petakan apa yang bikin tim melambat sebelum menyentuh keputusan visual atau teknis.",
    },
    {
      icon: Zap,
      title: isEn ? "Ship lean, iterate fast" : "Build cepat, iterasi cepat",
      desc: isEn
        ? "Priority is early working output, then polish based on real use and feedback."
        : "Prioritasnya output yang cepat dipakai dulu, lalu dipoles dari penggunaan dan feedback nyata.",
    },
    {
      icon: Target,
      title: isEn ? "Keep the scope practical" : "Jaga scope tetap praktis",
      desc: isEn
        ? "I avoid layers, features, and motion that look expensive but do not help conversion or operations."
        : "Saya hindari layer, fitur, dan motion yang terlihat mahal tapi tidak membantu conversion atau operasional.",
    },
    {
      icon: Rocket,
      title: isEn ? "Build for handoff" : "Bangun supaya gampang diteruskan",
      desc: isEn
        ? "The output should be usable by the client team, not depend forever on hidden context."
        : "Output harus bisa dipakai tim client, bukan selamanya tergantung pada konteks yang disimpan sendiri.",
    },
  ];

  const fieldContext = [
    {
      icon: Truck,
      title: isEn ? "Logistics & field operations" : "Logistik & operasional lapangan",
      desc: isEn
        ? "QC flow, fleet tracking, documentation pressure, and repetitive admin work are familiar terrain."
        : "Flow QC, fleet tracking, tekanan dokumentasi, dan admin berulang adalah medan yang sangat familiar.",
    },
    {
      icon: ShoppingCart,
      title: isEn ? "Retail & daily transactions" : "Ritel & transaksi harian",
      desc: isEn
        ? "Cashier flow, product changes, stock movement, and outlet realities shape how the system should behave."
        : "Flow kasir, perubahan produk, pergerakan stok, dan realita outlet membentuk bagaimana sistem harus bekerja.",
    },
    {
      icon: LinkIcon,
      title: isEn ? "Digital products with stronger UX" : "Produk digital dengan UX yang lebih kuat",
      desc: isEn
        ? "From company profiles to custom dashboards, the interface has to look intentional and reduce confusion."
        : "Dari company profile sampai dashboard custom, interface harus terasa sengaja dirancang dan mengurangi bingung.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      <motion.div {...fadeUp} className="rounded-[35px] border border-neutral-400 bg-[#FAFAFA] p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="shrink-0">
            <div className="inline-flex rounded-full ring-4 ring-[#c4956a]/20">
              <AvatarImage size={108} priority />
            </div>
          </div>

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#c4956a]/20 bg-[#f7f3e8] px-3 py-1 text-xs font-semibold text-[#a67d55]">
              <Building2 className="h-3.5 w-3.5" />
              {isEn ? "Founder-led studio" : "Founder-led studio"}
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl">
                {isEn ? "The founder behind nasaq.id" : "Founder di balik nasaq.id"}
              </h1>
              <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
                {isEn
                  ? "nasaq.id is built as a practical studio for businesses that need a sharper web presence and cleaner internal workflows. The goal is simple: make the business look more trusted and make the team work with less friction."
                  : "nasaq.id dibangun sebagai studio yang praktis untuk bisnis yang butuh web presence lebih tajam dan workflow internal yang lebih rapi. Tujuannya sederhana: bikin bisnis terlihat lebih dipercaya dan tim bekerja dengan friction yang lebih kecil."}
              </p>
              <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
                {isEn
                  ? "My background is not agency-only or purely design-first. I spent years around real operations, logistics, retail, and field processes. That is why the work here tends to stay grounded: the page must help sales, the dashboard must help the team, and the system must match reality."
                  : "Latar saya bukan cuma agency atau murni design-first. Saya bertahun-tahun dekat dengan operasional nyata, logistik, ritel, dan proses lapangan. Itu sebabnya pekerjaan di sini cenderung membumi: page harus bantu sales, dashboard harus bantu tim, dan sistem harus cocok dengan kenyataan di lapangan."}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      <ScrollReveal>
        <div className="space-y-4 rounded-[35px] border border-neutral-400 bg-[#FAFAFA] p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-900">
            <Target className="h-5 w-5 text-[#c4956a]" />
            {isEn ? "What nasaq.id is built to solve" : "Masalah yang ingin diselesaikan nasaq.id"}
          </h2>

          <div className="grid gap-4 md:grid-cols-3">
            {studioTracks.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[28px] border border-neutral-400 bg-[#f7f3e8] p-5"
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
        <div className="space-y-4 rounded-[35px] border border-neutral-400 bg-[#FAFAFA] p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-900">
            <Zap className="h-5 w-5 text-[#c4956a]" />
            {isEn ? "How the work is approached" : "Cara kerja yang dipakai"}
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {workStyle.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[28px] border border-neutral-400 bg-[#FAFAFA] p-5"
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
        <div className="space-y-4 rounded-[35px] border border-neutral-400 bg-[#FAFAFA] p-6">
          <h2 className="flex items-center gap-2 text-xl font-bold text-neutral-900">
            <Lightbulb className="h-5 w-5 text-[#c4956a]" />
            {isEn ? "Why the perspective is different" : "Kenapa sudut pandangnya terasa beda"}
          </h2>

          <p className="text-sm leading-relaxed text-neutral-600">
            {isEn
              ? "A lot of digital surfaces fail because they are designed too far from the people who actually use them. The point of nasaq.id is not to stack features. It is to build something that looks intentional, feels clear, and survives day-to-day usage."
              : "Banyak surface digital gagal karena dirancang terlalu jauh dari orang yang benar-benar memakainya. Poin nasaq.id bukan menumpuk fitur. Poinnya adalah membangun sesuatu yang terasa sengaja dirancang, mudah dipahami, dan tahan dipakai sehari-hari."}
          </p>

          <div className="grid gap-4 md:grid-cols-3">
            {fieldContext.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                className="rounded-[28px] border border-neutral-400 bg-[#f7f3e8] p-5"
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
        <div className="rounded-[35px] border border-neutral-400 bg-[#FAFAFA] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a67d55]">
                {isEn ? "Next step" : "Langkah berikutnya"}
              </p>
              <h2 className="text-2xl font-bold text-neutral-900">
                {isEn ? "If the business is ready, send the brief." : "Kalau bisnisnya sudah siap, kirim brief-nya."}
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                {isEn
                  ? "The best projects usually start with a clear problem statement, a real workflow, and one priority outcome. That is enough to begin."
                  : "Project yang paling enak dikerjakan biasanya dimulai dari problem statement yang jelas, workflow yang nyata, dan satu outcome prioritas. Itu sudah cukup untuk mulai."}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/order"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#c4956a] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#a67d55]"
              >
                {isEn ? "Send project brief" : "Kirim brief project"}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/live"
                className="inline-flex items-center gap-2 rounded-xl border border-neutral-400 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-50"
              >
                {isEn ? "See live proof" : "Lihat live proof"}
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
