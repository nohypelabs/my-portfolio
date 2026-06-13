'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Globe,
  MessageCircle,
  Rocket,
  Server,
  Smartphone,
  Target,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/lib/context/LanguageContext';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { Service } from '@/lib/supabase/types';

const iconMap: Record<string, LucideIcon> = {
  Globe,
  Smartphone,
  Server,
  Wrench,
  MessageCircle,
  Code: Globe,
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function getServiceLens(service: Service, isEn: boolean) {
  const key = service.slug.toLowerCase();

  if (key.includes('web') || key.includes('website')) {
    return {
      badge: isEn ? 'Public-facing build' : 'Surface publik',
      fit: isEn
        ? 'Best when the business already has an offer, but the current website still looks weak or hard to trust.'
        : 'Paling cocok saat bisnis sudah punya penawaran, tapi website yang sekarang masih terlihat lemah atau susah dipercaya.',
      outcome: isEn
        ? 'Goal: make the business look clearer, sharper, and easier to contact.'
        : 'Targetnya: bikin bisnis terlihat lebih jelas, lebih tajam, dan lebih mudah dihubungi.',
      summary: isEn
        ? 'A sharper company profile, landing page, or web surface that helps explain the business and move visitors toward inquiry.'
        : service.description,
    };
  }

  if (key.includes('mobile')) {
    return {
      badge: isEn ? 'Field and customer flow' : 'Flow lapangan dan customer',
      fit: isEn
        ? 'Best when the team needs mobile access for operations, reporting, or on-the-go customer interactions.'
        : 'Paling cocok saat tim butuh akses mobile untuk operasional, pelaporan, atau interaksi customer saat bergerak.',
      outcome: isEn
        ? 'Goal: keep important actions reachable outside the desktop workflow.'
        : 'Targetnya: bikin aksi penting tetap bisa dijalankan di luar workflow desktop.',
      summary: isEn
        ? 'Mobile surfaces for operational teams or customer-facing flows that need speed, clarity, and practical reliability.'
        : service.description,
    };
  }

  if (key.includes('api') || key.includes('backend')) {
    return {
      badge: isEn ? 'System backbone' : 'Tulang punggung sistem',
      fit: isEn
        ? 'Best when the business flow is starting to outgrow spreadsheets, disconnected tools, or fragile integrations.'
        : 'Paling cocok saat flow bisnis mulai melampaui spreadsheet, tools yang terpisah, atau integrasi yang rapuh.',
      outcome: isEn
        ? 'Goal: give the product a stable backend, cleaner data flow, and room to scale.'
        : 'Targetnya: memberi produk backend yang stabil, aliran data yang lebih rapi, dan ruang untuk scale.',
      summary: isEn
        ? 'Backend architecture, API design, and data structure that let the product work cleanly behind the scenes.'
        : service.description,
    };
  }

  if (key.includes('maint') || key.includes('support')) {
    return {
      badge: isEn ? 'Post-launch support' : 'Dukungan pasca-launch',
      fit: isEn
        ? 'Best when the first version is already live, but it still needs bug fixing, cleanup, or iteration from real usage.'
        : 'Paling cocok saat versi pertama sudah live, tapi masih butuh bug fixing, cleanup, atau iterasi dari penggunaan nyata.',
      outcome: isEn
        ? 'Goal: keep the system healthy without letting small issues pile up.'
        : 'Targetnya: menjaga sistem tetap sehat tanpa membiarkan masalah kecil menumpuk.',
      summary: isEn
        ? 'Ongoing support for stability, bug handling, and practical iteration after the product starts being used.'
        : service.description,
    };
  }

  return {
    badge: isEn ? 'Direction and scoping' : 'Arah dan scoping',
    fit: isEn
      ? 'Best when the business is still deciding what to build, how large the scope should be, and where to start safely.'
      : 'Paling cocok saat bisnis masih menentukan apa yang perlu dibangun, seberapa besar scope-nya, dan mulai dari mana yang aman.',
    outcome: isEn
      ? 'Goal: reduce confusion before time and budget are burned in the wrong direction.'
      : 'Targetnya: mengurangi bingung sebelum waktu dan budget habis di arah yang salah.',
    summary: isEn
      ? 'Discovery, technical consultation, and practical recommendations before the build direction is locked in.'
      : service.description,
  };
}

export function ServicesContent({ services }: { services: Service[] }) {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const trustPoints = isEn
    ? [
        {
          icon: Building2,
          title: 'Founder-led direction',
          desc: 'You talk directly to the person shaping the build, so context loss stays low.',
        },
        {
          icon: Target,
          title: 'Business-first scope',
          desc: 'Services are framed around bottlenecks, trust gaps, and actual team friction.',
        },
        {
          icon: Rocket,
          title: 'Built to move',
          desc: 'The point is not to add layers. The point is to move toward a usable surface fast.',
        },
      ]
    : [
        {
          icon: Building2,
          title: 'Arah langsung dari founder',
          desc: 'Diskusi terjadi langsung dengan orang yang mengarahkan build, jadi context loss lebih kecil.',
        },
        {
          icon: Target,
          title: 'Scope dimulai dari kebutuhan bisnis',
          desc: 'Layanan dibingkai dari bottleneck, gap trust, dan friction tim yang nyata.',
        },
        {
          icon: Rocket,
          title: 'Dibuat untuk bergerak',
          desc: 'Tujuannya bukan menambah layer. Tujuannya adalah cepat sampai ke surface yang bisa dipakai.',
        },
      ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="mx-auto max-w-5xl space-y-10 pb-12"
    >
      <motion.div {...fadeUp} className="rounded-[35px] card-elevated bg-[#FAFAFA] p-6 md:p-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c4956a]/20 bg-[#f7f3e8] px-3 py-1 text-xs font-semibold text-[#a67d55]">
            <Building2 className="h-3.5 w-3.5" />
            {isEn ? 'Offer tracks' : 'Track layanan'}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
            {isEn
              ? 'Services built to make the business look more trusted and the workflow feel less messy.'
              : 'Layanan yang dibangun untuk membuat bisnis terlihat lebih dipercaya dan workflow terasa lebih rapi.'}
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            {isEn
              ? 'These are not random service buckets. Each track exists because businesses usually come in with one of three pressures: weak public surface, manual internal flow, or a custom system need that cannot be solved by generic tools.'
              : 'Ini bukan kumpulan layanan yang ditempel begitu saja. Setiap track ada karena biasanya bisnis datang dengan salah satu dari tiga tekanan ini: surface publik yang lemah, flow internal yang terlalu manual, atau kebutuhan sistem custom yang tidak selesai dengan tools generik.'}
          </p>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          {trustPoints.map((item) => (
            <div key={item.title} className="rounded-[28px] card-elevated bg-[#f7f3e8] p-4">
              <item.icon className="h-4 w-4 text-[#c4956a]" />
              <h2 className="mt-3 text-sm font-bold text-neutral-900">{item.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <ScrollReveal>
        <div className="space-y-5 rounded-[35px] card-elevated bg-[#FAFAFA] p-6 md:p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-xl font-bold text-neutral-900 md:text-2xl">
                {isEn ? 'Choose the track that matches the actual problem' : 'Pilih track yang paling cocok dengan problem aslinya'}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                {isEn
                  ? 'Most clients do not need every service at once. They need the right starting point, the right level of clarity, and a build path that does not overcomplicate the first move.'
                  : 'Sebagian besar client tidak butuh semua layanan sekaligus. Mereka butuh titik mulai yang tepat, tingkat kejelasan yang pas, dan jalur build yang tidak membuat langkah pertama jadi terlalu rumit.'}
              </p>
            </div>

            <Link
              href="/process"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#a67d55] transition-colors hover:text-[#8b6543]"
            >
              {isEn ? 'See how the work runs' : 'Lihat cara kerjanya'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Globe;
              const lens = getServiceLens(service, isEn);

              return (
                <motion.div
                  key={service.id}
                  variants={fadeInUp}
                  className="rounded-[30px] card-elevated bg-[#f7f3e8] p-5 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex rounded-full border border-[#c4956a]/20 bg-[#FAFAFA] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#a67d55]">
                      {lens.badge}
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#c4956a]/20 bg-[#FAFAFA]">
                      <Icon className="h-5 w-5 text-[#c4956a]" strokeWidth={1.7} />
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-neutral-900">{service.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600">{lens.summary}</p>
                    </div>

                    <div className="rounded-[24px] card-elevated bg-[#FAFAFA] p-4">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                        {isEn ? 'Best fit' : 'Paling cocok'}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-700">{lens.fit}</p>
                    </div>

                    <ul className="grid gap-2 sm:grid-cols-2">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-[12px] leading-relaxed text-neutral-700">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#c4956a]" strokeWidth={1.6} />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col gap-3 border-t border-neutral-300 pt-4 md:flex-row md:items-center md:justify-between">
                      <p className="text-xs leading-relaxed text-neutral-500">{lens.outcome}</p>
                      <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#a67d55] transition-colors hover:text-[#8b6543]"
                      >
                        {isEn ? 'Discuss this track' : 'Diskusikan track ini'}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="rounded-[35px] card-elevated bg-[#FAFAFA] p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-neutral-900">
                {isEn ? 'Not sure which track fits?' : 'Belum yakin track mana yang paling pas?'}
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600">
                {isEn
                  ? 'That is normal. Most projects do not start with a perfect scope. Start from the bottleneck, then narrow the service and build direction from there.'
                  : 'Itu normal. Sebagian besar project memang tidak mulai dari scope yang sudah sempurna. Mulai saja dari bottleneck-nya, lalu layanan dan arah build-nya dipersempit dari situ.'}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/process"
                className="inline-flex items-center justify-center gap-2 rounded-[22px] border border-neutral-400 bg-[#f7f3e8] px-4 py-3 text-sm font-semibold text-neutral-900 transition-colors hover:bg-[#efe4cf]"
              >
                {isEn ? 'See the process first' : 'Lihat proses dulu'}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/order"
                className="inline-flex items-center justify-center gap-2 rounded-[22px] bg-[#c4956a] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a67d55]"
              >
                {isEn ? 'Start the brief' : 'Mulai brief'}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </motion.div>
  );
}
