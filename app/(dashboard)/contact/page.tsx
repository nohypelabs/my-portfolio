"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data/personalInfo";
import { Github, Linkedin, Mail, Twitter, ArrowUpRight, Rocket, Copy, Check, Clock, Circle, Zap } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useState } from "react";

const socialLinks = [
  {
    name: "Email",
    icon: Mail,
    url: `mailto:${personalInfo.contact.email}`,
    handle: personalInfo.contact.email,
    color: "emerald",
    copyable: true,
  },
  {
    name: "GitHub",
    icon: Github,
    url: personalInfo.contact.github,
    handle: "@nohypelabs",
    color: "zinc",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    url: personalInfo.contact.linkedin,
    handle: "Abdul Gofur",
    color: "blue",
  },
  {
    name: "X (Twitter)",
    icon: Twitter,
    url: personalInfo.contact.twitter,
    handle: "@nohypelabs",
    color: "zinc",
  },
];

const colorMap: Record<string, { icon: string; hover: string; bg: string; ring: string }> = {
  emerald: { icon: "text-emerald-500", hover: "hover:border-emerald-500/30", bg: "bg-emerald-500/10", ring: "ring-emerald-500/20" },
  blue: { icon: "text-blue-500", hover: "hover:border-blue-500/30", bg: "bg-blue-500/10", ring: "ring-blue-500/20" },
  zinc: { icon: "text-zinc-400", hover: "hover:border-zinc-600/30", bg: "bg-zinc-800/50", ring: "ring-zinc-700/20" },
};

export default function ContactPage() {
  const { language } = useLanguage();
  const t = translations[language];
  const [copied, setCopied] = useState(false);

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
          <Rocket className="w-3.5 h-3.5" />
          {language === "en" ? "Let's connect" : "Mari terhubung"}
        </div>
        <h1 className="text-4xl font-bold mb-3">{t.getInTouch}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-md mx-auto">
          {t.getInTouchDesc}
        </p>
      </motion.div>

      {/* Availability Strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3"
      >
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-500/5 border border-emerald-500/15">
          <Circle className="w-3 h-3 text-emerald-500 fill-emerald-500 animate-pulse" />
          <div>
            <p className="text-xs font-semibold text-emerald-400">
              {language === "en" ? "Available for projects" : "Tersedia untuk proyek"}
            </p>
            <p className="text-[10px] text-zinc-500">
              {language === "en" ? "Freelance & contract" : "Freelance & kontrak"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <Clock className="w-4 h-4 text-blue-400" />
          <div>
            <p className="text-xs font-semibold text-zinc-200">
              {language === "en" ? "Response time" : "Waktu respons"}
            </p>
            <p className="text-[10px] text-zinc-500">
              {language === "en" ? "Usually within 24 hours" : "Biasanya dalam 24 jam"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 border border-white/10">
          <Zap className="w-4 h-4 text-yellow-400" />
          <div>
            <p className="text-xs font-semibold text-zinc-200">
              {language === "en" ? "Timezone" : "Zona waktu"}
            </p>
            <p className="text-[10px] text-zinc-500">GMT+7 (WIB)</p>
          </div>
        </div>
      </motion.div>

      {/* Social Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialLinks.map((link, index) => {
          const Icon = link.icon;
          const colors = colorMap[link.color];
          return (
            <motion.a
              key={link.name}
              href={link.url}
              target={link.url.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08 }}
              className={`group relative bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 ${colors.hover} transition-all hover:shadow-lg`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${colors.bg} ring-1 ${colors.ring}`}>
                  <Icon className={`w-5 h-5 ${colors.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm mb-0.5">{link.name}</h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">{link.handle}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {link.copyable && (
                    <button
                      onClick={copyEmail}
                      className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                      title={copied ? "Copied!" : "Copy email"}
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-zinc-400" />
                      )}
                    </button>
                  )}
                  <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-zinc-200 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="noise-overlay relative overflow-hidden bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950 rounded-2xl border border-emerald-500/10"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />

        <div className="relative p-8 md:p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">{t.letsBuildTogether}</h2>
          <p className="text-zinc-400 mb-6 max-w-md mx-auto text-sm">
            {t.letsBuildDesc}
          </p>
          <a
            href={`mailto:${personalInfo.contact.email}`}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl font-semibold transition-all shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30"
          >
            <Mail className="w-4 h-4" />
            {t.sendMeEmail}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
