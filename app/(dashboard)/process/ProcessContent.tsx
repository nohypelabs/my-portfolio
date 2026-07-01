'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle,
  Clock3,
  Code,
  FileText,
  Headphones,
  Palette,
  Rocket,
  Search,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from 'lucide-react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/lib/context/LanguageContext';
import { staggerContainer, fadeInUp } from '@/lib/animations';
import type { ProcessStep } from '@/lib/supabase/types';

const iconMap: Record<string, LucideIcon> = {
  Search,
  Palette,
  Code,
  CheckCircle,
  Rocket,
  Headphones,
};

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

function getStepLens(stepNumber: number, isEn: boolean) {
  const map = {
    1: {
      eyebrow: isEn ? 'Discovery' : 'Discovery',
      deliverable: isEn ? 'Problem map, early priority, and first build direction.' : 'Peta masalah, prioritas awal, dan arah build pertama.',
      timing: isEn ? 'Focus: clarify what is actually weak today.' : 'Fokus: menjelaskan apa yang sebenarnya lemah hari ini.',
      title: isEn ? 'Break down the real problem' : 'Bedah problem yang sebenarnya',
      description: isEn
        ? 'The work starts by separating noise from the actual bottleneck, so scope is built on reality instead of assumptions.'
        : 'Pekerjaan dimulai dengan memisahkan noise dari bottleneck yang benar-benar terjadi, supaya scope dibangun dari kenyataan, bukan asumsi.',
    },
    2: {
      eyebrow: isEn ? 'Direction' : 'Arah',
      deliverable: isEn ? 'Structure, screen direction, and decisions that need approval.' : 'Struktur, arah screen, dan keputusan yang perlu di-approve.',
      timing: isEn ? 'Focus: align on shape before development starts.' : 'Fokus: menyamakan bentuk sebelum development dimulai.',
      title: isEn ? 'Lock the direction early' : 'Kunci arah lebih awal',
      description: isEn
        ? 'Visual and structural direction are aligned before the build runs, reducing costly backtracking later.'
        : 'Arah visual dan struktural disamakan sebelum build berjalan, supaya revisi besar di belakang tidak mahal.',
    },
    3: {
      eyebrow: isEn ? 'Build' : 'Build',
      deliverable: isEn ? 'Working surface with regular progress rhythm.' : 'Surface yang sudah bekerja dengan ritme progress yang rutin.',
      timing: isEn ? 'Focus: get to usable output instead of endless setup.' : 'Fokus: sampai ke output yang bisa dipakai, bukan setup yang tidak selesai-selesai.',
      title: isEn ? 'Ship the working layer first' : 'Kirim layer yang bekerja lebih dulu',
      description: isEn
        ? 'Development is run to produce a usable surface as early as possible, then tightened from there.'
        : 'Development dijalankan untuk menghasilkan surface yang bisa dipakai secepat mungkin, lalu dirapikan dari situ.',
    },
    4: {
      eyebrow: isEn ? 'Validation' : 'Validasi',
      deliverable: isEn ? 'Reviewed flows, checked edge cases, and launch-readiness.' : 'Flow yang direview, edge case yang dicek, dan kesiapan launch.',
      timing: isEn ? 'Focus: remove ambiguity before the system goes live.' : 'Fokus: menghilangkan ambiguitas sebelum sistem live.',
      title: isEn ? 'Validate before launch pressure hits' : 'Validasi sebelum tekanan launch datang',
      description: isEn
        ? 'Testing here is not ceremony. It is a check that the surface can survive real usage without obvious friction.'
        : 'Testing di sini bukan formalitas. Ini adalah pengecekan bahwa surface-nya bisa bertahan saat dipakai sungguhan tanpa friction yang jelas.',
    },
    5: {
      eyebrow: isEn ? 'Launch' : 'Launch',
      deliverable: isEn ? 'Production release, basic setup, and transition to live use.' : 'Release ke production, setup dasar, dan transisi ke penggunaan live.',
      timing: isEn ? 'Focus: move from project mode to actual usage safely.' : 'Fokus: pindah dari mode project ke penggunaan nyata dengan aman.',
      title: isEn ? 'Launch with the basics handled' : 'Launch dengan hal mendasar yang sudah beres',
      description: isEn
        ? 'Deployment includes the practical handoff pieces that help the team actually start using the output.'
        : 'Deployment mencakup hal-hal praktis yang membantu tim benar-benar mulai menggunakan hasilnya.',
    },
    6: {
      eyebrow: isEn ? 'Iteration' : 'Iterasi',
      deliverable: isEn ? 'Post-launch fixes, cleanup, and next-step recommendations.' : 'Perbaikan pasca-launch, cleanup, dan rekomendasi langkah berikutnya.',
      timing: isEn ? 'Focus: keep momentum after the first version is live.' : 'Fokus: menjaga momentum setelah versi pertama live.',
      title: isEn ? 'Tighten from real usage' : 'Rapikan dari penggunaan nyata',
      description: isEn
        ? 'The best feedback often appears after the first release. Support keeps the system healthy while the team settles into it.'
        : 'Feedback terbaik sering muncul setelah rilis pertama. Support menjaga sistem tetap sehat saat tim mulai terbiasa memakainya.',
    },
  } as const;

  return map[stepNumber as keyof typeof map] ?? map[1];
}

