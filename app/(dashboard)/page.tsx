"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { ongoingProjects } from "@/lib/data/ongoingProjects";
import { personalInfo } from "@/lib/data/personalInfo";
import { achievements } from "@/lib/data/achievements";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  Code,
  Database,
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

const FEATURED_IDS = ["lakupos", "selisih-berat", "wc-check", "eduvate", "binance-algo-bot"];

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

  const featuredProjects = projects.filter((p) => FEATURED_IDS.includes(p.id));
  const otherProjects = projects.filter((p) => !FEATURED_IDS.includes(p.id));

  return (
    <div className="max-w-6xl mx-auto space-y-16 pb-12">
      {/* ── Hero ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 dark:from-zinc-950 dark:via-zinc-950 dark:to-emerald-950 rounded-3xl p-8 md:p-12 text-white"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        <div className="relative flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="shrink-0">
            <div className="ring-4 ring-emerald-500/30 rounded-full">
              <AvatarImage size={100} priority />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-emerald-400 font-medium text-sm tracking-wide uppercase mb-2">
              {personalInfo.role}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              {personalInfo.headline}
            </h1>
            <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-2xl mb-8">
              {personalInfo.narrative}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/cv"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-semibold transition-colors text-sm"
              >
                {t.viewCV}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-zinc-600 hover:border-zinc-400 hover:bg-white/5 transition-colors text-sm font-medium"
              >
                {t.contactMe}
              </Link>
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-sm text-zinc-400 hover:text-white"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-white/5 transition-colors text-sm text-zinc-400 hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Metrics Strip ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {[
          { value: "15+", label: t.productsShipped, accent: "text-emerald-500" },
          { value: "6", label: t.activeProjects, accent: "text-blue-500" },
          { value: "25+", label: t.techMastered, accent: "text-purple-500" },
          { value: "80K+", label: t.dataProcessed, accent: "text-orange-500" },
          { value: "<1yr", label: t.devTime, accent: "text-pink-500" },
          { value: "10x", label: t.productivity, accent: "text-yellow-500" },
        ].map((m, i) => (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.05 }}
            className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 text-center"
          >
            <p className={`text-2xl md:text-3xl font-extrabold ${m.accent}`}>{m.value}</p>
            <p className="text-xs text-zinc-500 mt-1 font-medium">{m.label}</p>
          </motion.div>
        ))}
      </motion.section>

      {/* ── Live Production Metrics ── */}
      <LiveMetrics />

      {/* ── Featured Projects ── */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">{t.featuredProjects}</h2>
        </div>
        <div className="space-y-6">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
            >
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── More Projects ── */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{t.moreProjects}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {otherProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
            >
              <div className="group bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg hover:border-emerald-500/30 transition-all h-full flex flex-col">
                <Link href={`/projects/${project.id}`} className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-emerald-500 transition-colors shrink-0 mt-0.5" />
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3">
                    {project.shortDescription}
                  </p>
                </Link>
                <div className="flex items-center justify-between mt-auto pt-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-xs bg-zinc-100 dark:bg-zinc-800"
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
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-semibold transition-colors shrink-0"
                    >
                      Live <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── What Sets Me Apart ── */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{t.whatSetsApart}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.slice(0, 8).map((ach, i) => {
            const Icon = achievementIcons[ach.icon] || Zap;
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.05 }}
                className="bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                    <Icon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  {ach.metric && (
                    <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400">
                      {ach.metric}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-sm mb-1">{ach.title}</h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{ach.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section>
        <h2 className="text-2xl font-bold mb-6">{t.techStack}</h2>
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 space-y-6">
          {skillCategoryIcons.map(({ key, icon: Icon }) => (
            <div key={key} className="flex flex-col sm:flex-row sm:items-start gap-3">
              <div className="flex items-center gap-2 sm:w-32 shrink-0">
                <Icon className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 capitalize">
                  {t[key] || key}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills[key].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm text-zinc-700 dark:text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── In Progress ── */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Clock className="w-5 h-5 text-zinc-400" />
            {t.inProgressProjects}
          </h2>
          <span className="text-sm text-zinc-500">
            {ongoingProjects.length} {t.inProgress}
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {ongoingProjects.map((project, i) => (
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
      </section>

      {/* ── CTA ── */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl p-8 md:p-12 text-white text-center"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3">{t.letsWork}</h2>
        <p className="text-emerald-100 mb-8 max-w-lg mx-auto">
          {t.letsWorkDesc}
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href={`mailto:${personalInfo.contact.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-emerald-700 rounded-xl font-semibold hover:bg-zinc-100 transition-colors"
          >
            <Mail className="w-4 h-4" />
            {t.sendEmail}
          </a>
          <Link
            href="/cv"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 rounded-xl font-semibold hover:bg-white/10 transition-colors"
          >
            {t.viewCV}
          </Link>
          <a
            href={personalInfo.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 rounded-xl font-semibold hover:bg-white/10 transition-colors"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </motion.section>
    </div>
  );
}
