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
        <h2 className="text-lg font-bold text-foreground">
          {t.inProgressProjects}
        </h2>
        <span className="text-xs text-muted">
          {ongoingProjects.length} {t.inProgress}
        </span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {top3.map((project) => (
          <Link
            key={project.id}
            href={`/ongoing/${project.id}`}
            className="group neo-surface rounded-[8px] p-3 transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-foreground truncate group-hover:text-accent transition-colors">
                {project.name.split(" — ")[0]}
              </h3>
              <ArrowRight className="w-3 h-3 text-muted group-hover:text-accent transition-colors shrink-0" />
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex-1 h-4 border-2 border-foreground bg-surface rounded-none overflow-hidden relative shadow-[1px_1px_0px_#141414]">
                <div
                  className="h-full bg-money border-r-2 border-foreground transition-all duration-500"
                  style={{ width: `${project.progress ?? 0}%` }}
                />
              </div>
              <span className="text-[11px] font-bold text-foreground font-mono tabular-nums shrink-0">
                {project.progress ?? 0}%
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
