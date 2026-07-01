"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/domain/entities/Project";
import { TechBadge } from "./TechBadge";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";

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
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <TiltCard>
        <Link
          href={`/projects/${project.id}`}
          className="group block neo-surface rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
        >
          {/* Image */}
          <div className="aspect-video relative overflow-hidden bg-neutral-100">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="eager"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Status badge */}
            <div className="absolute top-3 left-3">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold backdrop-blur-sm ${
                isProduction
                  ? "bg-emerald-500/90 text-white"
                  : "bg-neutral-800/80 text-white"
              }`}>
                {isProduction ? "Production" : "Development"}
              </span>
            </div>

            {/* Arrow */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <ArrowUpRight className="w-4 h-4 text-neutral-900" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <div>
              <h3 className="font-bold text-[14px] text-neutral-900 group-hover:text-[#c4956a] transition-colors mb-1.5">
                {project.title}
              </h3>
              <p className="text-[12px] text-neutral-500 line-clamp-2 leading-relaxed">
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
            <div className="flex flex-wrap gap-1.5">
              {project.tags.slice(0, 4).map((tag) => (
                <TechBadge key={tag} tech={tag} />
              ))}
            </div>
          </div>
        </Link>
      </TiltCard>
    </motion.div>
  );
}
