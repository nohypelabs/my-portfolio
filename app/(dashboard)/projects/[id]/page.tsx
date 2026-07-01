"use client";

import { use } from "react";
import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { ScrollReveal } from "@/components/ScrollReveal";
import { TechBadge } from "@/components/ui/TechBadge";
import { useLanguage } from "@/lib/context/LanguageContext";
import type { Project } from "@/lib/domain/entities/Project";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Github,
  Quote,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function getStatusLabel(project: Project, isEn: boolean) {
  if (project.status === "production") {
    return isEn ? "Live production" : "Production aktif";
  }

  if (project.status === "development") {
    return isEn ? "In development" : "Dalam development";
  }

  return isEn ? "Archived" : "Arsip";
}

function getContextNote(project: Project, isEn: boolean) {
  const title = project.title.toLowerCase();

  if (title.includes("serat") || title.includes("j&t")) {
    return isEn
      ? "A field-heavy logistics workflow where speed and auditability mattered more than visual novelty."
      : "Workflow logistik yang berat di lapangan, di mana kecepatan dan auditability jauh lebih penting daripada visual novelty.";
  }

  if (title.includes("wc check")) {
    return isEn
      ? "A monitoring system built to replace paper-based inspection and make reporting visible in real time."
      : "Sistem monitoring yang dibangun untuk mengganti inspeksi berbasis kertas dan membuat reporting terlihat real time.";
  }

  if (title.includes("lakupos")) {
    return isEn
      ? "A real retail operations surface that had to work for cashier flow, stock movement, and multi-outlet reality."
      : "Surface operasional retail nyata yang harus bekerja untuk flow kasir, pergerakan stok, dan realita multi-outlet.";
  }

  if (title.includes("qohira")) {
    return isEn
      ? "A commerce workflow where the important layer was not style alone, but order verification and admin clarity."
      : "Workflow commerce di mana lapisan pentingnya bukan style saja, tapi verifikasi order dan kejelasan admin.";
  }

  return isEn
    ? "A custom build where the business flow mattered more than plugging in a generic template."
    : "Build custom di mana flow bisnisnya jauh lebih penting daripada sekadar memasang template generik.";
}

