"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { personalInfo } from "@/lib/data/personalInfo";
import {
  ArrowUpRight,
  Building2,
  Check,
  Clock,
  Copy,
  Github,
  Linkedin,
  Mail,
  Phone,
  Rocket,
  ShieldCheck,
  Twitter,
  Zap,
} from "lucide-react";
import { useLanguage } from "@/lib/context/LanguageContext";
import { useState } from "react";

const waNumber = personalInfo.contact.phone.replace(/^0/, "62");

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const colorMap: Record<string, { icon: string; hover: string; bg: string; ring: string }> = {
  green: { icon: "text-green-600", hover: "hover:border-neutral-400", bg: "bg-[#FAFAFA]", ring: "ring-[#c4956a]/20" },
  emerald: { icon: "text-[#c4956a]", hover: "hover:border-neutral-400", bg: "bg-[#FAFAFA]", ring: "ring-[#c4956a]/20" },
  blue: { icon: "text-blue-600", hover: "hover:border-neutral-400", bg: "bg-blue-50", ring: "ring-blue-500/20" },
  zinc: { icon: "text-neutral-700", hover: "hover:border-neutral-400", bg: "bg-neutral-100", ring: "ring-neutral-300" },
};

export default function ContactPage() {
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);
  const isEn = language === "en";

  const socialLinks = [
    {
      name: "WhatsApp",
      icon: Phone,
      customIcon: WhatsAppIcon,
      url: `https://wa.me/${waNumber}`,
      handle: isEn ? "Quick project chat" : "Chat cepat soal project",
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
      name: "LinkedIn",
      icon: Linkedin,
      url: personalInfo.contact.linkedin,
      handle: "nasaq.id",
      color: "blue",
    },
    {
      name: "GitHub",
      icon: Github,
      url: personalInfo.contact.github,
      handle: "@nohypelabs",
      color: "zinc",
    },
    {
      name: "X",
      icon: Twitter,
      url: personalInfo.contact.twitter,
      handle: "@nohypelabs",
      color: "zinc",
    },
  ];

  const goodFit = isEn
    ? [
        "Company profile or landing page that needs better trust and clearer CTA.",
        "Internal dashboard or admin workflow that still feels manual and messy.",
        "Custom web app where the business flow matters more than showing off features.",
      ]
    : [
        "Company profile atau landing page yang perlu trust lebih kuat dan CTA lebih jelas.",
        "Dashboard internal atau workflow admin yang masih terasa manual dan berantakan.",
        "Web app custom di mana flow bisnis lebih penting daripada pamer fitur.",
      ];

  const copyEmail = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[35px] border border-neutral-400 bg-[#FAFAFA] p-6 md:p-8"
      >
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c4956a]/20 bg-[#f7f3e8] px-3 py-1 text-xs font-semibold text-[#a67d55]">
            <Rocket className="h-3.5 w-3.5" />
            {isEn ? "Project consultation" : "Konsultasi project"}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-4xl">
            {isEn ? "Discuss the project before it gets more complicated." : "Diskusikan project sebelum makin ribet."}
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            {isEn
              ? "If you need a sharper company profile, a cleaner internal dashboard, or a custom web system that matches real operations, start here. The first goal is clarity: problem, scope, priority, and the fastest safe build path."
              : "Kalau kamu butuh company profile yang lebih tajam, dashboard internal yang lebih rapi, atau sistem web custom yang cocok dengan operasional nyata, mulai dari sini. Tujuan pertama adalah kejelasan: problem, scope, prioritas, dan jalur build tercepat yang tetap aman."}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="grid grid-cols-1 gap-3 md:grid-cols-3"
      >
        <div className="flex items-center gap-3 rounded-[26px] border border-neutral-400 bg-[#FAFAFA] px-4 py-4">
          <Clock className="h-4 w-4 text-[#c4956a]" />
          <div>
            <p className="text-xs font-semibold text-neutral-900">{isEn ? "Response rhythm" : "Waktu respons"}</p>
            <p className="text-[11px] text-neutral-500">{isEn ? "Usually within 1 x 24 hours" : "Biasanya dalam 1 x 24 jam"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-[26px] border border-neutral-400 bg-[#FAFAFA] px-4 py-4">
          <ShieldCheck className="h-4 w-4 text-[#c4956a]" />
          <div>
            <p className="text-xs font-semibold text-neutral-900">{isEn ? "Preferred start" : "Cara mulai yang disukai"}</p>
            <p className="text-[11px] text-neutral-500">{isEn ? "Brief first, then estimate and direction" : "Mulai dari brief, lalu estimasi dan arah kerja"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-[26px] border border-neutral-400 bg-[#FAFAFA] px-4 py-4">
          <Building2 className="h-4 w-4 text-[#c4956a]" />
          <div>
            <p className="text-xs font-semibold text-neutral-900">{isEn ? "Base" : "Domisili"}</p>
            <p className="text-[11px] text-neutral-500">{isEn ? "Bandung, remote across Indonesia" : "Bandung, remote untuk client di seluruh Indonesia"}</p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="space-y-4 rounded-[35px] border border-neutral-400 bg-[#FAFAFA] p-6"
        >
          <div>
            <h2 className="text-xl font-bold text-neutral-900">
              {isEn ? "Quick brief by email" : "Kirim brief cepat lewat email"}
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              {isEn
                ? "For early discussion, a short but structured brief is enough."
                : "Untuk diskusi awal, brief singkat tapi terstruktur sudah cukup."}
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = String(formData.get("name") ?? "");
              const company = String(formData.get("company") ?? "");
              const projectType = String(formData.get("projectType") ?? "");
              const budget = String(formData.get("budget") ?? "");
              const message = String(formData.get("message") ?? "");

              const subject = encodeURIComponent(
                isEn
                  ? `Project Brief from ${company || name}`
                  : `Brief Project dari ${company || name}`
              );

              const body = encodeURIComponent(
                [
                  `Name: ${name}`,
                  `Company: ${company}`,
                  `Project Type: ${projectType}`,
                  `Budget Range: ${budget}`,
                  "",
                  "Project Notes:",
                  message,
                ].join("\n")
              );

              window.open(`mailto:${personalInfo.contact.email}?subject=${subject}&body=${body}`);
            }}
            className="space-y-4"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700">
                  {isEn ? "Name" : "Nama"}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={isEn ? "Your name" : "Nama kamu"}
                  className="w-full rounded-xl border border-neutral-400 bg-[#f7f3e8] px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#c4956a] focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700">
                  {isEn ? "Company / Brand" : "Perusahaan / Brand"}
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  placeholder={isEn ? "Business name" : "Nama bisnis"}
                  className="w-full rounded-xl border border-neutral-400 bg-[#f7f3e8] px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#c4956a] focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700">
                  {isEn ? "Project type" : "Tipe project"}
                </label>
                <input
                  type="text"
                  name="projectType"
                  required
                  placeholder={isEn ? "Company profile, dashboard, custom app" : "Company profile, dashboard, custom app"}
                  className="w-full rounded-xl border border-neutral-400 bg-[#f7f3e8] px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#c4956a] focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-medium text-neutral-700">
                  {isEn ? "Budget range" : "Range budget"}
                </label>
                <input
                  type="text"
                  name="budget"
                  placeholder={isEn ? "Optional" : "Opsional"}
                  className="w-full rounded-xl border border-neutral-400 bg-[#f7f3e8] px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#c4956a] focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium text-neutral-700">
                {isEn ? "What needs to happen?" : "Apa yang perlu dibangun atau dibenahi?"}
              </label>
              <textarea
                name="message"
                required
                rows={6}
                placeholder={
                  isEn
                    ? "Write the current problem, the target result, and anything that already exists."
                    : "Tulis problem saat ini, hasil yang diinginkan, dan apa saja yang sudah ada."
                }
                className="w-full resize-none rounded-xl border border-neutral-400 bg-[#f7f3e8] px-3 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:border-[#c4956a] focus:outline-none focus:ring-2 focus:ring-[#c4956a]/40"
              />
            </div>

            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#c4956a] px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-[#a67d55]"
            >
              <Mail className="h-4 w-4" />
              {isEn ? "Open email draft" : "Buka draft email"}
            </button>
          </form>
        </motion.div>

        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18 }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1"
          >
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              const colors = colorMap[link.color];

              return (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + index * 0.06 }}
                  className={`group rounded-[28px] border border-neutral-400 bg-[#FAFAFA] p-5 transition-all hover:shadow-lg ${colors.hover}`}
                >
                  <div className="flex items-center gap-3">
                    <a
                      href={link.url}
                      target={link.url.startsWith("mailto") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="flex min-w-0 flex-1 items-center gap-4"
                    >
                      <div className={`rounded-xl p-3 ring-1 ${colors.bg} ${colors.ring}`}>
                        {link.customIcon ? (
                          <link.customIcon className={`h-5 w-5 ${colors.icon}`} />
                        ) : (
                          <Icon className={`h-5 w-5 ${colors.icon}`} />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="mb-0.5 text-sm font-bold text-neutral-900">{link.name}</h3>
                        <p className="truncate text-xs text-neutral-500">{link.handle}</p>
                      </div>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-neutral-500 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900" />
                    </a>

                    {link.copyable && (
                      <button
                        onClick={copyEmail}
                        className="rounded-lg bg-neutral-100 p-2 transition-colors hover:bg-neutral-200"
                        title={copied ? "Copied!" : "Copy email"}
                      >
                        {copied ? (
                          <Check className="h-3.5 w-3.5 text-[#c4956a]" />
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-neutral-500" />
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="rounded-[35px] border border-neutral-400 bg-[#FAFAFA] p-6"
          >
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#c4956a]" />
              <h2 className="text-lg font-bold text-neutral-900">{isEn ? "Best fit" : "Cocok untuk"}</h2>
            </div>
            <ul className="space-y-3 text-sm text-neutral-600">
              {goodFit.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-0.5 text-[#c4956a]">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="relative overflow-hidden rounded-[35px] border border-neutral-400 bg-[#FAFAFA]"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#c4956a]/5 via-transparent to-transparent" />
        <div className="relative flex flex-col gap-5 p-8 md:flex-row md:items-end md:justify-between md:p-10">
          <div className="max-w-2xl space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a67d55]">
              {isEn ? "Structured route" : "Route yang lebih rapi"}
            </p>
            <h2 className="text-2xl font-bold text-neutral-900">
              {isEn ? "If the scope is clearer, use the order form." : "Kalau scope-nya sudah lebih jelas, pakai form order."}
            </h2>
            <p className="text-sm leading-relaxed text-neutral-600">
              {isEn
                ? "The order page is better when you already know the project type, target timeline, and the rough outcome you want."
                : "Halaman order lebih cocok kalau kamu sudah tahu tipe project, target timeline, dan outcome kasar yang kamu mau."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/order"
              className="group inline-flex items-center gap-2 rounded-xl bg-[#c4956a] px-6 py-3 font-semibold text-white transition-all hover:bg-[#a67d55]"
            >
              {isEn ? "Open project brief" : "Buka brief project"}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
            <a
              href={`mailto:${personalInfo.contact.email}`}
              className="inline-flex items-center gap-2 rounded-xl border border-neutral-400 px-6 py-3 font-semibold text-neutral-900 transition-all hover:bg-neutral-50"
            >
              <Mail className="h-4 w-4" />
              {isEn ? "Send direct email" : "Kirim email langsung"}
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
