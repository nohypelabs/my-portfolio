"use client";

import Link from "next/link";
import { projects } from "@/lib/data/projects";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { ArrowRight } from "lucide-react";

export function FeaturedProjects() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-foreground">
          {t.featuredProjects}
        </h2>
        <Link
          href="/projects"
          className="flex items-center gap-1 text-xs font-medium text-[#0D9488] hover:underline"
        >
          {t.viewAllProjects}
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
