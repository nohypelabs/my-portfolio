import Link from "next/link";
import Image from "next/image";
import { Marquee } from "@/components/Marquee";
import { projects } from "@/lib/data/projects";
import { studioStats } from "@/lib/data/studioStats";
import { packages } from "@/lib/data/services";
import { testimonials } from "@/lib/data/testimonials";
import { TextReveal } from "@/components/TextReveal";
import { StorytellingSection, type StorySlide } from "@/components/StorytellingSection";
import { LiveMetrics } from "@/components/sections/LiveMetrics";
import { ProjectCard } from "@/components/ui/ProjectCard";

// Homepage funnel: satu ide per blok, tanpa dinding kartu.
// Urutan: cover → mitra → problem/solusi → live metrics → projects → pricing → testimoni → CTA.

const mitra = [
  { name: "J&T Express", logo: "/clients/jt.svg" },
  { name: "PT Prenacons Internusa", logo: "/clients/prenacons.png" },
  { name: "Serat QC", initial: "SQ" },
  { name: "WC Check", initial: "WC" },
  { name: "LakuPOS", initial: "LP" },
  { name: "Qohira", initial: "QH" },
  { name: "nasaq.id", initial: "NQ" },
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
            {/* Emphasis is weight + contrast, not a gradient: the palette has no
                accent hue, and bg-clip-text breaks the reveal's masking. */}
            <span className="font-normal">
              <TextReveal text="bukan yang cuma dilirik." />
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-[15px] leading-8 text-foreground/70 md:text-base">
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
            <span className="font-mono text-[11px] text-foreground/70">
              1 kalimat boleh. / Dibalas langsung.
            </span>
          </div>

          <div className="mt-12 neo-surface rounded-2xl p-5 bg-[var(--bg-element)]/50 divide-y divide-foreground/10 md:divide-y-0 md:divide-x md:grid md:grid-cols-4 md:text-center">
            {studioStats.map((s, i) => (
              <div key={s.label} className={`py-4 md:py-0 md:px-5 ${i === 0 ? "pt-0 md:pt-0" : ""} ${i === 3 ? "pb-0 md:pb-0" : ""}`}>
                <p className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] font-semibold font-mono uppercase tracking-wider text-foreground/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. MITRA — strip tipis */}
      <section className="py-8 border-y border-[var(--border-hairline)] bg-[var(--bg-element-second)]/30">
        <div className="mx-auto max-w-6xl px-2">
          <p className="text-center descriptor">Dipercaya oleh bisnis & mitra nyata</p>
          <div className="mt-5 overflow-hidden">
            <Marquee speed={20}>
              {[...mitra, ...mitra].map((m, i) => (
                <div
                  key={`${m.name}-${i}`}
                  className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-[var(--border-hairline)] rounded-xl mx-2 shadow-[2px_2px_0px_rgba(0,0,0,0.05)] select-none hover:shadow-md transition-shadow"
                >
                  {m.logo ? (
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white p-1">
                      <Image
                        src={m.logo}
                        alt={`${m.name} logo`}
                        width={32}
                        height={32}
                        className="object-contain w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-[var(--bg-element-third)] border border-[var(--border-hairline)] flex items-center justify-center text-[10px] font-bold text-foreground">
                      {m.initial}
                    </div>
                  )}
                  <span className="text-[13px] font-semibold text-foreground/80">
                    {m.name}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </section>

      {/* 3. REALITAS LAPANGAN VS SOLUSI */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-6xl px-2">
          <p className="descriptor">Masalah Riil vs Solusi Kustom</p>
          <h2 className="mt-3 text-3xl font-light leading-tight tracking-tight text-foreground md:text-5xl">
            Kami menyelesaikan bottleneck operasional nyata, bukan sekadar memoles template instan.
          </h2>
          
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            {/* Sisi Kiri: Masalah Lapangan */}
            <div className="neo-surface rounded-2xl p-6 bg-red-50/5 border-red-200/20">
              <span className="font-mono text-[10px] font-bold text-red-500 uppercase tracking-widest">
                Tantangan Lapangan (Manual & Rentan Error)
              </span>
              <ul className="mt-6 space-y-6">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100/50 text-[11px] font-bold text-red-600 font-mono">
                    ✗
                  </span>
                  <div>
                    <h4 className="text-[14px] font-bold text-foreground font-mono">Stok Fisik vs Excel Sering Selisih</h4>
                    <p className="mt-1 text-[12px] leading-relaxed text-foreground/60">
                      Ritel multi-outlet terpaksa rekap stok manual di akhir hari. Rentan selisih, barang hilang tak terlacak, dan pemindahan stok antar outlet lambat di-update.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100/50 text-[11px] font-bold text-red-600 font-mono">
                    ✗
                  </span>
                  <div>
                    <h4 className="text-[14px] font-bold text-foreground font-mono">Admin Lembur Rename & Susun Foto Manual</h4>
                    <p className="mt-1 text-[12px] leading-relaxed text-foreground/60">
                      Untuk audit logistik (seperti selisih berat paket), tim menghabiskan 4-5 jam sehari hanya untuk mencocokkan nomor resi dengan nama file foto secara manual.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-red-100/50 text-[11px] font-bold text-red-600 font-mono">
                    ✗
                  </span>
                  <div>
                    <h4 className="text-[14px] font-bold text-foreground font-mono">Inspeksi Lapangan Tanpa Bukti Valid</h4>
                    <p className="mt-1 text-[12px] leading-relaxed text-foreground/60">
                      Checklist kebersihan toilet atau gedung menggunakan form kertas yang mudah hilang, rawan dimanipulasi data tanggalnya, dan tidak bisa dimonitor real-time oleh manajemen.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Sisi Kanan: Solusi Digital */}
            <div className="neo-surface rounded-2xl p-6 bg-green-50/5 border-green-200/20">
              <span className="font-mono text-[10px] font-bold text-green-500 uppercase tracking-widest">
                Solusi Digital nasaq.id (Otomatis & Real-Time)
              </span>
              <ul className="mt-6 space-y-6">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100/50 text-[11px] font-bold text-green-600 font-mono">
                    ✓
                  </span>
                  <div>
                    <h4 className="text-[14px] font-bold text-foreground font-mono">Sinkronisasi Multi-Outlet Otomatis</h4>
                    <p className="mt-1 text-[12px] leading-relaxed text-foreground/60">
                      Sistem POS kasir dan gudang terpusat (seperti LakuPOS) dengan pemantauan stok real-time, alert otomatis saat stok menipis, dan modul transfer stok dengan audit trail ketat.
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100/50 text-[11px] font-bold text-green-600 font-mono">
                    ✓
                  </span>
                  <div>
                    <h4 className="text-[14px] font-bold text-foreground font-mono">Scan Barcode & Otomasi Watermark Foto</h4>
                    <p className="mt-1 text-[12px] leading-relaxed text-foreground/60">
                      Cukup scan barcode resi logistik lewat HP, ambil foto, dan biarkan sistem (seperti Serat QC) secara otomatis membubuhkan watermark GPS (lokasi, waktu) serta menamai file. Waktu proses dipotong 90%!
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100/50 text-[11px] font-bold text-green-600 font-mono">
                    ✓
                  </span>
                  <div>
                    <h4 className="text-[14px] font-bold text-foreground font-mono">Scan QR Code & GPS-Validated Checklist</h4>
                    <p className="mt-1 text-[12px] leading-relaxed text-foreground/60">
                      Petugas scan QR di lokasi fisik untuk membuka checklist inspeksi digital. Setiap laporan wajib menyertakan foto tervalidasi lokasi (GPS) dan langsung tersimpan di dashboard pusat secara real-time.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VERIFIKASI KONEKSI DATABASE PRODUKSI (LIVE PROOF) */}
      <section id="live-data" className="py-14 md:py-20 border-t border-[var(--border-hairline)] bg-[var(--bg-element-second)]/10">
        <div className="mx-auto max-w-6xl px-2">
          <p className="descriptor">Bukti Integrasi Real-Time</p>
          <h2 className="mt-3 text-2xl font-light leading-tight tracking-tight text-foreground md:text-4xl">
            Verifikasi Data Lapangan Langsung Dari Database
          </h2>
          <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-foreground/70 font-mono">
            Berikut adalah performa riil dari aplikasi yang kami deploy di server produksi client. Kami tidak menyembunyikan mock data — Anda dapat menguji koneksi langsung ke Supabase & PostgreSQL kami secara real-time di bawah ini.
          </p>

          <div className="mt-10">
            <LiveMetrics />
          </div>
        </div>
      </section>

      {/* 5.5. STORYTELLING */}
      <StorytellingSection
        slides={storySlides}
        kicker="Cerita di balik angkanya"
        title="Setiap sistem dimulai dari masalah kecil yang menggerogoti waktu — dan di sini kami ukur kapan sebelum berubah jadi sesudah."
      />

      {/* 6. PROJECT SHOWCASE GRID */}
      <section className="py-14 md:py-20 border-t border-[var(--border-hairline)]">
        <div className="mx-auto max-w-6xl px-2">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p className="descriptor">Showcase Sistem Nyata</p>
              <h2 className="mt-3 text-2xl font-light leading-tight tracking-tight text-foreground md:text-4xl">
                Aplikasi Produksi Yang Sedang Berjalan
              </h2>
            </div>
            <Link
              href="/projects"
              className="text-[12px] font-semibold text-foreground underline decoration-1 underline-offset-4 hover:opacity-70 shrink-0 font-mono"
            >
              Lihat semua case study →
            </Link>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
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
                  // The featured tier is the darkest slab in the rotation rather
                  // than a tinted gradient — there is no accent hue to tint with.
                  i === 1
                    ? "bg-[var(--bg-element-third)] soft-border"
                    : "bg-[var(--bg-element)] soft-border"
                }`}
              >
                {i === 1 && (
                  <span className="absolute -top-2.5 right-4 chip bg-[var(--bg-btn-pm)] text-[var(--txt-btn-pm)]">
                    Paling dipilih
                  </span>
                )}
                <div>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground/70">
                    {p.name}
                  </p>
                  <p className="mt-3 text-3xl font-light tracking-tight text-foreground">
                    {formatPrice(p)}
                  </p>
                </div>
                <div>
                  <p className="text-[13px] leading-relaxed text-foreground/70">{p.description}</p>
                  <Link
                    href="/contact"
                    className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-foreground underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70"
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
      <section className="py-14 md:py-20 border-t border-[var(--border-hairline)]">
        <div className="mx-auto max-w-3xl px-2 text-center">
          <p className="descriptor">Kata tim yang pakai</p>
          <blockquote className="mt-6">
            <p className="text-2xl font-light leading-tight text-foreground md:text-4xl">
              &ldquo;{quote.content}&rdquo;
            </p>
            <footer className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-foreground/70">
              {quote.role} · {quote.company}
            </footer>
          </blockquote>
        </div>
      </section>

      {/* 9. CTA */}
      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-5xl px-2">
          <div className="rounded-3xl bg-[var(--bg-btn-big)] py-12 px-6 text-center text-[var(--txt-btn-big)] md:py-16">
            {/* Inside the dark slab, text colours inherit — page-level tokens
                (.descriptor, text-foreground) would invert against it. */}
            <p className="descriptor !text-current opacity-70">
              Kalau masalahnya sudah kebayang
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-[32px] font-light tracking-tight text-current md:text-5xl">
              Satu brief. Dijawab dalam jam.
            </h2>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-[var(--bg-form-element)] px-8 py-4 text-sm font-semibold text-[#3c3c3c] transition-transform hover:-translate-y-0.5"
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