"use client";

import { personalInfo } from "@/lib/data/personalInfo";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { Marquee } from "@/components/Marquee";
import { motion } from "framer-motion";

export function TechStackStrip() {
  const { language } = useLanguage();
  const t = translations[language];

  const allTechs = [
    ...personalInfo.skills.frontend,
    ...personalInfo.skills.backend,
    ...personalInfo.skills.database,
    ...personalInfo.skills.tools,
    ...personalInfo.skills.specialties,
  ];

  const uniqueTechs = [...new Set(allTechs)];

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-bold text-foreground">{t.techStack}</h2>

      {/* Marquee strip */}
      <div className="neo-surface rounded-2xl overflow-hidden py-4">
        <Marquee speed={25} pauseOnHover>
          {uniqueTechs.map((tech, i) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.02 }}
              className="flex items-center gap-2 px-4 py-2 bg-[#f7f3e8] border border-neutral-200 rounded-full hover:border-[#c4956a]/30 hover:bg-[#c4956a]/5 transition-all cursor-default group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-[#c4956a]/40 group-hover:bg-[#c4956a] transition-colors" />
              <span className="text-[12px] font-medium text-neutral-700 group-hover:text-neutral-900 whitespace-nowrap transition-colors">
                {tech}
              </span>
            </motion.div>
          ))}
        </Marquee>
      </div>

      {/* Proficiency legend */}
      <div className="flex items-center gap-4 justify-center">
        {[
          { level: 'advanced', label: language === 'en' ? 'Advanced' : 'Mahir', color: 'bg-[#c4956a]' },
          { level: 'intermediate', label: language === 'en' ? 'Intermediate' : 'Menengah', color: 'bg-blue-500' },
          { level: 'familiar', label: language === 'en' ? 'Familiar' : 'Kenal', color: 'bg-neutral-400' },
        ].map(({ level, label, color }) => (
          <div key={level} className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full ${color}`} />
            <span className="text-[10px] text-neutral-500">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
