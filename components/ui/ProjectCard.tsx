"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/domain/entities/Project";
import { TechBadge } from "./TechBadge";
import { ExternalLink } from "lucide-react";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link
        href={`/projects/${project.id}`}
        className="group block bg-[#FAFAFA] rounded-[35px] border border-neutral-400 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
      >
        {/* Image */}
        <div className="aspect-video relative overflow-hidden bg-border/30">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="eager"
          />
          <div className="absolute top-3 right-3">
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#0D9488] text-white">
              Live
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-sm mb-1 text-foreground group-hover:text-[#0D9488] transition-colors">
            {project.title}
          </h3>
          <p className="text-xs text-muted line-clamp-2 mb-3">
            {project.shortDescription}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {project.tags.slice(0, 3).map((tag) => (
                <TechBadge key={tag} tech={tag} />
              ))}
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-muted group-hover:text-[#0D9488] transition-colors" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
