export const cvData = {
  profile: {
    en: "Full-stack developer who shipped 7 production systems in 12 months, with 340K+ records processed and real clients at J&T Express and the retail sector. Stack: Next.js, TypeScript, tRPC, PostgreSQL. Also experienced in IT support: hardware troubleshooting, OS deployment, and network configuration. Returned to full-time development after 9 years of building end-to-end systems that solve real business problems.",
    id: "Full-stack developer yang ngirim 7 sistem produksi dalam 12 bulan, 340K+ records diproses, client asli di J&T Express dan sektor ritel. Stack: Next.js, TypeScript, tRPC, PostgreSQL. Juga berpengalaman di IT support: troubleshooting hardware, deploy OS, dan konfigurasi jaringan. Kembali fokus ke development setelah 9 tahun membangun sistem end-to-end yang menyelesaikan masalah bisnis nyata.",
  },

  technicalExperience: [
    {
      year: "2024 – Present",
      title: "Freelance Full-stack Developer",
      description: {
        en: "Built and shipped 7 production systems for real clients in logistics, retail, e-commerce, and Web3. Owned everything from database design and API development to frontend, deployment, and ongoing maintenance. Primary stack: Next.js, TypeScript, tRPC, and PostgreSQL/Supabase.",
        id: "Membangun dan mengirim 7 sistem produksi untuk client asli di logistik, ritel, e-commerce, dan Web3. Megang semuanya dari desain database, API, frontend, deployment, sampai maintenance. Stack utama: Next.js, TypeScript, tRPC, dan PostgreSQL/Supabase.",
      },
      highlights: [
        "Serat QC — 112K+ resi, 225K+ foto GPS-watermarked untuk J&T Express",
        "WC Check — 3.293 inspeksi, 53 users, 49 lokasi (toilet monitoring)",
        "LakuPOS — POS & warehouse system multi-outlet dengan QRIS payment",
        "Qohira — E-commerce platform dengan manual payment verification",
        "SignalFlow Agent — AI trading dashboard, SoSoValue Buildathon 2026",
        "ShadowBid — Sealed-bid auction with FHE encryption on-chain",
        "TraceFlow — GPS fleet management, tracking langsung & geofencing",
      ],
    },
    {
      year: "2019 – 2024",
      title: "Freelance Developer & IT Support",
      description: {
        en: "Transition period with continuous skill building. Delivered web tools, automation scripts, and small applications while expanding into full-stack development. Also provided IT support: hardware troubleshooting, OS installation, and network setup for small businesses.",
        id: "Periode transisi sambil terus ngasah skill. Bikin web tools, script otomasi, dan aplikasi kecil sambil berkembang ke full-stack development. Juga ngasih IT support: troubleshooting hardware, instalasi OS, dan setup jaringan buat usaha kecil.",
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
        en: "Boomgate and vehicle access portal systems, covering hardware installation, maintenance, and troubleshooting. Concurrently building full-stack applications as a freelance developer.",
        id: "Sistem portal akses kendaraan dan boomgate, mulai dari instalasi hardware, maintenance, sampai troubleshooting. Sambil jalan, membangun aplikasi full-stack sebagai freelance developer.",
      },
    },
    {
      year: "2021 – 2023",
      title: "PT Bina Pustaka Madani — Sales, Marketing & Web Management",
      description: {
        en: "Sales & Marketing staff for the Al-Qur'an division. Also managed 2 company websites, covering development/rebuild and hosting & domain infrastructure.",
        id: "Staf Sales & Marketing divisi Al-Qur'an. Sekalian ngelola 2 website perusahaan, dari development/rebuild sampai manajemen hosting & domain.",
      },
    },
    {
      year: "2018 – 2019",
      title: "PT Kinenta Purwakarta — Quality Control",
      description: {
        en: "Quality Control (QC) staff handling product inspection and compliance reporting.",
        id: "Staf Quality Control (QC), ngurus inspeksi produk dan pelaporan kepatuhan.",
      },
    },
    {
      year: "2017 – 2018",
      title: "Agen JNE Sudirman 2 — Operations Admin",
      description: {
        en: "Operations admin handling shipment tracking, customer service, and daily reporting for 1 year.",
        id: "Admin operasional, ngurus tracking pengiriman, customer service, dan pelaporan harian selama 1 tahun.",
      },
    },
  ],

  education: [
    {
      year: "2013 – 2017",
      title: "D3 Teknik Informatika — Politeknik Negeri Bandung",
      description: {
        en: "104 of 114 credits completed (91%), paused in semester 6 to accelerate his career in the tech industry",
        id: "104 dari 114 SKS selesai (91%), berhenti di semester 6 buat ngejar karir di industri tech",
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
