"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/lib/context/LanguageContext";
import { translations } from "@/lib/translations";
import { ScrollReveal } from "@/components/ScrollReveal";
import {
  Building2,
  Target,
  Shield,
  Zap,
  Users,
  Globe,
  Award,
  ArrowUpRight,
  CheckCircle2,
  Laptop,
  Smartphone,
  Palette,
  Headphones,
  Code2,
  Database,
} from "lucide-react";
import Link from "next/link";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const COMPANY = {
  name: "nasaq.id",
  tagline: {
    id: "Solusi Digital Enterprise untuk Bisnis Anda",
    en: "Enterprise Digital Solutions for Your Business",
  },
  founded: "2024",
  location: "Bandung, Indonesia",
  email: "hello@nasaq.id",
};

const VALUES = [
  {
    icon: Shield,
    title: { id: "Production-Grade", en: "Production-Grade" },
    desc: {
      id: "Setiap sistem yang kami bangun dirancang untuk menangani beban nyata. Bukan prototype, bukan demo — sistem yang siap dipakai.",
      en: "Every system we build is designed to handle real loads. Not prototypes, not demos — systems ready for production.",
    },
  },
  {
    icon: Target,
    title: { id: "Berorientasi Hasil", en: "Result-Oriented" },
    desc: {
      id: "Kami fokus pada dampak bisnis, bukan sekadar kode. Setiap fitur harus punya alasan yang jelas untuk bisnis Anda.",
      en: "We focus on business impact, not just code. Every feature must have a clear reason for your business.",
    },
  },
  {
    icon: Zap,
    title: { id: "Kecepatan & Kualitas", en: "Speed & Quality" },
    desc: {
      id: "MVP dalam minggu, bukan bulan. Iterasi cepat dengan quality assurance yang ketat.",
      en: "MVP in weeks, not months. Rapid iteration with strict quality assurance.",
    },
  },
  {
    icon: Users,
    title: { id: "Kemitraan Jangka Panjang", en: "Long-Term Partnership" },
    desc: {
      id: "Kami bukan vendor sekali pakai. Kami adalah partner teknologi yang mendampingi pertumbuhan bisnis Anda.",
      en: "We're not one-time vendors. We're your technology partner supporting your business growth.",
    },
  },
];

const SERVICES = [
  {
    icon: Laptop,
    title: { id: "Web Application", en: "Web Application" },
    desc: {
      id: "Sistem web enterprise dengan arsitektur clean, scalable, dan maintainable.",
      en: "Enterprise web applications with clean, scalable, and maintainable architecture.",
    },
    tech: ["Next.js", "React", "TypeScript", "tRPC"],
  },
  {
    icon: Smartphone,
    title: { id: "Mobile App (Android)", en: "Mobile App (Android)" },
    desc: {
      id: "Aplikasi Android native atau cross-platform untuk operasional bisnis mobile.",
      en: "Native or cross-platform Android apps for mobile business operations.",
    },
    tech: ["React Native", "Kotlin", "Flutter"],
  },
  {
    icon: Palette,
    title: { id: "Landing Page", en: "Landing Page" },
    desc: {
      id: "Landing page profesional yang dikonversi tinggi untuk marketing dan branding bisnis Anda.",
      en: "Professional, high-converting landing pages for your business marketing and branding.",
    },
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
  },
  {
    icon: Code2,
    title: { id: "Sistem Bisnis Kustom", en: "Custom Business Systems" },
    desc: {
      id: "POS, CRM, ERP, sistem inventori — dibangun sesuai kebutuhan spesifik bisnis Anda.",
      en: "POS, CRM, ERP, inventory systems — built to your specific business needs.",
    },
    tech: ["DDD", "Clean Architecture", "Type-Safe"],
  },
  {
    icon: Database,
    title: { id: "API & Backend", en: "API & Backend" },
    desc: {
      id: "Backend robust dengan API terdokumentasi, autentikasi aman, dan database teroptimasi.",
      en: "Robust backend with documented APIs, secure authentication, and optimized databases.",
    },
    tech: ["Node.js", "PostgreSQL", "Supabase", "Redis"],
  },
  {
    icon: Headphones,
    title: { id: "Konsultasi Teknologi", en: "Technology Consulting" },
    desc: {
      id: "Konsultasi arsitektur, pemilihan tech stack, code review, dan strategi teknologi untuk bisnis Anda.",
      en: "Architecture consulting, tech stack selection, code review, and technology strategy for your business.",
    },
    tech: ["Architecture", "Code Review", "Strategy"],
  },
];

const STATS = [
  { value: "7+", label: { id: "Sistem Production", en: "Production Systems" } },
  { value: "250K+", label: { id: "Data Diproses", en: "Records Processed" } },
  { value: "3+", label: { id: "Tahun Pengalaman", en: "Years Experience" } },
  { value: "99.9%", label: { id: "Uptime", en: "Uptime" } },
];

const PROCESS = [
  { step: "01", title: { id: "Discovery", en: "Discovery" }, desc: { id: "Memahami kebutuhan bisnis Anda", en: "Understanding your business needs" } },
  { step: "02", title: { id: "Desain", en: "Design" }, desc: { id: "Merancang arsitektur & UI/UX", en: "Designing architecture & UI/UX" } },
  { step: "03", title: { id: "Development", en: "Development" }, desc: { id: "Membangun dengan standar enterprise", en: "Building with enterprise standards" } },
  { step: "04", title: { id: "Testing", en: "Testing" }, desc: { id: "Quality assurance ketat", en: "Strict quality assurance" } },
  { step: "05", title: { id: "Deploy", en: "Deploy" }, desc: { id: "Go-live ke production", en: "Go-live to production" } },
  { step: "06", title: { id: "Support", en: "Support" }, desc: { id: "Maintenance & pengembangan berkelanjutan", en: "Ongoing maintenance & development" } },
];

