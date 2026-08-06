"use client";

import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/domain/entities/Project";
import { TechBadge } from "./TechBadge";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import { TiltCard } from "@/components/TiltCard";
import { MaskReveal } from "@/components/motion/MaskReveal";
import { SpotlightCard } from "./SpotlightCard";

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Featured cards span 2 columns in the bento grid. */
  featured?: boolean;
}

function getImpactSummary(project: Project): string | null {
  if (!project.impact) return null;
  const parts: string[] = [];
  if (project.impact.dataVolume) parts.push(project.impact.dataVolume.split("|")[0].trim());
  if (project.impact.business) parts.push(project.impact.business.split("—")[0].trim());
  return parts.length > 0 ? parts[0] : null;
}

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  const impactLabel = getImpactSummary(project);
  const isProduction = project.status === "production";

  return (
    <MaskReveal
      split="none"
      duration={0.5}
      delay={index * 0.08}
      stagger={0}
      start="top 90%"
    >
      <TiltCard>
        <SpotlightCard className="rounded-[16px]">
          <Link
            href={`/projects/${project.id}`}
            className={`group block neo-surface rounded-[16px] overflow-hidden hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.35)] hover:-translate-y-1.5 transition-all duration-500 ease-out ${
              featured ? "h-full" : ""
            }`}
          >
            {/* Image */}
            <div
              className={`relative overflow-hidden bg-[var(--bg-element-second)] ${
                featured ? "aspect-[16/8]" : "aspect-video"
              }`}
            >
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                sizes={
                  featured
                    ? "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw"
                    : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
                loading={index < 3 ? "eager" : "lazy"}
                priority={index === 0}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Status badge */}
              <div className="absolute top-3 left-3">
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono ${
                    isProduction
                      ? "bg-money text-[#1c0d0d]"
                      : "bg-foreground text-background"
                  }`}
                >
                  {isProduction ? "Production" : "Development"}
                </span>
              </div>

              {/* Arrow — always visible, slides on hover */}
              <div className="absolute top-3 right-3 transition-all duration-500 ease-out translate-y-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <div className="w-8 h-8 rounded-full bg-surface-solid soft-border flex items-center justify-center group-hover:bg-[var(--bg-btn-pm)] group-hover:text-[var(--txt-btn-pm)] transition-colors duration-300">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className={`p-5 space-y-3 ${featured ? "md:p-6" : ""}`}>
              <div>
                <h3
                  className={`font-bold text-foreground mb-1.5 ${
                    featured ? "text-[16px]" : "text-[14px]"
                  }`}
                >
                  {project.title}
                </h3>
                <p
                  className={`text-foreground/70 line-clamp-2 leading-relaxed ${
                    featured ? "text-[13px]" : "text-[12px]"
                  }`}
                >
                  {project.shortDescription}
                </p>
              </div>

              {/* Impact metric */}
              {impactLabel && (
                <div className="flex items-center gap-1.5 text-[10px] text-foreground/80 font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span className="truncate">{impactLabel}</span>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {project.tags.slice(0, featured ? 5 : 4).map((tag) => (
                  <TechBadge key={tag} tech={tag} />
                ))}
              </div>
            </div>
          </Link>
        </SpotlightCard>
      </TiltCard>
    </MaskReveal>
  );
}
