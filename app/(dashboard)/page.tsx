"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { ongoingProjects } from "@/lib/data/ongoingProjects";
import { personalInfo } from "@/lib/data/personalInfo";
import { achievements } from "@/lib/data/achievements";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Code,
  Database,
  ChevronDown,
  ExternalLink,
  Github,
  Layers,
  Layout,
  Linkedin,
  Mail,
  Rocket,
  Server,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { AvatarImage } from "@/components/AvatarImage";
import { LiveMetrics } from "@/components/sections/LiveMetrics";
import { HeroBackground } from "@/components/HeroBackground";
import { TiltCard } from "@/components/TiltCard";
import { TextReveal } from "@/components/TextReveal";
import { ScrollReveal } from "@/components/ScrollReveal";
import { CollapsibleSection } from "@/components/CollapsibleSection";
import { Marquee } from "@/components/Marquee";

const FEATURED_IDS = ["selisih-berat", "wc-check", "lakupos", "ecommerce-manual"];

const achievementIcons: Record<string, typeof Rocket> = {
  rocket: Rocket,
  code: Code,
  "trending-up": ArrowUpRight,
  zap: Zap,
  layers: Layers,
  "check-circle": CheckCircle2,
  activity: Zap,
  "book-open": Layers,
};

const skillCategoryIcons = [
  { key: "frontend" as const, icon: Layout },
  { key: "backend" as const, icon: Server },
  { key: "database" as const, icon: Database },
  { key: "tools" as const, icon: Code },
  { key: "specialties" as const, icon: Zap },
];

