'use client';

import { motion } from 'framer-motion';
import { personalInfo } from '@/lib/data/personalInfo';
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
} from 'lucide-react';
import { useState } from 'react';

const waNumber = personalInfo.contact.phone.replace(/^0/, '62');

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// No brand accent in the palette, so social tiles are differentiated by the
// icon glyph alone rather than by per-network colour.
const colorMap: Record<string, { icon: string; hover: string }> = {
  green: { icon: 'text-foreground', hover: 'hover:border-foreground/30' },
  emerald: { icon: 'text-foreground', hover: 'hover:border-foreground/30' },
  blue: { icon: 'text-foreground', hover: 'hover:border-foreground/30' },
  zinc: { icon: 'text-foreground/70', hover: 'hover:border-foreground/30' },
};

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const socialLinks = [
    {
      name: 'WhatsApp',
      icon: Phone,
      customIcon: WhatsAppIcon,
      url: `https://wa.me/${waNumber}`,
      handle: 'Chat cepat soal proyek',
      color: 'green',
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:${personalInfo.contact.email}`,
      handle: personalInfo.contact.email,
      color: 'emerald',
      copyable: true,
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: personalInfo.contact.linkedin,
      handle: 'nasaq.id',
      color: 'blue',
    },
    {
      name: 'GitHub',
      icon: Github,
      url: personalInfo.contact.github,
      handle: '@nasaq-id',
      color: 'zinc',
    },
    {
      name: 'X',
      icon: Twitter,
      url: personalInfo.contact.twitter,
      handle: '@nasaq_id',
      color: 'zinc',
    },
  ];

  const goodFit = [
    'Company profile atau landing page yang perlu trust lebih kuat dan CTA lebih jelas.',
    'Dashboard internal atau workflow admin yang masih terasa manual dan berantakan.',
    'Web app custom di mana flow bisnis lebih penting daripada sekadar pamer fitur visual.',
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
      {/* HEADER CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl glass p-6 md:p-10"
      >
        <div className="max-w-3xl space-y-5">
          <span className="chip">
            <Rocket className="h-3.5 w-3.5 text-foreground" />
            Konsultasi Proyek
          </span>
          <h1 className="text-3xl font-light tracking-tight text-foreground md:text-5xl">
            Diskusikan proyek sistem Anda sebelum makin rumit.
          </h1>
          <p className="text-sm leading-relaxed text-foreground/70 md:text-base">
            Kalau bisnis Anda butuh landing page konversi, dashboard admin buat operasional internal, atau sistem database kustom yang stabil di lapangan, mulai dari sini. Fokus diskusi pertama kami cuma satu: nyariin scope dan timeline yang realistis.
          </p>
        </div>
      </motion.div>

      {/* READOUT CARDS */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
        className="grid grid-cols-1 gap-3 md:grid-cols-3 font-mono text-[11px]"
      >
        <div className="flex items-center gap-3 rounded-2xl soft-border bg-[var(--bg-element-second)] px-4 py-3.5">
          <Clock className="h-4 w-4 text-foreground" strokeWidth={2.2} />
          <div>
            <p className="font-semibold text-foreground">Waktu Respons</p>
            <p className="text-foreground/70">Merespons dalam waktu 24 jam</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl soft-border bg-[var(--bg-element-second)] px-4 py-3.5">
          <ShieldCheck className="h-4 w-4 text-foreground" strokeWidth={2.2} />
          <div>
            <p className="font-semibold text-foreground">Cara Mulai</p>
            <p className="text-foreground/70">Kirim brief detail di bawah</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-2xl soft-border bg-[var(--bg-element-second)] px-4 py-3.5">
          <Building2 className="h-4 w-4 text-foreground" strokeWidth={2.2} />
          <div>
            <p className="font-semibold text-foreground">Domisili Kerja</p>
            <p className="text-foreground/70">Bandung, remote seluruh Indonesia</p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* CONTACT FORM */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="rounded-3xl glass p-6 md:p-8"
        >
          <div>
            <h2 className="text-lg font-light text-foreground">
              Kirim Brief Proyek Singkat
            </h2>
            <p className="mt-1 text-xs text-foreground/70 font-mono">
              Isi formulir di bawah ini biar kami makin paham masalah operasional bisnis Anda.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const name = String(formData.get('name') ?? '');
              const company = String(formData.get('company') ?? '');
              const projectType = String(formData.get('projectType') ?? '');
              const budget = String(formData.get('budget') ?? '');
              const message = String(formData.get('message') ?? '');

              const subject = encodeURIComponent(`Brief Proyek dari ${company || name}`);

              const body = encodeURIComponent(
                [
                  `Nama Kontak: ${name}`,
                  `Nama Bisnis / Brand: ${company}`,
                  `Jenis Proyek: ${projectType}`,
                  `Estimasi Budget: ${budget}`,
                  '',
                  'Catatan Kebutuhan Operasional:',
                  message,
                ].join('\n')
              );

              window.open(`mailto:${personalInfo.contact.email}?subject=${subject}&body=${body}`);
            }}
            className="mt-6 space-y-4 font-mono text-[12px]"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block font-semibold text-foreground/80">
                  Nama Anda
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Nama lengkap"
                  className="w-full rounded-xl soft-border px-3.5 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-semibold text-foreground/80">
                  Bisnis / Perusahaan
                </label>
                <input
                  type="text"
                  name="company"
                  required
                  placeholder="Nama perusahaan"
                  className="w-full rounded-xl soft-border px-3.5 py-2.5 text-sm"
                />
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block font-semibold text-foreground/80">
                  Tipe Proyek
                </label>
                <input
                  type="text"
                  name="projectType"
                  required
                  placeholder="Contoh: Landing Page, Dashboard Admin, App Android"
                  className="w-full rounded-xl soft-border px-3.5 py-2.5 text-sm"
                />
              </div>
              <div>
                <label className="mb-1.5 block font-semibold text-foreground/80">
                  Estimasi Budget (Rp)
                </label>
                <input
                  type="text"
                  name="budget"
                  placeholder="Opsional"
                  className="w-full rounded-xl soft-border px-3.5 py-2.5 text-sm"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block font-semibold text-foreground/80">
                Apa tantangan operasional atau kebutuhan sistem yang ingin dibenahi?
              </label>
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Tulis masalah saat ini di lapangan, alur manual yang ingin diotomasi, dan sistem apa saja yang sudah berjalan saat ini."
                className="w-full resize-none rounded-xl soft-border px-3.5 py-2.5 text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full btn-primary py-3 text-xs font-mono"
            >
              <Mail className="h-4 w-4" />
              Kirim Brief via Email
            </button>
          </form>
        </motion.div>

        {/* SOCIAL LINKS & GOOD FIT */}
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
                  className={`group rounded-2xl neo-surface p-4 transition-all hover:-translate-y-0.5 ${colors.hover}`}
                >
                  <div className="flex items-center justify-between">
                    <a
                      href={link.url}
                      target={link.url.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      className="flex min-w-0 flex-1 items-center gap-4"
                    >
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--bg-element-second)] soft-border">
                        {link.customIcon ? (
                          <link.customIcon className={`h-4 w-4 ${colors.icon}`} />
                        ) : (
                          <Icon className={`h-4 w-4 ${colors.icon}`} strokeWidth={2.2} />
                        )}
                      </div>
                      <div className="min-w-0 flex-1 font-mono">
                        <h3 className="text-xs font-semibold text-foreground">{link.name}</h3>
                        <p className="truncate text-[10px] text-foreground/70">{link.handle}</p>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-foreground/60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" strokeWidth={2.5} />
                    </a>

                    {link.copyable && (
                      <button
                        onClick={copyEmail}
                        className="ml-2 flex h-8 w-8 items-center justify-center rounded-xl soft-border bg-[var(--bg-element-second)] transition-colors hover:bg-[var(--bg-element-hover)]"
                        title="Copy email"
                      >
                        {copied ? (
                          <Check className="h-3.5 w-3.5 text-money" strokeWidth={2.5} />
                        ) : (
                          <Copy className="h-3.5 w-3.5 text-foreground/70" strokeWidth={2.2} />
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
            className="rounded-3xl glass p-6"
          >
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-4 w-4 text-foreground" strokeWidth={2.2} />
              <h2 className="text-sm font-semibold text-foreground">Sangat Cocok Untuk:</h2>
            </div>
            <ul className="space-y-3 text-xs text-foreground/70 font-mono">
              {goodFit.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-foreground font-bold mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  );
}