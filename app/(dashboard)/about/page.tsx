"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { personalInfo } from "@/lib/data/personalInfo";
import { ChevronDown, Code2, Database, Layout, Server, GraduationCap, Coffee, Rocket, Zap, Bot } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function AboutPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [expanded, setExpanded] = useState(false);

  const skillCategories = [
    { name: t.frontend, icon: Layout, skills: personalInfo.skills.frontend },
    { name: t.backend, icon: Server, skills: personalInfo.skills.backend },
    { name: t.database, icon: Database, skills: personalInfo.skills.database },
    { name: t.toolsAndMore, icon: Code2, skills: personalInfo.skills.tools },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold mb-4 text-center">{t.aboutMe}</h1>
        <div className="relative">
          <p className={`text-lg text-zinc-600 dark:text-zinc-400 text-justify leading-relaxed ${!expanded ? "line-clamp-3" : ""}`}>
            {t.aboutBio}
          </p>
          {!expanded && (
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-zinc-50 dark:from-black to-transparent" />
          )}
        </div>
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-500 hover:text-emerald-400 transition-colors mx-auto"
        >
          {expanded ? (language === "en" ? "Show less" : "Sembunyikan") : (language === "en" ? "Read more" : "Baca selengkapnya")}
          <ChevronDown className={`w-4 h-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
        </button>
      </motion.div>

      {/* Personal Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-zinc-900 rounded-xl p-8 border border-zinc-200 dark:border-zinc-800"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">{t.name}</p>
            <p className="text-lg font-medium">{personalInfo.name}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">{t.role}</p>
            <p className="text-lg font-medium">{personalInfo.role}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">{t.username}</p>
            <p className="text-lg font-medium">{personalInfo.username}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">{t.experience}</p>
            <p className="text-lg font-medium">{personalInfo.stats.experience}</p>
          </div>
        </div>
      </motion.div>

      {/* Journey Timeline */}
      <JourneyTimeline title={t.myJourney} language={language} />

      {/* Skills */}
      <SkillsSection skillCategories={skillCategories} title={t.technicalSkills} />
    </div>
  );
}

const journeyData = {
  en: [
    { year: "2014", icon: GraduationCap, color: "bg-blue-500", title: "Started D3 Informatics Engineering", desc: "Began formal CS education, learned programming fundamentals" },
    { year: "2016", icon: Coffee, color: "bg-yellow-500", title: "Paused Studies (104/114 credits)", desc: "Stopped due to financial constraints — 6 semesters completed, never graduated" },
    { year: "2016–2024", icon: Coffee, color: "bg-zinc-500", title: "9-Year Break", desc: "Worked in various fields, but never stopped tinkering with tech" },
    { year: "2024", icon: Rocket, color: "bg-emerald-500", title: "The Comeback", desc: "Returned to coding with AI-augmented development — built first production app" },
    { year: "2024–2025", icon: Zap, color: "bg-purple-500", title: "4 Production Systems", desc: "POS system, QC tools, e-commerce — all live in production" },
    { year: "2025", icon: Bot, color: "bg-orange-500", title: "Exploring Trading & Web3", desc: "Algorithmic trading bots, DLMM agents on Solana — currently in development" },
  ],
  id: [
    { year: "2014", icon: GraduationCap, color: "bg-blue-500", title: "Mulai D3 Teknik Informatika", desc: "Memulai pendidikan formal CS, belajar dasar pemrograman" },
    { year: "2016", icon: Coffee, color: "bg-yellow-500", title: "Berhenti Kuliah (104/114 SKS)", desc: "Terhenti karena keterbatasan biaya — 6 semester selesai, tidak lulus" },
    { year: "2016–2024", icon: Coffee, color: "bg-zinc-500", title: "9 Tahun Vakum", desc: "Bekerja di berbagai bidang, tapi tidak pernah berhenti utak-atik teknologi" },
    { year: "2024", icon: Rocket, color: "bg-emerald-500", title: "Comeback", desc: "Kembali coding dengan AI-augmented development — membuat aplikasi production pertama" },
    { year: "2024–2025", icon: Zap, color: "bg-purple-500", title: "4 Sistem Production", desc: "Sistem POS, tools QC, e-commerce — semua live di production" },
    { year: "2025", icon: Bot, color: "bg-orange-500", title: "Eksplorasi Trading & Web3", desc: "Bot trading algoritmik, DLMM agent di Solana — sedang dalam pengembangan" },
  ],
};

function JourneyTimeline({ title, language }: { title: string; language: "en" | "id" }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const items = journeyData[language];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
    >
      <h2 className="text-2xl font-bold mb-8 text-center">{title}</h2>
      <div className="relative">
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-800 md:-translate-x-px" />

        <div className="space-y-8">
          {items.map((item, i) => {
            const Icon = item.icon;
            const isRight = i % 2 === 1;
            return (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: isRight ? 30 : -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                className={`relative flex items-start gap-4 md:gap-0 ${
                  isRight ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className={`hidden md:block md:w-1/2 ${isRight ? "md:pl-10" : "md:pr-10 md:text-right"}`}>
                  <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800 inline-block">
                    <p className="text-xs font-bold text-zinc-400 mb-1">{item.year}</p>
                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center ring-4 ring-zinc-50 dark:ring-black`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="md:hidden ml-12">
                  <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                    <p className="text-xs font-bold text-zinc-400 mb-1">{item.year}</p>
                    <h3 className="font-bold text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                  </div>
                </div>

                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

const accentColors = [
  { bg: "bg-emerald-500", bgLight: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400" },
  { bg: "bg-blue-500", bgLight: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400" },
  { bg: "bg-purple-500", bgLight: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400" },
  { bg: "bg-orange-500", bgLight: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-600 dark:text-orange-400" },
];

function SkillsSection({ skillCategories, title }: {
  skillCategories: { name: string; icon: typeof Layout; skills: string[] }[];
  title: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((category, catIdx) => {
          const Icon = category.icon;
          const accent = accentColors[catIdx % accentColors.length];
          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + catIdx * 0.1 }}
              className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className={`p-2 rounded-lg ${accent.bgLight}`}>
                  <Icon className={`w-5 h-5 ${accent.text}`} />
                </div>
                <h3 className="font-bold text-lg">{category.name}</h3>
                <span className="ml-auto text-xs text-zinc-400 font-medium">{category.skills.length}</span>
              </div>
              <div className="space-y-3">
                {category.skills.map((skill, si) => (
                  <div key={skill}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{skill}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${accent.bg}`}
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${88 + ((si * 7 + catIdx * 3) % 12)}%` } : { width: 0 }}
                        transition={{
                          delay: 0.5 + catIdx * 0.15 + si * 0.06,
                          duration: 0.8,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
