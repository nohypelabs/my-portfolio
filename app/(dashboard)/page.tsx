import Link from "next/link";
import Image from "next/image";
import { Marquee } from "@/components/Marquee";
import { projects } from "@/lib/data/projects";
import { studioStats } from "@/lib/data/studioStats";
import { testimonials } from "@/lib/data/testimonials";
import { TextReveal } from "@/components/TextReveal";
import { StorytellingSection, type StorySlide } from "@/components/StorytellingSection";
import { LiveMetrics } from "@/components/sections/LiveMetrics";
import { CTASection } from "@/components/sections/CTASection";
import { ProjectCard } from "@/components/ui/ProjectCard";

// Homepage funnel: satu ide per blok, tanpa dinding kartu.
// Urutan: cover → mitra → problem/solusi → flagship proof (live+story+projects) → pricing → testimoni+CTA.

// Mitra strip hanya menampilkan mitra dengan logo asli — inisial tanpa logo
// dihapus (keputusan branding 2026-08-06). Tambahkan kembali saat logo didapat.
const mitra = [
  { name: "J&T Express", logo: "/clients/jt.svg" },
  { name: "PT Prenacons Internusa", logo: "/clients/prenacons.png" },
];



export default function HomePage() {
  const quote = testimonials[1];

  // Lead with the strongest proof (Serat QC — J&T, 112K+ resi) instead of
  // array order, so the first card visitors see is the flagship. Off-brand
  // projects remain on /projects, untouched.
  const featuredHomeProjects = ["selisih-berat", "wc-check", "lakupos"].map(
    (id) => projects.find((p) => p.id === id)!
  );

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
        <div className="mx-auto max-w-[1440px] px-2 pt-10 pb-14 md:pt-16 md:pb-20">
          <p className="descriptor">nasaq.id · studio website & sistem operasional digital</p>

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
            profile, dashboard internal, dan app Android yang berangkat dari
            problem operasional nyata, bukan dari template.
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
        <div className="mx-auto max-w-[1440px] px-2">
          <p className="text-center descriptor">Dipercaya oleh bisnis & mitra nyata</p>
          <div className="mt-5 overflow-hidden">
            <Marquee speed={20}>
              {[...mitra, ...mitra].map((m, i) => (
                <div
                  key={`${m.name}-${i}`}
                  className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-[var(--border-hairline)] rounded-xl mx-2 shadow-[2px_2px_0px_rgba(0,0,0,0.05)] select-none hover:shadow-md transition-shadow"
                >
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center bg-white p-1">
                    <Image
                      src={m.logo}
                      alt={`${m.name} logo`}
                      width={32}
                      height={32}
                      className="object-contain w-full h-full"
                    />
                  </div>
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
        <div className="mx-auto max-w-[1440px] px-2">
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
                      Checklist kebersihan toilet atau gedung menggunakan form kertas yang mudah hilang, rawan dimanipulasi data tanggalnya, dan tidak bisa dimonitor langsung oleh manajemen.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Sisi Kanan: Solusi Digital */}
            <div className="neo-surface rounded-2xl p-6 bg-green-50/5 border-green-200/20">
              <span className="font-mono text-[10px] font-bold text-green-500 uppercase tracking-widest">
                Solusi Digital nasaq.id (Otomatis & Langsung)
              </span>
              <ul className="mt-6 space-y-6">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100/50 text-[11px] font-bold text-green-600 font-mono">
                    ✓
                  </span>
                  <div>
                    <h4 className="text-[14px] font-bold text-foreground font-mono">Sinkronisasi Multi-Outlet Otomatis</h4>
                    <p className="mt-1 text-[12px] leading-relaxed text-foreground/60">
                      Sistem POS kasir dan gudang terpusat (seperti LakuPOS) dengan pemantauan stok yang selalu update, alert otomatis saat stok menipis, dan modul transfer stok dengan audit trail ketat.
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
                      Petugas scan QR di lokasi fisik untuk membuka checklist inspeksi digital. Setiap laporan wajib menyertakan foto tervalidasi lokasi (GPS) dan langsung tersimpan di dashboard pusat.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. FLAGSHIP PROOF — satu blok bukti: live strip + storytelling + projects */}
      <section id="live-data" className="border-t border-[var(--border-hairline)]">

        {/* 4a. LIVE STRIP — bukti integrasi langsung */}
        <section className="py-12 md:py-14 bg-[var(--bg-element-second)]/10">
          <div className="mx-auto max-w-[1440px] px-2">
            <p className="descriptor">Bukti Integrasi Langsung</p>
            <h2 className="mt-3 text-2xl font-light leading-tight tracking-tight text-foreground md:text-4xl">
              Verifikasi Data Lapangan Langsung Dari Database
            </h2>
            <p className="mt-3 max-w-2xl text-[13px] leading-relaxed text-foreground/70 font-mono">
              Ini performa asli dari aplikasi yang kami deploy di server produksi client. Bukan mock data, Anda bisa tes langsung koneksi ke database-nya di bawah.
            </p>

            <div className="mt-8">
              <LiveMetrics />
            </div>
          </div>
        </section>

        {/* 4b. STORYTELLING */}
        <StorytellingSection
          slides={storySlides}
          kicker="Cerita di balik angkanya"
          title="Setiap sistem dimulai dari masalah kecil yang menggerogoti waktu. Di sini kami ukur kapan sebelum berubah jadi sesudah."
        />

        {/* 4c. PROJECT SHOWCASE GRID */}
        <section className="py-14 md:py-20">
          <div className="mx-auto max-w-[1440px] px-2">
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
              {featuredHomeProjects.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      </section>

      {/* 7. PRICING — single source lives on /services; homepage keeps a compact entry point. */}
      <section className="py-12 md:py-16 border-t border-[var(--border-hairline)]">
        <div className="mx-auto max-w-[1440px] px-2 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="descriptor">Titik masuk harga</p>
            <p className="mt-3 text-2xl font-light tracking-tight text-foreground md:text-3xl">
              Mulai dari <span className="font-semibold">Rp 1,5jt</span>, scope menyesuaikan brief.
            </p>
          </div>
          <Link
            href="/services"
            className="btn-primary px-6 py-3 text-sm shrink-0"
          >
            Lihat 3 paket
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* 6. PENUTUP — testimoni + CTA dalam satu blok */}
      <section className="py-14 md:py-16 border-t border-[var(--border-hairline)]">
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

      <CTASection
        centered
        eyebrow="Kalau masalahnya sudah kebayang"
        title="Satu brief. Dijawab dalam jam."
        ctaLabel="Mulai briefing"
        ctaHref="/contact"
      />
    </main>
  );
}