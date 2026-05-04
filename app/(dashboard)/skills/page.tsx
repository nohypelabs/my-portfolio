"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data/personalInfo";
import { achievements } from "@/lib/data/achievements";
import { Layout, Server, Database, Code, Zap, Rocket, CheckCircle2, Layers } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { Marquee } from "@/components/Marquee";
import { ArrowUpRight } from "lucide-react";

const achievementIcons: Record<string, typeof Rocket> = {
  rocket: Rocket,
  code: Code,
  "trending-up": ArrowUpRight,
  zap: Zap,
  layers: Layers,
  "check-circle": CheckCircle2,
  activity: Zap,
  "book-open": Layers,
};

const skillCategoryIcons = [
  { key: "frontend" as const, icon: Layout },
  { key: "backend" as const, icon: Server },
  { key: "database" as const, icon: Database },
  { key: "tools" as const, icon: Code },
  { key: "specialties" as const, icon: Zap },
];

const accentColors = [
  { bg: "bg-emerald-500/10", ring: "ring-emerald-500/20", text: "text-emerald-500", metric: "text-emerald-500" },
  { bg: "bg-blue-500/10", ring: "ring-blue-500/20", text: "text-blue-500", metric: "text-blue-500" },
  { bg: "bg-purple-500/10", ring: "ring-purple-500/20", text: "text-purple-500", metric: "text-purple-500" },
  { bg: "bg-orange-500/10", ring: "ring-orange-500/20", text: "text-orange-500", metric: "text-orange-500" },
];

export default function SkillsPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-12">
      {/* What Sets Me Apart */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-extrabold mb-1">{t.whatSetsApart}</h1>
        <p className="text-sm text-zinc-500 mb-5">
          {language === "en" ? "Key strengths & differentiators" : "Keunggulan & pembeda utama"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {achievements.slice(0, 4).map((ach, i) => {
            const Icon = achievementIcons[ach.icon] || Zap;
            const accent = accentColors[i % accentColors.length];
            return (
              <motion.div
                key={ach.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
                className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`p-3 rounded-xl ${accent.bg} ring-1 ${accent.ring}`}>
                    <Icon className={`w-6 h-6 ${accent.text}`} />
                  </div>
                  {ach.metric && (
                    <span className={`text-2xl font-extrabold ${accent.metric}`}>
                      {ach.metric}
                    </span>
                  )}
                </div>
                <h3 className="font-bold text-base mb-1.5">{ach.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{ach.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Tech Stack */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <h2 className="text-xl font-extrabold mb-1">{t.techStack}</h2>
        <p className="text-sm text-zinc-500 mb-5">
          {language === "en" ? "Technologies I work with" : "Teknologi yang saya gunakan"}
        </p>
        <div className="space-y-4">
          {skillCategoryIcons.map(({ key, icon: Icon }, rowIdx) => (
            <div key={key}>
              <div className="flex items-center gap-2 mb-2.5">
                <Icon className="w-4 h-4 text-zinc-400" />
                <span className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 capitalize">
                  {t[key] || key}
                </span>
              </div>
              <Marquee speed={20 + rowIdx * 5} className="py-1">
                {personalInfo.skills[key].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap hover:border-emerald-500/30 hover:text-emerald-500 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </Marquee>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
