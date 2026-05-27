"use client";

import { personalInfo } from "@/lib/data/personalInfo";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import {
  Layout,
  Server,
  Database,
  Wrench,
  Zap,
} from "lucide-react";

const categories = [
  { key: "frontend" as const, icon: Layout },
  { key: "backend" as const, icon: Server },
  { key: "database" as const, icon: Database },
  { key: "tools" as const, icon: Wrench },
  { key: "specialties" as const, icon: Zap },
];

export function TechStackStrip() {
  const { language } = useLanguage();
  const t = translations[language];

  const labelMap: Record<string, string> = {
    frontend: t.frontend,
    backend: t.backend,
    database: t.database,
    tools: t.tools,
    specialties: t.specialties,
  };

  const proficiencyLabels = {
    advanced: language === "en" ? "Advanced" : "Mahir",
    intermediate: language === "en" ? "Intermediate" : "Menengah",
    familiar: language === "en" ? "Familiar" : "Kenal",
  };

  const proficiencyColors = {
    advanced: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700",
    intermediate: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-300 dark:border-blue-700",
    familiar: "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700",
  };

  return (
    <section>
      <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
        {t.techStack}
      </h2>
      <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-3">
        {categories.map(({ key, icon: Icon }) => (
          <div key={key} className="flex items-start gap-3">
            <div className="p-1.5 rounded-lg bg-zinc-100 dark:bg-white/5 mt-0.5 shrink-0">
              <Icon className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                {labelMap[key]}
              </span>
              <div className="flex flex-wrap gap-1 mt-1">
                {personalInfo.skills[key].map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-zinc-100 dark:bg-white/5 text-zinc-600 dark:text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* Proficiency Levels */}
        <div className="pt-2 border-t border-zinc-200 dark:border-zinc-800">
          <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
            {language === "en" ? "Proficiency" : "Kemahiran"}
          </span>
          <div className="mt-2 space-y-2">
            {(Object.keys(proficiencyLabels) as Array<keyof typeof proficiencyLabels>).map((level) => (
              <div key={level} className="flex items-start gap-2">
                <span className="text-[10px] font-semibold text-zinc-400 uppercase w-20 shrink-0 pt-0.5">
                  {proficiencyLabels[level]}
                </span>
                <div className="flex flex-wrap gap-1">
                  {personalInfo.skills.proficiency[level].map((tech) => (
                    <span
                      key={tech}
                      className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${proficiencyColors[level]}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
