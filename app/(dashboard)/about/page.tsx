"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { personalInfo } from "@/lib/data/personalInfo";
import { ChevronDown, Code2, Database, Layout, Server } from "lucide-react";
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

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">{t.technicalSkills}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-bold text-lg">{category.name}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