export function ProcessContent({ steps }: { steps: ProcessStep[] }) {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const principles = isEn
    ? [
        {
          icon: FileText,
          title: 'Brief before build',
          desc: 'The work starts from a clean problem statement, not random feature accumulation.',
        },
        {
          icon: Clock3,
          title: 'Clear progress rhythm',
          desc: 'Clients should know what is moving, what is blocked, and what decision comes next.',
        },
        {
          icon: ShieldCheck,
          title: 'No black box handoff',
          desc: 'The output should be usable by the client team, not depend on hidden context.',
        },
      ]
    : [
        {
          icon: FileText,
          title: 'Brief sebelum build',
          desc: 'Pekerjaan dimulai dari problem statement yang jelas, bukan akumulasi fitur acak.',
        },
        {
          icon: Clock3,
          title: 'Ritme progress yang jelas',
          desc: 'Client harus tahu apa yang bergerak, apa yang tertahan, dan keputusan apa yang datang berikutnya.',
        },
        {
          icon: ShieldCheck,
          title: 'Handoff tanpa black box',
          desc: 'Output harus bisa dipakai tim client, bukan bergantung pada konteks tersembunyi.',
        },
      ];

  const closingNotes = isEn
    ? [
        'The process is built to reduce ambiguity, not to add ceremony.',
        'Each stage exists to help the next decision become easier.',
        'The first goal is always a usable outcome, then polish and iteration follow.',
      ]
    : [
        'Proses ini dibuat untuk mengurangi ambigu, bukan menambah seremoni.',
        'Setiap tahap ada supaya keputusan berikutnya jadi lebih mudah diambil.',
        'Tujuan pertamanya selalu output yang bisa dipakai dulu, lalu polish dan iterasi menyusul.',
      ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="mx-auto max-w-5xl space-y-10 pb-12"
    >
      <motion.div {...fadeUp} className="rounded-[35px] neo-surface p-6 md:p-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#c4956a]/20 bg-[#f0f0f0] px-3 py-1 text-xs font-semibold text-[#a67d55]">
            <Zap className="h-3.5 w-3.5" />
            {isEn ? 'Working model' : 'Model kerja'}
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 md:text-5xl">
            {isEn
              ? 'A process that keeps the client informed, keeps the scope practical, and keeps the build moving.'
              : 'Proses kerja yang membuat client tetap paham, scope tetap praktis, dan build tetap bergerak.'}
          </h1>
          <p className="text-sm leading-relaxed text-neutral-600 md:text-base">
            {isEn
              ? 'This is not a decorative timeline. It is the operating model behind how nasaq.id turns a vague request into a clearer direction, a working surface, and a handoff the client team can actually use.'
              : 'Ini bukan timeline dekoratif. Ini model kerja yang dipakai nasaq.id untuk mengubah request yang masih samar menjadi arah yang lebih jelas, surface yang benar-benar bekerja, dan handoff yang bisa dipakai tim client.'}
          </p>
        </div>
      </motion.div>

      <ScrollReveal>
        <div className="grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
            <div key={item.title} className="rounded-[28px] neo-surface p-5">
              <item.icon className="h-4 w-4 text-[#c4956a]" />
              <h2 className="mt-3 text-sm font-bold text-neutral-900">{item.title}</h2>
              <p className="mt-1 text-xs leading-relaxed text-neutral-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="space-y-4 rounded-[35px] neo-surface p-6 md:p-8">
          <div className="max-w-2xl">
            <h2 className="text-xl font-bold text-neutral-900 md:text-2xl">
              {isEn ? 'What happens at each stage' : 'Apa yang terjadi di setiap tahap'}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-600">
              {isEn
                ? 'Each step is designed to produce a concrete output. That way the client does not just watch progress happen, but can evaluate what was clarified, built, and decided.'
                : 'Setiap tahap dirancang untuk menghasilkan output yang konkret. Jadi client tidak cuma melihat progress berjalan, tapi bisa menilai apa yang berhasil dijelaskan, dibangun, dan diputuskan.'}
            </p>
          </div>

          <div className="space-y-4">
            {steps.map((step) => {
              const Icon = iconMap[step.icon] || Search;
              const lens = getStepLens(step.step_number, isEn);

              return (
                <motion.div
                  key={step.id}
                  variants={fadeInUp}
                  className="grid gap-4 rounded-[30px] neo-surface p-5 md:grid-cols-[92px_1fr_230px] md:items-start"
                >
                  <div className="flex items-center gap-4 md:flex-col md:items-start">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#c4956a]/20 bg-[#FAFAFA]">
                      <Icon className="h-5 w-5 text-[#c4956a]" strokeWidth={1.7} />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                        {lens.eyebrow}
                      </p>
                      <p className="mt-1 text-2xl font-extrabold text-neutral-900">
                        {String(step.step_number).padStart(2, '0')}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-neutral-900">{lens.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                      {isEn ? lens.description : step.description}
                    </p>
                  </div>

                  <div className="rounded-[24px] bg-[#f0f0f0] p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-neutral-500">
                      {isEn ? 'Client gets' : 'Client dapat'}
                    </p>
                    <p className="mt-2 text-sm font-medium leading-relaxed text-neutral-800">{lens.deliverable}</p>
                    <p className="mt-3 text-xs leading-relaxed text-neutral-500">{lens.timing}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <div className="rounded-[35px] neo-surface p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold text-neutral-900">
                {isEn ? 'The point is to remove black-box project anxiety.' : 'Intinya adalah menghilangkan kecemasan project yang terasa seperti black box.'}
              </h2>
              <div className="space-y-2">
                {closingNotes.map((note) => (
                  <div key={note} className="flex items-start gap-2 text-sm leading-relaxed text-neutral-600">
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#c4956a]" strokeWidth={1.6} />
                    <span>{note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Link
                href="/pricing"
                className="neo-button inline-flex items-center justify-center gap-2 rounded-[22px] px-4 py-3 text-sm font-semibold text-neutral-900"
              >
                {isEn ? 'See price ranges' : 'Lihat range harga'}
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
