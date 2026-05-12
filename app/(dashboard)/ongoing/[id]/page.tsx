"use client";

import { motion } from "framer-motion";
import { ongoingProjects } from "@/lib/data/ongoingProjects";
import { notFound } from "next/navigation";
import { Calendar, Clock, TrendingUp, Target } from "lucide-react";
import Link from "next/link";
import { TechBadge } from "@/components/ui/TechBadge";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

import { use } from "react";

export default function OngoingProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = ongoingProjects.find((p) => p.id === id);
  const { language } = useLanguage();
  const t = translations[language];

  if (!project) {
    notFound();
  }

  const statusColors = {
    'Planning': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600 dark:text-blue-400' },
    'In Progress': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600 dark:text-green-400' },
    'On Hold': { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600 dark:text-yellow-400' }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Back Button */}
      <Link
        href="/ongoing"
        className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
      >
        {t.backToOngoing}
      </Link>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[project.status].bg} ${statusColors[project.status].text}`}>
            {project.status}
          </span>
        </div>
      </motion.div>

      {/* Timeline & Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800"
      >
        <h2 className="text-2xl font-bold mb-6">{t.timelineProgress}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600" />
            <div>
              <p className="text-sm text-zinc-500">{t.startDate}</p>
              <p className="font-medium">{project.startDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-purple-600" />
            <div>
              <p className="text-sm text-zinc-500">{t.estimatedCompletion}</p>
              <p className="font-medium">{project.estimatedCompletion}</p>
            </div>
          </div>
        </div>

        {project.progress !== undefined && (
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">{t.overallProgress}</span>
              <span className="text-sm font-bold text-blue-600">{project.progress}%</span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 h-3 rounded-full"
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Key Goals */}
      {project.keyGoals && project.keyGoals.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-600" />
            {t.keyGoals}
          </h2>
          <ul className="space-y-3">
            {project.keyGoals.map((goal, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + idx * 0.1 }}
                className="flex items-start gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                <span>{goal}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800"
      >
        <h2 className="text-2xl font-bold mb-6">{t.plannedTechStack}</h2>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>
      </motion.div>

      {/* Status Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`rounded-xl p-6 ${
          project.status === 'In Progress'
            ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
            : project.status === 'Planning'
            ? 'bg-gradient-to-br from-teal-500 to-cyan-500'
            : 'bg-gradient-to-br from-yellow-600 to-orange-600'
        } text-white`}
      >
        <TrendingUp className="w-8 h-8 mb-3" />
        <h3 className="text-xl font-bold mb-2">{t.projectStatus}</h3>
        <p className="opacity-90">
          {project.status === 'In Progress' && t.statusInProgress}
          {project.status === 'Planning' && t.statusPlanning}
          {project.status === 'On Hold' && t.statusOnHold}
        </p>
      </motion.div>
    </div>
  );
}
