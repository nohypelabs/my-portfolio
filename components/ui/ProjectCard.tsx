"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/domain/entities/Project";
import { TechBadge } from "./TechBadge";
import { ArrowUpRight, TrendingUp } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function getImpactSummary(project: Project): string | null {
  if (!project.impact) return null;
  const parts: string[] = [];
  if (project.impact.dataVolume) parts.push(project.impact.dataVolume.split("|")[0].trim());
  if (project.impact.business) parts.push(project.impact.business.split("—")[0].trim());
  return parts.length > 0 ? parts[0] : null;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const impactLabel = getImpactSummary(project);
  const isProduction = project.status === "production";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="group block bg-[#FAFAFA] rounded-2xl border border-neutral-300 overflow-hidden hover:border-[#c4956a]/40 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      >
        {/* Image */}
        <div className="aspect-video relative overflow-hidden bg-neutral-100">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
          />
          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold ${
              isProduction
                ? "bg-emerald-500 text-white"
                : "bg-neutral-800/80 text-white"
            }`}>
              {isProduction ? "Production" : "Development"}
            </span>
          </div>
          {/* Arrow */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-7 h-7 rounded-full bg-[#f7f3e8]/90 flex items-center justify-center">
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-900" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-bold text-sm text-neutral-900 group-hover:text-[#c4956a] transition-colors mb-1">
              {project.title}
            </h3>
            <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
              {project.shortDescription}
            </p>
          </div>

          {/* Impact metric */}
          {impactLabel && (
            <div className="flex items-center gap-1.5 text-[10px] text-[#c4956a] font-medium">
              <TrendingUp className="w-3 h-3" />
              <span className="truncate">{impactLabel}</span>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {project.tags.slice(0, 4).map((tag) => (
              <TechBadge key={tag} tech={tag} />
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