export default function DashboardPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [heroExpanded, setHeroExpanded] = useState(false);

  const featuredProjects = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)!).filter(Boolean);
  const topOngoing = ongoingProjects
    .filter(p => (p.progress ?? 0) >= 65)
    .sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0))
    .slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto space-y-10 pb-12">
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
      <div id="live-data">
        <LiveMetrics />
      </div>

      {/* ── Featured Projects ── */}
      <section id="projects">
        <CollapsibleSection title={t.featuredProjects} badge={featuredProjects.length}>
        {/* Mobile: Compact cards */}
        <div className="md:hidden space-y-2.5">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.06 }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="group flex items-center gap-3 p-3 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/30 transition-all"
              >
                {project.image && (
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={56}
                      height={56}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-bold truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 shrink-0">
                      {project.status}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 line-clamp-1">{project.shortDescription}</p>
                  <div className="flex gap-1 mt-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] bg-zinc-100 dark:bg-zinc-800 text-zinc-500">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-500 text-white text-[10px] font-semibold flex items-center gap-1 shrink-0"
                  >
                    Live <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Desktop: Full detailed cards */}
        <div className="hidden md:block space-y-6">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
              <TiltCard>
              <Link
                href={`/projects/${project.id}`}
                className="group block bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden hover:shadow-xl transition-all hover:border-emerald-500/30"
              >
                <div className="flex flex-col lg:flex-row">
                  {project.image && (
                    <div className="lg:w-2/5 relative bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={340}
                        className="w-full h-48 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500 text-white">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                        {project.shortDescription}
                      </p>

                      {/* Highlights */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        {project.highlights.map((h) => (
                          <div
                            key={h.title}
                            className="bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-3"
                          >
                            <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                              {h.title}
                            </p>
                            <p className="text-xs text-zinc-500 mt-0.5">{h.description}</p>
                          </div>
                        ))}
                      </div>

                      {/* Impact */}
                      {(project.impact?.users || project.impact?.performance || project.impact?.dataVolume) && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.impact.users && (
                            <span className="text-xs px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 font-medium">
                              {project.impact.users}
                            </span>
                          )}
                          {project.impact.performance && (
                            <span className="text-xs px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 font-medium">
                              {project.impact.performance}
                            </span>
                          )}
                          {project.impact.dataVolume && (
                            <span className="text-xs px-3 py-1 rounded-full bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 font-medium">
                              {project.impact.dataVolume}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Testimonial */}
                    {project.caseStudy?.testimonial && (
                      <div className="mb-4 p-3 rounded-lg bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-500/10">
                        <p className="text-xs text-zinc-600 dark:text-zinc-300 italic leading-relaxed">
                          &ldquo;{project.caseStudy.testimonial.quote}&rdquo;
                        </p>
                        <p className="text-[10px] text-zinc-500 mt-1.5 font-medium">
                          — {project.caseStudy.testimonial.author}, {project.caseStudy.testimonial.role}
                        </p>
                      </div>
                    )}

                    {/* Tags + Visit Button */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold transition-colors shrink-0"
                        >
                          Visit Live <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
        </CollapsibleSection>
      </section>

      {/* ── What Sets Me Apart ── */}
      <ScrollReveal>
      <section id="highlights">
        <CollapsibleSection title={t.whatSetsApart} badge={4}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.slice(0, 4).map((ach, i) => {
            const Icon = achievementIcons[ach.icon] || Zap;
            const accentColors = [
              { bg: "bg-emerald-500/10", ring: "ring-emerald-500/20", text: "text-emerald-500", metric: "text-emerald-500" },
              { bg: "bg-blue-500/10", ring: "ring-blue-500/20", text: "text-blue-500", metric: "text-blue-500" },
              { bg: "bg-purple-500/10", ring: "ring-purple-500/20", text: "text-purple-500", metric: "text-purple-500" },
              { bg: "bg-orange-500/10", ring: "ring-orange-500/20", text: "text-orange-500", metric: "text-orange-500" },
            ];
            const accent = accentColors[i % accentColors.length];
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${accent.bg} ring-1 ${accent.ring}`}>
                    <Icon className={`w-6 h-6 ${accent.text}`} />
                  </div>
                  {ach.metric && (
                    <span className={`text-2xl font-extrabold ${accent.metric}`}>
                      {ach.metric}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-base mb-1.5">{ach.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{ach.description}</p>
              </motion.div>
            );
          })}
        </div>
        </CollapsibleSection>
      </section>
      </ScrollReveal>

      {/* ── Tech Stack ── */}
      <ScrollReveal delay={0.1}>
      <section id="skills">
        <CollapsibleSection title={t.techStack}>
        <div className="space-y-4">
          {skillCategoryIcons.map(({ key, icon: Icon }, rowIdx) => (
            <div key={key}>
              <div className="flex items-center gap-2 mb-2.5">
                <Icon className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 capitalize">
                  {t[key] || key}
                </span>
              </div>
              <Marquee speed={20 + rowIdx * 5} className="py-1">
                {personalInfo.skills[key].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap hover:border-emerald-500/30 hover:text-emerald-500 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </Marquee>
            </div>
          ))}
        </div>
        </CollapsibleSection>
      </section>
      </ScrollReveal>

      {/* ── In Progress ── */}
      <ScrollReveal delay={0.1}>
      <section id="in-progress">
        <CollapsibleSection
          title={
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-zinc-400" />
              {t.inProgressProjects}
            </h2>
          }
          badge={topOngoing.length}
          rightContent={
            <span className="text-sm text-zinc-500">{t.inProgress}</span>
          }
        >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {topOngoing.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.04 }}
            >
              <Link
                href={`/ongoing/${project.id}`}
                className="group block bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all h-full"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {project.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded text-xs font-medium shrink-0 ${
                      project.status === "In Progress"
                        ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                        : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 line-clamp-2 mb-3">{project.description}</p>
                {project.progress !== undefined && (
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-zinc-500">{t.progress}</span>
                      <span className="font-semibold">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5">
                      <div
                        className="bg-emerald-500 h-1.5 rounded-full transition-all"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </Link>
            </motion.div>
          ))}
        </div>
        </CollapsibleSection>
      </section>
      </ScrollReveal>

      {/* ── CTA ── */}
      <ScrollReveal>
      <motion.section
        id="contact"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
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
            <p className="text-zinc-400 max-w-md">
              {t.letsWorkDesc}
            </p>
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
