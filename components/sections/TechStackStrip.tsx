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
      </div>
    </section>
  );
}
