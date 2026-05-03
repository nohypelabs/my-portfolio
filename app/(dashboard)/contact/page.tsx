"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data/personalInfo";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    url: personalInfo.contact.github,
    handle: "@agds-alt"
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: personalInfo.contact.linkedin,
    handle: "Abdul Gofur"
  },
  {
    name: "Email",
    icon: Mail,
    url: `mailto:${personalInfo.contact.email}`,
    handle: personalInfo.contact.email
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: personalInfo.contact.twitter,
    handle: "@agdscID"
  }
];

export default function ContactPage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold mb-4">{t.getInTouch}</h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          {t.getInTouchDesc}
        </p>
      </motion.div>

      {/* Social Links Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          return (
            <motion.a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white dark:bg-zinc-900 rounded-xl p-8 border border-zinc-200 dark:border-zinc-800 hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                  <Icon className="w-6 h-6 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{link.name}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{link.handle}</p>
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Additional Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl p-8 text-white text-center"
      >
        <h2 className="text-2xl font-bold mb-3">{t.letsBuildTogether}</h2>
        <p className="opacity-90 mb-6">
          {t.letsBuildDesc}
        </p>
        <a
          href={`mailto:${personalInfo.contact.email}`}
          className="inline-block px-6 py-3 bg-white text-emerald-600 rounded-lg font-medium hover:bg-zinc-100 transition-colors"
        >
          {t.sendMeEmail}
        </a>
      </motion.div>
    </div>
  );
}
