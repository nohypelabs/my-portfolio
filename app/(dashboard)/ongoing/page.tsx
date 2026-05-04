"use client";

import { motion } from "framer-motion";
import { ongoingProjects } from "@/lib/data/ongoingProjects";
import Link from "next/link";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function OngoingPage() {
  const { language } = useLanguage();
  const t = translations[language];

  const sorted = [...ongoingProjects].sort((a, b) => (b.progress ?? 0) - (a.progress ?? 0));

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-extrabold mb-1">{t.inProgressProjects}</h1>
        <p className="text-sm text-zinc-500">
          {sorted.length} {language === "en" ? "projects in active development" : "proyek dalam pengembangan aktif"}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sorted.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
          >
            <Link
              href={`/ongoing/${project.id}`}
              className="group block bg-white dark:bg-zinc-900 rounded-xl p-5 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg hover:border-emerald-500/30 transition-all h-full"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {project.name}
                </h3>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium shrink-0 ${
                    project.status === "In Progress"
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400"
                  }`}
                >
                  {project.status}
                </span>
              </div>
              <p className="text-xs text-zinc-500 line-clamp-2 mb-3">{project.description}</p>
              {project.progress !== undefined && (
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-zinc-500">{t.progress}</span>
                    <span className="font-semibold">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-1.5">
                    <div
                      className="bg-emerald-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
