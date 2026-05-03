"use client";

import { Download } from "lucide-react";
import Image from "next/image";

export default function CVPage() {
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 md:p-6">
      <button
        onClick={handleDownloadPDF}
        className="fixed top-20 right-4 md:top-24 md:right-8 z-50 bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 print:hidden transition-colors"
      >
        <Download className="w-5 h-5" />
        <span className="hidden md:inline">Download PDF</span>
      </button>

      <div className="w-full md:max-w-[210mm] bg-white shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-zinc-900 text-white p-4 md:p-8 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="shrink-0">
              <Image
                src="/avatar.jpg"
                alt="Abdul Gofur"
                width={80}
                height={80}
                className="rounded-full border-4 border-emerald-500/30"
              />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold mb-2 tracking-wide">ABDUL GOFUR</h1>
              <div className="text-base md:text-xl font-light mb-2 md:mb-3 text-emerald-400">Full-stack Developer & Web Application Specialist</div>
              <div className="text-xs md:text-sm text-zinc-400">Building scalable web applications with modern technologies</div>
            </div>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="bg-zinc-800 text-zinc-300 p-3 md:p-5 flex flex-wrap gap-3 md:gap-6 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">@</span>
            <a href="mailto:agdscid@gmail.com" className="hover:text-white transition-colors">agdscid@gmail.com</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">T</span>
            <span>0812-2157-5053</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">L</span>
            <span>Jakarta, Indonesia</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">G</span>
            <a href="https://github.com/nohypelabs" target="_blank" className="hover:text-white transition-colors">github.com/nohypelabs</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">in</span>
            <a href="https://linkedin.com/in/abdul-gofur" target="_blank" className="hover:text-white transition-colors">linkedin.com/in/abdul-gofur</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">X</span>
            <a href="https://x.com/nohypelabs" target="_blank" className="hover:text-white transition-colors">@nohypelabs</a>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-8">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3 pb-2 border-b-2 border-emerald-500 inline-block">PROFIL</h2>
              <p className="text-xs md:text-sm text-zinc-600 leading-relaxed mt-3">
                Saya Abdul Gofur, lahir di Majalengka 12 April 1994. Full-stack developer dengan 1+ tahun pengalaman
                dalam membangun aplikasi web production-ready. Memiliki semangat kerja yang tinggi di bidang IT dan
                passionate dalam menciptakan solusi yang scalable dan performant.
              </p>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3 pb-2 border-b-2 border-emerald-500 inline-block">PENDIDIKAN</h2>
              <div className="mt-3 space-y-4">
                {[
                  { year: "2013", title: "SMA Muhammadiyah 1 Bandung", desc: "" },
                  { year: "2014", title: "Pendidikan Dasar Militer Menwa", desc: "Pendidikan Dasar Militer Resimen Mahasiswa dan dilantik di Dik Passus Situ Lembang" },
                  { year: "2014", title: "Pendidikan Para Dasar Marinir", desc: "Pendidikan Pasukan Udara Dasar Marinir / Terjun Statik" },
                  { year: "2017", title: "D3 Teknik Informatika", desc: "104 dari 114 SKS selesai (semester 6) — terhenti karena keterbatasan biaya" },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-zinc-200 pl-4 relative">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="font-bold text-emerald-600 text-sm">{item.year}</div>
                    <div className="font-semibold text-sm text-zinc-900">{item.title}</div>
                    {item.desc && <div className="text-xs text-zinc-500">{item.desc}</div>}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3 pb-2 border-b-2 border-emerald-500 inline-block">PENGALAMAN KERJA</h2>
              <div className="mt-3 space-y-4">
                {[
                  { year: "2015", title: "Mocha Loco Cafe and Resto", desc: "Bekerja sebagai waiter selama 3 bulan pada saat libur kuliah" },
                  { year: "2017", title: "Agen JNE Sudirman 2", desc: "Bekerja sebagai Admin selama 1 (satu) tahun pada saat cuti kuliah" },
                  { year: "2024 - Sekarang", title: "Full-stack Developer (Freelance)", desc: "Mengembangkan aplikasi web full-stack dengan Next.js, React, TypeScript, dan PostgreSQL" },
                ].map((item, i) => (
                  <div key={i} className="border-l-2 border-zinc-200 pl-4 relative">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 bg-emerald-500 rounded-full"></div>
                    <div className="font-bold text-emerald-600 text-sm">{item.year}</div>
                    <div className="font-semibold text-sm text-zinc-900">{item.title}</div>
                    <div className="text-xs text-zinc-500">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3 pb-2 border-b-2 border-emerald-500 inline-block">KEAHLIAN TEKNIS</h2>
              <div className="mt-3 space-y-3">
                {[
                  { label: "Frontend Development", value: "Next.js, React, TypeScript, Tailwind CSS" },
                  { label: "Backend Development", value: "Node.js, tRPC, Prisma, PostgreSQL" },
                  { label: "Database", value: "PostgreSQL, Supabase, MongoDB, Redis" },
                  { label: "Tools & DevOps", value: "Git, Docker, Vercel, PWA" },
                  { label: "Typing Speed", value: "80 WPM" },
                  { label: "System Administration", value: "Windows & Linux Installation" },
                ].map((skill, i) => (
                  <div key={i} className="bg-zinc-50 p-3 rounded-lg border-l-2 border-emerald-500">
                    <div className="font-semibold text-sm text-zinc-900">{skill.label}</div>
                    <div className="text-xs text-zinc-500">{skill.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-3 pb-2 border-b-2 border-emerald-500 inline-block">BAHASA</h2>
              <div className="mt-3 grid grid-cols-3 gap-4">
                {[
                  { lang: "Indonesia", pct: "97.5%" },
                  { lang: "Sunda", pct: "90.5%" },
                  { lang: "Inggris", pct: "25%" },
                ].map((item, i) => (
                  <div key={i} className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full bg-zinc-900 flex items-center justify-center text-emerald-400 font-bold text-sm mb-2">
                      {item.pct}
                    </div>
                    <div className="text-xs font-semibold text-zinc-700">{item.lang}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects Section - Full Width */}
          <div className="col-span-1 md:col-span-2 bg-zinc-50 p-4 md:p-6 rounded-xl mt-4">
            <h2 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4 pb-2 border-b-2 border-emerald-500 inline-block">PORTFOLIO PROYEK WEB</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-5">
              {[
                {
                  title: "Serat QC — Selisih Berat",
                  desc: "Logistics QC System for J&T Express. 80.187 resi diproses, 160.374 foto GPS watermarked. Dari 4-5 jam manual menjadi < 30 menit.",
                  tags: ["Next.js", "GPS API", "Barcode", "Supabase"],
                  url: "selisih-berat.vercel.app",
                  status: "production" as const,
                },
                {
                  title: "WC Check",
                  desc: "Professional Toilet Monitoring System. 3.293 inspeksi, 53 users, 49 lokasi terkelola dengan QR code scanning dan analytics real-time.",
                  tags: ["Next.js", "TypeScript", "Supabase", "PWA"],
                  url: "wc-checks.vercel.app",
                  status: "production" as const,
                },
                {
                  title: "LakuPOS",
                  desc: "Kasir & Warehouse Management System. Multi-outlet, barcode scanning, QRIS payment, real-time analytics dengan DDD architecture.",
                  tags: ["Next.js 16", "tRPC", "PostgreSQL", "Redis"],
                  url: "lakupos.vercel.app",
                  status: "production" as const,
                },
                {
                  title: "Qohira — Online Shop",
                  desc: "E-Commerce platform dengan product catalog, shopping cart, order tracking, payment integration, dan push notifications.",
                  tags: ["Next.js 16", "tRPC", "Prisma", "PostgreSQL"],
                  url: "qohira.vercel.app",
                  status: "production" as const,
                },
              ].map((project, i) => (
                <div key={i} className="bg-white rounded-lg p-4 md:p-5 shadow-sm border border-zinc-200 hover:-translate-y-1 transition-transform">
                  <h3 className="font-bold text-sm md:text-base mb-2 text-zinc-900">{project.title}</h3>
                  <p className="text-xs text-zinc-500 mb-3 leading-relaxed">{project.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="bg-zinc-900 text-white px-2 py-0.5 rounded text-[9px] font-medium">{tag}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <a href={`https://${project.url}`} className="text-emerald-600 hover:underline text-xs font-semibold" target="_blank">
                      {project.url}
                    </a>
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[9px] font-bold uppercase">
                      {project.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-zinc-900 text-zinc-400 text-center p-3 md:p-5 text-xs">
          Portfolio: <a href="https://agds-dev.vercel.app" target="_blank" className="font-semibold text-emerald-400 hover:underline">agds-dev.vercel.app</a> |
          Created by Abdul Gofur | 2025
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: 210mm 330mm;
            margin: 0;
          }

          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }

          body {
            margin: 0;
            padding: 0;
          }

          .min-h-screen {
            min-height: auto !important;
            height: auto !important;
            padding: 0 !important;
            background: white !important;
            display: block !important;
            align-items: flex-start !important;
          }

          .shadow-2xl {
            box-shadow: none !important;
            max-width: 100% !important;
          }

          body > div {
            page-break-before: avoid !important;
          }

          .space-y-6 { gap: 0.5rem !important; }
          .space-y-6 > * + * { margin-top: 0.5rem !important; }
          .space-y-4 { gap: 0.25rem !important; }
          .space-y-4 > * + * { margin-top: 0.25rem !important; }
          .space-y-3 { gap: 0.25rem !important; }
          .space-y-3 > * + * { margin-top: 0.25rem !important; }

          .bg-zinc-900 { padding: 0.5rem 1rem !important; }
          .bg-zinc-900 img { width: 50px !important; height: 50px !important; }
          .bg-zinc-900 .flex.items-center { gap: 0.75rem !important; }

          .grid.grid-cols-1 {
            padding: 0.75rem !important;
            gap: 0.75rem !important;
            grid-template-columns: 1fr 1fr !important;
          }

          h1 { font-size: 1.5rem !important; margin-bottom: 0.25rem !important; line-height: 1.2 !important; }
          h2 { font-size: 1rem !important; margin-bottom: 0.25rem !important; padding-bottom: 0.125rem !important; }
          h3 { font-size: 0.75rem !important; margin-bottom: 0.25rem !important; }
          p, div { font-size: 0.65rem !important; line-height: 1.2 !important; margin-bottom: 0 !important; }

          .bg-white.rounded-lg { padding: 0.5rem !important; margin-bottom: 0.25rem !important; }

          .rounded-full.bg-zinc-900 {
            width: 2.5rem !important;
            height: 2.5rem !important;
            font-size: 0.6rem !important;
          }

          .bg-zinc-50 { padding: 0.35rem !important; margin-bottom: 0.25rem !important; }

          .text-center.p-3 { padding: 0.35rem !important; }
          .flex.flex-wrap.gap-3 { padding: 0.5rem !important; gap: 0.35rem !important; }

          .absolute.-top-20 { display: none !important; }

          .border-l-2 { padding-left: 0.5rem !important; }
          .absolute.w-2.h-2 { width: 0.375rem !important; height: 0.375rem !important; left: -0.25rem !important; }

          .col-span-1.md\\:col-span-2 { grid-column: 1 / -1 !important; }

          .bg-zinc-50.p-4 { padding: 0.5rem !important; margin-top: 0.5rem !important; }

          .grid.grid-cols-1.md\\:grid-cols-2 {
            gap: 0.5rem !important;
            grid-template-columns: 1fr 1fr !important;
            display: grid !important;
          }

          .bg-zinc-900.text-white.px-2 { padding: 0.125rem 0.35rem !important; font-size: 0.5rem !important; }

          .rounded-lg { border-radius: 0.25rem !important; }
          .rounded-xl { border-radius: 0.25rem !important; }

          .space-y-6 > div, .space-y-3 > div { page-break-inside: avoid; }
          a[href]:after { content: none !important; }
        }
      `}</style>
    </div>
  );
}
