'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe, Smartphone, Server, Wrench, MessageCircle, CheckCircle, Rocket, Code, Search, Palette, Headphones, Star, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import { ScrollReveal } from '@/components/ScrollReveal';
import { CursorSpotlight } from '@/components/CursorSpotlight';
import { FeaturedProjects } from '@/components/sections/FeaturedProjects';
import { TechStackStrip } from '@/components/sections/TechStackStrip';

const services = [
  { icon: Globe, title: 'Web Application', desc: 'Sistem manajemen, dashboard, POS, inventory' },
  { icon: Smartphone, title: 'Mobile App', desc: 'Android native & cross-platform' },
  { icon: Server, title: 'API & Backend', desc: 'REST API, database, cloud deploy' },
  { icon: Wrench, title: 'Maintenance', desc: 'Bug fix, update, monitoring' },
  { icon: MessageCircle, title: 'Konsultasi', desc: 'Analisis kebutuhan & arsitektur' },
];

const processSteps = [
  { icon: Search, label: 'Discovery' },
  { icon: Palette, label: 'Design' },
  { icon: Code, label: 'Development' },
  { icon: CheckCircle, label: 'Testing' },
  { icon: Rocket, label: 'Deploy' },
  { icon: Headphones, label: 'Support' },
];

const pricingPreview = [
  { name: 'Basic', price: '5jt', desc: 'Landing page & company profile' },
  { name: 'Standard', price: '15jt', desc: 'Web app + admin dashboard', popular: true },
  { name: 'Premium', price: '40jt', desc: 'Full system web + mobile' },
];

