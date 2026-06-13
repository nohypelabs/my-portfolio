"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { ScrollReveal } from "@/components/ScrollReveal";
import { useLanguage } from "@/lib/context/LanguageContext";
import type { Project } from "@/lib/domain/entities/Project";
import {
  ArrowRight,
  ArrowUpRight,
  Building2,
  CheckCircle2,
  ExternalLink,
  FolderKanban,
  Gauge,
  Globe2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const productionProjects = projects.filter((project) => project.status === "production");

function getFeaturedProject() {
  return productionProjects.find((project) => project.id === "selisih-berat") ?? productionProjects[0];
}

function getProjectAngle(project: Project, isEn: boolean) {
  const title = project.title.toLowerCase();

  if (title.includes("logistics") || title.includes("j&t") || title.includes("serat")) {
    return {
      label: isEn ? "Operations proof" : "Bukti operasional",
      summary: isEn
        ? "A clear example of how a repetitive field workflow was turned into a much faster, auditable system."
        : "Contoh yang jelas bagaimana workflow lapangan yang repetitif diubah menjadi sistem yang jauh lebih cepat dan bisa diaudit.",
    };
  }

  if (title.includes("wc check") || title.includes("inspection")) {
    return {
      label: isEn ? "Monitoring proof" : "Bukti monitoring",
      summary: isEn
        ? "A proof point for replacing paper-based inspection and reporting with live, traceable data."
        : "Bukti bahwa inspeksi dan reporting berbasis kertas bisa diganti menjadi data live yang bisa ditelusuri.",
    };
  }

  if (title.includes("pos") || title.includes("warehouse")) {
    return {
      label: isEn ? "Retail workflow" : "Workflow retail",
      summary: isEn
        ? "Shows how a real business workflow can move from scattered tools into one usable operating surface."
        : "Menunjukkan bagaimana workflow bisnis nyata bisa pindah dari tools yang terpencar ke satu surface operasional yang bisa dipakai.",
    };
  }

  if (title.includes("e-commerce") || title.includes("qohira")) {
    return {
      label: isEn ? "Commerce workflow" : "Workflow commerce",
      summary: isEn
        ? "Useful for clients who need a more controlled order, payment, and admin flow instead of ad-hoc handling."
        : "Relevan untuk client yang butuh alur order, pembayaran, dan admin yang lebih terkontrol daripada handling yang ad-hoc.",
    };
  }

  return {
    label: isEn ? "System build" : "Build sistem",
    summary: isEn
      ? "A case study focused on turning a business bottleneck into a more practical web-based workflow."
      : "Case study yang berfokus mengubah bottleneck bisnis menjadi workflow berbasis web yang lebih praktis.",
  };
}

export default function ProjectsPage() {
  const { language } = useLanguage();
  const isEn = language === "en";
  const featuredProject = getFeaturedProject();

  const liveDemoCount = productionProjects.filter((project) => Boolean(project.demo)).length;
  const documentedStudies = productionProjects.filter((project) => Boolean(project.caseStudy)).length;
  const proofMetricsCount = productionProjects.reduce(
    (count, project) => count + (project.caseStudy?.metrics.length ?? 0),
    0
  );
  const years = productionProjects
    .map((project) => Number(project.year))
    .filter((year) => Number.isFinite(year));
  const shipWindow =
    years.length > 0 ? `${Math.min(...years)}-${Math.max(...years)}` : isEn ? "Recent" : "Terbaru";

  const stats = [
    {
      value: String(productionProjects.length),
      label: isEn ? "production systems" : "sistem production",
    },
    {
      value: String(liveDemoCount),
      label: isEn ? "live demos available" : "demo live tersedia",
    },
    {
      value: String(documentedStudies),
      label: isEn ? "documented case studies" : "case study terdokumentasi",
    },
    {
      value: `${proofMetricsCount}+`,
      label: isEn ? "before/after proof points" : "titik bukti sebelum/sesudah",
    },
    {
      value: shipWindow,
      label: isEn ? "shipping window" : "rentang shipping",
    },
  ];

  const reviewLenses = isEn
    ? [
        {
          icon: Building2,
          title: "Business context first",
          desc: "Each project is framed around the operational or conversion problem, not just the tech stack.",
        },
        {
          icon: Gauge,
          title: "Before versus after",
          desc: "The strongest proof is not visual polish alone, but the shift in speed, clarity, or workflow friction.",
        },
        {
          icon: Globe2,
          title: "Real usage matters",
          desc: "These are meant to show what changed when the build was actually used in day-to-day work.",
        },
      ]
    : [
        {
          icon: Building2,
          title: "Konteks bisnis dulu",
          desc: "Setiap project dibingkai dari problem operasional atau conversion, bukan cuma tumpukan tech stack.",
        },
        {
          icon: Gauge,
          title: "Sebelum versus sesudah",
          desc: "Bukti terkuat bukan cuma polish visual, tapi perubahan kecepatan, kejelasan, atau friction workflow.",
        },
        {
          icon: Globe2,
          title: "Penggunaan nyata itu penting",
          desc: "Tujuan halaman ini adalah menunjukkan apa yang berubah saat build-nya benar-benar dipakai sehari-hari.",
        },
      ];

  return (
    <div className="mx-auto max-w-6xl space-y-10 pb-12">
      <motion.div {...fadeUp} className="rounded-[35px] border border-neutral-400 bg-[#FAFAFA] p-6 md:p-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c4956a]/20 bg-[#f7f3e8] px-3 py-1 text-xs font-semibold text-[#a67d55]">
            <FolderKanban className="h-3.5 w-3.5" />
            {isEn ? "Case studies" : "Case studies"}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
            {isEn
              ? "Proof from real builds, with the business context still visible."
              : "Bukti dari build nyata, dengan konteks bisnis yang tetap kelihatan."}
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            {isEn
              ? "This page is not a gallery of random screenshots. It is a closer look at what was weak before, what changed in the system, and why the output mattered to the team or the business after launch."
              : "Halaman ini bukan galeri screenshot acak. Ini adalah rangkuman yang lebih dekat tentang apa yang lemah sebelumnya, apa yang berubah di sistemnya, dan kenapa output itu penting buat tim atau bisnis setelah dipakai."}
          </p>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-[24px] border border-neutral-300 bg-[#f7f3e8] p-4">
              <div className="text-2xl font-extrabold text-[#a67d55]">{stat.value}</div>
              <p className="mt-2 text-xs leading-relaxed text-neutral-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <ScrollReveal>
        <div className="grid gap-4 md:grid-cols-3">
          {reviewLenses.map((lens) => (
            <div key={lens.title} className="rounded-[28px] border border-neutral-400 bg-[#FAFAFA] p-5">
              <lens.icon className="h-4 w-4 text-[#c4956a]" />
              <h2 className="mt-3 text-sm font-bold text-neutral-900">{lens.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-neutral-600">{lens.desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {featuredProject && (
        <ScrollReveal>
          <div className="rounded-[35px] border border-neutral-400 bg-[#FAFAFA] p-6 md:p-8">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#c4956a]/20 bg-[#f7f3e8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a67d55]">
                  <Sparkles className="h-3 w-3" />
                  {isEn ? "Featured proof" : "Proof utama"}
                </div>
                <h2 className="mt-3 text-2xl font-bold text-neutral-900 md:text-3xl">
                  {isEn ? "A case study worth scanning first" : "Case study yang paling enak discan dulu"}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {isEn
                    ? "Start here if you want the fastest picture of how nasaq.id frames operational pain, turns it into a system, and then measures the change."
                    : "Mulai dari sini kalau kamu ingin gambaran tercepat tentang bagaimana nasaq.id membaca pain operasional, mengubahnya jadi sistem, lalu mengukur perubahannya."}
                </p>
              </div>

              <Link
                href={`/projects/${featuredProject.id}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#a67d55] transition-colors hover:text-[#8b6543]"
              >
                {isEn ? "Read full case study" : "Baca case study lengkap"}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="overflow-hidden rounded-[28px] border border-neutral-300 bg-[#f7f3e8]">
                <Image
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  width={1400}
                  height={900}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  priority
                />
              </div>

              <div className="space-y-4">
                <div>
                  <div className="inline-flex rounded-full border border-[#c4956a]/20 bg-[#f7f3e8] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a67d55]">
                    {getProjectAngle(featuredProject, isEn).label}
                  </div>
                  <h3 className="mt-3 text-2xl font-bold text-neutral-900">{featuredProject.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                    {getProjectAngle(featuredProject, isEn).summary}
                  </p>
                </div>

                <div className="rounded-[24px] border border-neutral-300 bg-[#f7f3e8] p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                    {isEn ? "Challenge" : "Challenge"}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-800">
                    {featuredProject.caseStudy?.problem ?? featuredProject.shortDescription}
                  </p>
                </div>

                {featuredProject.caseStudy?.metrics?.length ? (
                  <div className="space-y-3">
                    {featuredProject.caseStudy.metrics.slice(0, 3).map((metric) => (
                      <div
                        key={metric.label}
                        className="grid gap-3 rounded-[24px] border border-neutral-300 bg-[#FAFAFA] p-4 md:grid-cols-[0.9fr_1fr_1fr] md:items-center"
                      >
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
                          {metric.label}
                        </p>
                        <div className="rounded-2xl border border-red-100 bg-red-50 px-3 py-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-red-500">
                            {isEn ? "Before" : "Sebelum"}
                          </p>
                          <p className="mt-1 text-sm font-medium text-neutral-800">{metric.before}</p>
                        </div>
                        <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-3 py-3">
                          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-600">
                            {isEn ? "After" : "Sesudah"}
                          </p>
                          <p className="mt-1 text-sm font-medium text-neutral-800">{metric.after}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : null}

                <div className="flex flex-wrap gap-2">
                  {featuredProject.impact?.users && (
                    <span className="rounded-full border border-neutral-300 bg-[#FAFAFA] px-3 py-1 text-xs text-neutral-700">
                      {featuredProject.impact.users}
                    </span>
                  )}
                  {featuredProject.impact?.dataVolume && (
                    <span className="rounded-full border border-neutral-300 bg-[#FAFAFA] px-3 py-1 text-xs text-neutral-700">
                      {featuredProject.impact.dataVolume}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      <ScrollReveal>
        <div className="space-y-5 rounded-[35px] border border-neutral-400 bg-[#FAFAFA] p-6 md:p-8">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold text-neutral-900">
              {isEn ? "Browse each case by the kind of problem it solved" : "Lihat tiap case dari jenis problem yang berhasil diselesaikan"}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {isEn
                ? "Each card below keeps the business problem visible, so the page reads more like proof and less like a portfolio catalog."
                : "Setiap card di bawah ini menjaga problem bisnisnya tetap terlihat, jadi halamannya terasa seperti proof, bukan katalog portfolio biasa."}
            </p>
          </div>

          <div className="grid gap-5">
            {productionProjects.map((project, index) => {
              const angle = getProjectAngle(project, isEn);
              const metrics = project.caseStudy?.metrics.slice(0, 2) ?? [];

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + index * 0.05, duration: 0.45 }}
                >
                  <Link
                    href={`/projects/${project.id}`}
                    className="group grid gap-5 rounded-[30px] border border-neutral-400 bg-[#f7f3e8] p-5 transition-all hover:-translate-y-1 hover:border-[#c4956a]/35 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] lg:grid-cols-[320px_1fr]"
                  >
                    <div className="overflow-hidden rounded-[24px] border border-neutral-300 bg-[#FAFAFA]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={1200}
                        height={900}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 100vw, 320px"
                      />
                    </div>

                    <div className="flex flex-col justify-between gap-4">
                      <div className="space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="rounded-full border border-[#c4956a]/20 bg-[#FAFAFA] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a67d55]">
                            {angle.label}
                          </span>
                          <span className="rounded-full border border-neutral-300 bg-[#FAFAFA] px-3 py-1 text-[11px] font-medium text-neutral-600">
                            {project.year}
                          </span>
                          <span className="rounded-full border border-neutral-300 bg-[#FAFAFA] px-3 py-1 text-[11px] font-medium text-neutral-600">
                            {project.status}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold text-neutral-900 transition-colors group-hover:text-[#a67d55]">
                            {project.title}
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-neutral-600">{project.shortDescription}</p>
                        </div>

                        <div className="grid gap-3 lg:grid-cols-2">
                          <div className="rounded-[24px] border border-neutral-300 bg-[#FAFAFA] p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                              {isEn ? "Problem seen on the ground" : "Problem yang terjadi di lapangan"}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-neutral-800">
                              {project.caseStudy?.problem ?? angle.summary}
                            </p>
                          </div>
                          <div className="rounded-[24px] border border-neutral-300 bg-[#FAFAFA] p-4">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                              {isEn ? "What changed" : "Apa yang berubah"}
                            </p>
                            <p className="mt-2 text-sm leading-relaxed text-neutral-800">
                              {project.caseStudy?.solution ?? project.fullDescription}
                            </p>
                          </div>
                        </div>

                        {metrics.length > 0 && (
                          <div className="grid gap-3 md:grid-cols-2">
                            {metrics.map((metric) => (
                              <div key={metric.label} className="rounded-[24px] border border-neutral-300 bg-[#FAFAFA] p-4">
                                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                                  {metric.label}
                                </p>
                                <div className="mt-3 flex items-center gap-2 text-xs">
                                  <span className="rounded-full bg-red-50 px-2 py-1 font-semibold text-red-500">
                                    {isEn ? "Before" : "Sebelum"}
                                  </span>
                                  <span className="text-neutral-600">{metric.before}</span>
                                </div>
                                <div className="mt-2 flex items-center gap-2 text-xs">
                                  <span className="rounded-full bg-emerald-50 px-2 py-1 font-semibold text-emerald-600">
                                    {isEn ? "After" : "Sesudah"}
                                  </span>
                                  <span className="text-neutral-800">{metric.after}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 border-t border-neutral-300 pt-4 md:flex-row md:items-center md:justify-between">
                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 4).map((tag) => (
                            <span key={tag} className="rounded-full border border-neutral-300 bg-[#FAFAFA] px-3 py-1 text-xs text-neutral-600">
                              {tag}
                            </span>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          {project.demo && (
                            <span
                              role="link"
                              tabIndex={0}
                              onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                window.open(project.demo, "_blank", "noopener,noreferrer");
                              }}
                              onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                  event.preventDefault();
                                  event.stopPropagation();
                                  window.open(project.demo, "_blank", "noopener,noreferrer");
                                }
                              }}
                              className="inline-flex cursor-pointer items-center gap-2 rounded-[20px] bg-[#c4956a] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#a67d55]"
                            >
                              {isEn ? "Visit live" : "Lihat live"}
                              <ExternalLink className="h-3.5 w-3.5" />
                            </span>
                          )}
                          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#a67d55]">
                            {isEn ? "Open full case study" : "Buka case study lengkap"}
                            <ArrowUpRight className="h-4 w-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="rounded-[35px] border border-neutral-400 bg-[#FAFAFA] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-neutral-900">
                {isEn
                  ? "If one of these problems feels familiar, the next step is not guessing."
                  : "Kalau salah satu problem di atas terasa familiar, langkah berikutnya bukan menebak-nebak."}
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                {isEn
                  ? "Bring the current bottleneck, the team reality, and the target outcome. The first job is to narrow the right scope, not to sell the largest build by default."
                  : "Bawa bottleneck yang sedang terjadi, realita timnya, dan target hasil yang diinginkan. Tugas pertama bukan menjual build terbesar, tapi mempersempit scope yang paling tepat."}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-[22px] border border-neutral-400 bg-[#f7f3e8] px-4 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#efe4cf]"
              >
                {isEn ? "Discuss the problem" : "Diskusikan problemnya"}
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
