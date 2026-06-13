"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { TiltCard } from "@/components/TiltCard";

const STATS = [
  { value: "5", labelKey: "productsShipped" as const, accent: "text-[#c4956a]", border: "border-[#c4956a]/20", bg: "bg-[#c4956a]/5" },
  { value: "250K+", labelKey: "dataProcessed" as const, accent: "text-orange-400", border: "border-orange-500/20", bg: "bg-orange-500/5" },
  { value: "4", labelKey: "activeProjects" as const, accent: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/5" },
  { value: "6", labelKey: "techMastered" as const, accent: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/5" },
  { value: "<1yr", labelKey: "devTime" as const, accent: "text-pink-400", border: "border-pink-500/20", bg: "bg-pink-500/5" },
  { value: "Weeks", labelKey: "productivity" as const, accent: "text-yellow-400", border: "border-yellow-500/20", bg: "bg-yellow-500/5" },
];

const productionProjects = projects.filter((p) => p.status === "production");

export default function ProjectsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-extrabold mb-1 text-foreground">{t.completedProjects}</h1>
        <p className="text-sm text-muted">
          {productionProjects.length} {language === "en" ? "production systems shipped" : "sistem production sudah dikirim"}
        </p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2.5">
        {STATS.map((s, i) => (
          <motion.div
            key={s.labelKey}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 + i * 0.04 }}
            className={`${s.bg} border ${s.border} rounded-xl p-3 text-center`}
          >
            <p className={`font-extrabold text-lg md:text-xl ${s.accent}`}>{s.value}</p>
            <p className="text-muted text-[10px] font-medium mt-0.5 leading-tight">{t[s.labelKey]}</p>
          </motion.div>
        ))}
      </div>

      {/* Mobile: compact list */}
      <div className="md:hidden space-y-2.5">
        {productionProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
          >
            <Link
              href={`/projects/${project.id}`}
              className="group flex items-center gap-3 p-3 bg-[#FAFAFA] rounded-xl border border-neutral-400 hover:border-[#c4956a]/30 transition-all"
            >
              {project.image && (
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-border/30 shrink-0">
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
                  <h3 className="text-sm font-bold truncate text-foreground group-hover:text-[#c4956a] transition-colors">
                    {project.title}
                  </h3>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-[#c4956a]/15 text-[#c4956a] shrink-0">
                    {project.status}
                  </span>
                </div>
                <p className="text-xs text-muted line-clamp-1">{project.shortDescription}</p>
                <div className="flex gap-1 mt-1.5">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-1.5 py-0.5 rounded text-[10px] bg-border/50 text-foreground/70">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              {project.demo && (
                <span
                  role="link"
                  tabIndex={0}
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    window.open(project.demo, '_blank', 'noopener,noreferrer');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.stopPropagation();
                      window.open(project.demo, '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="px-2.5 py-1.5 rounded-lg bg-[#c4956a] text-white text-[10px] font-semibold flex items-center gap-1 shrink-0 cursor-pointer"
                >
                  Live <ExternalLink className="w-3 h-3" />
                </span>
              )}
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Desktop: full cards */}
      <div className="hidden md:block space-y-6">
        {productionProjects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.08 }}
          >
            <TiltCard>
              <Link
                href={`/projects/${project.id}`}
                className="group block bg-[#FAFAFA] rounded-[35px] border border-neutral-400 overflow-hidden hover:shadow-xl transition-all hover:border-[#c4956a]/30"
              >
                <div className="flex flex-col lg:flex-row">
                  {project.image && (
                    <div className="lg:w-2/5 relative bg-border/30 overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={600}
                        height={340}
                        className="w-full h-48 lg:h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-[#c4956a] text-white">
                          {project.status}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="flex-1 p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-[#c4956a] transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                        {project.shortDescription}
                      </p>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                        {project.highlights.map((h) => (
                          <div key={h.title} className="bg-border/30 rounded-lg p-3">
                            <p className="text-xs font-semibold text-foreground">{h.title}</p>
                            <p className="text-xs text-muted mt-0.5">{h.description}</p>
                          </div>
                        ))}
                      </div>

                      {(project.impact?.users || project.impact?.performance || project.impact?.dataVolume) && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.impact.users && (
                            <span className="text-xs px-3 py-1 rounded-full bg-[#FAFAFA] text-[#c4956a] font-medium border border-[#c4956a]/20">
                              {project.impact.users}
                            </span>
                          )}
                          {project.impact.performance && (
                            <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-700 font-medium">
                              {project.impact.performance}
                            </span>
                          )}
                          {project.impact.dataVolume && (
                            <span className="text-xs px-3 py-1 rounded-full bg-purple-50 text-purple-700 font-medium">
                              {project.impact.dataVolume}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {project.caseStudy?.testimonial && (
                      <div className="mb-4 p-3 rounded-lg bg-[#FAFAFA] border border-[#c4956a]/10">
                        <p className="text-xs text-foreground/70 italic leading-relaxed">
                          &ldquo;{project.caseStudy.testimonial.quote}&rdquo;
                        </p>
                        <p className="text-[10px] text-muted mt-1.5 font-medium">
                          — {project.caseStudy.testimonial.author}, {project.caseStudy.testimonial.role}
                        </p>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded text-xs bg-border/50 text-foreground/70">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {project.demo && (
                          <span
                            role="link"
                            tabIndex={0}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              window.open(project.demo, '_blank', 'noopener,noreferrer');
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.stopPropagation();
                                window.open(project.demo, '_blank', 'noopener,noreferrer');
                              }
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#c4956a] hover:bg-[#a67d55] text-white text-xs font-semibold transition-colors cursor-pointer"
                          >
                            {t.visitLive} <ExternalLink className="w-3 h-3" />
                          </span>
                        )}
                        <span className="inline-flex items-center gap-1 text-xs text-muted group-hover:text-[#c4956a] transition-colors">
                          {language === "en" ? "Details" : "Detail"} <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </TiltCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
