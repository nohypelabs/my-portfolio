export const cvData = {
  profile: {
    en: "Full-stack developer who shipped 4 production systems in 12 months — 250K+ records processed, real clients at J&T Express and retail sector. Tech stack: Next.js, TypeScript, tRPC, PostgreSQL. Also experienced in IT support: hardware troubleshooting, OS deployment, and network configuration. Returned to production-grade development after 9 years, now combining full-stack engineering with AI-augmented workflows.",
    id: "Full-stack developer yang mengirim 4 sistem production dalam 12 bulan — 250K+ records diproses, client nyata di J&T Express dan sektor ritel. Tech stack: Next.js, TypeScript, tRPC, PostgreSQL. Juga berpengalaman di IT support: troubleshooting hardware, deploy OS, dan konfigurasi jaringan. Kembali ke development production setelah 9 tahun, kini menggabungkan full-stack engineering dengan AI-augmented workflow.",
  },

  technicalExperience: [
    {
      year: "2024 – Present",
      title: "Freelance Full-stack Developer",
      description: {
        en: "Built and shipped 4 production systems for real clients in logistics, retail, and e-commerce. End-to-end ownership: database design, API development, frontend, deployment, and ongoing maintenance. All projects use Next.js, TypeScript, tRPC, and PostgreSQL/Supabase.",
        id: "Membangun dan mengirim 4 sistem production untuk client nyata di logistik, ritel, dan e-commerce. Ownership end-to-end: desain database, API development, frontend, deployment, dan maintenance. Semua project menggunakan Next.js, TypeScript, tRPC, dan PostgreSQL/Supabase.",
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
      title: "Freelance Developer & IT Support",
      description: {
        en: "Transition period with continuous skill building. Delivered web tools, automation scripts, and small applications while expanding into full-stack development. Also provided IT support: hardware troubleshooting, OS installation, and network setup for small businesses.",
        id: "Periode transisi dengan pembangunan skill berkelanjutan. Membuat web tools, script otomasi, dan aplikasi sambil berkembang ke full-stack development. Juga memberikan IT support: troubleshooting hardware, instalasi OS, dan setup jaringan untuk usaha kecil.",
      },
      highlights: [
        "Self-taught modern stack: React → Next.js → tRPC → PostgreSQL",
        "Provided IT support: PC/laptop repair, OS deployment, LAN/WiFi setup",
      ],
    },
  ],

  otherExperience: [
    {
      year: "2024 – Present",
      title: "PT PIM Parking — Field Staff & Boomgate Technician",
      description: {
        en: "Boomgate and vehicle access portal systems — hardware installation, maintenance, and troubleshooting. Concurrently building full-stack applications as freelance developer.",
        id: "Sistem portal akses kendaraan dan boomgate — instalasi hardware, maintenance, dan troubleshooting. Sambil membangun aplikasi full-stack sebagai freelance developer.",
      },
    },
    {
      year: "2021 – 2023",
      title: "PT Bina Pustaka Madani — Sales, Marketing & Web Management",
      description: {
        en: "Sales & Marketing staff for Al-Qur'an division. Also managed 2 company websites — handled development/rebuild and managed hosting & domain infrastructure.",
        id: "Staf Sales & Marketing divisi Al-Qur'an. Juga mengelola 2 website perusahaan — meliputi development/rebuild dan manajemen hosting & domain.",
      },
    },
    {
      year: "2018 – 2019",
      title: "PT Kinenta Purwakarta — Quality Control",
      description: {
        en: "Quality Control (QC) Staff — product inspection and compliance reporting.",
        id: "Staf Quality Control (QC) — inspeksi produk dan pelaporan kepatuhan.",
      },
    },
    {
      year: "2017 – 2018",
      title: "Agen JNE Sudirman 2 — Operations Admin",
      description: {
        en: "Operations admin — shipment tracking, customer service, and daily reporting for 1 year.",
        id: "Admin operasional — tracking pengiriman, customer service, dan pelaporan harian selama 1 tahun.",
      },
    },
  ],

  education: [
    {
      year: "2013 – 2017",
      title: "D3 Teknik Informatika — Politeknik Negeri Bandung",
      description: {
        en: "104 of 114 credits completed (91%) — paused in semester 6 to accelerate career in tech industry",
        id: "104 dari 114 SKS selesai (91%) — terhenti di semester 6 untuk mempercepat karir di industri tech",
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
    { labelKey: "cvGeneralIT" as const, skills: "Troubleshooting PC/laptop, Install & konfigurasi OS (Windows/Linux), Driver management, Upgrade komponen (RAM, HDD/SSD, LCD), Konfigurasi jaringan LAN/WiFi/Router" },
  ],

  languages: [
    { name: { en: "Indonesian", id: "Indonesia" }, level: { en: "Native", id: "Asli" } },
    { name: { en: "Sundanese", id: "Sunda" }, level: { en: "Native", id: "Asli" } },
    { name: { en: "English", id: "Inggris" }, level: { en: "Basic", id: "Dasar" } },
  ],
};
