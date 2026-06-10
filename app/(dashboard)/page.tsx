"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data/personalInfo";
import { ArrowUpRight, Github, Linkedin, Mail, Rocket, Globe, Layers } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { AvatarImage } from "@/components/AvatarImage";
import { HeroBackground } from "@/components/HeroBackground";
import { TextReveal } from "@/components/TextReveal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { TechStackStrip } from "@/components/sections/TechStackStrip";
import { OngoingStrip } from "@/components/sections/OngoingStrip";
import { StatsStrip } from "@/components/sections/StatsStrip";

export default function DashboardPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
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
                {language === "en"
                  ? "Open for full-time & contract"
                  : "Tersedia full-time & kontrak"}
              </span>
            </motion.div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-2">
              <TextReveal text={t.heroHeadline} delay={0.3} />
            </h1>
            <div className="w-12 h-0.5 bg-emerald-500/40 rounded-full mb-4" />
            <p className="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
              {t.heroNarrative}
            </p>

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
                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-all"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Stats ── */}
      <ScrollReveal>
        <StatsStrip />
      </ScrollReveal>

      {/* ── Why Me ── */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
            {t.whyMeTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: Rocket, title: t.whyMe1Title, desc: t.whyMe1Desc },
              { icon: Globe, title: t.whyMe2Title, desc: t.whyMe2Desc },
              { icon: Layers, title: t.whyMe3Title, desc: t.whyMe3Desc },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-4"
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

      {/* ── Featured Projects ── */}
      <ScrollReveal>
        <FeaturedProjects />
      </ScrollReveal>

      {/* ── Tech Stack ── */}
      <ScrollReveal>
        <TechStackStrip />
      </ScrollReveal>

      {/* ── Ongoing Work ── */}
      <ScrollReveal>
        <OngoingStrip />
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                {t.letsWork}
              </h2>
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