export default function CompanyProfilePage() {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-12">
      {/* Hero Header */}
      <motion.div {...fadeUp} className="text-center space-y-4 pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#c4956a]/10 rounded-full text-[#c4956a] text-xs font-semibold">
          <Building2 className="w-3.5 h-3.5" />
          {language === "en" ? "Company Profile" : "Profil Perusahaan"}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900">
          {COMPANY.name}
        </h1>
        <p className="text-neutral-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
          {COMPANY.tagline[language]}
        </p>
        <div className="flex items-center justify-center gap-4 text-xs text-neutral-400">
          <span>📍 {COMPANY.location}</span>
          <span>•</span>
          <span>📅 {language === "en" ? "Founded" : "Berdiri"} {COMPANY.founded}</span>
          <span>•</span>
          <span>✉️ {COMPANY.email}</span>
        </div>
      </motion.div>

      {/* Stats */}
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * i }}
              className="bg-[#FAFAFA] border border-neutral-400 rounded-[25px] p-5 text-center"
            >
              <div className="text-2xl md:text-3xl font-extrabold text-[#c4956a]">{stat.value}</div>
              <div className="text-xs text-neutral-500 mt-1">{stat.label[language]}</div>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* Vision & Mission */}
      <ScrollReveal>
        <div className="bg-[#FAFAFA] rounded-[35px] border border-neutral-400 p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Globe className="w-5 h-5 text-[#c4956a]" />
            {language === "en" ? "Vision & Mission" : "Visi & Misi"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-[#c4956a]">
                {language === "en" ? "Vision" : "Visi"}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {language === "en"
                  ? "To become the trusted technology partner for Indonesian businesses, delivering enterprise-grade digital solutions that drive real growth."
                  : "Menjadi mitra teknologi terpercaya untuk bisnis Indonesia, menghadirkan solusi digital bertaraf enterprise yang mendorong pertumbuhan nyata."}
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-sm text-[#c4956a]">
                {language === "en" ? "Mission" : "Misi"}
              </h3>
              <ul className="space-y-1.5 text-sm text-neutral-600">
                {[
                  {
                    id: "Membangun sistem berkualitas tinggi dengan harga terjangkau",
                    en: "Build high-quality systems at affordable prices",
                  },
                  {
                    id: "Memberdayakan bisnis lokal dengan teknologi modern",
                    en: "Empower local businesses with modern technology",
                  },
                  {
                    id: "Menjadi partner jangka panjang, bukan vendor sekali pakai",
                    en: "Be a long-term partner, not a one-time vendor",
                  },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#c4956a] shrink-0 mt-0.5" />
                    <span>{item[language]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Core Values */}
      <ScrollReveal>
        <div className="bg-[#FAFAFA] rounded-[35px] border border-neutral-400 p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-[#c4956a]" />
            {language === "en" ? "Core Values" : "Nilai Inti"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {VALUES.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="bg-[#f7f3e8] border border-neutral-200 rounded-[25px] p-5"
              >
                <item.icon className="w-5 h-5 text-[#c4956a] mb-2" />
                <h3 className="font-bold text-sm text-neutral-900 mb-1">
                  {item.title[language]}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed">
                  {item.desc[language]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Services */}
      <ScrollReveal>
        <div className="bg-[#FAFAFA] rounded-[35px] border border-neutral-400 p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Code2 className="w-5 h-5 text-[#c4956a]" />
            {language === "en" ? "Our Services" : "Layanan Kami"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                className="bg-[#f7f3e8] border border-neutral-200 rounded-[25px] p-5"
              >
                <item.icon className="w-5 h-5 text-[#c4956a] mb-2" />
                <h3 className="font-bold text-sm text-neutral-900 mb-1">
                  {item.title[language]}
                </h3>
                <p className="text-xs text-neutral-500 leading-relaxed mb-3">
                  {item.desc[language]}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {item.tech.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 bg-[#c4956a]/10 text-[#a67d55] rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Work Process */}
      <ScrollReveal>
        <div className="bg-[#FAFAFA] rounded-[35px] border border-neutral-400 p-6 md:p-8 space-y-4">
          <h2 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Target className="w-5 h-5 text-[#c4956a]" />
            {language === "en" ? "How We Work" : "Cara Kami Bekerja"}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {PROCESS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i }}
                className="text-center space-y-2"
              >
                <div className="w-10 h-10 mx-auto bg-[#c4956a] text-white rounded-full flex items-center justify-center text-xs font-bold">
                  {item.step}
                </div>
                <h3 className="font-bold text-sm text-neutral-900">
                  {item.title[language]}
                </h3>
                <p className="text-xs text-neutral-500">
                  {item.desc[language]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* CTA */}
      <ScrollReveal>
        <div className="flex flex-wrap gap-3 pt-4 justify-center">
          <Link
            href="/order"
            className="group inline-flex items-center gap-2 px-6 py-3 bg-[#c4956a] hover:bg-[#a67d55] text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-[#c4956a]/20"
          >
            {language === "en" ? "Start Your Project" : "Mulai Project Anda"}
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border border-neutral-400 text-neutral-900 hover:bg-neutral-50 rounded-xl text-sm font-semibold transition-all"
          >
            {language === "en" ? "Free Consultation" : "Konsultasi Gratis"}
          </Link>
        </div>
      </ScrollReveal>
    </div>
  );
}
