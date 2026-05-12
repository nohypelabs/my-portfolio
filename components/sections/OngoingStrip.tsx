"use client";

import Link from "next/link";
import { ongoingProjects } from "@/lib/data/ongoingProjects";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { ArrowRight } from "lucide-react";

export function OngoingStrip() {
  const { language } = useLanguage();
  const t = translations[language];

  const top3 = [...ongoingProjects]
    .sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0))
    .slice(0, 3);

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
          {t.inProgressProjects}
        </h2>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">
          {ongoingProjects.length} {t.inProgress}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {top3.map((project) => (
          <Link
            key={project.id}
            href={`/ongoing/${project.id}`}
            className="group bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-3 hover:border-emerald-300 dark:hover:border-emerald-700 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-zinc-900 dark:text-white truncate group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                {project.name.split(" — ")[0]}
              </h3>
              <ArrowRight className="w-3 h-3 text-zinc-400 group-hover:text-emerald-500 transition-colors shrink-0" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-zinc-100 dark:bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-emerald-500"
                  style={{ width: `${project.progress ?? 0}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 tabular-nums">
                {project.progress ?? 0}%
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
