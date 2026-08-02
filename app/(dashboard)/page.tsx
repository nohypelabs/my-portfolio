import Link from "next/link";
import { Marquee } from "@/components/Marquee";
import { projects } from "@/lib/data/projects";
import { studioStats } from "@/lib/data/studioStats";
import { packages } from "@/lib/data/services";
import { testimonials } from "@/lib/data/testimonials";
import { TextReveal } from "@/components/TextReveal";
import { StorytellingSection, type StorySlide } from "@/components/StorytellingSection";

// Homepage funnel: satu ide per blok, tanpa dinding kartu.
// Urutan: cover → mitra → problem → kontras → angka → project → pricing → testimoni → CTA.

const mitra = [
  "J&T Express",
  "Proservice Indonesia",
  "Serat QC",
  "WC Check",
  "LakuPOS",
  "Qohira",
  "nasaq.id",
];

const problems = [
  {
    n: "01",
    t: "Hasilnya cakep, tapi tidak dipakai.",
    d: "Banyak jasa web menjual template. Hasilnya cantik, manggung 3 bulan, lalu admin tetap kerja di Excel.",
  },
  {
    n: "02",
    t: "Harga bicara sebelum pemahaman.",
    d: "Kesepakatan ditutup dari halaman harga, padahal problem bisnis belum dibedah sama sekali.",
  },
  {
    n: "03",
    t: "Bukti progres cuma cerita.",
    d: "Kabar kemajuan berupa laporan PDF yang tidak ada yang baca, bukan data yang bisa dicek langsung.",
  },
];

const donts = [
  "Desain berat tanpa bedah operasional.",
  "Template pasang lalu revisi ping-pong tanpa arah.",
  "Status 'ongoing' tanpa nomor dan tanpa hasil.",
  "Laporan 96 halaman sebagai bukti kemajuan.",
];

const numbers = [
  {
    value: "80K+",
    label: "resi QC diproses J&T Express",
    aside: "160K+ foto GPS-watermark — 4–5 jam jadi <30 menit per 500 resi",
  },
  {
    value: "3.293",
    label: "inspeksi tercatat & searchable",
    aside: "WC Check — 12-month subscription, admin bisa napas",
  },
  {
    value: "≤24 jam",
    label: "respon awal untuk brief",
    aside: "langsung di-breakdown kebutuhan, bukan balas 'terima kasih'",
  },
];

function formatPrice(pkg: (typeof packages)[number]) {
  const min = pkg.price_min >= 1_000_000 ? `Rp ${pkg.price_min / 1_000_000}jt` : `Rp ${pkg.price_min / 1_000}rb`;
  return `${min}+`;
}