export default function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projects.find((item) => item.id === id);
  const { language } = useLanguage();
  const isEn = language === "en";

  if (!project) {
    notFound();
  }

  const proofLines = [
    project.impact?.business,
    project.impact?.users,
    project.impact?.dataVolume,
    project.impact?.performance,
  ].filter(Boolean) as string[];

  return (
    <div className="mx-auto max-w-6xl space-y-8 pb-12">
      <Link
        href="/projects"
        className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition-colors hover:text-neutral-900"
      >
        <ArrowLeft className="h-4 w-4" />
        {isEn ? "Back to case studies" : "Kembali ke case studies"}
      </Link>

      <motion.div {...fadeUp} className="rounded-[35px] neo-surface p-6 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-[#c4956a]/20 bg-[#f0f0f0] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a67d55]">
                {getStatusLabel(project, isEn)}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white px-3 py-1 text-[11px] font-medium text-neutral-600">
                <Calendar className="h-3.5 w-3.5" />
                {project.year}
              </span>
              {project.caseStudy?.timeline && (
                <span className="inline-flex items-center gap-1 rounded-full border border-neutral-300 bg-white px-3 py-1 text-[11px] font-medium text-neutral-600">
                  <Clock3 className="h-3.5 w-3.5" />
                  {project.caseStudy.timeline}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 md:text-base">
                {project.shortDescription}
              </p>
            </div>

            <div className="rounded-[24px] neo-surface p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                {isEn ? "Context" : "Konteks"}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-neutral-800">{getContextNote(project, isEn)}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-neutral-300 bg-white px-3 py-1 text-xs text-neutral-600">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-[22px] bg-[#c4956a] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a67d55]"
                >
                  {isEn ? "Visit live project" : "Kunjungi project live"}
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-[22px] border border-neutral-400 bg-white px-5 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#f0f0f0]"
                >
                  {isEn ? "View source" : "Lihat source"}
                  <Github className="h-4 w-4" />
                </a>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[28px] neo-surface p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#c4956a]/20 bg-white">
                <Building2 className="h-4 w-4 text-[#c4956a]" />
              </div>
              <h2 className="mt-4 text-sm font-bold text-neutral-900">
                {isEn ? "Project at a glance" : "Sekilas project"}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">{project.fullDescription}</p>
            </div>

            <div className="rounded-[28px] neo-surface p-5">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#c4956a]/20 bg-[#f0f0f0]">
                <Sparkles className="h-4 w-4 text-[#c4956a]" />
              </div>
              <h2 className="mt-4 text-sm font-bold text-neutral-900">
                {isEn ? "What this case helps prove" : "Apa yang dibuktikan case ini"}
              </h2>
              <div className="mt-3 space-y-2">
                {proofLines.slice(0, 3).map((line) => (
                  <div key={line} className="flex items-start gap-2 text-xs leading-relaxed text-neutral-600">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#c4956a]" strokeWidth={1.6} />
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <ScrollReveal>
        <div className="overflow-hidden rounded-[35px] neo-surface">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            width={1800}
            height={1100}
            className="h-auto w-full object-cover"
            sizes="(max-width: 1024px) 100vw, 1200px"
            priority
          />
        </div>
      </ScrollReveal>

      {project.caseStudy && (
        <>
          <ScrollReveal>
            <div className="grid gap-5 lg:grid-cols-2">
              <div className="rounded-[35px] neo-surface p-6 md:p-8">
                <div className="flex items-center gap-2">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-red-100 bg-red-50">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    {isEn ? "The challenge" : "Challenge-nya"}
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-700">{project.caseStudy.problem}</p>

                {project.caseStudy.painPoints.length > 0 && (
                  <div className="mt-5 space-y-2">
                    {project.caseStudy.painPoints.map((point) => (
                      <div
                        key={point}
                        className="flex items-start gap-2 rounded-[20px] border border-red-100 bg-red-50 px-4 py-3 text-sm leading-relaxed text-neutral-700"
                      >
                        <span className="mt-0.5 text-red-500">•</span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="rounded-[35px] neo-surface p-6 md:p-8">
                <div className="flex items-center gap-2">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50">
                    <Zap className="h-4 w-4 text-emerald-600" />
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900">
                    {isEn ? "The response" : "Respons yang dibangun"}
                  </h2>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-neutral-700">{project.caseStudy.solution}</p>

                <div className="mt-5 rounded-[24px] neo-surface p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                    {isEn ? "Why it mattered" : "Kenapa ini penting"}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-800">
                    {project.impact?.business ??
                      project.impact?.users ??
                      (isEn
                        ? "The build had to remove friction in the team's real workflow, not just look presentable."
                        : "Build ini harus mengurangi friction di workflow nyata tim, bukan cuma terlihat presentable.")}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {project.caseStudy.metrics.length > 0 && (
            <ScrollReveal>
              <div className="rounded-[35px] neo-surface p-6 md:p-8">
                <h2 className="text-2xl font-bold text-neutral-900">
                  {isEn ? "Before and after, in clearer terms" : "Sebelum dan sesudah, dalam bentuk yang lebih jelas"}
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-neutral-600">
                  {isEn
                    ? "The point of this section is not decoration. It is to show the operational shift in terms the client team can immediately recognize."
                    : "Tujuan bagian ini bukan dekorasi. Tujuannya adalah menunjukkan pergeseran operasional dalam istilah yang langsung dikenali tim client."}
                </p>

                <div className="mt-6 grid gap-4">
                  {project.caseStudy.metrics.map((metric) => (
                    <div
                      key={metric.label}
                      className="grid gap-3 rounded-[28px] neo-surface p-4 md:grid-cols-[0.9fr_1fr_1fr] md:items-center"
                    >
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                          {metric.label}
                        </p>
                      </div>
                      <div className="rounded-[20px] border border-red-100 bg-red-50 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-red-500">
                          {isEn ? "Before" : "Sebelum"}
                        </p>
                        <p className="mt-1 text-sm font-medium text-neutral-800">{metric.before}</p>
                      </div>
                      <div className="rounded-[20px] border border-emerald-100 bg-emerald-50 p-4">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-600">
                          {isEn ? "After" : "Sesudah"}
                        </p>
                        <p className="mt-1 text-sm font-medium text-neutral-800">{metric.after}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          )}

          {project.caseStudy.testimonial && (
            <ScrollReveal>
              <div className="rounded-[35px] neo-surface p-6 md:p-8">
                <Quote className="h-9 w-9 text-[#c4956a]/35" />
                <blockquote className="mt-4 text-lg font-medium leading-relaxed text-neutral-900 md:text-xl">
                  &ldquo;{project.caseStudy.testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c4956a]/15 font-bold text-[#a67d55]">
                    {project.caseStudy.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-900">{project.caseStudy.testimonial.author}</p>
                    <p className="text-xs text-neutral-500">{project.caseStudy.testimonial.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}
        </>
      )}

      <ScrollReveal>
        <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[35px] neo-surface p-6 md:p-8">
            <h2 className="text-2xl font-bold text-neutral-900">
              {isEn ? "Key highlights of the build" : "Highlight utama dari build-nya"}
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {project.highlights.map((highlight) => (
                <div key={highlight.title} className="rounded-[24px] neo-surface p-4">
                  <h3 className="text-sm font-bold text-neutral-900">{highlight.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-neutral-600">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[35px] neo-surface p-6 md:p-8">
            <h2 className="text-2xl font-bold text-neutral-900">
              {isEn ? "Impact that stayed visible" : "Dampak yang tetap kelihatan"}
            </h2>
            <div className="mt-5 space-y-3">
              {proofLines.map((line) => (
                <div
                  key={line}
                  className="flex items-start gap-3 rounded-[22px] neo-surface px-4 py-4 text-sm leading-relaxed text-neutral-700"
                >
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c4956a]" />
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
          <div className="rounded-[35px] neo-surface p-6 md:p-8">
            <h2 className="text-2xl font-bold text-neutral-900">
              {isEn ? "What the system includes" : "Yang dibawa sistem ini"}
            </h2>
            <div className="mt-5 grid gap-3 lg:grid-cols-2">
              {project.features.map((feature) => (
                <div key={feature} className="flex items-start gap-2 rounded-[20px] neo-surface px-4 py-3 text-sm leading-relaxed text-neutral-700">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c4956a]" strokeWidth={1.6} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[35px] neo-surface p-6 md:p-8">
            <h2 className="text-2xl font-bold text-neutral-900">
              {isEn ? "Technology stack" : "Technology stack"}
            </h2>
            <div className="mt-5 space-y-5">
              {project.techStack.map((stack) => (
                <div key={stack.category}>
                  <h3 className="text-sm font-bold text-[#a67d55]">{stack.category}</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {stack.technologies.map((tech) => (
                      <TechBadge key={tech} tech={tech} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="rounded-[35px] neo-surface p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-neutral-900">
                {isEn
                  ? "If this kind of operational shift is what you need, start from the problem."
                  : "Kalau kamu butuh perubahan operasional seperti ini, mulainya dari problem-nya dulu."}
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                {isEn
                  ? "The fastest useful next step is not asking for a random feature list. It is clarifying what feels weak today, what friction the team still carries, and what a cleaner first version should solve."
                  : "Langkah berikutnya yang paling berguna bukan meminta daftar fitur acak. Yang lebih penting adalah menjelaskan apa yang terasa lemah hari ini, friction apa yang masih ditanggung tim, dan versi pertama yang lebih rapi harus menyelesaikan apa."}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-[22px] border border-neutral-400 bg-[#f0f0f0] px-4 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#efe4cf]"
              >
                {isEn ? "Discuss a similar case" : "Diskusikan kasus serupa"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/order"
                className="inline-flex items-center justify-center gap-2 rounded-[22px] bg-[#c4956a] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a67d55]"
              >
                {isEn ? "Start the brief" : "Mulai brief"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
