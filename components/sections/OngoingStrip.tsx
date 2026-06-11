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
            className="group bg-[#FAFAFA] rounded-xl border border-neutral-400 p-3 hover:border-[#0D9488]/30 hover:shadow-sm transition-all duration-200"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xs font-semibold text-foreground truncate group-hover:text-[#0D9488] transition-colors">
                {project.name.split(" — ")[0]}
              </h3>
              <ArrowRight className="w-3 h-3 text-muted group-hover:text-[#0D9488] transition-colors shrink-0" />
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1.5 rounded-full bg-border/50 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#0D9488]"
                  style={{ width: `${project.progress ?? 0}%` }}
                />
              </div>
              <span className="text-[10px] font-semibold text-muted tabular-nums">
                {project.progress ?? 0}%
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