export default function HomePage() {
  const quote = testimonials[1];

  const storySlides: StorySlide[] = projects
    .filter((p) => p.status === 'production')
    .slice(0, 4)
    .map((p) => ({
      id: p.id,
      label: p.title.split(' ')[0],
      image: p.image,
      caption: p.title,
      metric: p.caseStudy?.metrics?.[0]
        ? `${p.caseStudy.metrics[0].label}: ${p.caseStudy.metrics[0].before} → ${p.caseStudy.metrics[0].after}`
        : undefined,
    }));

  return (
    <main className="space-y-0">
      {/* 1. COVER */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-2 pt-10 pb-14 md:pt-16 md:pb-20">
          <p className="descriptor">nasaq.id · website, android, admin system</p>

          <h1 className="mt-6 max-w-4xl text-[40px] font-light leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            <TextReveal text="Sistem yang dipakai admin," />
            <br />
            <span className="bg-gradient-to-r from-accent to-splash bg-clip-text text-transparent">
              <TextReveal text="bukan yang cuma dilirik." />
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-8 text-muted md:text-base">
            Satu brief. Dipahami dulu, baru dibangun. Target kami: company
            profile, dashboard internal, dan app Android yang dibangun dari
            problem operasional nyata — bukan dari template.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="btn-primary px-7 py-3.5 text-sm"
            >
              Kirim brief proyek
              <span aria-hidden>→</span>
            </Link>
            <span className="font-mono text-[11px] text-muted">
              1 kalimat boleh. / Dibalas langsung.
            </span>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {studioStats.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-5 py-4">
                <p className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[12px] text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MITRA — strip tipis */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-2">
          <p className="text-center descriptor">Dipercaya tim operasional nyata</p>
          <div className="mt-5 overflow-hidden">
            <Marquee speed={16}>
              {[...mitra, ...mitra].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="chip whitespace-nowrap px-5 py-2 text-[12px] uppercase tracking-wide"
                >
                  {name}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-2">
          <p className="descriptor">Masalah yang sering ketemu</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {problems.map((p) => (
              <div key={p.n} className="glass rounded-2xl p-6 flex flex-col">
                <span className="font-mono text-[11px] font-bold text-accent">{p.n}</span>
                <h2 className="mt-3 text-xl font-semibold leading-snug text-foreground md:text-[22px]">
                  {p.t}
                </h2>
                <p className="mt-3 text-[13px] leading-7 text-muted">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KONTRAST */}
      <section className="py-14 md:py-20 border-t border-foreground/10">
        <div className="mx-auto max-w-6xl px-2">
          <p className="descriptor">Yang tidak kami kerjakan</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {donts.map((d, i) => (
              <li key={d} className="flex items-start gap-4 glass rounded-2xl p-5">
                <span className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent text-[12px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-[14px] font-medium leading-relaxed text-foreground">
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. ANGKA BUKTI */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-2">
          <p className="descriptor">Bukti di lapangan</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {numbers.map((n) => (
              <div key={n.label} className="rounded-2xl border border-foreground/10 p-6 transition-colors hover:border-accent/40">
                <p className="text-4xl font-light tracking-tight text-transparent bg-gradient-to-br from-accent to-splash bg-clip-text md:text-5xl">
                  {n.value}
                </p>
                <p className="mt-3 text-[15px] font-semibold leading-snug text-foreground">
                  {n.label}
                </p>
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">
                  {n.aside}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5.5. STORYTELLING */}
      <StorytellingSection
        slides={storySlides}
        kicker="Cerita di balik angkanya"
        title="Setiap sistem dimulai dari masalah kecil yang menggerogoti waktu — dan di sini kami ukur kapan sebelum berubah jadi sesudah."
      />

      {/* 6. PROJECT LIST */}
      <section className="py-14 md:py-20 border-t border-foreground/10">
        <div className="mx-auto max-w-6xl px-2">
          <div className="flex items-end justify-between gap-4">
            <p className="descriptor">Sistem yang sudah jalan</p>
            <Link href="/projects" className="text-[12px] font-semibold text-accent hover:underline">
              semua case study →
            </Link>
          </div>
          <ul className="mt-6 divide-y divide-foreground/10">
            {projects.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/projects/${p.id}`}
                  className="group flex items-center justify-between gap-4 py-4 transition-colors hover:px-2"
                >
                  <span className="text-[15px] font-semibold text-foreground group-hover:text-accent transition-colors">
                    {p.title}
                  </span>
                  <span className="hidden flex-1 border-b border-dotted border-foreground/20 sm:block" />
                  <span className="text-[11px] uppercase tracking-wide text-muted group-hover:text-accent transition-colors">
                    buka case study
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. PRICING */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-2">
          <p className="descriptor">Titik masuk harga</p>
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {packages.map((p, i) => (
              <div
                key={p.id}
                className={`relative flex flex-col justify-between gap-6 rounded-2xl p-7 transition-all hover:-translate-y-1 ${
                  i === 1
                    ? "bg-gradient-to-br from-accent/10 to-splash/10 border border-accent/40"
                    : "glass"
                }`}
              >
                {i === 1 && (
                  <span className="absolute -top-2.5 right-4 chip bg-accent border-accent text-white">
                    Paling dipilih
                  </span>
                )}
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                    {p.name}
                  </p>
                  <p className="mt-3 text-3xl font-light tracking-tight text-foreground">
                    {formatPrice(p)}
                  </p>
                </div>
                <div>
                  <p className="text-[13px] leading-relaxed text-muted">{p.description}</p>
                  <Link
                    href="/contact"
                    className={`mt-4 inline-flex items-center gap-1 text-sm font-semibold ${
                      i === 1 ? "text-accent" : "text-foreground hover:text-accent"
                    }`}
                  >
                    bahas scope <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SATU TESTIMONIAL */}
      <section className="py-14 md:py-20 border-t border-foreground/10">
        <div className="mx-auto max-w-3xl px-2 text-center">
          <p className="descriptor">Kata tim yang pakai</p>
          <blockquote className="mt-6">
            <p className="text-2xl font-light leading-tight text-foreground md:text-4xl">
              &ldquo;{quote.content}&rdquo;
            </p>
            <footer className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              {quote.role} · {quote.company}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-2">
          <div className="glass rounded-3xl py-12 px-6 text-center md:py-16">
            <p className="descriptor">Kalau masalahnya sudah kebayang</p>
            <h2 className="mx-auto mt-4 max-w-2xl text-[32px] font-light tracking-tight text-foreground md:text-5xl">
              Satu brief. Dijawab dalam jam.
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-flex btn-primary px-8 py-4 text-sm"
            >
              Mulai briefing
              <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}