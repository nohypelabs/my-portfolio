"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Mail } from "lucide-react";
import { personalInfo } from "@/lib/data/personalInfo";
import { useLanguage } from "@/lib/context/LanguageContext";

const socialLinks = [
  {
    name: "GitHub",
    href: personalInfo.contact.github,
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: personalInfo.contact.linkedin,
    icon: Linkedin,
  },
  {
    name: "X / Twitter",
    href: personalInfo.contact.twitter,
    icon: Twitter,
  },
  {
    name: "Email",
    href: `mailto:${personalInfo.contact.email}`,
    icon: Mail,
  },
];

export function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="border-t border-white/5">
      <div className="max-w-5xl mx-auto px-4 py-8 pb-20 lg:pb-8">
        {/* Social Links */}
        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              target={link.name === "Email" ? undefined : "_blank"}
              rel={link.name === "Email" ? undefined : "noopener noreferrer"}
              aria-label={link.name}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-lg bg-zinc-900 text-zinc-400 hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors duration-200"
            >
              <link.icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>

        {/* Credit & Copyright */}
        <div className="mt-6 flex flex-col items-center gap-1.5 text-xs text-zinc-500">
          <p>
            {language === "en"
              ? "Built with Next.js & Claude"
              : "Dibuat dengan Next.js & Claude"}
          </p>
          <p>&copy; {new Date().getFullYear()} {personalInfo.name}</p>
        </div>
      </div>
    </footer>
  );
}
