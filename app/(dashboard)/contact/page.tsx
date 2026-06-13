"use client";

import { motion } from "framer-motion";
import { personalInfo } from "@/lib/data/personalInfo";
import { Github, Linkedin, Mail, Twitter, ArrowUpRight, Rocket, Copy, Check, Clock, Circle, Zap, Phone } from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useState } from "react";
import Script from "next/script";

const waNumber = personalInfo.contact.phone.replace(/^0/, "62");

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const socialLinks = [
  {
    name: "WhatsApp",
    icon: Phone,
    customIcon: WhatsAppIcon,
    url: `https://wa.me/${waNumber}`,
    handle: "Chat via WhatsApp",
    color: "green",
  },
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
    handle: "nasaq.id",
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
  green: { icon: "text-green-600", hover: "hover:border-neutral-400", bg: "bg-[#FAFAFA]", ring: "ring-[#c4956a]/20" },
  emerald: { icon: "text-[#c4956a]", hover: "hover:border-neutral-400", bg: "bg-[#FAFAFA]", ring: "ring-[#c4956a]/20" },
  blue: { icon: "text-blue-600", hover: "hover:border-neutral-400", bg: "bg-blue-50", ring: "ring-blue-500/20" },
  zinc: { icon: "text-neutral-700", hover: "hover:border-neutral-400", bg: "bg-neutral-100", ring: "ring-neutral-300" },
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAFA] border border-[#c4956a]/20 text-[#c4956a] text-xs font-semibold mb-4">
          <Rocket className="w-3.5 h-3.5" />
          {language === "en" ? "Let's connect" : "Mari terhubung"}
        </div>
        <h1 className="text-4xl font-bold mb-3 text-neutral-900">{t.getInTouch}</h1>
        <p className="text-neutral-500 max-w-md mx-auto">
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
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FAFAFA] border border-neutral-400">
          <Circle className="w-3 h-3 text-[#c4956a] fill-[#c4956a] animate-pulse" />
          <div>
            <p className="text-xs font-semibold text-[#c4956a]">
              {language === "en" ? "Available now" : "Tersedia sekarang"}
            </p>
            <p className="text-[10px] text-neutral-500">
              {language === "en" ? "Full-time · Contract · Freelance" : "Full-time · Kontrak · Freelance"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FAFAFA] border border-neutral-400">
          <Clock className="w-4 h-4 text-blue-500" />
          <div>
            <p className="text-xs font-semibold text-neutral-900">
              {language === "en" ? "Response time" : "Waktu respons"}
            </p>
            <p className="text-[10px] text-neutral-500">
              {language === "en" ? "Usually within 24 hours" : "Biasanya dalam 24 jam"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#FAFAFA] border border-neutral-400">
          <Zap className="w-4 h-4 text-yellow-500" />
          <div>
            <p className="text-xs font-semibold text-neutral-900">
              {language === "en" ? "Timezone" : "Zona waktu"}
            </p>
            <p className="text-[10px] text-neutral-500">GMT+7 (WIB)</p>
          </div>
        </div>
      </motion.div>

      {/* Social Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              className={`group relative bg-[#FAFAFA] rounded-2xl p-5 border border-neutral-400 ${colors.hover} transition-all hover:shadow-lg`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${colors.bg} ring-1 ${colors.ring}`}>
                  {link.customIcon ? <link.customIcon className={`w-5 h-5 ${colors.icon}`} /> : <Icon className={`w-5 h-5 ${colors.icon}`} />}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-sm mb-0.5 text-neutral-900">{link.name}</h3>
                  <p className="text-xs text-neutral-500 truncate">{link.handle}</p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  {link.copyable && (
                    <button
                      onClick={copyEmail}
                      className="p-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors"
                      title={copied ? "Copied!" : "Copy email"}
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-[#c4956a]" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-neutral-500" />
                      )}
                    </button>
                  )}
                  <ArrowUpRight className="w-4 h-4 text-neutral-500 group-hover:text-neutral-900 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[#FAFAFA] rounded-[35px] border border-neutral-400 p-6"
      >
        <h3 className="font-bold text-lg text-neutral-900 mb-1">
          {language === "en" ? "Send a Message" : "Kirim Pesan"}
        </h3>
        <p className="text-xs text-neutral-500 mb-4">
          {language === "en"
            ? "Fill out the form and I'll get back to you within 24 hours."
            : "Isi form di bawah dan saya akan merespons dalam 24 jam."}
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const name = formData.get("name");
            const email = formData.get("email");
            const message = formData.get("message");
            const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
            window.open(`mailto:${personalInfo.contact.email}?subject=${subject}&body=${body}`);
          }}
          className="space-y-3"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                {language === "en" ? "Name" : "Nama"}
              </label>
              <input
                type="text"
                name="name"
                required
                placeholder={language === "en" ? "Your name" : "Nama kamu"}
                className="w-full px-3 py-2 rounded-xl border border-neutral-400 bg-[#f7f3e8] text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#c4956a]/50 focus:border-[#c4956a]"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-neutral-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                className="w-full px-3 py-2 rounded-xl border border-neutral-400 bg-[#f7f3e8] text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#c4956a]/50 focus:border-[#c4956a]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700 mb-1">
              {language === "en" ? "Message" : "Pesan"}
            </label>
            <textarea
              name="message"
              required
              rows={4}
              placeholder={language === "en" ? "Tell me about your project..." : "Ceritakan tentang project kamu..."}
              className="w-full px-3 py-2 rounded-xl border border-neutral-400 bg-[#f7f3e8] text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#c4956a]/50 focus:border-[#c4956a] resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 bg-[#c4956a] hover:bg-[#a67d55] text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-[#c4956a]/20"
          >
            {language === "en" ? "Send Message" : "Kirim Pesan"}
          </button>
        </form>
      </motion.div>

      {/* LinkedIn Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="flex justify-center"
      >
        <div
          className="badge-base LI-profile-badge"
          data-locale="in_ID"
          data-size="medium"
          data-theme="light"
          data-type="VERTICAL"
          data-vanity="nasaq-id"
          data-version="v1"
        >
          <a
            className="badge-base__link LI-simple-link"
            href="https://id.linkedin.com/in/abdul-gofur-505345344?trk=profile-badge"
          >
            nasaq.id
          </a>
        </div>
        <Script src="https://platform.linkedin.com/badges/js/profile.js" strategy="lazyOnload" />
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="relative overflow-hidden bg-[#FAFAFA] rounded-[35px] border border-neutral-400"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#c4956a]/5 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#c4956a]/30 to-transparent" />

        <div className="relative p-8 md:p-10 text-center">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">{t.letsBuildTogether}</h2>
          <p className="text-neutral-500 mb-6 max-w-md mx-auto text-sm">
            {t.letsBuildDesc}
          </p>
          <a
            href={`mailto:${personalInfo.contact.email}`}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#c4956a] hover:bg-[#a67d55] text-white rounded-xl font-semibold transition-all shadow-lg shadow-[#c4956a]/20 hover:shadow-[#c4956a]/30"
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