export default function DashboardPage() {
  return (
    <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-12 pb-12">
      {/* ── Hero: Service Provider (with Cursor Spotlight Reveal) ── */}
      <motion.div variants={fadeInUp}>
        <CursorSpotlight
          overlayColor="#FAFAFA"
          radius={200}
          className="rounded-[35px] border border-neutral-400"
        >
          <div className="p-8 md:p-12 text-neutral-900">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#0D9488]/10 rounded-full text-[11px] font-medium text-[#0D9488] mb-4">
              <Rocket className="w-3 h-3" /> Jasa Pembuatan Sistem Web & Android
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
              Bangun Sistem Bisnis Anda<br />
              <span className="text-[#0D9488]">Bersama nasaq.id</span>
            </h1>

            <p className="text-neutral-500 max-w-xl mb-8 text-[15px] leading-relaxed">
              Kami bantu transformasi digital bisnis Anda dengan sistem web & Android yang production-grade.
              Dari ide hingga deploy, dari UMKM hingga enterprise.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-xl text-sm font-semibold transition-all shadow-lg shadow-[#0D9488]/20 hover:shadow-[#0D9488]/30"
              >
                Lihat Harga
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/order"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-neutral-400 hover:bg-[#FAFAFA] text-neutral-900 rounded-xl text-sm font-semibold transition-all"
              >
                Pesan Sekarang
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Hover hint */}
            <p className="mt-6 text-[10px] text-neutral-400 flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#0D9488]/40 animate-pulse" />
              Gerakkan cursor untuk reveal
            </p>
          </div>
        </CursorSpotlight>
      </motion.div>

      {/* ── Services Quick Overview ── */}
      <motion.section variants={fadeInUp}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-neutral-900">Layanan Kami</h2>
          <Link href="/services" className="text-[12px] text-[#0D9488] hover:underline flex items-center gap-1">
            Lihat Semua <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-[#FAFAFA] border border-neutral-300 rounded-xl p-4 hover:border-[#0D9488]/30 hover:shadow-sm transition-all text-center"
            >
              <svc.icon className="w-6 h-6 text-[#0D9488] mx-auto mb-2" strokeWidth={1.5} />
              <h3 className="text-[12px] font-semibold text-neutral-900 mb-0.5">{svc.title}</h3>
              <p className="text-[10px] text-neutral-500">{svc.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Why Choose Us ── */}
      <ScrollReveal>
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-neutral-900">Kenapa Pilih Kami?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { icon: Rocket, title: 'Production-Grade', desc: 'Bukan demo atau portfolio toys. Setiap sistem yang kami bangun dipakai user nyata dengan data nyata.' },
              { icon: Globe, title: 'Full-Stack End-to-End', desc: 'Dari database design hingga deploy. Satu tim, satu ownership, tidak ada gap antar layer.' },
              { icon: Star, title: 'Support Berkelanjutan', desc: 'Tidak tinggal setelah launch. Maintenance, monitoring, dan update sesuai kebutuhan bisnis Anda.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-[#FAFAFA] border border-neutral-300 rounded-xl p-5 hover:shadow-sm transition-all"
              >
                <item.icon className="w-5 h-5 text-[#0D9488] mb-3" />
                <h3 className="font-bold text-[13px] text-neutral-900 mb-1">{item.title}</h3>
                <p className="text-[12px] text-neutral-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── Process Quick ── */}
      <ScrollReveal>
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-neutral-900">Cara Kami Bekerja</h2>
            <Link href="/process" className="text-[12px] text-[#0D9488] hover:underline flex items-center gap-1">
              Detail <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {processSteps.map((step, i) => (
              <div key={i} className="flex items-center gap-2 flex-shrink-0">
                <div className="flex flex-col items-center gap-1.5">
                  <div className="w-10 h-10 rounded-full bg-[#0D9488]/10 flex items-center justify-center">
                    <step.icon className="w-4 h-4 text-[#0D9488]" strokeWidth={1.5} />
                  </div>
                  <span className="text-[10px] font-medium text-neutral-600">{step.label}</span>
                </div>
                {i < processSteps.length - 1 && (
                  <div className="w-6 h-px bg-neutral-300 flex-shrink-0 mt-[-20px]" />
                )}
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── Pricing Preview ── */}
      <ScrollReveal>
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold text-neutral-900">Harga Mulai Dari</h2>
            <Link href="/pricing" className="text-[12px] text-[#0D9488] hover:underline flex items-center gap-1">
              Semua Paket <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {pricingPreview.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`bg-[#FAFAFA] border rounded-xl p-5 transition-all relative ${
                  pkg.popular
                    ? 'border-[#0D9488] shadow-md ring-1 ring-[#0D9488]/20'
                    : 'border-neutral-300 hover:border-[#0D9488]/30'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-white bg-[#0D9488] px-2.5 py-0.5 rounded-full">
                    Populer
                  </div>
                )}
                <h3 className="text-[14px] font-semibold text-neutral-900">{pkg.name}</h3>
                <div className="text-[20px] font-bold text-[#0D9488] my-1">Rp {pkg.price}</div>
                <p className="text-[11px] text-neutral-500">{pkg.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* ── Tech Stack ── */}
      <ScrollReveal>
        <TechStackStrip />
      </ScrollReveal>

      {/* ── Featured Projects (Proof) ── */}
      <ScrollReveal>
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">Project Yang Sudah Kami Bangun</h2>
              <p className="text-[12px] text-neutral-500 mt-1">Bukti nyata, bukan janji</p>
            </div>
            <Link href="/projects" className="text-[12px] text-[#0D9488] hover:underline flex items-center gap-1">
              Semua Project <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <FeaturedProjects />
        </section>
      </ScrollReveal>

      {/* ── CTA ── */}
      <ScrollReveal>
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="noise-overlay relative overflow-hidden bg-[#FAFAFA] rounded-[35px] border border-neutral-400"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-[#0D9488]/15 via-transparent to-transparent" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#0D9488]/50 to-transparent" />

          <div className="relative p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              Siap Membangun Sistem Anda?
            </h2>
            <p className="text-neutral-500 max-w-md mx-auto mb-6">
              Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhan bisnis Anda, kami bantu cari solusinya.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/order"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#0D9488] hover:bg-[#0F766E] text-white rounded-xl font-semibold transition-all shadow-lg shadow-[#0D9488]/20 hover:shadow-[#0D9488]/30"
              >
                Pesan Sekarang
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-neutral-400 hover:bg-[#FAFAFA] text-neutral-900 rounded-xl font-semibold transition-all"
              >
                Konsultasi Gratis
              </Link>
            </div>
          </div>
        </motion.section>
      </ScrollReveal>
    </motion.div>
  );
}
