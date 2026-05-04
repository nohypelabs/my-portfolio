"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data/personalInfo";
import {
  ArrowUpRight,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { AvatarImage } from "@/components/AvatarImage";
import { HeroBackground } from "@/components/HeroBackground";
import { TextReveal } from "@/components/TextReveal";
import { LiveMetrics } from "@/components/sections/LiveMetrics";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function DashboardPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [heroExpanded, setHeroExpanded] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      {/* ── Hero ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="noise-overlay relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 dark:from-zinc-950 dark:via-zinc-950 dark:to-emerald-950 rounded-3xl p-8 md:p-12 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        <HeroBackground />
        <div className="relative flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="shrink-0 hidden md:block">
            <div className="ring-4 ring-emerald-500/30 rounded-full">
              <AvatarImage size={100} priority />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold text-emerald-400">
                {language === "en" ? "Open for full-time & contract" : "Tersedia full-time & kontrak"}
              </span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-2">
              <TextReveal text={t.heroHeadline} delay={0.3} />
            </h1>
            <div className="w-12 h-0.5 bg-emerald-500/40 rounded-full mb-4" />
            <div className="max-w-2xl">
              <p className={`text-zinc-400 text-sm md:text-base leading-relaxed text-justify ${!heroExpanded ? "line-clamp-2 md:line-clamp-none" : ""}`}>
                {t.heroNarrative}
              </p>
              <button
                onClick={() => setHeroExpanded(!heroExpanded)}
                className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors md:hidden"
              >
                {heroExpanded ? (language === "en" ? "Show less" : "Sembunyikan") : (language === "en" ? "Read more" : "Selengkapnya")}
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${heroExpanded ? "rotate-180" : ""}`} />
              </button>
            </div>

            <div className="flex flex-wrap gap-3 mt-5">
              <Link
                href="/cv"
                className="group inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
              >
                {t.viewCV}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 text-white rounded-xl text-sm font-semibold transition-all"
              >
                <Mail className="w-4 h-4" />
                {t.contactMe}
              </Link>
              <div className="hidden md:flex items-center gap-2 ml-1">
                <a href={personalInfo.contact.github} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                  <Github className="w-4 h-4" />
                </a>
                <a href={personalInfo.contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Metrics Bento ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
      >
        {[
          { value: "4", label: t.productsShipped, accent: "text-emerald-500", border: "border-emerald-500/20", bg: "bg-emerald-500/5", span: "md:col-span-2" },
          { value: "250K+", label: t.dataProcessed, accent: "text-orange-500", border: "border-orange-500/20", bg: "bg-orange-500/5", span: "md:col-span-2" },
          { value: "4", label: t.activeProjects, accent: "text-blue-500", border: "border-zinc-200 dark:border-zinc-800", bg: "", span: "" },
          { value: "6", label: t.techMastered, accent: "text-purple-500", border: "border-zinc-200 dark:border-zinc-800", bg: "", span: "" },
          { value: "<1yr", label: t.devTime, accent: "text-pink-500", border: "border-zinc-200 dark:border-zinc-800", bg: "", span: "" },
          { value: "10x", label: t.productivity, accent: "text-yellow-500", border: "border-zinc-200 dark:border-zinc-800", bg: "", span: "" },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className={`bg-white dark:bg-zinc-900 rounded-xl border ${m.border} ${m.bg} ${m.span} ${
              m.span ? "p-5 md:p-6" : "p-4"
            } text-center`}
          >
            <p className={`font-extrabold ${m.accent} ${m.span ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"}`}>{m.value}</p>
            <p className={`text-zinc-500 font-medium ${m.span ? "text-sm mt-1.5" : "text-xs mt-1"}`}>{m.label}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* ── Live Production Metrics ── */}
      <ScrollReveal delay={0.05}>
        <LiveMetrics />
      </ScrollReveal>

      {/* ── CTA ── */}
      <ScrollReveal>
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="noise-overlay relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 rounded-3xl border border-emerald-500/10"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-500/15 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

          <div className="relative p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
                <Rocket className="w-3.5 h-3.5" />
                {language === "en" ? "Full-time · Contract · Freelance" : "Full-time · Kontrak · Freelance"}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">{t.letsWork}</h2>
              <p className="text-zinc-400 max-w-md">{t.letsWorkDesc}</p>
            </div>

            <div className="flex flex-col gap-3 w-full md:w-auto shrink-0">
              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
              >
                <Mail className="w-4 h-4" />
                {t.sendEmail}
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
              <div className="flex gap-3">
                <Link
                  href="/cv"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-xl text-sm font-semibold text-white transition-all"
                >
                  {t.viewCV}
                </Link>
                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 rounded-xl text-sm font-semibold text-white transition-all"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </motion.section>
      </ScrollReveal>
    </div>
  );
}
