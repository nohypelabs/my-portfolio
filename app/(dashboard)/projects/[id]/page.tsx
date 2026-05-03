"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { notFound } from "next/navigation";
import { ExternalLink, Github, Calendar, CheckCircle2, ArrowRight, Quote, Clock, AlertTriangle, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { TechBadge } from "@/components/ui/TechBadge";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

import { use } from "react";

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find((p) => p.id === id);
  const { language } = useLanguage();
  const t = translations[language];

  if (!project) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Back Button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        {t.backToDashboard}
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm"
      >
        {/* Title & Meta */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap ${
              project.status === 'production'
                ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400'
            }`}>
              {project.status}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 px-3 py-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full whitespace-nowrap">
              <Calendar className="w-4 h-4" />
              {project.year}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
            >
              <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform" />
              <span>{t.visitLiveProject}</span>
              <span className="text-xs opacity-75">↗</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-2 px-6 py-3 border-2 border-zinc-300 dark:border-zinc-700 rounded-xl font-semibold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{t.viewSourceCode}</span>
            </a>
          )}
        </div>
      </motion.div>

      {/* Live Demo Banner */}
      {project.demo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 md:p-5"
        >
          <div className="flex flex-col sm:flex-row items-start gap-3">
            <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/40 shrink-0">
              <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm md:text-base mb-1">🚀 {t.liveProductionProject}</h3>
              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {t.liveProductionDesc}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Project Screenshot */}
      {project.image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="relative w-full overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-lg bg-zinc-100 dark:bg-zinc-900"
        >
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            width={1920}
            height={1080}
            className="w-full h-auto object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
        </motion.div>
      )}

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-4">{t.aboutThisProject}</h2>
        <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
          {project.fullDescription}
        </p>
      </motion.div>

      {/* Case Study */}
      {project.caseStudy && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
          className="space-y-6"
        >
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-orange-100 dark:bg-orange-900/20">
                <AlertTriangle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold">{t.theProblem}</h2>
            </div>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              {project.caseStudy.problem}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.caseStudy.painPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20"
                >
                  <span className="text-red-500 font-bold text-sm mt-0.5">x</span>
                  <span className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div className="p-3 rounded-full bg-emerald-100 dark:bg-emerald-900/20">
              <ArrowRight className="w-6 h-6 text-emerald-600 dark:text-emerald-400 rotate-90" />
            </div>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-lg bg-emerald-100 dark:bg-emerald-900/20">
                <Zap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold">{t.theSolution}</h2>
            </div>
            <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
              {project.caseStudy.solution}
            </p>

            {project.caseStudy.timeline && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                  {project.caseStudy.timeline}
                </span>
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
            <h2 className="text-xl md:text-2xl font-bold mb-6">{t.beforeVsAfter}</h2>
            <div className="space-y-4">
              {project.caseStudy.metrics.map((metric, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  className="bg-zinc-50 dark:bg-zinc-800/50 rounded-xl p-4 border border-zinc-200 dark:border-zinc-700"
                >
                  <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-3">
                    {metric.label}
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 p-3 rounded-lg bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20">
                      <p className="text-xs text-red-500 font-medium mb-1">{t.before}</p>
                      <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{metric.before}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div className="flex-1 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900/20">
                      <p className="text-xs text-emerald-500 font-medium mb-1">{t.after}</p>
                      <p className="text-sm font-bold text-zinc-800 dark:text-zinc-200">{metric.after}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {project.caseStudy.testimonial && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 dark:from-zinc-950 dark:via-zinc-950 dark:to-emerald-950 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
              <div className="relative">
                <Quote className="w-10 h-10 text-emerald-500/30 mb-4" />
                <blockquote className="text-lg md:text-xl font-medium leading-relaxed mb-6 text-zinc-100">
                  &ldquo;{project.caseStudy.testimonial.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <span className="text-emerald-400 font-bold text-sm">
                      {project.caseStudy.testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-zinc-100">
                      {project.caseStudy.testimonial.author}
                    </p>
                    <p className="text-xs text-zinc-400">
                      {project.caseStudy.testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-6">{t.keyHighlights}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {project.highlights.map((highlight, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + idx * 0.05 }}
              className="space-y-2 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-800"
            >
              <h3 className="font-bold text-base md:text-lg text-zinc-900 dark:text-zinc-100">
                {highlight.title}
              </h3>
              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {highlight.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-6">{t.features}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          {project.features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35 + idx * 0.03 }}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <span className="text-xs md:text-sm text-zinc-700 dark:text-zinc-300">{feature}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="bg-white dark:bg-zinc-900 rounded-2xl p-6 md:p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm"
      >
        <h2 className="text-xl md:text-2xl font-bold mb-6">{t.technologyStack}</h2>
        <div className="space-y-6">
          {project.techStack.map((stack, idx) => (
            <div key={idx}>
              <h3 className="font-bold text-sm md:text-base mb-3 text-blue-600 dark:text-blue-400">
                {stack.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {stack.technologies.map((tech) => (
                  <TechBadge key={tech} tech={tech} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Impact */}
      {(project.impact?.users || project.impact?.performance || project.impact?.dataVolume) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 md:p-8 text-white shadow-lg"
        >
          <h2 className="text-xl md:text-2xl font-bold mb-5">{t.impactResults}</h2>
          <div className="space-y-3">
            {project.impact.users && (
              <p className="text-sm md:text-base opacity-95 flex items-start gap-2">
                <span className="text-lg">📊</span>
                <span>{project.impact.users}</span>
              </p>
            )}
            {project.impact.performance && (
              <p className="text-sm md:text-base opacity-95 flex items-start gap-2">
                <span className="text-lg">⚡</span>
                <span>{project.impact.performance}</span>
              </p>
            )}
            {project.impact.dataVolume && (
              <p className="text-sm md:text-base opacity-95 flex items-start gap-2">
                <span className="text-lg">💾</span>
                <span>{project.impact.dataVolume}</span>
              </p>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
