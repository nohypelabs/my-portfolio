export const cvData = {
  profile: {
    en: "Full-stack developer who in under 1 year built 4 production systems with 250K+ records, used by real clients at J&T Express and retail sector. Specializing in Next.js, tRPC, and PostgreSQL. Returned to production-grade development after 9 years — now focused on building scalable and performant solutions with AI-augmented development.",
    id: "Full-stack developer yang dalam kurang dari 1 tahun membangun 4 sistem production dengan 250K+ records, digunakan oleh client nyata di J&T Express dan sektor ritel. Spesialisasi di Next.js, tRPC, dan PostgreSQL. Kembali ke development production setelah 9 tahun — kini fokus membangun solusi yang scalable dan performant dengan AI-augmented development.",
  },

  technicalExperience: [
    {
      year: "2024 – Present",
      title: "Freelance Full-stack Developer",
      description: {
        en: "Built and shipped 4 production systems for real clients in logistics, retail, and e-commerce. All projects use Next.js, TypeScript, tRPC, and PostgreSQL/Supabase. Delivered end-to-end: database design, API, frontend, deployment, and ongoing maintenance.",
        id: "Membangun dan mengirim 4 sistem production untuk client nyata di logistik, ritel, dan e-commerce. Semua project menggunakan Next.js, TypeScript, tRPC, dan PostgreSQL/Supabase. Deliver end-to-end: desain database, API, frontend, deployment, dan maintenance.",
      },
      highlights: [
        "Serat QC — 80K+ resi, 160K+ foto GPS-watermarked untuk J&T Express",
        "WC Check — 3.293 inspeksi, 53 users, 49 lokasi (toilet monitoring)",
        "LakuPOS — POS & warehouse system multi-outlet dengan QRIS payment",
        "Qohira — E-commerce platform dengan manual payment verification",
      ],
    },
    {
      year: "2019 – 2024",
      title: "Freelance Developer (Various Projects)",
      description: {
        en: "Early freelance work while transitioning back to tech. Built web tools, scripts, and small applications. Gradually shifted focus to full-stack development with modern frameworks.",
        id: "Freelance awal saat transisi kembali ke dunia tech. Membuat web tools, script, dan aplikasi kecil. Perlahan bergeser ke full-stack development dengan framework modern.",
      },
      highlights: [],
    },
  ],

  otherExperience: [
    {
      year: "2024 – Present",
      title: "PT PIM Parking — Field Staff & Boomgate Technician",
      description: {
        en: "Vehicle entry/exit access portal systems. Concurrently building full-stack applications as freelance developer.",
        id: "Portal akses keluar masuk kendaraan. Sambil membangun aplikasi full-stack sebagai freelance developer.",
      },
    },
    {
      year: "2019 – 2024",
      title: "Freelance (Non-Tech Projects)",
      description: {
        en: "Various non-development freelance work while employed in non-tech roles. Occasionally built small scripts and web tools as personal projects — not production work.",
        id: "Berbagai freelance non-development sambil bekerja di bidang non-tech. Sesekali membuat script kecil dan web tools sebagai project pribadi — bukan production.",
      },
    },
    {
      year: "2021 – 2023",
      title: "PT Bina Pustaka Madani — Sales & Marketing",
      description: {
        en: "Sales & Marketing Staff — Al-Qur'an division",
        id: "Staf Sales dan Marketing Al-Qur'an",
      },
    },
    {
      year: "2018 – 2019",
      title: "PT Kinenta Purwakarta — Quality Control",
      description: {
        en: "Quality Control (QC) Staff",
        id: "Staf Quality Control (QC)",
      },
    },
    {
      year: "2017 – 2018",
      title: "Agen JNE Sudirman 2 — Operations Admin",
      description: {
        en: "Operations admin for 1 year",
        id: "Admin operasional selama 1 tahun",
      },
    },
  ],

  education: [
    {
      year: "2017",
      title: "D3 Teknik Informatika",
      description: {
        en: "104 of 114 credits completed (semester 6) — stopped due to financial constraints",
        id: "104 dari 114 SKS selesai (semester 6) — terhenti karena keterbatasan biaya",
      },
    },
    {
      year: "2013",
      title: "SMA Muhammadiyah 1 Bandung",
      description: { en: "", id: "" },
    },
  ],

  background: [
    {
      year: "2014",
      title: "Pendidikan Dasar Militer — Resimen Mahasiswa",
      description: {
        en: "Sworn in at Dik Passus Situ Lembang",
        id: "Dilantik di Dik Passus Situ Lembang",
      },
    },
    {
      year: "2014",
      title: "Pendidikan Para Dasar — Korps Marinir",
      description: {
        en: "Basic Paratrooper / Static Jump at Kodikmar TNI AL Gunungsari, Surabaya",
        id: "Pasukan Udara Dasar Marinir / Terjun Statik di Kodikmar TNI AL Gunungsari, Surabaya",
      },
    },
  ],

  skillCategories: [
    { labelKey: "cvFrontend" as const, skills: "Next.js, React, TypeScript, Tailwind CSS, Framer Motion" },
    { labelKey: "cvBackend" as const, skills: "Node.js, tRPC, Prisma, REST API, Python" },
    { labelKey: "cvDatabase" as const, skills: "PostgreSQL, Supabase, Redis, SQLite" },
    { labelKey: "cvDevOps" as const, skills: "Git, Vercel, Docker, CI/CD, PWA, Sentry" },
    { labelKey: "cvArchitecture" as const, skills: "DDD, Clean Architecture, Repository Pattern" },
    { labelKey: "cvTesting" as const, skills: "Playwright E2E, Vitest, Jest, Testing Library" },
  ],

  languages: [
    { name: { en: "Indonesian", id: "Indonesia" }, level: { en: "Native", id: "Asli" } },
    { name: { en: "Sundanese", id: "Sunda" }, level: { en: "Native", id: "Asli" } },
    { name: { en: "English", id: "Inggris" }, level: { en: "Intermediate", id: "Menengah" } },
  ],
};
