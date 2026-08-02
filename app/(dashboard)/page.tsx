import Link from "next/link";
import { Marquee } from "@/components/Marquee";
import { projects } from "@/lib/data/projects";
import { studioStats } from "@/lib/data/studioStats";
import { packages } from "@/lib/data/services";
import { testimonials } from "@/lib/data/testimonials";

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
  "Status \u0027ongoing\u0027 tanpa nomor dan tanpa hasil.",
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
    aside: "langsung di-breakdown kebutuhan, bukan balas \u0027terima kasih\u0027",
  },
];

function formatPrice(pkg: (typeof packages)[number]) {
  const min = pkg.price_min >= 1_000_000 ? `Rp ${pkg.price_min / 1_000_000}jt` : `Rp ${pkg.price_min / 1_000}rb`;
  return `${min}+`;
}

export default function HomePage() {
  const quote = testimonials[1];

  return (
    <main className="space-y-0">
      {/* 1. COVER */}
      <section className="border-b-2 border-foreground">
        <div className="mx-auto max-w-6xl px-2 py-12 md:py-20">
          <div className="flex items-center justify-between font-mono text-[10px] font-bold uppercase tracking-[0.2em]">
            <span className="bg-foreground px-2 py-1 text-background shadow-[3px_3px_0_0_var(--color-accent)]">
              nasaq.id
            </span>
            <span className="hidden md:block">website · android · admin system</span>
          </div>

          <p className="mt-10 text-[12px] font-bold uppercase tracking-[0.28em] text-accent">
            Kami adalah
          </p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            Sistem yang dipakai admin, bukan{" "}
            <span className="bg-double px-2 py-0.5 box-decoration-clone">
              yang cuma dilirik.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-sm leading-8 text-neutral-600 md:text-base">
            Satu brief. Dipahami dulu, baru dibangun. Catatan target: company
            profile, dashboard internal, dan app Android yang dibangun dari
            problem operasional nyata — bukan dari template.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/contact"
              className="btn-primary inline-flex items-center justify-center gap-2 rounded-[6px] px-7 py-4 text-sm font-bold"
            >
              Kirim brief proyek
              <span aria-hidden>→</span>
            </Link>
            <span className="font-mono text-[11px] text-neutral-500">
              1 kalimat boleh. / Dibalas langsung.
            </span>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-5 border-t-2 border-foreground pt-6 lg:grid-cols-4">
            {studioStats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-extrabold md:text-3xl">{s.value}</p>
                <p className="mt-1 text-[11px] text-neutral-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MITRA — strip tipis */}
      <section className="border-b-2 border-foreground py-6">
        <div className="mx-auto max-w-6xl px-2">
          <p className="text-center font-mono text-[10px] font-bold uppercase tracking-[0.24em] text-neutral-500">
            Dipercaya tim operasional nyata
          </p>
          <div className="mt-4 overflow-hidden border-y-2 border-foreground py-3">
            <Marquee speed={18} pauseOnHover>
              {[...mitra, ...mitra].map((name, i) => (
                <span
                  key={`${name}-${i}`}
                  className="mx-1 whitespace-nowrap border-2 border-foreground bg-surface px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wide"
                >
                  {name}
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* 3. PROBLEM */}
      <section className="border-b-2 border-foreground py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-2">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-neutral-400">
            Masalah yang sering ketemu
          </p>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {problems.map((p) => (
              <div key={p.n} className="border-t-2 border-foreground pt-4">
                <span className="font-mono text-[10px] font-bold text-accent">{p.n}</span>
                <h2 className="mt-2 text-xl font-bold leading-snug md:text-2xl">{p.t}</h2>
                <p className="mt-2 text-[13px] leading-7 text-neutral-600">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KONTRAST */}
      <section className="border-b-2 border-foreground py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-2">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-neutral-400">
            Yang tidak kami kerjakan
          </p>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {donts.map((d, i) => (
              <li key={d} className="flex items-start gap-3 border-2 border-foreground bg-surface p-4">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 border-foreground bg-double text-[11px] font-extrabold text-background">
                  {i + 1}
                </span>
                <span className="text-sm font-semibold leading-relaxed">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. ANGKA BUKTI */}
      <section className="border-b-2 border-foreground py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-2">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-neutral-400">
            Bukti di lapangan
          </p>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {numbers.map((n) => (
              <div key={n.label} className="border-t-2 border-foreground pt-4">
                <p className="text-4xl font-extrabold tracking-tight md:text-5xl">{n.value}</p>
                <p className="mt-2 text-sm font-bold leading-snug">{n.label}</p>
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-neutral-500">{n.aside}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. PROJECT LIST */}
      <section className="border-b-2 border-foreground py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-2">
          <div className="flex items-end justify-between gap-4">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-neutral-400">
              Sistem yang sudah jalan
            </p>
            <Link href="/projects" className="font-mono text-[11px] font-bold text-accent hover:underline">
              semua case study →
            </Link>
          </div>
          <ul className="mt-6 divide-y-2 divide-foreground border-y-2 border-foreground">
            {projects.map((p) => (
              <li key={p.id}>
                <Link
                  href={`/projects/${p.id}`}
                  className="group flex items-center justify-between gap-4 py-3 font-mono text-sm"
                >
                  <span className="font-extrabold">{p.title}</span>
                  <span className="flex-1 border-b border-dotted border-neutral-300" />
                  <span className="text-[11px] uppercase tracking-wide text-neutral-500 group-hover:text-accent">
                    buka case study
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. PRICING */}
      <section className="border-b-2 border-foreground py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-2">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-neutral-400">
            Titik masuk harga
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {packages.map((p, i) => (
              <div
                key={p.id}
                className={`flex flex-col justify-between gap-6 border-2 border-foreground p-6 ${
                  i === 1 ? "bg-accent-bg" : "bg-surface"
                }`}
              >
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500">{p.name}</p>
                  <p className="mt-3 text-3xl font-extrabold">{formatPrice(p)}</p>
                </div>
                <div>
                  <p className="text-[13px] leading-relaxed text-neutral-600">{p.description}</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-bold hover:text-accent"
                  >
                    bahas scope <span aria-hidden>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SATU TESTIMONI */}
      <section className="border-b-2 border-foreground py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-2">
          <blockquote className="max-w-3xl">
            <p className="text-2xl font-bold leading-tight md:text-4xl">
              &ldquo;{quote.content}&rdquo;
            </p>
            <footer className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500">
              {quote.role} · {quote.company}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="bg-accent-bg py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-2 text-center">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.28em] text-neutral-500">
            Kalau masalahnya sudah kebayang
          </p>
          <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold tracking-tight md:text-5xl">
            Satu brief. Dijawab dalam jam.
          </h2>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 bg-foreground px-8 py-4 text-sm font-bold text-background"
          >
            Mulai briefing
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}