"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data/personalInfo";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { AvatarImage } from "@/components/AvatarImage";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Rocket,
  Code,
  Lightbulb,
  Target,
  Heart,
  Zap,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

export default function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="max-w-3xl mx-auto space-y-10 pb-12">
      {/* Header */}
      <motion.div {...fadeUp} className="flex items-start gap-6">
        <div className="shrink-0 hidden md:block">
          <div className="ring-4 ring-emerald-500/30 rounded-full">
            <AvatarImage size={120} priority />
          </div>
        </div>
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white mb-2">
            {language === "en" ? "About Me" : "Tentang Saya"}
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 text-sm md:text-base leading-relaxed">
            {language === "en"
              ? "Developer, builder, and comeback story in progress."
              : "Developer, builder, dan comeback story yang sedang berjalan."}
          </p>
        </div>
      </motion.div>

      {/* The Comeback Story */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Rocket className="w-5 h-5 text-emerald-500" />
            {language === "en" ? "The Comeback Story" : "Cerita Comeback"}
          </h2>
          <div className="prose prose-sm dark:prose-invert max-w-none space-y-3 text-zinc-600 dark:text-zinc-400">
            <p>
              {language === "en"
                ? "I stepped away from serious tech work in 2015. Not by choice — life happened. I worked as a waiter, logistics admin, QC staff, and sales marketing. For 9 years, production-grade development was off the table — though I'd occasionally tinker with scripts and small tools on the side."
                : "Saya meninggalkan pekerjaan serius di dunia tech di 2015. Bukan karena pilihan — kehidupan terjadi. Saya bekerja sebagai waiter, admin logistik, staf QC, dan sales marketing. Selama 9 tahun, development level production tidak ada di radar — walau sesekali iseng bikin script kecil dan tools sebagai project pribadi."}
            </p>
            <p>
              {language === "en"
                ? "In 2024, I came back. This time with modern tooling and a production-first mindset. Within 12 months, I shipped 4 production systems processing 250K+ records — from logistics QC at J&T Express to POS systems for real retail clients."
                : "Di 2024, saya kembali. Kali ini dengan tooling modern dan mindset production-first. Dalam 12 bulan, saya mengirim 4 sistem production yang memproses 250K+ records — dari QC logistik di J&T Express sampai sistem POS untuk client ritel nyata."}
            </p>
            <p>
              {language === "en"
                ? "The 9-year gap wasn't wasted. Working in operations, logistics, and retail taught me how real businesses actually work — the pain points, the workflows, the things that matter. Now I build solutions for those problems because I've lived them."
                : "Gap 9 tahun bukan sia-sia. Bekerja di operasional, logistik, dan ritel mengajarkan saya bagaimana bisnis nyata benar-benar berjalan — pain points, workflow, hal-hal yang penting. Sekarang saya membangun solusi untuk masalah-masalah itu karena saya pernah mengalaminya."}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* How I Work */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-emerald-500" />
            {language === "en" ? "How I Work" : "Cara Saya Bekerja"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: Zap,
                title: language === "en" ? "Rapid Iteration" : "Iterasi Cepat",
                desc: language === "en"
                  ? "Modern tooling handles boilerplate. I focus on architecture, business logic, and the decisions that matter."
                  : "Tooling modern menangani boilerplate. Saya fokus pada arsitektur, business logic, dan keputusan yang penting.",
              },
              {
                icon: Target,
                title: language === "en" ? "Production-First" : "Production-First",
                desc: language === "en"
                  ? "Every project ships to real users. No demo-ware, no portfolio toys. If it doesn't solve a real problem, I don't build it."
                  : "Setiap project dikirim ke user nyata. Bukan demo, bukan mainan portfolio. Kalau tidak menyelesaikan masalah nyata, saya tidak membangunnya.",
              },
              {
                icon: Code,
                title: language === "en" ? "Full-Stack Ownership" : "Full-Stack Ownership",
                desc: language === "en"
                  ? "Database design to deployment. I own the entire stack — not just a layer. DDD, clean architecture, type-safe end-to-end."
                  : "Dari desain database ke deployment. Saya memiliki seluruh stack — bukan hanya satu layer. DDD, clean architecture, type-safe end-to-end.",
              },
              {
                icon: Heart,
                title: language === "en" ? "Ship Fast, Learn Faster" : "Ship Fast, Learn Faster",
                desc: language === "en"
                  ? "MVP in weeks, not months. Get it in front of real users, gather feedback, iterate. Speed is a feature."
                  : "MVP dalam minggu, bukan bulan. Taruh di depan user nyata, kumpulkan feedback, iterasi. Kecepatan adalah fitur.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4"
              >
                <item.icon className="w-5 h-5 text-emerald-500 mb-2" />
                <h3 className="font-bold text-sm text-zinc-900 dark:text-white mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* What I'm Looking For */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-emerald-500" />
            {language === "en" ? "What I'm Looking For" : "Yang Saya Cari"}
          </h2>
          <div className="bg-gradient-to-br from-emerald-50 to-zinc-50 dark:from-emerald-950/30 dark:to-zinc-900 border border-emerald-200 dark:border-emerald-800/30 rounded-xl p-5 space-y-3">
            <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              {(language === "en"
                ? [
                    "Full-time or contract roles as Full-stack Developer",
                    "Teams that value shipping speed and real-world impact",
                    "Projects where I can own the stack end-to-end",
                    "Environments that value shipping velocity and clean code",
                  ]
                : [
                    "Full-time atau kontrak sebagai Full-stack Developer",
                    "Tim yang menghargai kecepatan shipping dan dampak nyata",
                    "Project dimana saya bisa memiliki stack end-to-end",
                    "Lingkungan yang menghargai kecepatan shipping dan kode bersih",
                  ]
              ).map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-500 mt-0.5">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </ScrollReveal>

      {/* Beyond Code */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            <Heart className="w-5 h-5 text-emerald-500" />
            {language === "en" ? "Beyond Code" : "Di Luar Coding"}
          </h2>
          <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-2">
            <p>
              {language === "en"
                ? "Military-trained (Resimen Mahasiswa & Korps Marinir — basic paratrooper). The discipline translates directly to how I approach engineering: structured, methodical, mission-oriented."
                : "Latihan militer (Resimen Mahasiswa & Korps Marinir — pasukan udara dasar). Disiplin tersebut langsung tercermin dalam cara saya mendekati engineering: terstruktur, metodis, berorientasi misi."}
            </p>
            <p>
              {language === "en"
                ? "Based in Bandung, Indonesia. I speak Indonesian (native), Sundanese (native), and English (basic). When I'm not coding, I'm exploring Web3 protocols and building side projects on Solana."
                : "Berdomisili di Bandung, Indonesia. Saya berbicara Bahasa Indonesia (asli), Bahasa Sunda (asli), dan Inggris (dasar). Saat tidak coding, saya mengeksplorasi protokol Web3 dan membangun side project di Solana."}
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <div className="flex flex-wrap gap-3 pt-4">
          <Link
            href="/cv"
            className="group inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20"
          >
            {t.viewCV}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 dark:text-white text-zinc-900 rounded-xl text-sm font-semibold transition-all"
          >
            {t.contactMe}
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
